//'use strict';

// JavaScript source code
console.log('script-This is the Top');
let db = true;

const fileBase = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry";

let greenBG ="#83ff5c";
//let netTest = null;
let gameA = null
let gameB = null
let gameC = null
let gameD = null
let gameE = null;
let gameI = null;
let gameL = null;
let gameM = null;
let gameN = null
let gameO = null;
let gameP = null;
let gameQ = null;
let gameU = null;
let gameX = null;
let sets = null;
let cp = null;
let audio= null;
let help = null;
let beBug = true;
let bidButs = null;
let abp = null;
let setBeingPlayed = null;
let singlePlayerMode = false;

//ansDataMap.set("","")roundMap.set("","")//	   console.log(" startGame "   + butLtr);


let defaultTextSize = 3;//medium large x-large xx-large
let onNet = true;
let seconds = 0;
let bidSeconds = 30;
let butCount = 0;
let orgSec= 0;
let scoreFac = 1;
let interval = 0.1;
let dotInterval = 0.1;//clockInterval, panelInterval, ptFacInterval).
let clockInterval = 0.1;
let panelInterval = 0.1;
let ptFacInterval = 0.1;


let ptInc = 0.2;
let dotSec=0;
let flashCount = 0;
let flashOn = false;
let flashObject = null
let panelRemovalPause = false;
let clockIsPause = false;
let pausedPanelNbr = 0;
let playOver = false;
let volume= 5;
let regData = "regDataaa"
let plu = null;
let settings = null;
//let exp = null;
let stopPt = 2;
let onLapTop = false;
let setUp = false;
let setBidTimeTo5Sec = false;
let bidClockTime = 30;//default
let biddingInProgress = false;
let pNbr = 0;
let theOtherPNbr = 1;
let pointsForThisRound = 100
let theQuestion = "????";
let gameInPlay = false;
let count = 0;
let timeWhenClockStoped = 0;
let playLog = [];
let orgTimeForGameDNL = 15;
let serNbrOfRndInPlay = "";
let setSerNbr = "";
let timeFac = 0;
//et ansBox = null;
//let ansBar = null;
//let ansBut = null;
//let ansBoxDiv = null
///setUpPlayers(); in game

async function getDataXX() {
	const url = "/cgi-bin/GetASetTSD.pl?PRA1_1780";
		console.log(url);
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const theSet = await response;
		console.log(theSet);
	} catch (error) {
		console.error(error.message);
	}
}

async function getData() {
	const url = "/cgi-bin/GetASetTSD.pl?PRA1_1780";
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`Response status: ${response.status}`);
		const theSetText = await response.text(); // or .json() as appropriate
		console.log(theSetText);
		return theSetText;
	} catch (error) {
		console.error(error);
		throw error;
	}
}



async function getRoundFromSerNbr(rndSerNbr) {
	const url = "/cgi-bin/GetASetTSD.pl?" + rndSerNbr;
		console.log(url);
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const theRound = await response;
		console.log(theRound);
	} catch (error) {
		console.error(error.message);
	}
}

function getSetRndData() {
	return setSerNbr + "," + serNbrOfRndInPlay;
}

function logRoundPlay(text) {
	playLog.push(text)
	console.log("script.playLog= " + playLog);
}

function stopGameLNDTimer() {//clockInterval, panelInterval, ptFacInterval).
	console.log("script.stopGameLNDTimer() " + seconds);
	const stopTime = seconds;
	seconds = 0;
	clearInterval(interval); // Stop the timer
	return orgTimeForGameDNL - stopTime;
}

function startGameLNDTimer(time) {
	console.log("script.startGameLNDTimer() " + time);
	orgTimeForGameDNL = time;
	seconds = time;
	interval = setInterval(runTheClock, 1000);
}





function getRound(){
	console.log("gp.getRound() ");
	const rndSerNbr = document.getElementById("rndSerNbr");
	serNbrOfRndInPlay = rndSerNbr.value;
	
	console.log("serNbrOfRndInPlay =" + serNbrOfRndInPlay);
	if (onNet == true) {
		const url = '/cgi-bin/GetRoundsTSD.pl?' + serNbrOfRndInPlay;
		console.log("Sp.url =" + url + "**");
		fetch(url, {
		})
			.then(response => response.text())
			.then(data => {
				cp.itf.cleanPlayArea();
				const round = new Round(data);
				theQuestion = round.getTheQuestion();
				console.log("-@@-sp.getRoundFmRnd QQQQ=  " + round.getTheQuestion())
				cp.startGame(round);
			})
			.catch(error => console.log('Error fetching data:', error));
		return;
	}
}



function causeError() {
	const xyz = undfined;
	const arr = xyz.split(",");
}
function countUp() {
	console.log("countup= " + (++count));
	return count;
}

function getCount() {
	console.log("get count= " + count);
}


function hideAnsBar() {
	console.log("script.hideAnsBar() " + ansBar);
	ansBar.style.display = "none";	
	ansBar.style.visibility = "hidden"
}

function checkPlay() {
	console.log(" script CheckPlay()" );
	if (!gameInPlay) return;
	if (biddingInProgress) {
		////biddingInProcessWARNING();
		return;
	}
	cp.theGameInPlay.checkPlay("remPam");//a work around for video 
}

function hideJustAnswered() {console.log("script.hideAnsBar() " + ansBar );
	justAnswered.style.display = "none";	
	justAnswered.style.visibility = "hidden"
}


function showAnsBar() {console.log("script.showAnsBar() " + ansBar );		
	ansBar.style.display = "block";
	ansBar.style.visibility = "visible"	
}

function showJustAnswered() {console.log("script.showAnsBar() " + ansBar );		
	ansBar.style.display = "block";
	ansBar.style.visibility = "visible"	
}


function hideCheckBut() {//checkBut
	console.log("script  hideTheCheckBut   " + checkBut)
	if (checkBut === undefined) return;
    //checkBut.disabled = true;
	checkBut.style.display = "none";
	checkBut.style.visibility = "hidden";
}

function showCheckBut() {
	console.log("script showCheckBut " + checkBut)
	if (checkBut == undefined) return;
    //checkBut.disabled = false;
	checkBut.style.display = "block";
	checkBut.style.visibility = "visible";
}
function disableNextRndBut() {
	console.log("disableNextRndBut() ");
	///nextRoundBut.disabled = true;
	//nextRoundBut.style.display = "none";	
	//nextRoundBut.style.visibility = "hidden"

}


function enableNextRndBut() {
	console.log("Script showNxtRndBut ")
    nextRoundBut.disabled = false;
	//nextRoundBut.style.visibility = "visible";
	//nextRoundBut.style.display = "block";
}


function disableAnsBut() {
	//console.log("Script disableAnsBut() top")
	//ansBut.disabled = true;
	//ansBut.style.visibility = "hidden";
	//console.log("Script disableAnsBut() Bottom")
}

function enableAnsBut() {
	console.log("Game enableAnsBut() top")
    ansBut.disabled = false;
	ansBut.style.visibility = "visible";
    ansBar.style.display = "block";
	console.log("Game enableAnsBut() bottom  "  + ansBut.value)
}



function hideNoticeA() {
	noticeA.style.display = 'none'; // Hide the notice
}


function showNoticeA(txt) {//console.log("showNoticeA " + txt);
	playBeep();
	noticeA.innerHTML = txt;
    noticeA.style.display = 'block'; // Show the notice
    setTimeout(() => {
		noticeA.style.display = 'none';
    }, 1500);
}


function addTxtToABox(txt) {//console.log(" addTxtToABox  " + txt  );
	qBox.innerHTML = qBox.innerHTML + txt;
}

function testCkMarks() {//console.log("script. testCkMarks() top");
	gameB.checkMarkIt("R1C1");
	//console.log("script. testCkMarks() Middle ");
	gameB.checkMarkIt("R2C2");
	//console.log("script. testCkMarks() bottom");
}
/*
function getOtherPlayer(nbr) {console.log("script. getOtherPlayer ");
	if (nbr == 1){
		return 0
	} else {
		return 1;
	}
}
*/

function showAnswers() {
	//console.log("script. showAnswers() ");
	cp.theGameInPlay.showAnswers();
}

function showAnsBut() {console.log("showAnsBut  ");
	ansBut.style.visibility = "visible"
    ansBut.style.display = "block"
}



function setUpGameArea() {
	console.log("script.setUpGameArea  ");
	disableNextRndBut();
	hideCheckBut();
	hideAnsBox();
	setUpPlayers();
	//console.log("script.setUpGameArea Bottom " );
}


function hideGameArea() {//console.log("script.hhideGameArea() " + ansBox );
	gamePlayArea.style.display = "none";
	gamePlayArea.style.visibility = "hidden"
}


function showGameArea() {
	console.log("script.hhideGameArea() " + ansBox);
	gamePlayArea.style.display = "block";
	gamePlayArea.style.visibility = "visible"
}



function hideAnsBox() {
	console.log("script.hideAnsBox() ");
	if (ansBoxDiv == null) return;
	ansBoxDiv.style.display = "none";	
	ansBoxDiv.style.visibility = "hidden"

}
function showAnsBox(txt) {
	console.log("script.showAnsBox() " + txt);
	if (ansBoxDiv == null) return;
	ansBoxDiv.style.display = "block";
	ansBoxDiv.style.visibility = "visible"
	ansBox.style.fontSize = "18px";
    ansBox.style.visibility = "visible"
	if (txt != null) {
		ansBox.value = txt;
	}

}

function hidAnsBut() {
	console.log("script.hidAnsBut() ");
    if (ansBut == null) return;
    ansBut.style.display = "none";
}


function playBeep() {console.log(" playBeep()")
	const audio = new Audio('Audio/beep.mp3'); // Replace with your beep file path
	audio.play();
}


function postToTimeBox(txt) {console.log("Script  postToTimeBox")
	timeBox.value = txt + "--";

}



function postNoticeCenterDisplay(arr) {//console.log("script.postNoticeCenterDisplay  " + arr);
	if (!Array.isArray(arr)) {
		arr = arr.split(",")
	}	
	const bgColor = arr[1]
	// "white" is the neutral default — it means "no player colour", not a
	// literal white box. Clearing the inline styles lets css/gamepanel.css
	// paint the notice (gold on the #08274B card). A real player colour
	// (blue / red) still signals who bid, so it is applied as before.
	if (bgColor == "white") {
		centerDisplay.style.fontSize = "";
		centerDisplay.style.color = "";
		centerDisplay.style.backgroundColor = "";
	} else {
		centerDisplay.style.fontSize = arr[0] + "px";
		centerDisplay.style.color = "white";
		centerDisplay.style.backgroundColor = bgColor;
	}
	let buf = "";
	for (let i = 2; i < arr.length; i++) {
		buf += arr[i];//          console.log(" = " + 
	}
	centerDisplay.innerHTML = buf;
}
function blankNotice() {console.log("script.blankNotice  ");
	// Clear the inline styles rather than repainting the box white, so the
	// emptied notice falls back to css/gamepanel.css.
	centerDisplay.style.fontSize = "";
	centerDisplay.style.color = "";
	centerDisplay.style.backgroundColor = "";
	centerDisplay.innerHTML = "";


}
function getOtherPlayer(n) {
	console.log("getOtherPlayer() " + n);
	let otherPlayer = 0;
		if (n == 0) {
			otherPlayer = 1;
		}
	return otherPlayer;
}


function nextPlayer() {console.log("script.nextPlayer()  "  );
	cp.theGameInPlay.nextPlayer();

}


function listRnds(){console.log("script.listRnds  "  );
	const theSetSerNbr = setBeingPlayed;
	console.log("theSetSerNbr= " + theSetSerNbr );
	const theSetList = setBeingPlayed.listRnds("XXX");
}

function startGameL() {console.log("script.startGameL(");
	gameL.startGameL();

}
function startGameN() {
	console.log("script.startGameN(");
	gameN.startGameN();

}
function startGameD() {
	console.log("script.startGameD(");
	gameD.startGameD();
}



/* Show a help message in the styled dialog rather than a native alert().
   Falls back to alert() if the UI layer (js-ui/tsd-modal.js) is absent. */
function showHelpMessage(title, body) {
	if (window.TSDModal && typeof TSDModal.alert === "function") {
		TSDModal.alert({ title: title, message: body, icon: "help" });
	} else {
		alert(body);
	}
}

function getHelpFromMenu(txt) {console.log("script.getHelpFromMenu " + txt);
	const thisRound = cp.theRoundInPlay;
	if (txt == "general") {
		const xx = help.getHelp("general");
		//alert(xx);
	} else if (txt == "bidding") {
		const xx = help.getHelp("bidding");
		showHelpMessage("Bidding", xx);
	} else if (txt == "roundThis") {
		const thisRound = cp.theRoundInPlay;
		if (thisRound == null) {
			showHelpMessage("This Round", "You have not yet started a Set yet, so no Round is in play.");
			document.getElementById("helpDropDownMenu").reset();
            return;
		}
		console.log("serNbrOfRndInPlay= " + serNbrOfRndInPlay);
		const rndLtr = serNbrOfRndInPlay.charAt(3);
		const xx = help.getHelp("round", rndLtr);
        showHelpMessage("This Round", xx);
	} else if (txt == "roundNext") {

		const theSet = setBeingPlayed;

		if (theSet == null) {	
			showHelpMessage("Next Round", "You have not yet started a Set yet, so no Round is in play.");
			document.getElementById("helpDropDownMenu").reset();
			return;
		}
		const nextRndLtr = setBeingPlayed.getTypeOfNextRnd();
		const xx = help.getHelp("round", nextRndLtr);
		showHelpMessage("Next Round", xx);
	}
	document.getElementById("helpDropDownMenu").reset();
	console.log("script.getHelpFromMenu  bottom" );
	return;


	/*
	let buf = ""
	const gameType = cp.gameType;
	if (gameType == null) {
		buf == "You have not yet started a Set yet, so no Round is in play.";
		alert(buf);
		helpDropDownMenu.reset();
		return
	} else {
		const rndLtr = setBeingPlayed.getTypeOfNextRnd();
		console.log("rndLtr  " + rndLtr);
		const xx = help.getHelp("round", rndLtr);
		alert(xx);
		helpDropDownMenu.reset();
		return;
	}*/


	
	/*
	const theSetInPlay = setBeingPlayed;
    let nextRoundType = "";
	if (theSetInPlay == null) {
		buf == "You have not yet started a Set yet.";
		alert(buf);
		return
	} else {
		nextRoundType = theSetInPlay.getTypeOfNextRnd();
		console.log("nextRoundType  " + nextRoundType);
		const nextItfType = theSetInPlay.getitfTypeFromRound(nextRoundType);
        console.log("nextItfType  " + nextItfType);
	}

	if (itfType == 'B') {
		buf += "The current game requires Bidding in which each player bids how many correct answers they think they can provide.\n\n They do this by clicking on the bid buttons above each player's name.\n\n";
		buf += "When bidding time is up, the player with the highest bid must immidiately answer the challenge.\n";
		if (nextRoundType == itfType) {
			buf += "\nThe next Round is similar to the current one."
		} else {
			if (nextRoundType == 'D') {
				buf += "The next Round requires the players to select a date."
			} else if (nextRoundType == 'L') {
				buf += "The next Round requires the players select alocation on a map or object."
			} else if (nextRoundType == 'I') {
				buf += "The next Round requires the players identify something as it is slowly exposed.  When a player "
			}
			buf += "\nThe next Round is Game type " + nextRoundType + ".\n";
			//if(nextRoundType == '')
		}
	}
    alert(buf);
	
	return;

	if(txt == "roundNext"){
		if(setBeingPlayed == null){
			alert("There is no Set in play at this time.");
			return;
		}else{
			const rndLtr  = setBeingPlayed.getTypeOfNextRnd();
			console.log("rndLtr  " + rndLtr );
			const xx = cp.help.getHelp("round",rndLtr);
			alert(xx);			
			return;
		}
	}else if(txt == "bidding"){
		console.log("  ++++ "  );
		const xx = cp.help.getHelp("bidding","xx");
		alert(xx);
		return;
	}
	console.log("  *** "  );

	const rnd = cp.theRoundInPlay;
	if(rnd == null){
		alert("There is no Round in play at this time.");
		return;
	}
	console.log("rnd  " + rnd.serNbr );
	const rndLtr = rnd.serNbr.charAt(3);
	const xx = cp.help.getHelp(txt,rndLtr);
	console.log("xx  " + xx);
	alert(xx);
	*/
	/*
	if(confirm(xx)){
		console.log("open web page"  );
		const type = cp.help.gameType;
		let theURL = "Help/GameType"+ type + ".html"
		console.log("theURL  " + theURL );
		window.open(theURL, '_blank').focus();
		open(url, '_blank').focus();
	}else{
		console.log("selected Cancel"  );		
	}*/
	
}
/*
gp setUpPlayers data = 0; Peter; 94566; 12; 10 | 1; Helen; 94066; 12; 10
, SetFromSelection,,,,,,,,, 
Rnd; AA.Uen00038; 10; 100; Books / Quotes;Complete the Quotes from Poems and Books.;, 
Rnd; AA.Uen00030; 9; 100; Authors;Complete the Names of Famous Authors;, 
SetFromSelection,,,,,,,,, 
Rnd; AA.Uen00046; 11; 100; Books / Quotes;Complete the Quotes from Poems and Books.;, 
Rnd; AA.Uen00042; 9; 100; Authors;Equate the Author with the Work.;,

*/


function setUpPlayers() {
	console.log("gp setUpPlayers top");//RndSelTest
	constructClasses();
	const data = localStorage.getItem("regData");
	if (data == null) {
		/* alert() blocked, so the redirect below only ran once the player
		   had read the message. TSDModal.alert() does not block -- navigate
		   from onConfirm so the dialog is actually seen. */
		const goSetup = function () { window.location.href = "setup.html"; };
		if (window.TSDModal && typeof TSDModal.alert === "function") {
			TSDModal.alert({
				title:     "Registration Needed",
				message:   "You will need to register first.\n\n(We only ask for a first or nick name.)",
				icon:      "help",
				onConfirm: goSetup
			});
		} else {
			alert("You will need to register first. \n\n(We only ask for a first or nick name.");
			goSetup();
		}
		return;
	}

	console.log("gp setUpPlayers data  = " + data);//0;Peter;94566;12;10|1;Helen;94066;12;10,FromReg,PRA1_1842,20
	const arr = data.split(",");
	listItemsInArr(arr, " FROM setUpPlayer", 0, 400, true);
    const playerData = arr.shift();//Net to get this before fiding out is single player mode.
	const typeInput = arr[0];
	if (arr[1] == "true") {
        singlePlayerMode = true;
	}
	console.log("singlePlayerMode=  ", singlePlayerMode);
	plu.setPlayerNames(playerData);
	if (typeInput == "FromReg") {
		setSerNbr = arr[2];
        console.log("Script setSerNbr= " + setSerNbr); 
		startSet(setSerNbr);
	} else if (typeInput == "SetFromSelection") {
		const aSetFromSelection = arr.join(",");
		console.log("aSetFromSelection  " + aSetFromSelection);
		setBeingPlayed = new Set(aSetFromSelection);//This should set up the set and start the game.

	}
	console.log("gp setUpPlayers Bottom ");
}

function makeBid(ltrNbr) {console.log("script.makeBid() = " + ltrNbr );
	bidButs.makeBid(ltrNbr);
}

function procBid() {
	bidButs.procBid();

}

function constructClasses(){console.log("script.constructClasses setUp = " + setUp );
	if(!setUp){
		help = new Help();
		cp = new ControlPanel();
		cp.init();
		plu = new PlayerLineUp(cp);
		settings = new Settings();
		settings.init();
		setUp = true;
		console.log("script. (abp === null)= " + (abp === null));
	}
}

//document.getElementById("nextRoundBut").style.display = "none";
//document.getElementById("checkBut").style.display = "none";


function setDefaultTextSize(n){
	defaultTextSize = n;

}

function setRegDataXX(theRegData){console.log("script.setRegData " + theRegData );
	let regData = theRegData;
}

function setRegData(theRegData) {
	regData = theRegData; // assign to the global declaredearlier
}


function getRegData(){console.log("script.getRegData " );
	return regData;

}

function setVolume(n){console.log("script.setVolume " + n );
	volume= n;
}

function showResults(){console.log("script.showResults " );
	cp.plu.readOutRndScore();
}

function click(){
	const snd = new Audio("Audio/ButClick.mp3");
	snd.play();
}

function displayHelp(){console.log("script.displayHelp" );
  // helpDropDownhelpDropDownconst el = document.getElementById("helpDropDown");
	const indx = helpDropDown.selectedIndex;
   console.log("indx=  "  + indx );   
	const selection = helpDropDown.value;
   console.log("selection=  -"  + selection + "-" );


   let prob = "";

	switch (selection) {
		case "GettingStarted":
			//window.location.href = "Help/Terms.html";
			window.open("Help/GettingStarted.html", '_blank').focus();
			break;

		case "Terms":
			//window.location.href = "Help/Terms.html";
			window.open("Help/Terms.html", '_blank').focus();
			break;
		case "Score":
			//window.location.href = "Help/Score.html"
			window.open("Help/Scoreing.html", '_blank').focus();
			break;
		case "ThisRound":
			if(cp == null){
				 showHelpMessage("No Set in Play", "You have not yet started a Set yet.")
				 break;
			}else if(setBeingPlayed == null){
				 showHelpMessage("No Set in Play", "You have not yet started a Set yet.")
				 break;
			}
			const thisRndType = setBeingPlayed.getTypeOfNextRnd();
			let helpType = getHelpForThisTypeRound(thisRndType);
			console.log("thisRndType=  "  + thisRndType + "  helpType= " + helpType);
			let theURL = "Help/GameType"+ helpType + ".html"
			window.open(theURL, '_blank').focus();

			break;
		case "NextRound":
			if(cp == null){
				 showHelpMessage("No Set in Play", "You have not yet started a Set yet.")
				 break;
			}else if(setBeingPlayed == null){
				 showHelpMessage("No Set in Play", "You have not yet started a Set yet.")
				 break;
			}
			const nextRndType = setBeingPlayed.getTypeOfThisRnd();
			helpType = getHelpForThisTypeRound(thisRndType);
			console.log("thisRndType=  "  + thisRndType + "  helpType= " + helpType);
			theURL = "Help/GameType" + thisRndType + ".html"
			window.open(theURL, '_blank').focus();
			break;
		}
	
}

function getHelpForThisTypeRound(thisRndType){ console.log("script.getHelpForThisTypeRound " + thisRndType );
		let type = "X";
		switch (thisRndType) {
			case "B":
			case "E":
			case "E":
			case "O":
			case "P":
			case "Q":
			case "U":
		type = "B";

			case "D":
			case "N":
			case "L":
			break;
		type = "D";
			break;
			case "I":
		type = "I";
		}
	return type;
}

	

function getDefaultFontSize(){ console.log("script.getDefaultFontSize() " + defaultTextSize );
		let size = "medium";
		switch (defaultTextSize) {
			case 1:
				size = "small";
				break;
			case 2:
				size = "medium";
				break;
			case 3:
				size = "large";
				break;
			case 4:
				size = "x-large";
				break;
			case 5:
				size = "xx-large";
				break;
			}
		console.log("script.getDefaultFontSize() " + size );
		return size;
	}


function uniButClick(){console.log("script.uniButClic= " );
	cp.itf.ub.uniButClick();
}

function regPlayers(){ console.log("script.regPlayer  onNet= " + onNet);
	//doNetTest();
	cp = new ControlPanel();
	cp.init();
	const startData = localStorage.getItem("regData");
	cp.mapData(startData);
}

function explainNextRound(){console.log("script.explainNextRound " );
	cp.itf.explainNextRound();
}


function explainThisRound(){console.log("script.explainThisRound ");
	console.log("cp " + cp);
	if(cp == null){
		showHelpMessage("Not Ready Yet", "You need to register and start a Set first.");
	}else{
		cp.itf.explainThisRound();
	}

}

function explainNextRound(){console.log("script.explainNextRound ");
	cp.itf.explainNextRound();

}


function doNetTestXX(){//Both locatons have a file that returns a different string
	const netTest = new NetTest();
	const test = netTest.test();
	console.log("doNetTest = " + test);
	if(test == "offNet"){
		onNet = false;
	}else{
		onNet = true;
	}
	console.log("onNet= " + onNet);
}



function playRndFromTB(){console.log("script.playRound ");
	if(cp == null){
		cp = new ControlPanel();
		cp.init();
	}
	if(cp.theGameInPlay != null){
		cp.theGameInPlay.cleanUpPlayArea;
	}
	cp.playRndFromTB();
}


function startRoundFromSerNbr(){console.log("script.startRoundFromSerNbr "  );
	const serNbr = document.getElementById("roundSerNbr").value;
	console.log("serNbr " + serNbr  );
	//await cp.startRnd(serNbr, false);
	cp.startRnd(serNbr, false);
}


function startRnd() {//From StrtRnd Button
	console.log("script.startRnd >> cp.startRnd()");
	const theRnd = rndMenu.value;

	console.log("script theRnd= " + theRnd);  
	//await cp.startRnd(theRnd);
	cp.startRnd(theRnd,false);
}


function startSet(theSetSerNbr,from){console.log("script.startSet top  " + theSetSerNbr + " from  " + from);
	//this.error();
	//const setSerNbr document.getElementById("'setMenu").value
	if(theSetSerNbr == null || theSetSerNbr == undefined){
		theSetSerNbr = document.getElementById("setMenu").value;
		console.log("XXX  " + theSetSerNbr )
	}
	console.log("script.theSetSerNbr  " + theSetSerNbr );

	console.log("ABC 1 "  )
	cp.startSet(theSetSerNbr,"script348");
	console.log("ABC 2 "  )

	console.log("script.startSet bottom "  );
}


function clearScoreXX(){console.log("script.sclearScore "  );
	document.getElementById("pt0").textContent = ""
	document.getElementById("pt1").textContent = ""
}

function startProgram(){console.log("script startProgram() " );
	cp = new ControlPanel();
	cp.init();
	help = new Help();
}


function setDotTime(){//Usedby gameL when the first player selects a location
	playOver = false;
	dotSec = 3;
	dotInterval =  setInterval(runDotClock,500);

}

function runDotClock() {
	console.log("srunDotClock() " + dotSec);
	if (dotSec > 0) {
		dotSec--;
	} else if (!playOver) {
		cp.theGameInPlay.hideDot();
		playOver = true;
		clearInterval(dotInterval);
	}
}

let flashInterval = 0.1;

function flashAnObject(theObject,theFlashCount,lengthOfFalsh){console.log("flashAnObject times= " + theFlashCount + "  length= " + lengthOfFalsh + "  Object " + theObject)
	flashObject = theObject;
	flashCount = theFlashCount;
	flashInterval =  setInterval(runflashClock,(lengthOfFalsh * 250));//quarter seconds
}

function runflashClock(){
	if (flashCount > 0) {
        flashCount--;
		if(flashOn){
			flashObject.style.display = "block";
			flashOn = false;
		}else{
			flashObject.style.display = "none";
			flashOn = true;
		}
    }else {
		flashObject.style.display = "block";
		flashOn = true;
		clearInterval(flashInterval);
    }
}





function gameQAnsXX(theValue){console.log("script.butHit  "  + theValue);
	gameQ.butHit(theValue);
}

function ansHit(x,y,anAns){console.log("script. ansHit " + x + " " + y + " " + anAns)
	cp.theGameInPlay.ansHit(x,y,anAns)
}



function setUpTheClock(timeLim){console.log("script setUpClock " + timeLim)
	seconds = timeLim;
	orgSec  = timeLim;
}

let removePanelInterval = 0.1;
function removePanels(){console.log("script removePanels  " + butCount + " panelRemovalPause=  "  + panelRemovalPause );
	if(!panelRemovalPause){
		 if (butCount > 0) {
			cp.theGameInPlay.removeAPanel();
;			cp.audX.playSnd("ding");
			butCount--;
		  }else {
			 clearInterval(removePanelInterval); // Stop the timer
			////cp.theGameInPlay.checkPlay();
		  }
	}
}

function stopPanelRemoval(){console.log("stopPanelRemoval()  " );
	butCount = 0;
	clearInterval(removePanelInterval);
}

function startPanelRemoval(bCnt,int){console.log("script startPanelRemoval  " + bCnt + "  " + int);
	cp.audX.setFile("ding",0.5);
	//abc();
	butCount = bCnt;
	removePanelInterval =  setInterval(removePanels,(int * 1000));
}

//let clockInterval = 0.1;

function startTheClock(){console.log("script startClock  "  + seconds);//Started by itf
	clockInterval =  setInterval(runTheClock,1000);
}
function runTheClock() {//console.log("script runTheClock  " + seconds + " interval " + interval);
	if (!clockIsPause) {
		if (seconds > 0) {
			seconds--
			const sec = Math.round(seconds);
			timeBox.value = sec + '-Sec';
			scoreFac = sec / orgSec;
			let count = null;
			if (sec == 20) {
				count = new Audio("Audio/Sec20.wav");
			} else if (sec == 15) {
				count = new Audio("Audio/Sec15.wav");
			} else if (sec == 10) {
				count = new Audio("Audio/Sec10.wav");
			} else if (sec < 6) {
				const txt = "Audio/Nbr" + sec + ".wav"
				count = new Audio(txt);
			}
			if (count != null) count.play();
		} else {
			console.log("script runTheClock Time's up! ");
			timeBox.value = 'Time\'s up!';
			seconds = 0;
			clearInterval(clockInterval); // Stop the timer
			count = new Audio("Audio/TimesUp.wav");
			count.play();
			cp.theGameInPlay.checkPlay("timedOut" );

		}
	}
}


//let hold5 = false;

function setBidTimexx(n){console.log("script setBidTime  "  + n);
	bidClockTime = n;
}


 function pausePanelRemoval(){console.log("SS pauseButRemoval top "  )
	 //pausedPanelNbr =document.getElementById("ptsThisPlay").textContent;
	 panelRemovalPause = true;
	//console.log("SSpauseButRemova bottom ausedPanelNbr= " + pausedPanelNbr )
 }

 function unPausePanelRemoval(){console.log("SS  unPausePanelRemoval pausedPanelNbr= " + pausedPanelNbr);
	//document.getElementById("ptsThisPlay").textContent = pausedPanelNbr;
	 panelRemovalPause = false;
 }

 function cleanPlayArea(){console.log("script.cleanPlayArea()" )
      clearInterval(interval);
	  stopThePtFac();
	  stopPanelRemoval();
	  cp.itf.cleanPlayArea();
	  hideAnsBox();
	  disableAnsBut();
	  disableNextRndBut();
	  //timeBox.style.cursor = "pointer";//???
 }

function stopThePlayClock(reason){console.log("script.stopClock seconds = " + seconds + " orgSec= " + orgSec + " reason = " + reason  + "  playInProgress=   " + cp.itf.playInProgress);
	if (!cp.itf.playInProgress) return;
    timeWhenClockStoped = seconds;
	timeFac = seconds / orgSec;
	seconds = 0;
    clearInterval(interval);
	cp.itf.setTimeBonusPts(timeFac);
	//cp.theGameInPlay.checkPlay(reason);
	return timeWhenClockStoped;
 }

function setUpTheIncreasingPtFac(startFac,inc,stopPt){console.log("script startFac" + startFac + " inc = " + inc)
	ptFac = startFac;
	stopPt = stopPt;
	ptInc = inc;
	///ptFacDoc =  document.getElementById("ptFac");//djustPtFacUp
	interval = setInterval(adjustPtFacUp, 1000);
	console.log("script startFac" + startFac + " inc = " + inc)
}

function adjustPtFacUp(plusMinus) {
	//console.log("script adjustPtFacUp  " + ptFac + "   " + stopPt + "   " + ptInc);
	//console.log("adjustPtFac ptFacDoc  " +  ptFacDoc)
	if (ptFac >= 1 && ptFac < stopPt) {///We need to stop somewhere
		ptFac+= ptInc;
		///ptFacDoc.innerHTML = "Point Factor: " + ptFac.toFixed(3)
	} else {
		console.log("script adjustPtFac XXX ");
		///ptFacDoc.innerHTML = "Point Factor: 1.0";
		clearInterval(interval); // Stop the timer
	}
} 

function setUpAndStartThePtFac(startFac, inc, stopPt) {
	console.log("script setUpAndStartThePtFac  " + ptFac);
	ptFac = startFac;
	stopPt = stopPt;
	ptInc = inc;
	///ptFacDoc = document.getElementById("ptFac");
	interval = setInterval(adjustPtFacDown, 1000);
}



function stopThePtFac(){console.log("script stopThePtFac  ");//used bu GameN deprecated
        clearInterval(interval);
}


/*startRound
document.getElementById('butStartProgram').addEventListener("click", function(){ 
	console.log("script  addEventListener for butStartGame "  );
	startProgram(); 
});
*/


function regPlayersAndDisplaySelForm(){console.log("script regPlayersAndDisplaySelForm()  "  );
	cp.itf.reg2Players();
	cp.itf.removeInputForm();
	cp.sp.displaySelForm();

}






//   console.log("  " + );

//document.getElementById('butStartSet').addEventListener("click", function(){ 
	//console.log("script  addEventListener for butStartGame "  );
	//startSet(); 
//});

function butHit(txt){console.log("script.butHit() " +  txt);
	
	cp.itf.butHit(txt);//Redirect
}

function startRoundList(nbr){
	//cp = new ControlPanel();
	//cp.init();
	cp.startRoundList(nbr);
}




function setUpObjects(){console.log("setUpObjects()"  );
	//cp = new ControlPanel();
	//cp.init();
}


function startGame(){//AA.Men00021
	console.log("script startGame() TOP"  );
	//const testArray = ['one','two','three','four'];//	   console.log(" startGame "   + butLtr);
	//console.log(" testArray = " + testArray);
	const utl = new Utl();
	///const itf = new Interface();
	let nbr =0;
	utl.init();
	//cp = new ControlPanel();
	cp.utl = utl;
	console.log("***************** startGame "   + nbr++);
	//cp.init();
	const plu = new PlayerLineUp();
	plu.init();
	//plu.registerPlayer("Peter,14,94566");
	//plu.registerPlayer("Paul,12,94723")
	//plu.registerPlayer("Mary,11,93466");
	//plu.registerPlayer("Joe,12,94723")
	cp.addPlayerLineUp(plu);
	cp.setFirstPlayerNbr(0);
	
	const el = document.getElementById("ddmSerNbr");
    console.log(" el = " + el );
	const theSerNbr = el.value;
	const sampleData = getData(theSerNbr,"D")
	console.log(" startGame sampleData="   + sampleData)

	const sampleRound = getData(theSerNbr,"R")
	console.log(" startGame sampleRound="   + sampleRound);

	//cp.startGame(sampleRound,sampleData);
	console.log("function startGame() BOTTOM"  );
	//plu.addToPlayerScore(0,27);
	//const ss = plu.getPlayerScore(0);
	//console.log(" plu.getPlayerScore() " + ss);
}


let theGameInPlay = null;

function checkGame(){
	console.log("checkGame " + theGameInPlay)

}

function removeLastCommaXXX(data){console.log("removeLastComma " + data)
	const n = data.length();
	if(data.chatAt(n-1 == ",")){
		data = datasubstring(0,n-1);
	}
	return data;
}

function removeLastComma(data) {
	if (typeof data !== 'string') return data;
	let n = data.length;
	if (n === 0) return data;
	while (n > 0 && (data.charAt(n - 1) === ',' || data.charAt(n - 1) === ' ' || data.charAt(n - 1) === '\n' || data.charAt(n - 1) === '|')) {
		n--;
	}
	return data.substring(0, n);
}



function onDrop(event) {
  const id = event
    .dataTransfer
    .getData('text');
	const draggableElement = document.getElementById(id);
	const dropzone = event.target;
	dropzone.appendChild(draggableElement);
	event
    .dataTransfer
    .clearData();
}

function onDragStart(event) {
  const id = "draggable-1";
  event.dataTransfer.setData('text/plain', event.target.id);
  event.currentTarget.style.backgroundColor = 'yellow';
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  dropzone.appendChild(draggableElement);
  event.dataTransfer.clearData();
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  const id = event.dataTransfer.getData('text');
}



class Image{
	constructor(path,x,y,w,h){
		this.path = path;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}


function alphaButHit(butLtr){
	   console.log("script alphaButHit "   + butLtr);//	           console.log("  "  );
}




function test(){//           console.log("  = " +  );
    

}


function disableButton(butID){
	const but = document.getElementById(butID);
	but.disabled = true;
}
function enbleButton(butID){
	const but = document.getElementById(butID);
	but.disabled = false;
}


function setButtonAsSelected(butID){
	const but = document.getElementById(butID);//"background-color:aquamarine;";
	but.style="background-color:LightCoral";
	but.disabled = true;
}

function setButtonAsNotSelected(butID){
	const but = document.getElementById(butID);
	but.disabled = false;
	but.style="background-color:aquamarine";

}

function hideButton(butID){
	const but = document.getElementById(butID);
	but.hidden=true;
}

function showButton(butID){
	const but = document.getElementById(butID);
	but.style="background-color:aquamarine;";
	but.hidden=false;
}

class MovableButtonX{
	constructor (text,rank,id,game){
		this.id = id
		this.text = text;
		this.rank = rank;
		this.cantMoveBack = false;           //          console.log(" = " + );
		this.width = 300;
		this.height = 40;
		this.game = game;
	}
	 setHeight(height){
		this.height =height;
	 }

	setWidth(width){	 
		this.width = width;
	}

	setCantMoveBack(){
		this.cantMoveBack = true;
	}

	getDomInsrtText(){
		let buf = "";
		buf+= `<input type="button" id="${this.id}" style="width:${this.width}px;height:${this.height}px" value="${this.text}" >`
		return buf;
	}

	addButListeners(gameName){
		this.game.helloWorld();
        //console.log("script addButListeners.addListener " +   " this.id= " + this.id + " game= " + this.game.toString());
		let el = document.getElementById(this.id);
		if(el){
			el.addEventListener("mousedown", function(){
				console.log("mousedown" + this.id);
				gameName.butHit("mousedown",this.id);
			})
			el.addEventListener("mouseup", function(){
				console.log("mouseup" + this.id);
				gameName.butHit("mouseup",this.id);
			});
		}
	}
	getRank(){
		return this.rank;	
	}
	getText(){
		return this.text;
	}
}

function getImageSize(szCode){//{console.log("getImageSize = " +  szCode);
	//const orgSize = penAltPart.substring(0,2);
	let width = (szCode.charCodeAt(0) -64) * 32;
	let height = (szCode.charCodeAt(1) -64) * 32;
	//console.log("width = " + width + " height= " + height);//192 128
	if(szCode.length > 2){
		const adjustingCodeWidth = szCode.charAt(2);//'Example -cc'
		if(adjustingCodeWidth != "-"){
			const n = adjustingCodeWidth.charCodeAt(0);
			if(n > 96) {
				width = width - ((n - 96) * 32)
			}else{
				width = width + ((n - 64) * 32)
			}
		}
		const adjustingCodeHeight = szCode.charAt(3);//'Example -cc'
		if(adjustingCodeHeight != "-"){
			const n = adjustingCodeHeight.charCodeAt(0);
			if(n > 96) {
				height = height - ((n - 96) * 32)
			}else{
				height = height + ((n - 64) * 32)
			}
		}
	}
	return [width,height]
}


	//(24 keys)�['AA.Qen00004', 'AA.Qen00027', 'AA.Qen00076', 'AA.Qen00009', '', 'AA.Qen00003', 'AA.Uen01219', 'AA.Len00002', 'AA.Men00021', 'AA.Pen00006', 'AA.Oen00001', 'AA.Pen00016', 'AA.Een00002', 'AA.Een00010', 'AA.Uen00045', 'AA.Oen00005', 'AA.Ben00001', 'AA.Ben00478', 'AA.Aen00003', 'AA.Cen00004', 'AA.Den00002', 'AA.Ien00005', 'AA.Nen00001', 'AA.Qen00002']

//Returns the <img> markup for a player's answer marker on the Game D / N
//number line.  Presentation only -- it builds a tag, it decides nothing.
//
//The markers used to come from the ResLibry as Blue/RedUpArrow.AA.jpg.  JPEG
//has no alpha channel, so each arrow arrived inside an opaque WHITE box that
//sat as a white square on the dark panel, and no CSS could clear it without
//also destroying the arrow's colour.  These are the same arrows redrawn as
//local transparent PNGs in the theme's player colours.
//
//pNbr is the player index, NOT a colour: blue = player 0 = left, red =
//player 1 = right, which is the mapping the rest of the game relies on.
function getUpArrowImage(pNbr, id, cls){
	const file = (pNbr == 0) ? "images/BlueUpArrow.AA.png"
	                         : "images/RedUpArrow.AA.png";
	return "<img src='" + file + "' id='" + id + "' class='" + cls + "' alt='' />";
}

//This only works for image files.  There seems to ba a safeguard on browsers to prevent local text file input
//It returns an array of 4 parts: image, HTML insert, width and height
//function getImageFile(fileData,id,other){//@@@@
function getImageFile(fileData,id,other){console.log("getImageFile OnNet= " + onNet);
	if(fileData == undefined || fileData ==  "")return "";
	//if(debug){
		console.log("-|-fileData = " +  fileData)
		console.log("----------fileData = " + fileData);
		console.log("----------id = " + id)
		console.log("----------other = " + other)
	//}
	const returnArray = [];
	const tempArray = (fileData + "").split(".");
	const szCode = tempArray[tempArray.length -2];//QJAB
    console.log("szCode = " + szCode);
	const orgSizeCode=  szCode.substring(0,2);//QJ
	tempArray[tempArray.length-2] = orgSizeCode;//The file does not have the adjustments
	const widthAndHeight = getImageSize(szCode);//get the width and height
    //console.log("widthAndHeight = " + widthAndHeight);
	const width = widthAndHeight[0];
	const height = widthAndHeight[1]
	const n = tempArray.length;//          console.log(" = " + );
	let buf = "";
	const outputArray = [];
	for(let i = 2;i< n-3;i++){
		buf+= tempArray[i] + "/";//          console.log(" = " + 
	}
	buf+= tempArray[n-3] + "/";
	buf+= tempArray[n-3] + "." ;
	buf+= tempArray[n-2] + ".";
											console.log("tempArray[n-1] = " + tempArray[n-1])
	const ttmp = tempArray[n-1].replace(","," ");
											console.log("ttmp = " + ttmp)
	buf+= ttmp;
	console.log("***buf = " + buf);

	let filePath = "";
    console.log("getImageFile buf = "+ buf);
	console.log("getImageFile OnNeT = " + onNet);
	if(onNet==true){
		console.log("getImageFile OnNeTTTTT = " + onNet);
		//filePath = "../../../edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
		filePath = "https://www.edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
	}else{
		filePath = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/" + buf ;
		//filePath = "ResLibry/" + buf;
	}
	
    console.log("|*|filePath = " + filePath)
	let str = "";
	if(id == undefined ){
        str = "<img src='" + filePath ;
	}else{
		str = "<img src='" + filePath + "' id='" + id + "' ";
	}
    console.log("!! str = " + str)
	if (other != null){
		str+= other;
	}
	str+= " />"
	const theImage = document.createElement('img');
	theImage.src = filePath;
	returnArray.push(str)
	returnArray.push(filePath)
	returnArray.push(width)
	returnArray.push(height)
	returnArray.push(theImage)
    console.log("|-| str = " + str + " filePath " + filePath + " width " + width + " height "  + height + "  returnArray " + returnArray)
	return returnArray;
}

function getFilePathToEdugamesFolder(){console.log("getFilePathToEdugamesFolder onNet= " + onNet); 
	if(onNet){
		return "https://www.edugames.com"
		//return "../../";
	}else{
		return "../../HTDocs/public_html/";
	}
}

//    console.log(" = " + );


function getTextFilePath(fileData){//@@@@ }B.AA.Bu.Ge.No.No.US.States.BL.csv
	console.log(onNet   +"->>-fileData = " +  fileData)
	const type = fileData.charAt(1);
    console.log("type = " + type);
	const tempArray = (fileData + "").split(".");
	const n = tempArray.length;//          console.log(" = " + );
	let buf = "";
	for(let i = 2;i< n-3;i++){
		buf+= tempArray[i] + "/";//          console.log(" = " + 
	}
	buf+= tempArray[n-3] + "/";
	buf+= tempArray[n-3]  + "." ;
	buf+= tempArray[n-2] + ".";
	buf+= tempArray[n-1];
    console.log("getTextFile buf = "+ buf);
	let filePath=""
	if(onNet){
		//filePath = "../../../edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
		filePath = "/cgi-bin/GetTextFileTSD.pl?" + buf;
	}else{
		filePath = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/" + buf;

	}
    console.log("|-|filePath = " + filePath)
	return filePath;
}

function getTextFileFromServer(fileData) {console.log(onNet + " Script.getTextFileFromServer " + fileData )
	const filePath = getTextFilePath(fileData);
	console.log("Script.getTextFileFromServer filePath " + filePath)
	if (onNet) {
		fetch(filePath)
			.then(response => response.text())
			.then(data => {
				if (data != null) {
					console.log("data= " + data)
					
					return data
				} else {
					showHelpMessage("Download Failed", "Something went wrong and the text could not be downloaded.");
					return;
				}
			});
	}			
}




function getTextFile(fileData){//@@@@ }B.AA.Bu.Ge.No.No.US.States.BL.csv
    console.log("->>-fileData = " +  fileData)
	const type = fileData.charAt(1);
    console.log("type = " + type);
	const tempArray = (fileData + "").split(".");
	const n = tempArray.length;//          console.log(" = " + );
	let buf = "";
	for(let i = 2;i< n-3;i++){
		buf+= tempArray[i] + "/";//          console.log(" = " + 
	}
	buf+= tempArray[n-3] + "/";
	buf+= tempArray[n-3]  + "." ;
	buf+= tempArray[n-2] + ".";
	buf+= tempArray[n-1];
    console.log("getTextFile buf = "+ buf);
	let filePath=""
	if(onNet){
		//filePath = "../../../edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
		filePath = "/cgi-bin/GetTextFileTSD.pl?" + buf;
	}else{
		filePath = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/" + buf;

	}
    console.log("|-|filePath = " + filePath)
	return filePath;
}

//

function listItemsInArr(theArr,text,strtChar,endChar){
	let buf = "" + text + ":\n****  *****\n";
	if (strtChar == undefined) strtChar = 0;

	if (endChar == undefined){
		for(let i = 0 ;i < theArr.length;i++){
		buf+= i + "   " + theArr[i] + "\n";
		}
	}else{
		for(let i = 0 ;i < theArr.length;i++){
			if (theArr[i] == undefined) break;
			buf += i + "   " + theArr[i].substring(strtChar, endChar) + "\n";
		}
	}

	buf += "\n***** *******\n"
	console.log(buf);

}

function deComma(txt) {//console.log("script deComma()  --" + txt + "--")//console.log(" = " + ); 
	//txt = document.getElementById("strtNbr").value//The challenge is,,,,
	let lastLtr = txt.length;
	//console.log("lastLtr = " + lastLtr);
	//console.log("1 = --" + txt.charAt(lastLtr-1) + "--");
	//console.log("2 =--" + txt.charAt(lastLtr-2) + "--");
	//console.log("3 =--" + txt.charAt(lastLtr-3) + "--");
	//console.log("4 =--" + txt.charAt(lastLtr-4) + "--");
	//console.log("5 =--" + txt.charAt(lastLtr-5) + "--");

	//for (let i = txt.length-3; i > 0; i--) {
	for (let i = txt.length-4; i > 0; i--) {
		const x = txt.charAt(i)
		//console.log("**  --" + x + "--"); 
		if (x == "," || x== "|" || x== "\n"  || x == " ") {//|  
			lastLtr = i
		} else {
			break
		}
	} 
	//console.log("sCRIPT return   --" + txt.substring(0, lastLtr) + "--")
	return txt.substring(0,lastLtr)
}

function breakOutTextByComma(theText,header,print){
	const theArr = theText.split(",");
	let buf = "****  ****\n" + header;
	for(let i = 0 ;i < theArr.length;i++){
		buf+= i + " - " + theArr[i] + "\n";
	}
		buf+= "\n****  ****";
	if(print){
		console.log(buf);
	}
}


function testA(){	console.log("script testA  cp.theGameInPlay=  " + cp.theGameInPlay)
	   //console.log(" (cp == null) "   + (cp == null));
	   //console.log(" (cp.theGameInPlay == null) "   + (cp.theGameInPlay == null) + " cp.theGameInPlay "  +  cp.theGameInPlay);
		cp.theGameInPlay.testA();
	
}


function testC(){	//console.log("script testC")
	if(onNet == true){
		onNet = false;
	}else if(onNet == false){
		onNet = true;	
	}
	console.log("onNet " + onNet )  
}

function testIfOnNet(){//	console.log("script.AAtestIfOnNet = " + onNet )

	const netTest = new NetTest();
	const xx = netTest.test();
	console.log("script.OnNet = " + xx );
	if(xx == "offNet"){
		onNet = false;
	}
}

console.log('script-This is the Bottom AA');


console.log('script-This is the Bottom BB');




	
	