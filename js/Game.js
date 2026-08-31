// JavaScript source code
class Game{
	constructor (round,cp,utl,plu,itf){//         console.log(" =" + );
		console.log("Game.constructor TOP"  );//aRound,this,this.utl,this.plu,this.itf
		this.round = round;
		this.cp = cp;
		this.utl = utl;
		this.plu = plu;
		this.itf = itf;
		this.typeGame;
		this.question;
		this.pNbr=0;
		this.gameInsrtPt;
		this.imageInsertPt;
		this.thePtFac=1;
		this.reference;
		this.tfPlayerName;
		this.gameParm;
		this.gameInputArray =[];//The entire input string
		this.gameDataArray =[];//includes the question and ref
		this.pictureFileArray;
		this.parmMap;
		///this.trysPerPlayer = 3;//Default for now
		this.ptAwd = 100;//default
		this.ptAwdInc = 2;;
		this.rows;
		this.cols;
		this.gameInPlay = "ABCD";
		this.gameType = 'Z';
		this.nbrOfInsrtPts;
		this.nbrOfButs = 0;
		this.insrtIdArray = [];
		this.gameName = 'game';
		this.gameLtr ="X";
		this.playIsOver = false;
		this.failCount = 0;
		this.failedPlayCount = 3;
		this.roundOver = false;
		///this.rndSerNbr = "";
		this.textDisplayed = new Array();
		this.nextPlayerName;
		this.whoHasPlayNbr;
		this.playDetails = [];
		this.nbrFirstUp;
		this.nbrSecondUp;

		this.colorFirstUp ;
		this.colorSecondUp ;
		this.theQuestion = "?? ?"
		this.nameFirstUp ;
		this.nameSecondUp;
		this.dataForThisGame = "";
		this.time = [];
		this.picWidth = 0;
		this.picHeight = 0;


		this.pointsForThisRound = 100;
		////this.init();
		console.log("Game.constructor BOTTOM"  );
	}

	init() {
		console.log("Game init TOP ****     " + this.gameDataArray);//    console.log(" =" + );
		hideAnsBox();
        hideAnsBar();
		hidAnsBut();
		gameInPlay = true;
		this.gameDataArray = this.round.getRoundDataArr();
		//this.rndSerNbr = this.round.getSerNbr();
		this.question = this.round.getTheQuestion();
		cp.itf.setQuestion(serNbrOfRndInPlay + "-" + this.question);
		this.setDocs();
		this.rows = this.round.getAParm("Rows");//Not sure I need this
		this.cols = this.round.getAParm("Cols");
		console.log("Game init Bottom ***************  " + this.gameLtr);//    console.log(" =" + )
	}

	startPlay(){console.log("Game startPlay   ");//Used in game C


	}

	getPlayDetails() {console.log("Game getPlaydetails ");
        return "--";
	}

	setNextRound() {console.log("Game setNextRound() ");
		enableAnsBut();
		enableNextRndBut();
	}



	reset() {console.log("Game reset() ");
		bidButs.restartBidding();
	}

	startPlayXX(trgHitNbr) {
		console.log("Game  startPlay " + trgHitNbr)//Some games use this

	}

	showAnswers() {console.log("Game showAnswers() ");


	}

	displayAnswers(txt) {console.log("Game displayAnswers() ");
		hideGameArea();
		showAnsBox();
		ansBox.value = txt
	}




	biddingInProcessWARNINGxx() {
		console.log("biddingInProcessWARNING() ")
		playBeep();
		postNoticeCenterDisplay("18,white,Wait till Bidding Stops");

	}


	showNextPlayerNotice(nextPlayerName) {
		console.log("Game showNextPlayerNotice " + nextPlayerName );//    console.log(" =" + );
		let buf = `  
<div style="text-align:center; font-size:48px;">OK</div>
<div style="text-align:center; font-size:48px;" id="nextPlayerName" >${nextPlayerName}</div>
<div style="text-align:center; font-size:48px;">It's your Turn Now!</div>
</br><div style="text-align:center; font-size:24px;"><input type="button" onClick="nextPlayer()"
style="text-align:center; font-size:24px;"  value="CONTINUE"></div>
`;
		
		gamePlayArea.style.display = "none";	
		insrtPtB.innerHTML = buf;
		insrtPtB.style.display = "block"
		qBox.style.display = 'none';
	}

	createButs(nbr) {console.log("Game createButs " + nbr);
		bidButs.fillBoxes(cp.gameType, nbr);
		bidButs.createButs(nbr);
	}


	getOtherPlayersName(pNbr) {console.log("Game getOtherPlayersName" + nbr);
		if (pNbr == 0) {
			return plu.players[1].name;
		} else {
			return plu.players[0].name;
		}
	}


	pickWhoGoesFirst() {
		console.log("Game pickWhoGoesFirst  " + singlePlayerMode);
		//We start with player 0 bring first
		if (singlePlayerMode) {//We want the player[0] to go first
			postNoticeCenterDisplay("24," + this.colorFirstUp + "," + this.nameFirstUp + " you have " + bidButs.getTimeForGameLND() + " seconds to complete this Round.");
		} else { 
			this.nbrFirstUp = 0;
			this.nbrSecondUp = 1;
			this.colorFirstUp = plu.players[0].color;
			this.colorSecondUp = plu.players[1].altColor;
			this.nameFirstUp = plu.players[0].name;
			this.nameSecondUp = plu.players[1].name;
			let x = Math.random();

			console.log("Game pickWhoGoesFirst x = " + x);
			if (x < 0.5) {//The we reverse it
				this.nbrFirstUp = 1;
				this.nbrSecondUp = 0;
				this.colorFirstUp = plu.players[1].color;
				this.colorSecondUp = plu.players[0].altColor;
				this.nameFirstUp = plu.players[1].name;
				this.nameSecondUp = plu.players[0].name;
				postNoticeCenterDisplay("24," + this.colorFirstUp + "," + this.nameFirstUp + " goes First!");
			}
			this.whoHasPlayNbr = this.nbrFirstUp;
			let buf = "24," + this.colorFirstUp + "," + this.nameFirstUp + " goes First!";
			cp.itf.nowPlaying = this.nbrFirstUp;
			return this.nameFirstUp;
		}
	}

	nextPlayer() {console.log("Game  nextPlayer()");
		this.whoHasPlayNbr = getOtherPlayer(this.whoHasPlayNbr);
		gamePlayArea.style.display = 'block';
		insrtPtB.style.display = 'none';
		qBox.style.display = 'block';
		this.lastPlay = true;
		const arr = new Array(3);
		arr[0] = 18;
		arr[1] = this.colorSecondUp;
		arr[2] = this.nameSecondUp + " Now Playing"

		postNoticeCenterDisplay(arr);
		let snd = null;
		if (this.nbrFirstUp == 0) {
			snd = new Audio("Audio/RedsTurn.wav")
		} else {
			snd = new Audio("Audio/BluesTurn.wav")
		}
		snd.play();
	}


	getTextHiLength() {console.log("getTextLength() ");
		let hiCount = 0;
		for (let i = 0; i < this.textDisplayed.length; i++) {
			const s = this.textDisplayed[i];
			if (s.length > hiCount) hiCount = s.length;
		}
		return hiCount ;
	}



	getTimeAdjust() {
		console.log("getTimeAdjust--Game ");
		let hiCount = 0;
		for (let i = 0; i < this.textDisplayed.length; i++) {
			const s = this.textDisplayed[i];
			//console.log("s=  " + s);
			const cnt = s.length;
			if (cnt > hiCount) hiCount = cnt;
		}
		console.log("TimeAdjust()--U = " + hiCount + "   = " + (hiCount / 25));
		return (hiCount / 25);
	}



	startPtFacInc(){console.log("Game startPtFacInc " );
		setUpTheIncreasingPtFac(1.0,0.05,2);//this makes it increase
	 }

	changePlayersXX() {console.log("Game changePlayers ");
		
		const thePtFac = Number(document.getElementById("ptFac").innerHTML)
		setUpAndStartThePtFac(thePtFac, 0.025,0);//The first player started with the increasing Pt Fac and Now counts down from there;
	}



	setDocs(){
		this.tfPlayerName = document.getElementById("playerName")
	}

	helloWorld(){
		console.log("Game.helloWorld" );
	}

	setPlayOn(tf){console.log("Game setPlayOn  " + tf );
		this.playOn = tf;
	}
	
		
	cleanPlayArea(){console.log("Game cleanUpPlayArea  "  );
		this.playIsOver = true;
		blankNotice();
		//hideAnsBox();
		showGameArea();
		stopPanelRemoval();
		disableAnsBut();
		disableNextRndBut();
		hideCheckBut();
		gamePlayArea.innerHTML = "";
		insrtPtB.innerHTML = "";
	}


	removeGame(){console.log("Game removeGame " );
		cp.itf.setQuestion("");
	}
	
	butHit(nbr){console.log("Game.butHit" );
	}
	
	timesUp(){console.log("Game.timesUp()" );
	}

	checkPlay() {console.log("Game.   checkPlay()");


	}

	playStarted(){console.log("Game  playStarted" );
	}




	breakOutRoundXX(){console.log("Game.breakOutRound TOP this.round = " +  this.round);
		console.log("this.round[0] =" + this.round[0]);
		const gameInputArray = this.round.split(',');//console.log(" =" + );

		const roundCount = gameInputArray.length;
		//This is to remove the trailing commas
		for (let i = roundCount; i--; i > 20){
			if(gameInputArray[i].length == 0 || gameInputArray[i] == undefined){
				gameInputArray.pop();
			}else{
				break;
			}
		}
		const n = gameInputArray.length;
		//console.log("Game.breakOutRound gameInputArray.length= "  + n);
		this.gameDataArray = gameInputArray.slice(17,n);

		const len = this.gameDataArray.length;
		const lastItem = this.gameDataArray[len];
		this.question  = this.gameDataArray.shift();
		this.reference = this.gameDataArray.shift();
		this.gameParm  = this.gameDataArray.shift();

	}



	changePlayers(text){console.log("Game  changePlayers = "  );//console.log(" =" + );
		const  nextPlayer = this.plu.getNextPlayer();

		console.log("nextPlayer = " + nextPlayer);

		if((text != null).length > 0){
			alert(text + " and the next player is "+ nextPlayer.name);
		}else{
			alert("The next player is "+ nextPlayer.name);
		}
		
		this.tfPlayerName.value= nextPlayer.name;
		this.tfPlayerName.style.backgroundColor = nextPlayer.altColor;
	}

	getButIDArray(str, rows, cols) {
		console.log("Game.createButArray rows=  " + rows + " cols=  " + cols);
		const butIDArray = [];
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				butIDArray.push("R" + i + "C" + j);
			}
		}
		return butIDArray;
	}



	getButIDArrayXX(str,rows,cols){
		console.log("Game.createButArray rows=  " + rows + " cols=  " + cols );
		const butIDArray = [];
		for (let i = 0;i<cols;i++){
			for (let j = 0;j<rows;j++){
				butIDArray.push(str + i + 'X' + j);
			}
		}
		return butIDArray;
	}

	roundOver(){
		console.log("Game.roundOver() Top" );
	}

	gameOver(){
		console.log("Game.gameOver Top" );
	}

	helloWorld(){
		console.log("Game.helloWorld" );
	}

	toString(){
		return this.gameName;
	}

	endPlay(){
		console.log("Game.endPlay Top");

        console.log("Game.endPlay Bottom" );
	}

	//console.log(" =" + );



}//Bottom of Game
