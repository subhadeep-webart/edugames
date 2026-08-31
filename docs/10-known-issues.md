# 10 — Known Issues & Landmines

Findings from surveying the codebase. **None of these are authorised for
fixing under the current UI-only engagement** — the game logic is signed off.
They are documented so you recognise them, don't mistake them for something
you broke, and can raise them with the client.

Each entry notes whether it could affect UI work.

---

## 🔴 Logic bugs (do not fix — report)

### 1. CGI ignores the requested round

**`cgi-bin/GetRoundsTSD.pl:14-15`**

```perl
$buffer = $ENV{ 'QUERY_STRING' };
$buffer =  "AA.Aen00001";          # ← overwrites the query string
```

The query string is read, then immediately discarded and replaced with a
hard-coded serial number. Whatever round the client requests, this endpoint
returns `AA.Aen00001`. Looks like leftover debugging that shipped.

*UI impact:* none directly, but it means the network data path cannot be
trusted while testing.

---

### 2. `getHelpForThisTypeRound()` falls through

**`js/script.js:754`**

```js
switch (thisRndType) {
    case "B":
    case "E":
    case "E":          // ← "E" duplicated
    case "O":
    case "P":
    case "Q":
    case "U":
        type = "B";    // ← no break; falls through

    case "D":
    case "N":
    case "L":
        break;
        type = "D";    // ← unreachable, after break
    case "I":
        type = "I";
}
```

Three separate defects: `"E"` appears twice; the `type = "B"` assignment has
no `break` so it falls through; and `type = "D"` sits *after* a `break` and can
never execute. Net effect: types D, N and L never get their own help page, and
B-family types may resolve incorrectly.

*UI impact:* the Help link can open the wrong page. If you are asked to
"check the help links work", this is why one may look wrong.

---

### 3. `NetTest` is a stub — `onNet` is always true

**`js/NetTest.js`**

```js
test() {
    return "onNet";     // unconditional
}
```

`doNetTest()` in `js/script.js:838` branches on this, so `onNet` is
permanently `true`. The offline path — using the baked-in `js/Round*.js`
question banks — is therefore unreachable, even though ~13 MB of that data is
loaded into memory on every page view.

*UI impact:* significant for perceived performance. The page downloads and
parses 13 MB of question data it then never uses. Worth raising if the client
asks why the game is slow to load.

---

### 4. Hard-coded `http://localhost/` in production code

**`js/AlphaBar.js:350`**

```js
fetch('http://localhost/' + filePath)
```

Will fail on the live site, and triggers a mixed-content block when the page is
served over HTTPS.

*UI impact:* console errors during testing; whatever this feature renders will
be empty.

---

### 5. Conflicting Content-Type headers

**`cgi-bin/GetRoundsTSD.pl`**

```perl
print "Content-type: text/html\n\n";      # sent first
$output  = "Content-Type: application/json\n";   # then this, in the body
```

The real header is `text/html`; the JSON header ends up as body text. Masked
because the client calls `response.text()`, not `response.json()`.

---

### 5a. Game types D, L and N: question blank until Start Round — BY DESIGN

**`js/ControlPanel.js:331, 349, 361` + `js/Game.js:72`**

D, L and N are the only three types whose `init()` call is commented out:

```js
case 'D':
    gameD = new GameD(...);
    this.theGameInPlay = gameD;
    ///gameD.init();          // deferred until "Start Round" is pressed
```

That is deliberate — their constructors paint a **pre-game notice**, and
`init()` must not run until the player presses *Start Round* on it.

`Game.init()` is also what fills `#qBox`:

```js
cp.itf.setQuestion(serNbrOfRndInPlay + "-" + this.question);
```

`Interface.cleanPlayArea()` blanks it a moment earlier
(`js/Interface.js:872`), so for D / L / N the question bar is **empty while
the pre-game notice is on screen**, and fills the instant play starts.

**This is correct game behaviour, not a bug.** The notice is meant to be read
before the question is revealed; showing the question alongside it gives away
the round early.

> ⚠️ Recorded here because it looks like a bug and was once "fixed" as one.
> A `Game.showQuestionForPregameNotice()` helper was added to paint the
> question during the notice, then removed once the intent was confirmed.
> Do not re-add it. If a D / L / N round shows no question **after**
> *Start Round* is pressed, that is a real fault — start at `Game.init()`.

---

### 5b. Duplicate key in `js/Sets.js`

**`js/Sets.js:26` and `js/Sets.js:30`**

`PRA1_1781` is used as a `setMap` key twice. The later `set()` silently
overwrites the earlier one, so the set defined at line 26 can never be
loaded.

---

### 5c. Geography set carries the wrong id in its own data

**`js/Sets.js:29`**

```js
this.setMap.set('PRA1_1780','PRA1_1781,2024.05.12,...');
//               ^ key                ^ first data field disagrees
```

Lookup by key still works, so this is latent rather than breaking — but any
code that reads the id back out of the data gets `PRA1_1781` for the set the
player selected as `PRA1_1780`. Line 26 has the same disagreement
(`PRA1_1781` → `PRA1_1782`).

Also in this set: `AA.Qen00001` has no entry in the offline round data, so it
is skipped when `onNet` is false.

---

## 🟡 Structural hazards

### 6. Massive file duplication

The most dangerous property of this repository for day-to-day work.

- Six near-identical `js` trees: `js/` (live), `js20241011/`, `jsJun27/`,
  `jsContex/`, `js20260624AI/`, plus `GameSep3/trivia-smackdown.com/js/`.
- Five copies of `GamePanel.html`.
- Stale copies of `Game.js`, `Interface.js`, `script.js` and others at the
  **repository root** — these are *not* what the game loads.
- `Help - Copy/` duplicating `Help/`.

**Always confirm the path before editing.** See
[03-directory-structure.md](03-directory-structure.md).

---

### 7. Two competing stylesheets

`css/main.css` and `css/style.css` exist and look plausible, but the live
`GamePanel.html` loads **`js/TSDstyle.css`**. The `css/` folder is only
referenced by stale copies and the `GameSep3/` archive.

*UI impact:* **high.** Editing `css/main.css` produces no visible change and
is an easy hour to lose.

---

### 8. Presentation baked into question data

Covered in detail in [05-game-data.md](05-game-data.md). Thousands of question
records carry `FntSize`, `FntColor`, `BkGndColor`, `AnsRows`, `AnsCols`, and
the renderers apply them inline.

*UI impact:* **highest of anything in this list.** A stylesheet-only recolour
cannot reach these elements. Scope any "modernise the colours" request with
this in mind, and raise it with the client before quoting.

---

### 9. No module system — global namespace

~50 classes all in global scope, dependency order enforced only by the order
of `<script>` tags. Adding a tag in the wrong position throws a
`ReferenceError` at parse time.

Browsers also expose every `id` as a global variable, and the code relies on
this (`gamePlayArea.style.display = "none"` with no `getElementById`). So an
`id` is effectively a global variable name — renaming one silently breaks code.

---

### 10. No tests, no build, no linting

Verification is entirely manual. There is no safety net; the checklist in
[08-ui-update-guide.md](08-ui-update-guide.md) is the substitute.

---

## 🟢 Cosmetic / low priority

### 11. Favicon 404

**`GamePanel.html:13`** — `href="/favicon-36x36.png"` is an absolute path that
does not resolve. Also declares `type="image/android-icon-36x36.png"`, which is
not a valid MIME type. Produces a console 404 on every load.

*This one is arguably in scope* — it is markup presentation, not logic.

---

### 12. Console log noise

Nearly every method logs on entry. A healthy run emits hundreds of lines.
Filter for `Uncaught`, `ReferenceError` and `404` when debugging.

---

### 13. Legacy markup

`index.html` is Word-exported: `<p class=MsoNormal>`, `<o:p>` tags, `<font>`
elements, `bgcolor` attributes, unquoted attribute values. There is also a
malformed anchor:

```html
<a href="Help/SimpleRules.html","_blank">
```

The `,"_blank"` is not valid attribute syntax and is ignored — the link opens
in the same tab rather than a new one.

*In scope* — this is exactly the kind of presentational cleanup the
engagement covers.

---

### 14. Stray `</html>` mid-document

`index.html` closes `</head>` and `</html>` before `<body>` even opens.
Browsers recover, but it is invalid and can confuse tooling.

*In scope.*

---

### 15. Not responsive

Both pages declare a viewport meta tag, but use table layout with hard-coded
pixel widths. Nothing reflows.

*In scope, but the highest-risk item* — table cells anchor the insertion
points the JS writes into. Change incrementally and test after each step.

---

## Summary for the client conversation

If you need to raise issues, these are the ones that matter commercially:

1. **Data-driven styling (#8)** — limits what a CSS-only restyle can achieve.
   Discuss before quoting a full visual refresh.
2. **13 MB of unused question data loaded every visit (#3)** — the main
   performance problem, and a small fix if they ever authorise it.
3. **File duplication (#6)** — real ongoing risk of work being lost in the
   wrong copy. Worth proposing an archive cleanup as separate work.
4. **CGI returns a fixed round (#1)** — if set/round loading is reported as
   broken in production, start here.
