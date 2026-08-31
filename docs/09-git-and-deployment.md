# 09 — Git & Deployment

## Repository

- **Remote:** `https://github.com/webarttechnology/EdugamesUi.git`
- **Branch:** `main`
- **Tracked files:** ~998
- **`.git` size:** ~80 MB

The project arrived as an **FTP dump from the client** — a live web root
copied wholesale, which is why it contains dated snapshots, editor temp files,
backups and unrelated documents alongside the running game.

## History rewrite — what happened and why

The initial import could not be pushed to GitHub. Cause:

```
Video/Test.mp4  →  192.5 MB
```

GitHub **hard-rejects any single file over 100 MB**. The file was committed in
the first commit, so it travelled with every push attempt regardless of later
deletions.

Because the remote was empty (nothing had ever been pushed, so no one could
have cloned it), history was rewritten with `git-filter-repo`.

**Result: `.git` went from 383 MB → 80 MB.** All commits were preserved; their
hashes changed.

### Purged from all history

| Removed | Approx. |
| --- | --- |
| `Video/`, `GameSep3/.../Video/` — mp4, mpg, mov, avi, wmv, mkv, webm | ~452 MB |
| `NodeFirstApp/node_modules/` — 1925 files | ~18 MB |
| `timless-classicsA/` — unused classical MP3s | ~42 MB |
| `New folder/`, `New folder (2)/` audio stashes | ~13 MB |
| Visual Studio `.vs/` caches, `.vsidx`, `.db-wal`, `.db-shm` | |
| `*.bak`, `~tm*.html`, Office `~$*` lock files, `* - Copy.*` | |

**Files were never deleted from disk** — only from git tracking and history.
`Video/`, `node_modules/` and the rest are all still in the working directory.

### 🔴 Audio/ is deliberately still tracked

`Audio/` is ~104 MB and stays in git **on purpose**. The game loads it at
runtime by filename, including dynamically constructed paths:

```js
new Audio("Audio/RedsTurn.wav")
const txt = "Audio/Nbr" + seconds + ".wav";
buf += this.context.ui.bidButs.topBid + ".wav";
```

Removing it would break the game for anyone who clones the repository. Its
largest members (`GeneralA.wav`, `GeneralAhalfVol.wav` — 14.3 MB each) are
comfortably under GitHub's limits.

**Do not add `Audio/` to `.gitignore`.**

### Backup

A full copy of the pre-rewrite `.git` was taken before the operation:

```
d:\Subhadeep\edugames-git-backup-698aca0
```

Safe to delete once you are confident the pushed history is good. It reclaims
~383 MB.

## .gitignore

Located at the repository root. Categories covered:

- Dependencies — `node_modules/`, `bower_components/`, `vendor/`
- Logs and debug output
- Environment and secrets — `.env`, `*.pem`, `*.key`
- Editor and IDE — `.vscode/`, `.idea/`, `*.swp`
- OS junk — `Thumbs.db`, `Desktop.ini`, `.DS_Store`
- Office / editor temp — `~$*`, `~tm*.html`, `*.tmp`
- Backup / copy artifacts — `*.bak`, `*.orig`, `* - Copy.*`
- Build and cache output — `dist/`, `build/`, `.cache/`, `coverage/`
- Video — `*.mp4`, `*.mov`, `*.avi`, and the `Video/` folder
- Archives — `*.zip`, `*.rar`, `*.7z`, `*.iso`
- Large binaries and databases — `*.psd`, `*.sqlite`, `*.db`
- Spare media stashes — `**/New folder/`, `timless-classicsA/`

Note the deliberate asymmetry: **video is ignored, audio is not.**

## Adding large files later

If a new video or other large asset is genuinely required at runtime:

1. **Preferred:** host it outside git — on the web server, or a CDN — and
   reference it by URL.
2. **If it must be versioned:** use Git LFS.

```bash
git lfs install
git lfs track "*.mp4"
git add .gitattributes
```

Never commit a file over 100 MB directly; GitHub will reject the push and you
will be back to rewriting history.

## Deployment

Deployment is **FTP upload to cPanel shared hosting**. There is no CI, no
build step, and no deploy script in the repository.

### What to upload

For a UI-only change, typically just:

```
js/TSDstyle.css        ← the live stylesheet
index.html
GamePanel.html
GameOver.html
Help/*.html            ← if touched
js/*.js                ← only the specific files you changed
```

### What NOT to upload

Do not mirror the whole repository to the web root. Leave behind:

```
docs/                  GameSep3/            js20241011/
jsJun27/               jsContex/            js20260624AI/
NodeFirstApp/          WorkArea/            Test/
Help - Copy/           Video/               timless-classicsA/
*.bak  ~tm*.html  *.docx  *.csv  "* - Copy.*"
```

`cgi-bin/` contents deploy into the server's own `cgi-bin/`, which usually
needs execute permissions (`755`) on the `.pl` files.

### Deployment checklist

- [ ] Changes committed and pushed to `main` first.
- [ ] Uploading the **live** files, not the copies.
- [ ] `js/TSDstyle.css` uploaded if styling changed.
- [ ] Cache-busted or hard-refreshed when verifying (`Ctrl+F5`) — the CSS
      filename is unversioned, so browsers will hold the old copy.
- [ ] Verified on the live domain, not just locally: registration → set
      selection → a round of play.
- [ ] Both player colours and the score displays checked on the live site.

### Rollback

There is no automated rollback. Keep the previous copy of any file you
overwrite, or recover it from git:

```bash
git show HEAD~1:js/TSDstyle.css > TSDstyle-previous.css
```

## Working conventions

- Branch off `main` for a body of UI work; do not commit large binaries.
- The repository has mixed CRLF/LF; `js/.gitattributes` governs
  normalisation. Do not mass-convert line endings — it creates enormous,
  unreviewable diffs.
- Commit messages: state what changed in the UI and which page it affects.
