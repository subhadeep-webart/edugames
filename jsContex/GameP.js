// JavaScript source code
class GameP extends BoxGame{//console.log(" =" + );
	constructor(round, context) {
		super(round, context);
		this.context = context;
		this.inputArray;
		this.ptInc = 0;
		this.gameInPlay = "gameP";
		this.gameType = 'P';
		this.nbrRight = 0;
		this.nbrHit = 0;
		this.hitArray =[];
		this.rwArray = [];
		this.ButArray = new Array();
		this.testCnt = 0;
		console.log("GameM.constructor BOTTOM"  );
	}
	init(){
		console.log("GameP.init TOP"  );
		super.init();
		this.loadButtonValues();
		bidButs.startBidClock();

		console.log("GameP.init BOTTOM "  +  this.gameInPlay);//        console.log("GameM. "  + )
	}

	cleanPlayArea(){console.log("GameO cleanUpPlayArea  "  );//
		super.cleanPlayArea();

		const theTable = document.getElementById("theTable");
		if(theTable != undefined){
			const collection = theTable.children ;
			console.log("GameO collection = " + collection );//
			for(let j = 0;j <collection.length;j++){
				console.log(j + "  right collection  " +  collection[j]);//
				collection[j].remove();
			}
		}
	}


	start(){		

	}
	gameOver(){
		console.log("GameP.gameOver Top" );
	}
	changePlayers(){
		console.log("GameP.changePlayers Top" );
	}

	testA(){console.log("GameP.Test" );
		gameN.testEvalForD();
	}




	checkPlay(txt) {console.log("GameP.checkPlay  " + txt + "    " + this.rwArray  + " bidButs.topBid  "  + bidButs.topBid)//this.rwArray
		let pf = "passed"
		let results =""
		if(this.rwArray.length < bidButs.topBid){
			results+= "Insufficient Number Answered!."
			pf = "failed";
		}
		for (let i = 0;i<this.rwArray.length;i++){
			if(this.rwArray[i] == "W"){
				results+= "Got one wrong.";
				pf = "failed";
			}
		}
		if(pf == "failed"){
			this.resetButValues();
		}
		console.log("GameP.bidButs.remButs= " + bidButs.remButs + " bidButs.topBid   " + bidButs.topBid);
		if(pf != "failed"){
			bidButs.reduceButtons(bidButs.topBid);
			this.setPlayerColor(cp.itf.nowPlaying);
		}
		cp.itf.displayPtsThisPlay(pf, results);
		if (bidButs.remButs == 0) {
			enableNextRndBut();
            enableAnsBut();
			gameInPlay = false;
		}
		this.reset(pf);
	}


	setPlayerColor(n) {
		console.log("setPlayerColor " + n + "   " + plu.players[n].color);
		for (let i = 0; i < this.hitArray.length; i++) {
			const el = document.getElementById(this.hitArray[i]);
            console.log("el= " + el.id );
			el.style.backgroundColor = plu.players[n].color;
		}
	}



	resetButValues(){console.log("GameP.resetButValues "  + this.rwArray  );
		for (let i = 0;i<this.hitArray.length;i++){
			const el = document.getElementById(this.hitArray[i]);
			const butName = el.name;//R-Venus
			const butValue = butName.substring(2);
			el.value = butValue;
		}
	}


	reset(pf) {
		console.log("GameP resetButs top  " + bidButs.remButs);
		if (bidButs.remButs == 0) {
			enableNextRndBut();
		} else {
			if (pf == "failed") {
				this.resetButValues();
			} else {
				bidButs.reduceButtons(bidButs.topBid);
			}
			this.rwArray = [];
			this.hitArray = []
			this.nbrHit = 0;
			bidButs.restartBidding();
		}

		console.log("GameP resetButs Bottom "     )
	}
	
	//           console.log(" ");

	butHit(butID) {
		console.log("GameP.butHit  TOP " + butID + "   " + bidButs.topBid);
		if (!gameInPlay) return;
		if (biddingInProgress) {
			showNoticeA("BIDDING STILL IN PROGRESS")
			return;
		}

		const butThatWasHit = document.getElementById(butID);
		if (butThatWasHit.value == '            ' || butThatWasHit.value == "") {
			showNoticeA("That was already hit");
			return;
        }
		
        console.log("GameP.butHit  " + butThatWasHit + "   " + butThatWasHit.name);
        
		this.hitArray.push(butID);
		const butName = butThatWasHit.name;//R or W
		console.log("butName =  " + butName  );
		console.log("butNValue =  " + butThatWasHit.value  );

		const rw = butName.charAt(0);

		console.log("rw =  " + rw);

		this.rwArray.push(rw);
		butThatWasHit.value = '            ';
		console.log("bidButs.topBid)=  " + bidButs.topBid);
		console.log("this.nbrHit=  " + (this.nbrHit + 1));

		if (++this.nbrHit == bidButs.topBid) {
			//stopThePlayClock("Hit count reached");
			//this.checkPlay("Hit count reached");
			//this.hitCountReached = true;
			stopThePlayClock("Reached targNbr");
			this.checkPlay();
			return;
		}
		
	} 

	showAnswers(){
		console.log("GameP showAnswers()) Top");
		qBox.textContent ="The answers are in WHITE letters"
		for (let i = 0; i < this.nbrOfButs; i++) {
			console.log("this.butArray[i].id= " + this.butArray[i].id);
			console.log("this.butArray[i].name= " + this.butArray[i].name);
			console.log("this.butArray[i].value= " + this.butArray[i].value);
			if (this.butArray[i].name.charAt(0) == "R") {
				this.butArray[i].value = this.butArray[i].name.substring(2);
				this.butArray[i].style.color = 'white';
                console.log("this.butArray[i].style.backgroundColor= " + this.butArray[i].style.backgroundColor);
				if (this.butArray[i].style.backgroundColor == "aquamarine") {
					this.butArray[i].style.backgroundColor = 'black';
					this.butArray[i].style.color = 'white';
				}
			}
			/*
			const RW = this.gameDataArray[i].charAt(0);//R-Saturn,R-Earth,W-Despina,W-Titania,
			if (RW === 'R') { this.nbrRight++ };
			this.butArray[i].name = this.gameDataArray[i];
			this.butArray[i].value = this.gameDataArray[i].slice(2);
			const butID = this.butArray[i].id*/
		}

		/*
		for (let i = 0;i<this.hitArray.length;i++){
			showButton(this.hitArray[i])
		}*/
	}	



	loadButtonValues(){//GameP
		console.log("GameP.loadButtonValues TOP this.nbrOfButs=  " +  this.nbrOfButs + "  " +  this.gameDataArray);
		const mixedArray = this.utl.mixUpArray(this.gameDataArray);
		for (let i = 0;i<this.nbrOfButs;i++){ 
			const RW = this.gameDataArray[i].charAt(0);//R-Saturn,R-Earth,W-Despina,W-Titania,
			if(RW === 'R'){this.nbrRight++};
			this.butArray[i].name = this.gameDataArray[i];
			this.butArray[i].value = this.gameDataArray[i].slice(2);
			const butID = this.butArray[i].id
			this.butArray[i].addEventListener("click", function(){
				gameP.butHit(butID); 
			});
		}
		bidButs.createButs(this.nbrRight);

		console.log("GameP.loadButtonValues BOTTOM targRight= "  + this.targRight);		
	}

	helloWorld(){
	console.log("GameP.helloWorld" );
		super.helloWorld();
	}

	playOver(success){
		console.log("GameP playOver() Top this.trysLeft= "  +  this.trysLeft  + " success= " + success);
		if(success){
			this.gameOver();
			return;
		}
		if(!this.singlePlayerl){
			this.changePlayers();
		}else{
			this.trysLeft--;
			console.log("GameP.playOver this.trysLeft" + this.trysLeft);S
			if(this.trysLeft == 0){
				this.roundOver();
				this.showAnswers();
			}else{
				let pts = document.getElementById('ptAwd').value;
				console.log("AApts =" + pts);
				document.getElementById('trys').value = this.trysLeft;
				pts = Math.trunc(pts/2);//We half each time
				console.log("BBpts =" + pts);
				document.getElementById('ptAwd').value = pts;
			}
		}
		console.log("GameP playOver() Bottom this.trysLeft= "  +  this.trysLeft );
	}



	replaceBoxes(){console.log("GameP.replaceBoxes()")//this.rwArray
		for (let i = 0;i<this.hitArray.length;i++){
			const el =	document.getElementById(this.hitArray[i]);
			el.value= el.name.slice(2);
			setButtonAsNotSelected(this.hitArray[i]);
		}

	}

}
