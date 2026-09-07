// ControlPanel.js — modern, GameContext‑driven version

class ControlPanel {

    constructor(context) {
        this.context = context;

        // Utilities and collaborators
        this.utl = null;
        this.itf = null;
        this.sp = null;
        this.sets = null;
        this.audX = null;

        // Game / round / set state
        this.theGameInPlay = null;
        this.theRoundInPlay = null;
        this.setBeingPlayed = null;

        this.gameType = "X";
        this.itfType = "X";
        this.rndSerNbr = null;
        this.setSerNbr = null;

        // Round list / sequence
        this.roundArray = [];
        this.roundSerNbrArray = [];
        this.rndNbr = 0;

        // Misc state
        this.sampleData = null;
        this.offLine = true;
        this.onServer = false;
        this.playAreaSetUp = false;
        this.roundCount = 0;

        // Players
        this.playerArray = [];
        this.firstPlayerNbr = 0;

        // UI references
        this.pointTF = null;
        this.rndSerNbrBox = null;
    }

    // ------------------------------------------------------------
    // Initialization
    // ------------------------------------------------------------

    init() {
        console.log("ControlPanel.init()");
       
        var cp = this;

        document.getElementById("nextRoundBut")
            .addEventListener("click", function () { cp.nextRound(); });

        document.getElementById("checkBut")
            .addEventListener("click", function () { cp.checkAnswer(); });

        document.getElementById("helpBut")
                .addEventListener("click", function () { cp.showHelp(); });
        

        // Store reference in GameContext
        GameContext.cp = this;

        // 1. Create Interface (handles DOM, display, timers, answer UI)
        this.itf = new Interface(this.context);
        GameContext.itf = this.itf;

        // 2. Register DOM elements (Interface handles this)
        this.itf.registerDOM();

        // 3. Create PlayerLineUp (scoreboard + player data)
        this.plu = new PlayerLineUp(this, this.context);
        this.context.playerLineUp = this.plu;

        // 4. Create Bid Buttons (bidding UI)
        this.context.ui.bidButs = new BidButs(10, this.context);

        // 5. Create AlphaBar (letter buttons for Game A, Q, etc.)
        this.alphaBar = new AlphaBar(this.context);
        this.context.ui.alphaBar = this.alphaBar;

        // 6. Create Audio subsystem
        this.audX = new AudX();
        this.context.audX = this.audX;

        // 7. Create Settings subsystem
        this.settings = new Settings();
        this.settings.init();
        this.context.settings = this.settings;

        // 8. Initialize UI defaults
        if (this.context.ui.hideAlphaButtons) {
            this.context.ui.hideAlphaButtons();
        }

        if (this.context.ui.hideAnsTextBox) {
            this.context.ui.hideAnsTextBox();
        }

        if (this.context.ui.hideCheckBut) {
            this.context.ui.hideCheckBut();
        }

        if (this.context.ui.disableNextRndBut) {
            this.context.ui.disableNextRndBut();
        }

        console.log("ControlPanel.init() complete");
    }


    isOnNet() {
        if (typeof navigator !== "undefined" && navigator.onLine !== undefined) {
            return navigator.onLine;
        }
        return false;
    }



    // ------------------------------------------------------------
    // Game start / round start
    // ------------------------------------------------------------

    startGame(aRound, sampleData) {
        console.log("CP.startGame");

        const bidButs = this.context.ui.bidButs;
        if (bidButs && bidButs.stopBidClock) {
            bidButs.stopBidClock();
        }

        this.theRoundInPlay = aRound;
        this.gameType = aRound.getGameType();
        this.rndSerNbr = aRound.getSerNbr();
        this.sampleData = sampleData;

        if (this.context.ui.disableNextRndBut) {
            this.context.ui.disableNextRndBut();
        }
        if (this.context.ui.disableAnsBut) {
            this.context.ui.disableAnsBut();
        }

        this.createGameForType(this.gameType, aRound);

        if (this.itfType !== "B" && this.context.ui.timeBox) {
            this.context.ui.timeBox.value = "";
        }

        console.log("CP.startGame bottom gameType=" +
            this.gameType + " itfType=" + this.itfType);
    }

    createGameForType(gameType, aRound) {
        let game = null;

        switch (gameType) {
            case "A":
                this.itfType = "X";
                game = new GameA(aRound, this.context);
                break;
            case "B":
                this.itfType = "B";
                game = new GameB(aRound, this.context);
                break;
            case "C":
                this.itfType = "B";
                game = new GameC(aRound, this.context);
                break;
            case "D":
                this.itfType = "D";
                game = new GameD(aRound, this.context);
                break;
            case "E":
                this.itfType = "B";
                game = new GameE(aRound, this.context);
                break;
            case "I":
                this.itfType = "I";
                game = new GameI(aRound, this.context);
                break;
            case "L":
                this.itfType = "D";
                game = new GameL(aRound, this.context);
                break;
            case "M":
                this.itfType = "B";
                game = new GameM(aRound, this.context);
                break;
            case "N":
                this.itfType = "D";
                game = new GameN(aRound, this.context);
                break;
            case "O":
                this.itfType = "B";
                game = new GameO(aRound, this.context);
                break;
            case "P":
                this.itfType = "B";
                game = new GameP(aRound, this.context);
                break;
            case "Q":
                this.itfType = "B";
                game = new GameQ(aRound, this.context);
                break;
            case "U":
                this.itfType = "B";
                game = new GameU(aRound, this.context);
                break;
            case "X":
                this.itfType = "X";
                game = new GameX(aRound, this.context);
                break;
            default:
                this.itfType = "X";
                break;
        }

        this.theGameInPlay = game;
        this.context.game = game;
        GameContext.itfType = this.itfType;

        if (game && game.init) {
            game.init();
        }
    }

    // ------------------------------------------------------------
    // Data mapping / selection
    // ------------------------------------------------------------

    mapData(data) {
        console.log("CP.mapData = " + data);
        if (this.sp && this.sp.mapData) {
            this.sp.mapData(data);
        }
    }

    // ------------------------------------------------------------
    // Set creation / start
    // ------------------------------------------------------------

    startSet(serNbr, from) {
        console.log("CP.startSet serNbr= " + serNbr + " from " + from);
        this.setBeingPlayed = this.createSet(serNbr);
    }

    displayStartButton() {
        if (this.itf && this.itf.displayNxtRndBut) {
            this.itf.displayNxtRndBut();
        }
    }

    createSet(setSerNbr) {
        console.log("CP.createSet setSerNbr= " + setSerNbr);
        if (this.itf && this.itf.setUpPlayArea) {
            this.itf.setUpPlayArea();
        }

        this.setSerNbr = setSerNbr;
        let newSet = null;

        if (!this.offLine) {
            const url = "https://www.edugames.com/cgi-bin/GetASetTSD.pl?" + this.setSerNbr;
            console.log("CP.fetch url = " + url);

            fetch(url)
                .then(function (response) {
                    return response.text();
                })
                .then(function (data) {
                    if (data != null) {
                        console.log("CP.fetch data= " + data.substring(0, 24));
                        this.setBeingPlayed = new Set(data, false);
                        console.log("setBeingPlayed.getSerNbr() " +
                            this.setBeingPlayed.getSerNbr());
                    } else {
                        alert("Something went wrong and the Set could not be downloaded");
                    }
                }.bind(this));

            return null;
        } else {
            const data = this.sets.getData(setSerNbr);
            newSet = new Set(data);
            this.displayStartButton();
            return newSet;
        }
    }

    getSetWith1Rnd() {
        console.log("CP.getSetWith1Rnd = " + this.sp.roundToBePlayed);
        const arr = [];
        arr.push(this.sp.roundToBePlayed);
        return arr;
    }

    // ------------------------------------------------------------
    // Play area setup
    // ------------------------------------------------------------

    setUpPlayArea() {
        console.log("CP.setUpPlayArea");
        if (this.sp && this.sp.setSecPerQuest) {
            this.sp.setSecPerQuest();
        }
        if (this.sp && this.sp.removeSelectionForm) {
            this.sp.removeSelectionForm();
        }
        if (this.itf && this.itf.set2PlayerDisplay) {
            this.itf.set2PlayerDisplay();
        }
        if (this.itf && this.itf.insertPlayersInto2PlayerDisplay) {
            this.itf.insertPlayersInto2PlayerDisplay();
        }
    }

    getRoundFromDropDownMenu() {
        if (this.sp && this.sp.getRndToBePlayed) {
            return this.sp.getRndToBePlayed();
        }
        return null;
    }

    // ------------------------------------------------------------
    // Set / round flow
    // ------------------------------------------------------------

    finishUpSet() {
        console.log("CP.finishUpSet");
        const plu = this.context.playerLineUp;
        if (plu && plu.addRndScoreToSet) {
            plu.addRndScoreToSet();
        }
        if (this.itf && this.itf.cleanPlayArea) {
            this.itf.cleanPlayArea();
        }
        if (this.context.ui.qBox && plu && plu.getWinner) {
            this.context.ui.qBox.textContent = plu.getWinner();
        }
    }

    startRnd(theRnd, partOfSet) {
        console.log("CP.startRnd theRnd= " + theRnd + " partOfSet= " + partOfSet);

        if (!this.playAreaSetUp) {
            if (this.itf && this.itf.setUpPlayArea) {
                this.itf.setUpPlayArea();
            }
            this.playAreaSetUp = true;
        }

        const plu = this.context.playerLineUp;

        if (!partOfSet && plu && plu.clearRndScores) {
            plu.clearRndScores();
        }
        if (!partOfSet) {
            this.setBeingPlayed = null;
        }

        if (this.setBeingPlayed != null) {
            console.log("CP.setBeingPlayed SerNbr = " +
                this.setBeingPlayed.getSerNbr());

            theRnd = this.setBeingPlayed.getNextRnd("CP startRnd");

            console.log("CP.startRnd nextRnd = " + theRnd);

            if (theRnd == null) {
                this.finishUpSet();
                return;
            } else if (theRnd.charAt(0) == "*") {
                this.startRnd(theRnd.substring(1), true);
                return;
            }
        }

        if (theRnd == null) {
            if (this.sp && this.sp.getRndToBePlayed) {
                theRnd = this.sp.getRndToBePlayed();
            }
        }

        const round = this.sp.getRoundFmRnd(theRnd);
        console.log("CP.startRnd round = " + round);
        this.startGame(round);
    }

    playRndFromTB() {
        console.log("CP.playRndFromTB");

        if (!this.playAreaSetUp) {
            if (this.itf && this.itf.setUpPlayArea) {
                this.itf.setUpPlayArea();
            }
            this.playAreaSetUp = true;
        }

        const tb = document.getElementById("rndSerNbrTB");
        if (!tb) return;

        const theRndSerNbrToPlay = tb.value;
        console.log("CP.playRndFromTB value= " + theRndSerNbrToPlay);

        if (this.sp == null) {
            this.sp = new SelectionPanel(this);
        }

        const theRound = this.sp.getRndFmGameType(theRndSerNbrToPlay);
        console.log("CP.playRndFromTB theRound = " + theRound);

        this.startRnd(theRound, false);
    }

    endSet() {
        console.log("CP.endSet");
        // hook for any end‑of‑set behavior
    }

    playNextRound(reason) {
        console.log("CP.playNextRound reason= " + reason);

        if (this.setBeingPlayed == null) {
            console.log("No Set in play");
            return;
        }

        if (this.context.ui.hideAnsTextBox) {
            this.context.ui.hideAnsTextBox();
        }

        if (this.theGameInPlay && this.theGameInPlay.cleanPlayArea) {
            this.theGameInPlay.cleanPlayArea();
        }

        if (this.setBeingPlayed.playNextRnd) {
            this.setBeingPlayed.playNextRnd();
        }
    }

    startRoundList(nbr) {
        console.log("CP.startRoundList = " + nbr);
        if (!this.sets || !this.sets.getRoundList) return;

        const startPt = this.rndSerNbrBox ?
            Number(this.rndSerNbrBox.value) : 0;

        this.roundSerNbrArray = this.sets.getRoundList(nbr, startPt);
        const aRoundSer = this.roundSerNbrArray.shift();
        console.log("CP.startRoundList first round= " + aRoundSer);
        this.startRnd(aRoundSer, false);
    }

    releaseNextRound() {
        console.log("CP.releaseNextRound = " + this.roundArray);
        if (this.rndNbr < this.roundArray.length) {
            this.startGame(this.roundArray[this.rndNbr++]);
        }
    }

    // ------------------------------------------------------------
    // Players / points
    // ------------------------------------------------------------

    regPlayer(player) {
        console.log("CP.regPlayer");
        this.playerArray.push(player);
    }

    halveThePoints() {
        if (!this.pointTF) return;
        const presentPt = Number(this.pointTF.value);
        this.pointTF.value = presentPt / 2;
    }

    addPlayerLineUp(plu) {
        this.context.playerLineUp = plu;
    }

    setFirstPlayerNbr(nbr) {
        this.firstPlayerNbr = nbr;
    }

    // ------------------------------------------------------------
    // Simple helpers
    // ------------------------------------------------------------

    helloWorld() {
        console.log("CP.helloWorld");
    }
}
