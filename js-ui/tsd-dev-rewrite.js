/* ==========================================================================
   tsd-dev-rewrite.js — routes the hard-coded edugames.com data calls through
   the same-origin proxy. Presentation/deployment shim; no game logic.

   Most of the game's remote calls use a relative path (/cgi-bin/...), which
   dev-server.js already proxies. Four call sites hard-code the absolute
   origin instead:

     js/SelectionPanel.js:104   https://www.edugames.com/cgi-bin/GetRoundsTSD.pl
     js/SubSet.js:56            https://www.edugames.com/cgi-bin/GetASetTSD.pl
     js/script.js:1508, 1557    https://edugames.com/cgi-bin/GetTextFileTSD.pl

   A browser fetch to those from localhost is refused: the server sends
   Access-Control-Allow-Origin: https://trivia-smackdown.com, so only the
   real site may call them from script.

   Rather than edit four game files (and risk that edit shipping), this
   rewrites those URLs to same-origin paths at fetch time, so they travel
   through the dev proxy like every other request.

   Images are untouched — <img src> is not subject to CORS, so absolute
   image URLs load from edugames.com directly and work as-is.

   Changes no game logic: it intercepts window.fetch, rewrites the URL
   string, and delegates to the original fetch.

   ---------------------------------------------------------------------------
   NOW ALSO RUNS ON DEPLOYED PREVIEWS (Netlify), not just localhost.

   The same CORS refusal that blocks localhost blocks any preview host: the
   server names exactly ONE origin (https://trivia-smackdown.com) and sends
   that header to everyone, so a Netlify deploy fails identically --

       Error fetching data: TypeError: Failed to fetch
           at GameQ.getData (GameQ.js:430:5)

   netlify.toml already proxies /cgi-bin/* and /DataBase/* to the real
   server, exactly as dev-server.js does locally, and a proxied request is
   same-origin so CORS never applies. js/Set.js already requests its paths
   relatively, which is why sets and round lists load on Netlify while GameQ
   does not -- GameQ's path is built absolute by script.js getTextFilePath().

   The host gate below therefore allows any origin that is NOT the live site.
   On trivia-smackdown.com the shim stays inert and the absolute URLs are
   used exactly as before, so the production path is untouched.
   ========================================================================== */

(function () {
  'use strict';

  //Inert on the live site, active everywhere else (localhost and any preview
  //deployment). The live site is the one origin the data server's CORS header
  //names, so there the absolute URLs already work and must not be rewritten.
  const host = location.hostname;
  const isLiveSite = /(^|\.)trivia-smackdown\.com$/i.test(host)
                  || /(^|\.)edugames\.com$/i.test(host);
  if (isLiveSite) return;

  //dev-server.js injects this same tag into every page it serves, and
  //GamePanel.html now carries it too, so locally it loads twice. Wrapping a
  //wrapper would work but doubles the logging and the indirection -- bail if
  //the shim is already installed.
  if (window.fetch && window.fetch.__tsdRewrite) return;

  const ORIGIN_RE = /^https?:\/\/(www\.)?edugames\.com/i;

  //Only these two prefixes are proxied (netlify.toml, dev-server.js). Any
  //other path on that host is left absolute rather than rewritten into a 404.
  const PROXIED_RE = /^\/(cgi-bin|DataBase)\//i;

  const nativeFetch = window.fetch.bind(window);

  window.fetch = function (input, init) {
    try {
      if (typeof input === 'string' && ORIGIN_RE.test(input)) {
        const rewritten = input.replace(ORIGIN_RE, '');
        if (PROXIED_RE.test(rewritten)) {
          console.log('[tsd-rewrite] ' + input + '  ->  ' + rewritten);
          return nativeFetch(rewritten, init);
        }
      }
      if (input instanceof Request && ORIGIN_RE.test(input.url)) {
        const rewritten = input.url.replace(ORIGIN_RE, '');
        if (PROXIED_RE.test(rewritten)) {
          console.log('[tsd-rewrite] ' + input.url + '  ->  ' + rewritten);
          return nativeFetch(new Request(rewritten, input), init);
        }
      }
    } catch (e) {
      //Never let the shim break a real request.
      console.warn('[dev-rewrite] passthrough after error:', e);
    }
    return nativeFetch(input, init);
  };

  window.fetch.__tsdRewrite = true;

  console.log('[tsd-rewrite] active — edugames.com fetches routed via the same-origin proxy');
})();
