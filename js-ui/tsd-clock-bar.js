/* ==========================================================================
   tsd-clock-bar.js — presentation only.

   The bidding clock's progress bar (.tsd-clock-bar > i) was a static 45%
   fill with nothing driving it, so it never moved while the countdown ran.

   Two different game loops write the countdown, both by assigning to
   #timeBox.value once a second:

     js/BidButs.js  runBidClock()  ->  "12 Sec"     (bidding)
     js/script.js   runTheClock()  ->  "12-Sec"     (play)

   Rather than reach into either loop, this watches #timeBox for changes and
   mirrors the value into a --tsd-clock-pct custom property that the bar's
   width reads. The high-water mark seen since the last reset is treated as
   100%, so the bar works for any starting time without being told what it
   is (the bid clock and the play clock use different limits, and the bid
   clock's is user-settable).

   It only ever writes a CSS variable and a data attribute. It does not
   read, change or interfere with any game value, and it registers no
   handlers the game depends on.

   Lives in js-ui/ (new-UI scripts), never js/ (the live game load order).
   ========================================================================== */

(function () {
  'use strict';

  var box  = null;
  var bar  = null;
  var fill = null;
  var view = null;   /* #timeBoxView — the styled stand-in for the input */

  var total = 0;      /* the highest seconds value seen in this run */
  var last  = null;   /* last raw string, so we only react to changes */

  /* "12 Sec", "12-Sec", "9" -> 12 / 12 / 9.  Anything without a leading
     number ("--", "Time's up!", "Bonus = 40", "") -> null. */
  function secondsIn(text) {
    if (text == null) { return null; }
    var m = String(text).match(/^\s*(\d+(?:\.\d+)?)/);
    return m ? parseFloat(m[1]) : null;
  }

  function paint() {
    if (!box || !fill) { return; }

    var raw = box.value;
    if (raw === last) { return; }
    last = raw;

    paintView(raw);

    var sec = secondsIn(raw);

    /* Not a countdown right now ("--", "Time's up!", a bonus message).
       Empty the bar and forget the scale so the next run re-learns it. */
    if (sec === null) {
      total = 0;
      setPct(0);
      bar.removeAttribute('data-tsd-low');
      return;
    }

    /* A value above the high-water mark means a new countdown started
       (or the player changed the bid time), so re-scale to it. */
    if (sec > total) { total = sec; }

    var pct = total > 0 ? (sec / total) * 100 : 0;
    if (pct < 0)   { pct = 0; }
    if (pct > 100) { pct = 100; }

    setPct(pct);

    /* let the CSS colour the last few seconds differently */
    if (sec <= 5) {
      bar.setAttribute('data-tsd-low', '');
    } else {
      bar.removeAttribute('data-tsd-low');
    }
  }

  function setPct(pct) {
    fill.style.width = pct.toFixed(2) + '%';
  }

  /* Mirror #timeBox's value into #timeBoxView, splitting a countdown into
     its number and its unit so each can be sized separately in CSS.

     "19 Sec" / "19-Sec" -> <b>19</b><small>Sec</small>
     anything else ("--", "Time's up!") -> shown as-is in the small style. */
  function paintView(raw) {
    if (!view) { return; }

    var text = raw == null ? '' : String(raw);
    var m = text.match(/^\s*(\d+(?:\.\d+)?)\s*[-\s]?\s*(.*)$/);

    while (view.firstChild) { view.removeChild(view.firstChild); }

    if (!m) {
      view.appendChild(mk('span', 'tsd-clock-msg', text));
      return;
    }

    view.appendChild(mk('span', 'tsd-clock-num', m[1]));

    /* postToTimeBox() writes things like "30--", where the trailing dashes
       are a separator rather than a unit — drop them. */
    var unit = m[2].replace(/^[-\s]+$/, '');
    if (unit) {
      view.appendChild(mk('span', 'tsd-clock-unit', unit));
    }
  }

  function mk(tag, cls, text) {
    var el = document.createElement(tag);
    el.className = cls;
    el.textContent = text;
    return el;
  }

  function start() {
    box  = document.getElementById('timeBox');
    view = document.getElementById('timeBoxView');
    bar  = document.querySelector('.tsd-clock-bar');
    fill = bar ? bar.querySelector('i') : null;

    if (!box) { return; }

    /* the view is a plain span, so send the input's click through to it */
    if (view) {
      view.addEventListener('click', function () { box.click(); });
    }

    if (!fill) { paintView(box.value); return; }

    paint();

    /* #timeBox.value is set from JS, which fires no event — poll it.
       4x a second is far below the 1s tick and costs nothing measurable. */
    setInterval(paint, 250);

    /* catch the user-driven changes immediately too */
    box.addEventListener('click',  function () { setTimeout(paint, 0); });
    box.addEventListener('change', paint);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}());
