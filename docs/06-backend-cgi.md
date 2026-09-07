# 06 — Backend (Perl CGI)

> Nothing in this document is in scope for the UI-only engagement. It is here
> so you understand what the front end talks to, and so you don't accidentally
> break a request path while restyling.

## Hosting

Shared **cPanel** hosting. The `.htaccess` at the repository root is a
cPanel-generated PHP handler stub:

```apache
# php -- BEGIN cPanel-generated handler, do not edit
# This domain inherits the "PHP" package.
# php -- END cPanel-generated handler, do not edit
```

Two domains are involved:

- `trivia-smackdown.com` — the game front end.
- `edugames.com/cgi-bin/` — historically where the data scripts lived. The
  CORS headers in the Perl scripts allow `https://trivia-smackdown.com`.

Deployment is by **FTP upload** — see
[09-git-and-deployment.md](09-git-and-deployment.md).

## The `onNet` switch

The front end can run in two modes, controlled by a single global in
`js/script.js:39`:

```js
let onNet = true;
```

- **`onNet === true`** → fetch rounds and sets over HTTP from `cgi-bin/`.
- **`onNet === false`** → use the question data baked into `js/Round*.js`.

It is set by `doNetTest()` in `js/script.js:838`, which asks `NetTest`:

```js
const netTest = new NetTest();
const test = netTest.test();
if (test == "offNet") { onNet = false; } else { onNet = true; }
```

But `js/NetTest.js` is a **stub** — `test()` unconditionally returns
`"onNet"`:

```js
class NetTest {
    constructor() {}
    test() {
        return "onNet";     // always
    }
}
```

So in practice **`onNet` is always `true`** and the game always tries the
network path. That is why the large `Round*.js` files can appear to be dead
weight while still being loaded on every page view. See
[10-known-issues.md](10-known-issues.md).

## Endpoints

Scripts referenced from the live JavaScript:

| Endpoint | Called from | Purpose |
| --- | --- | --- |
| `/cgi-bin/GetRoundsTSD.pl?<serNbrs>` | `js/Set.js:69` | Fetch one or more rounds by comma-separated serial number |
| `/cgi-bin/GetASetTSD.pl?<setSerNbr>` | `js/ControlPanel.js:110` | Fetch a whole set |
| `/cgi-bin/GetRounds.pl` | `js/SelectionPanel.js` (commented) | Older round fetch |
| `/cgi-bin/GetTextFileTSD.pl` | | Text asset fetch |
| `/cgi-bin/GetSetLinesFromDB.pl` | | Set listing from DB |
| `/cgi-bin/SubmitSetToServer.pl` | | Authoring: upload a set |
| `/cgi-bin/GetASet.pl`, `GetRnds.pl`, `GetRndsTSD.pl` | | Older variants |

Files present in `cgi-bin/`:

```
GetASetTSD.pl   GetRound.pl    GetRounds.pl   GetRoundsA.pl
GetRoundsTSD.pl GetTSDRounds.pl
TestA.pl  TestB.pl  TestBB.pl  TestC.pl  TestCC.pl  TestD.pl
TestNov8a.pl  TestPerl.pl  TestB.php  unnamed_test.t
```

Several more `.pl` files sit at the repository **root** (`GetRoundAA.pl`,
`GetRounds.pl`, `GetRoundsAA.pl`, `GetRoundsOrig.pl`, `GetRoundsTSD.pl`,
`GetTextFile.pl`, `GetTextFileTSD.pl`, `TestABC.pl`, `TestB.pl`). These are
stale duplicates — the live ones are the ones deployed into the server's
`cgi-bin/`.

## Anatomy of a CGI script

`cgi-bin/GetRoundsTSD.pl`, abridged:

```perl
#!/usr/local/bin/perl

require "RtnDbName.pl";

$debug = 0;
print "Content-type: text/html\n\n";

$buffer = $ENV{'QUERY_STRING'};
$buffer = "AA.Aen00001";              # <-- see warning below

@serNbrList = split(/,/, $buffer);

$output  = "Content-Type: application/json\n";
$output .= "Access-Control-Allow-Origin: https://trivia-smackdown.com\n";
$output .= "Access-Control-Allow-Methods: GET\n\n";

foreach $sn (@serNbrList) { ... }
```

Points to note:

1. **Query string is read from `$ENV{'QUERY_STRING'}`** — plain GET params, no
   framework.
2. **Line 14 overwrites the query string with a hard-coded serial number**
   (`$buffer = "AA.Aen00001";`). Whatever the client asks for, this script
   returns that one round. It looks like leftover debugging. Logic — leave it,
   but see [10-known-issues.md](10-known-issues.md).
3. **Two conflicting `Content-Type` headers** are emitted — `text/html` via
   `print`, then `application/json` inside `$output`. The client calls
   `response.text()` rather than `response.json()`, which is presumably why
   this has never been noticed.
4. **CORS** is hard-coded to `https://trivia-smackdown.com`. Requests from any
   other origin — including a local dev server — will be blocked by the
   browser.
5. `require "RtnDbName.pl"` pulls in database naming; that helper is not in
   `cgi-bin/` in this repository.

## Implications for local development

Because of the CORS origin lock and the `#!/usr/local/bin/perl` shebang, the
CGI layer generally **will not work on a local machine**. For UI work this is
fine — see [07-local-development.md](07-local-development.md) for how to work
around it.
