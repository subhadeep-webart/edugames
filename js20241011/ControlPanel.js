// JavaScript source code

class ControlPanel{            //          console.log(" = " + );
	constructor (){console.log("cp constructor  top "  );
		this.utl;
		this.plu;
		this.itf;
		this.sp;
		this.rndSerNbr;
		this.rounds;
		this.rndNbr = 0;
		this.sets;
		this.roundArray = [];
		this.roundSerNbrArray = [];
		this.roundQArray = [];
		this.itfType = "X";
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

		this.gameInPlay;
		this.gameSerNbr;
		this.gameType = "X";
		this.onServer = false;
		this.playerArray = [];
		this.playerNbr = 0;
		this.offLine = true;
		this.sampleData;
		this.firstPlayerNbr = 0;
		this.pointTF;
		this.theGameInPlay;
		this.setListOfRounds =[];
		this.playAreaSetUp = false;
		this.rndSerNbrBox;
		this.theRoundInPlay;
		this.setBeingPlayed;
		this.setSerNbr;
		this.audX;
		console.log("cp constructor  bottom "  );
	}

	init(){
        console.log("CP.init TOP"  );
		testIfOnNet();
		this.utl = new Utl(this);
		this.plu = new PlayerLineUp(this);
		this.itf = new Interface(this);
		this.itf.init();
		this.sets = new Sets();
		this.sets.init();
		this.audX = new AudX(this,this.itf);
		this.sp = new SelectionPanel(this);
		//this.rounds = new Rounds(this);
		this.ansButtons = new AnsButtons(this);
		//this.itf.insrtFrm();
		this.pointTF = document.getElementById("ptAwd");
		this.rndSerNbrBox = document.getElementById("rndSerNbrTB");
        console.log("CP.init BOTTOM   this.sets=    " + this.itf )
	}

	helloWorld(){console.log("cp.helloWorld" );
		console.log("cp.helloWorld" );
	}
	//          console.log("cp.  = " + );


	loadSet(serNbr){console.log("cp.loadSet  = " + serNbr);
	    this.setBeingPlayed = this.createSet(serNbr);
		if(this.setBeingPlayed ==null){
			this.itf.postNotice("The set serNbr " + serNbr + " did not load and can't be played.");
		}else{
			this.itf.setUpPlay()
		}
	}

	mapData(data){console.log("cp.mapData= " + data )
		this.sp.mapData(data);
	}


	startSet(serNbr){console.log("cp.startSet serNbr= " + serNbr );
	    this.itf.setUpPlayArea();
		this.itf.cleanPlayArea();
	    this.setBeingPlayed = this.createSet(serNbr);
		this.startRnd();
	}

	displayStartButton(){console.log("cp.displayStartButtont= " );
		this.itf.displayNxtRndBut();
	}

	createSet(serNbr){console.log("cp.createSet  onNet= " + onNet );
		this.itf.setUpPlayArea();
		let newSet = null;
		let data = "";
		if(onNet){
			console.log('/edugames.com/cgi-bin/GetASet.pl?' + serNbr);		
			fetch('/edugames.com/cgi-bin/GetASet.pl?' + serNbr)     
				.then(response => response.text())
				.then(data => {
				console.log("fetch data=  " + data );
			    newSet = new Set(data);
				this.setSerNbr = newSet.getSerNbr();
				this.setBeingPlayed = newSet;
				this.displayStartButton();
				return newSet;
			});
		}else{
			const data = this.sets.getData(serNbr)
			newSet = new Set(data)
			this.displayStartButton();
			return newSet;
		}
	}

	getSetWith1Rnd(){console.log("cp.getSetWith1Rnd  = " + this.sp.roundToBePlayed);
		const arr = [];
		arr.push(this.sp.roundToBePlayed);
		return arr;
	}

	setUpPlayArea(){console.log("cp.setUpPlayArea ")
		this.sp.setSecPerQuest();//We do this before we close the form
		this.sp.removeSelectionForm();
		this.itf.set2PlayerDisplay();
		this.itf.insertPlayersInto2PlayerDisplay();
	}

	getRoundFromDropDownMenu(){
		const theRnd = this.sp.getRndToBePlayed();
	}

	finishUpSet(){console.log("cp.finishUpSet  ")
		plu.addRndScoreToSet();
		this.itf.cleanPlayArea();
		const el = document.getElementById("qBox");
		el.textContent = plu.getWinner();
	}

	startRnd(theRnd,partOfset){console.log("cp.startRnd AA theRnd= " +  theRnd + "  this.setBeingPlayed " + this.setBeingPlayed);
		if(!this.playAreaSetUp){
			cp.itf.setUpPlayArea();
			this.playAreaSetUp= true;
		}
		if(this.setBeingPlayed != null){
			console.log("CP.***SerNbr  = " + this.setBeingPlayed.getSerNbr() );
			theRnd = this.setBeingPlayed.getNextRnd("CP startRnd");
			console.log("###theRnd  " + theRnd)
			if(theRnd == null){
				this.finishUpSet();
				return;
			}
			console.log("cp.startRnd  theRnd= " + theRnd);
		}
		if(theRnd == null){
			theRnd = this.sp.getRndToBePlayed();
		}
		const round = this.sp.getRoundFmRnd(theRnd)
		plu.zeroRndScores();
		console.log("CP.startRnd. round=  " + round)
		this.itf.cleanPlayArea();
		this.startGame(round);
		console.log("cp.startRnd BB theRnd= " +  theRnd + "  partOfset " + partOfset);
	}

	playRndFromTB(){console.log("cp.playRndFromTB " );
		if(!this.playAreaSetUp){
			cp.itf.setUpPlayArea();
			this.playAreaSetUp= true;
		}
		const theRndsetNbrToPlay = document.getElementById('rndSerNbrTB').value;
		console.log("cp.theRndToPlay= ) " + theRndsetNbrToPlay + "   " + theRndsetNbrToPlay.charAt(3));
		const roundType = theRndsetNbrToPlay.charAt(3);
		if(this.sp == null)this.sp = new SelectionPanel(this);
		const theRound = this.sp.getRndFmGameType(theRndsetNbrToPlay)
		console.log("cp.theRound " + theRound);
		if(this.theRndsetNbrToPlay != null){
			this.theRndsetNbrToPlay.cleanUp();
		}
		this.startRnd(theRound);
	}

	endSet(){console.log("cp.endSet() "  )

	}

	windUpSet(){console.log("cp.windUpSet  = "  );

	}

	playNextRound(){console.log("cp.playNextRound() set serNbr=    " +  this.setBeingPlayed);
		
		const rnd = this.setBeingPlayed.getNextRnd("cp PlayNextRound");

		console.log("|**rnd =  "  + rnd);

		//rnd.display();

		if(rnd == ""){
			this.windUpSet();
			return;
		}else {
			if(this.theGameInPlay != undefined)this.theGameInPlay.cleanPlayArea();
			cleanPlayArea();//this goes to script
			console.log(" *||* "  );
			const round = this.sp.getRoundFmRnd(rnd);
			console.log(" |**| "  );
			this.startGame(round);
		}


	}

	startRoundList(nbr){console.log("cp.startRoundList  = " + nbr );
		console.log("cp.this.sets  = " + this.sets);
		const strtPt = Number(this.rndSerNbrBox.value);
		this.roundSerNbrArray = this.sets.getRoundList(nbr,strtPt);
		const aRound = this.roundSerNbrArray.shift();
		console.log("cp.  aRound= " + aRound);
		this.startRnd(aRound);
	}


	releaseNextRound(){console.log("cp.releaseNextRound  = " + this.roundArray);
		this.startGame(this.roundArray[this.rndNbr++]);
	}

	
	startGame(aRound,sampleData){console.log("^^^cp.startGame aRound = " + aRound);
		this.plu.zeroRndScores();
		this.gameType = aRound.getGameType();
		this.rndSerNbr = aRound.getSerNbr();
		
		console.log("^^^onNet = " + onNet);
		this.sampleData = sampleData;
		switch (this.gameType) {
			case 'A':
				gameA = new GameA(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameA;
				gameA.init();
			break;
			case 'B':
				//this.itfType = "B"
				gameB= new GameB(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameB;
				gameB.init();
			break;
			case 'C':
				//this.itfType = "C"
				gameC = new GameC(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameC;
				gameC.init();
			break;
				case 'D':
				this.itfType = "D"
				gameD = new GameD(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameD;
				gameD.init();
			break;
			case 'E':
				gameE = new GameE(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameE;
				gameE.init();
			break;
			case 'I':
			this.itfType = "I"
				gameI = new GameI(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameI;
				gameI.init();
			break;
			case 'L':
				this.itfType = "D"
				gameL = new GameL(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameL;
				gameL.init();
			break;
			case 'M':
				gameM = new GameM(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameM;
				gameM.init();
			break;
			case 'N':
				this.itfType = "D"
				gameN = new GameN(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameN;
				gameN.init();
			break;
			case 'O':
				gameO = new GameO(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameO;
				gameO.init();
			break;
			case 'P':
				gameP = new GameP(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameP;
				gameP.init();
			break
			case 'Q':
				gameQ = new GameQ(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameQ;
				gameQ.init();
			break;
			case 'U':
				gameU = new GameU(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameU;
				gameU.init();
			break;
			case 'X':
				gameX = new GameX(aRound,this,this.utl,this.plu,this.itf);//console.log(" =" + );
				this.theGameInPlay = gameX;
				gameX.init();
			break;

			default:

		}
		console.log("##########CP.startGame BOTTOM  "  );
		console.log("########BOTTOM ##GameType " + this.gameType + " theGameInPlay= " + this.theGameInPlay);

	}


	regPlayer(player){
		console.log("CP.regPlayers TOP ");
		this.playerArray.push(player);
		console.log("CP.regPlayers BOTTOM ");
	}
	playTheGame(){console.log("cp.playTheGam ");


	}


	regPlayers(){ console.log("cp.regPlayer ");
		const pArr  =  itf.getFormData();
		console.log("script.pArr= " + pArr);
	
	}


	setTopDisplay(){
		this.itf.create2PlayerTop();

	}

	setDocs(){

	}

	setPoints(nbrOfPoints){
		//this.itf.setPointFactor(2)
	}

	halveThePoints(){
		const presentPt = Number(this.pointTF.value);
		this.pointTF.value = (presentPt/2);
	}



	addPlayerLineUp(plu){
		this.plu,this.itf = plu;
	}

	setFirstPlayerNbr(nbr){
		this.firstPlayerNbr = nbr;
	}

	addEventListenersXX(){
		console.log("CP.addEventListeners TOP" );//getElementById()
		let el = document.getElementById("regPlayers");
         console.log("el.value = " + el.value );
          console.log("regPlayers != null = " + (el != null) );
		if(el != null)el.addEventListener("click", function(){
			regPlayers();
		});
          console.log("(butReg != null) = " + ((el != null)) )
		el = document.getElementById("butStartGame");
        console.log("butStart = " + el.value);
		if(el != null)el.addEventListener("click", function(){
			startGame();
		});

      console.log("CP.addEventListeners BOTTOM"  );
	}

	setCheckBut(){console.log("CP.setCheckBut  DEPRECATED" );

	}

}
