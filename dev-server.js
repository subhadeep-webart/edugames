#!/usr/bin/env node
/* ==========================================================================
   dev-server.js — local development server for Trivia-SmackDown.

   Why this exists
   ---------------
   The game reads its sets, rounds and media from edugames.com:

     /cgi-bin/GetASetTSD.pl?<setSerNbr>      the set and its round list
     /cgi-bin/GetRoundsTSD.pl?<rndSerNbr>    one round's data
     /cgi-bin/GetTextFileTSD.pl?<path>       answer-button CSV files
     /DataBase/A65AA65A/ResLibry/...         every image, map and icon

   Those are Perl CGI scripts backed by a database that only exists on the
   server, so a plain static server (python -m http.server) cannot serve
   them — it returns the Perl source text instead of running it. Fetching
   edugames.com directly from a file:// or localhost page is blocked by
   CORS.

   That is the whole reason js/Sets.js and js/Round*.js exist: hand-copied
   snapshots of 11 of the 26 sets, used when onNet is false. They carry no
   images, so image-heavy rounds render blank or broken offline.

   What this does
   --------------
   Serves the repo as static files AND forwards every request the game makes
   for remote data to the real server, from Node rather than the browser, so
   no CORS applies. The page then behaves exactly as it does in production
   with onNet = true.

   Nothing in js/ is modified by running this. The one change the game
   itself needs is js/NetTest.js returning "onNet" — which is what the
   deployed copy already returns.

   Usage
   -----
     node dev-server.js              then open http://localhost:8000/
     node dev-server.js --port 3000
     node dev-server.js --no-cache   bypass the on-disk response cache

   Requires Node 18+ (uses the built-in fetch). No npm install needed.
   ========================================================================== */

'use strict';

const http = require('http');
const fs   = require('fs');
const path = require('path');

const ORIGIN = 'https://www.edugames.com';
const ROOT   = __dirname;

// Paths that must be fetched from the real server rather than from disk.
const REMOTE_PREFIXES = ['/cgi-bin/', '/DataBase/'];

const args    = process.argv.slice(2);
const portArg = args.indexOf('--port');
const PORT    = portArg !== -1 ? Number(args[portArg + 1]) : 8000;
const USE_CACHE = !args.includes('--no-cache');

// Responses are cached on disk so repeated runs are fast and the live
// server is not hammered while you iterate on CSS. Delete the folder (or
// pass --no-cache) to force fresh data.
const CACHE_DIR = path.join(ROOT, '.dev-cache');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css' : 'text/css; charset=utf-8',
  '.js'  : 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg' : 'image/svg+xml',
  '.png' : 'image/png',
  '.jpg' : 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif' : 'image/gif',
  '.ico' : 'image/x-icon',
  '.mp3' : 'audio/mpeg',
  '.wav' : 'audio/wav',
  '.mid' : 'audio/midi',
  '.csv' : 'text/csv; charset=utf-8',
  '.txt' : 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.otf' : 'font/otf',
  '.ttf' : 'font/ttf',
  '.eot' : 'application/vnd.ms-fontobject',
  '.pdf' : 'application/pdf'
};

function isRemote(pathname) {
  return REMOTE_PREFIXES.some(p => pathname.startsWith(p));
}

function cachePathFor(url) {
  // One file per unique URL; the name is a safe encoding of the whole URL
  // so query strings (the round/set serial numbers) stay distinct.
  const safe = Buffer.from(url).toString('base64url').slice(0, 180);
  return path.join(CACHE_DIR, safe);
}

async function serveRemote(req, res, pathname, search) {
  const target = ORIGIN + pathname + (search || '');
  const cacheFile = cachePathFor(target);
  const metaFile  = cacheFile + '.meta';

  if (USE_CACHE && fs.existsSync(cacheFile) && fs.existsSync(metaFile)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
      res.writeHead(200, { 'Content-Type': meta.type, 'X-Dev-Proxy': 'cache' });
      res.end(fs.readFileSync(cacheFile));
      console.log(`  cache  ${pathname}${search || ''}`);
      return;
    } catch {
      /* fall through and refetch */
    }
  }

  try {
    const upstream = await fetch(target, {
      headers: { 'User-Agent': 'TSD-dev-server' }
    });
    const type = upstream.headers.get('content-type') || 'application/octet-stream';
    const body = Buffer.from(await upstream.arrayBuffer());

    if (USE_CACHE && upstream.ok) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
      fs.writeFileSync(cacheFile, body);
      fs.writeFileSync(metaFile, JSON.stringify({ type }));
    }

    res.writeHead(upstream.status, {
      'Content-Type': type,
      'X-Dev-Proxy': 'live'
    });
    res.end(body);
    console.log(`  ${upstream.ok ? 'proxy ' : 'FAIL  '} ${upstream.status} ${pathname}${search || ''}`);
  } catch (err) {
    console.error(`  ERROR  ${pathname} — ${err.message}`);
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Dev proxy could not reach ' + ORIGIN + '\n' + err.message);
  }
}

// The four hard-coded https://edugames.com fetch URLs (SelectionPanel.js,
// SubSet.js, script.js x2) are blocked by CORS from localhost. Rather than
// edit those game files, the shim is injected into every served HTML page
// so it rewrites them to same-origin paths at runtime. The files on disk
// are never modified.
const SHIM_TAG =
  '\n<!-- injected by dev-server.js for local development only -->\n' +
  '<script src="/js-ui/tsd-dev-rewrite.js"></script>\n';

function injectShim(html) {
  // Before everything else, so it is in place when the game scripts run.
  const i = html.search(/<head[^>]*>/i);
  if (i === -1) return SHIM_TAG + html;
  const end = html.indexOf('>', i) + 1;
  return html.slice(0, end) + SHIM_TAG + html.slice(end);
}

function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel === '/') rel = '/index.html';

  // Keep the served tree inside the repo.
  const filePath = path.join(ROOT, rel);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found: ' + rel);
      console.log(`  404    ${rel}`);
      return;
    }
    const ext  = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';

    if (ext === '.html') {
      const html = injectShim(fs.readFileSync(filePath, 'utf8'));
      res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
      res.end(html);
      return;
    }

    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const u = new URL(req.url, `http://localhost:${PORT}`);
  if (isRemote(u.pathname)) {
    serveRemote(req, res, u.pathname, u.search);
  } else {
    serveStatic(req, res, u.pathname);
  }
});

server.listen(PORT, () => {
  console.log('');
  console.log('  Trivia-SmackDown dev server');
  console.log('  ---------------------------');
  console.log(`  local    http://localhost:${PORT}/`);
  console.log(`  proxying ${REMOTE_PREFIXES.join(', ')}  ->  ${ORIGIN}`);
  console.log(`  cache    ${USE_CACHE ? CACHE_DIR : 'disabled (--no-cache)'}`);
  console.log('');
  console.log('  js/NetTest.js must return "onNet" for the game to fetch.');
  console.log('  Ctrl+C to stop.');
  console.log('');
});
