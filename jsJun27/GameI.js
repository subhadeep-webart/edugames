// JavaScript source code
class GameI extends Game{
	constructor (round,cp,utl){ 
		console.log("GameI.constructor TOP"  );
		super (round,cp,utl);
		//this.procGameData;
		this.rightAns;
		this.ansLstFileDotPath
		let hintButStops = "";
        this.hintArr = [];
		this.butHitCount = 0;
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
		this.init();
	}

	init() {
		console.log("GameI init() Top ")
		this.gameName = "gameI";
		this.gameLtr = "I";
		this.showNotice(this.gameLtr);
	}

	/*
	GameI.procGameData TOP 3   }A.AA.An.Ge.No.No.US.CiStMo.AL.csv Idaho
	,}P.AA.Pi.Ge.No.No.US.ID.Ma.OutlineUpSideDown.DEDD.gif
	,{H--;Western;State;We;didn't;say;it;would;be;right;side;up.;-;Famous;Pototoes;

	*/



		
	startGameI() {
		console.log("startGameI top "  +  (abp == null));
		gamePlayArea.innerHTML = "";
		super.init();
		this.procGameData();
		this.insertImage();

		showAlphaButtons();

		console.log("GameI.this.ansLstFileDotPath " + this.ansLstFileDotPath + "  " + this.rightAns);
		abp.loadData(this.ansLstFileDotPath, this.rightAns);//The sample date is ofr offnet testing
		this.addGridButton();
        //showAlphaButtons();
		enableAnsBut();
		this.procHints();
		//abp.showAlphaButtons()//second use of abp
		cp.itf.setPoints(pointsForThisRound);
		postNoticeCenterDisplay("36,white,Points = " + pointsForThisRound);
		this.playIsOver = false;
        panelRemovalPause = false;//This is the default but we need to reset it for the next game	
		if (this.displayType == "Focus") {
			startPanelRemoval(this.cols, 5);
		} else {
			startPanelRemoval(this.butIdArr.length, 5);
		}
		console.log("startGameI BOTTOM "  );//        console.log("GameI. "  + );
	}

	procHints() {//this.nbrOfButs
		console.log("GameI.procHints " + this.hints);
		this.hintArr = this.hints.split(";");
		const nbrOfHints = this.hintArr.length;
        const NbrButtsPerHintStop = Math.round(this.nbrOfButs / nbrOfHints);
		this.hintButStops = [];
		for (let i = 0; i < nbrOfHints; i++) {
			const hintStop = NbrButtsPerHintStop * (i + 1);
			this.hintButStops += "-" + hintStop + ";";
		}
		console.log("hintButStops " + this.hintButStops);
		
		
	}



	showABP() {
		abp.style.display = "block";
	}

	checkPlay(txt) {console.log("GameI checkPlay  " + txt);
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
			this.showAnswerInQuestionBar(this.rightAns + ".The Hints were: " + this.hints);
			this.removeAllButs();
			enableNextRndBut();
			abp.hideAlphaButtons(0);
			abp.hideAlphaButtons(1);
			stopPanelRemoval();
			disableAnsBut();
			postNoticeCenterDisplay("24", "green", "NO WINNER = NO POINTS");
			logRoundPlay(this.playDetails);
			stopGameLNDTimer();
			//cp.itf.setGameOver();
		} else {
			alert("The Round will continue.");
		}
    }

	insertAnsBar(){console.log("GameI InsertAnsBar "  );
		let buf = `<td id="gameISelBox"></td>>`
		ansBar.innerHTML = buf;

	}

	cleanPlayArea() {
		console.log("GameI cleanUpPlayArea  ");//this.theAnsBar
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
		/*
		let el = document.getElementById("butABPSubmit0");
		if(el != null)el.remove();
		el = document.getElementById("butABPSubmit1")
		if (el != null) el.remove();
		*/
		let el = null;
		for(let j = 0;j <butIDs.length;j++){
			el = document.getElementById(butIDs[j]);
			if(el != null)el.remove();
		}

		abp.cleanUp();

		//abp.hideBothAlphaBars();
		////insrtPt.innerHTML = "";
        //abp = null;
	}

	removeAllButs() {
		console.log("***********removeAllButs" + this.butIdArr);
		if (this.displayType == "Focus") {
			this.removeAllFocusPanels();
		} else {
				const nbr = this.butIdArr.length;
				for (let i = 0; i < nbr; i++) {
				const aBut = this.butIdArr[i];
				//console.log("GameI.But  = " + aBut);
				const butToRemove = document.getElementById(aBut);
				if (butToRemove != null) butToRemove.remove();
			}
		}
	}
	removeAllFocusPanels() {
		console.log("removeAllFocusPanels() " + this.butIdArr);
		for (let i = 0; i < this.rows; i++) {
			const butID = 'but' + i + 'X0';
			const el = document.getElementById(butID);
			if(el != null)el.remove();
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
		this.hints = this.gameDataArray[2];
		console.log("GameI.procGameData  ansLstFileDotPath " + this.ansLstFileDotPath + "  rightAns " + this.rightAns + " imageFile " + this.imageFile + " hints " + this.hints);

	}

	


	placeBlockOuts(blockOuts){console.log("|||placeBlockOuts " + blockOuts )
		let color = "blue"
		let loc = ""
		const nbrOfBlockOuts = blockOuts.length;
        this.ptDecInc = (100 / nbrOfBlockOuts).toFixed(0);

		for (let j = 0; j < nbrOfBlockOuts;j++){
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

		const imageFile = getImageFile(this.imageFile, "gameIImage");
		//console.log("imageFile0 " + imageFile[0])
		//console.log("imageFile1 " + imageFile[1])
		//console.log("imageFile2 " + imageFile[2])		
		this.imageWidth = imageFile[2];
		console.log("imageFile3 " + imageFile[3])
		this.imageHeight = imageFile[3];
		//console.log("imageFile4 " + imageFile[4])
		imageInsertPt.width=this.imageWidth;
		imageInsertPt.innerHTML = imageInsertPt.innerHTML + imageFile[0];

 		//console.log("$$$$$$$$$$$ this.imageWidth " + this.imageWidth);

	}// 		  console.log("gameI butHit() " + butID);


    removeAllFucusPanels() {
		console.log("removeAllFucusPanels " + this.butIdArr + " this.displayType  " + this.displayType);	
		if (this.playIsOver) return;
		this.focusButHeight = 0;

		const theHeight = this.focusButHeight + "px";

		for (let i = 0; i < this.rows; i++) {
			const butID = 'but' + i + 'X0';
			const el = document.getElementById(butID);
			el.style.height = theHeight;
		}
		cp.itf.reduceThePts(100);
	}

	addHint() {
		console.log("addHint()  " )
		let buf = qBox.textContent;
		const nextHint = this.hintArr.shift();
		if (nextHint == undefined) {
			buf += "No more hints";
		} else {
			buf += nextHint + ", ";
		}
		qBox.textContent = buf;
	}


	removeAPanel() {console.log("removeAPanel "  + " this.displayType  " + this.displayType + "  "  + this.playIsOver);
		//if (this.displayType == "Focus") {
			//this.removeAllFocusPanels();
            //return;
		//}
		if (this.playIsOver) {
			console.log("this.playIsOver " + this.playIsOver);
			return;
		}
		const n = this.hintButStops.indexOf(this.butHitCount);

		console.log("n " + n + "  hintButStops " + this.hintButStops + "  indexOf " + n);
		if (n > 0) { 
            this.addHint();
		}

		this.butHitCount--;
		console.log("this.butHitCoun " + this.butHitCount );
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
			this.focusButHeight -= this.focusButInc;
			if (this.focusButHeight < 1) {
                this.removeAllButs();
			}
			const theHeight = this.focusButHeight + "px";
			console.log("theHeight " + theHeight );
			for(let i = 0;i< this.rows;i++){
				const butID = 'but' + i + 'X0';
				const el = document.getElementById(butID);
				if(el != null)el.style.height = theHeight;
			}
		}else{
			const aBut = this.butIdArr.shift();
			const aButDoc = document.getElementById(aBut);
            console.log("aButDoc  " + aButDoc + "  aBut " + aBut);
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


	//DisplayType=Focus TypeSelection=Author Rows=12 Cols=8
	addFocusButtons(){console.log("**************addFocusButtons  "  + this.rows  );
		const butArr =[];
		let bufBut = "";
		let nbr = 0;
        this.ptDecInc = (100 / (this.rows)).toFixed(0);
		for(let i = 0;i< this.rows;i++){
			const butID = 'but' + i + 'X0';
			butArr.push(butID);
			bufBut+=`<button class='butX'  id='${butID}' ></button>\n`;       
		}
		this.imageInsertPt.innerHTML = this.imageInsertPt.innerHTML + bufBut;
		this.positionButtons();
	}

	positionFocusButtons(){console.log("positionFocusButtons= " + this.rows + "   " + this.cols );
		const theHeight  = Math.round(this.imageHeight/this.rows);
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
	showNotice(type) {
		console.log("GameI showNotice  " + type);
		let buf = `<font size="5">The next game requires you to identify the name of an image that is slowly being exposed as the possible point award decreases.

		In addition, word clues may be provided to help identify the image.<br><br>

		 <img src="images/MenuSelection.jpg" width="319" align="left" height="316" alt="" title="DropDown Menu Instructions">

		Above each player's name is a list of letters <br>(<b>1</b>), that if pressed,

		</b> will display a pull down menu <br>(<b>2</b>) that when pressed will list

		of all the possible answers <br>(<b>3</b>) starting with that letter.`;

		if (singlePlayerMode) {
			buf += "<br><br>NOTE:Wrong answers and giving up will net negative 10 points.</font>"
		} else {
			buf += "<br><br>NOTE:A wrong answer will award points to the apposing player.</font>"
		}
		buf += '<br><br><br><br> <div style="text-align:center; font-size:24px;"><input type="button" style="text - align:center;font-size:24px;" onclick="gameI.startGameI()" value="Start Round"></div';

		console.log("GameI buf  " + buf);
		gamePlayArea.innerHTML = buf;
	}

	butHitXX(butID) {
		//console.log("gameI butHit() " + butID + " butHitCount " + ++this.butHitCount);
		const but = document.getElementById(butID);
		but.hidden = "true";
	}

	showNoticeXX(type) {
		let buf = "<font size='4'>";
		if (type == "I") {
			buf += "The next game requires you to identify the name of an image that</b> is slowly being exposed as the possible point award decreases.</b>";
			buf += " In addition, word clues may be provided to help identify the image.";
		}
		buf += "Above each player's name is a list of letters [A-Z], that if pressed,</b> will present a pull down menu of all the possible answers starting with that letter.";
		buf += "</b>Player wil have a limited time to answer</b>";
		if (singlePlayerMode) {
			buf += "An incorrect answer will award negative points</b>";
		} else {
			buf += "An incorrect or no answer will award the points to the opposit player and the game will continue.";
		}

		//<div style="text-align:center; font-size:24px;"><input type="button" style="text-align:center; font-size:24px;" onclick="gameN.startPlay()" value="Start Round"></div>`


		buf += ' <div style="text-align:center; font-size:24px;"><input type="button" style="text - align:center;font-size:24px;" onclick="gameI.startGameI()" value="Start Round"></div';

		gamePlayArea.innerHTML = buf;


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

	loadAlphaBarXX() {
		console.log("**** GameI loadAlphaBar top" + this.ansLstFileDotPath + "  " + this.rightAns);
		abp.loadData(this.ansLstFileDotPath, this.rightAns);//The sample date is ofr offnet testing
		console.log("**** GameI. loadAlphaBar bottom");
	}



}//Bottom of gameI
