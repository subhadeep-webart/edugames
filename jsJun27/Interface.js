class Interface {

    constructor(cp) {
        this.cp = cp;

        // --- UI State ---
        this.nowPlaying = 0;
        this.theOtherSide = 1;
        this.playInProgress = false;
        this.secondPlay = false;
        this.failedPlayCount = 3;
        this.runningPtCount = 100;
        this.bonusPts = 0;

        // --- DOM References (assigned in init) ---
        this.centerDisplay = null;
        this.qBox = null;
        this.timeBox = null;

        // --- Internal ---
        this.timeFactor = 1;
        this.playAreaIsSetUp = false;
    }

    // ------------------------------------------------------------
    // INITIALIZATION
    // ------------------------------------------------------------
    init() {
        this.centerDisplay = document.getElementById("centerDisplay");
        this.qBox = document.getElementById("qBox");
        this.timeBox = document.getElementById("timeBox");
    }

    // ------------------------------------------------------------
    // BASIC UI HELPERS
    // ------------------------------------------------------------
    setcenterDisplay(txt) {
        if (this.centerDisplay) {
            this.centerDisplay.textContent = txt;
        }
    }

    postNotice(txt) {
        if (this.centerDisplay) {
            this.centerDisplay.innerHTML = txt;
        }
    }

    setQuestion(txt) {
        if (this.qBox) {
            this.qBox.textContent = txt;
        }
    }

    addToQuestion(txt) {
        if (this.qBox) {
            this.qBox.textContent += "\n" + txt;
        }
    }

    showAnswer(ans) {
        if (this.qBox) {
            this.qBox.textContent += "\nThe answer is: " + ans;
        }
    }

    blankTimeBox() {
        if (this.timeBox) {
            this.timeBox.value = "";
        }
    }

    // ------------------------------------------------------------
    // PLAYER FLOW
    // ------------------------------------------------------------
    changePlayers() {
        this.nowPlaying = (this.nowPlaying === 0 ? 1 : 0);
        this.theOtherSide = (this.nowPlaying === 0 ? 1 : 0);
    }

    goToNextPlayer() {
        this.changePlayers();
    }

    setPlayerUp(nbr) {
        this.nowPlaying = nbr;
        this.theOtherSide = (nbr === 0 ? 1 : 0);

        const name = plu.players[nbr].name;
        const color = plu.players[nbr].color;

        postNoticeCenterDisplay(`24,${color},${name}: Select an Answer`);
    }

    // ------------------------------------------------------------
    // POINTS & SCORING DISPLAY
    // ------------------------------------------------------------
    setRunningPoints(n) {
        this.runningPtCount = n;
    }

    reduceThePts(inc) {
        this.runningPtCount -= inc;
        postNoticeCenterDisplay(`36,white,Points = ${this.runningPtCount.toFixed(0)}`);
    }

    clearRndScores() {
        plu.clearRndScores();
    }

    updateScoreBoards() {
        setTotL.textContent = "Set Total = " + plu.players[0].getSetScore().toFixed(0);
        setTotR.textContent = "Set Total = " + plu.players[1].getSetScore().toFixed(0);
        rndTotL.textContent = plu.players[0].getRndScore().toFixed(0);
        rndTotR.textContent = plu.players[1].getRndScore().toFixed(0);
    }

    // ------------------------------------------------------------
    // ROUND RESULTS
    // ------------------------------------------------------------
    displayResultsOfPlay(player, pts, passfail) {
        const p = Number(player);
        const name = plu.players[p].name;
        const color = plu.players[p].color;

        let msg = "";

        if (passfail === "p") {
            msg = `${name} gets ${pts.toFixed(0)} Points`;
            if (this.bonusPts > 0) {
                msg += ` plus ${this.bonusPts} Bonus`;
            }
        } else {
            const other = (p === 0 ? 1 : 0);
            msg = `${plu.players[other].name} failed. ${name} gets ${pts.toFixed(0)} Points.`;
        }

        postNoticeCenterDisplay(`24,${color},${msg}`);
    }

    setTieResults(pts, ratio) {
        const award = Number(pts) * ratio;
        plu.addToScore(0, award / 2);
        plu.addToScore(1, award / 2);
        this.updateScoreBoards();
        postNotice("There is a tie and the point award is split.");
    }

    // ------------------------------------------------------------
    // ROUND FLOW
    // ------------------------------------------------------------
    startPlay() {
        this.playInProgress = true;
        this.clearRndScores();

        if (bidButs.whoHasBid === "Blue") {
            this.nowPlaying = 0;
            this.theOtherSide = 1;
            postNoticeCenterDisplay(`24,Blue,BLUE Has the PLAY with ${bidButs.topBid}`);
        } else {
            this.nowPlaying = 1;
            this.theOtherSide = 0;
            postNoticeCenterDisplay(`24,Red,RED Has the PLAY with ${bidButs.topBid}`);
        }

        const type = this.cp.itfType;

        if (type === "B") {
            this.cp.theGameInPlay.startPlay(bidButs.topBid);
        } else if (type === "D") {
            this.cp.theGameInPlay.startPlay();
        } else if (type === "I") {
            this.cp.theGameInPlay.startPlay(bidButs.topBid);
        }
    }

    endPlay() {
        this.playInProgress = false;
    }

    timesUpXX(timeFactor) {
        this.timeFactor = timeFactor;
        this.playInProgress = false;
        this.cp.theGameInPlay.checkPlay("itf.timesUp");
    }

    // ------------------------------------------------------------
    // CLEANUP
    // ------------------------------------------------------------
    cleanPlayArea() {
        this.removeAllButtons();
        bidButs.deletePtTbl();

        if (this.cp.theGameInPlay) {
            this.cp.theGameInPlay.cleanPlayArea();
        }

        this.setQuestion("");
        postNoticeCenterDisplay("18,white,---");
        this.clearRndScores();
    }

    removeAllButtons() {
        const left = document.getElementById("insrtpt0X");
        const right = document.getElementById("insrtpt1X");

        if (left) left.innerHTML = "";
        if (right) right.innerHTML = "";
    }

    // ------------------------------------------------------------
    // PLAY AREA SETUP
    // ------------------------------------------------------------
    setUpPlayArea() {
        if (!this.playAreaIsSetUp) {
            hideCheckBut();
            disableAnsBut();
            disableNextRndBut();
            this.playAreaIsSetUp = true;
        }
    }

    // ------------------------------------------------------------
    // MISC
    // ------------------------------------------------------------
    isPlayInProgress() {
        return this.playInProgress;
    }

}
