/* ==========================================================================
   Trivia-SmackDown — Global confirm modal
   Requires css/tokens.css + css/modal.css.

   This file is part of the NEW UI layer. It is deliberately kept out of js/
   so it is never confused with the live game scripts.

   Usage — confirm before exiting:

     TSDModal.confirmExit(function () {
       window.location.href = "somewhere.html";
     });

   Usage — any confirmation:

     TSDModal.confirm({
       title:   "Exit Game ?",
       message: "Are you sure you want to leave the game?",
       confirmText: "Yes, Exit",
       cancelText:  "No, Continue",
       onConfirm: function () { ... },
       onCancel:  function () { ... }
     });

   Only one dialog exists in the DOM at a time; it is built on first use.
   ========================================================================== */

var TSDModal = (function () {
  "use strict";

  var overlay      = null;
  var dialog       = null;
  var titleEl      = null;
  var textEl       = null;
  var confirmBtn   = null;
  var cancelBtn    = null;

  var onConfirmCb  = null;
  var onCancelCb   = null;
  var lastFocused  = null;

  /* The dialog glyph is the real exit_icon.svg, fetched and inlined so its
     fill can be driven by CSS `color`. The source ships filled #FD0C75; a CSS
     filter cannot recolour that to an arbitrary hue, but inlining can. */
  var ICON_URL = "images/new-images/icons/exit_icon.svg";

  /* shown until the real glyph loads (and if the fetch fails, e.g. file://) */
  var ICON_FALLBACK =
    '<svg viewBox="0 0 21 19" fill="none" aria-hidden="true">' +
      '<path d="M12.5 1.5H3.1a1.4 1.4 0 0 0-1.4 1.4v13.2a1.4 1.4 0 0 0 1.4 1.4h9.4" ' +
            'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M15.6 6.1 18.8 9.5l-3.2 3.4M18.3 9.5H8.6" ' +
            'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  function loadIcon(host) {
    if (!window.fetch) { return; }

    fetch(ICON_URL)
      .then(function (r) { return r.ok ? r.text() : null; })
      .then(function (svg) {
        if (!svg) { return; }
        /* let CSS `color` drive the glyph instead of the baked-in pink */
        host.innerHTML = svg.replace(/fill="#FD0C75"/g, 'fill="currentColor"');
      })
      .catch(function () { /* keep the fallback glyph */ });
  }

  /* ---------------------------------------------------------------
     Build the dialog once, on first use.
     --------------------------------------------------------------- */
  function build() {
    if (overlay) { return; }

    overlay = document.createElement("div");
    overlay.className = "tsd-modal";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "tsdModalTitle");
    overlay.setAttribute("aria-describedby", "tsdModalText");

    overlay.innerHTML =
      '<div class="tsd-modal-dialog">' +
        '<div class="tsd-modal-icon" style="color: var(--tsd-blue)">' + ICON_FALLBACK + '</div>' +
        '<h2 class="tsd-modal-title" id="tsdModalTitle"></h2>' +
        '<p class="tsd-modal-text" id="tsdModalText"></p>' +
        '<div class="tsd-modal-actions">' +
          '<button type="button" class="tsd-btn tsd-btn--primary" data-tsd-confirm></button>' +
          '<button type="button" class="tsd-btn tsd-btn--ghost"   data-tsd-cancel></button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);

    dialog     = overlay.querySelector(".tsd-modal-dialog");
    titleEl    = overlay.querySelector("#tsdModalTitle");
    textEl     = overlay.querySelector("#tsdModalText");
    confirmBtn = overlay.querySelector("[data-tsd-confirm]");
    cancelBtn  = overlay.querySelector("[data-tsd-cancel]");

    loadIcon(overlay.querySelector(".tsd-modal-icon"));

    confirmBtn.addEventListener("click", function () { resolve(true);  });
    cancelBtn.addEventListener("click",  function () { resolve(false); });

    /* click the scrim to dismiss */
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) { resolve(false); }
    });

    /* Esc to dismiss, Tab trapped inside the dialog */
    document.addEventListener("keydown", function (e) {
      if (!isOpen()) { return; }

      if (e.key === "Escape") {
        e.preventDefault();
        resolve(false);
        return;
      }

      if (e.key === "Tab") {
        var f = [confirmBtn, cancelBtn];
        var i = f.indexOf(document.activeElement);
        e.preventDefault();
        if (e.shiftKey) {
          f[(i <= 0 ? f.length : i) - 1].focus();
        } else {
          f[(i + 1) % f.length].focus();
        }
      }
    });
  }

  function isOpen() {
    return !!overlay && overlay.classList.contains("is-open");
  }

  /* ---------------------------------------------------------------
     Open / close
     --------------------------------------------------------------- */
  function open(opts) {
    build();

    opts = opts || {};

    titleEl.textContent    = opts.title       || "Are you sure ?";
    textEl.textContent     = opts.message     || "";
    confirmBtn.textContent = opts.confirmText || "Yes";
    cancelBtn.textContent  = opts.cancelText  || "No";

    textEl.style.display = opts.message ? "" : "none";

    onConfirmCb = typeof opts.onConfirm === "function" ? opts.onConfirm : null;
    onCancelCb  = typeof opts.onCancel  === "function" ? opts.onCancel  : null;

    lastFocused = document.activeElement;

    overlay.classList.add("is-open");

    /* focus the safe option, not the destructive one */
    setTimeout(function () { cancelBtn.focus(); }, 30);
  }

  function close() {
    if (!overlay) { return; }
    overlay.classList.remove("is-open");

    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
    lastFocused = null;
  }

  function resolve(confirmed) {
    var cb = confirmed ? onConfirmCb : onCancelCb;

    onConfirmCb = null;
    onCancelCb  = null;

    close();

    /* run after the close transition so the dialog is not visibly
       hanging around during a navigation */
    if (cb) { setTimeout(cb, confirmed ? 180 : 0); }
  }

  /* ---------------------------------------------------------------
     Public API
     --------------------------------------------------------------- */
  return {
    confirm: open,
    close:   close,
    isOpen:  isOpen,

    /* the standard exit prompt, so every screen words it identically */
    confirmExit: function (onConfirm) {
      open({
        title:       "Exit Game ?",
        message:     "Are you sure you want to leave the game? " +
                     "Any unsaved progress will be lost.",
        confirmText: "Yes, Exit",
        cancelText:  "No, Continue",
        onConfirm:   onConfirm
      });
    }
  };
}());
