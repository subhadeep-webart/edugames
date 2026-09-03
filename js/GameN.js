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
		this.lowNbr;
		this.hiNbr;
		this.ratio;
		this.playerNbr = 0;
		this.pAns =[];
		this.sliderX =[];
		this.displayBox;
		this.tblTitle;
		//gamePlayArea;
		this.lastPlay = false;
		this.isfirstPlayer = true;
		this.pointsThisPlay = 100;
		this.lowNbr;
		this.hiNbr;
		this.midNbr;
		this.loBox = null;
		this.hiBox = null;
		this.midBox = null;
		this.slider = null;
		this.time = [2];
		//this.init();
		//this.bidTime = 15;
		this.pickWhoGoesFirst();

		if (singlePlayerMode) {
			this.showSinglePlayerPregameNotice();
		} else {
			this.showPregameNotice();
		}
		console.log("GameN.constructor BOTTOM"  );
	}

	init() {
		console.log("GameN.init TOP");
		this.cleanPlayArea()
		cp.itf.secondPlay = false;
		this.startPlay();
		console.log("GameN.init Bottom");
	}

	showSinglePlayerPregameNotice() {
		const theTime = bidButs.getTimeForGameLND();
		console.log("GameN.showPregameNotice() top ");
		const buf = `<div class="tsd-pregame"><div class="tsd-pregame-head"><button type="button" class="tsd-pregame-back" aria-label="Go back" onclick="history.back()"><img src="images/new-images/back_button.svg" width="44" height="51" alt=""></button><div class="tsd-pregame-title">Pre-Game Notice</div></div><div class="tsd-pregame-rules"><div class="tsd-pregame-rules-inner"><font size="5">
     <p>The next Game requires you to select a number.</p>
     <font size="4"><p>The point award is a function of how close you get to the correct number.</p></font></div></div><div class="tsd-pregame-foot"><button type="button" class="tsd-pregame-start" onclick="startGameN()"><i class="tsd-pregame-play" aria-hidden="true"></i><span>Start Round</span></button></div></div>`

		gamePlayArea.innerHTML = buf;
		console.log("GameN.showPregameNotice() bottom ");

	}

	showPregameNotice() {
		const theTime = bidButs.getTimeForGameLND()
		console.log("GameN.showPregameNotice() top ");
		const buf = `<div class="tsd-pregame"><div class="tsd-pregame-head"><button type="button" class="tsd-pregame-back" aria-label="Go back" onclick="history.back()"><img src="images/new-images/back_button.svg" width="44" height="51" alt=""></button><div class="tsd-pregame-title">Pre-Game Notice</div></div><div class="tsd-pregame-rules"><div class="tsd-pregame-rules-inner"><font size="5">
     <p>The next Game requires each player to select a number.  
     <p><b>The player closest to the correct number wins.</b></p></p>
     <font size="4"><p>The point award is a function of how much closer the winner is than the looser.</p></font>
     <b>IMPORTANT:</b> Players need to decide if the second player is allowed to view the first player's selection or not.
     If not, the second player must turn away while the first player makes the selection.</font></div></div><div class="tsd-pregame-foot"><button type="button" class="tsd-pregame-start" onclick="gameN.startPlay()"><i class="tsd-pregame-play" aria-hidden="true"></i><span>Start Round</span></button></div></div>`

		gamePlayArea.innerHTML = buf;
		console.log("GameN.showPregameNotice() bottom ");
	}

    startGameN() {//Sarted by the HTML button
		console.log("startGameN) top");
		gamePlayArea.innerHTML = "";
		this.init();
	}
	//cleanPlayArea()

	showAnswers() {
		let buf = "The answer is " + this.theAnswer + ".<br>";
		postNoticeCenterDisplay("36,white," + buf);

	}
	logPlay() {
		
		this.playDetails.push(cp.rndSerNbr + "|" + this.pAns[0] + "," + this.time[0] + "/" + this.bidTime + " | " + this.pAns[1] + "," + this.time[1] + "/" + this.bidTime);
		console.log("logPlay()playDetails= " + this.playDetails);
		logRoundPlay(this.playDetails);
	}

	setBidTime() {
		console.log("setBidTime() top");
		this.bidTime = bidButs.getTimeForGameLND();
		startGameLNDTimer(this.bidTime);
	}


	startPlay() {
		console.log("Game N startPlay top ")
		cp.itf.playInProgress = true;
		this.hidePrePlayNotice();
		this.setUp();
		this.setBidTime();
		//gamePlayArea.display = "block";
		//gamePlayArea.display = "none";
		console.log("Game N startPlay bottom ")
	}

	hidePrePlayNotice() {
		gamePlayArea.innerHTML = "";
	}


	helloWorld(){
		console.log("GameN.helloWorld" );//         console.log("GameN  = " + );
		super.helloWorld();
	}

	testA(){console.log("gameD.testA")
		this.placeArrow(0,300);

	}
	nextPlayer() {
		console.log("GameNnextPlayer()A nowPlaying= " + cp.itf.nowPlaying + "  " + this.slider.value);
		this.displayBox.innerHTML = 0;
		this.slider.set_value = this.lowNbr;
		console.log("GameNnextPlayer()B ");
		this.setBidTime();
		super.nextPlayer();
	}




	cleanPlayArea() {
		console.log("GameN cleanUpPlayArea  ");

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

		el = document.getElementById("redArrow");
		if(el != null)el.remove();

		el = document.getElementById("blueArrow");
		if (el != null) el.remove();
	}

	setDisplay(aValue) {//console.log("setDisplay " +  aValue + "  playInProgress = " +  cp.itf.playInProgress );
		this.displayBox.innerHTML = aValue;
		/*
		if (cp.itf.playInProgress == false) {
			console.log("cp.itf.playInProgress " + cp.itf.playInProgress);
			cp.itf.postNotice("You need to click on a Press to Go First button.")
		} else {
			//document.getElementById("displayBox").value = aValue;
			
		}	*/	
	}


	checkPlay(reason) {
		console.log("GameN.checkPlay() reason  " + reason)//Timed out
		this.regHit(0);
	}

	checkSingleHitFmMultiiPlayer(nbr) {
		console.log("GameN.checkSingleHitFmMultiiPlayer() " + nbr);
		let winPNbr = getOtherPlayer(nbr);
		const otherPlayer = plu.players[winPNbr].name;
		let buf = "The answer is indicated by the black UP-Arrow. <br>";
		buf += "Player " + plu.players[nbr].name + " did not make a selection in time.<br> and the point award goes to " + otherPlayer + ".";
		const postedPts = cp.itf.getPointsForThisRound();
		cp.itf.displayResultsTypeD(winPNbr, postedPts, buf);
		
		postNoticeCenterDisplay("24," + plu.players[winPNbr].color + "," + buf);
	}

	getSinglePlayerResults(n) {
		console.log("getSinglePlayerResults  " + n);
		stopGameLNDTimer();
		//const dif = Math.abs(this.theAnswer - this.pAns[0]);
		const dif = Math.abs(this.theAnswer - n)
		console.log("dif=  " + dif);
		console.log("this.hiNbr=  " + this.hiNbr);
		console.log("this.lowNbr  " + this.lowNbr);
		const diff = dif / (this.hiNbr - this.lowNbr) * 100;
		console.log("diff=  " + diff);
		let result = 0;
		let playResults = "Your were ";
		if (diff > 16) {
			result = 0;
			playResults += "Way OFF";//D.d("   " + );
		}
		else if (diff > 7.2) {
			result = ((16 - diff) / 16) * .25;
			playResults += "In The Ball Park";
		}
		else if (diff > 3.4) {
			result = ((10 - diff) / 10) * .5;
			playResults += "In Range";
		}
		else if (diff > 2.01) {
			result = ((6 - diff) / 6) * .75;
			playResults += "Close";
		}
		else {
			result = (3 - diff) / 2;
			playResults += "Real Close";
		}
		console.log("result =  " + result);//D.d("   " + );
		if (result > 1) {
			result = 1;
			playResults += "Right On";
		}
		console.log("  playResults= " + playResults);
		const ptAwd = parseInt(result * cp.itf.getPointsForThisRound());
		console.log("ptAwd =  " + ptAwd);//D.d("   " + );
		let buf = "The answer is " + this.theAnswer + ". ";


		buf += playResults + " with an award of " + ptAwd.toFixed(0) + " points.<br>"

		postNoticeCenterDisplay("24," + plu.players[0].color + "," + buf);

		//cp.itf.displayResultsTypeD(0, ptAwd, buf);

		this.slider.style.display = "none";
		this.displayBox.innerHTML = "You selected: " + n;
		cp.itf.displayResultsTypeD(0, ptAwd.toFixed(0), buf);
		this.setNextRound()
		this.placeArrows();// --This is to be fixed later

		//this.logPlay();
		//return playResults + " and got " + points + " points.";
	}


	evalTheResults() {
		console.log("valTheResults()  " + this.theAnswer + "  pAns= " + this.pAns);
		stopGameLNDTimer();
		stopGameLNDTimer();
		let buf = "";
		let buff = ""
		let winner = "X"
		let looser = "Y"
		let arrA = this.pAns[0].split(",");
		const p0 = arrA[0];
		const ans0 = arrA[1];
		let arrB = this.pAns[1].split(",");
		const p1 = arrB[0];
		const ans1 = arrB[1];
		if (ans0 == 0) {
			this.checkSingleHitFmMultiiPlayer(0);
			return;
		}

		if (ans1 == 0) {
			this.checkSingleHitFmMultiiPlayer(1);
			return;
		}


		/*
		if(ans0 == ans1){
			const theRatio = this.getOnePlayerResults(ans1);
			buf+= "It's a tie."
			cp.itf.setTieResults(this.pointsThisPlay,theRatio);
			return;
		}*/
		let dif = 9999;//816 6787394

		let ans = 0;
		console.log(ans0 + " #ans " + ans1)
		const dif0 = Math.abs(ans0 - this.theAnswer);
		const dif1 = Math.abs(ans1 - this.theAnswer);
		console.log(dif0 + " *dif " + dif1)
		let theRatio = 0
		let winChoice = 0;
		let looseChoice = 0;
		if(dif0 < dif1){
			winner = p0;
			winChoice = arrA[1];
			looseChoice = arrB[1];
			looser = p1
			theRatio = dif0/dif1;
		}else{
			winner = p1;
			winChoice = arrB[1];
			looseChoice = arrA[1];
			looser = p0
			theRatio = dif1/dif0;
		}
		

		const percent = 1.0 - theRatio;

		console.log("percent " + percent);

		const points = this.pointsThisPlay;

		console.log("points= "  + points);
		//let ptAwd = points * theRatio;
		let ptAwd = points * percent;
		if(percent > 1.0){
			ptAwd = points;
		}
		let bufA = "The answer is " + this.theAnswer + ".  ";
		bufA+= plu.players[winner].name + " is closests with " +  winChoice;
		bufA+= " vs " +  plu.players[looser].name + " with " + looseChoice + ".";

		//this.tblTitle.caption.innerHTML = bufA;

		//postNoticeCenterDisplay("24," + plu.players[winner].color + "," + bufA) ;
		cp.itf.displayResultsTypeD(winner, ptAwd, bufA);

		buff+= winChoice + " vs " + looseChoice

		//displayBox.value = buff;

		console.log("theRatio " + theRatio + " ptAwd " + ptAwd );

		buf+= "The answer is " + this.theAnswer + ". <br>" 
		buf+= "The winner is " + plu.players[winner].name ;
		buf+= " who chose " + winChoice + " while " + plu.players[looser].name +  " choose " + looseChoice +  ".<br>  ";
		buf+= plu.players[winner].name + "  was " + percent.toFixed(2) +  " percent closer to the correct answer than " + plu.players[looser].name;
		buf += " with an award of " + ptAwd.toFixed(0) + " points.<br>"
		postNoticeCenterDisplay("24," + plu.players[winner].color + "," + buf) ;

		//cp.itf.displayResultsTypeD(winner, ptAwd, buf);
		this.slider.style.display = "none"; 
		//const theSlider = document.getElementById("slider");
		//theSlider.style.display = "none"; 
		//this.placeAnswerArrow();
		this.displayBox.innerHTML = "Answer= " + this.theAnswer;
		this.setNextRound()
		//this.placeArrows();  --This is to be fixed later
		this.logPlay();
	}



	//This come from onCkick() in the HTML of the slider
	regHit(anAnswer) {
		console.log("regHit " + anAnswer + "  cp.itf.nowPlaying=  " + cp.itf.nowPlaying + "  " + this.pAns + "  this.lastPlay " + this.lastPlay  )
		const time = stopGameLNDTimer("GameN regAns");
		if (singlePlayerMode) {
			this.time[0] = stopGameLNDTimer("GameN regAns");
			this.pAns.push(0 + "," + anAnswer);
			this.getSinglePlayerResults(anAnswer);
			console.log("regHit  XXX ")
			return;
		}


		const thePlayerNbr = cp.itf.nowPlaying;
		this.time[thePlayerNbr] = time;
		
		this.pAns.push(cp.itf.nowPlaying + "," + anAnswer);
		if (this.lastPlay) {
			this.evalTheResults();
			return;
		}
		console.log("GameN.this.pAns= " + this.pAns);
		if (this.cp.itf.secondPlay) {
			//this.set2ndPlyrDecPtFac();

		} else {
			//this.set1stPlyrDecPtFac();
			if (cp.itf.nowPlaying == 0) {
				cp.itf.nowPlaying = 1;
				this.showNextPlayerNotice(plu.players[1].name);
			} else {
                cp.itf.nowPlaying = 0;
				this.showNextPlayerNotice(plu.players[0].name);					
			}

			this.slider.value = this.lowNbr;
		}
		
	}


	playerStartTimer(){console.log("GameD playerStartTimer() ");
		if(this.isFirstPlay){
			this.playStarted = true;
			this.showYearSlider();
			//stopThePtFac();
			//setUpTheDecreasingPtFac(1, 0.05, 0);
			const thePts = Number(document.getElementById("ptFac").innerHTML)
			//setUpThePtFac(thePts,0.025);//Starts with the increasing Pt Fac and Now counts down
			//startThePtFac();
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
	//arrowImage[0] = <img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/Ar/BlackDownArrow/BlackDownArrow.AA.png' id='blackDownArrow' class ='Arrow' />


	placeAnswerArrow(){console.log("placeAnswerArrow= "+ this.theAnswer + " this.lowNbr  " +  this.lowNbr +  " this.hiNbr=  " + this.hiNbr );
		const theAnswerNbrLineLoc = 50;//nbrLineInsrtPt
		const range = this.hiNbr - this.lowNbr;
		console.log("range= "  + range);
		const amtPerPx =range/500;
		console.log("amtPerPx= "  + amtPerPx);

		let xPos =  ((this.theAnswer - this.lowNbr)/ amtPerPx)-16;//The 16 is half the width so that the point is on the loc

		console.log("xPos= "  + xPos);

		if(xPos > 250)xPos-=10;

		const arrowImage = getImageFile("}P.AA.Pi.Th.Sy.To.Ar.BlackDownArrow.AB.png","blackDownArrow","class ='Arrow'");
		console.log("arrowImage = "  + arrowImage);
		//const nbrLine = document.getElementById("nbrLineInsrtPt");
		console.log("arrowImage[0] = "  + arrowImage[0]);
				//console.log(rect.top, rect.right, rect.bottom, rect.left);= document.getElementById("nbrLineInsrtPt");
		gamePlayArea.innerHTML= gamePlayArea.innerHTML + arrowImage[0];

		gamePlayArea.style.zIndex = "1";
		//const blackDownArrow = document.getElementById("blackDownArrow");//  left:50px;
		blackDownArrow.style.zIndex = "5";
		//const theYpos = blackDownArrow.style.y;

		//const rect = blackDownArrow.getBoundingClientRect();
		//console.log(rect.top, rect.right, rect.bottom, rect.left);


		//top, right, bottom, left, x, y, width, and height, .

		//const theNbrLn = document.getElementById("nbrLine");

		//const rectA = theNbrLn.getBoundingClientRect();
		//console.log("**** " + rectA.top, rectA.right, rectA.bottom, rectA.left);

		const bottom = blackDownArrow.style.y;

		console.log("**bottom = "  + bottom);
	
		blackDownArrow.style.left=xPos+"px";

		console.log("blackDownArrow loc = "  + blackDownArrow.style.x);
	}


	
	placeArrows(){console.log("## placeArrows()  " );//		    console.log(" = "  + )
			const range = this.hiNbr - this.lowNbr;
			const amtPerPx =range/500;
			this.arrowLoc = []
			for (let i = 0;i<2;i++){
				const arrowInsrtPt = document.getElementById("arrowInsrtPt"  + i);
				const rect = arrowInsrtPt.getBoundingClientRect();
				const color = plu.players[i].color;
				const colorX = color.charAt(0).toUpperCase() + color.slice(1);
				const arr = [];
				arr.push("}P.AA.Pi.Th.Sy.To.Ar." + colorX + "UpArrow.AA.jpg'");
				arr.push("id='" + color + "Arrow'");
				const img = getImageFile(arr)
				gamePlayArea.innerHTML = gamePlayArea.innerHTML + img[0];
				const arrowName = color + "Arrow";
				const theArrow = document.getElementById(arrowName);
				//console.log("theArrow = "  + theArrow  + "   "  + arrowName);
				//console.log(" this.pAns[i]  "  + this.pAns[i] + "   " + this.lowNbr);
				const arrX = this.pAns[i].split(",");
				let aLoc = arrX[1];
				aLoc-=this.lowNbr;
				//console.log(" aLoc  "  + aLoc );
				const loc = (aLoc / amtPerPx)-10;
				//console.log(" loc  "  + loc );
				if(loc > 260)loc-=10;
				this.arrowLoc.push(i + " --  " + arrowName + "  " +     loc);
				//console.log(i + " -||-  " + arrowName + " ** " +    theArrow.x + "   " + loc);
				theArrow.style.zIndex = "5";
				theArrow.style.top = rect.top - 100;
				theArrow.style.left = loc+"px";
				//console.log(loc + " -**-  " + arrowName + "  " +    theArrow.x);
			}

			for (let i = 0;i<2;i++){
				console.log(i + " **** " +  this.arrowLoc[i]   + " this.pAns[i]=  " + this.pAns[i]   );			
			}
		}



	setUp(){
;
	let theNbrLine = "";
		if(onNet){
			theNbrLine = '<img src="https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/NbrLine-1/NbrLine-1.PA.gif" id = "nbrLine" width = "503" height = "21" alt = "" title = "nbrLine" /> '
		}else{
			if(onLapTop){
				theNbrLine = '<img src="ResLibry/Pi/Th/Sy/Ta/NbrLine-1/NbrLine-1.PA.gif" id="nbrLine" width = "503" height = "21" alt = "" title = "nbrLine" />'				   					
			}else{
				theNbrLine = '<img src="../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/NbrLine-1/NbrLine-1.PA.gif" id = "nbrLine" width = "503" height = "21" alt = "" title = "nbrLine" />'				   					
			}
		}

		const HTMLlayout = `<div style=" text-align: left; text-indent: 0px; padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px;">
<table width="500px" border="0" cellpadding="0" cellspacing="0" id="tblTitle" 
style="border-color: #000080; border-style: solid; background-color: #00ffff;"><caption style="font-size: 24px;>Your Selection</caption>
<tr valign="center">
<td colspan="3" "><div id="displayBox" ><b><font size="70px">-</font></b></div><br />
</td>
</tr>
<tr valign="center" ><font size="8px">
  <td width="33%"><div style="text-align:left   " style="font-weight: bold; font-size: 24pt;" class="nbrDisplay" id="displayTextLow">300</div><br />
  </td>                                         
  <td width="33%"><div style="text-align:center; "  class="nbrDisplay" id="displayTextMid">1000</div><br />
  </td>
  <td width="33%"><div  style="text-align:right; "  class="nbrDisplay" id="displayTextHi" >3000</div><br />
  </td>
</tr>
<tr><td colspan="3"><div id="nbrLineInsrtPt">${theNbrLine}</div></td></tr>
<tr valign="top">
  <td colspan="3" >  
  <div><input type="range" id="sliderN" class="slider" width="500px" min="300" max="3000" value="0" oninput="gameN.setDisplay(this.value)"  
  onchange="gameN.regHit(this.value)" style="background:${greenBG};"  ></div> 
  </td>
</tr></table></div> `


		//console.log("HTMLlayout= " + HTMLlayout)//
	gamePlayArea.innerHTML = gamePlayArea.innerHTML + HTMLlayout

	this.slider = document.getElementById("sliderN");//min="1" max="100"
	this.displayBox = document.getElementById("displayBox");
	this.loBox = document.getElementById("displayTextLow");
	this.hiBox = document.getElementById("displayTextHi");
	this.midBox = document.getElementById("displayTextMid");
	this.displayBox = document.getElementById("displayBox");
	this.tblTitle = document.getElementById("tblTitle");

	this.question = this.round.getTheQuestion();
	cp.itf.setQuestion(this.rndSerNbr + "--" + this.question);

	this.displayBox.value = this.lowNbr;
	this.insertHiAndLo();


	}

	insertHiAndLo() {console.log("insertHiAndLo()" + this.gameDataArray)
		this.lowNbr = this.round.rndMap.get("LowBracket");
		this.hiNbr = this.round.rndMap.get("HiBracket");
		this.loBox.innerHTML = this.lowNbr;
		this.hiBox.innerHTML = this.hiNbr;
		this.slider.min = this.lowNbr;
		this.slider.max = this.hiNbr;
		this.slider.value = this.lowNbr;
		this.midNbr = (parseInt(this.hiNbr) - parseInt(this.lowNbr)) / 2 + parseInt(this.lowNbr);
		this.midBox.innerHTML = this.midNbr;
		this.displayBox.innerHTML = 0;
		this.ratio = (this.hiNbr - this.lowNbr) / 500
		this.theAnswer = this.round.rndMap.get("Answer");
		console.log("*******slider.value= " + this.slider.value + " this.lowNbr=  " + this.lowNbr)

	}

	




	

}//bottom of gameN


