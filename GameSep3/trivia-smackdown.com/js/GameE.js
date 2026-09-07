// JavaScript source code
class GameE extends BoxGame{//console.log(" =" + );
	constructor (round,cp,utl){
		console.log("GameE.constructor TOP"  );
		super (round,cp,utl);
		this.utl = utl;
		this.inputArray;
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
		this.rw =[];
		console.log("GameE.constructor BOTTOM"  );
	}
	init(){
		console.log("GameE.init TOP"  );
		super.init();
		this.loadButtonValues();
		console.log("GameE.init BOTTOM "  +  this.gameInPlay);//        console.log("GameE. "  + )
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
		cp.itf.removeAllButtons();
	}

	reset(pf){console.log("GameE.reset " + pf);
		this.nbrHit= 0;
		this.rw =[];
		if(pf == "failed"){
			this.restoreTheRows(this.rowsHit);
		}
		this.rowsHit = [];
		cp.itf.playInProgress = false;
	}







	checkPlay(){console.log("GameE.checkPlay TOP this.rw = " +  this.rw + "  cp.itf.targNbr= " + cp.itf.targNbr);
		//stopTheClock();
		let pf = "passed";
		let results ="";
		const nbr = this.rw.length;
		if(nbr < cp.itf.targNbr){
			results+= "Too few items clicked."
			pf = "failed";

		}else{
			for (let i = 0;i<this.cols;i++){
				if(this.rw[i] == "W"){
					pf = "failed";;
					results+= "At least one was wrong."
					break;
				}
			}
		}
		console.log(pf + "  ---  " +  results );

		cp.itf.displayPtsThisPlay(pf,results);
  }
	
	loadButtonValues(){//GameE
		console.log("GameE.loadButtonValues TOP this.nbrOfButs=  " +  this.nbrOfButs);
		const mixedArray = this.utl.mixUpArray(this.gameDataArray);

		for (let i = 0;i<this.rows;i++){ //For GameE, the exception is always the first item.
			//console.log(i + " this.gameDataArray[i]= " +  this.gameDataArray[i] );
			const theLine = this.gameDataArray[i].split(';');
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
				console.log(" el.value " +  el.value )


				el.addEventListener("click", function(){
					click();
					gameE.butHit(butID); 
				});
			}
;			
         console.log("BBthis.this.butArray[i].value = " + this.butArray[i].value)
		}
		cp.itf.setTheNbrOfbuts(this.rows);
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


	butHit(butID){console.log("**********GameE.butHit  TOP " + butID   + "  cp.itf.playInProgress = " +  cp.itf.playInProgress);
		if(cp.itf.playInProgress == false){
			console.log("this.playInProgress "  + this.playInProgress);
			cp.itf.postNotice("You need to click on a button indicating the number of items you will try to get right first.")
			return;
		}
		const butThatWasHit = document.getElementById(butID);//but0:0
		const value = butThatWasHit.value;                        console.log("GameE.value "  + value);
		if(value == '             ') return;

		const idPart = butID.charAt(3);                           //console.log("GameE.idPart "  + idPart);
		const idArray = idPart.split(':');                        //console.log("GameE.idArray "  + idArray);
		const theRow = idArray[0];                                //console.log("GameE.theRow "  + theRow);
		const butName = butThatWasHit.name;                       console.log("GameE.butName "  + butName)
		this.rowsHit.push(theRow);                                console.log("butName.charAt(0) "  + butName.charAt(0))
																  console.log("this.nbrHit "  + (this.nbrHit +1))
																  console.log("cp.itf.targNbr "  + cp.itf.targNbr)
		this.rw.push(butName.charAt(0));
		this.removeARow(theRow);

		if(++this.nbrHit == cp.itf.targNbr){
		console.log(" ++++Reached targNbr "   );
			stopTheClock("Reached targNbr");
			this.checkPlay();
			return;
		}
		console.log("GameE.butName.charAt(0) " + butName.charAt(0)   )
        console.log("GameE.butHit  TOP  butID=  " + butID + " value= " + value + " name= " + butName);	
	}

	removeARow(theRow){console.log("removeARow "  + theRow)
		for (let j = 0;j<this.cols;j++){ 
			const butID = 'but' + theRow + 'X' + j;
			const aBut = document.getElementById(butID);//but0:0
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
