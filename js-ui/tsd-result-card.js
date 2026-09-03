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

  /* Blue = player 0 = left, red = player 1 = right. */
  function winnerFromCenterDisplay() {
    var cd = document.getElementById("centerDisplay");
    if (!cd) return "";
    var txt = (cd.textContent || "").trim();
    var p0 = document.getElementById("player0");
    var p1 = document.getElementById("player1");
    var n0 = p0 ? p0.textContent.trim() : "";
    var n1 = p1 ? p1.textContent.trim() : "";
    if (n0 && n0 !== "--" && txt.indexOf(n0) !== -1) return n0;
    if (n1 && n1 !== "--" && txt.indexOf(n1) !== -1) return n1;
    return "";
  }

  function refresh() {
    if (!scorebar) return;

    var show = isNoBidRound();
    scorebar.classList.toggle("is-result", show);
    if (!show) return;

    var ans = answerFromQBox();
    var who = winnerFromCenterDisplay();

    if (answerEl) answerEl.textContent = ans;
    if (titleEl)  titleEl.textContent = ans ? "Correct Answer:" : "Round in play";
    if (winnerName) winnerName.textContent = who;
    if (winnerEl) winnerEl.hidden = !who;
    if (card) card.classList.toggle("has-answer", !!ans);
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
