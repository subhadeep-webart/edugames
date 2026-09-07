/* tsd-score-pulse.js -- UI layer only.

   The moment a round resolves is the one the player is waiting for: the
   bid is won or lost and the score moves. In the current UI that moment
   passes silently -- Interface.js writes the new number straight into
   #rndTotL / #rndTotR with textContent and the digits simply change. On a
   phone, where the score card is small and the eye is on the play area, it
   is easy to miss the thing you were playing for.

   This script watches those four score elements and reacts when their text
   changes:

     - the number counts up (or down) to its new value rather than jumping
     - the card flashes: green when the score went UP, red when it went DOWN
     - a floating "+120" / "-50" rises off the card

   It is a pure observer. It never computes, stores or writes game state --
   it reads the text the game already put on screen and animates the same
   element. Remove this file and the game is unchanged.

   Why a MutationObserver rather than hooking Interface.updateScoreBoards():
   the score is written from several places (updateScoreBoards, awardPoints
   and displayPtsThisPlay all touch rndTot*), so patching each one would
   mean editing signed-off game logic. Observing the DOM catches every
   writer, including any added later, and touches none of them.

   Respects prefers-reduced-motion: the value still updates, instantly, and
   the flash and floating chip are skipped. */
(function () {
  "use strict";

  var SCORE_IDS = ["rndTotL", "rndTotR"];
  var TOTAL_IDS = ["setTotL", "setTotR"];

  /* how long the count-up runs; short enough not to delay the next round */
  var COUNT_MS = 620;

  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) { /* matchMedia absent -- assume motion is fine */ }

  /* ------------------------------------------------------------------
     Reading a score out of the DOM.

     These elements do not always hold a bare number: Interface.js writes
     "Set Total= 300" into #setTotL but a plain "300" into #rndTotL, and a
     broken award can leave "NaN" (a known logic bug, see
     docs/10-known-issues.md -- not ours to fix, but we must not animate
     it). Pull the first signed integer out of whatever text is there.
     ------------------------------------------------------------------ */
  function numberIn(text) {
    if (text == null) { return null; }
    var m = String(text).match(/-?\d+/);
    if (!m) { return null; }
    var n = parseInt(m[0], 10);
    return isFinite(n) ? n : null;
  }

  /* The non-numeric part of the label, so a count-up can rebuild
     "Set Total= 240" rather than replacing it with a bare "240". */
  function templateFor(text) {
    var s = String(text == null ? "" : text);
    var m = s.match(/-?\d+/);
    if (!m) { return null; }
    return { before: s.slice(0, m.index), after: s.slice(m.index + m[0].length) };
  }

  /* ------------------------------------------------------------------
     Count-up.

     Writes into the SAME element the game wrote to. That is safe because
     the game only ever sets this text wholesale and never reads it back to
     compute anything (verified: nothing in js/ reads rndTot*.textContent).
     If a new value arrives mid-animation the run is cancelled and the
     newest value wins, so the displayed number cannot lag the real score.
     ------------------------------------------------------------------ */
  var running = {};   /* id -> requestAnimationFrame handle */

  function cancel(id) {
    if (running[id]) {
      cancelAnimationFrame(running[id]);
      running[id] = null;
    }
  }

  function countTo(el, from, to, tpl) {
    var id = el.id;
    cancel(id);

    if (reduceMotion || from === to) {
      return;   /* the text the game wrote is already correct */
    }

    var start = null;
    var delta = to - from;

    function frame(ts) {
      if (start === null) { start = ts; }
      var t = (ts - start) / COUNT_MS;
      if (t > 1) { t = 1; }

      /* ease-out cubic: quick off the mark, settles onto the final value */
      var eased = 1 - Math.pow(1 - t, 3);
      var val = Math.round(from + delta * eased);

      el.textContent = tpl ? (tpl.before + val + tpl.after) : String(val);

      if (t < 1) {
        running[id] = requestAnimationFrame(frame);
      } else {
        running[id] = null;
        /* land exactly on the real value, not on our rounding */
        el.textContent = tpl ? (tpl.before + to + tpl.after) : String(to);
      }
    }

    running[id] = requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------------
     The card flash and the floating delta.
     ------------------------------------------------------------------ */
  function cardFor(el) {
    return el.closest ? el.closest(".tsd-pl-card") : null;
  }

  function flash(el, up) {
    var card = cardFor(el);
    if (!card || reduceMotion) { return; }

    var cls = up ? "tsd-score-up" : "tsd-score-down";
    card.classList.remove("tsd-score-up", "tsd-score-down");
    /* force a reflow so re-adding the class restarts the animation even
       when the same direction fires twice in a row */
    void card.offsetWidth;
    card.classList.add(cls);

    window.setTimeout(function () {
      card.classList.remove(cls);
    }, 900);
  }

  function floatDelta(el, delta) {
    var card = cardFor(el);
    if (!card || reduceMotion || !delta) { return; }

    var chip = document.createElement("span");
    chip.className = "tsd-score-delta " +
      (delta > 0 ? "tsd-score-delta--up" : "tsd-score-delta--down");
    chip.textContent = (delta > 0 ? "+" : "") + delta;
    /* the score element itself is the accessible announcement */
    chip.setAttribute("aria-hidden", "true");
    card.appendChild(chip);

    window.setTimeout(function () {
      if (chip.parentNode) { chip.parentNode.removeChild(chip); }
    }, 1100);
  }

  /* ------------------------------------------------------------------
     Wiring
     ------------------------------------------------------------------ */
  var last = {};   /* id -> last numeric value seen */

  function handle(el, animateCard) {
    var id = el.id;
    var text = el.textContent;
    var now = numberIn(text);

    /* "NaN", or an empty card: record nothing and animate nothing, so a
       corrupt score never produces a nonsense "+NaN" chip */
    if (now === null) {
      last[id] = null;
      cancel(id);
      return;
    }

    var before = last[id];
    last[id] = now;

    if (before === null || before === undefined || before === now) {
      return;   /* first sighting, or no real change */
    }

    countTo(el, before, now, templateFor(text));

    if (animateCard) {
      flash(el, now > before);
      floatDelta(el, now - before);
    }
  }

  function watch(id, animateCard) {
    var el = document.getElementById(id);
    if (!el) { return; }

    last[id] = numberIn(el.textContent);

    var obs = new MutationObserver(function () {
      /* the count-up writes to this element too; ignore those frames by
         only acting when no run is in progress for it */
      if (running[id]) { return; }
      handle(el, animateCard);
    });

    obs.observe(el, { childList: true, characterData: true, subtree: true });
  }

  function init() {
    var i;
    /* the round score drives the flash and the floating delta */
    for (i = 0; i < SCORE_IDS.length; i++) { watch(SCORE_IDS[i], true); }
    /* the set total counts up quietly -- two flashes at once reads as noise */
    for (i = 0; i < TOTAL_IDS.length; i++) { watch(TOTAL_IDS[i], false); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
