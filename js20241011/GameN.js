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
		this.nbrLineInsrtPtDoc;
		this.lastPlay = false;
		console.log("GameN.constructor BOTTOM"  );
	}
	init(){console.log("GameN.init TOP"  );
		super.init();
		this.typeDSetUp();
		this.setUp();
		this.displayBox= document.getElementById("displayBox");
		displayBox.value=this.loNbr;
		this.tblTitle = document.getElementById("tblTitle");
		this.insertHiAndLo();

		cp.itf.setPoints(100);
	}


	helloWorld(){
		console.log("GameN.helloWorld" );//         console.log("GameN  = " + );
		super.helloWorld();
	}

	testA(){console.log("gameD.testA")
		this.placeArrow(0,300);

	}

	cleanPlayArea(){console.log("GameD cleanUpPlayArea  "  );//
		super.cleanPlayArea();
		let el = document.getElementById("displayTextLow")	
		if(el != null)el.remove();
		
		el = document.getElementById("displayTextMid");
		 if(el != null)el.remove();
		
		 el = document.getElementById("displayTextHi");
		if(el != null)el.remove();
		el = document.getElementById("dayTableInsertionPoint");
		if(el != null)el.remove();

		el = document.getElementById("slider");
		if(el != null)el.remove();
		el = document.getElementById("tblTitle");
		if(el != null)el.remove();


		//document.getElementById("nbrLine").remove();
		
		//let collection = this.gamePlayArea.children ;
		//for(let j = 0;j <collection.length;j++){
			//collection[j].remove();
		//}
		//const nbrLineInsrtPt = document.getElementById("nbrLineInsrtPt");
		//if(nbrLineInsrtPt != undefined){
			//collection = nbrLineInsrtPt.children ;
			//for(let j = 0;j <collection.length;j++){//   
				//collection[j].remove();
			//}
		//}

	}

	placeArrow(pNbr){console.log("placeLeftArrow = "  + pNbr );
		const theColor = cp.itf.playerColorArr[pNbr];
		const colorX = theColor.charAt(0).toUpperCase() + cp.itf.playerColorArr[pNbr].slice(1);
		const file= "}P.AA.Pi.Th.Sy.To.Ar." + colorX + "UpArrow.AA.jpg"
		console.log("file = "  + file);
		const img = getImageFile(file,color + "Arrow","class ='upArrow'")
		arrowInsrtPt.innerHTML = arrowInsrtPt.innerHTML + img[0];
		const arrowName = color + "Arrow";
		const theArrow = document.getElementById(arrowName);
		const xLoc = theArrow.x;
		const yLoc = theArrow.y

		let loc = parseInt(Number(this.sliderYearLoc[pNbr]) +3 )//-(i * 32)-17
		if(loc > 260)loc-=10;
		this.arrowLoc.push(i + " --  " + arrowName + "  " +     loc);
		theArrow.style.left = loc   +"px";		
	}


	setDisplay(aValue) {//console.log("setDisplay " +  aValue + "  playInProgress = " +  cp.itf.playInProgress );
		if (cp.itf.playInProgress == false) {
			console.log("cp.itf.playInProgress " + cp.itf.playInProgress);
			cp.itf.postNotice("You need to click on a Press to Go First button.")
		} else {
			document.getElementById("displayBox").value = aValue;
		}

	}

	startPlay(){
		console.log("Game N startPlay   ptFac=" + ptFac)
		stopThePtFac();
		setUpTheDecreasingPtFac(ptFac,.05, 0)//startFac,inc,stopPt
	}



	checkPlay(){console.log("checkPlay  " + this.theAnswer + "  pAns= " + this.pAns);
		let buf = "";
		let winner = "X"
		let arr = this.pAns[0].split(",");
		const p0 = arr[0];
		const ans0 = arr[1];
		arr = this.pAns[1].split(",");
		const p1 = arr[0];
		const ans1 = arr[1];
		if(ans0 == ans1){
			buf+= "It's a tie."
			cp.itf.setTieResults();
			return;
		}
		let dif = 9999;//816 6787394

		let ans = 0;
		const dif0 = Math.abs(ans0 - this.theAnswer);
		const dif1 = Math.abs(ans1 - this.theAnswer);
		console.log(dif0 + " ****" + dif1)
		let theRatio = 0
		if(dif0 < dif1){
			winner = p0;
			theRatio = dif0/dif1;
		}else{
			winner = p1;
			theRatio = dif1/dif0;
		}
		const points = document.getElementById("ptsThisPlay").innerHTML;
		console.log("points= "  + points);
		const ptAwd = points * theRatio;


		console.log("theRatio " + theRatio + " ptAwd " + ptAwd );
		//buf += "the winner is " + cp.itf.getPlayerName(winner);
		buf += "the winner is " + plu.players[winner].name;
		//cp.itf.displayPtsThisPlay(ptAwd, buf);
		//cp.itf.displayResultsOfPlay()
		cp.itf.displayResultsTypeD(winner, ptAwd);
		this.placeAnswerArrow();
		this.placeArrows();
	}

	//This come from onCkick() in the HTML of the slider
	regAns(anAnswer) {
		console.log("regAns " + anAnswer + "  cp.itf.nowPlaying=  " + cp.itf.nowPlaying + "  " + this.pAns + "  this.lastPlay " + this.lastPlay  )
		if(cp.itf.playInProgress == false){
			console.log("cp.itf.playInProgress "  + cp.itf.playInProgress);
			cp.itf.postNotice("You need to click on a Press to Go First button.")
			return;
		} else {
			this.pAns.push(cp.itf.nowPlaying + "," + anAnswer + "," + cp.itf.getPtFac());
			if (this.lastPlay) {
				this.checkPlay()
				return;
			}
			console.log("GameN.this.pAns= " + this.pAns);
			if (this.cp.itf.secondPlay) {
				this.set2ndPlyrDecPtFac();

			} else {
				this.set1stPlyrDecPtFac();
				cp.itf.setOtherPlayer();
				this.lastPlay = true;
			}


			let snd = null;
			if (cp.itf.nowPlaying == 1) {
				snd = new Audio("Audio/RedsTurn.wav")
			} else {
				snd = new Audio("Audio/BluesTurn.wav")
			}
			snd.play();
		}
		console.log("GameD.regAns bottom " + cp.itf.nowPlaying);

	}


	timesUp(){console.log("GameD.timesUp() " +  this.isFirstPlay);
		if(this.isFirstPlay === true){
			cp.itf.startSecondPlay();
			let snd = null;
		   this.playerStartTimer()//
		   cp.itf.setOtherPlayer();
		   if(cp.itf.nowPlaying == 0){
			snd = new Audio("Audio/RedsTurn.wav")
		   }else{
			snd = new Audio("Audio/BluesTurn.wav")
		   }
		   snd.play();
			this.isFirstPlay = false;
		}else{
			//this.evalAns();
			cp.itf.displayPtsThisPlay();
		}
	}

	postNotice(){console.log("GameD postNotice ");
		const txt  =`The Point Factor on the left increases until a player presses the 'Go First' button.
		At which time, it will start to decrease. 
		The second player's time starts immediately on completion of the first player's selection 
		at a Point Factor of 2.0. `
		cp.itf.postNotice(txt);
		this.audioToStartGameTypeD();
	}

	playerStartTimer(){console.log("GameD playerStartTimer() ");
		if(this.isFirstPlay){
			this.playStarted = true;
			this.showYearSlider();
			stopThePtFac();
			setUpTheDecreasingPtFac(1, 0.05, 0);
			const thePts = Number(document.getElementById("ptFac").innerHTML)
			setUpThePtFac(thePts,0.025);//Starts with the increasing Pt Fac and Now counts down
			startThePtFac();
			this.isFirstPlay = false;
		}else{
			console.log("GameD playerStartTimer() else");
		}
	}

	setPtFacForSecondPlayer(){console.log("GameD setPtFacForSecondPlayer ");
		ssetUpTheDecreasingPtFacetUpThePtFac(1.0,0.05,0);//
	}


	setTblCaption(text){
		document.getElementById("tblTitle").createCaption().innerHTML = text;

	}

	setNextPlayerXX(){console.log("GameN setNextPlayer() = " + this.plu.pMax );
		this.thePlayer = this.plu.getNextPlayer();
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


	placeAnswerArrow(){console.log("placeAnswerArrow= "+ this.theAnswer + " this.loNbr  " +  this.loNbr +  " this.hiNbr=  " + this.hiNbr );
		const theAnswerNbrLineLoc = 50;//nbrLineInsrtPt
		const ansYear = Number(this.theAnswer.slice(0,4));
		const range = this.hiNbr - this.loNbr;
		console.log("range= "  + range);
		const amtPerPx =range/500;
		console.log("amtPerPx= "  + amtPerPx);

		let xPos =  ((this.theAnswer - this.loNbr)/ amtPerPx)-10;

		console.log("xPos= "  + xPos);

		if(xPos > 250)xPos-=10;

		const arrowImage = getImageFile("}P.AA.Pi.Th.Sy.To.Ar.BlackDownArrow.AB.png","blackDownArrow","class ='Arrow'");
		console.log("arrowImage = "  + arrowImage);
		//const nbrLine = document.getElementById("nbrLineInsrtPt");
		console.log("arrowImage[0] = "  + arrowImage[0]);

		this.nbrLineInsrtPtDoc.innerHTML= this.nbrLineInsrtPtDoc.innerHTML + arrowImage[0];
		this.nbrLineInsrtPtDoc.style.zIndex = "1";
		const blackDownArrow = document.getElementById("blackDownArrow");//  left:50px;
		console.log("blackDownArrow  loc = "  + blackDownArrow.style.loc);
		blackDownArrow.style.zIndex = "5";
		blackDownArrow.style.left=xPos+"px";

		console.log("Locc= "  + xPos+"px");

		console.log("blackDownArrow loc = "  + blackDownArrow.style.loc);
	}


	
	placeArrows(){console.log("placeArrows()  " );//		    console.log(" = "  + );
			///this.placeAnswerArrow();
			//const xLoc = arrowInsrtPt.left;
			//const yLoc = arrowInsrtPt.top;///Pi/Th/Sy/To/Ar/BlueUpAnsow/BlueUpAnsow.AA.jpg' id='undefined' />
			//console.log("arrowInsrtPt = "  + xLoc + "   " + yLoc);
			const theSlider = document.getElementById("slider"  );
			theSlider.style.display = "none"; 
	
			
			for (let i = 0;i<this.plu.pMax;i++){//
				const arrowInsrtPt = document.getElementById("arrowInsrtPt" + i );
				//console.log("arrowInsrtPt = "  + arrowInsrtPt);
				const color = this.plu.players[i].color;
				const colorX = color.charAt(0).toUpperCase() + color.slice(1);
				const arr = [];
				arr.push("}P.AA.Pi.Th.Sy.To.Ar." + colorX + "UpArrow.AA.jpg");
				arr.push("id='" + color + "Arrow'");

				const img = getImageFile(arr)
				console.log("img[0] = "  + img[0] );
				arrowInsrtPt.innerHTML = arrowInsrtPt.innerHTML + img[0];
				const arrowName = color + "Arrow";
				const theArrow = document.getElementById(arrowName);
				const xLoc = theArrow.x;
				const yLoc = theArrow.y
				console.log(arrowName + "  -- "  + xLoc +  "  " + yLoc);
				

				let locC = parseInt(Number(this.sliderYearLoc[i]) +3 )//-(i * 32)-17

				loc = (this.pAns[i] = this.loNbr);
				if(loc > 260)loc-=10;

				//this.arrowLoc.push(i + " --  " + arrowName + "  " +     loc);
				theArrow.style.left = loc   +"px";

				//console.log(loc + " --  " + arrowName + "  " +    theArrow.x);

			}

			for (let i = 0;i<this.plu.pMax;i++){
				console.log(i + "  this.arrowLoc[i]  " +  this.arrowLoc[i]   + " this.pAns[i]=  " + this.pAns[i]   );			
			}
		
		}




	insertHiAndLo(){console.log("insertHiAndLo()" + this.gameDataArray )

		this.loNbr = this.round.rndMap.get("LowBracket");
		const loBox = document.getElementById("displayTextLow");
		loBox.value= this.loNbr;
		const hiBox = document.getElementById("displayTextHi");
		this.hiNbr = this.round.rndMap.get("HiBracket");
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
		this.theAnswer = this.round.rndMap.get("Answer");

	}

	nextPlayer(anAnswer){
		console.log(" nextPlayer()  " + anAnswer)
	}


	//https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/DateLine-1/DateLine-1.PD.gif
	
	//http://www.antoniak.com/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/NbrLine-1/NbrLine-1.PA.gif
	//

	setUp(){
;
	let theNbrLine = "";
		if(onNet){
			theNbrLine = '<img src="https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/NbrLine-1/NbrLine-1.PA.gif" id="nbrLine" width="503" height="21" alt="" title="nbrLine" />'
		}else{
			//theNbrLine = '<img src="../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/NbrLine-1/NbrLine-1.PA.gif" id="nbrLine" width="503" height="21" alt="" title="nbrLine" />'
			theNbrLine = '<img src="ResLibry/Pi/Th/Sy/Ta/NbrLine-1/NbrLine-1.PA.gif" id="nbrLine" width="503" height="21" alt="" title="nbrLine" />'
		}

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
	<td><div id="nbrLineInsrtPt">${theNbrLine}</div></td> 
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
	

	    const insertPtA = document.getElementById("gameInsrtPt");
		insertPtA.innerHTML = insertPtA.innerHTML + HTMLlayout
		//console.log("HTMLlayout=  " + HTMLlayout);
		this.nbrLineInsrtPtDoc = document.getElementById("nbrLineInsrtPt");

		//console.log("HTMLlayout= " + HTMLlayout);
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


	

}//bottom of gameN


