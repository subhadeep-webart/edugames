// JavaScript source code
class GameI extends Game{
	constructor (round,cp,utl){ 
		console.log("GameI.constructor TOP"  );
		super (round,cp,utl);
		this.procGameData;
		this.rightAns;
		this.ansLstFileDotPath
		this.hints;;
		this.abp;
		this.butHitCount = 0;
		this.imageInsertPt;
		this.imageWidth=0;
		this.imageHeight=0;
		this.butIdArr=[];
		this.nbrOfButs =0;
		this.focusButHeight = 0;
		this.focusButInc = 0;
		this.displayType = "";
		this.typeSelection = "";
		this.butIDMap;
		this.authorButArr;
		this.ptDecInc = 0;
		console.log("GameI.constructor Bottom" +   cp.theGameInPlay );
	}

	helloWorld(){
		console.log("GameI.helloWorld" );
		super.helloWorld()
	}

	cleanPlayArea(){console.log("GameI cleanUpPlayArea  "  );//this.theAnsBar
		super.cleanPlayArea();
		const gamePlayArea= document.getElementById('gamePlayArea');
		let collection = gamePlayArea.children;
		for(let j = 0;j <collection.length;j++){
			collection[j].remove();
		}
		collection = this.imageInsertPt.children;
		for(let j = 0;j <collection.length;j++){
			collection[j].remove();
		}
		const focusButs = document.getElementsByClassName("butX");
		const butIDs = [];
		for(let j = 0;j <focusButs.length;j++){//id='butABPSubmit${j}'
			butIDs.push(focusButs[j].id);
		}
		let el = document.getElementById("butABPSubmit0");
		if(el != null)el.remove();
		el = document.getElementById("butABPSubmit1")
		if(el != null)el.remove();
		for(let j = 0;j <butIDs.length;j++){
			el = document.getElementById(butIDs[j]);
			if(el != null)el.remove();
		}
		this.removeAllButs();
		this.abp.cleanUp();
	}

	init(){
		this.gameName = "gameI";
		this.gameLtr ="I";
		//console.log("GameI.init TOP"  );
		super.init();
		this.imageInsertPt = document.getElementById('imageInsertPt');
		this.procGameData();
		this.insertImage();
		this.loadAlphaBar();
		this.addGridButton();
		cp.itf.setPoints(100);
		if(this.displayType == "Focus"){
			startPanelRemoval(this.cols,5);
			//console.log("Focus " );
		}else{
			startPanelRemoval(this.butIdArr.length,5);
		}
		cp.itf.setRunningPoints(100);
		//console.log("GameI.init BOTTOM "  );//        console.log("GameI. "  + );
	}

//}L.AA.An.Ge.No.No.US.CiStMo.AL.csv Rushmore-Mt.,}P.AA.Pi.Ge.No.No.US.SD.Mo.MtRushmore-1.PI.gif,{H-Northern State;-;4 Presidents;In Stone,
	

	removeAllButs(){//console.log("***********removeAllButs" + this.butIdArr);
		const nbr =this.butIdArr.length;
		for(let i = 0;i< nbr;i++){
			const aBut = this.butIdArr[i];
			const butToRemove = document.getElementById(aBut);
			if(butToRemove != null)butToRemove.remove();
		}
	}


	reset(){console.log("GameI.reset " +  cp.theGameInPlay);

	}

	startPlay(){console.log("GameI  startPlay" );
		pausePanelRemoval();

	}

//Cols=8,}L.AA.An.Ge.No.No.US.CiStMo.AL.csv Rushmore-Mt.,}P.AA.Pi.Ge.No.No.US.SD.Mo.MtRushmore-1.PI.gif,{H-Northern State;-;4 Presidents;In Stone
//Cols=8,}A.AA.An.Ge.No.No.US.CiStMo.AL.csv Iwo Jima-Memorial,

	procGameData(){console.log("GameI.procGameData TOP "  +  this.gameDataArray.length + "   " + this.gameDataArray);

		//for(let j= 0;j< this.gameDataArray.length;j++){
			//console.log(j + " --\\-   "  + this.gameDataArray[j]);

		//}

		this.displayType = this.round.rndMap.get('DisplayType');
        //console.log("GameI.displayType "  + this.displayType);
		if(this.displayType == "Focus"){
			this.typeSelection = "focus";//we need to override author
		}else{
			this.typeSelection = this.round.rndMap.get('TypeSelection');
		}

        //console.log("GameI.typeSelection "  + this.typeSelection);
        //console.log("GameI.gameDataArray "  + this.gameDataArray);
		const ansLstAndAnswer = this.gameDataArray[0];

        //console.log("GameI.ansLstAndAnswer "  + ansLstAndAnswer);
		const tmp = ansLstAndAnswer.split(' ');
		this.ansLstFileDotPath = tmp[0];
		this.rightAns = tmp[1];
		for(let j= 2;j< tmp.length;j++){
			this.rightAns+= " " + tmp[j]//The right ans may have spaces
		}
		this.imageFile = this.gameDataArray[1];
        //console.log("GameI.imageFile= "  + this.imageFile);
		this.hints =this.gameDataArray[2];
        //console.log("GameI.hints= "  + this.hints);
        //console.log("GameI.procGameData this.ansLstFileDotPath= "  + this.ansLstFileDotPath + " this.rightAns= " + this.rightAns);
		
	}


	placeBlockOuts(blockOuts){console.log("|||placeBlockOuts " + blockOuts )
		let color = "blue"
		let loc = ""
		for(let j= 0;j< blockOuts.length;j++){
			//console.log(j + " --//-   "  + blockOuts[j]);//{B-1magenta 143182057029
			[color,loc] = blockOuts[j].split(" ");
			//const top = loc.substring(0,3);
			//const left = loc.substring(3,6);
			const left = loc.substring(0,3);
			const top = loc.substring(3,6);

			const width = loc.substring(6,9);
			const height = loc.substring(9);
			let buf = "<button id='"+ j + "' class='butX' ";
			buf+= ` style.top='${top}'  style.left='${left}' style.width='${width}' color='${color}' style.height='${height}' >${j}</button>`;
			//console.log("++ buf= " + buf )
			//console.log("this.imageInsertPt " + this.imageInsertPt )
			this.imageInsertPt.innerHTML = this.imageInsertPt.innerHTML + buf;
		}
		for(let j= 0;j< blockOuts.length;j++){
			//console.log(j + " --|||-   "  + this.butIdArr);//{B-1magenta 143182057029
			[color,loc] = blockOuts[j].split(" ");
			//const top = loc.substring(0,3);
			//const left = loc.substring(3,6);
			this.butIdArr.push(j);
			const left = Number(loc.substring(0,3));
			const top = Number(loc.substring(3,6));

			const width = Number(loc.substring(6,9)) + "px";
			const height = Number(loc.substring(9,12)) + "px";
			const el = document.getElementById(j);			
			el.style=`left: ${left}px; top:${top}px; z-index:50; `//
			el.style.width = width ; el.style.height = height;
			
			//console.log("getWidth= " + el.width );   
			//console.log("getHeight= " + el.getHeight );   

		}
		this.butIdArr.reverse();
			console.log( " --|||-this.butIdArr********   "  + this.butIdArr);

	}


	loadAlphaBar(){console.log("GameI. loadAlphaBar top" + this.ansLstFileDotPath );      
		const ansListPath=getImageFile(this.ansLstFileDotPath);
        //console.log("GameI.ansListPath" + ansListPath );

		//console.log('sampleData= ' + this.cp.sampleData);
		this.abp =	new AlphaBar(cp,this.cp.sampleData,this.ansLstFileDotPath);
		this.abp.init();
		this.abp.setRightAns(this.rightAns);
        //console.log("GameI. loadAlphaBar bottom"   );
	}

	butHit(butID){
		//console.log("gameI butHit() " + butID + " butHitCount " + ++this.butHitCount);
		const but = document.getElementById(butID);
		but.hidden="true";	
	}

	insertImage(){console.log("######insertImage "  +  this.imageFile);

		const imageFile = getImageFile(this.imageFile,"gameIImage");
		//console.log("imageFile2 " + imageFile[2])		
		this.imageWidth = imageFile[2];
		//console.log("imageFile3 " + imageFile[3])
		this.imageHeight = imageFile[3];
		//console.log("imageFile4 " + imageFile[4])
		imageInsertPt.width=this.imageWidth;
		imageInsertPt.innerHTML = imageInsertPt.innerHTML + imageFile[0];

 		console.log("$$$$$$$$$$$ this.imageWidth " + this.imageWidth);

	}// 		  console.log("gameI butHit() " + butID);


	removeAPanel(){//console.log("removeAPanel " + this.butIdArr + " this.displayType  " + this.displayType);
		if(this.playIsOver)return;
		if(this.typeSelection == "Author" && this.displayType != "BlockOut"){
			const butNbr =  Number(this.authorButArr.shift());
			const butToRemove = this.butIDMap.get(butNbr);
			//console.log("butNbr -" + butNbr + "-  ||  -" +  butToRemove + "-")
			if(butToRemove != null){
				const aButDoc = document.getElementById(butToRemove);
				aButDoc.hidden="true";
			}else{
				cp.itf.setGameOver();//We have run out of panels and no one has ventrued to try an answer
			}
		}if(this.displayType == "Focus"){console.log("removeAPanel " + this.focusButHeight + "   " + this.focusButInc);
			this.focusButHeight-=this.focusButInc;
			const theHeight = this.focusButHeight + "px";
			for(let i = 0;i< this.rows;i++){
				const butID = 'but' + i + 'X0';
				const el = document.getElementById(butID);
				el.style.height = theHeight;
			}
		}else{
			const aBut = this.butIdArr.shift();
			const aButDoc = document.getElementById(aBut);

			if(aButDoc != null){
				aButDoc.hidden="true";
			}else{
				//console.log("$$$aButDoc = null" + aBut);
			}
		}
		cp.itf.reduceThePts(this.ptDecInc);
	}

	hideAllButs(){//console.log("hideAllButs()" + this.butIdArr);
		const remaininfButCount = this.butIdArr.length;
		for(let i = 0;i< remaininfButCount;i++){
			const aBut = this.butIdArr.shift();
			const aButDoc = document.getElementById(aBut);
			aButDoc.hidden="true";
		}
		stopPanelRemoval();
	}

	addFocusButtons(){console.log("**************addFocusButtons"   );
		const butArr =[];
		let bufBut = "";
		let nbr = 0;
		for(let i = 0;i< this.rows;i++){
			const butID = 'but' + i + 'X0';
			butArr.push(butID);
			bufBut+=`<button class='butX'  id='${butID}' ></button>\n`;       
		}
		this.imageInsertPt.innerHTML = this.imageInsertPt.innerHTML + bufBut;
		this.positionButtons();
	}

	positionFocusButtons(){console.log("positionFocusButtons= " + this.rows + "   " + this.cols );
		const theHeight            = Math.round(this.imageHeight/this.rows);
		this.focusButInc = Math.round(theHeight/this.cols);//The cols are the substitute for the number of increments
		this.focusButHeight = theHeight //The starting point 
		const butHeight = theHeight + "px"
		const butWidth = this.imageWidth + "px"
		for(let i = 0;i< this.rows;i++){
			const butID = 'but' + i + 'X0';
			const el = document.getElementById(butID);
			const xLoc = 0 ;
			const yLoc = i * theHeight ;
			el.style=`left: ${xLoc}px; top:${yLoc}px; z-index:50; `//
			el.style.width = butWidth ; el.style.height = butHeight;            
		}
			//console.log("*******  ||    ************ this.imageWidth"  + this.imageWidth );//
	}

	addGridButton(){//console.log("******************* addGridButton top"   );//		console.log("= " + );
		if(this.typeSelection == "Author"){
			this.butIDMap = new Map();
			const seq = this.round.rndMap.get("Sequence");
			if(seq != undefined){
				this.authorButArr = this.round.rndMap.get("Sequence").split(";");//this.authorButArr
			}
		}
		this.displayType=this.round.rndMap.get("DisplayType")
		if(this.displayType == "Focus"){
			this.addFocusButtons();
			return;
		}if(this.displayType == "BlockOut"){
			this.placeBlockOuts(this.gameDataArray.slice(3));
		}else{
			const butArr =[];
			let bufBut = "";
			let nbr = 0;
			let butID = "";
			let butNbr = 0;
			for(let i = 0;i< this.rows;i++){
				for(let j= 0;j< this.cols;j++){
					const butID = 'but' + i + 'X' + j;
					if(this.typeSelection == "Author"){
						this.butIDMap.set(++butNbr,butID);
						//console.log( butNbr +  "  *||*  " + butID +  " ***  -" + this.butIDMap.get(butNbr)+"-");
					}
					butArr.push(butID);
					bufBut+=`<button class='butX'  id='${butID}' ></button>\n`;
				}            
			}
			this.imageInsertPt.innerHTML = this.imageInsertPt.innerHTML + bufBut;		
			this.butIdArr = cp.utl.mixUpArray(butArr);
			this.positionButtons();
			this.nbrOfButs = butArr.length;
			this.ptDecInc = (100/this.nbrOfButs).toFixed(0);
		}
	}

	positionButtons(){//console.log("positionButtons= " + this.rows + "   " + this.cols );
		this.displayType=this.round.rndMap.get("DisplayType")
		if(this.displayType == "Focus"){
			this.positionFocusButtons();
			return;
		}
		const width             = Math.round(this.imageWidth/this.cols);
		const height            = Math.round(this.imageHeight/this.rows);
		const theWidth = width + "px"
		const theHeight = height + "px"
		for(let i = 0;i< this.rows;i++){
			for(let j= 0;j< this.cols;j++){
				const butID = 'but' + i + 'X' + j;
				const el = document.getElementById(butID);
				const xLoc = j * width ;
				const yLoc = i * height ;
				el.style=`left: ${xLoc}px; top:${yLoc}px; z-index:50; `//
				el.style.width = theWidth ; el.style.height = theHeight;
			}            
		}
	}


	/*submitAnsxx(){console.log("abp checkAnswer " +  this.abp.getMenuSelection());
		const theSelection = this.abp.getMenuSelection();
		if(this.rightAns == theSelection){
			console.log("abp checkAnswer Success  " );
			cp.itf.displayPtsThisPlay ("passed");
			this.hideAllButs();
			console.log("aaa " );
			cp.itf.setGameOver();
			console.log("bbb " );
			stopPanelRemoval();
			stopTheClock("End of Play");
		}else{
			console.log("abp checkAnswer Failure  " );
			cp.itf.displayPtsThisPlay ("failed")
			//pauseButRemoval();
		}
		unPausePanelRemoval();
		console.log("**********submitAns  bottom" ) ;
	}

		submitAnsXX(){console.log("gameI submitAns " );
		const theAns = this.abp.getSelection();
		console.log("theAns " + theAns);		
	}*/


}//Bottom of gameI
