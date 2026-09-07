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

   Usage — a message, in place of window.alert():

     TSDModal.alert({
       title:   "Bidding",
       message: helpText,       // plain text; line breaks are preserved
       icon:    "help"          // "help" | "exit" (default)
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
  var iconHost     = null;
  var currentIcon  = "exit";

  var onConfirmCb  = null;
  var onCancelCb   = null;
  var lastFocused  = null;

  /* The dialog glyph is the real exit_icon.svg, fetched and inlined so its
     fill can be driven by CSS `color`. The source ships filled #FD0C75; a CSS
     filter cannot recolour that to an arbitrary hue, but inlining can. */
  var ICON_URL = "images/new-images/icons/exit_icon.svg";

  /* the help glyph — drawn inline (not fetched) so it is available
     immediately and inherits CSS `color` like the exit icon does */
  var ICON_HELP =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="9.2" stroke="currentColor" stroke-width="1.8"/>' +
      '<path d="M9.3 9.2a2.8 2.8 0 1 1 3.5 2.7c-.5.2-.8.6-.8 1.1v.6" ' +
            'stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      '<circle cx="12" cy="16.6" r="1.05" fill="currentColor"/>' +
    '</svg>';

  /* shown until the real glyph loads (and if the fetch fails, e.g. file://) */
  var ICON_FALLBACK =
    '<svg viewBox="0 0 21 19" fill="none" aria-hidden="true">' +
      '<path d="M12.5 1.5H3.1a1.4 1.4 0 0 0-1.4 1.4v13.2a1.4 1.4 0 0 0 1.4 1.4h9.4" ' +
            'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M15.6 6.1 18.8 9.5l-3.2 3.4M18.3 9.5H8.6" ' +
            'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  /* the fetched exit glyph, kept so setIcon() can switch back to it */
  var exitMarkup = ICON_FALLBACK;

  function loadIcon(host) {
    if (!window.fetch) { return; }

    fetch(ICON_URL)
      .then(function (r) { return r.ok ? r.text() : null; })
      .then(function (svg) {
        if (!svg) { return; }
        /* let CSS `color` drive the glyph instead of the baked-in pink */
        exitMarkup = svg.replace(/fill="#FD0C75"/g, 'fill="currentColor"');

        /* only paint it if an exit dialog is the one on screen — otherwise
           a late fetch would stomp the help glyph */
        if (iconHost && currentIcon === "exit") {
          iconHost.innerHTML = exitMarkup;
        }
      })
      .catch(function () { /* keep the fallback glyph */ });
  }

  /* swap the medallion glyph and its tint */
  function setIcon(name) {
    if (!iconHost) { return; }
    currentIcon = (name === "help") ? "help" : "exit";

    iconHost.innerHTML = (currentIcon === "help") ? ICON_HELP : exitMarkup;
    iconHost.style.color = (currentIcon === "help")
      ? "var(--tsd-accent-yellow)"
      : "var(--tsd-blue)";
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

    iconHost = overlay.querySelector(".tsd-modal-icon");
    loadIcon(iconHost);

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
        /* cancelBtn is hidden in alert mode — do not trap focus onto it */
        var f = (cancelBtn.style.display === "none")
          ? [confirmBtn]
          : [confirmBtn, cancelBtn];
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

    setIcon(opts.icon);

    /* Alert mode: one button, and the body is rendered as pre-wrapped,
       left-aligned text. The help copy in js/Help.js is plain text laid out
       with real line breaks and indentation, which the centred single-line
       treatment used for confirmations would destroy. */
    var isAlert = opts.mode === "alert";
    dialog.classList.toggle("tsd-modal-dialog--alert", isAlert);
    cancelBtn.style.display = isAlert ? "none" : "";

    onConfirmCb = typeof opts.onConfirm === "function" ? opts.onConfirm : null;
    onCancelCb  = typeof opts.onCancel  === "function" ? opts.onCancel  : null;

    lastFocused = document.activeElement;

    overlay.classList.add("is-open");

    /* focus the safe option, not the destructive one — in alert mode the
       only button IS the safe one */
    setTimeout(function () {
      (isAlert ? confirmBtn : cancelBtn).focus();
    }, 30);
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

    /* A message with a single dismiss button — the in-game replacement for
       window.alert(). Line breaks in `message` are preserved. */
    alert: function (opts) {
      opts = opts || {};
      open({
        mode:        "alert",
        icon:        opts.icon || "help",
        title:       opts.title || "",
        message:     opts.message || "",
        confirmText: opts.confirmText || "Got it",
        onConfirm:   opts.onConfirm,
        onCancel:    opts.onConfirm   /* Esc / scrim dismiss runs it too */
      });
    },

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
