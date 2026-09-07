/* ==========================================================================
   tsd-dev-rewrite.js — LOCAL DEVELOPMENT ONLY. Do not deploy.

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

   Loaded only by the dev server; never referenced from the deployed pages.
   Changes no game logic: it intercepts window.fetch, rewrites the URL
   string, and delegates to the original fetch.
   ========================================================================== */

(function () {
  'use strict';

  //Only meaningful on a local origin. On the real site this is a no-op, so
  //an accidental deploy cannot change how the game talks to the server.
  const host = location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '';
  if (!isLocal) return;

  const ORIGIN_RE = /^https?:\/\/(www\.)?edugames\.com/i;

  const nativeFetch = window.fetch.bind(window);

  window.fetch = function (input, init) {
    try {
      if (typeof input === 'string' && ORIGIN_RE.test(input)) {
        const rewritten = input.replace(ORIGIN_RE, '');
        console.log('[dev-rewrite] ' + input + '  ->  ' + rewritten);
        return nativeFetch(rewritten, init);
      }
      if (input instanceof Request && ORIGIN_RE.test(input.url)) {
        const rewritten = input.url.replace(ORIGIN_RE, '');
        console.log('[dev-rewrite] ' + input.url + '  ->  ' + rewritten);
        return nativeFetch(new Request(rewritten, input), init);
      }
    } catch (e) {
      //Never let the shim break a real request.
      console.warn('[dev-rewrite] passthrough after error:', e);
    }
    return nativeFetch(input, init);
  };

  console.log('[dev-rewrite] active — edugames.com fetches routed via the dev proxy');
})();
