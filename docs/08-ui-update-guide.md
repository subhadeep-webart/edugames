# 08 — UI Update Guide (Rules of Engagement)

> **Scope: UI only. The client has signed off on the game logic.**
>
> This document is the contract for the current engagement. If you are an AI
> assistant working on this repository, read this before proposing any change.

## The one-line rule

**Change how it looks. Do not change how it works.**

## What "UI only" means here

### ✅ In scope

- CSS in `js/TSDstyle.css` — colours, spacing, typography, borders, shadows.
- Markup **presentation** in `index.html`, `GamePanel.html`, `GameOver.html`
  and `Help/*.html`: classes, wrappers, replacing legacy `<font>`/`bgcolor`
  attributes with CSS.
- Layout modernisation — moving from table layout to flex/grid, **provided
  every id survives** (see the DOM contract in
  [04-frontend-ui.md](04-frontend-ui.md)).
- Responsive behaviour, hover/focus states, transitions.
- Literal colour and size values assigned from JS (e.g.
  `centerDisplay.style.backgroundColor = "blue"`) — these are presentation
  values even though they live in `.js` files.

### ❌ Out of scope

- Game rules, scoring, bidding, the points-squared formula.
- Timing, clock behaviour, `secPerNbr` / `secPerQuest` / `timeFac`.
- Turn order, `pickWhoGoesFirst()`, `nextPlayer()`.
- Answer validation — `checkPlay()`, `butHit()`.
- Round/set loading, parsing, the `onNet` switch, any `fetch` URL.
- The question data in `js/Round*.js`.
- The Perl CGI scripts.
- "While I was in there" refactors, renames, dead-code removal, or fixing the
  bugs listed in [10-known-issues.md](10-known-issues.md).

If a change would alter what a player can do, what they score, or how long
they have — it is out of scope. Report it, don't fix it.

## Before you touch anything

### 1. Confirm you are editing the live file

This repo is full of near-identical copies. The live set is:

```
index.html          GamePanel.html      GameOver.html
js/TSDstyle.css     js/*.js             Help/*.html
```

**Not** live: `GamePanel - Copy*.html`, `GamePanelJune27.html`, `indexD.html`,
`css/main.css`, `css/style.css`, and everything under `GameSep3/`,
`js20241011/`, `jsJun27/`, `jsContex/`, `js20260624AI/`, `WorkArea/`,
`Help - Copy/`, plus the stale `.js` copies sitting at the repository root.

Verify with:

```bash
grep -n 'stylesheet' GamePanel.html      # → js/TSDstyle.css
grep -oE 'src="js/[^"]+"' GamePanel.html # → the live script list
```

### 2. Check whether JS will override your CSS

```bash
grep -rn "\.style\." js/ | grep -v "^js/Round"
```

If the property you are styling is assigned at runtime, CSS alone will lose.
See "Working with inline styles" below.

### 3. Check whether an id is load-bearing

```bash
grep -rn "theIdYouWantToRemove" js/
```

Any hit in a `.js` file means the element is referenced by code. Restyle it,
wrap it, move it — but keep the id and keep it in the DOM.

## Working with inline styles

Precedence, weakest to strongest:

1. `js/TSDstyle.css`
2. `style="..."` attributes in the HTML
3. `element.style.x = ...` assigned by JS at runtime ← usually wins

Preferred approaches, in order:

**A. Pure CSS** where JS does not touch the property. Always try this first.

**B. Change the literal in the JS.** When the code does:

```js
centerDisplay.style.backgroundColor = plu.players[0].color;
```

the value comes from `Interface.playerColorArr = ["blue", "red"]`. Changing
those two strings to designed hex values is a presentation change and is in
scope. It re-skins the whole player-colour system from one place.

**C. Higher specificity.** `#gamePlayArea .btn { ... }` beats `.btn { ... }`
but still loses to inline. Use for CSS-vs-CSS conflicts only.

**D. `!important`.** Last resort. It does beat inline styles, but it makes the
next person's life harder. If you find yourself needing it repeatedly, option
B is the better answer.

## The data-driven styling problem

Read [05-game-data.md](05-game-data.md) before quoting on any "modernise the
colours" work.

Question records carry their own presentation:

```
Rows=5 Cols=1 FntSize=24 FntColor=blue BkGndColor=yellow LnCnt=1
AnsRows=12 AnsCols=3 AnsFntSize=14 AnsFntColor=blue AnsBkGndColor=yellow
```

Thousands of records specify their own fonts and colours, and the renderers
(`AnsButtons.js`, `GameC/E/O/U.js`) apply them inline. Consequences:

- A stylesheet change will **not** recolour these elements.
- You cannot edit the data — it is signed-off content, 13 MB of it.
- The only practical lever is to change how the renderer **interprets** those
  attributes — e.g. mapping `yellow` to a designed token rather than passing
  the raw keyword through.

That last option touches `.js` files that also contain logic. It is
legitimate presentation work, but keep the edit to the single styling
statement and flag it in your handover. **Raise this with the client before
committing to a full recolour** — it is the main hidden cost in this project.

## Constraints to respect

| Constraint | Why |
| --- | --- |
| Blue = player 0 = left; Red = player 1 = right | Reinforced by audio cues and score labels; changing it breaks player comprehension |
| Font scale `small`→`xx-large` must keep working | User-configurable via `Settings.js`; audience includes older players |
| Two players at one screen | Both zones must be simultaneously readable; avoid designs that assume one focal point |
| No framework, no build | Do not introduce React/Tailwind/Sass/npm. It ships by FTP as plain files |
| Older browsers | Audience skews older. Avoid bleeding-edge CSS without fallbacks |
| Load order of `<script>` tags | If you add one, place it correctly — base classes before subclasses |
| Do not reformat whole files | Mixed tabs/spaces; auto-format destroys reviewable diffs |

## Recommended working order

1. **`js/TSDstyle.css` first.** Establish colour, type and spacing tokens as
   CSS custom properties at the top of the file. Lowest risk, highest visible
   return.
2. **`index.html`.** The registration page is the most dated (Word-exported
   markup, `<font>` tags) and the least logic-coupled — the safest place to
   demonstrate the new look.
3. **`GamePanel.html` chrome.** Header, score boxes, control buttons — the
   furniture around the play area.
4. **The play area.** Highest risk; the insertion points and table anchors
   live here. Change incrementally and test after each step.
5. **JS colour literals** (`Interface.playerColorArr`, `BidButs.js`) once the
   palette is settled.
6. **`Help/*.html`** last — simple content pages, easy wins.

## Definition of done for a UI change

- [ ] The live file was edited, not a copy.
- [ ] Every id in the DOM contract is still present.
- [ ] Registration works: names, zip, grade, Single Player Mode.
- [ ] Game panel renders: scores L/R, centre display, question box, answer
      bar, timer, buttons.
- [ ] Blue-left / red-right intact; active-player highlight legible.
- [ ] Single-player mode hides the second player cleanly.
- [ ] Font sizes 1–5 all still lay out correctly.
- [ ] Help links still open.
- [ ] No new `Uncaught` / `ReferenceError` in the console.
- [ ] No game logic, timing, scoring or data file was modified.
- [ ] Tested in Chrome and Edge.

## When you find a bug

You will. This codebase has real defects — several are catalogued in
[10-known-issues.md](10-known-issues.md).

**Do not fix them.** The logic is signed off; an unrequested fix changes
behaviour the client has accepted and puts you outside the agreed scope.

Instead: note it, tell the client, let them decide. If they authorise a fix,
that is a separate, scoped change.
