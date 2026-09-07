//'use strict';

// JavaScript source code
console.log('This is the Top');


const fileBase = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry";

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

//ansDataMap.set("","")roundMap.set("","")//	   console.log(" startGame "   + butLtr);


let defaultTextSize = 3;//medium large x-large xx-large

let onNet = true;
let seconds = 0;
let butCount = 0;
let orgSec= 0;
let timeBox = null;
let ptFacDoc = null;
let scoreFac = 1;
let interval = 0.1;
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
//let exp = null;
let stopPt = 2;

let setUp = false;


function constructClasses(){console.log("script.constructClasses setUp = " + setUp );
	if(!setUp){
		cp = new ControlPanel();
		cp.init();
		plu = new PlayerLineUp(cp);
		setUp = true;
	}
}


function setDefaultTextSize(n){
	defaultTextSize = n;

}

function setRegData(theRegData){console.log("script.setRegData " + theRegData );
	let regData = theRegData;
	
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
   const el = document.getElementById("helpDropDown");
   const indx = el.selectedIndex;
   console.log("indx=  "  + indx );   
   const selection =  el.value;
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
				 alert("1) You have not yet started a Set yet.")
				 break;
			}else if(cp.setBeingPlayed == null){
				 alert("2) You have not yet started a Set yet.")
				 break;
			}
			const thisRndType = cp.setBeingPlayed.getTypeOfNextRnd();
			let helpType = getHelpForThisTypeRound(thisRndType);
			console.log("thisRndType=  "  + thisRndType + "  helpType= " + helpType);
			let theURL = "Help/GameType"+ helpType + ".html"
			window.open(theURL, '_blank').focus();

			break;
		case "NextRound":
			if(cp == null){
				 alert("You have not yet started a Set yet.")
				 break;
			}else if(cp.setBeingPlayed == null){
				 alert("You have not yet started a Set yet.")
				 break;
			}
			const nextRndType = cp.setBeingPlayed.getTypeOfThisRnd();
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
		alert("You need to register and start a Set first.");
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

function startRnd(){console.log("script.startRnd > cp"  );
	cp.startRnd();
}
function clearScore(){console.log("script.sclearScore "  );
	document.getElementById("pt0").textContent = ""
	document.getElementById("pt1").textContent = ""
}

function startProgram(){console.log("script startProgram() " );
	cp = new ControlPanel();
	cp.init();
	help = new Help(cp);
}

function startPlay(nbr){console.log("script startPlay nbr= " + nbr)
	cp.itf.startPlay(nbr);

}

function nextRound(){console.log("nextRound " )
	cp.playNextRound();
}

function setDotTime(){//Usedby gameL when the first player selects a location
	playOver = false;
	dotSec = 3;
	interval =  setInterval(runDotClock,500);

}

function flashAnObject(theObject,theFlashCount,lengthOfFalsh){console.log("flashAnObject times= " + theFlashCount + "  length= " + lengthOfFalsh + "  Object " + theObject)
	flashObject = theObject;
	flashCount = theFlashCount;
	interval =  setInterval(runflashClock,(lengthOfFalsh * 250));//quarter seconds
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
		clearInterval(interval);
    }
}



function runDotClock(){
	if (dotSec > 0) {
        dotSec--;
    }else if(!playOver){
		cp.theGameInPlay.hideDot();
		playOver = true;
		clearInterval(interval);
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
	if(timeLim < 8){
		hold5 = true;
	}
    timeBox =  document.getElementById("timeBox");
	ptFacDoc =  document.getElementById("ptFac");
}


function removePanels(){console.log("script removePanels  " + butCount + " panelRemovalPause=  "  + panelRemovalPause );

	if(!panelRemovalPause){
		 if (butCount > 0) {
			cp.theGameInPlay.removeAPanel();
;			cp.audX.playSnd("ding");
			butCount--;
		  }else {
			clearInterval(interval); // Stop the timer
			cp.theGameInPlay.checkPlay();

		  }
	}
}

function stopPanelRemoval(){console.log("stopPanelRemoval()  " );
	butCount = 0;
	clearInterval(interval);
}

function startPanelRemoval(bCnt,int){console.log("script startPanelRemoval  " + bCnt + "  " + int);
	cp.audX.setFile("ding",0.5);
	//abc();
	butCount = bCnt;
	interval =  setInterval(removePanels,(int * 1000));
}

function startTheClock(){console.log("script startClock  "  + seconds);//Started by itf
	  interval =  setInterval(runTheClock,1000);
}

let hold5 = false;

function runTheClock(){//console.log("script runTheClock  "  + seconds);
	if(!clockIsPause){
		  if (seconds > 0) {
			timeBox.innerHTML = seconds + ' Sec';
			seconds--;
			scoreFac = seconds / orgSec ;
			let count = null;
			if(seconds == 20){
				count = new Audio("Audio/Sec20.wav");
			}else if (seconds == 15){
				count = new Audio("Audio/Sec15.wav");
			}else if (seconds == 10){
				count = new Audio("Audio/Sec10.wav");
			}else if (seconds < 6 && seconds > 0 && !hold5){
				const txt = "Audio/Nbr" + seconds + ".wav"
				count = new Audio(txt);
			}
			if(count != null)count.play();
		  }else {
			timeBox.innerHTML = 'Time\'s up!';
			hold5 = false;
			clearInterval(interval); // Stop the timer
			count = new Audio("Audio/TimesUp.wav");
			count.play();
			cp.theGameInPlay.checkPlay("timedOut");
		  }
	  }
 }

 function pausePanelRemoval(){console.log("SSpauseButRemova top "  )
	 pausedPanelNbr =document.getElementById("ptsThisPlay").textContent;
	 panelRemovalPause = true;
	console.log("SSpauseButRemova bottom ausedPanelNbr= " + pausedPanelNbr )
 }

 function unPausePanelRemoval(){console.log("SS  unPausePanelRemoval pausedPanelNbr= " + pausedPanelNbr);
	document.getElementById("ptsThisPlay").textContent = pausedPanelNbr;
	 panelRemovalPause = false;
 }

 function cleanPlayArea(){console.log("script.cleanPlayArea()" )
      clearInterval(interval);
	  stopThePtFac();
	  stopPanelRemoval();
	  cp.itf.cleanPlayArea();
 }

function stopTheClock(reason){console.log("script.stopClock seconds = " + seconds + " orgSec= " + orgSec + " reason = " + reason  + "  playInProgress=   " + cp.itf.playInProgress);
	if(!cp.itf.playInProgress)return;
	  const timeFac = 	seconds / orgSec ;
      clearInterval(interval);
	  cp.itf.setTimeBonusPts(timeFac);
	  //cp.theGameInPlay.checkPlay(reason);
	  return timeFac;
 }

function setUpTheIncreasingPtFac(startFac,inc,stopPt){console.log("script startFac" + startFac + " inc = " + inc)
	ptFac = startFac;
	stopPt = stopPt;
	ptInc = inc;
	ptFacDoc =  document.getElementById("ptFac");//djustPtFacUp
	interval = setInterval(adjustPtFacUp, 1000);
	console.log("script startFac" + startFac + " inc = " + inc)
}

function adjustPtFacUp(plusMinus) {
	//console.log("script adjustPtFacUp  " + ptFac + "   " + stopPt + "   " + ptInc);
	//console.log("adjustPtFac ptFacDoc  " +  ptFacDoc)
	if (ptFac >= 1 && ptFac < stopPt) {///We need to stop somewhere
		ptFac+= ptInc;
		ptFacDoc.innerHTML = "Point Factor: " + ptFac.toFixed(3)
	} else {
		console.log("script adjustPtFac XXX ");
		ptFacDoc.innerHTML = "Point Factor: 1.0";
		clearInterval(interval); // Stop the timer
	}
} 

function setUpAndStartThePtFac(startFac, inc, stopPt) {
	console.log("script setUpAndStartThePtFac  " + ptFac);
	ptFac = startFac;
	stopPt = stopPt;
	ptInc = inc;
	ptFacDoc = document.getElementById("ptFac");
	interval = setInterval(adjustPtFacDown, 1000);
}


function setUpTheDecreasingPtFac(startFac, inc, stopPt) {
	//console.log("script setUpTheDecreasingPtFac" + startFac + "  " + inc + "  " + stopPt )
	ptFac = startFac;
	stopPt = stopPt;
	ptInc = inc;
	ptFacDoc =  document.getElementById("ptFac");
	interval =  setInterval(adjustPtFacDown,1000);
}



function adjustPtFacDown(plusMinus) {
	//console.log("script adjustPtFacDown  " + ptFac );
		//console.log("adjustPtFac ptFacDoc  " +  ptFacDoc)
      if (ptFac > 0.0 ) {///We need to stop somewhere
		  ptFac-= ptInc;		
		  ptFacDoc.innerHTML = "Point Factor: " + ptFac.toFixed(3)		
      }else {
		console.log("script adjustPtFac XXX "  );
        ptFacDoc.innerHTML = "Point Factor: 0.0";
        clearInterval(interval); // Stop the timer
      }
} 



function stopThePtFac(){console.log("script stopThePtFac  ");
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



function startSet(serNbr){console.log("script.startSet top  " +  serNbr);
	if(serNbr == null){
		serNbr = document.getElementById("serNbr").value
	}
	cp.startSet(serNbr);
	console.log("script.startSet bottom "  );
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
	const itf = new Interface();
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

function removeLastComma(data){console.log("removeLastComma " + data)
	const n = data.length();
	if(data.chatAt(n-1 == ",")){
		data = datasubstring(0,n-1);
	}
	return data;
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

//	   console.log("  "  );
/*
document.getElementById('butStartGame').addEventListener("click", function(){ 
	console.log("script  addEventListener for butStartGame "  );
	startGame(); 
});
*/
let abp = null;
let deBug = true;



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
		if(el != null){
			el.addEventListener("mousedown", function(){
				console.log("mousedown" + this.id);
				gameName.butHit("mousedown",this.id);
			})
			el.addEventListener("mouseup", function(){
				console.log("mouseup" + this.id);
				gameName.butHit("mouseup",this.id);
			});
			//el.addEventListener("mousemove", function(){
				//console.log("mousemove" + this.id);
				//this.game.butHit("mousemove",this.id);
			//});
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


	//(24 keys) ['AA.Qen00004', 'AA.Qen00027', 'AA.Qen00076', 'AA.Qen00009', '', 'AA.Qen00003', 'AA.Uen01219', 'AA.Len00002', 'AA.Men00021', 'AA.Pen00006', 'AA.Oen00001', 'AA.Pen00016', 'AA.Een00002', 'AA.Een00010', 'AA.Uen00045', 'AA.Oen00005', 'AA.Ben00001', 'AA.Ben00478', 'AA.Aen00003', 'AA.Cen00004', 'AA.Den00002', 'AA.Ien00005', 'AA.Nen00001', 'AA.Qen00002']

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
	buf+= tempArray[n-1];
	let filePath = "";
    console.log("getImageFile buf = "+ buf);
	console.log("getImageFile OnNeT = " + onNet);
	if(onNet==true){
		console.log("getImageFile OnNeTTTTT = " + onNet);
		filePath = "../../../edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
	}else{
		//filePath = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
		filePath = "ResLibry/" + buf;
	}
	
    console.log("|-|filePath = " + filePath)
	let str = "<img src='" + filePath + "' id='" + id + "' ";
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
    //console.log("|-| str = " + str + " filePath " + filePath + " width " + width + " height "  + height + "  returnArray " + returnArray)
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
		filePath = "../../../edugames.com/DataBase/A65AA65A/ResLibry/" + buf;

	}else{
		filePath = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/" + buf;

	}
    console.log("|-|filePath = " + filePath)

	return filePath;
}



function listItemsInArr(theArr,text,strtChar,endChar,print){
	let buf = "" + text + ":\n****  *****\n";

	if(endChar == ""){
		for(let i = 0 ;i < theArr.length;i++){
		buf+= i + "   " + theArr[i].substring(strtChar,endChar) + "\n";
		}
	}else{
		for(let i = 0 ;i < theArr.length;i++){
		buf+= i + "   " + theArr[i].substring(strtChar,endChar) + "\n";
		}
	}

	buf+= "\n***** *******\n"
	if(print){
		console.log(buf);
	}else{
		return buf;
	}

}

function deComma(txt) {console.log("script deComma()  " + txt)//console.log(" = " + ); 
	
	//txt = document.getElementById("strtNbr").value//The challenge is,,,,
	let lastLtr = txt.length;
	console.log("lastLtr = " + lastLtr); 
	for (let i = txt.length-1; i > 0; i--) {
		const x = txt.charAt(i)
		console.log(" = " + x ); 
		if (x == "," || x== "|" || x== "\n") {
			lastLtr = i
		} else {
			break
		}
	} 
	console.log("return   " + txt.substring(0, lastLtr))
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
function testB(){//    
	cp.theGameInPlay.testB();
}

function testC(){	console.log("script testC")
	if(onNet == true){
		onNet = false;
	}else if(onNet == false){
		onNet = true;	
	}
	console.log("onNet " + onNet )  
}

function testIfOnNet(){	console.log("script.AAtestIfOnNet = " + onNet )

	const netTest = new NetTest();
	const xx = netTest.test();
	console.log("script.BBtestIfOnNet = " + xx );
	if(xx == "offNet"){
		onNet = false;
	}
}







	
	