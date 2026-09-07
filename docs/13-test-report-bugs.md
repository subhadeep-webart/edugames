# 13 — Test Report & Categorised Bug List

**Date:** 2026-09-04
**Branch:** `fit-screen`
**Method:** automated browser testing (Playwright / Chromium 151) against
`node dev-server.js --port 8000`, which proxies the live `edugames.com` CGI
endpoints so the app runs with `onNet = true` exactly as in production.

**Coverage:** splash → start → overview → setup → GamePanel → GameOver, all
**12 game types** (B, C, D, E, I, L, M, N, O, P, Q, U), a full bid-and-score
round, single-player mode, input validation, and **6 viewports**
(1920×1080, 1366×768, 1024×768, 768×1024, 430×932, 375×667).

>  **UPDATE 2026-09-04 — fixes applied.** The UI-scope bugs below have been
> fixed and re-verified; each carries a **Status** line. Three entries turned
> out to be **false positives on re-testing** (BUG-09 was overstated, BUG-14
> and BUG-17 were measurement artifacts) and are corrected in place rather
> than removed, so the record shows what was checked. Logic-scope bugs were
> left untouched per the engagement.

> This document records **new findings from testing the running app**.
> Pre-existing code-survey findings live in
> [10-known-issues.md](10-known-issues.md) and are not repeated here except
> where testing confirmed them live (marked ✅ *confirmed*).
>
> Per [CLAUDE.md](../CLAUDE.md), the current engagement is **UI-only**.
> Bugs are **reported, not fixed**. The *Scope* field on each bug says whether
> a fix would fall inside the current engagement or needs client sign-off.

---

## Summary

21 entries were raised. **2 were withdrawn as false positives** (BUG-14,
BUG-17), leaving **19 confirmed bugs**.

| Severity | Functional | UI / Visual | Content | A11y | Total |
| --- | --- | --- | --- | --- | --- |
| 🔴 High | 3 | 1 | 0 | 0 | **4** |
| 🟠 Medium | 3 | 2 | 2 | 2 | **9** |
| 🟡 Low | 1 | 1 | 2 | 1 | **5** |
| ❌ Withdrawn | 0 | 2 | 0 | 0 | **2** |
| **Confirmed** | **7** | **4** | **4** | **3** | **19** |

### Fix status

| | Count | Bugs |
| --- | --- | --- |
| ✅ Fixed (UI scope) | **6** | BUG-04, 09, 10, 11, 18, 20 |
| ⚠️ Open — needs client sign-off (logic) | **13** | BUG-01, 02, 03, 05, 06, 07, 08, 12, 13, 15, 16, 19, 21 |
| ❌ Withdrawn — not a bug | **2** | BUG-14, BUG-17 |

All fixes are **CSS and markup only**. No JavaScript, no game logic, no DOM
`id` was changed. Re-verified after the fixes: all 12 game types still play,
zero JS errors, and no horizontal overflow at any of the 6 viewports.

### What works

Worth stating plainly, because the bulk of the app is healthy:

- **No JavaScript errors** anywhere in the main game flow. All 53 live scripts
  parse; all 12 game types instantiate their correct `Game*` class.
- **No horizontal overflow at any of the 6 viewports tested**, on any page —
  including the game panel. The `fit-screen` branch work is holding.
- **Bidding, play and scoring are correct.** A bid of 3 on a picture round
  awarded 28 points and updated both the round and set totals correctly.
- **Backend integration works** — 24 sets load from the live CGI.
- All referenced images, fonts and stylesheets resolve (no 404s).

---

## 🔴 High severity

### BUG-01 · Round counter and game mode never update — FUNCTIONAL

**Where:** [GamePanel.html:44-51](../GamePanel.html#L44-L51)

The header permanently reads **"Round 1 of 3 | Game Mode: Picture"**. Verified
across 6 consecutive rounds spanning 6 different game types — the text never
changed once.

The markup says so itself:

```html
<!-- Round information + game mode. Static markup: no script currently
     writes to either span, so they do not advance on their own. The
     ids are here so the game code can fill them when wired up. -->
<span id="panelRound">Round 1 of 3</span>
<span id="panelMode">Game Mode: Picture</span>
```

`grep -rn "panelRound\|panelMode" js/` returns **nothing** — no code writes
either span.

**Impact:** players cannot tell which round they are on or how many remain.
On a Category round the header actively lies, saying "Game Mode: Picture".
"of 3" is also wrong for most sets — the test set has 12 rounds.

**Scope:** ⚠️ Needs client sign-off. The spans are presentational, but filling
them requires reading round index / total / type from the engine, which is
new JS wiring rather than a CSS change.

---

### BUG-02 · GameOver crashes on a tie — FUNCTIONAL

**Where:** [GameOver.html:205](../GameOver.html#L205) and
[GameOver.html:220](../GameOver.html#L220)

```js
const [setserNbr, winner, score0, score1, winText] = arr.shift().split(";");
...
if (name1 == name0) winner = "There is a tie between " + name0 + " and " + name1;
```

`winner` is declared `const`, then reassigned when the two players' names
match. **Reproduced:** seeding a tied result throws

```
TypeError: Assignment to constant variable.
```

The exception aborts `getAndProcessGameData()`, so everything after line 220 —
the score cards, player photos, the per-round breakdown — never renders.

**Impact:** the end screen is broken for any game between two players with the
same name. Note there is **no validation preventing duplicate names**
(see BUG-08), so this is reachable through normal use.

**Scope:** ⚠️ Out of scope (logic). Report to client. One-word fix (`let`).

---

### BUG-03 · GameOver crashes when opened without game data — FUNCTIONAL

**Where:** [GameOver.html:196](../GameOver.html#L196)

```js
const gameResults = localStorage.getItem("gameResults")
const arr = gameResults.split(",");   // ← null when the key is absent
```

Opening `GameOver.html` directly — a bookmark, a refresh after clearing
storage, a back-button return — throws:

```
TypeError: Cannot read properties of null (reading 'split')
```

The page renders its shell but every value stays at the placeholder: names
show `--`, both totals show `0`, and the winner line is blank.

**Impact:** a refresh on the end screen wipes the result. No guard, no message.

**Scope:** ⚠️ Out of scope (logic). Report to client.

---

### BUG-04 · Single-player mode leaves an orphaned bid panel — UI

**Where:** [GamePanel.html](../GamePanel.html) + [js/BidButs.js:345](../js/BidButs.js#L345)

With Single Player Mode enabled, setup correctly hides the Player 2 card and
sets `singlePlayerMode = true`, and the engine carries the flag through to the
game panel. But the game panel still renders:

- the **right-hand "Place Your Bid" panel**, with all 7 buttons live
  (`#bidButR1` computed `display: block`)
- the right-hand score slot

leaving a bid panel belonging to a player who does not exist, and a visibly
lopsided layout with a gap where Helen's card was.

`centerDisplay` also shows a bare **`---`** instead of a bidding message,
because [js/BidButs.js:142](../js/BidButs.js#L142) and
[:244](../js/BidButs.js#L244) both guard the notice with
`if (singlePlayerMode === false)`, so nothing replaces the separator glyphs.

**Impact:** single-player looks broken. The stray panel invites a click that
makes no sense.

**Scope:** ✅ Hiding the right bid panel and score slot in single-player is
presentational and **in scope**. The empty `centerDisplay` message is logic —
report it.

**Status:** ✅ **FIXED.** `css/gamepanel.css` — the P2 bid panel is now hidden whenever `#secondPlayerBox[hidden]` is set (the existing single-player signal), via `:has()` on `.tsd-scorebar`. CSS only; BidButs.js untouched. The empty `centerDisplay` (`---`) is logic and remains open.

---

## 🟠 Medium severity

### BUG-05 · Question text shows the internal serial number — CONTENT

**Where:** [js/Game.js:72](../js/Game.js#L72)

```js
cp.itf.setQuestion(serNbrOfRndInPlay + "-" + this.question);
```

Every question renders prefixed with its database id:

> **AA.Ben00001-Which seven presidents are Democrats?**
> **AA.Cen00007-Place the National Parks by State.**

**Impact:** internal identifiers are exposed to players on every single round.
This is the most visible cosmetic defect in the game.

**Scope:** ⚠️ The string is built in JS, not CSS. Removing the prefix is a
one-line change but touches game code — confirm with the client whether the
serial is deliberately shown for support/debugging.

---

### BUG-06 · "BIDDING STARTED" has a stray hyphen — CONTENT

**Where:** [js/BidButs.js:142](../js/BidButs.js#L142) and
[js/BidButs.js:244](../js/BidButs.js#L244)

```js
postNoticeCenterDisplay("24,white,-BIDDING STARTED");   // line 142
postNoticeCenterDisplay("24,white,BIDDING STARTED-");   // line 244
```

The banner reads **`-BIDDING STARTED`** at the start of a round and
**`BIDDING STARTED-`** later — a leading hyphen in one place, trailing in the
other. Both observed live.

**Impact:** looks like a rendering fault. The inconsistency between the two
makes it read as an accident rather than styling.

**Scope:** ⚠️ Literal strings in JS. Trivial, but it is game code — report.

---

### BUG-07 · "Set Total" label spacing differs left vs. right — UI

**Where:** [js/Interface.js:314](../js/Interface.js#L314) and
[js/Interface.js:317](../js/Interface.js#L317)

```js
setTotL.textContent = "Set Total= "  + ...   // no space before =
setTotR.textContent = "Set Total = " + ...   // space before =
```

Observed live: left reads `Set Total= 28`, right reads `Set Total = 0`. The
two player cards are side by side, so the mismatch is directly comparable.

Additionally, **before the first score is posted both cards read `Set Total =`
with no number at all** — an empty value rather than `0`.

**Scope:** ⚠️ String literals in JS. Report.

---

### BUG-08 · No validation on player names — FUNCTIONAL

**Where:** [setup.html](../setup.html) — Confirm & Start Game handler

Tested and confirmed, all three start the game with no warning:

| Input | Result |
| --- | --- |
| Both names blank | Game starts; `plu.players[0].name === ""` |
| Both names `"Sam"` | Game starts; **triggers BUG-02 at game over** |
| 60-character name | Game starts (layout survives — no overflow) |

With blank names the bid banner renders as **`" BID 3"`** — a leading space
and no name — and the player cards show empty labels.

**Impact:** blank names produce broken-looking labels throughout; duplicate
names crash the end screen.

**Scope:** ⚠️ Out of scope (input validation is logic). Report.

---

### BUG-09 · Form controls with no accessible label — A11Y

**Where:** [setup.html:293](../setup.html#L293), [GamePanel.html:247](../GamePanel.html#L247), [GamePanel.html:340](../GamePanel.html#L340)

> ⚠️ **Corrected.** The original report claimed *32* unlabelled controls in
> setup.html. **That was wrong** — a faulty detector (optional chaining on
> `element.labels` inside `page.evaluate`) produced false hits. Every visible
> setup control already has a correct `<label for="...">`. Re-testing found
> **4** genuinely unlabelled controls, not 32.

| Control | Page | Fixed? |
| --- | --- | --- |
| `#infoBox` (textarea) | setup.html | ✅ `aria-label="Set information"` |
| `#ansBox` (textarea) | GamePanel.html | ✅ `aria-label="Your answer"` |
| `#rndSerNbr` (text) | GamePanel.html | ✅ `aria-label="Round serial number"` |
| `#setMenu`, `#rndMenu` | GamePanel.html | ❌ JS-generated — out of scope |

**Status:** ✅ **FIXED** (3 static controls). The two `<select>`s are built by
`SetMenu.js` / `RndMenu.js` at runtime and need a logic change.

---

### BUG-10 · Back button below minimum touch target — A11Y / UI

**Where:** [overview.html](../overview.html) `#btnBack`

Measures **29×34 px** at tablet and mobile widths — below the 44×44 minimum
in WCAG 2.1 (2.5.5) and both platform HIGs.

Bid buttons are **30×30 px at every viewport**, including 375 px wide, and
are the game's primary interaction.

**Scope:** ✅ **In scope** — pure CSS sizing. Note the bid buttons are laid out
by JS-generated markup, so check for inline styles first.

**Status:** ✅ **FIXED.** `#btnBack` now has `min-width/min-height: 44px` (icon size unchanged). Bid numbers grow 30px→44px under `@media (pointer: coarse)`, so the desktop Figma size is untouched. Verified 44×44 on touch, 30×30 on desktop.

---

### BUG-11 · Header text truncates to single letters on mobile — UI

**Where:** [GamePanel.html](../GamePanel.html) header, ≤430 px

At 375×667 the header renders as:

> **R… | G…**

"Round 1 of 3" and "Game Mode: Picture" are each ellipsised to one character —
no information conveyed, just visual noise. (Compounded by BUG-01, which makes
the text wrong anyway.)

**Scope:** ✅ **In scope.** Options: hide the status line below a breakpoint,
wrap it, or shorten to "R1/3".

**Status:** ✅ **FIXED.** The two status spans are now `display:none` below 720px instead of ellipsising to single letters. `#panelStatus` is kept as the flex spacer. Note the text is still wrong at all widths until BUG-01 is wired up.

---

### BUG-12 · Picture-grid answer labels illegible on mobile — UI

**Where:** game type B / I rendering, ≤430 px

The 4×4 president grid scales down with the viewport but its baked-in label
text does not reflow — captions ("Einsenhower", "Roosevelt-F") become
unreadable at ~90 px per cell.

**Impact:** picture rounds are effectively unplayable on a phone.

**Scope:** ⚠️ **Limited.** Per [10-known-issues.md](10-known-issues.md#8) the
labels are **baked into the source images and the question data**, not DOM
text — CSS cannot enlarge them. Raise with the client; a real fix means
re-authoring assets.

> Note: "Einsenhower" is also **misspelled** in the source image
> (should be "Eisenhower"). Data defect — see BUG-19.

---

### BUG-13 · Bid buttons vanish instead of showing as spent — UI

**Where:** [js/BidButs.js:66-80](../js/BidButs.js#L66-L80)

Once the play is awarded, both bid panels empty out completely, leaving two
large boxes containing only the words "Place Your Bid" and a lot of dead space.

The code comments say the intent is the opposite:

```js
// Buttons up to the bid are taken out of play. They stay VISIBLE —
// css/gamepanel.css styles [disabled], and the winning number gets
// .is-bid for the blue highlight.
```

So the buttons are *meant* to remain visible and styled as disabled. Observed
behaviour does not match the documented intent.

**Impact:** players lose the record of what was bid. Two empty panels retain
their full height, wasting the most valuable screen space.

**Scope:** ✅ Likely **in scope** — if the buttons are being hidden by CSS
(`display:none` on `[disabled]`) this is a stylesheet fix. If JS removes the
nodes, it is logic. **Investigate before quoting.**

**Status:** ⚠️ **NOT FIXED — out of scope.** Investigated: the buttons are removed by **JS, not CSS** — [js/BidButs.js:112-113](../js/BidButs.js#L112-L113) clears `innerHTML` and [:130-131](../js/BidButs.js#L130) sets `display:none` on the containers. The CSS to show them as disabled already exists and is correct. Logic fix; report to client.

---

### BUG-14 · ~~Picture grid clipped at bottom of viewport~~ — NOT A BUG

> ❌ **False positive — withdrawn.** Re-measured at every viewport: the image
> never crosses the fold.
>
> | Viewport | Image bottom | Viewport height | Clipped |
> | --- | --- | --- | --- |
> | 1366×768 | 694px | 768px | no (74px clear) |
> | 1024×768 | 755px | 768px | no |
> | 430×932 | 918px | 932px | no |
> | 375×667 | 657px | 667px | no |
>
> The existing `max-height:100%` rules in
> [css/gamepanel.css:1931](../css/gamepanel.css#L1931) work correctly. What
> looked like clipping in the screenshot was the picture's own black border
> meeting the dark page background. **No change made** — the code is right.

---

## 🟡 Low severity

### BUG-15 · Mixed-content / localhost URLs in live code — FUNCTIONAL

✅ *Confirmed still present.*

- [js/AlphaBar.js:350](../js/AlphaBar.js#L350) — `fetch('http://localhost/' + filePath)`
- [js/SelectionPanel.js:69](../js/SelectionPanel.js#L69) — `http://edugames.com/cgi-bin/GetRounds.pl`

Both are plain `http://` and will be blocked as mixed content on an HTTPS
site. Already logged as [10-known-issues.md](10-known-issues.md#4); repeated
here because a second instance (`SelectionPanel.js`) was found that the
original survey did not list.

**Scope:** ⚠️ Out of scope. Report.

---

### BUG-16 · Cross-origin CSV fetch blocked — FUNCTIONAL

One request failed during the round walkthrough:

```
https://www.edugames.com/DataBase/.../CiStMo/CiStMo.AL.csv
  net::ERR_BLOCKED_BY_ORB
```

Answer-button CSV data for a city/state round. Blocked by Opaque Response
Blocking because it is served without a matching content type.

**Scope:** ⚠️ Server config. Report.

---

### BUG-17 · ~~Decorative layer overflows the viewport~~ — NOT A BUG

> ❌ **False positive — withdrawn.** `.tsd-ambient` does extend ~2-5px past
> its parent, because its `tsd-ambient-drift` keyframe scales it to 1.045.
> But its parent `.tsd-start-stage` already sets `overflow:hidden`
> ([css/start.css:40](../css/start.css#L40)), so the excess is clipped: it
> never reaches the viewport, never creates a scrollbar, and is invisible.
>
> My detector measured `getBoundingClientRect()`, which reports the
> pre-clip box. **No change made.**

---

### BUG-18 · Inconsistent capitalisation in dropdowns — CONTENT

[setup.html](../setup.html): Player 1's time dropdown shows **"A lot"**;
Player 2's shows **"A Lot"**. Same option, two spellings, side by side.

**Scope:** ✅ **In scope** — literal option text in markup.

**Status:** ✅ **FIXED.** Player 1's option is now "A Lot", matching Player 2 and the body copy at setup.html:282.

---

### BUG-19 · Misspelling baked into question image — CONTENT

The president grid labels **"Einsenhower"** (should be **"Eisenhower"**).
Text is part of the source image, not the DOM.

**Scope:** ⚠️ Data/asset defect. Report — requires re-authoring the image.

---

### BUG-20 · Player heading alignment mirrors inconsistently — UI

On [setup.html](../setup.html) the "PLAYER 1" heading is left-aligned and
"PLAYER 2" is right-aligned, but the fields beneath both cards are
left-aligned. The mirroring is applied to the headings only, so the two cards
look misaligned rather than symmetrical.

Likely intentional, but it reads as a mistake — flagging for a design call.

**Scope:** ✅ **In scope.**

**Status:** ✅ **FIXED.** Removed the P2-only `text-align:right`; both headings sit left, consistent with the left-aligned fields under them.

---

### BUG-21 · One image missing `alt` — A11Y

One `<img>` in the game panel has no `alt` attribute. `lang="en"` is correctly
set and no button lacks an accessible name, so this is the only markup-level
a11y gap outside BUG-09.

**Scope:** ✅ **In scope.**

**Status:** ⚠️ **NOT FIXED — out of scope.** The `alt` is set in `getImageFile()` ([js/script.js:1437](../js/script.js#L1437)), shared game code. Needs client sign-off.

---

## Observations (not bugs)

- **41 `!important` declarations in [css/gamepanel.css](../css/gamepanel.css)**
  — none in any other stylesheet. These exist to beat the inline styles the JS
  writes at runtime. Expected given the architecture, but it means specificity
  is already maxed out: the next override will have nowhere to go. Worth
  raising if further game-panel restyling is planned.

- **Splash screen takes 6.3 s** to reach `start.html` (`MIN_TIME = 2600` plus a
  randomised progress animation plus a 450 ms tail). It is a fake progress bar
  — nothing is loading. Consider shortening.

- **`css/` is now live.** [CLAUDE.md](../CLAUDE.md) and
  [10-known-issues.md](10-known-issues.md#7) both state that `css/main.css` and
  `css/style.css` are dead and that the live stylesheet is `js/TSDstyle.css`.
  **That is no longer true.** Every current page loads from `css/`:

  | Page | Stylesheets |
  | --- | --- |
  | index.html | fonts, tokens, splash |
  | start.html | fonts, tokens, start, modal |
  | overview.html | fonts, tokens, overview, modal |
  | setup.html | fonts, tokens, setup, modal |
  | GamePanel.html | fonts, tokens, gamepanel, modal |
  | GameOver.html | fonts, tokens, gameover |

  `css/main.css` and `css/style.css` remain unreferenced. **The docs should be
  updated** — the current guidance sends a developer to edit the wrong file.

- **D / L / N blank question box** ✅ *confirmed* — reproduced on rounds 3, 6
  and 8. This is **by design**, documented at
  [10-known-issues.md §5a](10-known-issues.md). Not a bug; noted so it is not
  re-reported.

- **CGI leaks headers into the response body** ✅ *confirmed* — `GetRoundsTSD.pl`
  returns `Access-Control-Allow-Origin: ...` and `Content-type: text/html` as
  the first lines of the body. Masked because the client calls `.text()`.
  Already logged as [10-known-issues.md §5](10-known-issues.md).

---

## Recommended priority

**✅ Done — fixed in this pass (CSS/markup only):**
BUG-04 (single-player panel) · BUG-09 (labels) · BUG-10 (touch targets) ·
BUG-11 (mobile header) · BUG-18 (capitalisation) · BUG-20 (alignment)

**Investigated, turned out NOT to be CSS:**
BUG-13 (bid buttons — JS clears `innerHTML`) ·
BUG-21 (alt — set in `getImageFile()`)

**❌ Withdrawn — measurement artifacts, code was correct:**
BUG-14 (grid clipping) · BUG-17 (ambient overflow)

**Raise with client — logic changes, need sign-off:**
BUG-01 (round counter) · BUG-02 + BUG-03 (GameOver crashes) ·
BUG-05 (serial number in question) · BUG-06 / BUG-07 (label strings) ·
BUG-08 (validation)

**Backlog:**
BUG-12 (image labels) · BUG-19 (misspelling) · BUG-15 / BUG-16 (URLs, CORS)

BUG-02 and BUG-03 are the two most likely to be reported by a real user, and
both are one-line fixes.
