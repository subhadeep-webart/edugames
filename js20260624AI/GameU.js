// JavaScript source code
class GameU extends Game {
	constructor(round, context) {
		super(round, context);
		this.context = context;
		this.inputArray;
		this.ptInc = 0;
		this.gameInPlay = "gameU";
		this.gameType = 'U';
		this.colToBeHit = 0;
		this.correctHitCount = 0;
		this.butHitArr =[];
		this.hitArray = [];
		this.idArr =[];
		this.butHitArrArr =[]
		this.playOn = false;
		this.nbrHit = 0;
		this.ansLst = "";
		console.log("GameU.constructor BOTTOM"  );
	}
	init(){
		console.log("GameU.init TOP"  );
		super.init();
		this.loadTextValues();
		bidButs.startBidClock();
		console.log("GameU.init BOTTOM "  +  this.gameInPlay);//        console.log("GameU. "  + )
	}
//Pair the name with what the person is know for.,SuperQuiz,Rows=8 Cols=2 FntSize=18 FntColor=black BkGndColor=white LnCnt=1 FlushNbr=1 SingleScreen=No Sort=Yes,
//Complete the Bible sayings.                    ,^AA.DCL.E,Rows=7 Cols=3 FntSize=14 FntColor=blue BkGndColor=lightGray LnCnt=1 SingleScreen=No Sort=Yes

	showAnswers() {console.log("Game U showAnswers()= " + this.dataForThisGame);
		let buf = "The Answers are as follows:\n\n";

		console.log(typeof this.dataForThisGame);
		const arr = this.dataForThisGame.toString().split(",")
		console.log("arr.length=    " + arr.length)
		for (let i = 0; i < arr.length; i++) {
			console.log("Game arr[i] ==  " + arr[i]);
			if (arr[i] == undefined) continue;
			const arr2 = arr[i].split(";");
			for (let j = 0; j < this.cols; j++) {
				buf+= arr2[j] 
				if (j < (arr.length-1)) buf+= "--"
			}
			buf += "\n";
		}

		console.log("buf=    " + buf)
		this.displayAnswers(buf);
	}




	checkPlay() {console.log("####checkPlay = " + " targNbr= " + bidButs.topBid + "  " + this.butHitArrArr + " this.nbrHit= " + this.nbrHit);
		stopThePlayClock("targetReached");
		let pf = "passed";
		let results = "";
		if (this.nbrHit != bidButs.topBid) {
			this.resetTextValues();
			GameContext.itf.displayPtsThisPlay("failed", "Too few lines completed.");
			return;
		}
		for (let i = 0; i < this.butHitArrArr.length; i++) {
			const aRow = this.butHitArrArr[i];
			let firstNbr = aRow[0];
			console.log("firstNbr= " + firstNbr);
			for (let j = 1; j < this.cols; j++) {
				console.log(firstNbr + " ---  " + aRow[j]);
				if (firstNbr != aRow[j]) {
					console.log("  failed  ");
					pf = "failed";
					results += "At lease one was wrong."
					break
				}
			}
		}
		if (pf == "failed") {
			this.resetTextValues();
		}else{
			bidButs.reduceButtons(bidButs.topBid);
		}
		this.reset(true);
		console.log(pf + "  |||  " + results + "  bidButs.topBid= " + bidButs.topBid + " bidButs.remButs=  " + bidButs.remButs) ;//bidButs.showButs();
		GameContext.itf.displayPtsThisPlay(pf, results); if (bidButs.remButs == 0) {
			enableAnsBut();
			enableNextRndBut();
			gameInPlay = false;
		}

	}

	reset() {
		console.log("$$$$$$$$$reset ");
		//super.reset();
		this.colToBeHit = 0;
		this.nbrHit = 0;
		this.butHitArr = [];//
		this.butHitArrArr = []
		this.idArr = [];
	}




	//GameU.dataForThisGame Get thee;behind me;Satan.;^AA.DCL.A.009053,It is better;to give;than to receive.;^AA.DCL.A.009063,My God;My God why;hast thou forsaken me?;^AA.DCL.A.018033,Read;the handwriting;on the wall ;^AA.DCL.A.010033

	
	loadTextValues() {
		console.log("loadTextValues nbrOfButs= " + this.nbrOfButs );
		
		bidButs.createButs(this.rows);
		const mixedArray = this.utl.mixUpArray(this.gameDataArray);
		this.dataForThisGame = mixedArray.slice(0, this.rows);

		console.log("GameU.dataForThisGame " + this.dataForThisGame);

		const bigRowArray = [];
		const bigColArray = [];
		for (let i = 0;i<this.cols;i++){
			const aCol = [];
			bigColArray.push(aCol);
		}
		console.log("***igColArray= " + bigColArray);

		for (let i = 0;i<this.rows;i++){
			const rowArray = mixedArray[i].split(';');
			for (let j = 0;j<this.cols;j++){
				const str = i + "-" + rowArray[j];console.log("GameU.str "  + str);
				bigColArray[j].push(str);
			}
		}
		console.log("$$$bigColArray= " + bigColArray);
		const mixedColArray = [];
		for (let i = 0;i<this.cols;i++){
			mixedColArray[i] = this.utl.mixUpArray(bigColArray[i]);
		}				

		//Now put them in the buttons by col
		for (let i = 0;i<this.cols;i++){
			const datCol = mixedColArray[i];//console.log("GameU.datCol "  + datCol);//0-Render therefore,0-Man,0-The last,0-Get thee
			for (let j = 0;j<this.rows;j++){//but0:0 =
				const butID = 'but'+j+'X'+ i;
				const el =	document.getElementById(butID);
				el.value = datCol[j].substring(2);
				this.textDisplayed.push(el.value);
				el.name = datCol[j];
				el.addEventListener("click", function(){
					gameU.butHit(butID); 
				});
			}
		}


		console.log("GameU.loadTextValues BOTTOM targRight= " + this.targRight + " this.textDisplayed=\n " + this.textDisplayed);	
		console.log("getTimeFactorForThisGame() = " + this.getTimeFactorForThisGame());	
	}

	getTimeFactorForThisGame() {
		return (this.getTextHiLength()/25)
	}

	//GameU.dataForThisGame Get thee;behind me;Satan.;^AA.DCL.A.009053,It is better;to give;than to receive.;^AA.DCL.A.009063,My God;My God why;hast thou forsaken me?;^AA.DCL.A.018033,Read;the handwriting;on the wall ;^AA.DCL.A.010033

	resetTextValues(){console.log("resetTextValues "  + this.idArr);
		for (let i = 0;i<this.idArr.length;i++){
			const el = document.getElementById(this.idArr[i])
			const theName = el.name;
			console.log("theName= "  + theName);
			el.value = theName.substring(2);
		}
	}

	isTrgNbrReched(){console.log("#####isTrgNbrReched "  +  (this.nbrHit  ) + "   " + bidButs.topBid);
		if(this.nbrHit == bidButs.topBid){
			return true;
		}else{
			return false;
		}
	}
	

	butHit(butID){console.log("*****butHit " + butID  + " colToBeHit= " + this.colToBeHit);
		if (!gameInPlay) return;
		if (biddingInProgress) {
			showNoticeA("BIDDING STILL IN PROGRESS")
			return;
		}

		const butThatWasHit = document.getElementById(butID);//but0:0
		const value = butThatWasHit.value;
		if (value == '||') {
			playBeep();
			return;
		}
		const name = butThatWasHit.name;
		const pos = butID.indexOf('X');
		const colHit = butID.charAt(pos + 1,10);
		this.idArr.push(butID);
		if (colHit != this.colToBeHit) {
			playBeep();
			postNoticeCenterDisplay("18,white,Click on the columns in order -- Left to Right");
			return;
		}else{
			this.colToBeHit++;
			const n = name.charAt(0);
			this.butHitArr.push(n); 
			butThatWasHit.value =  '||';
		}

		if(this.colToBeHit == this.cols){
			this.nbrHit++;											
			this.butHitArrArr.push(this.butHitArr);
			this.butHitArr = [];
			this.colToBeHit = 0;//reset cols
			if(this.isTrgNbrReched()){//If true, this  stops the clock which checks play
				this.checkPlay();
			}
		}

	}

	startPlayXX(targNbr) {
		console.log(" GameU startPlay " + targNbr);
	}


}
