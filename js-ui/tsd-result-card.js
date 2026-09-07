/* tsd-result-card.js -- UI layer only.

   The scorebar reserves two 303px cards for the bid grids. Six game types
   never bid at all (A, D, I, L, N, X -- none of them ever call
   bidButs.createButs), so on those rounds both cards render empty for the
   whole round and the player is left looking at two blank "Place Your Bid"
   boxes with nothing to click.

   On those six types ONLY, this script puts .is-result on the scorebar and
   CSS swaps the two empty bid cards for one wide #resultCard.

   Bidding rounds are deliberately left alone. The bid grid stays on screen
   for the whole round there, including after the bid is placed: the
   disabled numbers and the highlighted winning bid are the record of what
   was bid, which the players still need to see.

   Nothing here computes game state. The game type is read from cp.gameType
   (set by ControlPanel from the round data); the answer text is read back
   out of #qBox, which Interface.showAnswer() appends "The answer is: ..."
   to. Nothing is written back into the game.                             */
(function () {
  "use strict";

  /* Game types with no bidding. Verified by grepping createButs across
     js/Game*.js -- these six never call it. */
  /* Types that never bid, so the bid panels stay empty and the result card
     can take their place.

     "I" was in this list and must not be: Game I has no bidding either, but
     AlphaBar.js renders its A-Z answer buttons into #insrtpt0X / #insrtpt1X
     -- the very slots inside .tsd-bid-panel. Hiding the panels hid the
     alphabet bar with them, so a Game I round had no way to answer. */
  var NO_BID_TYPES = ["A", "D", "L", "N", "X"];

  var scorebar, card, answerEl, winnerEl, winnerName, titleEl;

  function currentGameType() {
    try {
      return (typeof cp !== "undefined" && cp && cp.gameType) ? String(cp.gameType) : "";
    } catch (e) {
      return "";
    }
  }

  function isNoBidRound() {
    var t = currentGameType();
    return t !== "" && NO_BID_TYPES.indexOf(t) !== -1;
  }

  /* "....The answer is: Virginia" -> "Virginia" */
  function answerFromQBox() {
    var q = document.getElementById("qBox");
    if (!q) return "";
    var m = /answer is:\s*(.+)$/i.exec(q.textContent || "");
    return m ? m[1].trim() : "";
  }

  /* Blue = player 0 = left, red = player 1 = right.

     Takes the notice text as an argument rather than re-reading
     #centerDisplay, because the caller must only ever pass the end-of-round
     verdict. Every other notice the game posts names a player too -- "HELEN
     GOES FIRST!", "Now it's Helen's turn." -- and matching a name in those
     is what used to light the trophy up at the top of the round, before
     anybody had answered anything. */
  function winnerFromNotice(txt) {
    if (!txt) return "";
    var p0 = document.getElementById("player0");
    var p1 = document.getElementById("player1");
    var n0 = p0 ? p0.textContent.trim() : "";
    var n1 = p1 ? p1.textContent.trim() : "";
    if (n0 && n0 !== "--" && txt.indexOf(n0) !== -1) return n0;
    if (n1 && n1 !== "--" && txt.indexOf(n1) !== -1) return n1;
    return "";
  }

  /* The end-of-round verdict, as the game scripts write it.

     postNoticeCenterDisplay() puts every notice into #centerDisplay -- the
     narrow clock column. Short ones ("Now it's Helen's turn.") suit that
     column fine, but the end-of-round verdict on types L / D / N is a
     multi-sentence paragraph built with <br>. In a ~275px column that
     paragraph wrapped to a dozen lines and stretched the clock card far
     taller than the cards either side of it, which is what threw the whole
     scorebar row out of proportion.

     The verdict is recognised by shape, not by parsing its meaning: the
     game scripts join the sentences with <br>, so a notice containing a
     line break IS the long-form verdict, and one without is a short status
     line. Nothing here is written back into the game -- the text is read
     out of the notice the game already posted and shown in the wide card
     that has room for it. */
  function verdictFromCenterDisplay() {
    var cd = document.getElementById("centerDisplay");
    if (!cd) return "";
    if (!/<br/i.test(cd.innerHTML || "")) return "";
    return (cd.textContent || "").replace(/\s+/g, " ").trim();
  }

  function refresh() {
    if (!scorebar) return;

    var show = isNoBidRound();
    scorebar.classList.toggle("is-result", show);

    /* The clock notice is only suppressed while the wide card is standing in
       for the bid panels. On a bidding round the card is hidden, so the
       notice has to stay where it is. */
    var cd = document.getElementById("centerDisplay");
    if (!show) {
      if (cd) cd.classList.remove("is-relocated");
      return;
    }

    var ans = answerFromQBox();
    var verdict = verdictFromCenterDisplay();
    /* Only the verdict names a winner. While the round is still in play the
       trophy row stays hidden. */
    var who = winnerFromNotice(verdict);

    /* The verdict supersedes the bare answer: it states the answer AND how
       each player did, so showing both would repeat the same sentence. */
    var body = verdict || ans;

    if (answerEl) answerEl.textContent = body;
    if (titleEl) {
      titleEl.textContent = body
        ? (verdict ? "Round Result:" : "Correct Answer:")
        : "Round in play";
    }
    if (winnerName) winnerName.textContent = who;
    if (winnerEl) winnerEl.hidden = !who;
    if (card) {
      card.classList.toggle("has-answer", !!body);
      /* A relocated verdict is prose, not a headline -- let CSS set it at a
         readable body size instead of the short-answer display size. */
      card.classList.toggle("is-verdict", !!verdict);
    }

    /* Hide the now-duplicated copy in the clock column so the clock card
       keeps its design height. */
    if (cd) cd.classList.toggle("is-relocated", !!verdict);
  }

  function start() {
    scorebar   = document.querySelector(".tsd-scorebar");
    card       = document.getElementById("resultCard");
    answerEl   = document.getElementById("resultAnswer");
    winnerEl   = document.getElementById("resultWinner");
    winnerName = document.getElementById("resultWinnerName");
    titleEl    = document.getElementById("resultTitle");
    if (!scorebar || !card) return;

    /* cp.gameType changes when a round loads, and there is no event for it.
       Watch the nodes the round render touches and re-check on each. */
    var watched = [document.getElementById("qBox"),
                   document.getElementById("centerDisplay"),
                   document.getElementById("gameInsrtPt")];

    var mo = new MutationObserver(refresh);
    for (var i = 0; i < watched.length; i++) {
      if (watched[i]) {
        mo.observe(watched[i], {
          childList: true, subtree: true, characterData: true
        });
      }
    }
    refresh();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
