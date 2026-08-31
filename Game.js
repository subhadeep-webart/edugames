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
		this.rndSerNbr = "";
		this.textDisplayed = new Array();
		this.nextPlayerName;
		this.whoHasPlay = 0;

		this.nbrFirstUp = null;
		this.nbrSecondtUp = 0;

		this.colorFirstUp = null;
		this.colorSecondUp = null;

		this.nameFirstUp = null;
		this.nameSecondUp = null;


		console.log("Game.constructor BOTTOM"  );
	}


	init(){
		console.log("Game init TOP ***************" );//    console.log(" =" + );
		this.gameDataArray = this.round.getRoundDataArr();
		this.rndSerNbr = this.round.getSerNbr();
		this.question = this.round.getTheQuestion();
		cp.itf.setQuestion( this.rndSerNbr + "-" +  this.question);
		this.setDocs();
		this.rows = this.round.getAParm("Rows");//Not sure I need this
		this.cols = this.round.getAParm("Cols");
		console.log("Game init Bottom ***************  " +   this.gameLtr  );//    console.log(" =" + )
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
		
		insrtPtA.style.display = "none";	
		insrtPtB.innerHTML = buf;
		insrtPtB.style.display = "block"
		qBox.style.display = 'none';
	}

	createButs(nbr) {console.log("Game createButs " + nbr);
		settings.fillBoxes(cp.gameType, nbr);
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
		console.log("Game pickWhoGoesFirst  ");
		const x = Math.random();
		let name = null;
		let color = null;
		let pNbr = 0;
		const arr = new Array(3)
		arr[0] = 16;
		if (x < 0.5) {
			this.nbrFirstUp = 0;
			this.secondUp = 1;
			name = plu.players[0].name;
			this.nameFirstUp = name;
			this.colorFirstUp = plu.players[0].altColor;
		} else {
			this.firstUp = 1;
			this.secondUp = 0;
			pNbr = 1;
			name = plu.players[1].name;
			this.nameSecondUp = name;
			this.colorSecondUp = plu.players[1].altColor;		
		}
		arr[1] = color;
		arr[2] = name + " goes First!";

		postNoticeCenterDisplay(arr);
		
	}

	nextPlayer() {
		console.log("Game  Player() ");
		////insrtPtA.style.display = 'block';//remove??
		gamePlayArea.style.display = 'block';
		insrtPtB.style.display = 'none';
		qBox.style.display = 'block';
		//cp.itf.setOtherPlayer();
		this.lastPlay = true;
		//document.getElementById("displayBox").value = this.lowNbr;
		let snd = null;
		if (cp.itf.nowPlaying == 1) {
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


	typeDSetUpXX() {console.log("Game typeDSetUp ");
		cp.itf.secondPlay = false;
		this.postTypeDInst();
	}


	postTypeDInstXX(whoGoesFirst) {
		console.log("Game postTypeDInst ");//cp.itf.postNotice()
		cp.itf.secondPlay = false;
		this.pickWhoGoesFirst();
		this.startPlay();
		/*
		console.log("Game whoGoesFirst " + arr);
		this.numberThatGoesFirst =  arr[0];
		cp.itf.playStartVoiceForD(arr[0]);
		cp.itf.playInProgress = true;
		*/
	}


	startPtFacInc(){console.log("Game startPtFacInc " );
		setUpTheIncreasingPtFac(1.0,0.05,2);//this makes it increase
	 }

	changePlayers() {console.log("Game changePlayers ");
		
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
		stopPanelRemoval();
		insrtPtA.innerHTML = "";
		insrtPtB.innerHTML = "";
		//cp.itf.cleanPlayArea();
	}


	removeGame(){console.log("Game removeGame " );
		cp.itf.setQuestion("");
	}
	reset(){console.log("Game reset() " );
	}

	butHit(nbr){console.log("Game.butHit" );
	}
	
	timesUp(){console.log("Game.timesUp()" );
	}

	checkPlay(){console.log("Game.   checkPlay()" );
	}

	playStarted(){console.log("Game  playStarted" );
	}

	startPlay(trgHitNbr){console.log("Game  startPlay " + trgHitNbr )//Some games use this
		
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

	getButIDArray(str,rows,cols){
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
        console.log("Game.endPlay Top" );
        console.log("Game.endPlay Bottom" );
	}

	//console.log(" =" + );

	insertTheQuestionXX(question){console.log("G--insertTheQuestion =" + question);
		document.getElementById('question').value = question;
	}
	
	resetPageXX(){
		document.getElementById('question').value = "";
		document.getElementById('ptAwd').value = this.ptAwd;
	}

	insertQuestionXX(str){
		document.getElementById('question').value = str;
	}

	awdPointsXX(amt){console.log("Game awdPoints TOP amt=" + amt);
		const n = document.getElementById('ptAwd').value;
		document.getElementById('ptAwd').value = amt + 0;
		console.log("awdPoints BOTTOM amt=" + amt);
	}
	startTheFirstPtFacXX() {
		console.log("Game startTheFirstPtFac ");
		stopThePtFac();
		setUpAndStartThePtFac(1, 0.025,2);
	}

	set2ndPlyrDecPtFacXX() {
		const tempPtFac = 
		stopThePtFac();
		setUpTheDecreasingPtFac(1, .05, 0);
	}

	set1stPlyrDecPtFacXX() {
		const n = ptFac;//This is from script
		stopThePtFac();
		setUpTheDecreasingPtFac(n, .05, 0);
	}


	gameTypeDNoticeXX(){console.log("Game gameTypeDNotice " );
		const txt = "First player gets 25 Bonus Point, if they win.";//notice
		const el = document.getElementById("notice");
		el.innerHTML =  txt;
	}


	mapTheParmsXX(){//Moved to Round
		console.log("mapTheParms() TOP this.gameParm= " + this.gameParm);
		const parms = this.gameParm.split(' ');
		this.parmMap = new Map();
		for (let i = 0;i < parms.length; i++){
			const twoParts = parms[i].split('=');
			this.parmMap.set(twoParts[0],twoParts[1]);//console.log("  = " +  );
		}
		//Break out the often used rows and cols as numbers
		this.rows = Number(this.parmMap.get('Rows'))
		this.cols = Number(this.parmMap.get('Cols'))
		this.nbrOfButs = this.rows * this.cols;
		console.log("mapTheParms() BOTTOM this.rows = " + this.rows + " this.cols=  " + this.cols );
	}

}//Bottom of Game
