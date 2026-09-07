// JavaScript source code
class BoxGame extends Game{//console.log(" =" + ); console.log(" TOP"  );
	constructor (round,cp,utl){
		console.log("BoxGame.constructor TOP  " );
		super (round,cp,utl);
		this.nbrOfButs = 0;
		this.insrtId = [];
		this.insrtPtArray = [];
		this.butArray = [];
		this.trysLeft;
		console.log("BoxGame.constructor BOTTOM"  );
	}
	
	init(){
		console.log("--BoxGame.init TOP " +  this.gameType);
		super.init();
		console.log("BG this.rows "  +  this.rows);
		console.log("BG this.cols "  +  this.cols);
		const tempNbrOfButts = this.rows * this.cols;
		console.log("--tempNbrOfButts= " + tempNbrOfButts );
		if(tempNbrOfButts > 20 && this.gameType == "M"){
			this.resetNbrOfButts();
		}
		this.nbrOfButs = this.rows * this.cols;
		this.trysLeft = this.trysPerPlayer;
		this.createInsrtIds();
		this.createGrid();
		this.createInsrtPtArray();
		this.loadButtonsIntoGrid(this.gameType);//
		console.log("GM zzthis.rows "  +  this.rows);
		console.log("GM this.cols "  +  this.cols);

		//document.getElementById('trys').value = this.trysPerPlayer;
		console.log("BoxGame.init BOTTOM this.nbrOfBut = " + this.nbrOfButs );
	}


	resetNbrOfButts(){console.log("BG resetNbrOfButts  "   +  this.nbrOfButs);
		console.log("GMa this.rows "  +  this.rows);
		console.log("GM athis.cols "  +  this.cols);
		this.rows = 5;
		this.cols = 4;
		console.log("GM bthis.rows "  +  this.rows);
		console.log("GM bthis.cols "  +  this.cols);

		this.nbrOfButs = 20;
	}


	
	testA(){console.log("BoxGame.TestA" );
		this.cleanPlayArea();
	}


	cleanPlayArea(){console.log("BoxGame cleanUpPlayArea  "  );//this.theAnsBar
		super.cleanPlayArea();
		//const nodeList = document.getElementById('gamePlayArea');
		let collection = gamePlayArea.children;
		console.log("BoxGame collection  " + collection );
		for(let j = 0;j <collection.length;j++){
			collection[j].remove();
		}
	}

	gameOver(){console.log("BoxGame.gameOver Top" );
		
	}



	createInsrtIds(){
		for (let i = 0;i<this.rows;i++){
			for (let j = 0;j<this.cols;j++){
				this.insrtId.push(i + "X" + j);
			}
		}
		console.log("this.insrtId"  + this.insrtId );
	}

	createInsrtPtArray(){//This is where we create the insert points for  buttons, images etc
		const nodeList = document.getElementsByClassName('gridInsrtPt');
		this.insrtPtArray = Array.prototype.slice.call(nodeList);
	}

	helloWorld(){console.log("BoxGame.helloWorld" );		
		super.helloWorld();
	}

	//Create insertion points which can be addressed with DOM class "insrtPt"
	createGrid(){
		console.log("BoxGrid.createGrid()  TOP ");
		let buf = "<table border='5' background'#CCFFFF' >";   //width="100%"//console.log("  = " +  );
		let n = 0;
		for (let i = 0;i<this.rows;i++){
			buf+="<tr >";
			for (let j = 0;j<this.cols;j++){
				const rc =  i + ":" + j;//This is the insrtPt ID row:col example-  0:0 , 4:4 
				buf+=`<td  ><div style='background-color:aquamarine'  style='text-align:center'  class='gridInsrtPt' id='${this.insrtId[n++]}'>`;	
				buf+= "</div><center>----------------------------</center></td>";
			}
		}
		buf+="</tr>";
		buf+="</table>";
		//const el = document.getElementById("gamePlayArea");//From page layout
		gamePlayArea.innerHTML = gamePlayArea.innerHTML + buf;
		console.log("BoxGrid.createGrid()  BOTTOM ");
	}

	removeGridItems(){
		console.log("BoxGame.GridItems TOP " + this.nbrOfInsrtPts.length);
		const nodeList = document.getElementsByClassName('gridInsrtPt');//console.log(" = " + );
		this.insrtPtArray = Array.prototype.slice.call(nodeList);
		for (let i = 0;i<thisnbrOfInsrtPts;i++){
			this.insrtPtArray[i].innerHTML = "";
		}
	}

	//Gather up the button that have not been eliminated
	getUnHitButtons(){
        console.log("BoxGame.getUnHitButtons TOP "  );
		//const nodeList = document.getElementsByClassName('but');//                      console.log(" = " + );
		//const butArray = Array.prototype.slice.call(nodeList);
		const newList = [];
		for (let i = 0;i<this.butArray.length;i++){
			if(this.butArray[i].hidden='true'){//These are the one's left standing'
				const name = this.butArray[i].name;
                console.log("name = " + name);
				newList.push(name);
			}
		}
        console.log("newList = " + newList);
		console.log("BoxGame.getUnHitButtons BOTTOM "  );//                      console.log(" = " + );
	}
	
	
	//Put the data from gameData into the boxes [buttons] and insert them into the insrtPts
	//createAndInsertButtonsIntoInsrtPts

	loadButtonsIntoGrid(gameType){console.log("BoxGame.loadButtonsIntoGrid TOP this.nbrOfButs= " + this.nbrOfButs  + " this.gameType " 
		+ this.gameType + "  defaultTextSize= " + defaultTextSize);	
		
		const defaultFontSize = getDefaultFontSize();
		//console.log("***defaultFontSize = " + defaultFontSize);

	     //console.log(" this.insrtId= " + this.insrtId);
         //console.log("this.nbrOfButs = " + this.nbrOfButs);//         console.log("   " +   );//style="font-size : 20px;

		for (let i = 0;i<this.nbrOfButs;i++){//Place the button with the same id as the insrtPt
			const id = this.insrtId[i];
			///const inputStr = `<input type='button' id='but${id}' class='but' name='Xname' value='but${id}' style='background-color:aquamarine; font-Size:${defaultFontSize}; ' >`;
			const inputStr = `<input type='button' id='but${id}' class='but' name='Xname' value='but${id}' style='background-color:aquamarine; ' >`;


			//console.log("***inputStr = " + inputStr);

			this.insrtPtArray[i].innerHTML = inputStr;//            This is where we create the button
			const el = document.getElementById('but'+ id);
			this.butArray.push(el);//                               This is where create butArray			

		}
		//console.log("BoxGame.loadButtonsIntoGrid  bottom butArray.length =" + this.butArray.length );
	}

	fillButtons(list){console.log("BoxGame.replaceButtonText TOP "  );		
		const nodeList = document.getElementsByClassName('but');//     console.log(" = " + );
		const buttonArray = Array.prototype.slice.call(nodeList);
		//const nbrOfButs = buttonArray.length;
		//console.log("buttonArray = " + buttonArray);
		const nbrOfItemsInList = list.length;
		//console.log("nbrOfItemsInList = " + nbrOfItemsInList);
		let n = nbrOfItemsInList;
		if(nbrOfItemsInList > this.nbrOfButs){n = this.nbrOfButs;}
		for (let i = 0;i<n;i++){
			buttonArray[i].value=`<center>'${list[i]}</center>`;
		}
       // console.log("BoxGame.replaceButtonText BOTTOM "  );
	}

	hideShowBlankAllButtons(hideShowBlank){//
        //console.log("BoxGame.hideAllButtons TOP " + hideShowBlank );
	    const nodeList = document.getElementsByClassName('but');//              console.log(" = " + );
		this.buttonArray = Array.prototype.slice.call(nodeList);
		for (let i = 0;i<this.buttonArray.length;i++){
			if(hideShowBlank === 'hide'){
				this.buttonArray[i].hidden=true;
			}else if(hideShowBlank === 'show'){
				this.buttonArray[i].hidden=false;
			}else if(hideShowBlank === 'blank'){
				this.buttonArray[i].value='';
			}
		}
        //console.log("BoxGame.hideAllButtons BOTTOM "  );
	}


}//Bottom of BoxGame
