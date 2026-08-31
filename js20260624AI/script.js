// script.js – modernized TriviaSmackdown bootstrap and utilities
console.log("script.js loaded");

// ---------------------------------------------------------------------
// Minimal shared state
// ---------------------------------------------------------------------
let cp = null;
let settings = null;
let playLog = [];
let serNbrOfRndInPlay = "";
let setSerNbr = "";
let onNet = true;

// Ensure GameContext base structures
if (!window.GameContext) window.GameContext = {};
if (!GameContext.ui) GameContext.ui = {};
window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM ready — creating BidButs...");
    GameContext.ui.bidButs = new BidButs(GameContext);
    console.log("BidButs created:", GameContext.ui.bidButs);
});

if (!GameContext.mode) GameContext.mode = {};
GameContext.mode.onNet = onNet;

// ---------------------------------------------------------------------
// Game clock wrapper used by Interface.startPlayTimer()
// ---------------------------------------------------------------------

console.log("Top of Script  ");
class GameClock {
    constructor(context) {
        this.context = context;
        this.seconds = 0;
        this.orgSeconds = 0;
        this.timerId = null;
    }

    set(seconds) {
        this.orgSeconds = seconds;
        this.seconds = seconds;
        this.updateDisplay();
    }

    start() {
        this.stop();
        if (this.seconds <= 0) return;

        const self = this;
        this.timerId = setInterval(function () {
            self.tick();
        }, 1000);
    }

    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    tick() {
        if (this.seconds <= 0) {
            this.seconds = 0;
            this.updateDisplay("Time's up!");
            this.stop();

            if (GameContext.itf && typeof GameContext.itf.timesUp === "function") {
                GameContext.itf.timesUp(0);
            }
            return;
        }

        this.seconds--;
        this.updateDisplay();
    }

    updateDisplay(overrideText) {
        const tb = this.context.ui && this.context.ui.timeBox;
        if (!tb) return;

        if (overrideText) {
            tb.value = overrideText;
        } else {
            tb.value = this.seconds + "-Sec";
        }
    }
}

// ---------------------------------------------------------------------
// Core construction – called once from GamePanel to wire everything
// ---------------------------------------------------------------------
function constructClasses() {
    console.log("script.constructClasses");

    GameContext.cp = GameContext.cp || null;
    GameContext.playerLineUp = GameContext.playerLineUp || null;

    // Always recreate bid buttons
    GameContext.ui.bidButs = new BidButs(GameContext);

    // Only do heavy setup once
    if (!cp) {
        cp = new ControlPanel(GameContext);
        cp.init();
        GameContext.cp = cp;

        GameContext.playerLineUp = new PlayerLineUp(cp, GameContext);

        settings = new Settings();
        settings.init();
        GameContext.settings = settings;
    }

    // Clock wrapper
    GameContext.ui.clock = new GameClock(GameContext);

    console.log("constructClasses: bidButs is null? ", GameContext.ui.bidButs == null);
}

// ---------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------
function getSetRndData() {
    return setSerNbr + "," + serNbrOfRndInPlay;
}

function logRoundPlay(text) {
    playLog.push(text);
    console.log("script.playLog =", playLog);
}

function getRound() {
    console.log("script.getRound()");
    const rndSerNbrEl = document.getElementById("rndSerNbr");
    if (!rndSerNbrEl) {
        console.log("rndSerNbr element not found");
        return;
    }

    serNbrOfRndInPlay = rndSerNbrEl.value;
    console.log("serNbrOfRndInPlay =", serNbrOfRndInPlay);

    if (onNet) {
        const url = "https://www.edugames.com/cgi-bin/GetRoundsTSD.pl?" + serNbrOfRndInPlay;
        console.log("getRound url =", url);

        fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                if (!cp || !GameContext.itf) {
                    console.log("ControlPanel or Interface not initialized");
                    return;
                }
                GameContext.itf.cleanPlayArea();
                const round = new Round(data);
                console.log("getRound question =", round.getTheQuestion());
                cp.startGame(round);
            })
            .catch(function (error) {
                console.log("Error fetching round data:", error);
            });
    }
}

function causeError() {
    throw new Error("Intentional test error");
}

// ---------------------------------------------------------------------
// UI helpers on GameContext.ui
// ---------------------------------------------------------------------

// Basic play routing
GameContext.ui.checkPlay = function () {
    const cpLocal = GameContext.cp;
    if (!cpLocal || !cpLocal.theGameInPlay) return;

    if (GameContext.ui.bidButs && GameContext.ui.bidButs.biddingInProgress) {
        return;
    }

    cpLocal.theGameInPlay.checkPlay("ui.checkPlay");
};

// Just-answered bar
GameContext.ui.showJustAnswered = function () {
    const bar = GameContext.ui.ansBar;
    if (!bar) return;
    bar.style.display = "block";
    bar.style.visibility = "visible";
};

GameContext.ui.hideJustAnswered = function () {
    const bar = GameContext.ui.ansBar;
    if (!bar) return;
    bar.style.display = "none";
    bar.style.visibility = "hidden";
};

// Alpha buttons (left/right)
GameContext.ui.showAlphaButtons = function (side) {
    const left = GameContext.ui.alphaLeft;
    const right = GameContext.ui.alphaRight;

    if (!left || !right) return;

    if (!side) {
        left.style.display = "block";
        right.style.display = "block";
    } else if (side === "left") {
        left.style.display = "block";
    } else if (side === "right") {
        right.style.display = "block";
    }
};

GameContext.ui.hideAlphaButtons = function (side) {
    const left = GameContext.ui.alphaLeft;
    const right = GameContext.ui.alphaRight;

    if (!left || !right) return;

    if (!side) {
        left.style.display = "none";
        right.style.display = "none";
    } else if (side === "left") {
        left.style.display = "none";
    } else if (side === "right") {
        right.style.display = "none";
    }
};

// Answer button groups
GameContext.ui.hideButGrp = function () {
    const left = GameContext.ui.ansLeft;
    const right = GameContext.ui.ansRight;

    if (left) left.style.display = "none";
    if (right) right.style.display = "none";
};

GameContext.ui.showButGrp = function () {
    const left = GameContext.ui.ansLeft;
    const right = GameContext.ui.ansRight;

    if (left) left.style.display = "block";
    if (right) right.style.display = "block";
};

// Simple counters
GameContext.ui.count = 0;

GameContext.ui.countUp = function () {
    GameContext.ui.count++;
    console.log("countUp =", GameContext.ui.count);
    return GameContext.ui.count;
};

GameContext.ui.getCount = function () {
    console.log("getCount =", GameContext.ui.count);
    return GameContext.ui.count;
};

GameContext.ui.causeError = function () {
    throw new Error("Intentional UI test error");
};

// Check button
GameContext.ui.hideCheckBut = function () {
    const btn = GameContext.ui.checkBut;
    if (!btn) return;
    btn.style.display = "none";
    btn.style.visibility = "hidden";
};

GameContext.ui.showCheckBut = function () {
    const btn = GameContext.ui.checkBut;
    if (!btn) return;
    btn.style.display = "block";
    btn.style.visibility = "visible";
};

// Next round button
GameContext.ui.disableNextRndBut = function () {
    const btn = GameContext.ui.nextRoundBut;
    if (!btn) return;
    btn.disabled = true;
    btn.style.display = "none";
};

GameContext.ui.enableNextRndBut = function () {
    const btn = GameContext.ui.nextRoundBut;
    if (!btn) return;
    btn.disabled = false;
    btn.style.display = "block";
};

// Answer button
GameContext.ui.disableAnsBut = function () {
    const btn = GameContext.ui.ansBut;
    if (!btn) return;
    btn.disabled = true;
    btn.style.visibility = "hidden";
};

GameContext.ui.enableAnsBut = function () {
    const btn = GameContext.ui.ansBut;
    const bar = GameContext.ui.ansBar;
    if (!btn) return;

    btn.disabled = false;
    btn.style.visibility = "visible";

    if (bar) {
        bar.style.display = "block";
    }
};

// Notice A
GameContext.ui.hideNoticeA = function () {
    const el = GameContext.ui.noticeA;
    if (!el) return;
    el.style.display = "none";
};

GameContext.ui.showNoticeA = function (txt) {
    const el = GameContext.ui.noticeA;
    if (!el) return;

    if (typeof GameContext.ui.playBeep === "function") {
        GameContext.ui.playBeep();
    }

    el.innerHTML = txt;
    el.style.display = "block";

    setTimeout(() => {
        el.style.display = "none";
    }, 1500);
};

// Question box text
GameContext.ui.addTxtToABox = function (txt) {
    const box = GameContext.ui.qBox;
    if (!box) return;
    box.innerHTML = box.innerHTML + txt;
};

// Test checkmarks (dev)
GameContext.ui.testCkMarks = function () {
    const game = GameContext.game;
    if (!game || typeof game.checkMarkIt !== "function") return;

    game.checkMarkIt("R1C1");
    game.checkMarkIt("R2C2");
};

// Show answers
GameContext.ui.showAnswers = function () {
    const cpLocal = GameContext.cp;
    if (!cpLocal || !cpLocal.theGameInPlay) return;

    if (typeof cpLocal.theGameInPlay.showAnswers === "function") {
        cpLocal.theGameInPlay.showAnswers();
    }
};

// Show answer button
GameContext.ui.showAnsBut = function () {
    const btn = GameContext.ui.ansBut;
    if (!btn) return;

    btn.style.visibility = "visible";
    btn.style.display = "block";
};

// Game area
GameContext.ui.setUpGameArea = function () {
    GameContext.ui.disableNextRndBut();
    GameContext.ui.hideCheckBut();
    GameContext.ui.hideAnsTextBox();

    if (typeof GameContext.ui.setUpPlayers === "function") {
        GameContext.ui.setUpPlayers();
    }
};

GameContext.ui.hideGameArea = function () {
    const area = GameContext.ui.gamePlayArea;
    if (!area) return;

    area.style.display = "none";
    area.style.visibility = "hidden";
};

GameContext.ui.showGameArea = function () {
    const area = GameContext.ui.gamePlayArea;
    if (!area) return;

    area.style.display = "block";
    area.style.visibility = "visible";
};

// Answer text box
GameContext.ui.hideAnsTextBox = function () {
    const box = GameContext.ui.ansBoxDiv;
    if (!box) return;

    box.style.display = "none";
    box.style.visibility = "hidden";
};

GameContext.ui.showAnsBox = function (txt) {
    const box = GameContext.ui.ansBoxDiv;
    const input = GameContext.ui.ansBox;

    if (!box || !input) return;

    box.style.display = "block";
    box.style.visibility = "visible";

    input.style.fontSize = "18px";
    input.style.visibility = "visible";

    if (txt != null) {
        input.value = txt;
    }
};

GameContext.ui.hideAnsBut = function () {
    const btn = GameContext.ui.ansBut;
    if (!btn) return;

    btn.style.display = "none";
};

// Beep
GameContext.ui.playBeep = function () {
    const audio = new Audio("Audio/beep.mp3");
    audio.play();
};

// Time box
GameContext.ui.postToTimeBox = function (txt) {
    const tb = GameContext.ui.timeBox;
    if (!tb) return;

    tb.value = txt + "--";
};

// Center display notices
GameContext.ui.postNoticeCenterDisplay = function (arr) {
    const cd = GameContext.ui.centerDisplay;
    if (!cd) return;

    if (!Array.isArray(arr)) {
        arr = arr.split(",");
    }

    cd.style.fontSize = arr[0] + "px";

    const bgColor = arr[1];
    cd.style.backgroundColor = bgColor;
    cd.style.color = bgColor === "white" ? "black" : "white";

    let buf = "";
    for (let i = 2; i < arr.length; i++) {
        buf += arr[i];
    }

    cd.innerHTML = buf;
};

GameContext.ui.blankNotice = function () {
    const cd = GameContext.ui.centerDisplay;
    if (!cd) return;

    cd.style.fontSize = "16px";
    cd.style.backgroundColor = "#ffffff";
    cd.innerHTML = "";
};

// Player helpers
GameContext.ui.getOtherPlayer = function (n) {
    return n === 0 ? 1 : 0;
};

GameContext.ui.nextPlayer = function () {
    const cpLocal = GameContext.cp;
    if (!cpLocal || !cpLocal.theGameInPlay) return;

    if (typeof cpLocal.theGameInPlay.nextPlayer === "function") {
        cpLocal.theGameInPlay.nextPlayer();
    }
};

// List rounds (dev)
GameContext.ui.listRnds = function () {
    const set = GameContext.cp?.setBeingPlayed;
    if (!set) {
        console.log("No set in play");
        return;
    }

    console.log("Listing rounds for set:", set.getSerNbr());
    set.listRnds("UI");
};

// Game type starters (if still used)
GameContext.ui.startGameL = function () {
    const game = GameContext.game;
    if (game && typeof game.startGameL === "function") {
        game.startGameL();
    }
};

GameContext.ui.startGameN = function () {
    const game = GameContext.game;
    if (game && typeof game.startGameN === "function") {
        game.startGameN();
    }
};

GameContext.ui.startGameD = function () {
    const game = GameContext.game;
    if (game && typeof game.startGameD === "function") {
        game.startGameD();
    }
};

// Help from menu (round-specific)
GameContext.ui.getHelpFromMenu = function (txt) {
    const help = GameContext.help;
    const cpLocal = GameContext.cp;

    if (!help || !cpLocal) return;

    if (txt === "general") {
        alert(help.getHelp("general"));
        return;
    }

    if (txt === "bidding") {
        alert(help.getHelp("bidding"));
        return;
    }

    if (txt === "roundThis") {
        const round = cpLocal.theRoundInPlay;
        if (!round) {
            alert("No round is currently in play.");
            return;
        }

        const rndLtr = round.getSerNbr().charAt(3);
        alert(help.getHelp("round", rndLtr));
        return;
    }

    if (txt === "roundNext") {
        const set = cpLocal.setBeingPlayed;
        if (!set) {
            alert("No set is currently in play.");
            return;
        }

        const nextType = set.getTypeOfNextRnd();
        alert(help.getHelp("round", nextType));
        return;
    }
};

// Hide second player in single-player mode
GameContext.ui.hide2nPlyr = function () {
    const p1 = GameContext.ui.player1;
    const p2 = GameContext.ui.secondPlayerBox;

    if (p1) p1.style.display = "none";
    if (p2) p2.style.display = "none";
};

// Player setup from regData
GameContext.ui.setUpPlayers = function () {
    console.log("setUpPlayers");

    constructClasses();

    const cpLocal = GameContext.cp;
    const plu = GameContext.playerLineUp;

    if (!cpLocal || !plu) return;

    const data = localStorage.getItem("regData");
    if (!data) {
        alert("You must register first.");
        window.location.href = "index.html";
        return;
    }

    const arr = data.split(",");
    plu.setPlayerNames(arr.shift());

    const typeInput = arr[0];
    const singlePlayer = arr[1] === "true";
    GameContext.mode.singlePlayer = singlePlayer;

    if (singlePlayer) {
        GameContext.ui.hide2nPlyr();
    }

    if (typeInput === "FromReg") {
        setSerNbr = arr[2];
        cpLocal.startSet(setSerNbr, "fromIndex");
    } else if (typeInput === "SetFromSelection") {
        const setData = arr.join(",");
        cpLocal.setBeingPlayed = new Set(setData);
    }
};

// Bidding
GameContext.ui.makeBid = function (ltrNbr) {
    const bb = GameContext.ui.bidButs;
    if (bb && typeof bb.makeBid === "function") {
        bb.makeBid(ltrNbr);
    }
};

GameContext.ui.procBid = function () {
    const bb = GameContext.ui.bidButs;
    if (bb && typeof bb.procBid === "function") {
        bb.procBid();
    }
};

// Default text size
GameContext.ui.defaultTextSize = 3;

GameContext.ui.setDefaultTextSize = function (n) {
    GameContext.ui.defaultTextSize = n;
};

GameContext.ui.getDefaultFontSize = function () {
    const n = GameContext.ui.defaultTextSize || 3;

    switch (n) {
        case 1: return "small";
        case 2: return "medium";
        case 3: return "large";
        case 4: return "x-large";
        case 5: return "xx-large";
        default: return "large";
    }
};

// Reg data + volume
GameContext.ui.setRegData = function (data) {
    GameContext.ui.regData = data;
};

GameContext.ui.getRegData = function () {
    return GameContext.ui.regData;
};

GameContext.ui.setVolume = function (n) {
    GameContext.ui.volume = n;
};

// Results
GameContext.ui.showResults = function () {
    const plu = GameContext.playerLineUp;
    if (plu && typeof plu.readOutRndScore === "function") {
        plu.readOutRndScore();
    }
};

// Click sound
GameContext.ui.click = function () {
    const snd = new Audio("Audio/ButClick.mp3");
    snd.play();
};

// Help dropdown (HTML help pages)
GameContext.ui.displayHelp = function () {
    const cpLocal = GameContext.cp;
    const set = cpLocal?.setBeingPlayed;
    const menu = GameContext.ui.helpDropDown;

    if (!menu) return;

    const selection = menu.value;
    const openHelp = (file) => window.open("Help/" + file, "_blank").focus();

    switch (selection) {
        case "GettingStarted":
            openHelp("GettingStarted.html");
            break;
        case "Terms":
            openHelp("Terms.html");
            break;
        case "Score":
            openHelp("Scoreing.html");
            break;
        case "ThisRound":
            if (!cpLocal || !set) {
                alert("You have not yet started a Set.");
                break;
            }
            {
                const thisType = set.getTypeOfThisRnd();
                const helpType = GameContext.ui.getHelpForThisTypeRound(thisType);
                openHelp("GameType" + helpType + ".html");
            }
            break;
        case "NextRound":
            if (!cpLocal || !set) {
                alert("You have not yet started a Set.");
                break;
            }
            {
                const nextType = set.getTypeOfNextRnd();
                const helpType = GameContext.ui.getHelpForThisTypeRound(nextType);
                openHelp("GameType" + helpType + ".html");
            }
            break;
    }

    menu.selectedIndex = 0;
};

GameContext.ui.getHelpForThisTypeRound = function (type) {
    switch (type) {
        case "B":
        case "E":
        case "O":
        case "P":
        case "Q":
        case "U":
            return "B";
        case "D":
        case "N":
        case "L":
            return "D";
        case "I":
            return "I";
        default:
            return "X";
    }
};

//This only works for image files.  There seems to ba a safeguard on browsers to prevent local text file input
//It returns an array of 4 parts: image, HTML insert, width and height
//function getImageFile(fileData,id,other){//@@@@
function getImageFile(fileData, id, other) {
    console.log("getImageFile OnNet= " + onNet);

    if (fileData == undefined || fileData == "") return "";
    if (true) {
        console.log("-|-fileData = " + fileData)
        console.log("----------fileData = " + fileData);
        console.log("----------id = " + id)
        console.log("----------other = " + other)
    }
    const returnArray = [];
    const tempArray = (fileData + "").split(".");
    const szCode = tempArray[tempArray.length - 2];//QJAB
    console.log("szCode = " + szCode);
    const orgSizeCode = szCode.substring(0, 2);//QJ
    tempArray[tempArray.length - 2] = orgSizeCode;//The file does not have the adjustments
    const widthAndHeight = getImageSize(szCode);//get the width and height
    console.log("widthAndHeight = " + widthAndHeight);
    

    imageWidth = widthAndHeight[0];
    imageHeight = widthAndHeight[1]

    const n = tempArray.length;//          console.log(" = " + );
    let buf = "";
    const outputArray = [];
    for (let i = 2; i < n - 3; i++) {
        buf += tempArray[i] + "/";//          console.log(" = " + 
    }
    buf += tempArray[n - 3] + "/";
    buf += tempArray[n - 3] + ".";
    buf += tempArray[n - 2] + ".";
    console.log("tempArray[n-1] = " + tempArray[n - 1])
    const ttmp = tempArray[n - 1].replace(",", " ");
    console.log("ttmp = " + ttmp)
    buf += ttmp;
    //console.log("***buf = " + buf);

    let filePath = "";
    console.log("getImageFile buf = "+ buf);
    console.log("getImageFile OnNeT = " + onNet);
    if (onNet == true) {
        console.log("getImageFile OnNeTTTTT = " + onNet);
        filePath = "../../../edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
        filePath = "https://www.edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
    } else {
        filePath = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
        //filePath = "ResLibry/" + buf;
    }

    console.log("|*|filePath = " + filePath)
    let str = "";
    if (id == undefined) {
        str = "<img src='" + filePath;
    } else {
        str = "<img src='" + filePath + "' id='" + id + "' ";
    }
    console.log("!! str = " + str)
    if (other != null) {
        str += other;
    }
    str += " width='" + imageWidth + "' height='" + imageHeight + "' ";

    str += " />"
    const theImage = document.createElement('img');//width
    theImage.src = filePath;
    returnArray.push(str)
    returnArray.push(filePath)
    returnArray.push(imageWidth)
    returnArray.push(imageHeight)
    returnArray.push(theImage)
    console.log("|-| str = " + str + " filePath " + filePath + " width " + imageWidth + " height " + imageHeight + "  returnArray " + returnArray)
    return returnArray;
}

function getImageSize(szCode) {//{console.log("getImageSize = " +  szCode);
    //const orgSize = penAltPart.substring(0,2);
    let width = (szCode.charCodeAt(0) - 64) * 32;
    let height = (szCode.charCodeAt(1) - 64) * 32;
    //console.log("width = " + width + " height= " + height);//192 128
    if (szCode.length > 2) {
        const adjustingCodeWidth = szCode.charAt(2);//'Example -cc'
        if (adjustingCodeWidth != "-") {
            const n = adjustingCodeWidth.charCodeAt(0);
            if (n > 96) {
                width = width - ((n - 96) * 32)
            } else {
                width = width + ((n - 64) * 32)
            }
        }
        const adjustingCodeHeight = szCode.charAt(3);//'Example -cc'
        if (adjustingCodeHeight != "-") {
            const n = adjustingCodeHeight.charCodeAt(0);
            if (n > 96) {
                height = height - ((n - 96) * 32)
            } else {
                height = height + ((n - 64) * 32)
            }
        }
    }
    return [width, height]
}


// Interface helpers
GameContext.ui.uniButClick = function () {
    const ub = GameContext.cp?.itf?.ub;
    if (ub && typeof ub.uniButClick === "function") {
        ub.uniButClick();
    }
};

GameContext.ui.explainNextRound = function () {
    const itf = GameContext.cp?.itf;
    if (itf && typeof itf.explainNextRound === "function") {
        itf.explainNextRound();
    }
};

GameContext.ui.explainThisRound = function () {
    const itf = GameContext.cp?.itf;
    if (!itf) {
        alert("You need to register and start a Set first.");
        return;
    }
    if (typeof itf.explainThisRound === "function") {
        itf.explainThisRound();
    }
};

// Net test
GameContext.ui.doNetTest = function () {
    const nt = new NetTest();
    const result = nt.test();
    GameContext.mode.onNet = (result !== "offNet");
    onNet = GameContext.mode.onNet;
};

// Start round from serial number
GameContext.ui.startRoundFromSerNbr = function () {
    const cpLocal = GameContext.cp;
    const el = GameContext.ui.roundSerNbr;

    if (!cpLocal || !el) return;

    const ser = el.value;
    cpLocal.cleanUpPlayArea();
    cpLocal.startRnd(ser, false);
};

// Start round from menu
GameContext.ui.startRnd = function () {
    const cpLocal = GameContext.cp;
    const menu = GameContext.ui.rndMenu;

    if (!cpLocal || !menu) return;

    const rnd = menu.value;
    cpLocal.startRnd(rnd, false);
};

// Start set
GameContext.ui.startSet = function (setSerNbrParam, from) {
    const cpLocal = GameContext.cp;
    if (!cpLocal) return;

    let localSetSerNbr = setSerNbrParam;
    if (!localSetSerNbr) {
        const menu = GameContext.ui.setMenu;
        if (menu) localSetSerNbr = menu.value;
    }

    cpLocal.startSet(localSetSerNbr, from || "ui.startSet");
};

// Clear score
GameContext.ui.clearScore = function () {
    const p0 = GameContext.ui.pt0;
    const p1 = GameContext.ui.pt1;

    if (p0) p0.textContent = "";
    if (p1) p1.textContent = "";
};

// Dot clock (Game L)
GameContext.ui.startDotClock = function () {
    GameContext.ui.dotSec = 3;
    GameContext.ui.playOver = false;

    clearInterval(GameContext.ui.dotTimer);
    GameContext.ui.dotTimer = setInterval(GameContext.ui.runDotClock, 500);
};

GameContext.ui.runDotClock = function () {
    if (GameContext.ui.dotSec > 0) {
        GameContext.ui.dotSec--;
        return;
    }

    if (!GameContext.ui.playOver) {
        const game = GameContext.cp?.theGameInPlay;
        if (game && typeof game.hideDot === "function") {
            game.hideDot();
        }
        GameContext.ui.playOver = true;
        clearInterval(GameContext.ui.dotTimer);
    }
};

// Flashing object
GameContext.ui.flashObject = function (el, count, length) {
    GameContext.ui.flashTarget = el;
    GameContext.ui.flashCount = count;
    GameContext.ui.flashOn = false;

    clearInterval(GameContext.ui.flashTimer);
    GameContext.ui.flashTimer = setInterval(
        GameContext.ui.runFlashClock,
        length * 250
    );
};

GameContext.ui.runFlashClock = function () {
    const el = GameContext.ui.flashTarget;
    if (!el) return;

    if (GameContext.ui.flashCount > 0) {
        GameContext.ui.flashCount--;
        GameContext.ui.flashOn = !GameContext.ui.flashOn;
        el.style.display = GameContext.ui.flashOn ? "block" : "none";
    } else {
        el.style.display = "block";
        clearInterval(GameContext.ui.flashTimer);
    }
};

// Game Q answer
GameContext.ui.gameQAns = function (value) {
    const game = GameContext.game;
    if (game && typeof game.butHit === "function") {
        game.butHit(value);
    }
};

// Generic ansHit
GameContext.ui.ansHit = function (x, y, ans) {
    const game = GameContext.cp?.theGameInPlay;
    if (game && typeof game.ansHit === "function") {
        game.ansHit(x, y, ans);
    }
};

// Clock setup
GameContext.ui.setUpTheClock = function (limit) {
    GameContext.ui.clock.set(limit);
};

// Panel removal (Game D/L)
GameContext.ui.startPanelRemoval = function (count, intervalSec) {
    GameContext.ui.panelCount = count;
    GameContext.ui.panelPause = false;

    const aud = GameContext.cp?.audX;
    if (aud) aud.setFile("ding", 0.5);

    clearInterval(GameContext.ui.panelTimer);
    GameContext.ui.panelTimer = setInterval(
        GameContext.ui.removePanels,
        intervalSec * 1000
    );
};

GameContext.ui.removePanels = function () {
    if (GameContext.ui.panelPause) return;

    const cpLocal = GameContext.cp;
    if (!cpLocal || !cpLocal.theGameInPlay) return;

    if (GameContext.ui.panelCount > -2) {
        cpLocal.theGameInPlay.removeAPanel();
        cpLocal.audX?.playSnd("ding");
        GameContext.ui.panelCount--;
    } else {
        clearInterval(GameContext.ui.panelTimer);
    }
};

GameContext.ui.pausePanelRemoval = function () {
    GameContext.ui.panelPause = true;
};

GameContext.ui.unPausePanelRemoval = function () {
    GameContext.ui.panelPause = false;
};

GameContext.ui.stopPanelRemoval = function () {
    clearInterval(GameContext.ui.panelTimer);
    GameContext.ui.panelCount = 0;
};

// Clean play area
GameContext.ui.stopPtFac = function () {
    clearInterval(GameContext.ui.ptTimer);
};

GameContext.ui.cleanPlayArea = function () {
    clearInterval(GameContext.ui.panelTimer);
    clearInterval(GameContext.ui.flashTimer);
    clearInterval(GameContext.ui.dotTimer);

    GameContext.ui.stopPtFac();
    GameContext.ui.stopPanelRemoval();

    const itf = GameContext.cp?.itf;
    if (itf && typeof itf.cleanPlayArea === "function") {
        itf.cleanPlayArea();
    }

    GameContext.ui.disableAnsBut();
};

// Stop play clock
GameContext.ui.stopThePlayClock = function (reason) {
    const itf = GameContext.cp?.itf;
    const clock = GameContext.ui.clock;

    if (!itf || !clock) return;
    if (!itf.playInProgress) return;

    const remaining = clock.seconds;
    const factor = clock.seconds / clock.orgSeconds;

    clock.stop();
    itf.setTimeBonusPts(factor);

    return remaining;
};

// Increasing point factor
GameContext.ui.setUpIncreasingPtFac = function (start, inc, stop) {
    GameContext.ui.ptFac = start;
    GameContext.ui.ptInc = inc;
    GameContext.ui.ptStop = stop;

    clearInterval(GameContext.ui.ptTimer);
    GameContext.ui.ptTimer = setInterval(GameContext.ui.adjustPtFacUp, 1000);
};

GameContext.ui.adjustPtFacUp = function () {
    if (GameContext.ui.ptFac >= GameContext.ui.ptStop) {
        clearInterval(GameContext.ui.ptTimer);
        return;
    }

    GameContext.ui.ptFac += GameContext.ui.ptInc;
};

// Button utilities
GameContext.ui.disableButton = function (id) {
    const but = document.getElementById(id);
    if (but) but.disabled = true;
};

GameContext.ui.enableButton = function (id) {
    const but = document.getElementById(id);
    if (but) but.disabled = false;
};

GameContext.ui.selectButton = function (id) {
    const but = document.getElementById(id);
    if (!but) return;
    but.style = "background-color:LightCoral";
    but.disabled = true;
};

GameContext.ui.unselectButton = function (id) {
    const but = document.getElementById(id);
    if (!but) return;
    but.disabled = false;
    but.style = "background-color:aquamarine";
};

GameContext.ui.hideButton = function (id) {
    const but = document.getElementById(id);
    if (but) but.hidden = true;
};

GameContext.ui.showButton = function (id) {
    const but = document.getElementById(id);
    if (!but) return;
    but.style = "background-color:aquamarine;";
    but.hidden = false;
};

// ---------------------------------------------------------------------
// Pure utility functions (not tied to GameContext)
// ---------------------------------------------------------------------
function listItemsInArr(arr, label, start, end, print) {
    if (!Array.isArray(arr)) return "";

    let buf = `${label}:\n****  *****\n`;

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item == null) break;

        const slice = end === ""
            ? item.substring(start)
            : item.substring(start, end);

        buf += `${i}   ${slice}\n`;
    }

    buf += "\n***** *******\n";

    if (print) console.log(buf);
    return buf;
}

function deComma(txt) {
    if (typeof txt !== "string") return txt;

    let end = txt.length - 1;

    while (end >= 0) {
        const c = txt[end];
        if (c === "," || c === "|" || c === "\n" || c === " ") {
            end--;
        } else {
            break;
        }
    }

    return txt.substring(0, end + 1);
}

function breakOutTextByComma(text, header, print) {
    const arr = text.split(",");
    let buf = `****  ****\n${header}\n`;

    arr.forEach((item, i) => {
        buf += `${i} - ${item}\n`;
    });

    buf += "\n****  ****";

    if (print) console.log(buf);
    return buf;
}

// Debug helpers
function testA() {
    const game = GameContext.cp?.theGameInPlay;
    if (game && typeof game.testA === "function") {
        game.testA();
    }
}

function testB() {
    const game = GameContext.cp?.theGameInPlay;
    if (game && typeof game.testB === "function") {
        game.testB();
    }
}

function testC() {
    GameContext.mode.onNet = !GameContext.mode.onNet;
    onNet = GameContext.mode.onNet;
    console.log("onNet =", GameContext.mode.onNet);
}

function testIfOnNet() {
    const nt = new NetTest();
    const result = nt.test();
    console.log("NetTest:", result);

    if (result === "offNet") {
        GameContext.mode.onNet = false;
        onNet = false;
    }
}

function startGame() {
    console.log("script  startGame() " + (GameContext == null));
    console.log("script  startGame() " + (GameContext.cp == null));
    console.log("script  startGame() " + (GameContext.cp.theGameInPlay == null));

    GameContext.cp.theGameInPlay.startGame();
}

console.log("script.js initialization complete");
