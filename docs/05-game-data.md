# 05 — Game Data & Round Format

## Where the questions live

Question banks are **compiled into JavaScript files** in `js/`. They are not
JSON, not a database, and not fetched at runtime (though a CGI path also
exists — see [06-backend-cgi.md](06-backend-cgi.md)).

| File | Size | |
| --- | --- | --- |
| `RoundO.js` | 2.5 MB | largest bank |
| `RoundQ.js` | 1.7 MB | |
| `RoundN.js` | 1.5 MB | |
| `RoundC.js` | 1.4 MB | |
| `RoundP.js` | 1.3 MB | |
| `RoundM.js` | 1.2 MB | |
| `RoundB.js` | 1.2 MB | |
| `RoundL.js` | 928 KB | |
| `RoundU.js` | 816 KB | |
| `RoundI.js` | 611 KB | |
| `RoundD.js` | 198 KB | |
| `Rounds.js` | 79 KB | index / lookup helper |

Together roughly **13 MB of question data shipped to the browser as
`<script>` tags.** This is the dominant cost of the initial page load.

## Structure of a Round file

Each `Round*.js` is a class whose only job is to populate a `Map`:

```js
class RoundO {
    constructor(cp) {
        this.roundMap;
    }
    init() {
        this.setData();
    }
    getData(serNbr) {
        return this.roundMap.get(serNbr);
    }
    setData() {
        this.roundMap = new Map();
        this.roundMap.set('AA.Oen00001', ',AA.Oen00001,EdUGames tm,,2,,,,Te,...');
        this.roundMap.set('AA.Oen00002', ',AA.Oen00002,EdUGames tm,,12,,,Te,...');
        // ... thousands more
    }
}
```

## Serial number format

```
AA.Oen00002
│  ││└┴──── sequence number (5 digits)
│  │└────── language: "en"
│  └─────── round type letter: O
└────────── collection prefix
```

The type letter matches the `Round*`/`Game*` class that handles it, which is
how the engine routes a serial number to the right renderer.

## Record format — comma-separated, positional

The value is a single **CSV-style string**, leading comma included. Fields are
positional and **most are empty**. A real example, unpacked:

```
,AA.Oen00002,EdUGames tm,,12,,,Te,,,,aPRA1_0  zPRA1_15 ,,,,,
Emotions/Grief,
Put the five stages of grief in order.,,
Rows=5 Cols=1 FntSize=24 FntColor=blue BkGndColor=yellow LnCnt=1 SingleScreen=No Sort=Yes ,
Denial,Anger,Bargaining,Depression,Acceptance
```

| Position | Content | Example |
| --- | --- | --- |
| 1 | (empty — leading comma) | |
| 2 | Serial number | `AA.Oen00002` |
| 3 | Author / owner | `EdUGames tm` |
| 4 | Date created | `20020917` |
| 5 | Difficulty or point value | `12` |
| 6–11 | Category / tag codes | `ThOrGoMi`, `PhSaTe`, `EvGoFeMi` |
| ~12 | Keywords (`;`-separated) | `masts;sailing ship` |
| ~13 | Grade/age range | `aPRA1_0 zPRA1_15` |
| ~18 | Topic path | `Emotions/Grief`, `US/Navy/USNA` |
| ~19 | The question / instruction | `Put the five stages of grief in order.` |
| ~21 | **Presentation attributes** | `Rows=5 Cols=1 FntSize=24 ...` |
| 22+ | The answers, one per field | `Denial`, `Anger`, … |

Two escaping conventions to know:

- **`~` stands in for an apostrophe.** `USNA~s` means `USNA's`, `Didn~t` means
  `Didn't`. This avoids breaking the surrounding single-quoted JS string.
- **`;`** separates items inside a single field (keywords, answer lists).

## ⚠️ Presentation attributes live inside the data

This matters a great deal for a UI-only engagement. Fonts, colours and grid
geometry are **baked into the question records**, not into CSS:

```
Rows=5 Cols=1 FntSize=24 FntColor=blue BkGndColor=yellow LnCnt=1
SingleScreen=No Sort=Yes
```

And in the answer-button data (`js/AnsButtons.js`):

```
AnswerType=RowsOfButtons AnsRows=12 AnsCols=3 AnsLnCnt=1
AnsFntSize=14 AnsFntColor=blue AnsBkGndColor=yellow
Answers=Aaron;Isaac;Miriam;...
```

Consumed by: `AnsButtons.js`, `GameC.js`, `GameE.js`, `GameO.js`, `GameU.js`.

### Consequences

1. **A CSS restyle will not fully control these elements.** A question that
   says `BkGndColor=yellow` will render yellow regardless of your stylesheet,
   because the game applies it inline.
2. **You cannot bulk-restyle by editing the data** — there are thousands of
   records across 13 MB, and the data is client-signed-off content.
3. **The practical approach** is to change how the *renderer* interprets these
   attributes (in `AnsButtons.js` / `Game*.js`) — for example mapping
   `BkGndColor=yellow` to a designed token instead of the raw colour keyword.
   That is a presentation change, but it sits in files that also hold logic,
   so keep the edit surgical and confined to the styling statement.

Flag this to the client early if the brief includes "modernise the colours" —
it is the main hidden cost in the UI work.

## Sets and rounds

- A **Round** is one challenge (one question + its answers + presentation).
- A **Set** is an ordered collection of rounds, defined by `Set.js`, `Sets.js`,
  `SubSet.js` and `SetPRA.js`.
- `SetMenu.js` and `RndMenu.js` build the pickers; `SelectionPanel.js` renders
  them into the DOM with `innerHTML`.

The `aPRA1_0 zPRA1_15` field encodes the applicable grade/age band, which is
how a set can be targeted at a school level.

## Adding or editing questions

Out of scope for this engagement (data is signed off), but for reference: a
round is added by inserting one more `this.roundMap.set(...)` line into the
appropriate `Round*.js`, using a fresh serial number matching the type letter.
`CreateSet.html` and `SelectingRounds.html` are the in-repo authoring tools.
