// ===========================================================
// GameContext.js
// Centralized context for TriviaSmackdown
// ===========================================================

const GameContext = {

    // -------------------------------------------------------
    // UI ELEMENT REFERENCES (MATCHES CLEANED GAMEPANEL)
    // -------------------------------------------------------
    ui: {

        // Notice + Help
        noticeA: document.getElementById("noticeA"),
        helpInsrtPt: document.getElementById("helpInsrtPt"),
        ptAndTimeInsrtPt: document.getElementById("ptAndTimeInsrtPt"),

        // Left player
        insrtpt0X: document.getElementById("insrtpt0X"),
        insrtpt0Y: document.getElementById("insrtpt0Y"),
        player0: document.getElementById("player0"),
        rndTotL: document.getElementById("rndTotL"),
        setTotL: document.getElementById("setTotL"),

        // Right player
        insrtpt1X: document.getElementById("insrtpt1X"),
        insrtpt1Y: document.getElementById("insrtpt1Y"),
        player1: document.getElementById("player1"),
        rndTotR: document.getElementById("rndTotR"),
        setTotR: document.getElementById("setTotR"),

        // Center controls
        centerDisplay: document.getElementById("centerDisplay"),
        helpDropDownMenu: document.getElementById("helpDropDownMenu"),
        ansBut: document.getElementById("ansBut"),
        nextRoundBut: document.getElementById("nextRoundBut"),
        checkBut: document.getElementById("checkBut"),
        timeBox: document.getElementById("timeBox"),

        // Challenge + answer bar
        qBox: document.getElementById("qBox"),
        ansBar: document.getElementById("ansBar"),

        // Game insert areas
        gameInsrtPt: document.getElementById("gameInsrtPt"),
        imageInsertPt: document.getElementById("imageInsertPt"),
        gameLInsrtPtA: document.getElementById("gameLInsrtPtA"),
        gamePlayArea: document.getElementById("gamePlayArea"),
        insrtPtA: document.getElementById("insrtPtA"),
        insrtPtB: document.getElementById("insrtPtB"),


        // Answer box
        ansBox: document.getElementById("ansBox"),

        // Convenience helpers
        show(el) { if (el) el.style.display = "block" },
        hide(el) { if (el) el.style.display = "none" },
        clear(el) { if (el) el.innerHTML = "" },

        setText(el, txt) { if (el) el.textContent = txt },
        appendText(el, txt) { if (el) el.textContent += txt },

        // ============================================================
        // UI HELPERS — Modern replacements for all old global UI funcs
        // ============================================================

        // --- Basic show/hide helpers ---
        show(el) { if (el) el.style.display = "block"; },
        hide(el) { if (el) el.style.display = "none"; },

        // --- Notice A (ALREADY SELECTED!) ---
        showNoticeA(txt = "ALREADY SELECTED!") {
            if (!this.noticeA) return;
            this.noticeA.textContent = txt;
            this.noticeA.style.display = "block";
            setTimeout(() => { this.noticeA.style.display = "none"; }, 1500);
        },
        hideNoticeA() {
            if (this.noticeA) this.noticeA.style.display = "none";
        },

        // --- Center display text ---
        setCenter(txt) {
            if (this.centerDisplay) this.centerDisplay.textContent = txt;
        },
        clearCenter() {
            if (this.centerDisplay) this.centerDisplay.textContent = "";
        },

        // --- Challenge text ---
        setQuestion(txt) {
            if (this.qBox) this.qBox.textContent = txt;
        },

        

        // --- Check button ---
        showCheckBut() {
            if (this.checkBut) this.checkBut.style.display = "block";
        },
        hideCheckBut() {
            if (this.checkBut) this.checkBut.style.display = "none";
        },

        // --- Next Round button ---
        enableNextRndBut() {
            if (this.nextRoundBut) this.nextRoundBut.disabled = false;
        },
        disableNextRndBut() {
            if (this.nextRoundBut) this.nextRoundBut.disabled = true;
        },

        // --- Answers button ---
        showAnsBut() {
            if (this.ansBut) {
                this.ansBut.style.display = "block";
                this.ansBut.style.visibility = "visible";
            }
        },
        hideAnsBut() {
            if (this.ansBut) {
                this.ansBut.style.display = "none";
                this.ansBut.style.visibility = "hidden";
            }
        },

        // --- Game area ---
        showGameArea() {
            if (this.gamePlayArea) {
                this.gamePlayArea.style.display = "block";
                this.gamePlayArea.style.visibility = "visible";
            }
        },
        hideGameArea() {
            if (this.gamePlayArea) {
                this.gamePlayArea.style.display = "none";
                this.gamePlayArea.style.visibility = "hidden";
            }
        },

        // --- Add text to qBox (old addTxtToABox) ---
        appendToQuestion(txt) {
            if (this.qBox) this.qBox.innerHTML += txt;
        },

        // --- Beep sound ---
        playBeep() {
            try {
                const audio = new Audio("sounds/beep.mp3");
                audio.play();
            } catch (e) {
                console.warn("Beep failed:", e);
            }
        },

        // --- Clear insert points ---
        clearGameArea() {
            if (this.gameInsrtPt) this.gameInsrtPt.innerHTML = "";
            if (this.imageInsertPt) this.imageInsertPt.innerHTML = "";
            if (this.gameLInsrtPtA) this.gameLInsrtPtA.innerHTML = "";
        },

        // --- Set up game area (old setUpGameArea) ---
        setUpGameArea() {
            this.disableNextRndBut();
            this.hideCheckBut();
            this.hideAnswerBox();
        },

        // --- Post a notice in center display ---
        postNoticeCenterDisplay(txt) {
            if (this.centerDisplay) this.centerDisplay.textContent = txt;
        },
        blankNotice() {
            if (this.centerDisplay) this.centerDisplay.textContent = "";
        },



        //******* */

        // Answer bar helpers

        showAnswerBar() {
            if (this.ansBar) {
                this.ansBar.style.display = "block";
                this.ansBar.style.visibility = "visible";
            }
        },

        hideAnswerBar() {
            if (this.ansBar) {
                this.ansBar.style.display = "none";
                this.ansBar.style.visibility = "hidden";
            }
        },

        // Answer text box helpers
        showAnswerBox() {
            if (this.ansBox) {
                this.ansBox.style.display = "block";
                this.ansBox.style.visibility = "visible";
            }
            if (this.ansBoxDiv) {
                this.ansBoxDiv.style.display = "block";
                this.ansBoxDiv.style.visibility = "visible";
            }
        },

        hideAnswerBox() {
            if (this.ansBox) {
                this.ansBox.style.display = "none";
                this.ansBox.style.visibility = "hidden";
            }
            if (this.ansBoxDiv) {
                this.ansBoxDiv.style.display = "none";
                this.ansBoxDiv.style.visibility = "hidden";
            }
        },

        //The question

        setQuestion(theQuestion) {
            this.qBox.textContent = theQuestion;
        },

    },

    // -------------------------------------------------------
    // GAME STATE
    // -------------------------------------------------------
    state: {
        gameInPlay: false,
        biddingInProgress: false,
        secondsRemaining: 0
    },

    // -------------------------------------------------------
    // PLAYER DATA
    // -------------------------------------------------------
    players: {
        left: {
            name: "--",
            roundTotal: 0,
            setTotal: 0
        },
        right: {
            name: "--",
            roundTotal: 0,
            setTotal: 0
        }
    },

    // -------------------------------------------------------
    // INTERFACE FUNCTIONS (MATCHES YOUR OLD cp.itf)
    // -------------------------------------------------------
    itf: {
        nowPlaying: 0,
        playInProgress: false,
        secondPlay: false,
        theOtherSide: 0,

        displayPtsThisPlay(pf, msg) {
            console.log("Points this play:", pf, msg);
        },

        changePlayers() {
            this.nowPlaying = this.nowPlaying === 0 ? 1 : 0;
        },

        setOtherPlayer() {
            if (this.secondPlay) {
                GameContext.controlPanel.theGameInPlay.checkPlay("setOtherPlayer");
            } else {
                this.nowPlaying = this.nowPlaying === 0 ? 1 : 0;
                this.secondPlay = true;
            }
        },

        setFailedPlayCount(nbr) {
            this.failedPlayCount = nbr;
        },

        setcenterDisplay(txt) {
            if (GameContext.ui.centerDisplay)
                GameContext.ui.centerDisplay.textContent = txt;
        },

        postNotice(txt) {
            if (GameContext.ui.noticeBox)
                GameContext.ui.noticeBox.textContent = txt;
        },

        postNoticeCenterDisplay(txt) {
            if (GameContext.ui.centerDisplay)
                GameContext.ui.centerDisplay.textContent = txt;
        },

        clearRndScores() {
            if (GameContext.ui.rndScores)
                GameContext.ui.rndScores.textContent = "";
        },

        setQuestion(txt) {
            if (GameContext.ui.questionBox)
                GameContext.ui.questionBox.textContent = txt;
        },

        cleanPlayArea() {
            if (GameContext.ui.bidButs)
                GameContext.ui.bidButs.deletePtTbl();

            if (GameContext.controlPanel.theGameInPlay &&
                GameContext.controlPanel.theGameInPlay.cleanPlayArea) {
                GameContext.controlPanel.theGameInPlay.cleanPlayArea();
            }

            if (GameContext.ui.ptsThisPlayDoc)
                GameContext.ui.ptsThisPlayDoc.textContent = "";

            this.setQuestion("");
            this.postNoticeCenterDisplay("18,white,---");
            this.clearRndScores();
        },

        setUpPlayArea() {
            if (!this.playAreaIsSetUp) {
                if (GameContext.ui.centerDisplay) {
                    GameContext.ui.centerDisplay.addEventListener("click", function () {
                        GameContext.itf.postNotice("XXX");
                    });
                }
                this.playAreaIsSetUp = true;
            }
        },

        timesUpXX(timeFactor) {
            this.timeFactor = timeFactor;
            this.playInProgress = false;

            if (GameContext.controlPanel.theGameInPlay &&
                GameContext.controlPanel.theGameInPlay.checkPlay) {
                GameContext.controlPanel.theGameInPlay.checkPlay("itf.timesUp");
            }
        }
    },

    // -------------------------------------------------------
    // TIMER HELPERS
    // -------------------------------------------------------
    timers: {
        timerId: null,
        secondsRemaining: 0,
        originalSeconds: 0,

        // ⭐ Backward‑compatible wrapper for old code
        startTimer(seconds) {
            this.startPlayClock(seconds);
        },

        // ⭐ Modern timer used by GameL
        startPlayClock(seconds) {
            this.originalSeconds = seconds;
            this.secondsRemaining = seconds;

            // Clear any existing timer
            if (this.timerId) clearInterval(this.timerId);

            var self = this;

            this.timerId = setInterval(function () {

                // Decrement
                self.secondsRemaining--;

                // Update UI
                if (GameContext.ui.timeBox) {
                    GameContext.ui.timeBox.value = self.secondsRemaining + "-Sec";
                }

                // Play countdown audio
                let count = null;
                const sec = self.secondsRemaining;

                if (sec === 20) count = new Audio("Audio/Sec20.wav");
                else if (sec === 15) count = new Audio("Audio/Sec15.wav");
                else if (sec === 10) count = new Audio("Audio/Sec10.wav");
                else if (sec < 6 && sec > 0) count = new Audio("Audio/Nbr" + sec + ".wav");

                if (count) count.play();

                // Time expired
                if (self.secondsRemaining <= 0) {
                    clearInterval(self.timerId);
                    self.timerId = null;

                    // Show "Time's up!"
                    if (GameContext.ui.timeBox) {
                        GameContext.ui.timeBox.value = "Time's up!";
                    }

                    // Play final sound
                    let final = new Audio("Audio/TimesUp.wav");
                    final.play();

                    // Call the game’s timeout handler
                    if (GameContext.controlPanel &&
                        GameContext.controlPanel.theGameInPlay &&
                        GameContext.controlPanel.theGameInPlay.checkPlay) {

                        GameContext.controlPanel.theGameInPlay.checkPlay("timedOut");
                    }
                }

            }, 1000);
        },

        stopPlayClock(reason) {
            console.log("Clock stopped:", reason);
            if (this.timerId) clearInterval(this.timerId);
            this.timerId = null;
            return self.secondsRemaining;
        }
    },



    // -------------------------------------------------------
    // CONTROL PANEL (OPTIONAL)
    // -------------------------------------------------------
    controlPanel: null
};


// Make GameContext.itf point to the same interface object
GameContext.cp = { itf: GameContext.itf };
