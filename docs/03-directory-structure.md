# 03 — Directory Structure

## ⚠️ Read this first

This repository contains **many near-identical copies** of the same code,
kept as dated snapshots. The single most common and most damaging mistake is
editing a stale copy and wondering why nothing changes in the browser.

**The live application is:**

```
index.html          ← registration page
GamePanel.html      ← the game page
js/                 ← the live JavaScript + the live stylesheet
Audio/              ← runtime audio
images/             ← runtime images
Help/               ← help pages opened from the game
cgi-bin/            ← Perl backend
```

Everything else is archive, experiment, or vendor material.

## Top level map

| Path | Size | Status | What it is |
| --- | --- | --- | --- |
| `js/` | 20M | ✅ **LIVE** | The real JavaScript. 60 `.js` files + `TSDstyle.css` |
| `index.html` | | ✅ **LIVE** | Registration / landing page |
| `GamePanel.html` | | ✅ **LIVE** | The game screen |
| `GameOver.html` | | ✅ LIVE | End-of-game screen |
| `Audio/` | 104M | ✅ **LIVE** | ~180 WAV + MP3 clips, loaded by filename at runtime |
| `images/` | 12M | ✅ LIVE | 70 images incl. `TSD_Logo.jpg` |
| `Help/` | 142K | ✅ LIVE | Rules, overview, per-game-type help, opened in new tabs |
| `cgi-bin/` | 627K | ✅ LIVE | Perl CGI scripts (deployed to the server's cgi-bin) |
| `css/` | 18K | ⚠️ Mostly dead | `main.css`, `style.css`, `dragtest2.css` — referenced **only** by old `GamePanel - Copy*.html` and `GameSep3/`. The live page uses `js/TSDstyle.css` |
| `GameSep3/` | 377M | 🗄️ Archive | A full September-3 site snapshot (`trivia-smackdown.com/` inside). Complete duplicate tree |
| `js20241011/` | 17M | 🗄️ Archive | Snapshot dated 2024-10-11 |
| `jsJun27/` | 14M | 🗄️ Archive | Snapshot dated June 27 |
| `jsContex/` | 14M | 🗄️ Archive | "Context" experiment branch |
| `js20260624AI/` | 808K | 🗄️ Archive | AI-assisted rewrite experiment |
| `Video/` | 246M | 🚫 Not in git | `Test.mp4` (192 MB), `185-V.soft.mp4`, `SwimMeet.mpg`. Referenced only by `Test/VideoTest.html` |
| `timless-classicsA/` | 42M | 🚫 Not in git | Classical music MP3s, unused by the game |
| `NodeFirstApp/` | 16M | 🧪 Experiment | A separate Node/Express learning app. Not part of the game |
| `treejs-master/` | 914K | 📦 Vendor | Third-party tree component |
| `Test/` | 164K | 🧪 Scratch | Test pages incl. `VideoTest.html` |
| `WorkArea/` | 104K | 🧪 Scratch | Working copies |
| `Help - Copy/` | 112K | 🗄️ Duplicate | Stale copy of `Help/` |
| `Welcome to Trivia_files/` | 6K | 🗄️ Archive | Saved-page assets |
| `docs/` | | 📖 This documentation |

## Inside `js/` — the live tree

60 `.js` files. Functional grouping:

**Core engine**
```
Game.js          base class for all game modes
BoxGame.js       intermediate base for grid-style modes
GameA/B/C/D/E/I/L/M/N/O/P/Q/U/X.js    concrete game modes
```

**Question data (large, generated — see 05-game-data.md)**
```
RoundO.js   2.5M     RoundQ.js   1.7M     RoundN.js   1.5M
RoundC.js   1.4M     RoundP.js   1.3M     RoundM.js   1.2M
RoundB.js   1.2M     RoundL.js   928K     RoundU.js   816K
RoundI.js   611K     RoundD.js   198K     Rounds.js    79K
Round.js  RoundE.js  Rnd.js
```

**UI layer — where a UI-only change belongs**
```
Interface.js      31K   main UI facade
AnsButtons.js     74K   answer button grid
SelectionPanel.js       set/round menus (innerHTML-built)
BidButs.js              bidding buttons
AlphaBar.js             alphabet/dropdown answer bar
ControlPanel.js         control panel
RndMenu.js SetMenu.js   dropdown menus
TSDstyle.css      21K   ← THE LIVE STYLESHEET (147 rules)
```

**Model / data**
```
Player.js  PlayerLineUp.js  Set.js  Sets.js  SubSet.js  SetPRA.js
```

**Support**
```
script.js   42K   bootstrap + global show/hide helpers
Utl.js            utilities
AudX.js Audio.js  sound playback
Help.js HelpBut.js Explain.js   help system
NetTest.js        connectivity check
Settings.js       user settings
```

**Dead weight inside `js/`** — ignore these:
```
ControlPanel.js.bak   GameCYY.js   PolyTest.js   SetPRA1.js
```

## Root-level clutter

The repository root also contains a lot of noise that is **not** part of the
running game:

- `GamePanel - Copy.html`, `GamePanel - Copy (2).html`,
  `GamePanel - Copy (3).html`, `GamePanelJune27.html`, `GamePanel.htmlyy`,
  `index - Copy.html`, `indexD.html` — stale copies.
- `~tm*.html` — 20 CoffeeCup HTML Editor temp files.
- `Game.js`, `GameB.js`, `GameI.js`, `GameL.js`, `Interface.js`,
  `script.js`, `BidButs.js`, `NetTest.js`, `PlayerLineUp.js` at the **root** —
  these are *not* the files the game loads. `GamePanel.html` loads
  `js/Game.js` etc. Root copies are stale.
- `FetchTest.html`, `TrumpTest.html`, `HelloWorldTest.html`,
  `NetTest.js`, `proxy.js` — experiments.
- `*.pl` at root — Perl scripts that belong in `cgi-bin/`.
- `RespondtolawyerA.docx`, `~$spondtolawyerA.docx`, `CiStMo.AL.csv` —
  unrelated documents.

> **Rule of thumb:** if you are editing a file at the repository root that
> also exists in `js/`, you are editing the wrong file.

## Duplicate-detection cheatsheet

Before editing, confirm the file is live:

```bash
# Which stylesheet does the live page use?
grep -n 'stylesheet' GamePanel.html
#   → js/TSDstyle.css

# Which scripts does the live page load?
grep -oE 'src="[^"]+"' GamePanel.html

# Is this id referenced anywhere in the live js?
grep -rn "myElementId" js/
```
