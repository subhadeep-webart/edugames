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

//ansDataMap.set("","")roundMap.set("","")//	   console.log(" startGame "   + butLtr);




let onNet = false;
let seconds = 0;
let butCount = 0;
let orgSec= 0;
let timeBox = null;
let ptFacBox = null;
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




function regPlayers(){ console.log("script.regPlayer  onNet= " + onNet);
	cp = new ControlPanel();
	cp.init();
	//onNet = document.getElementById("onNet").checked;
	const netTest = new NetTest();
	const test = netTest.test();
	console.log("test= " + test);
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



function setUpTheClock(timeLim){console.log("script setUpClock" + timeLim)
	seconds = timeLim;
	orgSec  = timeLim;
    timeBox =  document.getElementById("timeBox");
	ptFacBox =  document.getElementById("ptFac");
}


function removePanels(){//console.log("script removePanels  " + butCount);
	if(!panelRemovalPause){
		 if (butCount > 0) {
			//console.log("script helloWorld()   " + cp.itf.helloWorld());
			cp.theGameInPlay.removeAPanel();
			butCount--;
		  }else {
			clearInterval(interval); // Stop the timer
			cp.theGameInPlay.checkPlay();
		  }
	}
}

function stopPanelRemoval(){//console.log("stopPanelRemoval()  " );
	clearInterval(interval);
}




function startPanelRemoval(bCnt,int){console.log("script startPanelRemoval  " + bCnt + "  " + int);
	butCount = bCnt;
	interval =  setInterval(removePanels,(int * 1000));

}

function startTheClock(){console.log("script startClock  "  + seconds);//Started by itf
	  interval =  setInterval(runTheClock,1000);
}

function runTheClock(){//console.log("script runTheClock  "  + seconds);
	if(!clockIsPause){
		  if (seconds > 0) {
			timeBox.innerHTML = seconds + ' Sec';
			seconds--;
			scoreFac = seconds / orgSec ;
		  }else {
			timeBox.innerHTML = 'Time\'s up!';
			clearInterval(interval); // Stop the timer
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

 function cleanUpPlayArea(){console.log("script.cleanUpPlayArea()" )
      clearInterval(interval);
	  stopThePtFac();
	  stopPanelRemoval();
	  //cp.theGameInPlay.cleanUpPlayArea();
	  cp.itf.cleanUpPlayArea();
 }


function stopTheClock(reason){console.log("script.stopClock seconds = " + seconds + " orgSec= " + orgSec + " reason = " + reason  + "  playInProgress=   " + cp.itf.playInProgress);

	if(!cp.itf.playInProgress)return;
	  const timeFac = 	seconds / orgSec ;
      clearInterval(interval);
	  cp.itf.setTimeBonusPts(timeFac);
	  cp.theGameInPlay.checkPlay(reason);
	  return timeFac;
 }


function setUpThePtFac(startFac,inc){console.log("script startFac" + startFac + " inc = " + inc)
	ptFac = startFac;
	ptInc = inc;
	ptFacBox =  document.getElementById("ptFac");
	//console.log("setUpThePtFac ptFacBox  " +  ptFacBox)
}

function startThePtFac(){console.log("script startThePtFac  " );//Started by itf
	  interval =  setInterval(adjustPtFac,1000);
}


function adjustPtFac(plusMinus){//console.log("script adjustPtFac  " +  );
		//console.log("adjustPtFac ptFacBox  " +  ptFacBox)
      if (ptFac > 1 && ptFac < 4) {///We need to stop somewhere
		  ptFac-= ptInc;		
		  ptFacBox.innerHTML = ptFac.toFixed(3)		
      }else {
        ptFacBox.innerHTML = 1;
        clearInterval(interval); // Stop the timer
		cp.itf.endPlay();
      }
} 

function stopThePtFac(){console.log("script stopThePtFac  ");
        clearInterval(interval)
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



function startSet(){console.log("script.startSet"  );
	const serNbr = document.getElementById("serNbr").value
	const aSet = cp.createSet(serNbr);
	console.log("AAAAA"  );
	//console.log(  aSet.listRnds() );
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
		filePath = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
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

function getFilePathToEdugamesFolder(){
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










	
	