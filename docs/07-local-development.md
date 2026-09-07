# 07 — Local Development

## There is no build step

No `npm install`, no bundler, no transpiler, no dev server required by the
project itself. You edit a file and reload the browser. That is the whole
loop.

> The `package.json` files in the repo belong to `NodeFirstApp/` (a separate
> learning project) and to `treejs-master/` (vendor). Neither builds the game.

## Running the game

### Option A — plain file open

Double-click `index.html`, or open `GamePanel.html` directly to skip
registration.

Works for most UI work. Limitation: `file://` origins block `fetch()`, so any
code path that calls `cgi-bin` will fail. Since `onNet` is effectively always
`true` (see [06-backend-cgi.md](06-backend-cgi.md)), expect console errors on
set/round loading.

### Option B — a local static server (recommended)

Serves over `http://`, which behaves much closer to production.

```bash
# Python (already installed on this machine)
python -m http.server 8000
# then open http://localhost:8000/index.html
```

```bash
# or, if you prefer Node
npx serve .
```

VS Code's **Live Server** extension also works well and gives you auto-reload,
which is worth having for CSS iteration.

### Option C — jump straight to a game screen

`GamePanel.html` is self-contained enough to open on its own. Its bootstrap
runs:

```js
setUpGameArea();
hideAnsBox();
```

so you get the neutral, pre-play layout — which is the right canvas for most
styling work.

## Expected console noise

This codebase logs heavily. Almost every method opens with a `console.log`:

```js
init() { console.log("Game init "); }
startPlay() { console.log("Game startPlay   "); }
```

A clean run still produces hundreds of lines. **Do not treat console output as
a sign something is wrong** — look specifically for `Uncaught`, `ReferenceError`
or `404`.

Known, harmless-in-dev errors:

- `favicon-36x36.png 404` — the icon path is absolute (`/favicon-36x36.png`).
- CORS / `Failed to fetch` on `cgi-bin/*.pl` — expected off-server.
- `http://localhost/` fetch in `js/AlphaBar.js:350` — hard-coded, will fail
  unless you happen to be serving on port 80.

## Backend locally

Generally not worth it. The Perl scripts assume `#!/usr/local/bin/perl`, a
cPanel environment, a `RtnDbName.pl` helper that is not in the repo, and they
hard-code CORS to `https://trivia-smackdown.com`.

If you must exercise a data path, stub the response instead — intercept the
`fetch` in the browser console, or temporarily point the URL at a local JSON
file. **Do not commit such a stub.**

## Testing your UI changes

There is no automated test suite. Verification is manual:

1. **Registration** — `index.html`: both player fields, zip, grade dropdown,
   the Single Player Mode button.
2. **Game panel** — `GamePanel.html`: score boxes left and right, centre
   display, question box, answer bar, timer, control buttons.
3. **Both player colours** — confirm blue-left / red-right is intact and that
   the active-player highlight still reads clearly.
4. **Single-player mode** — `secondPlayerBox` / `hide2nPlyr` must hide
   cleanly without leaving a gap.
5. **Font size settings** — cycle `defaultTextSize` 1–5 and confirm the layout
   survives `xx-large`.
6. **Help links** — they open in new tabs; confirm they are still reachable.
7. **Browser check** — the audience skews older and may be on older browsers.
   Test Chrome and Edge at minimum; avoid very new CSS features without a
   fallback.

## Useful greps

```bash
# Which scripts does the live game load, in order?
grep -oE 'src="js/[^"]+"' GamePanel.html

# Where is this id used?
grep -rn "centerDisplay" js/

# What styles does JS set at runtime (i.e. what will beat my CSS)?
grep -rn "\.style\." js/ | grep -v "^js/Round"

# Find a colour literal
grep -rn "SkyBlue\|Salmon\|#007bff" js/ *.html
```

Exclude `js/Round*.js` from greps where you can — they are 13 MB of data and
will flood your results.

## Editor guidance

- Files are **CRLF** on this Windows checkout; `js/.gitattributes` governs
  normalisation. Do not mass-convert line endings — it produces enormous,
  unreviewable diffs.
- Avoid "format on save" / auto-formatting on the legacy files. The
  indentation is inconsistent (tabs and spaces mixed) and reformatting a
  1 MB file destroys the diff.
- Do not let an editor open `RoundO.js` (2.5 MB) with linting enabled unless
  you enjoy waiting.
