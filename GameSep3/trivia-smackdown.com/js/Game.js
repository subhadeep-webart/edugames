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
		this.singlePlayer = true;
		this.gameName = 'game';
		this.gameLtr ="X";
		this.gamePlayAreaDoc;
		this.playIsOver = false;
		this.failCount = 0;
		this.failedPlayCount = 3;
		this.roundOver = false;
		this.numberThatGoesFirst = 0;
		console.log("Game.constructor BOTTOM"  );
	}


	init(){
		console.log("Game init TOP ***************" );//    console.log(" =" + );
		this.gameDataArray = this.round.getRoundDataArr();
		this.question = this.round.getTheQuestion();
		cp.itf.setQuestion(this.question);
		this.setDocs()
		console.log("Game init BOTTOM  " );
		this.rows = this.round.getAParm("Rows");//Not sure I need this
		this.cols = this.round.getAParm("Cols");
		console.log("Game init Bottom ***************" );//    console.log(" =" + )
	}




	postTypeDInst(whoGoesFirst){console.log("Game postTypeDInst " + whoGoesFirst);//cp.itf.postNotice()
		const arr = settings.pickWhoGoesFirst();
		console.log("Game whoGoesFirst " + arr);
		let txt = "NOTICE: This Round requires each player to make a choice while the other player turns away and does not see that choice.";
		txt+= "\nThe game has decided to have " + arr[1] + " go first."
		cp.itf.postNotice(txt);
		this.numberThatGoesFirst =  arr[0];

		cp.itf.playStartVoiceForD(arr[0]);
		cp.itf.playInProgress = true;
	}


	startPtFacInc(){console.log("Game startPtFacInc " );
		setUpTheIncreasingPtFac(1.0,0.05,2);//this makes it increase
	 }

	changePlayers() {console.log("Game changePlayers ");
		
		const thePtFac = Number(document.getElementById("ptFac").innerHTML)
		setUpAndStartThePtFac(thePtFac, 0.025,0);//The first player started with the increasing Pt Fac and Now counts down from there;
	}



	typeDSetUp() {console.log("Game typeDSetUp ");
		cp.itf.secondPlay = false;
		const whoGoesFirst = settings.pickWhoGoesFirst()
		cp.itf.nowPlaying = whoGoesFirst[0];
		this.postTypeDInst(whoGoesFirst);
	}

	setDocs(){
		this.tfPlayerName = document.getElementById("playerName")
		this.gamePlayAreaDoc = document.getElementById("gamePlayArea")
	}

	helloWorld(){
		console.log("Game.helloWorld" );
	}

	setPlayOn(tf){console.log("Game setPlayOn  " + tf );
		this.playOn = tf;
	}
		
	cleanPlayArea(){console.log("Game cleanUpPlayArea  "  );
		this.playIsOver = true;
		stopPanelRemoval();
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
