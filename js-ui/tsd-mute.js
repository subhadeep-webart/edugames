/* ==========================================================================
   Trivia-SmackDown — global sound on/off

   This file is part of the NEW UI layer. It is deliberately kept out of js/
   so it is never confused with the live game scripts.

   Why it patches the Audio constructor
   ------------------------------------
   Sounds are created ad hoc all over the game — js/Game.js, js/GameD.js,
   js/Interface.js, js/AudX.js, js/Audio.js and more each do their own
   `new Audio(...).play()`. There is no single mixer to switch off, and
   editing every call site would mean touching the game logic.

   Instead the Audio constructor is wrapped once, here. Every element the
   game creates from now on is registered and has `muted` set to the current
   state, so one flag silences all of them — existing sounds included.

   The choice is remembered in localStorage under TSD_MUTED, so it survives
   the page hops between GamePanel, GameOver and the setup screens.

   Usage:
     TSDMute.isMuted()      -> true / false
     TSDMute.toggle()       -> flips, returns the new state
     TSDMute.set(true)      -> mute
     TSDMute.onChange(fn)   -> called with the new state on every change
   ========================================================================== */

var TSDMute = (function () {
  "use strict";

  var KEY       = "TSD_MUTED";
  var muted     = false;
  var listeners = [];

  /* every Audio the game has made, so a later toggle reaches them too */
  var made = [];

  try {
    muted = window.localStorage.getItem(KEY) === "1";
  } catch (e) {
    /* private mode / storage blocked — default to sound on */
  }

  /* ---- wrap the constructor ------------------------------------------- */

  var NativeAudio = window.Audio;

  if (typeof NativeAudio === "function") {
    var Patched = function (src) {
      var el = src === undefined ? new NativeAudio() : new NativeAudio(src);
      el.muted = muted;
      made.push(el);
      /* don't grow without bound over a long session */
      if (made.length > 200) { made.splice(0, made.length - 200); }
      return el;
    };
    Patched.prototype = NativeAudio.prototype;
    window.Audio = Patched;
  }

  /* <audio> tags in the markup, if any are ever added */
  function tagged() {
    return Array.prototype.slice.call(
      document.getElementsByTagName("audio")
    );
  }

  function apply() {
    made.concat(tagged()).forEach(function (el) {
      try {
        el.muted = muted;
        /* a sound already playing should stop, not just go silent */
        if (muted && !el.paused) { el.pause(); }
      } catch (e) { /* element gone */ }
    });
  }

  function set(next) {
    muted = !!next;
    try { window.localStorage.setItem(KEY, muted ? "1" : "0"); } catch (e) {}
    apply();
    listeners.forEach(function (fn) {
      try { fn(muted); } catch (e) {}
    });
    return muted;
  }

  return {
    isMuted:  function ()   { return muted; },
    set:      set,
    toggle:   function ()   { return set(!muted); },
    onChange: function (fn) {
      if (typeof fn === "function") { listeners.push(fn); fn(muted); }
    }
  };
}());
