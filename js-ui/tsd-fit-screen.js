/* ==========================================================================
   tsd-fit-screen.js — keep the whole game panel inside the viewport.

   Why this exists
   ---------------
   The client's requirement is that the entire game is visible at once: no
   page scrollbar, and no scrollbar inside the play area either.

   css/gamepanel.css already does the structural half of the job: the page
   is a flex column (header + scorebar + question bar are fixed bands, and
   .tsd-play-area flexes into whatever height is left). That alone fixes the
   common case.

   What CSS cannot fix is the generated content, because its size comes from
   four independent places that a stylesheet cannot reach consistently:

     1. HTML width/height attributes written by the renderers
        (GameD writes width="503" / width="500px", GameC writes
        width='${sizeArray[0]}' from the question data)
     2. inline styles written at runtime (GameI.js:226 positions its cover
        panels with el.style.width / .height in image pixels)
     3. the question data's own FntSize / AnsFntSize, applied inline by the
        renderers
     4. the user's font-size setting (small -> xx-large, Settings.js)

   So rather than chase each renderer, this measures the play area once its
   content has rendered and, if the content is taller or wider than the
   band, applies a single uniform `transform: scale()` to shrink it to fit.

   Why a transform is safe here
   ----------------------------
   - It is purely visual: no layout value the game reads is changed.
   - It is uniform, so nothing is squashed and GameI's cover panels stay
     registered to the artwork they cover (their coordinates are inside the
     scaled box, so they scale with it).
   - GameC's drag-and-drop compares getBoundingClientRect() against
     e.clientY. Both are measured in the same post-transform coordinate
     space, so the comparison stays consistent and dragging still works.

   This file only ever writes --tsd-fit-scale and reads geometry. It does
   not touch game state, scores, timing or answers.
   ========================================================================== */

(function () {
  "use strict";

  var MIN_SCALE = 0.45;   /* below this text stops being readable; the band
                             is out of room and clipping is preferable to
                             an unreadable screen. Never hit in practice at
                             the sizes tested (1280x720 and up). */
  var EPSILON   = 2;      /* px of slack: sub-pixel rounding should not
                             trigger a rescale. */

  var playArea = null;
  var scheduled = false;

  function measureAndFit() {
    scheduled = false;
    if (!playArea) return;

    /* Measure at natural size: remove any previous scale first, otherwise
       we would be measuring content we have already shrunk and the factor
       would compound on every pass. */
    playArea.style.setProperty("--tsd-fit-scale", "1");

    /* Same for the GameI stage: reset its zoom multiplier before measuring,
       otherwise we measure an already-shrunk stage and compound. */
    playArea.style.setProperty("--tsd-gi-fit", "1");

    /* The Pre-Game Notice overlays the board rather than stacking below it
       (see the :has() rule in gamepanel.css). :has() is unsupported in
       older browsers, and this audience skews older, so mark the state with
       a plain class as well and let the stylesheet key off either. */
    var pgHost = playArea.querySelector("#gamePlayArea");
    if (pgHost) {
      var hasNotice = !!pgHost.querySelector(".tsd-pregame");
      pgHost.classList.toggle("has-pregame", hasNotice);
    }

    /* Reading a layout property forces the style changes above to be applied
       before anything is measured. Without this the browser may still report
       the PREVIOUS scale's geometry, so the content looks bigger than it is
       and the scale is driven lower on every pass -- a ten-item drag board
       measured 588px when it actually needed 492px and was shrunk to 0.87
       for no reason. */
    /* eslint-disable-next-line no-unused-expressions */
    playArea.offsetHeight;

    var availH = playArea.clientHeight;
    var availW = playArea.clientWidth;
    if (!availH || !availW) return;

    /* An <img> with no width/height attributes is 0px until it decodes, so
       a measurement taken before then concludes "it fits" and leaves the
       scale at 1. Wait for any still-loading image and re-measure. */
    var imgs = playArea.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
      if (!imgs[i].complete) {
        imgs[i].addEventListener("load",  schedule, { once: true });
        imgs[i].addEventListener("error", schedule, { once: true });
        return;
      }
    }

    /* Measure in UNSCALED units only.

       offsetHeight/offsetWidth report the element's own layout size and
       ignore any transform on it, whereas getBoundingClientRect() returns
       the post-transform box. Mixing the two is what made this compound:
       the scale was reset in the style attribute but the browser had not
       necessarily re-laid-out yet, so a scaled rect was compared against an
       unscaled scrollHeight and the content looked permanently too big --
       a ten-item drag board that needs 492px measured 588px and was shrunk
       to 0.87 for no reason.

       offsetTop is relative to the offsetParent rather than to this element,
       so accumulate height + top offset the same way for every child. */
    var needH = 0;
    var needW = 0;
    var kids  = playArea.children;
    for (var k = 0; k < kids.length; k++) {
      var kid = kids[k];
      var kh  = kid.offsetHeight;
      if (kh <= 0) continue;

      /* offsetHeight ignores `zoom` as well as transforms, and the GameI
         stage inside #imageInsertPt is zoomed by a large factor (3.3 by
         design). Left uncorrected it measured at a fraction of its rendered
         size, the content looked like it fitted, and the stage was left at
         full zoom running off the bottom of the screen. Multiply its
         layout size back up by the zoom actually in effect. */
      var zoom = parseFloat(getComputedStyle(kid).zoom);
      if (!zoom || isNaN(zoom)) zoom = 1;

      /* offsetTop is measured against the nearest positioned ancestor,
         which is .tsd-play-area itself (it is position:relative), so this
         is already the offset inside the band. */
      var h = kid.offsetTop + kh * zoom;
      var w = kid.offsetWidth * zoom;
      if (h > needH) needH = h;
      if (w > needW) needW = w;
    }
    /* Nothing measurable yet -- leave the scale alone. */
    if (!needH) return;

    if (needH <= availH + EPSILON && needW <= availW + EPSILON) {
      return;                       /* already fits — leave it alone */
    }

    /* Aim a hair under the exact fit. The zoom/transform factors are
       floating point and the browser rounds the result to device pixels, so
       an exact-fit scale can still leave the last row a pixel or two past
       the edge. */
    var scale = Math.min(availH / needH, availW / needW) * 0.99;
    if (scale > 1) scale = 1;
    if (scale < MIN_SCALE) scale = MIN_SCALE;

    /* The GameI stage is zoomed, and it has overflow:hidden so the cover
       panels cannot spill past the artwork. That means a transform on its
       parent would shrink the box and CLIP the map inside it. Lower the
       stage's own zoom instead, which scales artwork and panels together
       and leaves them registered. */
    var stage = playArea.querySelector("#imageInsertPt");
    if (stage && stage.children.length && scale < 1) {
      /* The stage starts at offsetTop inside the band, so only the space
         BELOW that offset is available to it. Scaling by the whole band's
         ratio ignores the offset and leaves the artwork a couple of pixels
         past the edge, so derive the stage's own factor from the room it
         actually has. */
      var stageTop  = stage.offsetTop;
      var stageZoom = parseFloat(getComputedStyle(stage).zoom) || 1;
      var stageNeed = stage.offsetHeight * stageZoom;
      var stageRoom = availH - stageTop;
      if (stageNeed > 0 && stageRoom > 0) {
        var sScale = (stageRoom / stageNeed) * 0.99;
        if (sScale < scale) scale = sScale;
      }
      if (scale > 1) scale = 1;
      if (scale < MIN_SCALE) scale = MIN_SCALE;
      playArea.style.setProperty("--tsd-gi-fit", String(scale));
      /* The stage now fits on its own, so the outer transform must not
         shrink it a second time. */
      playArea.style.setProperty("--tsd-fit-scale", "1");
      return;
    }

    playArea.style.setProperty("--tsd-fit-scale", String(scale));
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    /* rAF so we measure after the renderer's DOM writes have been laid out,
       not in the middle of them. */
    requestAnimationFrame(measureAndFit);
  }

  function init() {
    playArea = document.querySelector(".tsd-play-area");
    if (!playArea) return;

    schedule();

    /* The game replaces the play area's contents on every round and every
       reveal, so re-fit whenever anything in there changes. */
    if (typeof MutationObserver !== "undefined") {
      new MutationObserver(schedule).observe(playArea, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "width", "height", "src", "hidden", "class"]
      });
    }

    window.addEventListener("resize", schedule);

    /* Images arrive after their markup, and an <img> with no dimensions is
       0px tall until it loads — so a measurement taken before then would
       conclude everything fits. Re-fit on each load. */
    window.addEventListener("load", schedule, true);
    playArea.addEventListener("load", schedule, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
