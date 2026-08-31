# Game Types — Renderer Reference

A per-letter reference for the **14 concrete game classes** wired into
`js/ControlPanel.js`, written for the UI update: what each one draws, which
DOM it builds, and what a designer can and cannot restyle.

> This complements
> [01-project-overview.md](01-project-overview.md#the-three-game-types),
> which documents the **three help families** (B / D / I) that the player
> sees. Those three are the *rules* families. The fourteen below are the
> *renderers*. One help family covers several renderers.

---

## How a round picks its renderer

The game type is **character 4 of the round serial number** — nothing else.

```
AA.Den00002
    ↑
    D  →  GameD
```

`SelectionPanel.getRoundFmRnd()` reads that character
(`js/SelectionPanel.js:92`), and `ControlPanel.startGame()` switches on it
(`js/ControlPanel.js:309-393`) to construct the matching class.

So you can tell what any round will draw just by reading its id:
`AA.Ben…` → GameB, `AA.Len…` → GameL, `AA.Nen…` → GameN.

A second, finer split exists **inside** some renderers, driven by a `Type=`
or `DisplayType=` key in the round's own data (see
[05-game-data.md](05-game-data.md)). Game B is the important case — see
below.

---

## The interface families (`itfType`)

`ControlPanel.startGame()` also assigns an `itfType`, which decides the panel
chrome around the play area. Four values, and they group the renderers:

| `itfType` | Renderers | Panel chrome |
| --- | --- | --- |
| `B` | B, C, E, M, O, P, Q, U | Bid buttons + CHECK button |
| `D` | D, L, N | No bid grid; a timed single placement |
| `I` | I | Progressive reveal, decaying points |
| `X` | X | Canvas image |

---

## The fourteen renderers

### Family B — bidding / grid games

Players bid how many they can get right; the award is the **square** of the
bid. All show the bid buttons and the CHECK button.

| Type | File | What the player does |
| --- | --- | --- |
| **B** | `js/GameB.js` | Image answering. **Three sub-types** — see below. |
| **C** | `js/GameC.js` | **Drag & drop categorise.** Drag items from a left list into category buckets on the right. |
| **E** | `js/GameE.js` | Button grid; hit the correct targets across rows/cols. |
| **M** | `js/GameM.js` | Button grid built from data-point slices; hit the matching buttons. |
| **O** | `js/GameO.js` | **Drag & drop ordering.** Move items from the left into the correct sequence on the right. Sibling of C. |
| **P** | `js/GameP.js` | Button grid variant, scored on hit count. |
| **Q** | `js/GameQ.js` | Image plus an answer grid, or transparent hotspot buttons over a picture. `ansType` is `'G'` (grid) or `'T'` (transparent buttons). |
| **U** | `js/GameU.js` | Text-pair matching — pair a name with what the person is known for, across columns. |

### Family D — slider / map placement

The answer is a number, a date, or a point on a map. The player places a
marker; closer means more points. All three show a **pre-game notice**
before play starts.

| Type | File | What the player does |
| --- | --- | --- |
| **D** | `js/GameD.js` | **Date line.** Two sliders: pick a year, then a month/day. |
| **N** | `js/GameN.js` | **Number line.** One slider between a low and high bound. |
| **L** | `js/GameL.js` | **Map click.** Click a location on a map or image. |

### Family I — progressive reveal

| Type | File | What the player does |
| --- | --- | --- |
| **I** | `js/GameI.js` | A clue is revealed gradually — image, audio or text. Points decay as more is revealed, so buzzing in early is worth more. `DisplayType` is `Focus`, `Grid` or `BlockOut`. |

### Canvas image games

| Type | File | What the player does |
| --- | --- | --- |
| **A** | `js/GameA.js` | Canvas image with letter/symbol coordinates; click the right and wrong spots. |
| **X** | `js/GameX.js` | Canvas image variant. |

> ⚠️ `GameX` sets `this.gameType = 'A'` and `this.gameInPlay = "gameA"`
> (`js/GameX.js:12-13`) — copied from `GameA` and never updated. Logic bug,
> reported not fixed. See [10-known-issues.md](10-known-issues.md).

---

## Game B has three sub-types — this matters most for design

`GameB.procData()` switches on a `butType` read from the round data
(`js/GameB.js:681-691`), and the branches draw **completely different
layouts**. A design for one does not apply to the others.

| Data `Type=` | `butType` | Method | What it draws |
| --- | --- | --- | --- |
| `Grid` | `G` | `procTypeG()` | **One single sheet image** with an invisible R×C hit grid computed over it. No per-item cards. |
| `MultipleImages` | `M` | `procTypeM()` → `setUpMultiImageTable()` | **A grid of separate image cards**, one `<td>` per picture. |
| `MultipleResourcess` | `M` | same as above | Same card grid, driven by a resource list. |
| `AnswerButtons` | `T` | `procTypeT()` | One image plus click-coordinate hotspots. |

Frequency in `js/RoundB.js`:

| `Type=` | Rounds |
| --- | --- |
| `MultipleResourcess` | 1156 |
| `AnswerButtons` | 24 |
| `Grid` | 11 |
| `MultipleImages` | 1 |

**Practical consequence:** the card-grid design covers the 1157
`MultipleResourcess` + `MultipleImages` rounds. The 11 `Grid` rounds are a
different layout and need their own treatment.

---

## Test rounds

The dev bar in `GamePanel.html` reaches any round directly. It is hidden by
default: click the **"Copyright Pete Antoniak 2026"** button **four times**
(`GamePanel.html:386` requires `cCount++ > 2`), then use the `rndMenu`
dropdown and press **StrtRnd**.

| Round | Renderer | Good for testing |
| --- | --- | --- |
| `AA.Ben00244` | B, card grid | 12 quarter images — the multi-image layout |
| `AA.Ben00001` | B, single sheet | 4×4 presidents contact sheet |
| `AA.Ben00002` | B, answer buttons | Hotspot variant |
| `AA.Cen00100` | C | Drag & drop categorise |
| `AA.Oen00001` | O | Drag & drop ordering |
| `AA.Den00002` | D | Date sliders + pre-game notice |
| `AA.Nen00001` | N | Number slider + pre-game notice |
| `AA.Len00002` | L | Map click + pre-game notice |
| `AA.Ien00005` | I | Progressive reveal |

> The dropdown list is **hardcoded off-server test data**. On the live server
> `onNet` is `true` and rounds arrive from `cgi-bin/GetRoundsTSD.pl`, chosen
> by the set the players picked on `index.html`. The dev bar is not used in
> production.

---

## What a CSS-only change can and cannot reach

Constraints that apply across every renderer:

- **Every DOM `id` is a global variable.** The scripts do
  `gamePlayArea.style.display = "none"` with no `getElementById`. Renaming or
  removing an id breaks logic. Grep before touching: `grep -rn "theId" js/`
- **The renderers write `<table>` markup**, not divs. Tables can be flattened
  with `display: block/flex` in CSS, but the structure itself is generated.
- **Question data carries its own styling** — `FntSize`, `FntColor`,
  `BkGndColor` — applied **inline** by the renderers. Inline styles beat
  stylesheet rules, so a CSS-only recolour cannot reach them. See
  [05-game-data.md](05-game-data.md).
- **Some state markers are bitmaps, not CSS.** Player picks and check marks
  are 17×16 JPEGs fetched from `edugames.com` (`BlueDot.jpg`, `RedDot.jpg`,
  `RedCheckMark.BB.jpg`). They can be given a ring or shadow, but not
  replaced without a JS change.
- **Ruler and number-line graphics are bitmaps too** — `NbrLine-1.PA.gif`,
  `DateLine-1.KA.jpg`. Fixed colours; cannot be recoloured by CSS.
- **Blue = player 0 = left, Red = player 1 = right.** Reinforced by audio
  cues and score labels. Keep this mapping.

---

## Where each renderer writes

Useful when working out which container a rule should target.

| Container | Written by |
| --- | --- |
| `#gameInsrtPt` | B (all sub-types) |
| `#imageInsertPt` | B (`procTypeT`), L |
| `#gamePlayArea` | D, N, L, C, O, and the pre-game notices |
| `#dayTableInsertionPoint` | D (the day slider) |
| `#arrowInsrtPt0` / `#arrowInsrtPt1` | D, N (player answer markers) |

---

## Related docs

- [01-project-overview.md](01-project-overview.md) — the three help families,
  scoring, colour identity
- [05-game-data.md](05-game-data.md) — round data format and the styling keys
  carried in the data
- [08-ui-update-guide.md](08-ui-update-guide.md) — rules of engagement
- [10-known-issues.md](10-known-issues.md) — bugs found while surveying
