# 02 — Architecture

## The short version

There is no framework, no bundler and no module system. `GamePanel.html`
loads **~50 separate `<script>` tags** in a fixed order; every class lands in
the browser's **global scope**; a small set of free functions in
`js/script.js` wires them together and acts as the bootstrap.

```
index.html                 GamePanel.html
  registration    ────►      the actual game
  js/script.js               js/*.js  (≈50 classes)
  js/NetTest.js              js/TSDstyle.css
```

## Load order matters

Because there are no modules, **script order is the dependency graph**. In
`GamePanel.html` the order is roughly:

1. `Interface.js`, `PlayerLineUp.js` — UI + player state
2. `Game.js` — the base class (must precede all subclasses)
3. `ControlPanel.js`, `SelectionPanel.js`, `RndMenu.js`
4. `BoxGame.js` — intermediate base (must precede `GameE/M/P/U`)
5. `Rounds.js`, `AnsButtons.js`, `Sets.js`, `SetMenu.js`
6. `GameA.js` … `GameX.js` — the concrete game modes
7. `Player.js`, `Round*.js` — data classes and question banks
8. `Set.js`, `Rnd.js`, helpers (`Help`, `Explain`, `AudX`, `Utl`, …)
9. `NetTest.js`, `Settings.js`, `BidButs.js`
10. `script.js` — **last**; defines the bootstrap functions

> If you add a `<script>` tag, put it in the right slot. Adding a class before
> its base class is declared will throw `ReferenceError` at parse time and the
> whole page dies silently apart from a console error.

## Bootstrap sequence

At the very bottom of `GamePanel.html`:

```html
<script>
    setUpGameArea();
    hideAnsBox();
    console.log("Bottom of GamePanel ");
</script>
```

`setUpGameArea()` (in `js/script.js:333`) then does:

```js
disableNextRndBut();
hideCheckBut();
hideAnsBox();
setUpPlayers();
```

So the page paints in a "neutral" state — next-round button disabled, check
button and answer box hidden — and only reveals controls as play progresses.

## Class model

### Game hierarchy

`Game` is the abstract base. `BoxGame` is an intermediate base for the
grid/box-style modes. Concrete modes are single letters.

```
Game
├── GameA   ├── GameB   ├── GameC   ├── GameD
├── GameI   ├── GameL   ├── GameN   ├── GameO
├── GameQ   ├── GameX
└── BoxGame
    ├── GameE   ├── GameM   ├── GameP   └── GameU
```

`Game` (in `js/Game.js`) defines the lifecycle that subclasses override:

| Method | Role |
| --- | --- |
| `init()` | Set up the round |
| `startPlay()` | Begin the active player's turn |
| `butHit(nbr)` | Handle an answer-button press |
| `checkPlay()` | Validate the submitted answer |
| `showAnswers()` / `displayAnswers(txt)` | Reveal correct answers |
| `timesUp()` | Clock expired |
| `nextPlayer()` | Hand the play to the other player |
| `pickWhoGoesFirst()` | Coin-flip, or force player 0 in single-player mode |
| `cleanPlayArea()` / `removeGame()` | Tear down between rounds |
| `showNextPlayerNotice(name)` | The "your turn" banner |

The constructor signature tells you the collaborators each game gets:

```js
constructor(round, cp, utl, plu, itf)
//          │      │   │    │    └── Interface   — all DOM/UI work
//          │      │   │    └─────── PlayerLineUp — the two players
//          │      │   └──────────── Utl          — utilities
//          │      └──────────────── ControlPanel — panel state
//          └─────────────────────── Round        — the question data
```

### Round hierarchy

`Round`, `RoundB`, `RoundC`, `RoundD`, `RoundE`, `RoundI`, `RoundL`, `RoundM`,
`RoundN`, `RoundO`, `RoundP`, `RoundQ`, `RoundU`.

These are **not** logic classes — they are giant generated data files holding
the question banks. See [05-game-data.md](05-game-data.md).

### Support / UI classes

| Class | File | Responsibility |
| --- | --- | --- |
| `Interface` | `Interface.js` | The main UI facade — timers, colours, score display, notices |
| `ControlPanel` | `ControlPanel.js` | Control panel state |
| `SelectionPanel` | `SelectionPanel.js` | Builds the set/round selection menus via `innerHTML` |
| `AnsButtons` | `AnsButtons.js` | Answer button grid |
| `BidButs` | `BidButs.js` | Bidding buttons for type-B rounds; paints `centerDisplay` |
| `AlphaBar` | `AlphaBar.js` | Alphabet/dropdown answer selector |
| `RndMenu` / `SetMenu` | | Round and set dropdown menus |
| `PlayerLineUp` | `PlayerLineUp.js` | Holds the two `Player` objects |
| `Player` | `Player.js` | One player: name, colour, score |
| `Sets` / `Set` / `SubSet` / `SetPRA` | | Set definitions and grouping |
| `Help` / `HelpBut` / `Explain` | | Help overlays and explanations |
| `AudX` / `Audio` | `AudX.js` | Sound playback wrapper |
| `Utl` | `Utl.js` | Misc utilities |
| `NetTest` | `NetTest.js` | Connectivity / CGI reachability check |
| `Settings` | `Settings.js` | User settings (font size, etc.) |

## Where the UI actually lives

For a UI-only engagement this is the important map. DOM manipulation is
concentrated in:

- **`js/Interface.js`** — the biggest UI surface. Timers, player colours,
  score boxes, turn notices. Uses `style.*` and `innerHTML` directly.
- **`js/SelectionPanel.js`** — builds menus by string-concatenating HTML
  into `innerHTML`.
- **`js/BidButs.js`** — bid buttons, sets `centerDisplay` background/colour.
- **`js/AlphaBar.js`** — answer bar, toggles `display` on dropdowns.
- **`js/AnsButtons.js`** — answer button grid.
- **`js/script.js`** — global show/hide helpers (`hideAnsBox`, `showGameArea`,
  `getDefaultFontSize`, …).
- **`js/TSDstyle.css`** — the live stylesheet, 147 rules.
- **`GamePanel.html` / `index.html`** — the markup itself.

Because styling is applied from **both** CSS and inline `element.style.*`
assignments in JS, a pure-CSS restyle will not always win. See
[08-ui-update-guide.md](08-ui-update-guide.md).

## State management

There is none, in the modern sense. State is:

- **Global variables** declared across `script.js` and the class files
  (`singlePlayerMode`, `gameInputArray`, `defaultTextSize`, …).
- **Instance fields** on the singleton-ish objects (`Interface`, `ControlPanel`,
  `PlayerLineUp`).
- **The DOM itself** — visibility and values are frequently read back out of
  elements rather than from a model.

Consequence: changing an element's `id`, or removing an element you think is
unused, can break logic that reads it. Always grep for an `id` before touching
it.

## Data flow for one round

```
Set selected
   └─► Sets/SetMenu resolve the set → list of round serial numbers
        └─► Round*.js  roundMap.get(serNbr)  → raw CSV string
             └─► Rounds.js parses fields
                  └─► Game* subclass renders the challenge
                       └─► Interface paints it, starts the clock, plays audio
                            └─► player answers → butHit() → checkPlay()
                                 └─► Interface updates score, nextPlayer()
```

Optionally, `cgi-bin/GetRounds*.pl` can supply rounds over HTTP instead of
the baked-in `Round*.js` data — see [06-backend-cgi.md](06-backend-cgi.md).
