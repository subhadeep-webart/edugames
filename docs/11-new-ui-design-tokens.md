# New UI — Design Tokens, Splash & Start Screens

Reference for the new UI work on the `splash` branch.

---

## Files added

| File | Purpose |
|------|---------|
| `css/tokens.css` | **All design tokens.** Link this first, on every screen. |
| `splash.html` | Screen 1 — splash / loading. |
| `css/splash.css` | Splash layout. |
| `start.html` | Screen 2 — start / main menu. |
| `css/start.css` | Start-screen layout. |
| `overview.html` | Screen 3 — game overview / how to play. |
| `css/overview.css` | Overview-page layout. |
| `index.html` | Screen 4 — game setup / onboarding (**re-skinned live form**). |
| `index.backup.html` | **Untouched backup of the original `index.html`.** |
| `css/setup.css` | Setup-page layout. |
| `css/modal.css` | Global confirm-dialog component. |
| `js-ui/tsd-modal.js` | Global confirm-dialog behaviour. |

> `js-ui/` is the new-UI script folder. It is deliberately **not** `js/`, which
> holds the live game scripts and their fixed `<script>` load order.

### Screen flow

```
splash.html  ──2.6s──▶  start.html  ──[Start Game]──▶  index.html  ──▶  GamePanel.html
                             ├──[How to Play]──▶  overview.html
                             └──[Exit]─────────▶  confirm modal → close / splash

overview.html  ──[back]────────▶  history.back(), else start.html
               ──[Points Info]─▶  Help/Scoring.html
               ──[help]────────▶  Help/SimpleRules.html
               ──[Exit Game]───▶  confirm modal → close / splash
```

**Nothing in `js/` or `js/TSDstyle.css` was modified.** These are new pages that
sit in front of the existing app; the live game files are untouched. `index.html`
and its form field ids (`p0`, `z0`, `g0`, `s0`, `bidTime`, `setSerNbr`) are
unchanged — Start Game simply links to it.

> Note: `css/main.css` and `css/style.css` in this folder are the stale, not-live
> files described in `CLAUDE.md`. `css/tokens.css`, `css/splash.css` and
> `css/start.css` are new and *are* used — but only by the new pages, never by
> `GamePanel.html`.

---

## Design tokens

All tokens are declared once in `:root` in
[`css/tokens.css`](../css/tokens.css). Link it **before** the screen stylesheet:

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/start.css">
```

Reuse these rather than re-typing hex values.

### Background

```css
--tsd-bg-top:      #16124A;
--tsd-bg-bottom:   #0A082D;
--tsd-bg-gradient: linear-gradient(180deg, var(--tsd-bg-top) 0%, var(--tsd-bg-bottom) 100%);
```

Usage: `background: var(--tsd-bg-gradient);`

### Accent gradient

Used for the progress bar; reuse for buttons, active states, highlights.

```css
--tsd-accent-pink:     #FD0C75;
--tsd-accent-orange:   #FD5A3B;
--tsd-accent-yellow:   #FBD248;
--tsd-accent-gradient: linear-gradient(90deg,
                         var(--tsd-accent-pink)   0%,
                         var(--tsd-accent-orange) 50%,
                         var(--tsd-accent-yellow) 100%);
```

Usage: `background: var(--tsd-accent-gradient);`

### Primary action gradient

The Start Game button.

```css
--tsd-blue:             #0683FC;
--tsd-purple:           #570496;
--tsd-primary-gradient: linear-gradient(94.54deg,
                          var(--tsd-blue)   3.68%,
                          var(--tsd-purple) 126.39%);
```

### Surfaces & game-type accents

Used by the overview page.

```css
--tsd-card-bg:      rgba(30, 26, 78, .55);    /* section cards  */
--tsd-card-border:  rgba(120, 130, 200, .22);
--tsd-panel-bg:     rgba(52, 46, 105, .38);   /* inner panels   */
--tsd-panel-border: rgba(140, 150, 215, .16);
--tsd-chip-border:  rgba(140, 150, 215, .35);

--tsd-type-b: #2E9BFF;   /* Game Type B — blue    */
--tsd-type-d: #C93BFF;   /* Game Type D — magenta */
--tsd-type-i: #FD1E6E;   /* Game Type I — pink    */

--tsd-body-text:    #B9BEDC;   /* paragraph copy */
--tsd-heading-text: #E9ECFA;   /* sub-headings   */
```

### Game setup / onboarding

```css
--tsd-p1-gradient: linear-gradient(180deg,
                     rgba(6, 131, 252, .25) 0%, rgba(4, 78, 150, .25) 79.51%);
--tsd-p2-gradient: linear-gradient(180deg,
                     rgba(232, 47, 47, .25) 0%, rgba(116, 21, 21, .25) 79.51%);

--tsd-player-label:   #FBB445;   /* "PLAYER 1" / "PLAYER 2" */

--tsd-field-bg:       #110E3E;
--tsd-field-border:   #657280;
--tsd-field-border-w: 1.5px;
--tsd-field-glow:     0 4px 43.7px rgba(150, 165, 226, .25);  /* #96A5E240 */

--tsd-divider-gradient: linear-gradient(90deg,
                          rgba(255,255,255,.75) 0%, rgba(255,255,255,0) 100%);
```

### Sparkle / star colours

```css
--tsd-star-yellow: #FFD93B;   /* left  cluster */
--tsd-star-pink:   #FD0C75;   /* left  cluster */
--tsd-star-blue:   #0683FC;   /* right cluster */
```

### Zap bloom

The soft coloured glow behind each lightning bolt.

```css
--tsd-glow-left:  #D1CF3C;   /* left  bolt — yellow */
--tsd-glow-right: #41F2F2;   /* right bolt — cyan   */
--tsd-blur-left:  349.8px;
--tsd-blur-right: 380.3px;
```

### Borders

```css
--tsd-border-color: #455286;   /* progress bar          */
--tsd-border-width: 2.5px;
--tsd-btn-border:   #0683FC;   /* secondary menu buttons */
```

Usage: `border: var(--tsd-border-width) solid var(--tsd-btn-border);`

### Text

```css
--tsd-text:       #FFFFFF;
--tsd-text-muted: #B9C0DC;
```

### Layout

```css
--tsd-container: 1420px;   /* max content width */
--tsd-gutter:    15px;     /* left + right padding */
```

Applied by `.tsd-container`:

```css
max-width: var(--tsd-container);
padding:   var(--tsd-gutter);
margin:    0 auto;
```

### Motion

```css
--tsd-ease: cubic-bezier(.22, .61, .36, 1);
```

### Modal / dialog

```css
--tsd-modal-blue:      #43A3FC;
--tsd-modal-ink:       #121016;
--tsd-modal-red:       #FC4343;
--tsd-modal-gradient:  linear-gradient(309.21deg,
                         var(--tsd-modal-blue) -104.31%,
                         var(--tsd-modal-ink)    49.41%,
                         var(--tsd-modal-red)   185.75%);
--tsd-modal-body-text: #8B9FB6;   /* supporting copy */
--tsd-modal-glow:      0 4px 30.2px rgba(255, 255, 255, .9);
--tsd-scrim:           rgba(6, 5, 20, .72);
```

The design supplied the title glow as `box-shadow`, but it is applied to text,
so it is implemented as `text-shadow` — `box-shadow` would draw a rectangle
around the heading's box rather than a glow around the letterforms.

### Icon whitening

```css
--tsd-icon-white: brightness(0) invert(1);
```

`exit_icon.svg` ships filled `#FD0C75`, but the design calls for white. Rather
than editing the source asset (so it stays reusable in its brand colour), the
menu applies `filter: var(--tsd-icon-white)` to every button icon. Works on any
single-colour SVG.

---

## Assets used

From `images/new-images/`:

| File | Natural size | Used as |
|------|--------------|---------|
| `trivia_smackdown_splash_image.svg` | 553 × 554 | Centre logo |
| `homepage_left_zap.svg` | 312 × 381 | Left bolt |
| `homepage_right_zap.svg` | 296 × 399 | Right bolt |
| `icons/play_button.svg` | 19 × 25 | Start Game icon (already white) |
| `icons/instruction_icon.svg` | 24 × 24 | How to Play icon (already white) |
| `icons/exit_icon.svg` | 21 × 19 | Exit icon (pink source, whitened by CSS) |

The sparkle star is **inlined** in `start.html` as a `<template>`, then cloned
by script so each copy can take its own fill colour from the tokens above.

---

## Global confirm modal

One dialog, reused everywhere, so every confirmation is worded and styled
identically. Add to any screen:

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/modal.css">
<script src="js-ui/tsd-modal.js"></script>
```

### The standard exit prompt

```js
TSDModal.confirmExit(function () {
  // runs only if the player confirms
  window.location.href = "splash.html";
});
```

### Any other confirmation

```js
TSDModal.confirm({
  title:       "Restart Round ?",
  message:     "Current scores will be cleared.",
  confirmText: "Yes, Restart",
  cancelText:  "No, Keep Playing",
  onConfirm:   function () { /* ... */ },
  onCancel:    function () { /* optional */ }
});
```

Also available: `TSDModal.close()` and `TSDModal.isOpen()`.

### Behaviour

- Dismisses on **Esc**, on **scrim click**, and on the cancel button.
- Focus moves to the **safe** option (cancel), not the destructive one.
- **Tab** is trapped between the two buttons; focus returns to the trigger on
  close.
- The dialog is built once, lazily, on first use — no markup to paste per page.
- The icon is fetched from `exit_icon.svg` and recoloured via `currentColor`;
  an inline fallback glyph shows if the fetch fails (e.g. opened over
  `file://`).

### On Exit

A web page cannot reliably close a tab it did not itself open, so `window.close()`
is attempted and, if blocked, the player is returned to `splash.html`.

---

## Setup page (index.html) — live form, re-skinned

**This page re-skins the LIVE registration form. The original is preserved
verbatim at `index.backup.html`.**

### What was NOT changed

Every `<script>` block was copied across byte-for-byte: `getData()`,
`storeDataAndGoToGame()`, `setSinglePlayerMode()`, `showSetInfo()`,
`getSetInfo()`, `goToSubSel()`, `insertIntoInfoBox()`, plus the
`js/script.js` and `js/NetTest.js` includes and their load order.

Every element id `getData()` reads is present and carries the same value:

| id | field | id | field |
|----|-------|----|-------|
| `p0` | Player 1 name | `p1` | Player 2 name |
| `z0` | Player 1 zip | `z1` | Player 2 zip |
| `g0` | Player 1 grade | `g1` | Player 2 grade |
| `s0` | Player 1 time | `s1` | Player 2 time |
| `bidTime` | bidding time | `setSerNbr` | set selection |
| `secondPlayer` | hidden in single-player | `infoBox` | Set Info output |

**Verified:** `getData()` returns a byte-identical string on the old and new
pages, and `localStorage.regData` matches on confirm.

### Where the extra fields went

The design shows only Name and Your Time per player, but `getData()` also reads
zip and grade. Deleting them would corrupt the payload, so they live in an
**Advanced panel behind the gear icon** — collapsed by default, still in the
DOM, still read normally.

`Set Info` and its `#infoBox` textarea are in that panel too. The textarea is
revealed once `showSetInfo()` fills it.

### Single-player mode

The toggle calls the live `setSinglePlayerMode()` (which hides `#secondPlayer`
and sets the `singlePlayerMode` global from `js/script.js`) and adds
`.is-single` to the arena so the grid collapses to one column. Toggling back
off restores both.

> The original page had no way to leave single-player mode once entered — the
> new toggle can be switched back off. This is an improvement, not a change to
> game rules; the payload value is identical either way.

### Profile images

`Change Profile Image` is **cosmetic only** — the picked file is previewed in
the ring but not transmitted, because the registration payload has no field for
an avatar. Wiring it to a backend would be a functional change and was out of
scope.

---

## Overview page

### Numbered badges — built, not imported

The 1 / 2 / 3 hexagons are pure CSS, so there is no image to maintain and the
colour follows the game type:

```html
<div class="tsd-type" style="--tsd-badge-color: var(--tsd-type-d)">
  <span class="tsd-badge"><span class="tsd-badge-inner">2</span></span>
```

`.tsd-badge` draws the coloured hexagon with `clip-path`; `.tsd-badge-inner`
draws a slightly smaller hexagon in the card colour on top, leaving a coloured
ring. Setting `--tsd-badge-color` on the row tints the badge **and** the
`Game Type X` heading together.

### This page scrolls — on purpose

Unlike the splash and start screens, the overview is long-form reading content,
so it scrolls vertically. `overflow-x: hidden` still prevents any sideways
scroll.

The page gradient is set on `<html>`, not `<body>`, so it covers the full
document height. (`min-height: 100%` on `<body>` alone has no resolved parent
height to size against, which leaves the gradient ending at the fold.)

> Full-page screenshot tools render `background-attachment: fixed` as blank
> below the first viewport. That is a capture artifact, not a page bug — check
> by scrolling in a real browser.

### Layout

Each game-type row is a 5fr / 7fr grid (artwork+blurb | rules panel) that
collapses to a single column below 900 px.

---

## No-scrollbar guarantee

Applies to `splash.html` and `start.html` (fixed game screens).
`overview.html` scrolls vertically by design.

This is a game screen, so it must never scroll. Three things enforce that:

1. `html, body { height: 100%; overflow: hidden; }`
2. The stage is `height: 100vh` then `100dvh` (the second wins on mobile
   browsers with collapsing toolbars).
3. Every image is sized with `clamp(min, vh-relative, max)` so the artwork
   shrinks with the viewport instead of overflowing it.

Verified with no horizontal or vertical overflow at 1920×1080, 1440×900,
1024×768, and 390×844.

---

## Behaviour

The progress bar is a **visual loader**, not a real asset-loading meter. It
eases from 0 → 100 %, holds the splash for at least `MIN_TIME` (2600 ms), then
navigates.

Both values are at the top of the inline script in `splash.html`:

```js
var NEXT_PAGE = "start.html";   // where the splash goes next
var MIN_TIME  = 2600;           // minimum ms on screen
```

Change `NEXT_PAGE` to re-point the splash at a different landing page.

---

## Motion inventory

| Element | Animation |
|---------|-----------|
| Logo | Scale-in on load |
| Bolts | Slow vertical float (offset so they counter-move) |
| Bolt glows | Pulsing opacity + scale |
| Progress fill | Width transition + travelling sheen |
| Loader block | Fade-up on load |
| Background | Drifting spark particles (26, JS-generated) |

### Start screen

| Element | Animation |
|---------|-----------|
| Logo | Scale-in on load, then slow float |
| Menu | Fade-up on load |
| Buttons | Lift on hover/focus + glow |
| Start Game | Sheen sweep on hover; play glyph nudges right |
| Sparkles | Twinkle — staggered opacity, scale and rotation |
| Background | Warm-left / cool-right blooms, slow drift |

All motion is disabled under `@media (prefers-reduced-motion: reduce)`.

---

## Adding the next screen

1. Link `css/tokens.css` first, then a new `css/<screen>.css`.
2. Give `<body>` its own class (`tsd-splash`, `tsd-start`, …) and set
   `background: var(--tsd-bg-gradient)`.
3. Wrap content in `.tsd-container` for the 1420 px / 15 px rhythm.
4. Use the token variables — do not hard-code hex values. If a new colour is
   needed, add it to `css/tokens.css` rather than to the screen stylesheet.
5. Size artwork with `clamp(min, vh-unit, max)` so the screen never scrolls.

### Reusable button classes

`.tsd-btn` plus one of:

- `.tsd-btn--primary` — filled with `--tsd-primary-gradient`
- `.tsd-btn--ghost` — transparent, `--tsd-btn-border` outline

Icons go in an `<img class="tsd-btn-icon">`; they are whitened automatically.

---

## Mobile: the game panel scrolls (phones only)

> Added after client feedback that the game was unusable on a phone.
> **Desktop behaviour is unchanged** — see the guarantee above, which still
> holds at every desktop size.

### The problem

The no-scrollbar contract assumes a wide screen. On desktop `.tsd-scorebar`
is one row — card | bid | clock | bid | card — about 200 px tall, so
`.tsd-play-area` gets the rest.

A phone cannot keep that row. The `max-width: 1100px` query stacks it into
three bands, and measured on a real device the scorebar then costs
**463–557 px of an 844 px screen**. After the header and question bar this
left **70–123 px** for the game, which needed ~290 px. So
`js-ui/tsd-fit-screen.js` bottomed out at its `MIN_SCALE` of **0.45** and the
question rendered at under half size *and* was still clipped.

Landscape (844×390) was worse: `.tsd-play-area` measured **0 px**. The game
was entirely off-screen, and `overflow: hidden` meant it could not be
reached at all.

There is no scale at which two bid pads, two score cards, a clock and a
question board are usable together on a 390 px-wide screen. Forcing them to
fit is what produced the unreadable 0.45 render.

### The fix

Below **720 px wide**, and on **short landscape screens**
(`max-height: 500px and (pointer: coarse)`), the panel stops being a fixed
one-screen layout and becomes an ordinary scrolling document:

| | Desktop | Phone |
|---|---|---|
| `body` | `height:100dvh; overflow:hidden` | `min-height:100dvh; overflow-y:auto` |
| `.tsd-play-area` | `flex:1 1 auto; height:0` (leftover space) | `flex:0 0 auto; min-height:60vh` (grows to content) |
| `--tsd-fit-scale` | set by the JS fit-scaler | pinned off with `transform:none !important` |
| Pre-game notice | `position:absolute` overlay | `position:static`, in flow |

The `!important` is deliberate: `tsd-fit-screen.js` writes the scale as an
inline style, and beating an inline style is exactly what
[08-ui-update-guide.md](08-ui-update-guide.md) reserves it for. **The JS is
not modified** — it still runs and still governs desktop.

Two supporting changes:

- **`html` gets the gradient** inside the mobile queries.
  `background-attachment: fixed` on `<body>` paints only one viewport's
  worth, which was invisible while the page could not scroll but left a
  white band below the fold once it could. `overview.html` — the other page
  that scrolls — already does this.
- **`.tsd-pregame` gets `box-sizing: border-box`.** It is `width:100%` with
  36 px of rim padding, so it was 100 % + 72 px wide and spilled out of the
  play area (measured 407 px inside a 390 px viewport). This one applies at
  all widths; it was simply never visible while the notice was a clipped
  overlay.

### Verified

Driven through the real setup → game flow against `node dev-server.js`
(live CGI), Chromium:

- **All 57 rounds in the test set** — game types B, C, D, E, I, L, M, N, O,
  P, Q, U — at 375×667 and 390×844: **no horizontal overflow, no JS
  errors**, content at full scale (`--tsd-fit-scale: 1`).
- Landscape 844×390: play area **0 px → 340–551 px**, scrollable.
- Bidding still works by touch in both orientations (`centerDisplay` reads
  "Peter BID 3", `is-bid` applied).
- Desktop 1920×1080, 1440×900, 1366×768, 1280×720, 1024×768, 820×1180:
  `overflow:hidden`, no scroll, fit-scaler active — **unchanged**.
