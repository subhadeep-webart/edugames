/* ==========================================================================
   tsd-player-turn.js — presentation only.

   BUG (reported): on the year/date slider rounds ("When was the first moon
   landing?") player 1 drags the slider and it is drawn in PLAYER 2's colour,
   so the player appears to be answering as the wrong side.

   CAUSE
   -----
   The slider's fill, thumb and focus ring are painted from a single fixed
   token in css/tokens.css:

       --tsd-sl-fill:  #FD0C75;     <- this is --tsd-accent-pink
       --tsd-sl-thumb: #F6A3C7;

   #FD0C75 is the established PLAYER 2 colour -- css/gamepanel.css uses
   var(--tsd-accent-pink) for .tsd-bid-panel--p2 .but2Player.is-bid, and blue
   (--tsd-blue, #0683FC) for player 1. So the slider is hard-coded to player
   2's colour and never changes hands, whoever is actually playing.

   GameD does have colour code for this -- setPlayerColors() and
   setInitialValues() both assign a background to #sliderYear -- but neither
   is called from anywhere (verified: no call sites in js/), and both write
   "Salmon"/"SkyBlue", which predate the current palette. The live colour is
   entirely the CSS token above.

   THE FIX
   -------
   Whose turn it is lives only in JS, as cp.itf.nowPlaying (0 = left/blue,
   1 = right/red). Nothing reflects it into the DOM, so CSS cannot see it.
   This mirrors that one value onto <body> as a data attribute:

       <body data-tsd-turn="0">   player 1, blue
       <body data-tsd-turn="1">   player 2, red

   css/gamepanel.css then re-points --tsd-sl-fill / --tsd-sl-thumb at the
   matching player colour. Blue = player 0 = left is preserved exactly.

   It only READS cp.itf.nowPlaying and writes one attribute. It never assigns
   to nowPlaying, never changes a turn, and touches no game value -- turn
   order, scoring and answer handling are entirely unaffected.

   WHY POLLING
   -----------
   nowPlaying is a plain property written from several places (Interface.js
   changePlayers(), Game.js:188, GameN.js:393-394, ...), so there is no single
   hook to wrap and no event to listen for. A short interval is the least
   invasive way to observe it: it reads one integer and does nothing at all
   unless the value actually changed. Defining a setter on it would be more
   precise but would mean redefining a property the game owns, which is a far
   bigger intrusion for a colour.

   Lives in js-ui/ (new-UI scripts), never js/ (the live game load order).
   ========================================================================== */

(function () {
  'use strict';

  var ATTR = 'data-tsd-turn';
  var last = null;

  /* cp is declared with `let` in js/script.js, so it is NOT a property of
     window -- read it as a bare identifier and treat "not ready yet" as
     simply nothing to do. */
  function currentTurn() {
    try {
      /* eslint-disable-next-line no-undef */
      if (typeof cp === 'undefined' || !cp || !cp.itf) return null;
      /* eslint-disable-next-line no-undef */
      var n = cp.itf.nowPlaying;
      return (n === 0 || n === 1) ? n : null;
    } catch (e) {
      return null;
    }
  }

  function sync() {
    var turn = currentTurn();
    if (turn === last) return;
    last = turn;

    if (turn === null) {
      document.body.removeAttribute(ATTR);
    } else {
      document.body.setAttribute(ATTR, String(turn));
    }
  }

  function start() {
    sync();
    /* 120ms: fast enough that the colour has changed before a player reaches
       for the slider, cheap enough to be irrelevant (one integer read). */
    window.setInterval(sync, 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
