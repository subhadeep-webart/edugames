// JavaScript source code
/* Route player-facing notices through the shared themed dialog
   (js-ui/tsd-modal.js) instead of the browser's native alert(), falling
   back to alert() if that UI layer is absent.

   Only used where the caller does NOT rely on alert() BLOCKING -- each
   site here returns immediately afterwards. */
function tsdGameINotice(title, body) {
	if (window.TSDModal && typeof TSDModal.alert === "function") {
		TSDModal.alert({ title: title, message: body, icon: "help" });
	} else {
		alert(body);
	}
}

class GameI extends Game{
	constructor (round,cp,utl){ 
		console.log("GameI.constructor TOP");
		console.log("GameI.TOP (abp === null)= " + (abp === null));
		super (round,cp,utl);
		this.procGameData;
		this.rightAns;
		this.ansLstFileDotPath
		this.hints;

		this.butHitCount = 0;
		//this.imageInsertPt;
		this.imageWidth=0;
		this.imageHeight=0;
		this.butIdArr=[];
		this.nbrOfButs =0;
		this.focusButHeight = 0;
		this.focusButInc = 0;
		this.displayType = "";
		this.typeSelection = "";
		this.butIDMap;
		this.authorButArr;
		this.ptDecInc = 0;
		this.imageInsertPt = document.getElementById('imageInsertPt');
		console.log("GameI.constructor Bottom" + cp.theGameInPlay);
		this.playDetails = [];
	}


	init() {
		console.log("GameI init() Top ")
		console.log("GameI.inita (abp === null)= " + (abp === null));
		this.gameName = "gameI";
		this.gameLtr = "I";
		super.init();
		this.procGameData();
		this.insertImage();
		enableAnsBut();
		console.log("GameI.initb (abp === null)= " + (abp === null));
		cp.createAlphaBarPanel();
		console.log("GameI init() AAA ")
		this.loadAlphaBar();
		console.log("GameI init() BBB ")
        abp.showAlphaButtons();
		this.addGridButton();
		cp.itf.setPoints(pointsForThisRound);
		postNoticeCenterDisplay("36,white,Points = " + pointsForThisRound);
		if (this.displayType == "Focus") {
			startPanelRemoval(this.cols, 5);
		} else {
			startPanelRemoval(this.butIdArr.length, 5);
		}
		console.log("GameI.init BOTTOM "  );//        console.log("GameI. "  + );
	}

	//}L.AA.An.Ge.No.No.US.CiStMo.AL.csv Rushmore-Mt.,}P.AA.Pi.Ge.No.No.US.SD.Mo.MtRushmore-1.PI.gif,{H-Northern State;-;4 Presidents;In Stone,


	loadAlphaBar() {
		console.log("GameI. loadAlphaBar top" + this.ansLstFileDotPath + "  "  + this.rightAns);
		const ansListPath = getImageFile(this.ansLstFileDotPath);
		console.log("GameI. (abp === null)= " + (abp === null));
		abp.loadData(this.cp.sampleData, this.ansLstFileDotPath);
		//abp.init();
		abp.setRightAns(this.rightAns);
		console.log("GameI. loadAlphaBar bottom");
	}






	checkPlay(txt) {
		console.log("GameI checkPlay  " + txt);
		if (txt == "remPam") {
			this.removeAPanel();//A work around for the video demo
		}
		console.log("GameI checkPlay()  ");
        abp.checkAnswer("No Answer");

	}

	getButCount() {
		return this.butHitCount
	}

	logPlay(anAns) {
		console.log("GameI logPlay  " + anAns);
        const player = cp.plu.getPlayerByNbr(cp.itf.getCurrentPlayerNbr());
		const buf = player +  "," + anAns ;
        this.playDetails.push(buf);

	}


    showAnswers() {
		console.log("GameI showAnswers()  ");//oracle;auricle,auricle;oracle,kernel;colonel,colonel;kernel,Maine;main,main,}
		if (confirm("Do you want to SHOW THE ANSWER and end this Round with no winers?")) {
			//this.show
			qBox.textContent = qBox.textContent + "\nThe Correct Answer is: " + this.rightAns;
			this.removeAllButs();
			enableNextRndBut();
			abp.hideAlphaBar(0);
			abp.hideAlphaBar(1);
			stopPanelRemoval();
			disableAnsBut();
			postNoticeCenterDisplay("24", "green", "NO WINNER = NO POINTS");
			logRoundPlay(this.playDetails);
			stopGameLNDTimer();
            cp.itf.setGameOver();
		} else {
			tsdGameINotice("Round Continues", "The Round will continue.");
		}
    }

	insertAnsBar(){console.log("GameI InsertAnsBar "  );
		let buf = `<td id="gameISelBox"></td>>`
		ansBar.innerHTML = buf;

	}

	cleanPlayArea(){console.log("GameI cleanUpPlayArea  "  );//this.theAnsBar
		super.cleanPlayArea();
		const gamePlayArea= document.getElementById('gamePlayArea');
		let collection = gamePlayArea.children;
		for(let j = 0;j <collection.length;j++){
			collection[j].remove();
		}
		collection = this.imageInsertPt.children;
		for(let j = 0;j <collection.length;j++){
			collection[j].remove();
		}
		const focusButs = document.getElementsByClassName("butX");
		const butIDs = [];
		for(let j = 0;j <focusButs.length;j++){//id='butABPSubmit${j}'
			butIDs.push(focusButs[j].id);
		}
		let el = document.getElementById("butABPSubmit0");
		if(el != null)el.remove();
		el = document.getElementById("butABPSubmit1")
		if(el != null)el.remove();
		for(let j = 0;j <butIDs.length;j++){
			el = document.getElementById(butIDs[j]);
			if(el != null)el.remove();
		}
		////insrtPt.innerHTML = "";
        abp = null;
	}

	removeAllButs(){console.log("***********removeAllButs" + this.butIdArr);
		const nbr =this.butIdArr.length;
		for(let i = 0;i< nbr;i++){
			const aBut = this.butIdArr[i];
			const butToRemove = document.getElementById(aBut);
			if(butToRemove != null)butToRemove.remove();
		}
	}

	reset(){console.log("GameI.reset " +  cp.theGameInPlay);

	}

	startPlay(){console.log("GameI  startPlay" );
		pausePanelRemoval();

	}

//Cols=8,}L.AA.An.Ge.No.No.US.CiStMo.AL.csv Rushmore-Mt.,}P.AA.Pi.Ge.No.No.US.SD.Mo.MtRushmore-1.PI.gif,{H-Northern State;-;4 Presidents;In Stone
//Cols=8,}A.AA.An.Ge.No.No.US.CiStMo.AL.csv Iwo Jima-Memorial,

	procGameData(){console.log("GameI.procGameData TOP "  +  this.gameDataArray.length + "   " + this.gameDataArray);
		cp.itf.gameOver = false;//It may be true from last game
		this.displayType = this.round.rndMap.get('DisplayType');
		if(this.displayType == "Focus"){
			this.typeSelection = "focus";//we need to override author
		}else{
			this.typeSelection = this.round.rndMap.get('TypeSelection');
		}

		const ansLstAndAnswer = this.gameDataArray[0];
		const tmp = ansLstAndAnswer.split(' ');
		this.ansLstFileDotPath = tmp[0];
		this.rightAns = tmp[1];
		for(let j= 2;j< tmp.length;j++){
			this.rightAns+= " " + tmp[j]//The right ans may have spaces
		}
		this.imageFile = this.gameDataArray[1];
		this.hints =this.gameDataArray[2];
	}


	placeBlockOuts(blockOuts){console.log("|||placeBlockOuts " + blockOuts )
		let color = "blue"
		let loc = ""
		for(let j= 0;j< blockOuts.length;j++){
			//console.log(j + " --//-   "  + blockOuts[j]);//{B-1magenta 143182057029
			[color,loc] = blockOuts[j].split(" ");
			//const top = loc.substring(0,3);
			//const left = loc.substring(3,6);
			const left = loc.substring(0,3);
			const top = loc.substring(3,6);

			const width = loc.substring(6,9);
			const height = loc.substring(9);
			let buf = "<button id='"+ j + "' class='butX' ";
			buf+= ` style.top='${top}'  style.left='${left}' style.width='${width}' color='${color}' style.height='${height}' >${j}</button>`;
			//console.log("++ buf= " + buf )
			//console.log("this.imageInsertPt " + this.imageInsertPt )
			this.imageInsertPt.innerHTML = this.imageInsertPt.innerHTML + buf;
		}
		for(let j= 0;j< blockOuts.length;j++){
			//console.log(j + " --|||-   "  + this.butIdArr);//{B-1magenta 143182057029
			[color,loc] = blockOuts[j].split(" ");
			//const top = loc.substring(0,3);
			//const left = loc.substring(3,6);
			this.butIdArr.push(j);
			const left = Number(loc.substring(0,3));
			const top = Number(loc.substring(3,6));

			const width = Number(loc.substring(6,9)) + "px";
			const height = Number(loc.substring(9,12)) + "px";
			const el = document.getElementById(j);			
			el.style=`left: ${left}px; top:${top}px; z-index:50; `//
			el.style.width = width ; el.style.height = height;
			
			//console.log("getWidth= " + el.width );   
			//console.log("getHeight= " + el.getHeight );   

		}
		this.butIdArr.reverse();
			console.log( " --|||-this.butIdArr********   "  + this.butIdArr);

	}


	insertImage(){console.log("######insertImage "  +  this.imageFile);

		const imageFile = getImageFile(this.imageFile,"gameIImage");
		//console.log("imageFile2 " + imageFile[2])		
		this.imageWidth = imageFile[2];
		//console.log("imageFile3 " + imageFile[3])
		this.imageHeight = imageFile[3];
		//console.log("imageFile4 " + imageFile[4])
		imageInsertPt.width=this.imageWidth;
		imageInsertPt.innerHTML = imageInsertPt.innerHTML + imageFile[0];

		// The stage magnification has to suit the picture. A single global
		// zoom was tuned for the small question images (some are only 128px
		// across and unreadable at 1:1), but the same factor enlarges an
		// already-large map like the Washington street plan to ~1370px, so
		// the fixed-pixel cover panels swamp the artwork and bury its street
		// labels. Aim for a consistent on-screen size instead: magnify small
		// pictures a lot, large ones barely at all.
		// The stage is centred in the play area, so whatever it does not
		// claim shows as empty margin down both sides. 620px was a fixed
		// figure sized for a narrow window; on a wide one it left the
		// artwork as a small block adrift in the middle of the band.
		//
		// Track the play area instead, so the board grows with the screen.
		// Both bounds matter: the floor keeps small windows exactly where
		// they were, and the ceiling stops a huge monitor blowing a 128px
		// question image up into a wall of artefacts.
		//
		// Safe because the stage scales as ONE unit -- #imageInsertPt's
		// zoom moves the image and its absolutely-positioned cover panels
		// together, so they stay registered whatever the target. And if a
		// tall picture then overflows the band, tsd-fit-screen.js lowers
		// --tsd-gi-fit to bring it back, so this can only ever ask.
		const playW = (typeof gamePlayArea !== "undefined" && gamePlayArea)
			? gamePlayArea.clientWidth : 0;
		const playH = (typeof gamePlayArea !== "undefined" && gamePlayArea)
			? gamePlayArea.clientHeight : 0;
		let TARGET_W = 620;     // the width the stage would like to occupy
		if (playW > 0) {
			TARGET_W = Math.round(playW * 0.92);
			// The 620 floor is a DESKTOP floor: it stops a small window
			// shrinking the stage below the size the artwork was drawn for.
			// It must never apply when the play area is genuinely narrower
			// than that, or the stage is forced WIDER than the screen --
			// on a 330px phone a 416px map was blown up to 513px, so the
			// cover panels spilled over the map and buried it.
			//
			// Only raise to the floor when there is actually room for it.
			if (TARGET_W < 620 && playW >= 620) TARGET_W = 620;
			if (TARGET_W > 1000) TARGET_W = 1000;
		}
		const MAX_ZOOM = 3.3;   // unchanged for the smallest pictures
		if (this.imageWidth > 0) {
			let z = TARGET_W / this.imageWidth;

			// Width alone under-uses the band for a WIDE, SHORT picture: it
			// hits the width cap with vertical room still free, and the
			// stage sits as a letterbox strip with empty space above and
			// below. Work out what the height would allow as well and take
			// whichever bound is REACHED FIRST, so the limiting dimension
			// wins and the picture grows until it touches one edge.
			//
			// Aspect ratio is untouched -- this only chooses the single
			// uniform zoom, so image and cover panels still scale together
			// and stay registered.
			if (playH > 0 && this.imageHeight > 0) {
				const zH = (playH * 0.92) / this.imageHeight;
				if (zH < z) z = zH;      // height is the tighter bound
			}

			if (z > MAX_ZOOM) z = MAX_ZOOM;

			// "Never below natural size" is right on a desktop, where the
			// band is always wider than the artwork and shrinking would
			// throw away detail for no reason. On a phone it is wrong: a
			// 416px map cannot be shown at 1:1 in a 330px area, and forcing
			// it to try is what pushed the picture and its cover panels
			// past the edge of the screen.
			//
			// So the floor holds only while the picture actually FITS.
			// Below that, allow z < 1 so the stage scales down to the room
			// it has -- image and panels together, still registered, since
			// this is the one uniform zoom for both.
			const fitsW = (playW <= 0) || (this.imageWidth  <= playW);
			const fitsH = (playH <= 0) || (this.imageHeight <= playH);
			if (z < 1 && fitsW && fitsH) z = 1;

			// A hard floor so a very large picture on a very small screen
			// cannot collapse to something unreadable; below this the fit
			// scaler and the page's own scrolling take over.
			if (z < 0.35) z = 0.35;
			imageInsertPt.style.setProperty("--tsd-gi-stage-zoom", z);
			console.log("stage zoom for " + this.imageWidth + "x" + this.imageHeight
				+ " image = " + z);
		}

 		console.log("$$$$$$$$$$$ this.imageWidth " + this.imageWidth);

	}// 		  console.log("gameI butHit() " + butID);


	removeAPanel(){//console.log("removeAPanel " + this.butIdArr + " this.displayType  " + this.displayType);
		if (this.playIsOver) return;
		this.butHitCount
		if(this.typeSelection == "Author" && this.displayType != "BlockOut"){
			const butNbr =  Number(this.authorButArr.shift());
			const butToRemove = this.butIDMap.get(butNbr);
			//console.log("butNbr -" + butNbr + "-  ||  -" +  butToRemove + "-")
			if(butToRemove != null){
				const aButDoc = document.getElementById(butToRemove);
				aButDoc.hidden="true";
			}else{
				cp.itf.setGameOver();//We have run out of panels and no one has ventrued to try an answer
			}
		}if(this.displayType == "Focus"){console.log("removeAPanel " + this.focusButHeight + "   " + this.focusButInc);
			this.focusButHeight-=this.focusButInc;
			const theHeight = this.focusButHeight + "px";
			for(let i = 0;i< this.rows;i++){
				const butID = 'but' + i + 'X0';
				const el = document.getElementById(butID);
				el.style.height = theHeight;
			}
		}else{
			const aBut = this.butIdArr.shift();
			const aButDoc = document.getElementById(aBut);

			if(aButDoc != null){
				aButDoc.hidden="true";
			}else{
				//console.log("$$$aButDoc = null" + aBut);
			}
		}
		
		cp.itf.reduceThePts(this.ptDecInc);
	}

	hideAllButs(){//console.log("hideAllButs()" + this.butIdArr);
		const remaininfButCount = this.butIdArr.length;
		for(let i = 0;i< remaininfButCount;i++){
			const aBut = this.butIdArr.shift();
			const aButDoc = document.getElementById(aBut);
			aButDoc.hidden="true";
		}
		stopPanelRemoval();
	}

	addFocusButtons(){console.log("**************addFocusButtons"   );
		const butArr =[];
		let bufBut = "";
		let nbr = 0;
		for(let i = 0;i< this.rows;i++){
			const butID = 'but' + i + 'X0';
			butArr.push(butID);
			bufBut+=`<button class='butX'  id='${butID}' ></button>\n`;       
		}
		this.imageInsertPt.innerHTML = this.imageInsertPt.innerHTML + bufBut;
		this.positionButtons();
	}

	positionFocusButtons(){console.log("positionFocusButtons= " + this.rows + "   " + this.cols );
		const theHeight            = Math.round(this.imageHeight/this.rows);
		this.focusButInc = Math.round(theHeight/this.cols);//The cols are the substitute for the number of increments
		this.focusButHeight = theHeight //The starting point 
		const butHeight = theHeight + "px"
		const butWidth = this.imageWidth + "px"
		for(let i = 0;i< this.rows;i++){
			const butID = 'but' + i + 'X0';
			const el = document.getElementById(butID);
			const xLoc = 0 ;
			const yLoc = i * theHeight ;
			el.style=`left: ${xLoc}px; top:${yLoc}px; z-index:50; `//
			el.style.width = butWidth ; el.style.height = butHeight;            
		}
			//console.log("*******  ||    ************ this.imageWidth"  + this.imageWidth );//
	}

	addGridButton(){//console.log("******************* addGridButton top"   );//		console.log("= " + );
		if(this.typeSelection == "Author"){
			this.butIDMap = new Map();
			const seq = this.round.rndMap.get("Sequence");
			if(seq != undefined){
				this.authorButArr = this.round.rndMap.get("Sequence").split(";");//this.authorButArr
			}
		}
		this.displayType=this.round.rndMap.get("DisplayType")
		if(this.displayType == "Focus"){
			this.addFocusButtons();
			return;
		}if(this.displayType == "BlockOut"){
			this.placeBlockOuts(this.gameDataArray.slice(3));
		}else{
			const butArr =[];
			let bufBut = "";
			let nbr = 0;
			let butID = "";
			let butNbr = 0;
			for(let i = 0;i< this.rows;i++){
				for(let j= 0;j< this.cols;j++){
					const butID = 'but' + i + 'X' + j;
					if(this.typeSelection == "Author"){
						this.butIDMap.set(++butNbr,butID);
						//console.log( butNbr +  "  *||*  " + butID +  " ***  -" + this.butIDMap.get(butNbr)+"-");
					}
					butArr.push(butID);
					bufBut+=`<button class='butX'  id='${butID}' ></button>\n`;
				}            
			}
			this.imageInsertPt.innerHTML = this.imageInsertPt.innerHTML + bufBut;		
			this.butIdArr = cp.utl.mixUpArray(butArr);
			this.positionButtons();
			this.nbrOfButs = butArr.length;
			this.ptDecInc = (100/this.nbrOfButs).toFixed(0);
		}
	}

	positionButtons(){//console.log("positionButtons= " + this.rows + "   " + this.cols );
		this.displayType=this.round.rndMap.get("DisplayType")
		if(this.displayType == "Focus"){
			this.positionFocusButtons();
			return;
		}
		const width             = Math.round(this.imageWidth/this.cols);
		const height            = Math.round(this.imageHeight/this.rows);
		const theWidth = width + "px"
		const theHeight = height + "px"
		for(let i = 0;i< this.rows;i++){
			for(let j= 0;j< this.cols;j++){
				const butID = 'but' + i + 'X' + j;
				const el = document.getElementById(butID);
				const xLoc = j * width ;
				const yLoc = i * height ;
				el.style=`left: ${xLoc}px; top:${yLoc}px; z-index:50; `//
				el.style.width = theWidth ; el.style.height = theHeight;
			}            
		}
	}
	butHitXX(butID) {
		//console.log("gameI butHit() " + butID + " butHitCount " + ++this.butHitCount);
		const but = document.getElementById(butID);
		but.hidden = "true";
	}

	/*submitAnsxx(){console.log("abp checkAnswer " +  this.adp.getMenuSelection());
		const theSelection = this.adp.getMenuSelection();
		if(this.rightAns == theSelection){
			console.log("abp checkAnswer Success  " );
			cp.itf.displayPtsThisPlay ("passed");
			this.hideAllButs();
			console.log("aaa " );
			cp.itf.setGameOver();
			console.log("bbb " );
			stopPanelRemoval();
			stopThePlayClock("End of Play");
		}else{
			console.log("abp checkAnswer Failure  " );
			cp.itf.displayPtsThisPlay ("failed")
			//pauseButRemoval();
		}
		unPausePanelRemoval();
		console.log("**********submitAns  bottom" ) ;
	}

		submitAnsXX(){console.log("gameI submitAns " );
		const theAns = this.adp.getSelection();
		console.log("theAns " + theAns);		
	}*/


}//Bottom of gameI
