# EduGames / Trivia-SmackDown

Two-player browser trivia game. Plain HTML + vanilla ES6 classes + CSS.
No framework, no build step, no module system. Deployed by FTP to cPanel.

📖 **Full documentation is in [docs/](docs/).** Start with
[docs/README.md](docs/README.md).

---

## 🔴 CURRENT ENGAGEMENT: UI ONLY

**The client has signed off on the game logic. Change how it looks, not how it
works.**

Read [docs/08-ui-update-guide.md](docs/08-ui-update-guide.md) before proposing
any change.

**In scope:** CSS, markup presentation, layout, typography, colours, spacing,
responsive behaviour, hover/focus states, and literal colour/size values
assigned from JS.

**Out of scope:** game rules, scoring, bidding, timing, turn order, answer
validation, round/set loading, `fetch` URLs, question data, Perl CGI, and
unrequested refactors or bug fixes.

If you find a bug — and there are several, see
[docs/10-known-issues.md](docs/10-known-issues.md) — **report it, do not fix
it.**

---

## ⚠️ Editing the wrong file is the #1 hazard

This repo is an FTP dump containing many near-identical copies.

**The live application:**

```
index.html          registration page
GamePanel.html      the game screen
GameOver.html       end screen
js/                 THE live JavaScript (60 files)
js/TSDstyle.css     THE live stylesheet  ← not css/
Audio/  images/  Help/  cgi-bin/
```

**NOT live — do not edit:**

```
css/main.css, css/style.css        ← looks live, isn't
GamePanel - Copy*.html, GamePanelJune27.html, indexD.html
GameSep3/  js20241011/  jsJun27/  jsContex/  js20260624AI/
WorkArea/  Help - Copy/  Test/  NodeFirstApp/  treejs-master/
Game.js, Interface.js, script.js etc. at the REPO ROOT  ← stale copies
```

Verify before editing:

```bash
grep -n 'stylesheet' GamePanel.html       # → js/TSDstyle.css
grep -oE 'src="js/[^"]+"' GamePanel.html  # → the live script list
```

---

## Key facts

- **~50 `<script>` tags in fixed order.** No modules; everything is global.
  Script order *is* the dependency graph — base classes must load before
  subclasses (`Game.js` before `Game*.js`, `BoxGame.js` before `GameE/M/P/U`).
- **Every DOM `id` is effectively a global variable.** The code does
  `gamePlayArea.style.display = "none"` with no `getElementById`. Renaming or
  removing an id breaks logic. Grep first: `grep -rn "theId" js/`
- **JS sets inline styles at runtime**, which beat your CSS. Check with
  `grep -rn "\.style\." js/ | grep -v "^js/Round"`
- **Question data carries its own styling** (`FntSize`, `BkGndColor`, …)
  applied inline by the renderers. A CSS-only recolour cannot reach it. See
  [docs/05-game-data.md](docs/05-game-data.md).
- **Blue = player 0 = left, Red = player 1 = right.** Reinforced by audio
  cues and score labels. Keep this mapping.
- **`js/Round*.js` are ~13 MB of generated question data**, not logic. Exclude
  them from greps.
- **`Audio/` must stay in git** — loaded at runtime by dynamically built
  filenames. Never add it to `.gitignore`.

## Running locally

No build. Open `index.html`, or serve it:

```bash
python -m http.server 8000
```

Expect heavy console logging (normal) and CORS failures on `cgi-bin/*.pl`
(expected off-server).

## Before you finish

Check the definition-of-done list in
[docs/08-ui-update-guide.md](docs/08-ui-update-guide.md#definition-of-done-for-a-ui-change).
