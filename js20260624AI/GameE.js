// JavaScript source code
class GameE extends Game {
	constructor(round, context) {
		super(round, context);
		this.context = context;
		this.ptInc = 0;
		//this.firstHit=true
		this.gameInPlay = "gameE";
		this.gameType = 'E';
		this.targRight = 0;
		this.correctHitCount = 0;
		this.hitArray =[];
		this.nbrHit = 0;
		this.targNbr=0;
		this.rowsHit =[];
		this.rw = [];
		this.whoGotThisOne = [];
		this.whoGotThisID = [];
		this.butArray = new Array();
		console.log("GameE.constructor BOTTOM"  );
	}
	init(){
		console.log("GameE.init TOP"  );
		super.init();
		this.loadButtonValues();
		bidButs.startBidClock();
		this.startPlay();
		console.log("GameE.init BOTTOM "  +  this.gameInPlay);//        console.log("GameE. "  + )
	}

	showAnswers() {console.log("GameE showAnswers()  " );//oracle;auricle,auricle;oracle,kernel;colonel,colonel;kernel,Maine;main,main;Maine,knew;
		qBox.textContent = qBox.textContent + "\nThe Correct Answers are in BLACK/WHITE"
		let buf = ""
		for (let i = 0; i < (this.butArray.length + 1); i++) {
			if (this.butArray[i] == undefined) continue;
			let nameAndRef = this.butArray[i].name;
			const pos = nameAndRef.indexOf(":")
			if(pos > 0){
				nameAndRef = nameAndRef.substring(0,pos);
			}
			this.butArray[i].value = nameAndRef.substring(2);
			console.log("this.whoGotThisOne  " + this.whoGotThisOne );
			if (nameAndRef.charAt(0) == "R") {
				this.butArray[i].style.color = 'white';
				console.log(i + " this.butArray[i].title  " + this.butArray[i].title)
				if (this.butArray[i].title == "0") {
					this.butArray[i].style.backgroundColor = plu.players[0].color;
				} else if (this.butArray[i].title == "1") {
					this.butArray[i].style.backgroundColor = plu.players[1].color;
				} else {
					this.butArray[i].style.backgroundColor = 'black';
				}
			}
		}
	}


	testA(){
		super.cleanPlayArea();
		this.cleanPlayArea();


	}


	cleanPlayArea(){console.log("GameE cleanUpPlayArea  "  );//this.theAnsBar
		super.cleanPlayArea();
		const gameInsrtPt = document.getElementById("gameInsrtPt");

		let collection = gameInsrtPt.children ;
		for(let j = 0;j <collection.length;j++){
			collection[j].remove();
		}
		this.whoGotThisOne = [];
		/*
		if(this.insrtPtLeft != undefined){
			collection = this.insrtPtLeft.children ;
			for(let j = 0;j <collection.length;j++){
				collection[j].remove();
			}
		}
		if(this.insrtPtRight != undefined){
			collection = this.insrtPtRight.children ;
			for(let j = 0;j <collection.length;j++){
				collection[j].remove();
			}
		}
		*/
		GameContext.itf.removeAllButtons();
	}

	reset(pf){console.log("GameE.reset " + pf);
		this.nbrHit= 0;
		this.rw =[];
		if(pf == "failed"){
			this.restoreTheRows(this.rowsHit);
		}
		this.rowsHit = [];
		////GameContext.itf.playInProgress = false;
	}


	


	/*
	XXXROUND.breakOutData top ,AA.Een00010,EdUGames tm,20021015,10,ThStHi LoPoCo,HiWo GeWo,,,country;historic items,,aPRA1_50 zPRA1_15,,,,,Countries/Historic Things,Pick the one item in each row that is not in the same Country as the others in the row,
	^AA.DCL.C.332374,Rows=4 Cols=3 FntSize=16 FntColor=blue BkGndColor=yellow LnCnt=1 SingleScreen=No Sort=No ,Taj Mahal:^AA.DCL.A.185153;The Globe Theater:^AA.DCL.A.120022;Saint Paul's Cathedral:^AA.DCL.A.182063;Big Ben:^AA.DCL.A.160023,The Acropolis:^AA.DCL.A.156043;The Holy See:^AA.DCL.A.092133;The Colosseum:^AA.DCL.A.163153;Sistine Chapel:^AA.DCL.A.183023,Great Wall of China:^AA.DCL.A.168103;Maginot Line:^AA.DCL.A.218013;Eiffel Tower:^AA.DCL.A.166013;Cathedral of Chartres:^AA.DCL.A.163043,Sphinx:^AA.DCL.A.183112;The Pentagon:^AA.DCL.A.323052;The Watergate:^AA.DCL.A.284093;Transcontinental Railroad:^AA.DCL.A.283012
	
	
	
	
	GameE.loadButtonValues TOP this.nbrOfButs=  12   Taj Mahal:^AA.DCL.A.185153;The Globe Theater:^AA.DCL.A.120022;Saint Paul's Cathedral:^AA.DCL.A.182063;Big Ben:^AA.DCL.A.160023,
	The Acropolis:^AA.DCL.A.156043;The Holy See:^AA.DCL.A.092133;The Colosseum:^AA.DCL.A.163153;Sistine Chapel:^AA.DCL.A.183023,
	Great Wall of China:^AA.DCL.A.168103;Maginot Line:^AA.DCL.A.218013;Eiffel Tower:^AA.DCL.A.166013;Cathedral of Chartres:^AA.DCL.A.163043,
	Sphinx:^AA.DCL.A.183112;The Pentagon:^AA.DCL.A.323052;The Watergate:^AA.DCL.A.284093;Transcontinental Railroad:^AA.DCL.A.283012
*/
	
	loadButtonValues(){//GameE
		console.log("GameE.loadButtonValues TOP this.nbrOfButs=  " + this.nbrOfButs + "   " + this.gameDataArray);
		const mixedArray = this.utl.mixUpArray(this.gameDataArray);

		for (let i = 0;i<this.rows;i++){ //For GameE, the exception is always the first item.
			//console.log(i + " this.gameDataArray[i]= " +  this.gameDataArray[i] );
			const theLine = this.gameDataArray[i].split(';');//The Acropolis:^AA.DCL.A.156043;The Holy See:^AA.DCL.A.092133;The Colosseum:^AA.DCL.A.163153;Sistine Chapel:^AA.DCL.A.183023
			const newArray = [];
			newArray.push('R-'+theLine[0]);
			for (let j = 1;j<this.cols;j++){
				newArray.push('W-'+theLine[j]);
			}
			const mixedArray =	this.utl.mixUpArray(newArray);


			for (let j = 0;j<this.cols;j++){
				const butID = 'but'+i+'X'+j;

				console.log("GameE.butID "  + butID);
				const el = document.getElementById(butID);
				el.name = mixedArray[j];//W-The Globe Theater:^AA.DCL.A.120022

				const arr = mixedArray[j].slice(2).split(":");//The Globe Theater:^AA.DCL.A.120022
				const theValue = arr[0]//The Globe Theater
				el.value = theValue;
				console.log("el.name  " +  el.name )
				console.log(" el.value " + el.value)
				el.title = "X";
				this.butArray.push(el);

				el.addEventListener("click", function(){
					click();
					gameE.butHit(butID); 
				});
			}
;			
         console.log("BBthis.this.butArray[i].value = " + this.butArray[i].value)
		}
		bidButs.createButs(this.rows);
		//console.log("GameE.loadButtonValues BOTTOM targRight= "  + this.targRight);		
	}

	resetLines(){console.log("GameE.resetLines " +  this.rowsHit );
		for (let i = 0;i<this.rowsHit.length;i++){
			for (let j = 0;j<this.cols;j++){
				//console.log( " butid=   "  );
				const but = document.getElementById(butID);

			}
		}
	}

	timesUp(){console.log("GameE.timesUp "    );
		this.eval();
	}

	endPlay(){console.log("GameE.endPlay() "    );
		this.eval();
	}


	butHit(butID){console.log("**********GameE.butHit  TOP " + butID   + "  GameContext.itf.playInProgress = " +  GameContext.itf.playInProgress);
		if (!gameInPlay) return;
		if (biddingInProgress) {
			showNoticeA("BIDDING STILL IN PROGRESS")
			return;
		}
		const butThatWasHit = document.getElementById(butID);//but0:0
		const value = butThatWasHit.value;                        console.log("GameE.value "  + value);
		if(value == '             ') return;
		const idPart = butID.charAt(3);                           
		const idArray = idPart.split(':');                        
		const theRow = idArray[0];                                
		const butName = butThatWasHit.name;                       
		this.rowsHit.push(theRow);

		console.log("butName.charAt(0) " + butName.charAt(0))	  
		console.log("this.rowsHit  " + this.rowsHit)
		console.log("this.whoGotThisOne  " + this.whoGotThisOne);

		this.rw.push(butName.charAt(0));
		this.removeARow(theRow);

		if(++this.nbrHit == bidButs.topBid){
		console.log(" ++++Reached targNbr "   );
			stopThePlayClock("Reached targNbr");
			this.checkPlay();
			return;
		}
		console.log("GameE.butName.charAt(0) " + butName.charAt(0)   )
        console.log("GameE.butHit  TOP  butID=  " + butID + " value= " + value + " name= " + butName);	
	}

	checkPlay() {
		console.log("GameE.checkPlay TOP this.rw = " + this.rw + "  bidButs.topBid= " + bidButs.topBid);
		//stopThePlayClock();
		let pf = "passed";
		let results = "";
		const nbr = this.rw.length;
		if (nbr < bidButs.topBid) {
			results += "Too few items clicked."
			pf = "failed";
		} else {
			for (let i = 0; i < this.cols; i++) {
				if (this.rw[i] == "W") {
					pf = "failed";;
					results += "At least one was wrong."
				}
			}
		}


		if (pf == "failed") {
			console.log(" FAILED " );
			this.restoreTheRows(this.rowsHit);
		} else {
			console.log( "PASSED " );
			for (let i = 0; i < this.rowsHit.length; i++) {
				this.removeARow(this.rowsHit[i]);
				this.whoGotThisOne[this.rowsHit[i]] = GameContext.itf.nowPlaying;
				//this.whoGotThisID[]
            }

			console.log(" this.whoGotThisOne= " + this.whoGotThisOne);
			bidButs.reduceButtons(bidButs.topBid);
			this.rowsHit = [];
		}
		this.reset(pf);
		GameContext.itf.displayPtsThisPlay(pf, results);
		if (bidButs.remButs == 0) {
			enableNextRndBut();
			enableAnsBut();
			gameInPlay = false;
		}

	}

	removeARow(theRow){console.log("removeARow "  + theRow)
		for (let j = 0;j<this.cols;j++){ 
			const butID = 'but' + theRow + 'X' + j;
			const aBut = document.getElementById(butID);//but0:0
            aBut.title = GameContext.itf.nowPlaying;
			aBut.value = '             ';
			//aBut.style.display = "none";
		}
	}

	restoreTheRows(rowArr){console.log("restoreTheRows "  + rowArr)
		for (let i = 0;i<rowArr.length;i++){ 
			for (let j = 0;j<this.cols;j++){ 
				const butID = 'but' + rowArr[i] + 'X' + j;
				console.log("butID= "  + butID)
				const aBut = document.getElementById(butID);//but0:0
				let butName = aBut.name;
				const pos = butName.indexOf(":")
				console.log("pos= " + pos);

				if(pos > 0){
					butName= butName.substring(2,pos-1);
				}else{
					butName= butName.substring(2);
				}
				aBut.value = butName;
			}
		}

	}


}
