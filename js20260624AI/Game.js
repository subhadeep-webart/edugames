class Game {

    constructor(round, context) {//this.context.plu.players
        console.log("Game top");

        this.context = context;
        this.round = round;

        // ⭐ FIX: normalize the property name
        // Some older code expects context.plu, some expects context.playerLineUp.
        // We guarantee BOTH exist.
        if (!this.context.plu && this.context.playerLineUp) {
            this.context.plu = this.context.playerLineUp;
        }
        if (!this.context.playerLineUp && this.context.plu) {
            this.context.playerLineUp = this.context.plu;
        }

        console.log("Game context == null = " + (this.context == null));
        console.log("Game context.plu == null = " + (this.context.plu == null));
        console.log("Game context.playerLineUp == null = " + (this.context.playerLineUp == null));


        this.round = round;
        this.context = context;

        this.typeGame = "";
        this.question = "";
        this.pNbr = 0;

        this.gameDataArray = [];
        this.gameInputArray = [];
        this.pictureFileArray = [];
        this.parmMap = null;

        this.ptAwd = 100;
        this.ptAwdInc = 2;

        this.rows = 0;
        this.cols = 0;

        this.gameInPlay = false;
        this.gameType = "Z";

        this.nbrOfInsrtPts = 0;
        this.nbrOfButs = 0;

        this.insrtIdArray = [];
        this.gameName = "game";
        this.gameLtr = "X";

        this.playIsOver = false;
        this.failCount = 0;
        this.failedPlayCount = 3;
        this.roundIsOver = false;

        this.textDisplayed = [];
        this.nextPlayerName = "";
        this.whoHasPlayNbr = 0;

        this.playDetails = [];
        this.nbrFirstUp = 0;
        this.nbrSecondUp = 1;

        this.colorFirstUp = "";
        this.colorSecondUp = "";
        this.nameFirstUp = "";
        this.nameSecondUp = "";

        this.dataForThisGame = "";
        this.time = [];

        this.pointsForThisRound = 100;

        this.tfPlayerName = null;
    }

    /* ---------------------------------------------------------
       INITIALIZATION
    --------------------------------------------------------- */

    init() {
        if (this.context.theGameInPlay != null) {
            this.context.theGameInPlay.cleanPlayArea();
        }

        this.context.ui.hideAnswerBox();
        this.gameInPlay = true;

        this.gameDataArray = this.round.getRoundDataArr();
        this.question = this.round.getTheQuestion();

        this.context.ui.setQuestion(this.question);

        this.setDocs();

        this.rows = this.round.getAParm("Rows");
        this.cols = this.round.getAParm("Cols");
    }

    setDocs() {
        this.tfPlayerName = document.getElementById("playerName");
    }

    /* ---------------------------------------------------------
       CLEANUP
    --------------------------------------------------------- */

    cleanPlayArea() {
        this.playIsOver = true;

        this.context.ui.blankNotice();
        this.context.ui.showGameArea();
        this.context.ui.stopPanelRemoval();
        this.context.ui.disableAnswerButton();
        this.context.ui.disableNextRoundButton();
        this.context.ui.hideButtonGroup();
        this.context.ui.hideCheckButton();

        this.context.ui.gamePlayArea.innerHTML = "";
    }

    /* ---------------------------------------------------------
       QUESTION + ANSWER BAR
    --------------------------------------------------------- */

    addAnswerToQuestionBar(ans) {
        this.context.ui.addToQuestion("--The Answer is " + ans);
    }

    showAnswerInQuestionBar(ans) {
        this.context.ui.setQuestion(
            "The Question was: " + this.question + " — The Answer is " + ans
        );
    }

    /* ---------------------------------------------------------
       PLAYER TURN LOGIC
    --------------------------------------------------------- */

    showNextPlayerNotice(nextPlayerName) {
        console.log("Game showNextPlayerNotice " + nextPlayerName);//    console.log(" =" + );
        let buf = `  
<div style="text-align:center; font-size:48px;">OK</div>
<div style="text-align:center; font-size:48px;" id="nextPlayerName" >${nextPlayerName}</div>
<div style="text-align:center; font-size:48px;">It's your Turn Now!</div>
</br><div style="text-align:center; font-size:24px;">
<input type="button" id="nextPlayerBut" style="text-align:center; font-size:24px;"  value="CONTINUE"></div>
`;

        gamePlayArea.style.display = "none";
        insrtPtB.innerHTML = buf;
        insrtPtB.style.display = "block"
        qBox.style.display = 'none';

        
        var nextPlayerBut = document.getElementById("nextPlayerBut");
        if (nextPlayerBut) {
            nextPlayerBut.addEventListener("click", function () {
                console.log("nextPlayerBut clicked");

                const game = GameContext.controlPanel.theGameInPlay;
                if (game && game.startGame) {
                    game.nextPlayer();
                }
            });
        }
       


    }

    //<input type="button" id="startRoundBut" value="Start Round">

pickWhoGoesFirst() {

    console.log("pickWhoGoesFirst TOP");

        console.log("pickWhoGoesFirst() this.context.plu == null = " + (this.context.plu == null));

        console.log("pickWhoGoesFirst() this.context.plu.players == null = " + (this.context.plu.players == null))

    const ctx = this.context;

    // -------------------------------------------------------
    // 1. Validate that playerLineUp exists
    // -------------------------------------------------------
    if (!ctx.playerLineUp) {
        console.error("pickWhoGoesFirst ERROR: context.playerLineUp is NULL");
        return;
    }

    // -------------------------------------------------------
    // 2. Validate that players exist inside the lineup
    // -------------------------------------------------------
    const plu = ctx.playerLineUp;

    if (!plu.players) {
        console.error("pickWhoGoesFirst ERROR: playerLineUp.players is NULL");
        return;
    }

    const left = plu.players.left;
    const right = plu.players.right;

    if (!left || !right) {
        console.error("pickWhoGoesFirst ERROR: left or right player missing", left, right);
        return;
    }

    console.log("pickWhoGoesFirst players:", left.name, right.name);

    // -------------------------------------------------------
    // 3. Your original logic (example: random choice)
    // -------------------------------------------------------
    let who = Math.random() < 0.5 ? "left" : "right";

    console.log("pickWhoGoesFirst: winner =", who);

    // -------------------------------------------------------
    // 4. Store result in context
    // -------------------------------------------------------
    ctx.state.currentPlayer = who;
}


    nextPlayer() {
        this.whoHasPlayNbr = this.getOtherPlayer(this.whoHasPlayNbr);

        this.context.ui.gamePlayArea.style.display = "block";
        this.context.ui.insrtPtB.style.display = "none";
        this.context.ui.qBox.style.display = "block";

        var arr = [18, this.colorSecondUp, this.nameSecondUp + " Now Playing"];
        this.context.ui.postNoticeCenter(arr);

        var snd = null;
        if (this.nbrFirstUp === 0) {
            snd = new Audio("Audio/RedsTurn.wav");
        } else {
            snd = new Audio("Audio/BluesTurn.wav");
        }
        snd.play();
    }

    getOtherPlayer(n) {
        return n === 0 ? 1 : 0;
    }

    /* ---------------------------------------------------------
       TEXT LENGTH + TIMING
    --------------------------------------------------------- */

    getTextHiLength() {
        var hi = 0;

        for (var i = 0; i < this.textDisplayed.length; i++) {
            var s = this.textDisplayed[i];
            if (s.length > hi) {
                hi = s.length;
            }
        }

        return hi;
    }

    getTimeAdjust() {
        var hi = this.getTextHiLength();
        return hi / 25;
    }

    /* ---------------------------------------------------------
       POINT FACTOR
    --------------------------------------------------------- */

    startPtFacInc() {
        this.context.ui.startIncreasingPointFactor(1.0, 0.05, 2);
    }

    changePlayersXX() {
        var fac = Number(document.getElementById("ptFac").innerHTML);
        this.context.ui.startDecreasingPointFactor(fac, 0.025, 0);
    }

    /* ---------------------------------------------------------
       ROUND + GAME END
    --------------------------------------------------------- */

    roundOver() {
        this.roundIsOver = true;
    }

    gameOver() {
        this.playIsOver = true;
    }

    endPlay() {
        this.playIsOver = true;
    }

    /* ---------------------------------------------------------
       UTILITY
    --------------------------------------------------------- */

    toString() {
        return this.gameName;
    }

}
