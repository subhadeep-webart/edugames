// JavaScript source code
class GameM extends BoxGame{//console.log(" =" + );
	constructor(round, context) {
		super(round, context);
		this.context = context;
		this.inputArray;
		///this.ptInc = 0;
		this.firstHit=true
		this.gameInPlay = "gameM";
		this.gameType = 'M';
		this.arrayOfRemainingButs = [];
		this.dataPointMarker = 0;//Seta a marker in input data for each slice
		this.rw = [];
		this.idArr = []
		this.nbrHit = 0;
		this.ansArr = new Array();
		console.log("GameM.constructor BOTTOM"  );
	}
	init(){
		console.log("GameM.init TOP "  );
		super.init();
		this.nbrOfButs = this.rows * this.cols;
		this.loadButtonValues();
		bidButs.startBidClock();
		this.startPlay();
		console.log("GameM.init BOTTOM "  +  this.gameInPlay);//        console.log("GameM. "  + )
	}


	showAnswers() {
		console.log("GameM showAnswers()  " + this.ansArr);//oracle;auricle,auricle;oracle,kernel;colonel,colonel;kernel,Maine;main,main;Maine,knew;
		let longestQuestion = 0;
		let buf = "The Correct Pairing:\n"
		for (let i = 0; i < (this.ansArr.length + 1); i++) {
			if (i % 2 === 0)continue
			const aPair = this.ansArr[i].replace(";","---");
			console.log("aPair " + aPair);
			buf+= "   " + aPair + "\n"
		}

		console.log("GameQ longestQuestion " + longestQuestion);//

		this.displayAnswers(buf);
	}

	helloWorld(){
	console.log("GameM.helloWorld" );
		super.helloWorld();
	}

	cleanPlayArea(){console.log("BoxGame cleanUpPlayArea  "  );//this.theAnsBar
		super.cleanPlayArea();
	}

	getUnHiddenButs(){//After the play, this retrieves the buttons that have not been played so that they can be played again
       console.log("GameM.getUnHiddenButs Top "  + this.arrayOfRemainingButs);
		this.arrayOfRemainingButs.length = 0;
		for (let i = 0;i<this.nbrOfInsrtPts;i++){
			const id = this.insrtIdArray[i];
			const el = document.getElementById('but' + id);
			if(el.value != '||'){//they havn't been played'
				this.arrayOfRemainingButs.push(el.value + ',' + el.name);
			}
		}
		return this.arrayOfRemainingButs;	
	}

	endPlay(){
		console.log("GameM.endPlay() Top"   )
		//super endPlay();
		this.arrayOfRemainingButs = this.getUnHiddenButs();
		this.loadButtonValues();
      console.log("GameM.endPlay() Bottom"   )
	}

	reset(){console.log("reset " );
		this.nbrHit = 0;
		this.butHitArr = [];//
		this.butHitArrArr = []
		this.idArr =[];
		cp.itf.playInProgress = false;
	}
	


	blankButs(){console.log("blankButs top "  + this.idArr);
		for (let i = 0;i<this.idArr.length;i++){
			const el = document.getElementById(this.idArr[i])
			const theName = el.name;
			console.log("theName= " + theName);
			console.log("bidButs.bidWinnerNbr = " + bidButs.bidWinnerNbr);
			el.style.backgroundColor = plu.players[bidButs.bidWinnerNbr].color;
			el.value = "";
		}
        this.idArr = [];
		console.log("blankButs Bottom "  + this.idArr);
	}

	isTrgNbrReched(){console.log("isTrgNbrReched "  +  (this.nbrHit + 1 ) + "   " + bidButs.topBid);
		this.ansPending = false;
		if(++this.nbrHit == bidButs.topBid){
			cp.itf.timeFactor = stopThePlayClock();
			return true;
		}else{
			return false;
		}
	}

	resetButs() {
		console.log("resetButs top " + this.idArr);
		for (let i = 0;i<this.idArr.length;i++){
			const el = document.getElementById(this.idArr[i])
			el.style = 'background-color:aquamarine';
			const twoNames = el.name;
			const arr = twoNames.split(";")
			el.value = arr[0];
		}
		this.idArr = [];
		console.log("resetButs bottom " + this.idArr);
	}	

	butHit(butID) {
		console.log("****butHit " + butID + "  " + gameInPlay + "   " + this.idArr)
		if (!gameInPlay) return;
		if (biddingInProgress) {
			showNoticeA("BIDDING STILL IN PROGRESS")
			return;
		}
		const butThatWasHit = document.getElementById(butID);
		if (butThatWasHit.value == '||' || butThatWasHit.value == "") {
			showNoticeA("That was already hit");
			return;
		}
		this.idArr.push(butID);

		const value = butThatWasHit.value;//main
		const butName = butThatWasHit.name;//main;Maine
        console.log("$$$$butHit  butID=  " + butID + " value= " + value + " name= " + butName + "  firstHit = " + this.firstHit);

		if(this.firstHit == true){//firstHit
			this.firstButID = butID;
			butThatWasHit.style='background-color:white';
			this.hitTarget = value;
			this.firstHit = false;
		}else{//Second hit
			this.firstHit = true;//reset it
			const pairArray = butName.split(';');
			if(this.hitTarget == pairArray[0] || this.hitTarget == pairArray[1]){
				this.rw.push("R");
				console.log("success ");
				///this.ptInc+=2;
				document.getElementById(this.firstButID).value='||';
				document.getElementById(this.firstButID).style='background-color:aquamarine';
				document.getElementById(butID).value='||';
			}else{
				console.log("failure ");
				this.rw.push("W");
				document.getElementById(this.firstButID).value='||';
				document.getElementById(this.firstButID).style='background-color:aquamarine';
				document.getElementById(butID).value='||';
				this.firstHit = true;
				//this.endPlay();
				//showButton(this.firstButID);
			}

			console.log(this.nbrHit +  "  +++  "  +  bidButs.topBid );			
			if (++this.nbrHit == bidButs.topBid) {

				this.checkPlay()
			}
						 				
		}
	console.log("GameM.butHit  Bottom "   );
	} 


	checkPlay(){console.log("##########GameM.checkPlay TOP this.rw = " +  this.rw + "  bidButs.topBid= " + bidButs.topBid);
		stopThePlayClock();
		///this.ansPending = false;
		let pf = "passed";
		let results ="";
		const nbr = this.rw.length;
		if(nbr < bidButs.topBid){
			results+= "Too few items clicked."
			pf = "failed";
		}else{
			for (let i = 0;i<this.rw.length;i++){
				if(this.rw[i] == "W"){
					pf = "failed";;
					results+= "At least one was wrong."
					break;
				}
			}
		}		
		//this.resetQBox(qBoxInPlay);
		console.log(pf + "  ---  " +  results );
		if(pf == "passed"){
			this.blankButs();
			bidButs.reduceButtons(bidButs.topBid);
		}else{
			this.resetButs();
		}
		this.rw = [];
		this.nbrHit = 0;
		if (bidButs.remButs == 0) {
			enableAnsBut();
			enableNextRndBut();
			gameInPlay = false;
		}
		cp.itf.displayPtsThisPlay(pf,results);
  }

  //AA.Men01776-Match the book with the author.
;
	
	loadButtonValues(){console.log("GameM.loadButtonValues TOP this.nbrOfButs=  " +   this.nbrOfButs);		
		let nbrOfButsToFill = this.nbrOfButs;
		let nbrOfPairs = this.nbrOfButs/2;
		if(nbrOfPairs > 10){
			nbrOfPairs = 10;
			nbrOfButsToFill = 20;
		}
		//bidButs.createButs(this.nbrOfButs/2);
		bidButs.createButs(nbrOfPairs );

		//If we have items left over from the last play, they are in this.arrayOfRemainingButs
		//But remember,each data item fill two buttons example 12 - 4 = 8 buttons, but only 4 data item
		//let nbrOfDataItemsToGet  = this.nbrOfButsToFill/2;
		let nbrOfDataItemsToGet  = nbrOfPairs;		


		if(this.arrayOfRemainingButs != null){
			nbrOfDataItemsToGet = (nbrOfButsToFill - this.arrayOfRemainingButs.length)/2
		}
		

		const gridLocs = [];//Make this a one only calc
		for (let i = 0;i<this.rows;i++){
			for (let j = 0;j<this.cols;j++){
				gridLocs.push(i+'X'+j);//we end up wiht 0X0,0X1,0X2...
			}
		}
		
		console.log("nbrOfDataItemsToGet = " + nbrOfDataItemsToGet);
        console.log("GameM.this.dataPointMarker "  + this.dataPointMarker);
        //console.log("GameM. this.gameData= " + this.gameDataArray);
		
		const inputDataArray = this.gameDataArray.slice(this.dataPointMarker,(this.dataPointMarker + nbrOfDataItemsToGet));//Each data item will have two buttons auricle;oracle,colonel;kernel,sleight;slight
		this.dataPointMarker +=nbrOfDataItemsToGet;
		const arrayOfNamesAndValues = this.arrayOfRemainingButs;//These lool like auricle,auricle;oracle, colonel,colonel;kernel... from getUnHiddenButs()

		//Where as i = 1/2 the item from the Game input. the output is twice that amount
		//because each item create two buttons to be paired

		const inputDataArrayMixed= this.utl.mixUpArray(inputDataArray);
		
		for (let i = 0;i<nbrOfDataItemsToGet;i++){ 
			const arrayOfParts = inputDataArrayMixed[i].split(';');//auricle;oracle
			//The arangement is to have the value the same as the first part of the name. This helps in gathering the non played items   
			arrayOfNamesAndValues.push(arrayOfParts[0] + ',' + arrayOfParts[0] + ';' + arrayOfParts[1]);//auricl,auricle;oracle 
			arrayOfNamesAndValues.push(arrayOfParts[1] + ',' + arrayOfParts[1] + ';' + arrayOfParts[0]);//oracle,oracle;auricle;
		}
		//console.log("AAarrayOfNamesAndValues = " + arrayOfNamesAndValues)

		//const mixedArray = this.utl.mixUpArray(arrayOfNamesAndValues);

		//console.log("BBarrayOfNamesAndValues = " + arrayOfNamesAndValues)

		console.log("nbrOfButsToFill =" +  nbrOfButsToFill);
		const arrMixed = cp.utl.mixUpArray(this.butArray);

		for (let i = 0;i<nbrOfButsToFill;i++){
			const inputItem = this.arrayOfRemainingButs.pop();//Takes "oracle,oracle;auricle"


			const newArray = inputItem.split(',');
			const aBut = arrMixed[i];
			aBut.name = newArray[1]; //auricle;oracle
			this.ansArr.push(aBut.name);
			aBut.value = newArray[0];//auricle
			const theButID = aBut.id;
			aBut.addEventListener("click", function(){
				gameM.butHit(theButID); 
			});
			//At this point all the buttons are loaded with different values and the pairs are either part1 or part2

		}
		console.log("GameM.loadButtonValues BOTTOM  this.ansArr " + this.ansArr );		
	}	
}
