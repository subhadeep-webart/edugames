# EduGames / Trivia-SmackDown — Documentation

Reference documentation for the Trivia-SmackDown codebase, written for both
human developers and AI coding assistants (Claude, Copilot, Cursor, etc.).

## Scope of current work

> **UI-only engagement.** The client has signed off on the existing game
> logic. Work is limited to the presentation layer. Do **not** refactor,
> "improve", or restructure game rules, scoring, bidding, timing or data
> loading. See [08-ui-update-guide.md](08-ui-update-guide.md) for the rules
> of engagement and the safe-to-edit file list.

## Index

| Doc | What it covers |
| --- | --- |
| [01-project-overview.md](01-project-overview.md) | What the product is, how the game is played, game types |
| [02-architecture.md](02-architecture.md) | Runtime architecture, class model, boot sequence |
| [03-directory-structure.md](03-directory-structure.md) | Folder-by-folder map, which folders are live vs. dead |
| [04-frontend-ui.md](04-frontend-ui.md) | Pages, DOM contract, CSS, the UI-owning classes |
| [05-game-data.md](05-game-data.md) | Round data format, the CSV-in-JS question banks |
| [06-backend-cgi.md](06-backend-cgi.md) | Perl CGI endpoints, hosting, CORS |
| [07-local-development.md](07-local-development.md) | Running the game locally, debugging |
| [08-ui-update-guide.md](08-ui-update-guide.md) | **Rules of engagement for the UI update** |
| [09-git-and-deployment.md](09-git-and-deployment.md) | Repo hygiene, history rewrite, FTP deployment |
| [10-known-issues.md](10-known-issues.md) | Landmines, bugs and gotchas found while surveying |
| [11-new-ui-design-tokens.md](11-new-ui-design-tokens.md) | Design tokens, splash / start / overview / setup screens |
| [12-game-types-reference.md](12-game-types-reference.md) | **Per-letter renderer reference** — what each Game* class draws |

## Quick orientation

- **Product:** a two-player, head-to-head trivia game for a single computer.
- **Stack:** plain HTML + vanilla ES6 classes + CSS. No build step, no
  framework, no package manager for the game itself.
- **Backend:** Perl CGI scripts under `cgi-bin/` on shared cPanel hosting.
- **Entry points:** `index.html` (registration) then `GamePanel.html` (game).
- **Live code lives in `js/`** — the other `js*` folders are dated snapshots.

## For AI assistants

Read [02-architecture.md](02-architecture.md) and
[08-ui-update-guide.md](08-ui-update-guide.md) before proposing any change.
The single most common mistake in this repo is editing a stale copy of a
file: there are many near-identical duplicates of `GamePanel.html` and of the
whole `js/` tree. Always confirm the path you are editing is the live one.
