/* ==========================================================================
   tsd-slider-fill.js — presentation only.

   WebKit/Blink has no ::-moz-range-progress equivalent, so the filled part
   of a range track cannot be expressed in CSS alone. This mirrors each
   slider's value into a --tsd-sl-pct custom property, which the track
   gradient in css/gamepanel.css reads.

   It only ever writes a CSS variable. It does not read, change or interfere
   with any game value, and it attaches no handlers the game relies on:
   GameD's own oninput/onchange attributes are untouched and still fire.

   Lives in js-ui/ (new-UI scripts), never js/ (the live game load order).
   ========================================================================== */

(function () {
  'use strict';

  var SEL = '#gamePlayArea input[type="range"]';

  function paint(el) {
    var min = parseFloat(el.min);
    var max = parseFloat(el.max);
    var val = parseFloat(el.value);

    if (!isFinite(min)) { min = 0; }
    if (!isFinite(max)) { max = 100; }
    if (!isFinite(val)) { val = min; }

    var span = max - min;
    var pct  = span > 0 ? ((val - min) / span) * 100 : 0;

    el.style.setProperty('--tsd-sl-pct', pct.toFixed(2) + '%');
  }

  function paintAll() {
    var list = document.querySelectorAll(SEL);
    for (var i = 0; i < list.length; i++) { paint(list[i]); }
  }

  /* live drag — capture phase, so this never sits between the slider and
     the game's own inline handlers */
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t && t.matches && t.matches(SEL)) { paint(t); }
  }, true);

  /* The sliders are written into #gamePlayArea long after load, and their
     min/max are set from the question data afterwards. Re-paint whenever
     that subtree changes so a freshly built slider is filled correctly. */
  function watch() {
    var area = document.getElementById('gamePlayArea');
    if (!area) { return; }
    new MutationObserver(paintAll).observe(area, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['min', 'max', 'value']
    });
    paintAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watch);
  } else {
    watch();
  }
})();
