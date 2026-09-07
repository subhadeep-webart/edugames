// =========================
// GLOBALS
// =========================
console.log("script-This is the Top");

let db = true;
const fileBase = "https://www.edugames.com/DataBase/A65AA65A/ResLibry";

let greenBG = "#83ff5c";

let gameA = null;
let gameB = null;
let gameC = null;
let gameD = null;
let gameE = null;
let gameI = null;
let gameL = null;
let gameM = null;
let gameN = null;
let gameO = null;
let gameP = null;
let gameQ = null;
let gameU = null;
let gameX = null;
let sets = null;
let cp = null;
let audio = null;
let help = null;
let beBug = true;
let bidButs = null;
let setBeingPlayed = null;
let abp = null;

let defaultTextSize = 3;
let onNet = true;
let seconds = 0;
let bidSeconds = 30;
let butCount = 0;
let orgSec = 0;
let scoreFac = 1;
let interval = 0.1;
let ptInc = 0.2;
let dotSec = 0;
let flashCount = 0;
let flashOn = false;
let flashObject = null;
let panelRemovalPause = false;
let clockIsPause = false;
let pausedPanelNbr = 0;
let playOver = false;
let volume = 5;
let regData = "regDataaa";
let plu = null;
let settings = null;
let stopPt = 2;
let onLapTop = false;
let setUp = false;
let setBidTimeTo5Sec = false;
let bidClockTime = 30;
let biddingInProgress = false;
let pNbr = 0;
let theOtherPNbr = 1;
let pointsForThisRound = 100;
let theQuestion = "????";
let gameInPlay = false;
let count = 0;
let timeWhenClockStoped = 0;
let playLog = [];
let orgTimeForGameDNL = 15;
let serNbrOfRndInPlay = "";
let setSerNbr = "";
let timeFac = 0;
let singlePlayerMode = false;
let imageWidth = 0;
let imageHeight = 0;

// dedicated intervals
let dotInterval = null;
let flashInterval = null;
let panelInterval = null;
let clockInterval = null;

// =========================
// BASIC NET DATA
// =========================
async function getData() {
    const url = "https://www.edugames.com/cgi-bin/GetASetTSD.pl?PRA1_1780";
    console.log(url);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
        const theSet = await response.text();
        console.log(theSet);
    } catch (error) {
        console.error(error.message);
    }
}

async function getRoundFromSerNbr(rndSerNbr) {
    const url = "https://www.edugames.com/cgi-bin/GetASetTSD.pl?" + rndSerNbr;
    console.log(url);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
        const theRound = await response.text();
        console.log(theRound);
    } catch (error) {
        console.error(error.message);
    }
}

function getSetRndData() {
    return setSerNbr + "," + serNbrOfRndInPlay;
}

function logRoundPlay(text) {
    playLog.push(text);
    console.log("script.playLog= " + playLog);
}

// =========================
// GAME L/N/D TIMER
// =========================
function stopGameLNDTimer() {
    console.log("script.stopGameLNDTimer() " + seconds);
    const stopTime = seconds;
    seconds = 0;
    clearInterval(clockInterval);
    return orgTimeForGameDNL - stopTime;
}

function startGameLNDTimer(time) {
    console.log("script.startGameLNDTimer() " + time);
    orgTimeForGameDNL = time;
    seconds = time;
    clockInterval = setInterval(runTheClock, 1000);
}

function runTheClock() {
    if (!clockIsPause) {
        if (seconds > 0) {
            seconds--;
            const sec = Math.round(seconds);
            if (typeof timeBox !== "undefined" && timeBox) {
                timeBox.value = sec + "-Sec";
            }
            scoreFac = sec / orgSec;
            let countAudio = null;
            if (sec === 20) countAudio = new Audio("Audio/Sec20.wav");
            else if (sec === 15) countAudio = new Audio("Audio/Sec15.wav");
            else if (sec === 10) countAudio = new Audio("Audio/Sec10.wav");
            else if (sec < 6) countAudio = new Audio("Audio/Nbr" + sec + ".wav");
            if (countAudio) countAudio.play();
        } else {
            console.log("script runTheClock Time's up!");
            if (typeof timeBox !== "undefined" && timeBox) {
                timeBox.value = "Time's up!";
            }
            seconds = 0;
            clearInterval(clockInterval);
            const countAudio = new Audio("Audio/TimesUp.wav");
            countAudio.play();
            if (cp && cp.theGameInPlay && cp.theGameInPlay.checkPlay) {
                cp.theGameInPlay.checkPlay("timedOut from script " + seconds);
            }
        }
    }
}

// =========================
// ROUND FETCH
// =========================
function getRound() {
    console.log("gp.getRound()");
    const rndSerNbr = document.getElementById("rndSerNbr");
    if (!rndSerNbr) return;
    serNbrOfRndInPlay = rndSerNbr.value;
    console.log("serNbrOfRndInPlay =" + serNbrOfRndInPlay);
    if (onNet) {
        const url = "https://www.edugames.com/cgi-bin/GetRoundsTSD.pl?" + serNbrOfRndInPlay;
        console.log("Sp.url =" + url + "**");
        fetch(url)
            .then(response => response.text())
            .then(data => {
                if (cp && cp.itf && cp.itf.cleanPlayArea) cp.itf.cleanPlayArea();
                const round = new Round(data);
                theQuestion = round.getTheQuestion();
                console.log("-@@-sp.getRoundFmRnd QQQQ=  " + round.getTheQuestion());
                if (cp && cp.startGame) cp.startGame(round);
            })
            .catch(error => console.log("Error fetching data:", error));
    }
}

// =========================
// PLAY CONTROL
// =========================
function checkPlay() {
    console.log("script CheckPlay()");
    if (!gameInPlay) return;
    if (biddingInProgress) return;
    if (cp && cp.theGameInPlay && cp.theGameInPlay.checkPlay) {
        cp.theGameInPlay.checkPlay("remPam");
    }
}

function hideJustAnswered() {
    if (typeof justAnswered !== "undefined" && justAnswered) {
        justAnswered.style.display = "none";
        justAnswered.style.visibility = "hidden";
    }
}

// AlphaBar for GameI (global abp is created in init)
function showAlphaButtons() {
    console.log("script.showAlphaButtons()");
    if (typeof insrtpt0Y !== "undefined" && insrtpt0Y) {
        insrtpt0Y.style.display = "block";
    }
    if (typeof insrtpt1Y !== "undefined" && insrtpt1Y) {
        insrtpt1Y.style.display = "block";
    }
}

function hideAlphaButtons(side) {
    console.log("script.hideAlphaButtons()");
    if (side === undefined || side === "left") {
        if (typeof insrtpt0Y !== "undefined" && insrtpt0Y) {
            insrtpt0Y.style.display = "none";
        }
    }
    if (side === undefined || side === "right") {
        if (typeof insrtpt1Y !== "undefined" && insrtpt1Y) {
            insrtpt1Y.style.display = "none";
        }
    }
}

function hideButGrp() {
    console.log("script hideButGrp()");
    let butGp = document.getElementById("insrtpt0X");
    if (butGp) butGp.style.display = "none";
    butGp = document.getElementById("insrtpt1X");
    if (butGp) butGp.style.display = "none";
}

function showButGrp() {
    console.log("script showButGrp()");
    let butGp = document.getElementById("insrtpt0X");
    if (butGp) butGp.style.display = "block";
    butGp = document.getElementById("insrtpt1X");
    if (butGp) butGp.style.display = "block";
}

function showJustAnswered() {
    if (typeof ansBar !== "undefined" && ansBar) {
        ansBar.style.display = "block";
        ansBar.style.visibility = "visible";
    }
}

function hideCheckBut() {
    console.log("script hideTheCheckBut");
    if (typeof checkBut === "undefined" || !checkBut) return;
    checkBut.style.display = "none";
    checkBut.style.visibility = "hidden";
}

function showCheckBut() {
    console.log("script showCheckBut " + checkBut);
    if (typeof checkBut === "undefined" || !checkBut) return;
    checkBut.style.display = "block";
    checkBut.style.visibility = "visible";
}

function disableNextRndBut() {
    console.log("disableNextRndBut()");
    if (typeof nextRoundBut !== "undefined" && nextRoundBut) {
        nextRoundBut.disabled = true;
    }
}

function enableNextRndBut() {
    console.log("Script showNxtRndBut");
    if (typeof nextRoundBut !== "undefined" && nextRoundBut) {
        nextRoundBut.disabled = false;
    }
}

function disableAnsBut() {
    if (typeof ansBut !== "undefined" && ansBut) {
        ansBut.disabled = true;
        ansBut.style.visibility = "hidden";
    }
}

function enableAnsBut() {
    console.log("Game enableAnsBut() top");
    if (typeof ansBut !== "undefined" && ansBut) {
        ansBut.disabled = false;
        ansBut.style.visibility = "visible";
    }
    if (typeof ansBar !== "undefined" && ansBar) {
        ansBar.style.display = "block";
    }
    console.log("Game enableAnsBut() bottom");
}

function hideNoticeA() {
    if (typeof noticeA !== "undefined" && noticeA) {
        noticeA.style.display = "none";
    }
}

function showNoticeA(txt) {
    playBeep();
    if (typeof noticeA === "undefined" || !noticeA) return;
    noticeA.innerHTML = txt;
    noticeA.style.display = "block";
    setTimeout(() => {
        noticeA.style.display = "none";
    }, 1500);
}

function addTxtToABox(txt) {
    if (typeof qBox !== "undefined" && qBox) {
        qBox.innerHTML += txt;
    }
}

function showAnswers() {
    if (cp && cp.theGameInPlay && cp.theGameInPlay.showAnswers) {
        cp.theGameInPlay.showAnswers();
    }
}

function showAnsBut() {
    if (typeof ansBut !== "undefined" && ansBut) {
        ansBut.style.visibility = "visible";
        ansBut.style.display = "block";
    }
}

// =========================
// GAME AREA SETUP
// =========================
function setUpGameArea() {
    console.log("script.setUpGameArea");
    disableNextRndBut();
    hideAnsTextBox();
    setUpPlayers();
}

function hideGameArea() {
    if (typeof gamePlayArea !== "undefined" && gamePlayArea) {
        gamePlayArea.style.display = "none";
        gamePlayArea.style.visibility = "hidden";
    }
}

function showGameArea() {
    console.log("script.showGameArea()");
    if (typeof gamePlayArea !== "undefined" && gamePlayArea) {
        gamePlayArea.style.display = "block";
        gamePlayArea.style.visibility = "visible";
    }
}

function hideAnsTextBox() {
    console.log("script.hideAnsTextBox()");
    if (typeof ansBoxDiv === "undefined" || !ansBoxDiv) return;
    ansBoxDiv.style.display = "none";
    ansBoxDiv.style.visibility = "hidden";
}

function showAnsBox(txt) {
    console.log("script.showAnsBox() " + txt);
    if (typeof ansBoxDiv === "undefined" || !ansBoxDiv) return;
    ansBoxDiv.style.display = "block";
    ansBoxDiv.style.visibility = "visible";
    if (typeof ansBox !== "undefined" && ansBox) {
        ansBox.style.fontSize = "18px";
        ansBox.style.visibility = "visible";
        if (txt != null) ansBox.value = txt;
    }
}

function playBeep() {
    const audio = new Audio("Audio/beep.mp3");
    audio.play();
}

function postToTimeBox(txt) {
    if (typeof timeBox !== "undefined" && timeBox) {
        timeBox.value = txt + "--";
    }
}

function postNoticeCenterDisplay(arr) {
    if (!Array.isArray(arr)) arr = arr.split(",");
    if (typeof centerDisplay === "undefined" || !centerDisplay) return;

    centerDisplay.style.fontSize = arr[0] + "px";
    const bgColor = arr[1];
    centerDisplay.style.color = bgColor === "white" ? "black" : "white";
    centerDisplay.style.backgroundColor = bgColor;

    let buf = "";
    for (let i = 2; i < arr.length; i++) buf += arr[i];
    centerDisplay.innerHTML = buf;
}

function blankNotice() {
    if (typeof centerDisplay !== "undefined" && centerDisplay) {
        centerDisplay.style.fontSize = "16px";
        centerDisplay.style.backgroundColor = "#ffffff";
        centerDisplay.innerHTML = "";
    }
}

function getOtherPlayer(n) {
    return n === 0 ? 1 : 0;
}

function nextPlayer() {
    console.log("script.nextPlayer()");
    if (cp && cp.theGameInPlay && cp.theGameInPlay.nextPlayer) {
        cp.theGameInPlay.nextPlayer();
    }
}

// =========================
// HELP MENU
// =========================
function getHelpFromMenu(txt) {
    console.log("script.getHelpFromMenu " + txt);
    if (!help) return;

    if (txt === "general") {
        help.getHelp("general");
    } else if (txt === "bidding") {
        alert(help.getHelp("bidding"));
    } else if (txt === "roundThis") {
        const thisRound = cp ? cp.theRoundInPlay : null;
        if (!thisRound) {
            alert("You have not yet started a Set yet, so no Round is in play.");
            document.getElementById("helpDropDownMenu").reset();
            return;
        }
        const rndLtr = serNbrOfRndInPlay.charAt(3);
        alert(help.getHelp("round", rndLtr));
    } else if (txt === "roundNext") {
        if (!setBeingPlayed) {
            alert("You have not yet started a Set yet, so no Round is in play.");
            document.getElementById("helpDropDownMenu").reset();
            return;
        }
        const nextRndLtr = setBeingPlayed.getTypeOfNextRnd();
        alert(help.getHelp("round", nextRndLtr));
    }
    document.getElementById("helpDropDownMenu").reset();
    console.log("script.getHelpFromMenu bottom");
}

function hide2nPlyr() {
    console.log("hide2nPlyr() " + singlePlayerMode);
    if (typeof player1 !== "undefined" && player1) {
        player1.style.display = "none";
    }
    if (typeof secondPlayerBox !== "undefined" && secondPlayerBox) {
        secondPlayerBox.style.display = "none";
    }
}

// =========================
// PLAYER SETUP & SET START
// =========================
function setUpPlayers() {
    console.log("setUpPlayers top " + singlePlayerMode);
    constructClasses();
    const data = localStorage.getItem("regData");
    if (!data) {
        alert("You will need to register first.\n\n(We only ask for a first or nick name.)");
        window.location.href = "index.html";
        return;
    }

    console.log("setUpPlayers data = " + data);
    const arr = data.split(",");
    plu.setPlayerNames(arr.shift());
    const typeInput = arr[0];
    if (arr[1] === "true") singlePlayerMode = true;
    if (singlePlayerMode) hide2nPlyr();

    if (typeInput === "FromReg") {
        setSerNbr = arr[2];
        console.log("setSerNbr " + setSerNbr);
        startSet(setSerNbr, "FromReg");
    } else if (typeInput === "SetFromSelection") {
        const aSetFromSelection = arr.join(",");
        console.log("aSetFromSelection " + aSetFromSelection);
        setBeingPlayed = new Set(aSetFromSelection);
    }
    console.log("gp setUpPlayers Bottom");
}

function makeBid(ltrNbr) {
    console.log("script.makeBid() = " + ltrNbr);
    if (bidButs && bidButs.makeBid) bidButs.makeBid(ltrNbr);
}

function procBid() {
    if (bidButs && bidButs.procBid) bidButs.procBid();
}

function constructClasses() {
    console.log("script.constructClasses setUp = " + setUp);
    if (!setUp) {
        cp = new ControlPanel();
        help = new Help();
        cp.init();
        plu = new PlayerLineUp(cp);
        settings = new Settings();
        settings.init();
        setUp = true;
    }
}

function setDefaultTextSize(n) {
    defaultTextSize = n;
}

function setRegData(theRegData) {
    console.log("script.setRegData " + theRegData);
    regData = theRegData;
}

function getRegData() {
    console.log("script.getRegData");
    return regData;
}

function setVolume(n) {
    console.log("script.setVolume " + n);
    volume = n;
}

function showResults() {
    console.log("script.showResults");
    if (cp && cp.plu && cp.plu.readOutRndScore) {
        cp.plu.readOutRndScore();
    }
}

function click() {
    const snd = new Audio("Audio/ButClick.mp3");
    snd.play();
}

// =========================
// HELP DROPDOWN
// =========================
function displayHelp() {
    console.log("script.displayHelp");
    if (typeof helpDropDown === "undefined" || !helpDropDown) return;

    const selection = helpDropDown.value;
    console.log("selection= -" + selection + "-");

    switch (selection) {
        case "GettingStarted":
            window.open("Help/GettingStarted.html", "_blank").focus();
            break;
        case "Terms":
            window.open("Help/Terms.html", "_blank").focus();
            break;
        case "Score":
            window.open("Help/Scoreing.html", "_blank").focus();
            break;
        case "ThisRound":
            if (!cp || !setBeingPlayed) {
                alert("You have not yet started a Set yet.");
                break;
            }
            const thisRndType = setBeingPlayed.getTypeOfNextRnd();
            const helpType = getHelpForThisTypeRound(thisRndType);
            window.open("Help/GameType" + helpType + ".html", "_blank").focus();
            break;
        case "NextRound":
            if (!cp || !setBeingPlayed) {
                alert("You have not yet started a Set yet.");
                break;
            }
            const nextRndType = setBeingPlayed.getTypeOfThisRnd();
            const helpType2 = getHelpForThisTypeRound(nextRndType);
            window.open("Help/GameType" + helpType2 + ".html", "_blank").focus();
            break;
    }
}

function getHelpForThisTypeRound(thisRndType) {
    console.log("script.getHelpForThisTypeRound " + thisRndType);
    let type = "X";
    switch (thisRndType) {
        case "B":
        case "E":
        case "O":
        case "P":
        case "Q":
        case "U":
            type = "B";
            break;
        case "D":
        case "N":
        case "L":
            type = "D";
            break;
        case "I":
            type = "I";
            break;
    }
    return type;
}

function getDefaultFontSize() {
    console.log("script.getDefaultFontSize() " + defaultTextSize);
    let size = "medium";
    switch (defaultTextSize) {
        case 1: size = "small"; break;
        case 2: size = "medium"; break;
        case 3: size = "large"; break;
        case 4: size = "x-large"; break;
        case 5: size = "xx-large"; break;
    }
    console.log("script.getDefaultFontSize() " + size);
    return size;
}

function uniButClick() {
    console.log("script.uniButClick");
    if (cp && cp.itf && cp.itf.ub && cp.itf.ub.uniButClick) {
        cp.itf.ub.uniButClick();
    }
}

function regPlayersXX() {
    console.log("script.regPlayer onNet= " + onNet);
    cp = new ControlPanel();
    cp.init();
    const startData = localStorage.getItem("regData");
    if (startData && cp.mapData) cp.mapData(startData);
}

function explainNextRound() {
    console.log("script.explainNextRound");
    if (cp && cp.itf && cp.itf.explainNextRound) cp.itf.explainNextRound();
}

function explainThisRound() {
    console.log("script.explainThisRound cp=" + cp);
    if (!cp) {
        alert("You need to register and start a Set first.");
        return;
    }
    if (cp.itf && cp.itf.explainThisRound) cp.itf.explainThisRound();
}

function doNetTestXX() {
    const netTest = new NetTest();
    const test = netTest.test();
    console.log("doNetTest = " + test);
    onNet = test !== "offNet";
    console.log("onNet= " + onNet);
}

function playRndFromTBXX() {
    console.log("script.playRound");
    if (!cp) {
        cp = new ControlPanel();
        cp.init();
    }
    if (cp.theGameInPlay && cp.theGameInPlay.cleanUpPlayArea) {
        cp.theGameInPlay.cleanUpPlayArea();
    }
    if (cp.playRndFromTB) cp.playRndFromTB();
}

function startRoundFromSerNbr() {
    console.log("script.startRoundFromSerNbr");
    const el = document.getElementById("roundSerNbr");
    if (!el) return;
    const serNbr = el.value;
    console.log("serNbr " + serNbr);
    if (cp && cp.cleanUpPlayArea) cp.cleanUpPlayArea();
    if (cp && cp.startRnd) cp.startRnd(serNbr, false);
}

function startRnd() {
    console.log("script.startRnd >> cp.startRnd()");
    if (typeof rndMenu === "undefined" || !rndMenu) return;
    const theRnd = rndMenu.value;
    console.log("script theRnd= " + theRnd);
    if (cp && cp.startRnd) cp.startRnd(theRnd, false);
}

function startSet(theSetSerNbr, from) {
    console.log("script.startSet top " + theSetSerNbr + " from " + from);
    let setSer = theSetSerNbr;
    if (!setSer) {
        const el = document.getElementById("setMenu");
        if (!el) return;
        setSer = el.value;
        console.log("XXX " + setSer);
    }
    console.log("script.theSetSerNbr " + setSer);
    if (cp && cp.startSet) cp.startSet(setSer, "script348");
    console.log("script.startSet bottom");
}

function clearScoreXX() {
    console.log("script.clearScore");
    const p0 = document.getElementById("pt0");
    const p1 = document.getElementById("pt1");
    if (p0) p0.textContent = "";
    if (p1) p1.textContent = "";
}

function startProgramXX() {
    console.log("script.startProgram()");
    cp = new ControlPanel();
    cp.init();
    help = new Help();
}

// DOT TIMER
function setDotTime() {
    playOver = false;
    dotSec = 3;
    if (dotInterval) clearInterval(dotInterval);
    dotInterval = setInterval(runDotClock, 500);
}

function flashAnObject(theObject, theFlashCount, lengthOfFlash) {
    console.log("flashAnObject times= " + theFlashCount + " length= " + lengthOfFlash);
    flashObject = theObject;
    flashCount = theFlashCount;
    if (flashInterval) clearInterval(flashInterval);
    flashInterval = setInterval(runflashClock, lengthOfFlash * 250);
}

function runflashClock() {
    if (!flashObject) return;
    if (flashCount > 0) {
        flashCount--;
        flashOn = !flashOn;
        flashObject.style.display = flashOn ? "block" : "none";
    } else {
        flashObject.style.display = "block";
        flashOn = true;
        clearInterval(flashInterval);
        flashInterval = null;
    }
}

function runDotClock() {
    console.log("runDotClock() " + dotSec);
    if (dotSec > 0) {
        dotSec--;
    } else if (!playOver) {
        if (cp && cp.theGameInPlay && cp.theGameInPlay.hideDot) {
            cp.theGameInPlay.hideDot();
        }
        playOver = true;
        clearInterval(dotInterval);
        dotInterval = null;
    }
}

function gameQAnsXX(theValue) {
    console.log("script.butHit " + theValue);
    if (gameQ && gameQ.butHit) gameQ.butHit(theValue);
}

function ansHit(x, y, anAns) {
    console.log("script.ansHit " + x + " " + y + " " + anAns);
    if (cp && cp.theGameInPlay && cp.theGameInPlay.ansHit) {
        cp.theGameInPlay.ansHit(x, y, anAns);
    }
}

function setUpTheClock(timeLim) {
    console.log("script setUpClock " + timeLim);
    seconds = timeLim;
    orgSec = timeLim;
}

function removePanels() {
    console.log("script removePanels " + butCount + " panelRemovalPause= " + panelRemovalPause);
    if (panelRemovalPause) return;
    if (butCount > -2) {
        if (cp && cp.theGameInPlay && cp.theGameInPlay.removeAPanel) {
            cp.theGameInPlay.removeAPanel();
        }
        if (cp && cp.audX && cp.audX.playSnd) cp.audX.playSnd("ding");
        butCount--;
    } else {
        clearInterval(panelInterval);
        panelInterval = null;
    }
}

function stopPanelRemoval() {
    console.log("stopPanelRemoval()");
    butCount = 0;
    if (panelInterval) {
        clearInterval(panelInterval);
        panelInterval = null;
    }
}

function startPanelRemoval(bCnt, int) {
    console.log("script startPanelRemoval " + bCnt + " " + int);
    if (cp && cp.audX && cp.audX.setFile) cp.audX.setFile("ding", 0.5);
    butCount = bCnt;
    if (panelInterval) clearInterval(panelInterval);
    panelInterval = setInterval(removePanels, int * 1000);
}

function startTheClock() {
    console.log("script startClock " + seconds);
    if (clockInterval) clearInterval(clockInterval);
    clockInterval = setInterval(runTheClock, 1000);
}

function setBidTimexx(n) {
    console.log("script setBidTime " + n);
    bidClockTime = n;
}

// =========================
// TEXT FILE HELPERS
// =========================
function getFilePathToEdugamesFolder() {
    console.log("getFilePathToEdugamesFolder onNet= " + onNet);
    return onNet ? "https://www.edugames.com" : "../../HTDocs/public_html/";
}

function getTextFilePath(fileData) {
    console.log(onNet + "->>-fileData = " + fileData);
    const tempArray = (fileData + "").split(".");
    const n = tempArray.length;
    let buf = "";
    for (let i = 2; i < n - 3; i++) buf += tempArray[i] + "/";
    buf += tempArray[n - 3] + "/";
    buf += tempArray[n - 3] + ".";
    buf += tempArray[n - 2] + ".";
    buf += tempArray[n - 1];
    console.log("getTextFile buf = " + buf);
    return onNet
        ? "https://edugames.com/cgi-bin/GetTextFileTSD.pl?" + buf
        : "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
}

async function getTextFileFromServer(fileData) {
    console.log(onNet + " Script.getTextFileFromServer " + fileData);
    if (!onNet) return null;
    const filePath = getTextFilePath(fileData);
    console.log("Script.getTextFileFromServer filePath " + filePath);
    const response = await fetch(filePath);
    const data = await response.text();
    console.log("data= " + data);
    return data;
}

function listItemsInArr(theArr, text, strtChar, endChar, print) {
    let buf = text + ":\n****  *****\n";
    for (let i = 0; i < theArr.length; i++) {
        if (theArr[i] == undefined) break;
        buf += i + "   " + theArr[i].substring(strtChar, endChar) + "\n";
    }
    buf += "\n***** *******\n";
    if (print) console.log(buf);
    else return buf;
}

function deComma(txt) {
    let lastLtr = txt.length;
    for (let i = txt.length - 4; i > 0; i--) {
        const x = txt.charAt(i);
        if (x === "," || x === "|" || x === "\n" || x === " ") lastLtr = i;
        else break;
    }
    return txt.substring(0, lastLtr);
}

function breakOutTextByComma(theText, header, print) {
    const theArr = theText.split(",");
    let buf = "****  ****\n" + header;
    for (let i = 0; i < theArr.length; i++) buf += i + " - " + theArr[i] + "\n";
    buf += "\n****  ****";
    if (print) console.log(buf);
}

// =========================
// TEST FUNCTIONS
// =========================
function testA() {
    console.log("script testA cp.theGameInPlay= ", cp?.theGameInPlay);
    if (cp?.theGameInPlay?.testA) cp.theGameInPlay.testA();
}

function testB() {
    if (cp?.theGameInPlay?.testB) cp.theGameInPlay.testB();
}

function testC() {
    onNet = !onNet;
    console.log("onNet " + onNet);
}

function testIfOnNet() {
    const netTest = new NetTest();
    const xx = netTest.test();
    console.log("script.OnNet = " + xx);
    if (xx === "offNet") onNet = false;
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


//(24 keys) ['AA.Qen00004', 'AA.Qen00027', 'AA.Qen00076', 'AA.Qen00009', '', 'AA.Qen00003', 'AA.Uen01219', 'AA.Len00002', 'AA.Men00021', 'AA.Pen00006', 'AA.Oen00001', 'AA.Pen00016', 'AA.Een00002', 'AA.Een00010', 'AA.Uen00045', 'AA.Oen00005', 'AA.Ben00001', 'AA.Ben00478', 'AA.Aen00003', 'AA.Cen00004', 'AA.Den00002', 'AA.Ien00005', 'AA.Nen00001', 'AA.Qen00002']

//This only works for image files.  There seems to ba a safeguard on browsers to prevent local text file input
//It returns an array of 4 parts: image, HTML insert, width and height
//function getImageFile(fileData,id,other){//@@@@
function getImageFile(fileData, id, other) {
    console.log("getImageFile OnNet= " + onNet);
    if (fileData == undefined || fileData == "") return "";
    if (false) {
        console.log("-|-fileData = " + fileData)
        console.log("----------fileData = " + fileData);
        console.log("----------id = " + id)
        console.log("----------other = " + other)
    }
    const returnArray = [];
    const tempArray = (fileData + "").split(".");
    const szCode = tempArray[tempArray.length - 2];//QJAB
    //console.log("szCode = " + szCode);
    const orgSizeCode = szCode.substring(0, 2);//QJ
    tempArray[tempArray.length - 2] = orgSizeCode;//The file does not have the adjustments
    const widthAndHeight = getImageSize(szCode);//get the width and height
    //console.log("widthAndHeight = " + widthAndHeight);
    imageWidth

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
    //console.log("getImageFile buf = "+ buf);
    //console.log("getImageFile OnNeT = " + onNet);
    if (onNet == true) {
        //console.log("getImageFile OnNeTTTTT = " + onNet);
        filePath = "../../../edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
        filePath = "https://www.edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
    } else {
        filePath = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
        //filePath = "ResLibry/" + buf;
    }

    //console.log("|*|filePath = " + filePath)
    let str = "";
    if (id == undefined) {
        str = "<img src='" + filePath;
    } else {
        str = "<img src='" + filePath + "' id='" + id + "' ";
    }
    //console.log("!! str = " + str)
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

// =========================
// FINAL STARTUP
// =========================
console.log("script-This is the Bottom AA");

window.onload = function () {
    console.log("script window.onload - initializing game");
    setUpGameArea();

    // AlphaBar for GameI
    if (typeof AlphaBar === "function") {
        abp = new AlphaBar();
        hideAlphaButtons();
    }

    console.log("script-This is the Bottom BB", abp);
};
