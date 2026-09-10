/* ==========================================================================
   tsd-bid-value.js — presentation only.

   Client feedback: the bidding screen "must somehow indicate that higher
   bids yield more points and allow more time."

   That information used to be a separate table under the bid pads (an
   unstyled border="1" grid at font-size:8px, rendered by BidButs.fillBoxes).
   It was pulled at the client's request and the render line is still
   commented out in js/BidButs.js. This does NOT bring that table back --
   it puts the same two numbers where the player is already looking: on the
   bid squares themselves.

   WHERE THE NUMBERS COME FROM
   ---------------------------
   BidButs.fillBoxes() still computes them on every round even though it no
   longer draws them (that was deliberate -- the arrays are what score the
   game). This only reads them:

     bidButs.ptArr[i-1]    points for bid i   -- quadratic: 2, 8, 18 ... 100
     bidButs.p0Time[i-1]   seconds for bid i, player 0 (left / blue)
     bidButs.p1Time[i-1]   seconds for bid i, player 1 (right / red)

   Points rise as the SQUARE of the bid and time rises linearly, so the two
   are shown differently below: the points figure is printed, and the rising
   trend is also encoded as a 0-1 ratio the CSS uses to tint and weight each
   square. A player can therefore see the gradient without reading a single
   number, which is what the feedback actually asks for.

   The per-player time arrays are read separately because the two players
   can be set to different speeds (Settings speed level), in which case the
   same bid buys them different amounts of time. Left panel reads p0Time,
   right panel reads p1Time -- blue = player 0 = left is preserved.

   HOW IT ATTACHES
   ---------------
   The squares are <input type="button">, which cannot hold child nodes or
   ::before/::after content, so the figures cannot be nested inside them.
   Each square is therefore moved into a <span class="tsd-bid-pair"> holding
   the button and a <span class="tsd-bid-val"> label beneath it. The pair is
   one grid item, so the cell's existing wrapping track list keeps working
   and a 10-button round still breaks onto two lines as before.

   Two live behaviours constrain this, and both are handled:

     - js/BidButs.js reduceButtons() removes a square with
       `el.parentNode.removeChild(el)`. With a wrapper, parentNode is the
       pair, so the button goes and an EMPTY pair is left behind. Every
       repaint therefore sweeps out pairs that no longer hold a button --
       and the same MutationObserver that sees the removal triggers it.
     - js/Interface.js countRemainingButs() counts .but2Player nodes.
       Neither the pair nor the label carries that class, so the count is
       unchanged. (Its only caller is the debug stub testA(), which
       discards the result, but the count is kept honest regardless.)

   The buttons themselves are never added, removed, reordered, renamed or
   given an inline background -- only re-parented, and only once per round.

   It writes no game value, registers no handler the game depends on, and
   never calls back into BidButs. If the arrays are missing or a round has
   not been built yet it simply does nothing and the squares render exactly
   as they do today.

   Lives in js-ui/ (new-UI scripts), never js/ (the live game load order).
   ========================================================================== */

(function () {
  'use strict';

  /* The two insert points BidButs.js fills, and which player's time array
     belongs to each. Left = player 0 = blue, right = player 1 = red. */
  var PANELS = [
    { id: 'insrtpt0X', side: 'L', times: 'p0Time' },
    { id: 'insrtpt1X', side: 'R', times: 'p1Time' }
  ];

  var scheduled = false;
  /* bounded retries for the case below, so a round that genuinely has no
     arrays cannot spin the loop forever */
  var retries = 0;
  /* set while we are inserting our own labels, so the observer below does
     not treat our own writes as a reason to run again (it would loop) */
  var painting = false;

  /* js/script.js declares the game's instance as `let bidButs = null`, and a
     top-level `let` does NOT become a property of window -- so `window.bidButs`
     is permanently undefined and reading it that way silently found nothing.
     It IS in scope for a bare identifier, so resolve it that way and treat a
     ReferenceError (script.js not loaded yet) as "not ready". */
  function theBidButs() {
    try {
      /* eslint-disable-next-line no-undef */
      return (typeof bidButs !== 'undefined' && bidButs) ? bidButs : null;
    } catch (e) {
      return null;
    }
  }

  function num(v) {
    v = Number(v);
    return isFinite(v) ? v : null;
  }

  /* Read one entry out of a BidButs array, tolerating a short or absent
     array -- fillBoxes() rebuilds these per round and we may run between a
     button being drawn and the arrays being refilled. */
  function at(arr, i) {
    if (!arr || typeof arr.length !== 'number' || i < 0 || i >= arr.length) {
      return null;
    }
    return num(arr[i]);
  }

  /* Drop pairs whose button has been removed. reduceButtons() removes the
     input via parentNode, which empties the pair but leaves it in the grid
     -- without this it would occupy a track as a blank column. */
  function sweep(host) {
    var pairs = host.getElementsByClassName('tsd-bid-pair');
    /* live collection -- walk backwards so removals do not shift the index */
    for (var i = pairs.length - 1; i >= 0; i--) {
      var pair = pairs[i];
      if (!pair.getElementsByClassName('but2Player').length) {
        if (pair.parentNode) pair.parentNode.removeChild(pair);
      }
    }
  }

  /* Label every square in one panel. */
  function paintPanel(panel) {
    var host = document.getElementById(panel.id);
    if (!host) return false;

    sweep(host);

    var live = host.getElementsByClassName('but2Player');
    if (!live.length) return false;

    var bb = theBidButs();
    if (!bb) return false;

    var pts   = bb.ptArr;
    var times = bb[panel.times];

    /* Snapshot: the collection is live and we insert nodes while iterating. */
    var buts = [];
    var k;
    for (k = 0; k < live.length; k++) buts.push(live[k]);

    /* The top bid is worth the most; used to express each square as a
       fraction of the best available so the CSS can draw the ramp. The
       points curve is the one that rises fastest, so it sets the scale. */
    var labelled = 0;
    var maxPts = 0;
    for (k = 0; k < buts.length; k++) {
      var bidN = num(buts[k].value);
      var p = at(pts, (bidN === null ? k + 1 : bidN) - 1);
      if (p !== null && p > maxPts) maxPts = p;
    }

    for (k = 0; k < buts.length; k++) {
      var but = buts[k];

      /* The square's own number is its value ("1".."10"), which is also its
         1-based index. Prefer the value over the loop counter: reduceButtons()
         removes squares from the END, but restartBidding() can leave the
         collection in a state where index and label disagree. */
      var bid = num(but.value);
      if (bid === null) bid = k + 1;

      var thePts = at(pts, bid - 1);
      var theSec = at(times, bid - 1);

      /* already paired from an earlier repaint? */
      var pair = but.parentNode;
      var paired = pair && pair.nodeType === 1
        && pair.className.indexOf('tsd-bid-pair') !== -1;

      if (thePts === null && theSec === null) {
        /* nothing known for this square -- leave a bare button, and undo a
           pairing left over from a previous round */
        if (paired && pair.parentNode) {
          pair.parentNode.insertBefore(but, pair);
          pair.parentNode.removeChild(pair);
        }
        but.style.removeProperty('--tsd-bid-ramp');
        but.removeAttribute('title');
        continue;
      }

      if (!paired) {
        if (!but.parentNode) continue;
        pair = document.createElement('span');
        pair.className = 'tsd-bid-pair';
        but.parentNode.insertBefore(pair, but);
        pair.appendChild(but);
      }

      var label = pair.getElementsByClassName('tsd-bid-val')[0];
      if (!label) {
        label = document.createElement('span');
        label.className = 'tsd-bid-val';
        /* decorative: the same figures are on the button's own title, and a
           screen reader should hear the bid number, not a stream of digits */
        label.setAttribute('aria-hidden', 'true');
        pair.appendChild(label);
      }

      var line = [];
      if (thePts !== null) line.push(Math.round(thePts) + ' pt');
      if (theSec !== null) line.push(Math.round(theSec) + ' s');
      label.textContent = line.join('\n');

      /* 0..1 ramp for the CSS tint. Derived from points, which is the
         value the client named first and the one that actually accelerates. */
      var ramp = (thePts !== null && maxPts > 0) ? (thePts / maxPts) : 0;
      but.style.setProperty('--tsd-bid-ramp', ramp.toFixed(3));
      label.style.setProperty('--tsd-bid-ramp', ramp.toFixed(3));

      /* the same figures, for the pointer and for assistive tech, on the
         control the player actually operates */
      labelled++;
      but.title = 'Bid ' + bid
        + (thePts !== null ? ' — ' + Math.round(thePts) + ' points' : '')
        + (theSec !== null ? ', ' + Math.round(theSec) + ' seconds' : '');
    }

    host.setAttribute('data-bid-values', '');
    return labelled > 0;
  }

  function paint() {
    scheduled = false;
    painting = true;
    var done = 0;
    try {
      for (var i = 0; i < PANELS.length; i++) {
        if (paintPanel(PANELS[i])) done++;
      }
    } finally {
      /* Squares are on screen but the arrays were not ready yet (createButs
         and fillBoxes run in different orders across the game types). Try
         once more on the next frame rather than leaving them unlabelled. */
      if (!done && retries < 10
          && document.getElementsByClassName('but2Player').length) {
        retries++;
        window.setTimeout(function () { painting = false; schedule(); }, 16);
        return;
      }
      if (done) retries = 0;
      /* cleared on the next task, not here: MutationObserver delivers its
         records as a microtask AFTER this returns, so clearing synchronously
         would let our own insertions through and start a loop. */
      window.setTimeout(function () { painting = false; }, 0);
    }
  }

  /* Coalesce the burst of mutations that createButs()/fillBoxes() cause
     when it replaces innerHTML, so we relabel once per round, not per node. */
  function schedule() {
    if (scheduled || painting) return;
    scheduled = true;
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(paint);
    } else {
      window.setTimeout(paint, 0);
    }
  }

  function start() {
    /* BidButs.js rewrites .butHolder innerHTML on every round; watching the
       insert points means we never have to be called by the game code. */
    if (window.MutationObserver) {
      var obs = new MutationObserver(schedule);
      for (var i = 0; i < PANELS.length; i++) {
        var host = document.getElementById(PANELS[i].id);
        if (host) obs.observe(host, { childList: true, subtree: true });
      }
    }
    schedule();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
