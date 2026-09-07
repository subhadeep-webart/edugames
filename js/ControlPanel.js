// JavaScript source code

/* Route player-facing notices through the shared themed dialog
   (js-ui/tsd-modal.js) rather than the browser's native alert(), falling
   back to alert() if that UI layer is absent. Each call site here returns
   immediately afterwards, so alert()'s blocking is not relied upon. */
function tsdCPNotice(title, body) {
	if (window.TSDModal && typeof TSDModal.alert === "function") {
		TSDModal.alert({ title: title, message: body, icon: "help" });
	} else {
		alert(body);
	}
}

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
		this.theQuestion;
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
		let gameX = null;;


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
		this.theRoundInPlay = null;//?
		setBeingPlayed = null;
		this.setSerNbr = null;
		this.audX;
		this.roundCount = 0;
		console.log("cp constructor  bottom "  );
	}

	init(){
        console.log("CP.init TOP"  );
		testIfOnNet();
		this.utl = new Utl(this);
		////this.plu = new PlayerLineUp(this);
		this.itf = new Interface(this);
		this.itf.init();
		this.sets = new Sets(this);
		this.sets.init();
		this.audX = new AudX(this,this.itf);
		this.sp = new SelectionPanel(this);
		
		//this.rounds = new Rounds(this);
		//this.ansButtons = new AnsButtons(this);
		//this.itf.insrtFrm();
		this.pointTF = document.getElementById("ptAwd");
		this.rndSerNbrBox = document.getElementById("rndSerNbrTB");
		console.log("CP.init BOTTOM   this.sets=    " + this.itf)
		bidButs = new BidButs(10);
		setBeingPlayed = null;
		//prompt("Welcome to Trivia Smackdown.  Please click on the 'Start' button to begin.");

		//const xx = g * d;
	}

	createAlphaBarPanel() {
        if (!abp)abp = new AlphaBar(this);
	}

	helloWorld(){console.log("cp.helloWorld" );
		console.log("cp.helloWorld" );
	}
	//          console.log("cp.  = " + );

	mapData(data){console.log("cp.mapData= " + data )
		this.sp.mapData(data);
	}

	startSet(serNbr,from){console.log("cp.startSet serNbr= " + serNbr  + " from  "  + from );
	    setBeingPlayed = this.createSet(serNbr);
	}

	displayStartButton(){console.log("cp.displayStartButtont= " );
		this.itf.displayNxtRndBut();
	}



	createSet(setSerNbr){console.log("cp.createSet  onNet= " + onNet  + "  " + setSerNbr);//https://trivia-smackdown.com/favicon-36x36.png 404 (Not Found)
		this.itf.setUpPlayArea();
		let newSet = null;
		let data = "";
		this.setSerNbr = setSerNbr;
		if(onNet){
			const url = '/cgi-bin/GetASetTSD.pl?' + this.setSerNbr;																																																														
			console.log("url = "  + url);	
			fetch(url)
				.then(response => response.text())
				.then(data => {
				if(data != null){
					console.log("CP.fetch data=  " + data.substring(0, 24));
					setBeingPlayed = new Set(data, false,"117");

					console.log("setBeingPlayed.getSerNbr() " + setBeingPlayed.getSerNbr());
				}else{
					tsdCPNotice("Download Failed", "Something went wrong and the Set could not be downloaded.");
					return;
					}
				});

		}else{//If offline, use data from my computer
			console.log("else ");
			const data = this.sets.getData(setSerNbr)
			newSet = new Set(data, false,"129")
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

	
	startRnd(theRnd,partOfset){console.log("cp.startRnd AA theRnd= " +  theRnd  + "  " + partOfset);
		if(!this.playAreaSetUp){
			cp.itf.setUpPlayArea();
			this.playAreaSetUp= true;
		}
		if (!partOfset) {
			plu.clearRndScores();
            setBeingPlayed == null;
		}
		if (!partOfset) setBeingPlayed = null;

		if(setBeingPlayed != null){
			console.log("CP.***SerNbr  = " + setBeingPlayed.getSerNbr() );
			//theRnd = await setBeingPlayed.getNextRnd("CP startRnd");

			theRnd = setBeingPlayed.getNextRnd("CP startRnd");

			console.log("###theRnd  " + theRnd)
			if (theRnd == null) {
				this.finishUpSet();
				return;
			} else if (theRnd.charAt(0) == "*") {
				console.log("### GetNextRnd  " + theRnd)

				this.startRnd(theRnd.substring(1));

			}
			console.log("cp.startRnd  theRnd= " + theRnd);
		}
		if(theRnd == null){
			//theRnd = this.sp.getRndToBePlayed();
			theRnd = rndMenu.selected;
		}
		const round = this.sp.getRoundFmRnd(theRnd)
		console.log("###round  " + round)
		console.log("cp.startRnd AA Bottom");
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

	/*
	gameResults= PRA1_1778;Peter;550;24;The winner of Set PRA1_1778 is Peter with a score of 550 and the looser is Helen with a score of 24
	,30|0;Peter;94566;12;10|1;Helen;94066;12;10
	,Set totals;100;Peter;0;0;0;0;0
	*/




	windUpSetXX() {//moved to plu
		console.log("cp.windUpSet  = ");
		//plu.displayResultsOfSet();
		plu.gatherDataAndGoToGameOver();
		const results = plu.getWinner();
		console.log("cp.windUpSet  = ");
		plu.readOutRndScore();
		plu.getInfo();
		plu.listPlayers();
		plu.getStatusLine();
	}


	playNextRound(reason) {
		console.log("cp.playNextRound() " );
		if (setBeingPlayed == null) {
			console.log("No Set In play  " );
			return;
		}
		hidAnsBut();
		hideAnsBox();
		setBeingPlayed.playNextRnd("cp 249");

		/*
		console.log("++++AA");
		cleanPlayArea();
		console.log("++++BB");

		if(this.roundCount++ > 0){
			plu.addRndScoreToSet();
		}
		const rnd = setBeingPlayed.getNextRnd("cp PlayNextRound");
		console.log("|**rnd =  "  + rnd );
		if (rnd == "" || rnd == null) {
			///cp.itf.cleanPlayArea();
			cleanPlayArea();//this goes to script
			this.windUpSet();
			return;
		}else {
			cp.itf.cleanPlayArea();
			//disableAnsBut();
			///cleanPlayArea();//this goes to script
			console.log(" *||* "  );
			const round = this.sp.getRoundFmRnd(rnd);
			//console.log(" |*Q| " + round.getTheQuestion() );
			this.startGame(round);
		}
		*/

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

	
	startGame(aRound, sampleData) {
		console.log("^^^cp.startGame onNet= " + onNet + " type= " + aRound );
		//console.log("^^^aRound=  " + aRound );
		//console.log("^^^sampleData=  " + sampleData );
		//this.theQuestion = aRound.getTheQuestion();
		bidButs.stopBidClock();

		this.theRoundInPlay = aRound;
		console.log("aRound =  " + aRound);
		this.gameType = aRound.getGameType();
		this.rndSerNbr = aRound.getSerNbr();
		console.log("this.gameType =  " + this.gameType);
		this.sampleData = sampleData;//For offnet
		disableNextRndBut();
		disableAnsBut();
		switch (this.gameType) {
			case 'A':
				gameA = new GameA(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameA;
				gameA.init();
			break;
			case 'B':
				this.itfType = "B"
				gameB= new GameB(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameB;
				gameB.init();
			break;
			case 'C':
				this.itfType = "B"
				gameC = new GameC(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameC;
				gameC.init();
			break;
				case 'D':
				this.itfType = "D"
				gameD = new GameD(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameD;
				///gameD.init();
			break;
			case 'E':
				this.itfType = "B"
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
				//gameL.init();//We post a notice first then init
			break;
			case 'M':
				this.itfType = "B"
				gameM = new GameM(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameM;
				gameM.init();
			break;
			case 'N':
				this.itfType = "D"
				gameN = new GameN(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameN;
				///gameN.init();
			break;
			case 'O':
				this.itfType = "B"
				gameO = new GameO(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameO;
				gameO.init();
			break;
			case 'P':
				this.itfType = "B"
				gameP = new GameP(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameP;
				gameP.init();
			break
			case 'Q':
				this.itfType = "B"
				gameQ = new GameQ(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameQ;
				gameQ.init();
			break;
			case 'U':
				this.itfType = "B"
				gameU = new GameU(aRound,this,this.utl,this.plu,this.itf);
				this.theGameInPlay = gameU;
				gameU.init();
			break;
			case 'X':
				this.itfType = "X"
				gameX = new GameX(aRound,this,this.utl,this.plu,this.itf);//console.log(" =" + );
				this.theGameInPlay = gameX;
				gameX.init();
			break;

			default:

		}

		if (this.itfType == "B") {
			console.log("this.itfType == B ")
			//this.itf.showButGrp();
			//bidButs.setBidTime(20);
			//bidButs.startBidClock();
		} else {
			timeBox.value = "";
			///this.itf.showButGrp();
		}

		console.log("## cp.BOTTOM GameType= " + this.gameType + " theGameInPlay= " + this.theGameInPlay + " itfType=  " + this.itfType);
	}




	regPlayer(player){
		console.log("CP.regPlayers TOP ");
		this.playerArray.push(player);
		console.log("CP.regPlayers BOTTOM ");
	}

	playTheGame(){console.log("cp.playTheGame  ? ??");


	}

	regPlayersXX(){ console.log("cp.regPlayer ");
		const pArr  =  itf.getFormData();
		console.log("script.pArr= " + pArr);	
	}

	setTopDisplayXX(){
		this.itf.create2PlayerTop();

	}

	setDocsXX(){

	}

	setPointsXX(nbrOfPoints){
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

	

	setCheckBut(){console.log("CP.setCheckBut  DEPRECATED" );

	}
	


}
