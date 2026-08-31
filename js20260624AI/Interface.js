// Interface.js — modern, GameContext‑driven version

class Interface {
    constructor(context) {
        this.context = context;

        // Core play state
        this.playInProgress = false;
        this.secondPlay = false;
        this.gameOver = false;
        this.failedPlayCount = 3;

        // Player state
        this.nowPlaying = 0;      // 0 = left/blue, 1 = right/red
        this.theOtherSide = 1;

        // Scoring state
        this.runningPtCount = 100;
        this.pointsThisPlay = 0;
        this.bonusPts = 0;
        this.timeFactor = 0;

        // Misc
        this.LogThePlay = true;
        this.exp = null;          // Explain instance
    }

    // ------------------------------------------------------------
    // DOM registration
    // ------------------------------------------------------------

    registerDOM() {
        // Expect these to be wired by GameContext at startup
        this.centerDisplay = this.context.ui.centerDisplay;
        this.qBox = this.context.ui.qBox;
        this.timeBox = this.context.ui.timeBox;
        this.setTotL = this.context.ui.setTotL;
        this.setTotR = this.context.ui.setTotR;
        this.rndTotL = this.context.ui.rndTotL;
        this.rndTotR = this.context.ui.rndTotR;
        this.nextRoundBut = this.context.ui.nextRoundBut;
        this.ansBut = this.context.ui.ansBut;
        this.stopClockButton = this.context.ui.stopClockButton;
        this.ptsThisPlayDoc = this.context.ui.ptsThisPlayDoc;

        this.exp = new Explain();
    }

    // ------------------------------------------------------------
    // Core play flow
    // ------------------------------------------------------------

    startPlay() {
        this.playInProgress = true;
        this.clearRndScores();

        const bidButs = this.context.ui.bidButs;
        if (!bidButs) return;

        if (bidButs.whoHasBid === "Blue") {
            this.pNbr = 0;
            this.theOtherSide = 1;
            this.postNoticeCenterDisplay(
                "24,Blue,BLUE Has the PLAY with " + bidButs.topBid
            );
        } else {
            this.pNbr = 1;
            this.theOtherSide = 0;
            this.postNoticeCenterDisplay(
                "24,Red,RED Has the PLAY with " + bidButs.topBid
            );
        }

        this.nowPlaying = this.pNbr;

        switch (GameContext.itfType) {
            case "B":
                this.gameTypeBStartPlay();
                break;
            case "D":
                this.context.game.startPlay();
                break;
            case "I":
                this.gameTypeIStartPlay();
                break;
        }
    }

    gameTypeBStartPlay() {
        const bidButs = this.context.ui.bidButs;
        this.pointsThisPlay = bidButs.getPointsForThisPlay(bidButs.topBid);
        this.playStartVoiceForB(this.pNbr);
        this.startPlayTimer();
    }

    gameTypeIStartPlay() {
        // Placeholder for type I start logic
    }

    startPlayTimer() {
        if (this.context.state.pauseGame) return;

        const bidButs = this.context.ui.bidButs;
        const time = bidButs.getTime(this.pNbr, bidButs.topBid);

        this.context.ui.clock.set(time);   // your clock wrapper
        this.context.ui.clock.start();
    }

    stopPlayTimer() {
        if (this.context.ui.clock) {
            this.context.ui.clock.stop();
        }
    }

    endPlay() {
        this.playInProgress = false;
        if (this.context.game && this.context.game.endPlay) {
            this.context.game.endPlay();
        }
    }

    // ------------------------------------------------------------
    // Scoring and results
    // ------------------------------------------------------------

    setTimeBonusPts(timeFac) {
        this.timeFactor = timeFac;
    }

    setRunningPoints(n) {
        this.runningPtCount = n;
    }

    reduceThePts(inc) {
        this.runningPtCount -= inc;
        this.postNoticeCenterDisplay(
            "36,white,Points = " + this.runningPtCount.toFixed(0)
        );
    }

    displayPtsThisPlay(passFail, results) {
        const plu = this.context.playerLineUp;
        const bidButs = this.context.ui.bidButs;

        this.postNoticeCenterDisplay("16,white," + results);

        if (this.context.game === this.context.games.gameI) {
            if (this.context.mode.singlePlayer) {
                if (results === "You Gave Up") {
                    this.pointsThisPlay = 0;
                } else {
                    if (passFail === "passed") {
                        this.pointsThisPlay = this.runningPtCount;
                    } else {
                        this.pointsThisPlay = 10;
                    }
                }
            } else {
                this.pointsThisPlay = this.runningPtCount;
            }
        }

        this.bonusPts = Math.round(this.pointsThisPlay * this.timeFactor);
        if (isNaN(this.bonusPts)) this.bonusPts = 0;

        const totalPts = this.pointsThisPlay + this.bonusPts;

        if (passFail === "passed") {
            if (this.timeBox) {
                this.timeBox.value = "Bonus = " + this.bonusPts.toFixed(0);
            }
            this.winner = this.nowPlaying;
            this.awardPoints(this.nowPlaying, totalPts, results);
            this.displayResultsOfPlay(this.nowPlaying, this.pointsThisPlay, "p");
            this.looser = this.theOtherSide;
            if (!this.context.mode.singlePlayer) {
                this.playAudioThisPlay(this.nowPlaying, true);
            }
        } else {
            this.failedPlayCount--;
            this.looser = this.pNbr;
            if (this.context.mode.singlePlayer) {
                this.winner = 0;
                this.awardPoints(this.winner, -this.pointsThisPlay, results);
                this.playWrong();
            } else {
                this.awardPoints(this.theOtherSide, this.pointsThisPlay, results);
                this.displayResultsOfPlay(this.theOtherSide, this.pointsThisPlay, "f");
                this.playAudioThisPlay(this.nowPlaying, false);
            }
        }

        this.updateScoreBoards();

        if (GameContext.itfType === "B" && bidButs) {
            bidButs.restartBidding();
        }

        if (this.LogThePlay) {
            const playDetails = this.context.game.getPlayDetails();
            plu.logPlay(
                this.nowPlaying,
                passFail,
                Math.round(this.pointsThisPlay),
                Math.round(this.bonusPts),
                playDetails
            );
        }
    }

    awardPoints(pNbr, pts, results) {
        const plu = this.context.playerLineUp;

        if (this.context.mode.singlePlayer && pNbr === 1) return;

        const ptAwd = Number(pts);

        if (this.context.mode.singlePlayer) {
            plu.players[pNbr].clearRndScore();
        }

        plu.players[pNbr].addToRndScore(ptAwd);
        plu.players[pNbr].addToSetScore(ptAwd);

        this.displayResultsOfPlay(pNbr, pts, "P");
        this.updateScoreBoards();

        this.postNoticeCenterDisplay(
            "16," + plu.players[pNbr].color + "," + results
        );
    }

    displayResultsOfPlay(player, pts, passfail) {
        const plu = this.context.playerLineUp;
        this.playInProgress = false;

        let winLoseBuf = "";

        if (passfail === "p") {
            winLoseBuf += "Winner is ";
        } else {
            winLoseBuf += "Sorry! ";
            const other = player === 0 ? 1 : 0;
            winLoseBuf += plu.players[other].name + " failed and ";
        }

        winLoseBuf += plu.players[player].name;

        winLoseBuf += " gets " + pts.toFixed(0);
        winLoseBuf += (pts === 1) ? " Point" : " Points";

        if (passfail === "p" && this.bonusPts > 0) {
            winLoseBuf += " plus " + this.bonusPts;
            winLoseBuf += (this.bonusPts === 1) ? " bonus Point" : " bonus Points";
        }

        this.postNoticeCenterDisplay(
            "24," + plu.players[player].color + "," + winLoseBuf
        );
    }

    setTieResults(pts, ratio) {
        const plu = this.context.playerLineUp;
        const thePtAwd = Number(pts) * ratio;

        this.postNotice("There is a tie and the point award is split.");
        plu.addToScore(0, thePtAwd / 2);
        plu.addToScore(1, thePtAwd / 2);
        this.updateScoreBoards();
    }

    updateScoreBoards() {
        const plu = this.context.playerLineUp;

        const p0r = plu.players[0].getRndScore();
        const p1r = plu.players[1].getRndScore();
        const p0s = plu.players[0].getSetScore();
        const p1s = plu.players[1].getSetScore();

        if (this.setTotL) {
            this.setTotL.textContent = "Set Total = " + p0s.toFixed(0);
        }
        if (this.rndTotL) {
            this.rndTotL.textContent = p0r.toFixed(0);
        }
        if (this.setTotR) {
            this.setTotR.textContent = "Set Total = " + p1s.toFixed(0);
        }
        if (this.rndTotR) {
            this.rndTotR.textContent = p1r.toFixed(0);
        }
    }

    clearRndScores() {
        const plu = this.context.playerLineUp;
        plu.clearRndScores();
    }

    // ------------------------------------------------------------
    // Player switching
    // ------------------------------------------------------------

    changePlayers() {
        this.nowPlaying = this.nowPlaying === 0 ? 1 : 0;
    }

    goToNextPlayer() {
        this.changePlayers();
    }

    setPlayerUp(nbr) {
        const plu = this.context.playerLineUp;
        this.nowPlaying = nbr;
        this.theOtherSide = nbr === 0 ? 1 : 0;

        const player = plu.players[nbr];
        this.postNoticeCenterDisplay(
            "24," + player.color + "," + player.name + ": Select an Answer"
        );
    }

    setOtherPlayer() {
        if (this.secondPlay) {
            this.context.game.checkPlay("setOtherPlayer");
        } else {
            this.changePlayers();
            this.secondPlay = true;
        }
    }

    // ------------------------------------------------------------
    // Audio
    // ------------------------------------------------------------

    playStartVoiceForB(pNbr) {
        let voiceBuf = "Audio/";
        voiceBuf += (pNbr === 0) ? "Blue" : "Red";
        voiceBuf += this.context.ui.bidButs.topBid + ".wav";
        new Audio(voiceBuf).play();
    }

    playStartVoiceForD(pNbr) {
        this.nowPlaying = pNbr;
        this.theOtherSide = (pNbr === 0) ? 1 : 0;

        let voiceBuf = "Audio/";
        voiceBuf += (pNbr === 0) ? "Blue" : "Red";
        voiceBuf += "GoingFirst.wav";
        new Audio(voiceBuf).play();
    }

    playWrong() {
        new Audio("Audio/Wrong.mp3").play();
    }

    playWinner(pNbr) {
        let buf = "Audio/";
        buf += (pNbr === 0) ? "BlueWon.wav" : "RedWon.wav";
        new Audio(buf).play();
    }

    playAudioThisPlay(pNbr, passed) {
        let buf = "Audio/";
        buf += (pNbr === 0) ? "Blue" : "Red";
        buf += passed ? "Wins" : "Fails";
        buf += "Play.wav";
        new Audio(buf).play();
    }

    // ------------------------------------------------------------
    // Question / display helpers
    // ------------------------------------------------------------

    setQuestion(theQuestion) {
        if (this.qBox) this.qBox.textContent = theQuestion;
    }

    showAnswer(theAns) {
        if (!this.qBox) return;
        let buf = this.qBox.textContent;
        buf += " The answer is: " + theAns;
        this.qBox.textContent = buf;
    }

    addToQuestion(txt) {
        if (!this.qBox) return;
        const org = this.qBox.textContent;
        this.qBox.textContent = org + "\n" + txt;
    }

    postNotice(txt) {
        if (this.centerDisplay) this.centerDisplay.innerHTML = txt;
    }

    postNoticeCenterDisplay(spec) {
        // spec: "size,color,text"
        if (!this.centerDisplay) return;
        const parts = spec.split(",");
        const size = parts[0];
        const color = parts[1];
        const text = parts.slice(2).join(",");
        this.centerDisplay.style.fontSize = size + "px";
        this.centerDisplay.style.color = color;
        this.centerDisplay.textContent = text;
    }

    setcenterDisplay(txt) {
        if (this.centerDisplay) this.centerDisplay.textContent = txt;
    }

    // ------------------------------------------------------------
    // Play area / round flow
    // ------------------------------------------------------------

    setUpPlayArea() {
        if (this.playAreaIsSetUp) return;
        this.playAreaIsSetUp = true;

        if (this.centerDisplay) {
            const self = this;
            this.centerDisplay.addEventListener("click", function () {
                self.postNotice("XXX");
            });
        }

        if (this.context.ui.hideCheckBut) this.context.ui.hideCheckBut();
        if (this.context.ui.disableAnsBut) this.context.ui.disableAnsBut();
        if (this.context.ui.disableNextRndBut) this.context.ui.disableNextRndBut();
    }

    displayNxtRndBut() {
        if (this.nextRoundBut) this.nextRoundBut.style.display = "block";
        if (this.ansBut) this.ansBut.style.display = "block";
    }

    cleanPlayArea() {
        const bidButs = this.context.ui.bidButs;

        if (bidButs) bidButs.deletePtTbl();
        if (this.context.game && this.context.game.cleanPlayArea) {
            this.context.game.cleanPlayArea();
        }
        if (this.ptsThisPlayDoc) this.ptsThisPlayDoc.textContent = "";
        this.setQuestion("");
        this.postNoticeCenterDisplay("18,white,---");
        this.clearRndScores();
    }

    setFailedPlayCount(nbr) {
        this.failedPlayCount = nbr;
    }

    isPlayInProgress() {
        return this.playInProgress;
    }

    blankTimeBox() {
        if (this.timeBox) this.timeBox.value = "";
    }

    setClockButtonText(txt) {
        if (this.stopClockButton) this.stopClockButton.value = txt;
    }

    timesUp(timeFactor) {
        this.timeFactor = timeFactor;
        this.playInProgress = false;
        if (this.context.game && this.context.game.checkPlay) {
            this.context.game.checkPlay("itf.timesUp");
        }
    }
}
