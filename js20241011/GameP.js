// JavaScript source code
class GameP extends BoxGame{//console.log(" =" + );
	constructor (round,cp,utl){
		console.log("GameP.constructor TOP"  );
		super (round,cp,utl);
		this.utl = utl;
		this.inputArray;
		this.ptInc = 0;
		this.gameInPlay = "gameP";
		this.gameType = 'P';
		this.nbrRight = 0;
		this.nbrHit = 0;
		this.hitArray =[];
		this.rwArray = [];
		this.testCnt = 0;
		console.log("GameM.constructor BOTTOM"  );
	}
	init(){
		console.log("GameP.init TOP"  );
		super.init();
		this.loadButtonValues();
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




	checkPlay(txt) {
		console.log("GameP.checkPlay  " + txt + "    " + this.rwArray +  "  this.testCnt  " + this.testCnt )//this.rwArray
		this.testCnt++;
		if (this.testCnt > 1) {

			//this.crash();
		}
		let pf = "passed"
		let results =""
		for (let i = 0;i<this.rwArray.length;i++){
			if(this.rwArray[i] == "W"){
				results+= "Got one wrong.";
				pf = "failed"
			}
		}
		if(pf == "failed"){
			this.resetButValues();
		}
		cp.itf.displayPtsThisPlay(pf, results);

	}


	resetButValues(){console.log("GameP.resetButValues "    );
		for (let i = 0;i<this.hitArray.length;i++){
			const el = document.getElementById(this.hitArray[i]);
			const butName = el.name;//R-Venus
			const butValue = butName.substring(2);
			el.value = butValue;
		}
	}


	reset(pf){console.log("GameP resetButs top "   + pf  );
		if(pf == "failed"){
			this.resetButValues();
		}
		this.rwArray = [];
		this.hitArray = []
		this.nbrHit = 0;
		cp.itf.playInProgress = false;
		console.log("GameP resetButs Bottom "     )
	}
	
	//           console.log(" ");

	butHit(butID){console.log("GameP.butHit  TOP " + butID   + "   "  + cp.itf.targNbr);
        if(cp.itf.playInProgress == false){
			console.log("this.playInProgress "  + this.playInProgress);
			cp.itf.postNotice("You need to click on a button indicating the number of itesm you will try to get right first.")
			return;
		}

		const butThatWasHit = document.getElementById(butID);
        console.log("GameP.butHit  " + butThatWasHit + "   " + butThatWasHit.name);
        
		this.hitArray.push(butID);
		const butName = butThatWasHit.name;//R or W
		console.log("butName =  " + butName  );
		console.log("butNValue =  " + butThatWasHit.value  );

		const rw = butName.charAt(0);
		this.rwArray.push(rw);
		butThatWasHit.value = '            ';
		if (++this.nbrHit == cp.itf.targNbr) {
			//stopTheClock("Hit count reached");
			//this.checkPlay("Hit count reached");
			//this.hitCountReached = true;
			stopTheClock("Reached targNbr");
			this.checkPlay();
			return;
		}
		
	} 



	loadButtonValues(){//GameP
		console.log("GameP.loadButtonValues TOP this.nbrOfButs=  " +  this.nbrOfButs);
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
		cp.itf.setTheNbrOfbuts(this.nbrRight);

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

	showAnswers(){
		console.log("GameP showAnswers()) Top"     );
		for (let i = 0;i<this.hitArray.length;i++){
			showButton(this.hitArray[i])
		}
	}	

	replaceBoxes(){console.log("GameP.replaceBoxes()")//this.rwArray
		for (let i = 0;i<this.hitArray.length;i++){
			const el =	document.getElementById(this.hitArray[i]);
			el.value= el.name.slice(2);
			setButtonAsNotSelected(this.hitArray[i]);
		}

	}

}
