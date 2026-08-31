// JavaScript source code

class GameN extends Game{//console.log("GameN  = " + );
	constructor (round,cp,utl,plu){
		console.log("GameN.constructor TOP"  );
		super (round,cp,utl,plu);
		this.plu = plu;
		this.utl = utl;
		this.inputArray;
		this.ptInc = 0;
		this.gameInPlay = "gameN";
		this.gameType = 'N';
		this.arrowIsDraggable = true;
		this.ctx;
		this.display;
		this.theAnswer;
		this.loNbr;
		this.hiNbr;
		this.ratio;
		this.playerNbr = 0;
		this.pAns =[];
		this.sliderX =[];
		this.displayBox;
		this.slider;
		this.tblTitle;
		console.log("GameN.constructor BOTTOM"  );
	}
	init(){
		console.log("GameN.init TOP"  );
		this.setUp();
		this.displayBox= document.getElementById("displayBox");
		displayBox.value=this.loNbr;
		this.tblTitle = document.getElementById("tblTitle");
		super.init();
		this.setValues();
		this.cp.plu.setFirstPlayerNbr(this.cp.firstPlayerNbr);//It may not be player 0
		this.setNextPlayer(); 
	}
	helloWorld(){
		console.log("GameN.helloWorld" );//         console.log("GameN  = " + );
		super.helloWorld();
	}

	cleanUp(){//insrtPt.innerHTML = insrtPt.innerHTML + img[0];


	}

	setTblCaption(text){
		document.getElementById("tblTitle").createCaption().innerHTML = text;

	}

	setNextPlayer(){console.log("GameN setNextPlayer() = " + this.cp.plu.pMax );
		this.thePlayer = this.cp.plu.getNextPlayer();
		if(this.thePlayer == null){
			this.setTblCaption("GAME OVER!!");
			this.evalAns();
			return;
		}
        console.log("GameN AAAthis.tblTitle.value = " + this.tblTitle.value);
		this.setTblCaption(this.thePlayer.name + ": your turn!");

        console.log("GameN BBB this.tblTitle.value = " + this.tblTitle.value);
		console.log("GameN  = " +this.thePlayer.name + "  " + this.thePlayer.color);
		const tf = document.getElementById("playerName");
		tf.value = this.thePlayer.name;
		this.tblTitle.value= this.thePlayer.name + " YOUR TURN!"
		console.log("GameN.player.color "  + this.thePlayer.altColor)
		tf.style.backgroundColor = this.thePlayer.altColor;
		this.displayBox.style.backgroundColor = this.thePlayer.altColor;
		this.slider.style.backgroundColor = this.thePlayer.altColor;
		//this.slider.selection=this.loNbr;
		this.slider.value = 0;
		this.displayBox.value=this.loNbr;
	}


	getOnePlayerResults(){		console.log("getOnePlayerResults  "  );
		const dif = Math.abs(this.theAnswer - this.pAns[0]);
		console.log("dif=  " + dif );
		console.log("this.hiNbr=  " + this.hiNbr );
		console.log("this.loNbr  " + this.loNbr );
		const diff = dif/(this.hiNbr - this.loNbr) * 100;
		console.log("diff=  " + diff );
		let result =0;
		let playResults = "Your were ";
		if (diff > 16) {
		  result = 0;
		  playResults+= "Way OFF";//D.d("   " + );
		}
		else if (diff > 7.2) {
		  result = ( (16 - diff) / 16) * .25;
		  playResults+= "In The Ball Park";
		}
		else if (diff > 3.4) {
		  result = ( (10 - diff) / 10) * .5;
		  playResults+= "In Range";
		}
		else if (diff > 2.01) {
		  result = ( (6 - diff) / 6) * .75;
		  playResults+= "Close";
		}
		else {
		  result = (3 - diff) / 2;
		  playResults+= "Real Close";
		}
		console.log("result =  " + result);//D.d("   " + );
		if (result > 1) {
		  result = 1;
		  playResults+= "Right On";
		}
		console.log("  playResults= " + playResults);
		const points = parseInt(result * 100);
    return playResults + " and got " + points + " points.";
  }
	

	evalAns(){console.log("GameN evalAns()  " + this.theAnswer + " this.ratio=  " + this.ratio);
		let result = "The question was: " + this.question + " and the answer is: " + this.theAnswer + "."
		this.setTblCaption(this.question);
		const ansX = this.theAnswer/this.ratio;
		displayBox.value = "Answer= " +this.theAnswer;
		console.log("ansX  " + ansX );
		const nbrOfPlayers = this.pAns.length;
		if(nbrOfPlayers == 1){
			result+=  this.getOnePlayerResults();
		}else{
			const difArr = [];
			let totalDif = 0;
			let winPlayer = 0;
			let winDif = 1000;
			for (let i = 0;i<nbrOfPlayers;i++){
				const dif = Math.abs(this.theAnswer - this.pAns[i])
				totalDif+= dif;
				difArr.push(i + ","  + dif + "\n" );
				if(dif < winDif){
					winDif = dif;
					winPlayer = i;
				}
			}

			//Checking for ties
			let tCount = 0;
			const winArr = [];
			for (let i = 0;i<nbrOfPlayers;i++){
				const [aPlayerNbr,aDif] = difArr[i].split(",")
				if(aDif == winDif){
					tCount++;
					winArr.push(aPlayerNbr);//		    console.log( = "  + );
				}
			}
			const avgDif = totalDif/nbrOfPlayers
			let ratio = winDif/avgDif;
			if(isNaN(ratio)) ratio = 1; 
			const pointAwd = parseInt(100 * (1-ratio) / tCount );
			
			if(tCount  > 1){
				let buf = "\n\n There is a "  +  tCount + " way tye ";
				for (let i = 0;i<tCount;i++){
					buf+= this.cp.plu.players[winArr[i]].getName() + ","
				}
				buf+= " are tied with a point award of " + pointAwd + " each.";
				result = buf;
			  console.log(buf );
			}else{
				result +=" The winner is "  + this.cp.plu.players[winPlayer].getName() + " and gets " + pointAwd + " points.";
			  //console.log("\n\n winner is; "  + this.cp.plu.players[winPlayer].getName() + " and gets " + pointAwd + " points")
			}
		}
		const theQuestionArea = document.getElementById("question");
		this.placeArrows();
		theQuestionArea.value = result;
	}


	


	goToNextPlayer(){
		const nextPlayer = this.plu.getNextPlayer();
	}

	regAns(anAnswer ){//done at end of each play
		console.log("regAns = " + anAnswer )
		this.pAns.push(anAnswer)
		const x = (anAnswer - this.loNbr)/this.ratio;
		this.sliderX.push(x);
		console.log("sliderX = " + x )
		if(this.cp.plu.isLastPlayer()){
			this.evalAns();
		}else{
			this.setNextPlayer(true);
		}
	}

	placeAnswerArrow(){		    console.log("placeAnswerArrow= "+ this.theAnswer + " this.loNbr  " +  this.loNbr +  " this.hiNbr=  " + this.hiNbr );
		const theAnswerNbrLineLoc = 50;//nbrLineInsrtPt
		const ansYear = Number(this.theAnswer.slice(0,4));
		let xPos =  ((ansYear - this.loNbr) * 10 ) -5;
		if(xPos > 250)xPos-=10;
		this.nbrLine.style.zIndex = "1";
		const arrowImage = getImageFile("}P.AA.Pi.Th.Sy.To.Ar.BlackDownArrow.AB.png|blackDownArrow|class ='Arrow'");
		const nbrLine = document.getElementById("nbrLineInsrtPt");
		console.log("nbrLine = "  + nbrLine.loc);
		nbrLine.innerHTML= nbrLine.innerHTML + arrowImage[0];
		const blackDownArrow = document.getElementById("blackDownArrow");//  left:50px;
	    console.log("blackDownArrow = "  +blackDownArrow );
		blackDownArrow.style.zIndex = "5";
		blackDownArrow.style.left=xPos+"px";
		//console.log("blackDownArrow = "  + blackDownArrow.loc);
	}


	
	placeArrows(){///Pi/Th/Sy/To/Ar/BlueUpAnsow/BlueUpAnsow.AA.jpg' id='undefined' />
			console.log("placeArrows()  " + this.plu.pMax);//		    console.log(" = "  + );
			///this.placeAnswerArrow();
			//const xLoc = arrowInsrtPt.left;
			//const yLoc = arrowInsrtPt.top;
			//console.log("arrowInsrtPt = "  + xLoc + "   " + yLoc);
			const theSlider = document.getElementById("slider"  );
			theSlider.style.display = "none"; 
	
			
			for (let i = 0;i<this.plu.pMax;i++){//
				const arrowInsrtPt = document.getElementById("arrowInsrtPt" + i );
				//console.log("arrowInsrtPt = "  + arrowInsrtPt);
				const color = this.plu.players[i].color;
				const colorX = color.charAt(0).toUpperCase() + color.slice(1);
				const fileInput = `}P.AA.Pi.Th.Sy.To.Ar.${colorX}UpArrow.AA.jpg|${color}Arrow|class ='upArrow' `;
				const img = getImageFile(fileInput)
				//console.log("img[0] = "  + img[0] );
				arrowInsrtPt.innerHTML = arrowInsrtPt.innerHTML + img[0];
				const arrowName = color + "Arrow";
				const theArrow = document.getElementById(arrowName);
				const xLoc = theArrow.x;
				const yLoc = theArrow.y
				//console.log(arrowName + "  -- "  + xLoc +  "  " + yLoc);
				

				//let loc = parseInt(Number(this.sliderYearLoc[i]) +3 )//-(i * 32)-17
				let loc = (this.pAns[i] = this.loNbr);
				if(loc > 260)loc-=10;
				//this.arrowLoc.push(i + " --  " + arrowName + "  " +     loc);
				theArrow.style.left = loc   +"px";

				//console.log(loc + " --  " + arrowName + "  " +    theArrow.x);

			}

			for (let i = 0;i<this.plu.pMax;i++){
				//console.log(i + "  this.arrowLoc[i]  " +  this.arrowLoc[i]   + " this.pAns[i]=  " + this.pAns[i]   );			
			}
		
		}




	setValues(){//,Answer=500 Type=Integer LowBracket=200 HiBracket=1200,
		//console.log("GameN this.gameDataArray" + this.gameDataArray )
		this.loNbr = this.parmMap.get("LowBracket");
		const loBox = document.getElementById("displayTextLow");
		loBox.value= this.loNbr;
		const hiBox = document.getElementById("displayTextHi");
		this.hiNbr = this.parmMap.get("HiBracket");
		hiBox.value = this.hiNbr;
		this.slider = document.getElementById("slider");//min="1" max="100"
		this.slider.min = this.loNbr;
		this.slider.max = this.hiNbr;
		const midNbr = (parseInt(this.hiNbr) - parseInt(this.loNbr))/2 +  parseInt(this.loNbr);
		const midBox = document.getElementById("displayTextMid");
		midBox.value = midNbr;
		const displayBox = document.getElementById("displayBox");
		displayBox.value=this.loNbr;
		this.ratio= (this.hiNbr - this.loNbr)/500
		this.theAnswer = this.parmMap.get("Answer");

	}

	nextPlayer(anAnswer){
		console.log(" nextPlayer()  " + anAnswer)
	}



	
	setDisplay(aValue){
       const display = document.getElementById("displayBox");
	   display.value=aValue;
	}
	//<div id="tblTitle" > XXX Your turn</div

	setUp(){
		const HTMLlayout =`


	<table  width="500px" id="tblTitle"><caption >Your Selection</caption>
	<tr><td><input type="text" name="display" id="displayBox" value="0"></td></tr>
	<tr width="500px">
	<td>                                                                      
	<input type="text" value="1"  class="nbrDisplay" id="displayTextLow" > 
	<input type="text" value="50" class="nbrDisplay" id="displayTextMid" >  
	<input type="text" value="100"class="nbrDisplay" id="displayTextHi"  >  
	</td>        
	</tr>  
	  <!--<td><div id="nbrLineInsrtPt"> </div></td> -->
	<td><div id="nbrLineInsrtPt"><img src="../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/NbrLine-1/NbrLine-1.PA.gif" width="503" id="nbrLine" height="21" alt="" title="nbrLine" /></div></td> 
	</tr>
	<tr>  
	<!--  -->                                                               
	<tr><td><div   width="1000px"  id='arrowInsrtPt0'></div></td></tr>
<!--  -->
	<tr><td><div   width="1000px"  id='arrowInsrtPt1'></div></td></tr>
<!--  -->
	<tr><td><div   width="1000px"  id='arrowInsrtPt2'></div></td></tr>
<!---->
	 <tr><td><div   width="1000px"  id='arrowInsrtPt3'></div></td></tr> 
	</tr>
	<tr>                                                           
	</tr>
 <tr>
   <td>
	  <div  height="24px">
		<div id="sliderDiv">
		<input type="range" class="slider" id="slider" onchange="gameN.regAns(this.value)"  oninput="gameN.setDisplay(this.value)" width="500px" height="40px" name="theSliderYear" height="24px" /> 
		</div>
	  </div>
  </td>
</tr> 
	 <tr></tr>
	  <!--   value="1950" min="1950" max="2000" -->
	</table>
		<!-- id="sliderDiv"onchange="gameN.regAns(this.value)"   onchange="gameN.regAns(this.value)"-->
	 <div id="dayTableInsertionPoint"> </div>
	 <div id="theDayTable"  div>
	</div>
	  </body>
	</html>`
	
		const insertPtA = document.getElementById("insertPtA");
		insertPtA.innerHTML = insertPtA.innerHTML + HTMLlayout
	}
	

}//bottom of gameN


