/* ==========================================================================
   tsd-grid-hit-scale.js — coordinate correction for the picture grid.

   BUG (reported on mobile): tapping a picture puts the check mark on the
   PREVIOUS picture. The narrower the screen, the further off it lands.

   CAUSE
   -----
   js/GameB.js resolves a tap to a grid cell in getRCFmHit(x, y) by counting
   how many cell-widths across the click was:

       this.picWidth  = theFullImage[2];        // the image file's NATURAL width
       this.boxWidth  = this.picWidth / this.cols;
       ...
       gameB.gridHit(event.offsetX, event.offsetY);

   `boxWidth` is derived from the picture's NATURAL size, but `event.offsetX`
   is in RENDERED pixels -- and css/gamepanel.css scales the picture down to
   fit the play area (max-width:100% / max-height:100% on #gridImageWrap and
   #theImage). On a desktop the two are close enough that the answer usually
   lands on the right cell. On a phone the rendered picture can be a third of
   its natural width, so every offset is divided by a box roughly three times
   too wide and the result falls one or more cells short -- the tick appears
   up and to the left of the tap, i.e. on an earlier picture.

   Worked example: an 800px-wide picture, 4 columns, rendered 320px wide.
   Natural boxWidth is 200. A tap in the middle of column 3 is at
   rendered x = 200, which the loop compares against 200/400/600/800 and
   resolves as column 2. Correcting for the 0.4 scale gives column 3.

   THE FIX
   -------
   The game's cell arithmetic is left exactly as it is. This converts the
   incoming coordinates from rendered space to natural space first, so
   getRCFmHit() receives the numbers it was always written to expect:

       naturalX = offsetX * (naturalWidth / renderedWidth)

   It is applied by wrapping GameB.prototype.gridHit -- the single funnel all
   three click listeners call (GameB.js lines 455, 490, 1350). No game value,
   rule, score or timing is touched: the same function runs with the same
   meaning, on coordinates that now describe the same point on the picture.

   The scale is read from the live <img> at the moment of the tap
   (naturalWidth vs getBoundingClientRect().width), so it stays correct
   through orientation changes, the fit-to-screen transform in
   js-ui/tsd-fit-screen.js, and any responsive resize -- nothing has to be
   recomputed or invalidated.

   If anything is missing or the numbers look wrong (no image, image not yet
   decoded, a zero or non-finite scale, a scale of 1) the original
   coordinates are passed straight through untouched, so the behaviour is
   never worse than it is today.

   Lives in js-ui/ (new-UI scripts), never js/ (the live game load order).
   ========================================================================== */

(function () {
  'use strict';

  /* The picture GameB tracks its clicks against. #theImage is the id the
     renderer gives the composite grid picture. */
  function theGridImage() {
    var img = document.getElementById('theImage');
    if (img && img.tagName === 'IMG') return img;

    /* fallback: the first image inside the grid wrapper */
    var wrap = document.getElementById('gridImageWrap');
    if (wrap) {
      var imgs = wrap.getElementsByTagName('img');
      if (imgs.length) return imgs[0];
    }
    return null;
  }

  /* rendered -> natural multiplier, or null when it cannot be trusted */
  function scaleOf(img) {
    if (!img) return null;

    var natW = img.naturalWidth;
    var natH = img.naturalHeight;
    /* not decoded yet -- naturalWidth is 0 until then */
    if (!natW || !natH) return null;

    /* offsetWidth/offsetHeight, NOT getBoundingClientRect().

       #gameInsrtPt (an ancestor of the picture) carries
       `transform: scale(var(--tsd-fit-scale))` from the fit-to-screen rules
       in css/gamepanel.css. getBoundingClientRect() reports the size AFTER
       that transform, while event.offsetX is measured in the element's own
       untransformed box -- mixing the two would apply the fit scale twice
       and overshoot in the other direction.

       offsetWidth is the untransformed layout width, which is exactly the
       space offsetX is expressed in. */
    var renW = img.offsetWidth;
    var renH = img.offsetHeight;
    if (!renW || !renH) return null;

    var sx = natW / renW;
    var sy = natH / renH;

    if (!isFinite(sx) || !isFinite(sy) || sx <= 0 || sy <= 0) return null;

    return { x: sx, y: sy };
  }

  function install() {
    if (typeof GameB !== 'function' || !GameB.prototype) return false;
    if (GameB.prototype.gridHit && GameB.prototype.gridHit.__tsdScaled) {
      return true;
    }

    var original = GameB.prototype.gridHit;
    if (typeof original !== 'function') return false;

    function gridHit(x, y, id) {
      var s = scaleOf(theGridImage());

      /* Only rewrite when we have a trustworthy scale AND it actually
         differs from 1 -- on a desktop where the picture renders at its
         natural size there is nothing to correct. */
      if (s && (Math.abs(s.x - 1) > 0.001 || Math.abs(s.y - 1) > 0.001)) {
        var nx = Number(x);
        var ny = Number(y);
        if (isFinite(nx) && isFinite(ny)) {
          x = nx * s.x;
          y = ny * s.y;
        }
      }

      return original.call(this, x, y, id);
    }

    gridHit.__tsdScaled = true;
    GameB.prototype.gridHit = gridHit;
    return true;
  }

  function start() {
    if (install()) return;
    /* GameB.js loads before this file, so install() normally succeeds on the
       first try. Retry briefly in case the load order ever changes. */
    var tries = 0;
    var t = window.setInterval(function () {
      if (install() || ++tries > 40) window.clearInterval(t);
    }, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
