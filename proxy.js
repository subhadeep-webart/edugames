// Local dev server for Trivia-SmackDown.
//   node proxy.js      ->  http://localhost:8000/index.html
//
// Serves the site statically AND proxies the edugames.com backend so the
// browser never sees a cross-origin request. The live API only sends
// "Access-Control-Allow-Origin: https://trivia-smackdown.com", which blocks
// localhost; we re-emit "*" on the way back.

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = 8000;
const UPSTREAM = 'https://www.edugames.com';

const TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.csv': 'text/csv; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.png': 'image/png', '.gif': 'image/gif',
    '.ico': 'image/x-icon', '.svg': 'image/svg+xml',
    '.wav': 'audio/wav', '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4', '.pdf': 'application/pdf',
};

function proxy(upstreamPath, res) {
    https.get(UPSTREAM + upstreamPath, up => {
        res.writeHead(up.statusCode || 200, {
            'Content-Type': up.headers['content-type'] || 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store',
        });
        up.pipe(res);
    }).on('error', err => {
        console.error('  proxy error:', err.message);
        res.writeHead(502, { 'Content-Type': 'text/plain' });
        res.end('Upstream fetch failed: ' + err.message);
    });
}

const server = http.createServer((req, res) => {
    let url = req.url;

    // The game hardcodes absolute URLs in ~17 places. Some browsers/user
    // scripts may rewrite them to a path form; accept both shapes.
    const abs = url.match(/^\/+(?:https?:\/\/)?(?:www\.)?edugames\.com(\/.*)$/i);
    if (abs) url = abs[1];

    // Backend + asset library -> upstream
    if (/^\/(cgi-bin|DataBase)\//i.test(url)) {
        console.log('  proxy -> ' + url.split('?')[0]);
        return proxy(url, res);
    }

    // Static files
    const clean = decodeURIComponent(url.split('?')[0]);
    let file = path.join(ROOT, clean);
    if (clean === '/' || clean === '') file = path.join(ROOT, 'index.html');

    // Refuse anything resolving outside the project directory
    if (!file.startsWith(ROOT)) {
        res.writeHead(403); return res.end('Forbidden');
    }

    fs.readFile(file, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found: ' + clean);
        }
        res.writeHead(200, {
            'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
        });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log('Trivia-SmackDown dev server');
    console.log('  http://localhost:' + PORT + '/index.html');
    console.log('  proxying /cgi-bin/ and /DataBase/ -> ' + UPSTREAM);
});
