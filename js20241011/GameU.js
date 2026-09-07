// JavaScript source code
class GameU extends BoxGame{//console.log(" =" + );
	constructor (round,cp,utl){
		console.log("GameU.constructor TOP"  );
		super (round,cp,utl);
		this.utl = utl;
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
		this.nbrHit=0;
		console.log("GameU.constructor BOTTOM"  );
	}
	init(){
		console.log("GameU.init TOP"  );
		super.init();
		this.loadButtonValues();
		console.log("GameU.init BOTTOM "  +  this.gameInPlay);//        console.log("GameU. "  + )
	}
//Pair the name with what the person is know for.,SuperQuiz,Rows=8 Cols=2 FntSize=18 FntColor=black BkGndColor=white LnCnt=1 FlushNbr=1 SingleScreen=No Sort=Yes,
//Complete the Bible sayings.                    ,^AA.DCL.E,Rows=7 Cols=3 FntSize=14 FntColor=blue BkGndColor=lightGray LnCnt=1 SingleScreen=No Sort=Yes


	//const el = document.getElementById('ptAwd').value = this.ptAwd;
	
	loadButtonValues(){console.log("loadButtonValues nbrOfButs= " + this.nbrOfButs);
		cp.itf.setTheNbrOfbuts(this.rows);
		const mixedArray = this.utl.mixUpArray(this.gameDataArray);
		const dataForThisGame = mixedArray.slice(0,this.rows);               console.log("GameU.dataForThisGame "  + dataForThisGame);
		const bigRowArray = [];
		const bigColArray = [];
		for (let i = 0;i<this.cols;i++){
			const aCol = [];
			bigColArray.push(aCol);
		}
		for (let i = 0;i<this.rows;i++){
			const rowArray = mixedArray[i].split(';');
			for (let j = 0;j<this.cols;j++){
				const str = i + "-" + rowArray[j];               //console.log("GameU.str "  + str);
				bigColArray[j].push(str);
			}
		}
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
				el.name = datCol[j];
				el.addEventListener("click", function(){
					gameU.butHit(butID); 
				});
			}
		}						
		console.log("GameU.loadButtonValues BOTTOM targRight= "  + this.targRight);		
	}




	reset(){console.log("$$$$$$$$$reset " );
		this.colToBeHit = 0;
		this.nbrHit = 0;
		this.butHitArr = [];//
		this.butHitArrArr = []
		this.idArr =[];
		cp.itf.playInProgress = false;
	}

	returnButValues(){console.log("returnButValues "  + this.idArr);
		for (let i = 0;i<this.idArr.length;i++){
			const el = document.getElementById(this.idArr[i])
			const theName = el.name;
			console.log("theName= "  + theName);
			el.value = theName;
		}
	}

	isTrgNbrReched(){console.log("#####isTrgNbrReched "  +  (this.nbrHit  ) + "   " + cp.itf.nbrButSelected);
		this.ansPending = false;
		if(this.nbrHit == cp.itf.nbrButSelected){
			cp.itf.timeFactor = stopTheClock();
			console.log(" TARG REACHED "  );
			return true;
		}else{
			//this.flashQBox();
			return false;
		}
	}
	

	butHit(butID){console.log("*****butHit " + butID  + " colToBeHit= " + this.colToBeHit);
		
		if(cp.itf.playInProgress == false){
			console.log("cp.itf.playInProgress "  + cp.itf.playInProgress);
			cp.itf.postNotice("You need to click on a button indicating the number of lines you will try to get right first.")
			return;
		}
		const butThatWasHit = document.getElementById(butID);//but0:0
		const value = butThatWasHit.value;
		if(value == '||'){
			return;
		}
		const name = butThatWasHit.name;             console.log("name= "  + name);
		const pos = butID.indexOf('X');
		const colHit = butID.charAt(pos + 1,10);        console.log("colHit= "  + colHit);
		this.idArr.push(butID);
		if(colHit != this.colToBeHit){
			alert("You need to click on the columns in order -- Left to Right");
			return;
		}else{
			this.colToBeHit++;
			const n = name.charAt(0);	console.log("n= "  + n);
		
			this.butHitArr.push(n);       console.log("GameU.this.hitArray== "  + this.hitArray);//0-The meek 
			butThatWasHit.value =  '||';           console.log("GameU.this.butHitArray= "  + this.butHitArray);//So we can reset them)
		}


		console.log("nbrHit= "  + this.nbrHit);
		console.log("hitArray= "  + this.butHitArr);
		console.log("idArr= "  + this.idArr);
		console.log("colToBeHit= "  + this.colToBeHit + " this.cols= " + this.cols);

		if(this.colToBeHit == this.cols){console.log("AAbutHitArrArr= "  + this.butHitArrArr);
			this.nbrHit++;											
			this.butHitArrArr.push(this.butHitArr);
			this.butHitArr = [];
			console.log("BBbutHitArrArr= "  + this.butHitArrArr);
			console.log("this.isTrgNbrReched()= " + this.isTrgNbrReched());
			this.colToBeHit = 0;//reset cols


			if(this.isTrgNbrReched()){//If true, this  stops the clock which checks play
				this.checkPlay();
			}
		}

	}

	checkPlay(){console.log("####checkPlay = " + " nbrButSelected= " + cp.itf.nbrButSelected + "  " + this.butHitArrArr + " this.nbrHit= " + this.nbrHit);
		//stopTheClock();
		let pf = "passed";
		let results ="";
		if(this.nbrHit != cp.itf.nbrButSelected){
			this.returnButValues();
			cp.itf.displayPtsThisPlay( "failed" ,"Too few lines completed." );
			return;
		}
		for (let i = 0;i<this.butHitArrArr.length;i++){
			const aRow = this.butHitArrArr[i];
			let firstNbr =  aRow[0];
			console.log("firstNbr= "  + firstNbr);
			for (let j = 1;j<this.cols;j++){
											console.log(firstNbr + " ---  " +  aRow[j] );
				if(firstNbr != aRow[j]){
											console.log("  failed  "  );
					pf = "failed";
					results+= "At lease one was wrong."
					break
				}
			}
		}
		if(pf == "failed"){
			this.returnButValues();
		}
		this.reset();
		console.log(pf + "  |||  " +  results );
		cp.itf.displayPtsThisPlay(pf,results);
  }





	butHitXX(butID){console.log("butHit " + butID  + " colToBeHit= " + this.colToBeHit);//but0:0 
		
		const butThatWasHit = document.getElementById(butID);//but0:0
		const theValue = butThatWasHit.value;
        console.log("theValue "  + theValue  + "   " +  butThatWasHit.name);
		if(theValue == '||') return;

		const name = butThatWasHit.name;             console.log("GameU.name "  + name);
		const ii = butID.indexOf('X');               console.log("GameU.ii "  + ii);
		const colHit = butID.charAt(ii+1,10);        console.log("GameU.colHit "  + colHit);

		if(colHit != this.colToBeHit){
			alert("You need to click on the columns in order Left to Right");
			return;
		}else{
			this.hitArray.push(name.charAt(0));       console.log("GameU.this.hitArray "  + this.hitArray);//0-The meek 
			this.butHitArray.push(butID);             console.log("GameU.this.butHitArray "  + this.butHitArray);//So we can reset them
		}

		if(colHit == this.colToBeHit){
			this.colToBeHit++;
			//console.log("Eval "  + this.hitArray);
			let passed = true;
			const firstCol  = this.hitArray[0];
			for (let i = 1;i<this.hitArray.length;i++){
				if(firstCol != this.hitArray[i]){
					passed = false;
				}
			}
			if(passed){
               console.log("GameU.awdPoints ");

			   for (let i = 0;i<this.cols;i++){
				    
			   }
			}

		}else{
			const rowNbr = butThatWasHit.name.charAt(0);
			this.hitArray.push(rowNbr);
		}
	
	}
	isTrgNbrRechedXX(){console.log("|||isTrgNbrReched "  +  (this.nbrHit + 1 ) + "   " + cp.itf.nbrButSelected);
		this.ansPending = false;
		if(++this.nbrHit == cp.itf.nbrButSelected){
			cp.itf.timeFactor = stopTheClock();
			return true;
		}else{
			return false;
		}
	}


}
