// JavaScript source code

class GameB extends Game{//console.log("GameB  = " + );
	constructor (round,cp,utl,plu){
		console.log("GameB.constructor TOP"  );
		super (round,cp,utl,plu);
		this.cp = cp;
		this.utl = utl;
		this.plu = plu;
		this.pMax = this.plu.pMax;
		this.rows;
		this.cols;
		this.boxWidth;
		this.boxHeight;
		this.corAnsArray=[];
		this.playerArray = [];
		this.pNbr=0;
		this.nbrCorAns;
		this.curAnsCnt = 0;
		this.curWcnt = 0
		this.curRcnt = 0
		this.scoreType = "A";
		this.playCount = 0;
		this.playCountMax = 3;
		this.ansCkd = "";
		this.inputArray;
		this.ptInc = 0;
		this.firstHit=true
		this.gameInPlay = "gameB";
		this.gameType = 'B';
		this.image;
		this.imageName;
		this.imageArray =[];
		this.imageWidth;
		this.imageHeight;
		this.imagePath;
		this.symArray;
		this.rightArray =[];
		this.wrongArray =[];
		this.ctx;
		console.log("GameB.constructor BOTTOM"  );
	}
	init(){
		console.log("GameB.init TOP"  );
		super.init();
		this.cp.setPoints(100);
		this.getData();
		//this.insrtImage();
		console.log("GameB.init BOTTOM "  +  this.gameInPlay);//  
	}

	helloWorld(){
	console.log("GameB.helloWorld" );//console.log("GameA  = " + );
		super.helloWorld();
	}

	/*
Score types 
A = all must be correct and change players at first wrong Answer
B = player must select the number of times indicated, but not evaluated untill last one selected.
C = all must be selected, and score is a ratio of right vs wrong.  
D =If multiplayer the one with the most wins, but score is a ratio
E the one with the most rights gets all the points
	*/

	reset(){      console.log("reset()"  );
		this.curAnsCnt = 0;
		this.curWcnt = 0
		this.curRcnt = 0
		this.ansCkd = "";
	}



/*
,AA.Ben00001,EdUGames tm,20020605,9,,,,Te,,}P.AA.Pi.Pe.Le.Po.US.Pr.16PopPres.NK.gif,aPRA1_50 iPRA1_45 oPDF1_20 zPRA1_15,,,,,US Presidents,
Which seven presidents are Democrats?,,Type=Grid Rows=4 Cols=4,}P.AA.Pi.Pe.Le.Po.US.Pr.16PopPres.NK.gif,R1C1;R1C4;R2C3;R2C4;R3C2;R3C3;R3C4,

types = Grid, MultipleResources, AnswerButton

*/
//                                             console.log("  = " + );



	getData(){ 
		//const typeDisplay = this.gameDataArray.shift();
        //console.log("typeDisplay  = " + typeDisplay);
		const typeDisplay = this.parmMap.get("Type");
		const type = typeDisplay.charAt(0);
        console.log("type  = " + type);
		switch (type){
			case 'G':
				this.placeGrid(typeDisplay);
				break;


		}

	}//                                             console.log("  = " + );

	gridHit(x,y){ console.log("gridHit  pNbr= " + pNbr);
		let rowNbr =0;
		let colNbr = 0;
		let n = this.boxHeight		
		let ansRow = 0
		for (let i = 0;i <= this.rows; i++){
			if(y < n){
				ansRow = i + 1;
				break;
			}else{
				n+= this.boxHeight;
			}
		}
		let ansCol = 0;
		n= this.boxWidth;
		for (let i = 0;i <= this.cols; i++){
			if(x < n){
				ansCol = i + 1;
				break;
			}else{
				n+= this.boxWidth;
			}
		}
        console.log( ansRow +  "  = " + ansCol);
		const theRC = "R"+ ansRow + "C" + ansCol;
		if(this.ansCkd.indexOf(theRC) >0){
         console.log("You have already checked this one  = "  );
			alert("You have already checked this one")
			return;
		}
		this.ansCkd+= theRC + ",";
            console.log("this.ansCkd  = " + this.ansCkd);
		let gotOne = false;
		for (let i = 0;i < this.nbrCorAns; i++){//this.ansCnt
			if(gotOne)break;//This is to get out of a double loop
			gotOne = false;
			[rowNbr,colNbr] = this.corAnsArray[i].split(",")
			//console.log(rowNbr + " || " +  ansRow + " ** " + colNbr + " || " + ansCol);
			if(rowNbr == ansRow && colNbr == ansCol){
				console.log(" RRR = "  );
				gotOne = true;
				break;//                                             console.log("  = " + );
			}
		}

		if(gotOne){
			this.curRcnt++
		}else{
			 console.log(" WWW  = " + "  = " + this.scoreType);
			if(this.scoreType == "A"){
				this.playerArray[this.pNbr] = this.curRcnt,this.curWcnt;
				this.changePlayers();
				return;
			}
			this.curWcnt++
		}
		this.curAnsCnt++;

		if(this.curAnsCnt == this.nbrCorAns){
			this.playerArray[this.pNbr] = this.curRcnt,this.curWcnt;
		}
		

		if(this.scoreType == "B" && this.pNbr == this.pMax){
			this.showWinner();
		}
        console.log(" this.curAnsCnt = " + this.curAnsCnt + " this.curRcnt  " + this.curRcnt + "  this.curWcnt " + this.curWcnt  );
		if(this.curAnsCnt >= this.nbrCorAns){
			this.playerArray.push(this.curRcnt,this.curWcnt);
			console.log( " this.playerArray[0]  = " + this.playerArray[0]);
		}

	}

	changePlayers(){ console.log("GameB changePlayers = " +  this.pMax + " this.pNbr = "  +this.pNbr );
		if(this.pMax > 1){//Multiplayer
			this.reset();
			super.changePlayers();
		}else{
			this.cp.halveThePoints();
			if(this.playCount++ >= this.playCountMax){
				showWinner();
			}
		}
	}


	
	showWinner(){console.log("showWinner "  );
		if(this.pMax == 1){
             console.log(" solo score " );

		}else{
			for (let i = 0;i < this.pMax ; i++){
				console.log(this.players[i].name + " got " + this.playerArray[i]  + " right.");
			}
		}
	}

//                                             console.log("  = " + );
	placeGrid(typeDisplay){
		this.rows = this.parmMap.get("Rows")
		this.cols = this.parmMap.get("Cols")
        console.log("rows  = " + this.rows + " this.cols = " +  this.cols);
		const insertPtA = document.getElementById("insertPtA");
		const theImage = getImageFile(this.gameDataArray.shift(),"theImage");
		insertPtA.innerHTML = insertPtA.innerHTML = theImage[0];
		const theImageDoc = document.getElementById("theImage");
		theImageDoc.addEventListener('click', function(){
			gameB.gridHit(event.offsetX,event.offsetY);
		});
		this.width = theImage[2];
		this.height = theImage[3]
		this.boxWidth = this.width/this.cols;
		this.boxHeight = this.height/this.rows;
		const theAnswers = this.gameDataArray.shift().split(";")//R1C1;R1C4;R2C3;R2C4;R3C2;R3C3;R3C4,
		this.nbrCorAns = theAnswers.length;
		for (let i = 0;i < this.nbrCorAns; i++){
			const temp = theAnswers.shift();
			const pos = temp.indexOf("C");
              //.log(temp + " | "  + pos + " = " + temp.slice(1,pos) + " **  " + temp.slice(pos+1,99));
			this.corAnsArray.push(temp.slice(1,pos) + "," + temp.slice(pos+1,99));
		}


	}

	


}

