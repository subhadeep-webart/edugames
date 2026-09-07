// JavaScript source code

class GameB extends Game{//console.log("GameB  = " + );
	constructor(round, context) {
		super(round, context);
		this.context = context;

		console.log("GameB GameContext.ui.bidButs == null = " + (GameContext.ui.bidButs == null));
		console.log("GameB context == null = " + (context == null));
		console.log("GameB context.ui == null = " + (context.ui == null));
		console.log("GameB context.ui.bidButs == null = " + (context.ui.bidButs == null));


		//this.cp = cp;
		////this.utl = utl;
		//this.plu = plu;
		this.itf;
		this.boxWidth;
		this.boxHeight;
		this.maxWidth;
		this.rightAnsArray=[];
		this.theRCAnswers;//used for type G
		this.playerArray = [];//The answers from each player
		this.curAnsCnt = 0;
		this.curWcnt = 0
		this.curRcnt = 0
		this.checkedRC = []
		this.ansDotLoc= [];
		this.theImage;
		this.theImageDoc;
		this.idArr=[];
		this.pSel=[4];
		this.gridMap;
		this.isSelMap;
		this.typeTAnswers;
		this.recArray=[];
		this.nameArray =[];
		this.image;
		this.imageName;
		this.imageArray =[];
		this.imageWidth;
		this.imageHeight;
		this.imagePath;
		this.context.ui.ansBar;
		this.justAnswered = [];
		this.alreadyAnswered = [];
		this.hitCnt =0;
		this.butInfo="";
		this.ckMrks =[];
		this.dotId =[];
		this.gameType = "B"
		this.picHeight = 0;
		this.ansBarAllreadyAnswered = "";
		this.displayData = "";
		this.timeLeft = 30;
	}

	init(){console.log("GameB.init TOP"  );
		super.init();
		////this.setAnsBar();
		console.log("GameB.before procData()");
		this.procData();
		console.log("GameB.after procData()");
		this.context.ui.bidButs.showButDisplay();
		this.context.ui.bidButsstartBidClock();
		console.log("GameB.init BBBBOTTOM "  +  this.gameInPlay  + "  this.theRCAnswer= " + this.theRCAnswers);// 
	}

	cleanPlayArea() {
		console.log("******GameB cleanUpPlayArea  ");//this.context.ui.ansBar
		super.cleanPlayArea();
		///hideJustAnswered();
		
		for (let j = 0; j < this.rightAnsArray.length; j++) {//Is we had show answers
			const el = document.getElementById(this.rightAnsArray[j]);
			console.log(" el= " + el);
			if(el != null)el.remove();
		}
		for (let j = 0; j < this.dotId.length; j++) {
			const el = document.getElementById(this.dotId[j]);
			if (el != null) el.remove();
		}
		if (this.context.ui.ansBar != undefined) {
			this.context.ui.ansBar.style = "display: none;";
		}
		if (imageInsertPt != undefined) {
			imageInsertPt.innerHTML = "";
			const collection = imageInsertPt.children;
			for (let j = 0; j < collection.length; j++) {
				console.log("&&collection[j]= " + collection[j])
				collection[j].remove();
			}
		}
		if (gameInsrtPt != undefined) {
			const collection = gameInsrtPt.children;
			for (let j = 0; j < collection.length; j++) {
				console.log("--collection[j]= " + collection[j])
				collection[j].remove();
			}
		}
		console.log("******GameB cleanUpPlayArea EE");
	}

	getPlayDetails() {
		return this.playDetails;
	}


	helloWorldXX(){
		console.log("GameB.helloWorld" );//console.log("GameA  = " + );
		super.helloWorld();
	}

	showAnswers() {
		console.log(this.butType + " (((( gameB showAnswers() " + this.rightAnsArray);//R1C3,R2C2,R3C2

		switch (this.butType) {
			case 'M':
				addTxtToABox("  The correct answers are outlined with a Dotted Green Border");
				for (let i = 0; i < this.rightAnsArray.length; i++) {
					const cell = document.getElementById(this.rightAnsArray[i]);
					console.log("cell= " + cell);
					cell.style.borderColor = "green"; // Change the border color
					cell.style.borderWidth = "8px"; // Optional: Adjust border width
					cell.style.borderStyle = "dotted";
				}
				break;
			case 'G':
				addTxtToABox("  The correct answers have a Yellow Square in the middle");
				this.postAnswers();
				break;
			case 'T':
				showAnsBox("The questing was:" + theQuestion + "\n\nThe correct answers are:\n" + this.rightAnsArray);
				break;
				
		}
		
	}


	//in the following java script code, I am trying to place putple dots on images in an image grid. The images keep moving over  to the right
	//with each placement.How do I get the images to be placed correctly >

	postAnswers() {//R1C1,R1C4,R2C3,R2C4,R3C2,R3C3,R3C4,1,1,1,4,2,3,2,4,3,2,3,3,3,4
		console.log("**********postAnswers()  " + this.rightAnsArray);
		//const dotHalfWidth = 12;
		//const dotHalfHeight = 12;
		const dotHalfWidth = 18;
		const dotHalfHeight = 6;

		for (let i = 0; i < this.context.ui.bidButs.butMax   ; i++) {//this.ansDotLoc.length
			//let yellowSquare = "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/YellowSquare/YellowSquare.AA.jpg' ";
			  let yellowSquare = "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/YellowBar/YellowBar.AA.jpg' ";
			const aLoc = this.rightAnsArray[i];
			const yLoc = aLoc.charAt(1);
			const xLoc = aLoc.charAt(3);
			const dotXLoc = (xLoc * this.boxWidth) - (this.boxWidth / 2) - dotHalfWidth;
			const dotYLoc = (yLoc * this.boxHeight) - (this.boxHeight / 2) - dotHalfHeight;
			yellowSquare += "id='" + aLoc + "'";
			//yellowSquare += " width='24' class='yellowSquare' height='24' />";
			yellowSquare += " width='36' class='yellowSquare' height='12' />";
			console.log(" yellowSquare=   " + yellowSquare)
			gameInsrtPt.innerHTML = gameInsrtPt.innerHTML + yellowSquare;
			const theImageDot = document.getElementById(aLoc);
			theImageDot.style = `left: ${dotXLoc}px; top:${dotYLoc}px; z-index:50; `//
			console.log(aLoc + "  " + xLoc + "  " + yLoc + "  " + dotXLoc + "  " + dotYLoc + "   " + theImageDot.style.left + "   " + theImageDot.style.top) ;

		}
	}

	startPlay() {console.log("GameB  startPlay ")	
		this.hitCnt = 0;
		this.justAnswered = [];
		//this.playOn = true;
	}

	testA(){console.log("GameB testA()" );
		this.cleanPlayArea();
	}

	//As apposed to just answered
	isAllreadyAnswered(theRC) {console.log("isAllreadyAnswere   " + theRC  + " ** " +  this.alreadyAnswered);
		const pos = this.alreadyAnswered.indexOf(theRC);
		if (pos > -1) {
			console.log("alreadyAnswered = true");
			return true;
		} else {
			return false;
		}
	}


	alreadyAnsweredWarning(rc) {	console.log("alreadyAnsweredWarning " + rc)
		postNoticeCenterDisplay("18,white,ALL READY ANSWERED");
		playBeep();
	}

	resetPlay() {
		this.hitCnt = 0;
        this.justAnswered = [];
	}

	aHit(theAns) {
		if (!gameInPlay) return;
		console.log("***aHit theAns= " + theAns + " this.typeAnsText " + this.typeAnsText + " topBid= " + this.context.ui.bidButs.topBid + " biddingInProgress= " + biddingInProgress +  " whoHasBid= "  + bidButs.whoHasBid)
		if (!gameInPlay) {
			console.log("!gameInPlay ")
			return;
		}

		if (biddingInProgress) {
            postNoticeCenterDisplay("18,white,BIDDING STILL IN PROGRESS");
			return;
		}
		for (let i = 0; i < this.justAnswered.length; i++) {
			if (theAns == this.justAnswered[i]) {
				this.alreadyAnsweredWarning(this.justAnswered[i]);
				return;
			}
		}
		if (this.isAllreadyAnswered(theAns)) {
			this.alreadyAnsweredWarning();
			return;
		}

		console.log("***-" + this.typeAnsText + "  targNbr= " + this.context.ui.bidButs.topBid + "   hitCnt= " + this.hitCnt)
		if (this.typeAnsText != "T") {
			if (this.typeAnsText == "G") {
				this.checkMarkIt(theAns);
			}
			if (this.typeAnsText == "M") {
				this.recordImageHit(theAns)
			}
			this.justAnswered.push(theAns);

			console.log(" this.hitCnt= " + (this.hitCnt + 1) + " topBid=  " + this.context.ui.bidButs.topBid) 

			if (++this.hitCnt == this.context.ui.bidButs.topBid) {
				console.log(" Hit Count Reached ");
				this.timeLeft = stopThePlayClock("Hit Count Reached");
				this.checkPlay("hit count reached");
			}
		}
		console.log(" aHit Bottom = " + theAns + "  " + this.checkedRC.length);
	}

	/*
 PRA1_1842,AA.Ben00001,12.13,0,P,2,R1C4-R2C4-
,PRA1_1842,AA.Ben00001,5.56,1,F,1,R1C2-
,PRA1_1842,AA.Ben00001,11.13,0,F,2,R1C1-R1C2-
,PRA1_1842,AA.Ben00001,11.13,0,F,2,R1C2-R1C1-
,PRA1_1842,AA.Ben00001,16.69,1,F,3,R1C3-R1C2-R1C1-
,PRA1_1842,AA.Ben00001,17.69,0,P,3,R3C4-R3C3-R2C3-
,PRA1_1842,AA.Ben00001,10.13,1,P,2,R1C1-R3C2-
*/


	logPlay(reason) {
		console.log("GameB.logPlay reason= " + reason + "bidButs.topBid=  " + this.context.ui.bidButs.topBid);
		let pf = "F"
		if (reason == "passed") {
			pf = "P";
		}
        let buff = "";
		for (let j = 0; j < this.rightAnsArray.length; j++) {
            buff += "-" + this.rightAnsArray[j];
		}
		console.log("buff = " + buff);

        let bufff = "";
		let pos = -1;
        let xx = "";
		for (let i = 0; i < this.justAnswered.length; i++) {
			xx = this.justAnswered[i];
			pos = buff.indexOf(xx);
            console.log("xx  = " + xx  + "  "  + pos);
			if (pos > -1) {
				bufff += "+" + xx;
			} else {
				bufff += "-" + xx;			
			}
		}

		let buf = getSetRndData() + "," + GameContext.itf.nowPlaying + "," + this.timeLeft.toFixed(0) + "," + pf + "," + this.context.ui.bidButs.topBid + "," + bufff;

		//for (let i = 0; i < this.justAnswered.length; i++) {
			//buf += this.justAnswered[i] + "-";
		//}

		buf += "\n";
		this.playDetails.push(buf);
        console.log(" GameB playDetails= " + "/n" + this.playDetails);

	}

	getUnAnsweredCount() {


	}


	getPlayDetails() {

        return this.playDetails;	
	}



	checkPlay(reason) {
		console.log("*|*GameB.checkPlay reason= " + reason + " bidButs.topBid= " + this.context.ui.bidButs.topBid + " butType= "  + this.butType)
		////this.playOn = false;//so players can't continue to hit
		const nbrHit = this.justAnswered.length;


		if (nbrHit != this.context.ui.bidButs.topBid) {
			GameContext.itf.displayPtsThisPlay("failed", "Insufficient number of answers");
			this.logPlay("had an insufficient number of answers");
			this.resetPlay();
			return;
		}
		let results = "";
		let pf = "passed";
		const nbrRight = 0;
		let gotOneWrong = false;
		for (let i = 0; i < nbrHit; i++) {//this.rightAnsArray
			const pos = this.rightAnsArray.indexOf(this.justAnswered[i]);
			if (pos == -1) {
				if (!gotOneWrong) {
					results += "  Sorry!\n At least one was wrong.";
					gotOneWrong = true;
				}
				pf = 'failed';
			}
		}
		console.log(" pf= " + pf)

		if (pf == "failed") {
			if (this.typeAnsText == "T") {
				this.context.ui.ansBar.textContent = this.ansBarAllreadyAnswered;
			} else {
				this.logPlay(pf);
				this.unCheckCells();
				this.checkedRC = [];
				this.resetPlay();
			}
		} else {
			results += "CORRECT!"
			this.markTheImages(GameContext.itf.nowPlaying);
			if(this.butType == 'T'){
				this.addToAnsBar(this.justAnswered);
			}
			if (this.typeAnsText == "T") {
				this.ansBarAllreadyAnswered = this.context.ui.ansBar.textContent;
			}
        this.logPlay(pf);
			this.context.ui.bidButs.reduceButtons(nbrHit, reason);

			////if(this.typeAnsText != "G"){//It would be R1C3 
			////this.addToQBar(this.justAnswered);
			////}
			for (let i = 0; i < this.justAnswered.length; i++) {
				this.alreadyAnswered.push(this.justAnswered[i])
			}
		}


		GameContext.itf.displayPtsThisPlay(pf, results);

		console.log("bottom of Game b checkPlay bidButs.remButs " + this.context.ui.bidButs.remButs)
		this.justAnswered = []
		if (this.context.ui.bidButs.remButs > 0) {
			this.resetPlay();
			this.context.ui.bidButs.restartBidding();
		} else {
			console.log("^^^^AAA");
			enableAnsBut();
			enableNextRndBut();
			gameInPlay = false;
			console.log("^^^^BBB");
		}

	}





	checkMarkIt(theRC) {
		console.log(" checkMarkIt  " + theRC + "  " + this.context.ui.bidButs.whoHasBid);
		let imgSrc = "";
		if (onNet) {
			if (this.context.ui.bidButs.whoHasBid == "Blue") {
				imgSrc = "https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/BlueCheckMark/BlueCheckMark.BB.jpg";
			} else {
				imgSrc = "https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg";
			}
		} else {
			imgSrc = onLapTop
				? "ResLibry/Pi/Th/Sy/To/GreenDot/GreenDot.AA.jpg"
				: "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/GreenDot/GreenDot.AA.jpg";
		}
		const theID = "dot" + theRC;
		const theCkMrk = document.createElement("img");

		theCkMrk.src = imgSrc;
		theCkMrk.id = theID;
		theCkMrk.width = 32;
		theCkMrk.height = 32;
		theCkMrk.className = "dot";
		theCkMrk.style.position = "absolute";

		const yLoc = theRC.charAt(1);
		const xLoc = theRC.charAt(3);
		const dotXLoc = (xLoc * this.boxWidth) - (this.boxWidth / 2) - 16;
		const dotYLoc = (yLoc * this.boxHeight) - (this.boxHeight / 2) - 16;

		theCkMrk.style.left = `${dotXLoc}px`;
		theCkMrk.style.top = `${dotYLoc}px`;

		gameInsrtPt.appendChild(theCkMrk);  // This now works because it's a real node

		this.dotId.push(theID); // Needed for cleanup
		console.log(`Added dot: ${theID} at (${dotXLoc}, ${dotYLoc})`);

	}

	

	reAddEventListenerAfterCkMark() {
		console.log("+++reAddEventListenerAfterCkMark() " + this.theImageDoc);
		this.theImageDoc.addEventListener('click', function () {
			console.log("^^^^^^^^^^EVLst = ")
			gameB.gridHit(event.offsetX, event.offsetY);
		});
	}



	procTypeG() {
		console.log("++++++++++++ procTypeG ");

		this.rows = this.round.getAParm("Rows");
		this.cols = this.round.getAParm("Cols");

		console.log("$$$$$$rows  = " + this.rows + " this.cols = " +  this.cols);

		const theFullImage = getImageFile(this.gameDataArray.shift(), "theImage");
		this.theImage = theFullImage[0]
		//console.log("*******theImage  = " + this.theImage );
		//const theImageMod = "<div id='baseImage'> " + theImage + "</div>"
		console.log("#####this.theImage  = " + this.theImage);
		gameInsrtPt.innerHTML = gameInsrtPt.innerHTML + this.theImage;
		this.theImageDoc = document.getElementById("theImage");

		this.theImageDoc.addEventListener('click', function () {
			console.log("^^^^^^^^^^EVLst = " )
			gameB.gridHit(event.offsetX, event.offsetY);
		});

		this.picWidth = theFullImage[2];
		this.picHeight = theFullImage[3]
		this.boxWidth = this.picWidth / this.cols;
		this.boxHeight = this.picHeight / this.rows;
		this.createGridMap(this.picWidth, this.picHeight, this.boxWidth, this.boxHeight, this.rows, this.cols);
		this.theRCAnswers = this.gameDataArray[0];
		console.log(" this.theRCAnswers = " + this.theRCAnswers);
		this.rightAnsArray = this.theRCAnswers.split(";");
		let rightAnCount = this.rightAnsArray.length
		console.log(" rightAnCount = " + rightAnCount);
		console.log(" this.rightAnsArray[rightAnCount-1] = " + this.rightAnsArray[rightAnCount - 1]);

		if (this.rightAnsArray[rightAnCount - 1] == "") {
			rightAnCount--//The last char could be a ;
		}
		console.log("%%%%%% this.rightAnsArray = " + this.rightAnsArray + "   " + this.rightAnsArray.length);
		const theAnswers = this.gameDataArray.shift().split(";");//Usedfor the check mark//R1C1;R1C4;R2C3;R2C4;R3C2;R3C3;R3C4
		this.context.ui.bidButs.topBid = rightAnCount;
		this.context.ui.bidButs.createButs(rightAnCount, "B", this.rows);//Includes fillBoxes


		//console.log("||||||||bidButs.topBid  = " + bidButs.topBid + "  " + theAnswers );
		for (let i = 0; i < this.context.ui.bidButs.topBid; i++) {
			const temp = theAnswers.shift();
			const pos = temp.indexOf("C");
			//console.log(temp + " | "  + pos + " = " + temp.slice(1,pos) + " **  " + temp.slice(pos+1,99));
			const yy = temp.slice(1, pos)//Row comes first and it is the y position
			const xx = temp.slice(pos + 1, 99)
			this.rightAnsArray.push(temp.slice(1, pos) + "," + temp.slice(pos + 1, 99));
			const xDotloc = (xx - 1) * this.boxWidth + this.boxWidth / 2 - 8;// 1/2 the width of the dot
			const yDotloc = (yy - 1) * this.boxHeight + 3;
			//console.log("RC  " + temp +   " xDotloc  = " + xDotloc + " yDotloc  = " + yDotloc);
			this.ansDotLoc.push(temp + ";" + xDotloc + ";" + yDotloc);
		}

		//console.log("|||||this.ansDotLoc  = " + this.ansDotLoc +  "   = " + this.rightAnsArray + " this.theRCAnswers = " + this.theRCAnswers + " this.rightAnsArray= "   + this.rightAnsArray);
	}




	addToQBar(txt){console.log("addToQuestionBar " +  txt)//Clean out wrong answers
		const x = qBox.textContent;
        console.log(" x= " + x)
		qBox.textContent =  x + ", " +  txt;
	}
	// https://trivia-smackdown.com/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Pe/Le/Po/US/Pr/16PopPres/16PopPres.NK.gif 404 (Not Found)





	addToJustAnswered(ans){console.log("addToJustAnswered ans= " + ans    )
		const x = this.context.ui.ansBar.textContent;
		console.log("x== " + x   )
		this.context.ui.ansBar.textContent = ans + "," + x;
	}

	addToAnsBar(ans){console.log("addToAnsBar ans= " + ans    )
		const x = this.context.ui.ansBar.textContent;
		console.log("x== " + x   )
		this.context.ui.ansBar.textContent = ans + "," + x;
	}


	setJustAnswered() {
		console.log("Game B setAnsBar ")//For game type T
		showJustAnswered();
		this.context.ui.ansBar.textContent = "Your Answers: ";
	}
	setAnsBar() {
		console.log("Game B setAnsBar ")//For game type T
		showAnsBar();
		this.context.ui.ansBar.textContent = "-";
	}

	getTextAnsFmXY(x,y){console.log("getTexAnsFmXY "  )		
		let anAns = "";
		let gotAHit = false;
		for(let i = 0;i< this.recArray.length;i++){
			const rec = this.recArray[i];
			const recParts = rec.split(';');
			if((x > Number(recParts[0]) && x < (Number(recParts[0]) + Number(recParts[2]))) &&  (y > Number(recParts[1]) && y < (Number(recParts[1]) + Number(recParts[3])))){
				gotAHit = true;
				anAns = this.nameArray[i];
				if(this.hasThisBeenAnswered(anAns)){
					showNoticeA("ALREADY ANSWERED")
					return null;
				}else{
					showNoticeA(anAns);
				}
				return anAns;
			}
		}
		return null;
	}
		
	procAnsTypeT(x, y) {
		console.log("procAnsTyprT butTarg= " + this.context.ui.bidButs.topBid         );
		if (biddingInProgress) {
			//this.biddingInProcessWARNING();
			showNoticeA("BIDDING STILL IN PROGRESS")
			return;
		}
		const anAns = this.getTextAnsFmXY(x,y);
		console.log("anAns= " + anAns );
		//this.addToJustAnswered(anAns);
		this.justAnswered.push(anAns)
		showNoticeA(this.justAnswered);
		if (++this.curAnsCnt == this.context.ui.bidButs.topBid){
			console.log("targNbr reached "  + this.curAnsCnt)		
			stopThePlayClock();
			this.checkPlay("Target Nbr Reached");
		}
		
	}


	hasThisBeenAnswered(anAns){console.log("hasThisBeenAnswered? "  +  anAns)
		const alreadyAnsCnt = this.alreadyAnswered.length;
		const justAnsweredCnt = this.justAnswered.length;
		console.log("alreadyAnsCnt= "  +  alreadyAnsCnt)
		console.log("justAnsweredCnt= "  +  justAnsweredCnt)

		for(let i = 0;i< justAnsweredCnt;i++){
			console.log("this.alreadyAnswered.indexOf(anAns)= "  +  this.alreadyAnswered.indexOf(anAns))
			if (this.justAnswered.indexOf(anAns) != -1) {
				postNoticeCenterDisplay("18,white,Already Answered")
				return true;
			}
		}
		for(let i = 0;i< alreadyAnsCnt;i++){
			console.log("this.alreadyAnswered.indexOf(anAns)= "  +  this.alreadyAnswered.indexOf(anAns))
			if (this.alreadyAnswered.indexOf(anAns) != -1) {
				postNoticeCenterDisplay("18,white,Already Answered")
				return true;
			}
		}
		const justAnsCnt = this.justAnswered.length;
		for(let i = 0;i< justAnsCnt;i++){
			if(this.justAnswered.indexOf(anAns) > 0){
				postNoticeCenterDisplay("18,white,Already Answered")
				return true;
			}
		}
		return false;
	}

	procAnsButtFile() {
		console.log("procAnsButtFile this.rndSerNbr= " + this.round.getSerNbr());
		const buttonFile = this.gameDataArray.shift();//Usually Game type T with am image and overlay of hit areas
		console.log("buttonFile= " + buttonFile);
		let butInfo = "";
		console.log("this.cp.onServer= " + this.cp.onServer);
		//if (this.cp.onServer) {
		if (true) {
			butInfo = getTextFileFromServer(buttonFile);
			console.log("bbutInfo= " + butInfo);
		} else {//Not on server and part of testing
			this.butInfo = this.cp.ansButtons.procData(this.round.getSerNbr());
		}
		//console.log("this.butInfo  = " + this.butInfo);
		const tempArr = this.butInfo.split("Answers=");
		let ansType = "";
		[, ansType] = tempArr.shift().split("=");
		console.log("ansType " + ansType);
		ansType = ansType.charAt(0);
		const pos = this.butInfo.indexOf("Answers=")
		this.typeTAnswers = this.butInfo.slice(pos + 8)
		return ansType;
	}


	procData() {
		console.log("$$$$$$$$$$$GameB procData  " + this.round.getInput() );
		const typeDisplay = this.round.getAParm("Type");
		 console.log("typeDisplay=  " + typeDisplay );
		this.typeAnsText = typeDisplay.charAt(0);

        console.log("##GameB typeGame= " + this.typeAnsText + "  typeDisplay = " +typeDisplay);
		if (this.typeAnsText == "A") {//answerButton file that has to be retrieved  For offnet
			const buttonFile = this.gameDataArray.shift();//Usually Game type T with am image and overlay of hit areas
			console.log("buttonFile= " + buttonFile)//}B.AA.Bu.Ge.No.No.US.States.BL.csv
			//this.typeAnsText = this.procAnsButtFile();
			const filePath = getTextFilePath(buttonFile);//https://edugames.com/cgi-bin/GetTextFileTSD.pl?Bu/Ge/No/No/US/States/States.BL.csv

			if (onNet) {
				fetch(filePath)
					.then(response => response.text())
					.then(data => {
						if (data != null) {
							console.log("data= " + data)
							this.displayData = data;
							const dataArr = data.split("AnswerType=")
							console.log("dataArr[0]  " + dataArr[0] + "/n/n");
							console.log("dataArr[1]--" + dataArr[1] + "/n/n");

							this.answers = dataArr[1];
							this.butType = dataArr[1].charAt(0);


							console.log("this.butType= " + this.butType)
							const tempArr = data.split("Answers=");
							console.log("tempArr[0]= " + tempArr[0] + "  %%%%")
							const arr = tempArr[0].split("=");
							console.log("arr[0]= " + arr[0] + "/n")
							console.log("arr[01]= " + arr[1] + "/n")
							this.typeAnsText = arr[1].charAt(0);
							console.log("&&&&&&this.typeAnsText= " + this.typeAnsText + " this.butType=  " + this.butType);

							console.log("***** BBB " + this.butType)

							switch (this.butType) {
								case 'G':
									this.procTypeG();
									break;
								case 'M':
									this.procTypeM();
									break;
								case 'T':
									this.procTypeT();
									break;
							}
							//return data
						} else {
							alert("Somethign went wrong and the text could not be downloaded");
							return;
						}
					});
				console.log("***** CCC")
			}
		} else {

			this.butType = this.typeAnsText;
			console.log("***** DDD " + this.butType)
			switch (this.butType) {
				case 'G':
					this.procTypeG();
					break;
				case 'M':
					this.procTypeM();
					break;
				case 'T':
					this.procTypeT();
					break;
            }
		}
        console.log("this.typeAnsText  = " + this.typeAnsText);
		

		//this.playOn = true;
		GameContext.itf.playInProgress = false;
		console.log(" procData bottom bidButs.topBid= " + this.context.ui.bidButs.topBid  + "  "   +  this.rows);
	} 

	procTypeT(displayData) {
		console.log("||GprocTypeT gameDataArray[0]= " + this.gameDataArray[0]);
		this.setAnsBar();
		this.setJustAnswered();
		this.rightAnsArray = this.gameDataArray[0];
		if (this.rightAnsArray.endsWith(";")) this.rightAnsArray = this.rightAnsArray.substring(0, this.rightAnsArray.length - 1);
		this.rightAnsArray = this.rightAnsArray.split(";");
		this.context.ui.bidButs.createButs(this.rightAnsArray.length);
		console.log(" this.displayData= " + this.displayData);

		let pos1 = this.displayData.indexOf("Image=");
		let pos2 = this.displayData.indexOf("Answers=");
		this.image = this.displayData.substring(pos1 + 6, pos2 - 1);
        console.log("||procTypeT this.image= " + this.image);
		this.answers = this.displayData.substring(pos2 + 8)
		console.log("||procTypeT this.answers= " + this.answers);
		const imageArray = [this.image];
		const nameArray = ["map1"];
		console.log("||procTypeT nameArray = " + nameArray);
		this.addAnsImage(imageArray, nameArray);

		const answerArray = this.answers.split(";")

		for (let i = 0; i < answerArray.length; i++) {
			const parts = answerArray[i].split(' ');//example={H-1black 206075010157 Jordan River
			const part1 = parts.shift();
			const loc = parts.shift();
			const nameX = parts;//What is left.
			const name = String(nameX).replaceAll(',', ' ');
			const rec = loc.slice(0, 3) + ";" + loc.slice(3, 6) + ";" + loc.slice(6, 9) + ";" + loc.slice(9, 12);
			this.recArray.push(rec);
			this.nameArray.push(name);
		}

	}

	addAnsImage(imageArray, nameArray) {
		console.log("|-|-|GameB.addAnsImage imageArray= " + imageArray); //         console.log("  = " +  );
		
		const images = [];
		console.log("imageArray.length= " +  imageArray.length);
		for (let i = 0; i < imageArray.length; i++) {
			//ImageArray file example= }P.AA.Pi.Ge.No.No.US.MA.General-2.JF.gi
			console.log(i +  " imageArray[i] = " + imageArray[i] );
			const ip = getImageFile(imageArray[i], nameArray[i])[0];
			console.log("ip  = " + ip);
			images.push(ip);
		}//We add up the images and insrt them
		let buff = "";
		console.log("images.length = --" + images.length + "--");

		for (let i = 0; i < images.length; i++) {
			buff += images;
		}
		console.log("buff  = --" + buff + "--");

		console.log("imageInsertPt.innerHTML= " + imageInsertPt.innerHTML);
		imageInsertPt.innerHTML =  buff;
		
		
		for (let i = 0; i < images.length; i++) {
			const el = document.getElementById(nameArray[i]);
			el.addEventListener('click', function (event) {
				console.log('X: ' + event.offsetX + ', Y: ' + event.offsetY + "," + nameArray[i]);
				gameB.procAnsTypeT(event.offsetX, event.offsetY);
				//gameB.procAnsTypeT(event.offsetX,event.offsetY);
			});
		}
		
	}

	ckMarkIt(theAns){console.log("ckMarkIt " +  theAns );//Place the ckMark into the image
		const rc  = "div" + theAns;
		//console.log("****rc = " + rc)
		const theMiddlePt = this.maxWidth / 2;
		const anImageDoc = document.getElementById(rc);//../DataBase/A65AA65A/ResLibry/
		let buf = ""
		if(onNet){
			//buf+= "<img src='../DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
			buf+= "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
		} else {
		if(onLapTop){
				buf+= "<img src='ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
			}else{
				buf+= "<img src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
			}				
		}
		buf+= " ' style=' left:-";//class='gameBtypeMDot
		buf+= theMiddlePt+ "px;   position:relative' top:+20; id='ckMrk";//top:-100px;//
		buf+= theAns; 
		buf+= "' width='17' class='ckMrk' height='16'";
		buf+= "  />";

		const aDot = document.getElementById(rc);
		anImageDoc.innerHTML = anImageDoc.innerHTML + buf;
		console.log("MkImage *buf = " + buf)
		
		this.checkedRC = [];
	}

	markTheImages(pNbr){console.log("markTheImages " +  this.checkedRC );//Place the ckMark into the image
		for (let i = 0;i < this.checkedRC.length; i++){
			const theAns = this.checkedRC[i];
			const rc  = "div" + theAns;
			//console.log("****rc = " + rc)
			const theMiddlePt =this.maxWidth/2
			const anImageDoc = document.getElementById(rc);//../DataBase/A65AA65A/ResLibry/
			let buf = ""
			if (onNet) {
				if (pNbr == 0) {
					buf += "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/BlueCheckMark/BlueCheckMark.BB.jpg'";

				} else {
					//buf+= "<img src='../DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
					buf += "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
				}
			} else {
				if(onLapTop){
					buf+= "<img src='ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";			
				}else{
					buf+= "<img src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
				}
			}
			buf+= " ' style=' left:-";//class='gameBtypeMDot
			buf+= theMiddlePt+ "px;   position:relative' top:+20; id='ckMrk";//top:-100px;//
			buf+= theAns; 
			buf+= "' width='17' class='ckMrk' height='16'";
			buf+= "  />";

			const aDot = document.getElementById(rc);
			anImageDoc.innerHTML = anImageDoc.innerHTML + buf;
			//console.log("MkImage *buf = " + buf)
		}
		this.checkedRC = [];
	}

	recordImageHit(theAns){console.log("recordImageHit= " + theAns)
		this.checkedRC.push(theAns);
	}

	


	//The button file is created for large answer lists
	procAnsButtFileXX(){console.log("procAnsButtFile this.rndSerNbr= " + this.round.getSerNbr());
	    const buttonFile = this.gameDataArray.shift();//Usually Game type T with am image and overlay of hit areas
	   console.log("buttonFile= " + buttonFile);
		let butInfo = "";
		console.log("this.cp.onServer= " + this.cp.onServer);
		//if (this.cp.onServer) {
		if (true) {
			butInfo = getTextFileFromServer(buttonFile);
			console.log("bbutInfo= " + butInfo);
	   }else{//Not on server and part of testing
			this.butInfo = 	this.cp.ansButtons.procData(this.round.getSerNbr());
	   }
       //console.log("this.butInfo  = " + this.butInfo);
	   const tempArr = this.butInfo.split("Answers=");
	   let ansType = "";
		[, ansType] = tempArr.shift().split("=");
		console.log("ansType " + ansType);
	   ansType = ansType.charAt(0);
	   const pos = this.butInfo.indexOf("Answers=")
	   this.typeTAnswers = this.butInfo.slice(pos+8)
	   return ansType;
	}

	createGridMap(imageWidth,imageHeight,boxWidth,boxHeight,nbrRows,nbrCols){//console.log("createGridMap"  );
		this.gridMap = new Map();
		for (let i = 0;i < nbrRows; i++){
			for (let j = 0;j < nbrCols; j++){
				const rc =  "R" +( i +1) + "C" + (j +1); 
				const ptX = j * boxWidth;
				const ptY = i * boxHeight;
				const ptArr = [ptX,ptY];
				this.gridMap.set(rc,ptArr)
			}
		}
	}

	reset() {console.log("GameB reset");
		//bidButs.resetBidButs();
		this.resetPlay();
		this.curAnsCnt = 0;
		this.curWcnt = 0
		this.curRcnt = 0
		this.ansCkd = "";
		this.checkedRC = [];

	}

	

	resetTypeT(){ 
		this.context.ui.ansBar.textContent= "";
	}

	checkTypeTAns(){console.log("checkTypeTAns " +  this.justAnswered )
		const pf = failed;
		for(let i = 0;i< this.justAnswered.length;i++){
			if(this.rightAnsArray.indexOf(this.justAnswered[i]) == -1 ){
				console.log("failed "  )
			}
		}
	}

	


	reAddEventListener(theID){console.log("reAddEventListener  = " + theID);
		const anImage = document.getElementById(theID);
		anImage.addEventListener('click', function(){
            console.log("**MI anImage.id  = " );
			gameB.aHit(anImage.id);//This is n aRC
		});
	}


	addEventListenersToMultiImages(idArr){console.log("addEventListenersToMultiImages  = " + idArr);
		for (let i = 0;i < idArr.length; i++){
			const theID = idArr[i];
			const anImage = document.getElementById(theID);
			if(anImage == null)break;
			anImage.addEventListener('click', function(){
                console.log("MI anImage.id  = " + anImage.id);
				gameB.aHit(anImage.id);//This is n aRC
			});
		}
	}
//                                             console.log("  = " + );	



	typeMHit(theRC) {
		console.log("typeMHit  = " + theRC);	//this.playerArray

		if (biddingInProgress) {
			this.biddingInProcessWARNING();
			return;
		}
		const isRight = this.isSelMap.get(theRC);

		if(isRight == "Yes"){
			this.curRcnt++;
		}else{
			this.curWcnt++
		}
        console.log("isRight  = " +isRight + " this.curRcnt = " + this.curRcnt );
		console.log("typeMHit isRight  = " + isRight);

		for (let i = 0;i < this.checkedRC.length; i++){
             console.log(theRC + "  === " + this.checkedRC[i]);
			if(theRC == this.checkedRC[i]){
				alert("You have already checked this one")
				return;
			}
		}
		this.checkedRC.push(theRC)
		console.log(this.context.ui.bidButs.topBid +  "  ||this.checkedRC=	"  + this.checkedRC	);
		if (this.checkedRC.length == this.context.ui.bidButs.topBid){
           console.log("this.curRcnt  = " +this.curRcnt );
           console.log("this.curWcnt  = " +this.curWcnt );		   
			this.playerArray[this.pNbr] = this.curRcnt,this.curWcnt;
			this.changePlayers();
		}

	}

//                                             console.log("  = " + );	


	

	getRCFmHit(x, y) {
		console.log(this.picHeight + "  getRCFmHit = " + x + "  " + y + "   " + this.boxHeight + "  this.rows= " + this.rows );
		let rowNbr =0;
		let colNbr = 0;
		let n = this.boxHeight		
		let ansRow = 0
		for (let i = 0;i < this.rows; i++){
			if(y < n){
				ansRow = i + 1;
				console.log(" ansRow  = " + ansRow);	
				break;
			}else{
				n += this.boxHeight;
				console.log(" n  = " + n);	
			}
		}
		console.log("*** n = " + n + "  ansRow = " + ansRow);	

		let ansCol = 0;
		n= this.boxWidth;
		for (let i = 0;i < this.cols; i++){
			if(x < n){
				ansCol = i + 1;
				break;
			}else{
				n+= this.boxWidth;
			}
		}
        console.log("  ansCol= " + ansCol + "  ansRow= " + ansRow);
        const theRC = "R"+ansRow+"C"+ansCol;
		return theRC;
	}

	gridHit(x,y,id){ console.log("gridHit  pNbr= " + this.pNbr + " x=  " + x +   " y=  " + y );
		const theAns = 	this.getRCFmHit(x,y);
        console.log(" theAns = " + theAns)
		this.aHit(theAns);
	}


//        console.log("  " + )		



	unCheckCells(){console.log("B unCheckCells  this.justAnswered=  "  + this.justAnswered )
		const nbr = this.justAnswered.length;
		let rc = "";
		for (let i = 0;i < nbr; i++){
			if(this.typeAnsText == "G"){
				rc = "dot" + this.justAnswered[i]
			}else if(this.typeAnsText == "M"){
				rc = "ckMrk" + this.justAnswered[i];
				//this.reAddEventListener(rc);
			}

			console.log(" rc= " + rc)		
			const el = document.getElementById(rc);
			if (el != null) {
				el.remove();
			}

			//el.parentNode.removeChild(el);
		}
	}

	//                                             console.log("  = " + );

	procTypeM() {
		console.log("procTypeM() length= " + this.gameDataArray.length);
		//console.log("  this.gameDataArray= " + this.gameDataArray)

		const theImages = this.gameDataArray
		const nbrOfImages = this.gameDataArray.length//this.rightAnsArray

		const imageArr = [];
		const isSelArr = [];
		let theImage = ""
		let temp = ""
		let junk = ""
		let selYesNo = ""
		let rightAnCount = 0;
		for (let i = 0; i < nbrOfImages; i++) {
			//console.log("this.gameDataArray[i]  = -" + this.gameDataArray[i] + "-");
			if (this.gameDataArray[i].length == 0) {
				break;
			}
			[theImage, temp] = this.gameDataArray[i].split(" ")//}P.AA.Pi.Th.Cu.US.Co.Qu.St.LA.EE.jpg selected=Yes
			imageArr.push(theImage);
			[junk, selYesNo] = temp.split("=")
			if(selYesNo == 'Yes')rightAnCount++;
			isSelArr.push(selYesNo);			
		}

		this.context.ui.bidButstopBid = rightAnCount;
		this.context.ui.bidButs.createButs(rightAnCount, "B");//Includes fillBoxes



		//console.log("imageArr  = " + imageArr);
		//console.log("isSelArr  = " + isSelArr);//No,Yes,No,Yes,No,Yes

		const tblLayout = this.returnTblLayout(nbrOfImages);

		this.setUpMultiImageTable(tblLayout, imageArr, isSelArr);

	}

	setUpMultiImageTable(tblLayout, imageFileArr, selYesNo) {
		console.log("setUpMultiImageTable" + tblLayout);
		let rows = 0;
		let cols = 0;
		let tblWidth = 0;
		[rows, cols] = tblLayout.split(",");
		this.isSelMap = new Map();
		let cnt = 0;
		this.maxWidth = 0;
		let buf = "<table border='1'>"
		for (let i = 0; i < rows; i++) {
			buf += "<tr>\n"
			for (let j = 0; j < cols; j++) {
				const id = "R" + (i + 1) + "C" + (j + 1);//this.rightAnsArray
				buf += "<td><div id='div"
				buf += id + "'/>\n"

				this.isSelMap.set(id, selYesNo[cnt]);
				console.log("$$$$selYesNo[cnt]  = " + selYesNo[cnt]);
				if (selYesNo[cnt] == "Yes") {

					this.rightAnsArray.push(id)

				}
				this.context.ui.bidButs.topBid = this.rightAnsArray.length
				console.log(cnt + " $$theImage$$  = " + imageFileArr[cnt]);

				console.log(this.context.ui.bidButs.topBid + " ||*^^*|| " + this.rightAnsArray);
				this.idArr.push(id);//THis is for the event listener

				const theImage = getImageFile(imageFileArr[cnt++], id, "class='gameBImage'");

				const theImageWidth = theImage[2];
				if (theImageWidth > this.maxWidth) {
					this.maxWidth = theImageWidth;
				}

				buf += theImage[0];
				//buf+= getImageFile(imageFileArr[cnt++],id);
				buf += "</div></td>"
			}
			buf += "</tr>"
		}
		buf += "</table>";
		console.log("buf  = " + buf);

		gameInsrtPt.innerHTML = gameInsrtPt.innerHTML + buf;
		console.log("******this.rightAnsArray  = " + this.rightAnsArray);
		this.context.ui.bidButs.createButs(this.rightAnsArray.length);
		console.log("this.maxWidth  = " + this.maxWidth);
		this.addEventListenersToMultiImages(this.idArr);//                                             console.log("  = " + );

	}




	placeMultiImageCheckMarks(){console.log("placeMultiImageCheckMarks= " +  this.rightAnsArray);//this.rightAnsArray

		for (let i = 0;i < this.rightAnsArray.length; i++){
			const rc  = "dot" + this.rightAnsArray[i]
			console.log("****rc = " + rc)
			const theMiddlePt =this.maxWidth/2
			const anImageDoc = document.getElementById(rc);
			let buf = ""
			if(onNet){
				//buf+= "<img src='../DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
				buf+= "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";

			} else {
			if(onLapTop){
					buf+= "<img src='ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
				}else{
					buf+= "<img src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
				}
			}

			buf+= " ' style=' left:-";//class='gameBtypeMDot
			buf+= theMiddlePt+ "px;   position:relative' top:+20; id='";//top:-100px;//
			buf+= rc; 
			buf+= "' width='17' class='dot' height='16'";
			buf+= "  />";
			const aDot = document.getElementById(rc);
			//aDot.style=`left: 30px; top:10px; z-index:50; `// 
			anImageDoc.innerHTML = anImageDoc.innerHTML + buf;
			console.log("****buf = " + buf)
		}
	}


	
//                                             console.log("  = " + );





	placePlayerDots(){console.log("*********placePlayerDots "   )

		for (let i = 0;i < this.pMax; i++){
			let n=0;
			console.log("----"   + this.pSel[i])//R1C4,R1C3,R1C2,R1C1,R2C1,R2C2,R2C3
			const arr = this.pSel[i];
            console.log("arr  = " + arr);
			const capColor = this.plu.getCapColor(i);//console.log(" capColor = " + capColor);
			let xPt =0;let yPt=0
			for (let j = 0;j < arr.length; j++){


				const theRC =arr[j];
				let buf = "";
				if(onNet){
					//buf+= "<img src='../../../edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/";
					buf+= "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/";					

				} else {
					if(onLapTop){
						buf+= "<img src='ResLibry/Pi/Th/Sy/To/";
					}else{
						buf+= "<img src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/"
					}									
				}

				buf+=capColor;
				buf+="Dot/";
				buf+=capColor;
				buf+="Dot.AA.jpg' id='";
				const theID = capColor + n++;
				buf+=theID
				buf+= "' width='17' class='dot' height='16' ";
				buf+= "name='";
				buf+= this.plu.players[i].name;
				buf+= n;
				buf+= "'  />";
                console.log("buf  = " + buf);
				gameInsrtPt.innerHTML = gameInsrtPt.innerHTML + buf;
				console.log("theRC  = " + theRC);
				const aDot = document.getElementById(theID);
                console.log(" aDot.name  = " + aDot.name)
				const ptt = this.gridMap.get(theRC);

				const pos = ptt.indexOf(",");
				xPt = Number(ptt.slice(0,pos));// -(n*11)
				yPt = Number(ptt.slice(pos,9)) +(i * 20);
                console.log(" ptt  = " + ptt + " theRC  = " + theRC + " xPt = " + xPt+ " yPt = " +yPt);

				aDot.style=`left: ${xPt}px; top:${yPt}px; z-index:50; `//
                console.log(" xx  = " + aDot.offsetLeft + " yy  = " + aDot.offsetTop )


			}
		}
	}
	returnTblLayout(n){console.log("returnGridInfo n= "  + n);//For Multiple Images
		let cols = 0;
		let rows = 0;
		if(n < 4){
			rows =1;cols=3;
		}else if(n < 5){
			rows =2;cols=2;
		}else if(n < 7){
			rows =2;cols=3;
		}else if(n < 9){
			rows =2;cols=4;
		}else if(n == 9){
			rows =3;cols=3;
		}else if(n < 13){
			rows =3;cols=4;
		}else if(n == 16){
			rows =4;cols=4;
		}else if(n < 17){
			rows =4;cols=4;
		}else if(n < 21){
			rows =4;cols=5;
		}else if(n < 25){
			rows =4;cols=6;
		}
		console.log("rows  = " +rows+ " cols = " +cols);
		return rows + "," + cols ;

	}

	checkMarkItXX(theRC) {
		console.log(" checkMarkIt  " + theRC + "  " + this.context.ui.bidButs.whoHasBid);
		let xPt = 0; let yPt = 0
		let buf = ""
		if (onNet) {
			//buf+= "<img src='../../../edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/GreenDot/GreenDot.AA.jpg' ";
			if (this.context.ui.bidButs.whoHasBid == "Blue") {
				buf += "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/BlueCheckMark/BlueCheckMark.AA.jpg' ";
			} else {
				buf += "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.AA.jpg' ";
			}


		} else {
			if (onLapTop) {
				buf += "<img src='ResLibry/Pi/Th/Sy/To/GreenDot/GreenDot.AA.jpg' ";
			} else {
				buf += "<img src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/GreenDot/GreenDot.AA.jpg' ";
			}
		}

		const theID = "dot" + theRC
		buf += "id='" + theID + "'"
		buf += " width='17' class='dot' height='16' />";
		console.log("buf  = " + buf);
		this.dotId.push(theID);//Needed for cleanup
		gameInsrtPt.innerHTML = gameInsrtPt.innerHTML + buf;
		console.log("theRC  = " + theRC);
		const aDot = document.getElementById(theID);
		const ptt = this.gridMap.get(theRC);
		console.log(" ptt = " + ptt);
		const pos = ptt.indexOf(",");
		xPt = Number(ptt.slice(0, pos));// -(n*11)
		//yPt = Number(ptt.slice(pos,9)) +(i * 20);
		yPt = Number(ptt.slice(pos, 9));
		console.log(" ptt  = " + ptt + " theRC  = " + theRC + " xPt = " + xPt + " yPt = " + yPt);
		aDot.style = `left: ${xPt}px; top:${yPt}px; z-index:50; `//
		this.theImageDoc = document.getElementById("theImage");

		this.theImageDoc.addEventListener('click', function () {
			gameB.gridHit(event.offsetX, event.offsetY);
		});
		console.log(" xx  = " + aDot.offsetLeft + " yy  = " + aDot.offsetTop)
	}

	placeGridCkMrksXX() {
		console.log("**********placeGridCkMrks");
		const theImage = document.getElementById("baseImage");
		//this.ansDotLoc =  "R1C1;46;44,R3C4;382;220,3XXX;270;44,4XXX;1XXX;46;44,2XXX;158;44,3XXX;270;44,4XXX;383;44,5XXX;46;132,6XXX;158;132,7XXX;270;132,8XXX;383;132,AXXX;46;220,BXXX;158;220,CXXX;270;220,DXXX;383;220,EXXX;46;308,FXXX;158;308,GXXX;270;308,HXXX;383;308";

		console.log(this.theImage)
		for (let i = 0; i < this.ansDotLoc.length; i++) {//this.ansDotLoc.length
			let xLoc = 0; let yLoc = 0; let rc = "";
			[rc, xLoc, yLoc,] = this.ansDotLoc[i].split(";");

			console.log(" +++++++  " + this.ansDotLoc[i] + "  " + rc + "  " + xLoc + "  " + yLoc)
			let buf = "";
			if (onNet) {
				//buf+= "<img src='../../../edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg' class='redCkMrk' id='dot";
				buf += "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg' class='redCkMrk' id='dot";

			} else {
				if (onLapTop) {
					buf += "<img src='ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg' class='redCkMrk' id='dot";
				} else {
					buf += "<img src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg' class='redCkMrk' id='dot";
				}
			}
			buf += rc;
			buf += "' width='17' class='redCkMrk' height='16'";
			buf += "  />";
			gameInsrtPt.innerHTML = gameInsrtPt.innerHTML + buf;
			const aDot = document.getElementById("dot" + rc);//style='position: absolute; left:100px; top: 100px;'
			//xLoc-= (i * 12);//The size of the last dot. A work around to conpensate
			aDot.style = `left: ${xLoc}px; top:${yLoc}px; z-index:50; `//
		}
	}
	cleanPlayAreaXX() {
		console.log("******GameB cleanUpPlayArea  ");//this.context.ui.ansBar
		super.cleanPlayArea();
		for (let j = 0; j < this.dotId.length; j++) {
			const el = document.getElementById(this.dotId[j]);
			if (el != null) el.remove();
		}
		if (this.context.ui.ansBar != undefined) {
			this.context.ui.ansBar.style = "display: none;";
		}
		if (imageInsertPt != undefined) {
			imageInsertPt.innerHTML = "";
			const collection = imageInsertPt.children;
			for (let j = 0; j < collection.length; j++) {
				collection[j].remove();
			}
		}
		if (gameInsrtPt != undefined) {
			const collection = gameInsrtPt.children;
			for (let j = 0; j < collection.length; j++) {
				collection[j].remove();
			}
		}
	}
	checkMarkItXX(theRC) {
		console.log(" checkMarkIt  " + theRC + "  " + this.context.ui.bidButs.whoHasBid);

		//let xPt = 0; let yPt = 0
		let buf = ""
		if (onNet) {
			//buf+= "<img src='../../../edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/GreenDot/GreenDot.AA.jpg' ";
			if (this.context.ui.bidButs.whoHasBid == "Blue") {
				buf += "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/BlueCheckMark/BlueCheckMark.BB.jpg' ";
			} else {
				buf += "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg' ";
			}

		} else {
			if (onLapTop) {
				buf += "<img src='ResLibry/Pi/Th/Sy/To/GreenDot/GreenDot.AA.jpg' ";
			} else {
				buf += "<img src='../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/GreenDot/GreenDot.AA.jpg' ";
			}
		}
		console.log("AAA buf= " + buf)

		const theID = "dot" + theRC
		buf += "id='" + theID + "'"
		buf += " width='32' class='dot' height='32' />";
		//gameInsrtPt.innerHTML = gameInsrtPt.innerHTML + buf;

		console.log(theID + "  BB buf  = " + buf);

		//const theCkMrk = document.getElementById(theID);
		const theCkMrk = document.createElement("img");

		gameInsrtPt.appendChild(theCkMrk);

		console.log("theCkMrk = " + theCkMrk);
		const yLoc = theRC.charAt(1);
		const xLoc = theRC.charAt(3);
		const dotXLoc = (xLoc * this.boxWidth) - (this.boxWidth / 2) - 16;
		const dotYLoc = (yLoc * this.boxHeight) - (this.boxHeight / 2) - 16;

		console.log(this.boxWidth + " *** " + this.boxHeight);

		console.log(theRC + " ^^  " + dotXLoc + "  ^^ " + dotYLoc);

		theCkMrk.style = `left: ${dotXLoc}px; top:${dotYLoc}px;  `//

		this.dotId.push(theID);//Needed for cleanup
		console.log(" xx  = " + theCkMrk.offsetLeft + " yy  = " + theCkMrk.offsetTop)

	}


//                                             console.log("  = " + );
}

