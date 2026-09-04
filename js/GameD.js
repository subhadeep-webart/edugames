// JavaScript source code




class GameD extends Game{
		//console.log("GameD  top "  ); //console.log("GameD  = " + )
		constructor (round,cp,utl,plu){
		super (round,cp,utl);
		console.log("GameD.constructor TOP"  );
		this.plu = plu;
		this.inputArray;
		this.ptInc = 0;
		this.gameInPlay = "gameD";
		this.gameType = 'D';
		this.isFirstPlay= true;
		this.arrowIsDraggable = true;
		this.ctx;
		this.display;
		this.theAnswer;
		this.loNbr;
		this.hiNbr;
		this.dateLineDoc;
		this.pAns =new Array(2);
		this.pAnsX =[];
		this.sliderYearLoc =[2];
		this.sliderDayLoc =[2];
		this.playerPtFac = [2];
		this.displayBox;
		this.slider;
		this.theAnswer = ""
		this.theDayTableIsInserted = false;
		this.theYear = "";
		this.sliderYear = "";
		this.displayBoxYear = "";
		this.theDayTable = "";
		this.displayBoxDay = "";
		this.yearArr =[2];
		this.arrowLoc =[2];
		this.pNbr = 0;
		this.thePlayer;
		this.displayAnswer;
		this.logOfDisplayedAnswers = [2];
		this.monthMap;
		this.playStarted = false;
		this.month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan"]
		this.arrowInsrtPt;
		this.dayTableInsertionPoint;
		this.theDayTable;
		this.sliderDay;
		this.showPregameNotice();
		this.pAns = [2];
		this.time = [2];
		this.playAlreadyChecked = false;
		console.log("GameD.constructor BOTTOM"  );
	}

	init() {
		super.init(); console.log("GameD.init TOP")
		this.insertLayout();
		this.displayBoxYear = document.getElementById("displayBoxYear");
		this.displayBoxDay = document.getElementById("displayBoxDay");
		this.sliderYear = document.getElementById("sliderYear");
		this.theDayTable = document.getElementById("theDayTable");
		this.displayBox = document.getElementById("displayBox");

		this.createMonthMap();
		this.insertHiAndLo()
		this.showYearSlider();
		this.setUpSliders()
		this.pointsThisPlay = 100;
		this.setBidTime();
		if (!singlePlayerMode) {
			this.pickWhoGoesFirst();
		} else {
			postNoticeCenterDisplay(plu.players[0].name + " select a Date.");
		}
		//this.typeDSetUp();
		//cp.itf.setPoints(100);
		//this.dateLineDoc = document.getElementById("dateLine");//this.sliderYear this.sliderDay
		console.log("GameD.init Bottom " + this.dateLineDoc);
	}

	startGameD() {
		console.log("startGameD) top");
		gamePlayArea.innerHTML = "";
		this.init();
	}

	setBidTime() {
		console.log("setBidTime() top");
		const bidTime = bidButs.getTimeForGameLND();
        startGameLNDTimer(bidTime);//cp.theGameInPlay.checkPlay("Timed Out")
	}

	checkPlay(reason) {
		console.log("GameD.checkPlay() reason  " + reason)//Timed out
		if (!this.playAlreadyChecked) {
			this.regAns("time");
		}
		//const thePlayerNbr = cp.itf.nowPlaying;
		//this.pAns[thePlayerNbr] = 0;
		//this.nextPlayer();
	}

	nextPlayer() {
		console.log("Game  Player() ");
		super.nextPlayer();
		this.continueToSecondPlayer();
	}

	continueToSecondPlayer() {
		console.log("---continueToSecondPlayer  ")
		gamePlayArea.display = ""
		this.resetDisplay();
		//this.setPtFacForSecondPlayer();
		//cp.itf.setPlayerUp(cp.itf.nowPlaying)
		let snd = null;
		//this.playerStartTimer()//
		cp.itf.setOtherPlayer();
		if (cp.itf.nowPlaying == 0) {
			snd = new Audio("Audio/RedsTurn.wav")
		} else {
			snd = new Audio("Audio/BluesTurn.wav")
		}
		snd.play();



		this.setBidTime();
		this.isFirstPlay = false;
	}


	setYearDisplay(theYear){
		this.displayBoxYear.value= theYear ;
	}

	 showYearSlider(){   console.log("showYearSlider");
		const sliderYear = document.getElementById("sliderYear");
		this.sliderYear.style.display = "block"; //  .style.display = "block"; .style.display = "none";
	}

	helloWorld(){
		console.log("GameD.helloWorld" );//console.log("GameD  = " + );
		super.helloWorld();
	}

	testA(){console.log("gameD.testA")
		this.cleanPlayArea();
	}


	logPlay() {
		this.playDetails.push(cp.rndSerNbr + "|" + this.time[0] + "," + this.pAns[0] + " | " + this.time[1] + "," + this.pAns[1]);
		console.log("logPlay()playDetails= " + this.playDetails);
		logRoundPlay(this.playDetails);
	}


	regAns(sliderLoc) {// player lets up on the mouse ="onchange" = regAns
		console.log("|||||regAns isFirstPlay= " + this.isFirstPlay + "  nowPlaying =" + cp.itf.nowPlaying)//Done on mouseUp of sliderDay. Starts second play
		if (singlePlayerMode) {
			this.evalSinglePlayerResults();
			return;
		}

		const time = stopGameLNDTimer("GameD regAns");
		const thePlayerNbr = cp.itf.nowPlaying;
		this.time[thePlayerNbr] = time;
		let results = 0;
		if (sliderLoc != 0) {
			const sliderX = parseInt(sliderLoc / 370 * 10)
			this.sliderDayLoc.push(sliderLoc)
			results = displayBoxYear.value;
			//this.logOfDisplayedAnswers[cp.itf.nowPlaying] = results;
			console.log("### results=   " + results + " nowPlaying=  " + cp.itf.nowPlaying);
		} 
		this.pAns[cp.itf.nowPlaying] = results;
		console.log("cp.itf.nowPlaying  = " + cp.itf.nowPlaying);
		
		//this.pAns[thePlayerNbr] = results;
		//console.log("this.pAns[thePlayerNbr]   = " + this.pAns[thePlayerNbr] + "   " + thePlayerNbr);

		const thePlayer = plu.players[thePlayerNbr].name;
		console.log("thePlayer =  " + thePlayer);
		let playerName = plu.players[0].name;
		let nxtPNbr = 1;
		if (thePlayerNbr == 0) {
            nxtPNbr = 0;
			playerName = plu.players[1].name;
		}/*
		if (singlePlayerMode) {
			this.evalSinglePlayerResults();
			return
		}*/

		if (this.isFirstPlay) {
			gamePlayArea.display = "none";//"24," + plu.players[winPNbr].color + "," + buf
			postNoticeCenterDisplay("24," + plu.players[nxtPNbr].color + ",Now it's " + playerName + "'s turn.");
			this.showNextPlayerNotice(playerName);
			this.isFirstPlay = false;
			//this.continueToSecondPlayer();
		} else {
			this.evalTheResults();
		}
	}

	evalSinglePlayerResults() {

		console.log("*** evalSinglePlayerResults ");
		let buf = "The question was: " + this.question + "\n The answer is: " + this.displayAnswer + " as designated by the black arrow.<br>"
		//if (sliderLoc != 0) {
			//const sliderX = parseInt(sliderLoc / 370 * 10)
			//this.sliderDayLoc.push(sliderLoc)
			//results = displayBoxYear.value;
		//this.logOfDisplayedAnswers[cp.itf.nowPlaying] = results;
		stopGameLNDTimer();
		console.log("this.theAnswer = " + this.theAnswer)
		console.log("### displayBoxYear=   " + displayBoxYear.value);
		const [dayX, monthX, yearX] = displayBoxYear.value.split(" ");
		console.log("monthX = -" + monthX + "-");
		const monthNbr = this.monthMap.get(monthX);
		console.log("monthNbr = " + monthNbr)
		const temp = yearX + "," + monthX + "," + dayX;
        const rightAns = this.theAnswer.substring(0, 4) + "-" + this.theAnswer.substring(4, 6) + "-" + this.theAnswer.substring(6, 8);	
		const playerAns = yearX + "-" + monthNbr + "-" + dayX;
        const diff = this.daysBetween(playerAns, rightAns);
		console.log("diff = " + diff)
		let pointsAwarded = 0;

		if (diff > 100) {
			pointsAwarded = 0;
		} else {
			pointsAwarded = ((100 - diff) / 100 * this.pointsThisPlay).toFixed(0);
		}
		console.log("pointsAwarded = " + pointsAwarded)      
		this.placeAnswerArrow();
        buf += "You were " + diff.toFixed(0) + "  days from the correct answer and were awarded " + pointsAwarded + " points.";
		cp.itf.displayResultsTypeD(0, pointsAwarded, buf);
		postNoticeCenterDisplay("24," + plu.players[0].color + "," + buf);
		enableNextRndBut();
        this.playAlreadyChecked = true;

	}

	daysBetween(date1, date2) {//YYYY-MM-DD
		console.log("daysBetween " + date1  + " and " + date2);
		try {
			// Convert to Date objects if strings are provided
			const d1 = (date1 instanceof Date) ? new Date(date1) : new Date(date1);
			const d2 = (date2 instanceof Date) ? new Date(date2) : new Date(date2);

			// Validate dates
			if (isNaN(d1) || isNaN(d2)) {
				console.error("Invalid date(s) provided.");
				return null;
			}

			// Remove time components to avoid partial day issues
			d1.setHours(0, 0, 0, 0);
			d2.setHours(0, 0, 0, 0);

			// Calculate difference in milliseconds
			const diffMs = Math.abs(d2 - d1);

			// Convert milliseconds to days
			return diffMs / (1000 * 60 * 60 * 24);
		} catch (err) {
			console.error("Error calculating days:", err.message);
			return null;
	}
}

// Example usage:
//console.log(daysBetween("2024-06-01", "2024-06-10"); // 9
//console.log(daysBetween(new Date(2024, 0, 1), new Date(2024, 0, 15))); // 14
//console.log(daysBetween("invalid", "2024-06-10")); // null


	evalTheResults() {
		console.log(" evalTheResults**** " + this.theAnswer + "  pAns= " + this.pAns);
		//stopThePtFac();
		this.logPlay();
		if (this.pAns[0] == 0 || this.pAns[0] == null) {
			this.checkSinglePlayerHitInMultilplay(0);
			return;
		}

		if (this.pAns[1] == 0 || this.pAns[1] == null) {
			this.checkSinglePlayerHitInMultilplay(1);
			return;
		}

		let buf = "The question was: " + this.question + "\n The answer is: " + this.displayAnswer + " as designated by the black arrow.<br>"
		const ansX = this.theAnswer
		//this.tfPlayerName.style.backgroundColor="white";
		//this.tfPlayerName.value = "";
		displayBoxYear.style.fontSize = "large";
		displayBoxYear.value = "The answer is: " + this.displayAnswer;
		displayBoxYear.style.backgroundColor = "white";
		this.hideDayTable();
		//console.log("ansX=  " + ansX );
		//const nbrOfPlayers = this.pAns.length//this.pAns.length//		    console.log(" = "  + );

		const arrD = this.displayAnswer.split(" ")

		const ansDate = arrD[2] + "," + arrD[1] + "," + arrD[0]
		let yearX = "";
		let monthX = "";
		let dayX = "";
		let pLtr = "";
		//const arrPltr =[]//To know which player was first and second
		const playerAns = [];
		const playerDif = [];
		//const nbrOfPlayers = plu.pMax;

		//console.log("+++++*******************nbrOfPlayers = "  + nbrOfPlayers);

		for (let i = 0; i < 2; i++) {
			console.log(i + " -||-  " + this.pAns[i])
			//const [pLtr,dayX,monthX,yearX] = this.pAns[i].split(" ")
			console.log("this.pAns = " + this.pAns);
			const arrr = this.pAns[0];
			console.log("arrr = " + arrr)

			const [dayX, monthX, yearX] = this.pAns[i].split(" ");
			//arrPltr.push(pLtr);
			console.log("monthX = " + monthX);
			const monthNbr = this.monthMap.get(monthX);
			const temp = yearX + "," + monthX + "," + dayX
			playerDif.push(this.getDifBtwDates(temp, ansDate));
			console.log(pLtr + "  ||||playerDif|||||| = " + playerDif[i]);
		}
		let theRatio = 0;
		let theWinner = "";
		let thePtfac = 0;
		//if (playerDif[0] == playerDif[1]) {
		//theWinner = "There is a tie."
		//}

		console.log("this.playerPtFac[0]= " + this.playerPtFac[0])
		console.log("this.playerPtFac[1]= " + this.playerPtFac[1])
		if (playerDif[0] < playerDif[1]) {
			thePtfac = Number(this.playerPtFac[0]);
			theWinner = 0;
			theRatio = playerDif[0] / playerDif[1];
		} else {
			thePtfac = Number(this.playerPtFac[1]);
			theWinner = 1;
			theRatio = playerDif[1] / playerDif[0];
		}
		const theRatioFac = (1 - theRatio);
		//const thePoints = Number(cp.itf.getPoints());
		const thePoints = this.pointsThisPlay;
		console.log(theWinner + "  ||||   |||||| theRatio= " + theRatio.toFixed(3) + "  theRatioFac " + theRatioFac.toFixed(3) + " thePoints = " + thePoints);

		console.log("thePtfac= " + thePtfac)
		console.log("theRatioFac= " + theRatioFac)
		console.log("thePoints= " + thePoints)
		//const thePtAwd = thePtfac * theRatioFac * thePoints;
		const thePtAwd = theRatioFac * thePoints;
		//const thePtAwd = thePoints;

		//cp.itf.awardPoints("L",thePtAwd)

		if (theRatioFac == 0) {//A tie
			let resultDistance = "";
			[thePtAwd, resultDistance] = this.getTiePoints(), split(",");
			const halfPts = thePtAwd / 2;
			buf += " Both players were " + resultDistance + " and equidistant from the correct answer and each will receive " + halfPts + " points.";
			console.log("The point award = " + thePtAwd)
			cp.itf.awardPoints(0, halfPts);
			cp.itf.awardPoints(1, halfPts);
			//const theQuestionArea = document.getElementById("question");
			this.hideYearSlider();
			this.placeAnswerArrow();
			postNoticeCenterDisplay("18,black," + buf);
			enableNextRndBut();
			return;
		}

		buf += "The winner is " + plu.players[theWinner].name + " who was closests with  " + this.pAns[theWinner] + " and was awarded " + thePtAwd.toFixed(0) + " points.";
		if (theWinner == 0) {
			buf += "<br>" + plu.players[1].name + " choose " + this.pAns[1];
		} else {
			buf += "<br>" + plu.players[0].name + " choose " + this.pAns[0];
		}

		const theQuestionArea = document.getElementById("question");
		this.hideYearSlider();

		this.placeAnswerArrow();
		cp.itf.displayResultsTypeD(theWinner, thePtAwd, buf);
		postNoticeCenterDisplay("24," + plu.players[theWinner].color + "," + buf);
		enableNextRndBut();

	}



	checkSinglePlayerHitInMultilplay(nbr) {
		console.log("GameD.checkSinglePlayerHitInMultilplay() " + nbr);
		let winPNbr = getOtherPlayer(nbr);
		const otherPlayer = plu.players[winPNbr].name;
		let buf = "The answer is indicated by the black UP=Arrow. <br>";
		buf += "Player " + plu.players[nbr].name + " did not make a selection in time.<br> and the point award goes to " + otherPlayer + ".";
		const postedPts = cp.itf.getPointsForThisRound();
		cp.itf.displayResultsTypeD(winPNbr, postedPts, buf);
		postNoticeCenterDisplay("24," + plu.players[winPNbr].color + "," + buf);
	}



	showPregameNotice() {
		if (singlePlayerMode) {
			this.singlePlayerPregameNotice()
			return;
		}
		const theTime = bidButs.getTimeForGameLND();
		console.log("GameD.showPregameNotice() top ");
		const buf = `<div class="tsd-pregame"><div class="tsd-pregame-head"><div class="tsd-pregame-title">Pre-Game Notice</div></div><div class="tsd-pregame-rules"><div class="tsd-pregame-rules-inner"><font size="5">
     <p>The next Game requires each player to select a date by first selecting a year and then a month and day.  
     <p><b>The player closest to the correct date wins.</b></p></p>
     <font size="4"><p>The point award is a function of how much closer the winner is than the looser.</p></font>
     <b>IMPORTANT:</b> Players need to decide if the second player is allowed to view the first player's placement or not.
     If not, the second player must turn away while the first player makes the selection.</font></div></div><div class="tsd-pregame-foot"><button type="button" class="tsd-pregame-start" onclick="startGameD()"><i class="tsd-pregame-play" aria-hidden="true"></i><span>Start Round</span></button></div></div>`

		gamePlayArea.innerHTML = buf;
		console.log("GameD.showPregameNotice() bottom ");
	}

	singlePlayerPregameNotice() {
		const theTime = bidButs.getTimeForGameLND();
		console.log("GameD.showPregameNotice() top ");
		const buf = `<div class="tsd-pregame"><div class="tsd-pregame-head"><div class="tsd-pregame-title">Pre-Game Notice</div></div><div class="tsd-pregame-rules"><div class="tsd-pregame-rules-inner"><font size="5">
     <p>The next Game requires you to select a date by first selecting a year and then a month and day.</p>
     <font size="4"><p>The point award is a function of how close you get to the correct date.</p></font></div></div><div class="tsd-pregame-foot"><button type="button" class="tsd-pregame-start" onclick="startGameD()"><i class="tsd-pregame-play" aria-hidden="true"></i><span>Start Round</span></button></div></div>`

		gamePlayArea.innerHTML = buf;
		console.log("GameD.showPregameNotice() bottom ");

	}


	getTiePoints() {
		console.log("getOnePlayerResults  " + this.pAnsX[0]);
		const dif = Math.abs(this.theAnswer - this.pAnsX[0]);
		console.log("dif=  " + dif);
		console.log("this.hiNbr=  " + this.hiNbr + 1000);
		console.log("this.loNbr  " + this.loNbr + 1000);
		const diff = dif / (this.hiNbr - this.loNbr) / 10;
		console.log("diff=  " + diff);
		let result = 0;
		let playResults = "\nYour were ";
		if (diff > 16) {
			result = 0;
			playResults += "Way OFF";//D.d("   " + );
		} else if (diff > 7.2) {
			result = ((16 - diff) / 16) * .25;
			playResults += "In The Ball Park";
		} else if (diff > 3.4) {
			result = ((10 - diff) / 10) * .5;
			playResults += "In Range";
		}
		else if (diff > 2.01) {
			result = ((6 - diff) / 6) * .75;
			playResults += "Close";
		}
		else if (diff > 1.3) {
			result = (3 - diff) / 2;
			playResults += "Real Close";
		} else {
			result = 1;
			playResults += "Right On";
		}
		console.log("  playResults= " + playResults);
		const points = parseInt(result * 100);
		return points + "," + playResults;
	}




	timesUp(){console.log("&&&&&.timesUp()  isFirstPlay=  " +  this.isFirstPlay);
		if(this.isFirstPlay){
			cp.itf.startSecondPlay();
			this.isFirstPlay = false;
		}else{
			cp.itf.displayPtsThisPlay();
		}
	}


	playerStartTimer(){console.log("GameD playerStartTimer() ");
		if(this.isFirstPlay){
			this.playStarted = true;
			this.showYearSlider();
			//stopThePtFac();
			//const thePts = Number(document.getElementById("ptFac").innerHTML)
			//setUpThePtFac(thePts,0.025);//Starts with the increasing Pt Fac and Now counts down
			//startThePtFac();
		}else{
			//this.setPtFacForSecondPlayer();
		}
	}

	setPtFacForSecondPlayerXX(){console.log("GameD setPtFacForSecondPlayer ");
		setUpThePtFac(2.0,0.05);//
	}


	 startPtFacInc(){console.log("gameD startPtFacInc " + this.isFirstPlay);
		//setUpThePtFac(2.0,-0.05);//this makes it increase
		//startThePtFac();
	 }


	  getDifBtwDates(date1,date2){console.log("  getDifBtwDates " + date1  + "    " + date2);
		  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		  const firstDate = new Date(date1);
		  const secondDate = new Date(date2);
		  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
		  console.log ("diffDays= " + diffDays)
		  return diffDays;

	  }

	createMonthMap(){console.log("$$$$$$$$ createMonthMap " );
		this.monthMap = new Map();
		for (let i = 1;i<13;i++){
			let x = ""
			if(i < 10){
				x = "0"+ i;
			}else{
				x = i;
			}
			console.log( x + "  " +  this.month[i-1]);
			this.monthMap.set(this.month[i-1],x);
		}
	}


	addListener(){//for testing of arrow loacation
		const dateLn = document.getElementById("dateLine");
		dateLn.addEventListener('click', function(event) {
		  gameD.getClick(event.offsetX,event.offsetY);
		});	
	}

	getClick(x,y){
		console.log(x + " ---" + y );

	}

	setTblCaption(text){
		document.getElementById("tblTitle").createCaption().innerHTML = text;

	}


	//Done on mouseUp of sliderYear
	onSelectionOfTheYear(sliderLoc){//console.log("&&&&&&&&&&&onSelectionOfTheYear  " +  sliderLoc)
		this.theYear = displayBoxYear.value;
		this.yearArr.push(this.theYear);//For the arrow
		this.showDayTable();
		this.hideYearSlider();
		const sliderX =   ((sliderLoc - this.loNbr) * 10) ;
			//console.log(" sliderLoc=   " + sliderLoc +  " this.theYear "   +  this.theYear + " sliderX= " +  sliderX  + " this.loNbr=  " + this.loNbr)
		//this.sliderYearLoc.push(sliderX);//This if for the arrows
		this.sliderYearLoc[cp.itf.nowPlaying] = sliderX;//This if for the arrows
	}

	//This starts the change of players 
	 

	resetDisplay(){console.log("resetDisplay  "  );
		this.hideDayTable();
		this.showYearSlider();//
		displayBoxYear.value = "";
		this.sliderYear.selection=this.loNbr;
		this.sliderYear.value = this.loNbr;
		this.displayBoxYear.value=this.loNbr;
	}

	setUpSliders(){console.log("setUpSliders() ")
		this.sliderYear.selection=this.loNbr;
		this.sliderYear.value = this.loNbr;
		this.displayBoxYear.value=this.loNbr;
	}

	setPlayerColors(rl){console.log("setPlayerColors " + rl)
		if(rl == "L"){
		//this.tfPlayerName.value = this.thePlayer.name;
		this.tfPlayerName.style.backgroundColor = "Salmon";
		this.displayBoxYear.style.backgroundColor = "Salmon";
		this.sliderYear.style.backgroundColor = "Salmon";

		}else{
		//this.tfPlayerName.value = this.thePlayer.name;
		this.tfPlayerName.style.backgroundColor = "SkyBlue";
		this.displayBoxYear.style.backgroundColor = "SkyBlue";
		this.sliderYear.style.backgroundColor = "SkyBlue";

		}

	}


	setInitialValues(player){console.log("***************setInitialValues  = " + (this.thePlayer == null));
	
		this.tfPlayerName.value = this.thePlayer.name;
		this.tfPlayerName.style.backgroundColor = this.thePlayer.altColor;
		this.displayBoxYear.style.backgroundColor = this.thePlayer.altColor;
		this.sliderYear.style.backgroundColor = this.thePlayer.altColor;
		this.sliderYear.selection=this.loNbr;
		this.sliderYear.value = this.loNbr;
		this.sliderYear.value = this.loNbr;
		this.displayBoxYear.value=this.loNbr;

		if(this.sliderDay != null){	
			this.sliderDay.value = 0;//player.pNbr
			//this.sliderDay.style.backgroundColor = this.thePlayer.altColor;//		    console.log(" = "  + );
		}
	}
	

	cleanPlayArea() {
		console.log("GameD cleanUpPlayArea  ");//
		super.cleanPlayArea();
		//sliderYear.remove();//"dayTableInsertionPoint"
		//this.sliderDay.remove();
		//this.theDayTable.remove();

		let el = document.getElementById("displayBoxYear");
		if (el != null) el.remove();
		el = document.getElementById("displayTextLow");
		if (el != null) el.remove();
		el = document.getElementById("displayTextMid");
		if (el != null) el.remove();
		el = document.getElementById("displayTextHi");
		if (el != null) el.remove();
		el = document.getElementById("dayTableInsertionPoint");
		if (el != null) el.remove();


		let collection = gamePlayArea.children;
		for (let j = 0; j < collection.length; j++) {
			collection[j].remove();
		}
		const dateLineInsrtPt = document.getElementById("dateLineInsrtPt");
		if (dateLineInsrtPt != undefined) {
			collection = dateLineInsrtPt.children;
			for (let j = 0; j < collection.length; j++) {//   
				collection[j].remove();
			}
		}

		el = document.getElementById("nbrLine");
		if (el != null) el.remove();

		el = document.getElementById("tblTitle");
		if (el != null) el.remove();

		el = document.getElementById("blackDownArrow");
		if (el != null) el.remove();
		el = document.getElementById("redArrow");
		if (el != null) el.remove();
		el = document.getElementById("blueArrow");
		if (el != null) el.remove();
	}


	placeAnswerArrow(){console.log("placeAnswerArrow= "+ this.theAnswer + " this.loNbr  " +  this.loNbr +  " this.hiNbr=  " + this.hiNbr + "  this.dateLineDoc= " + this.dateLineDoc);
		//const theAnswerdateLineLoc = 50;//dateLineInsrtPt
		const ansYear = Number(this.theAnswer.slice(0,4));
		let xPos =  ((ansYear - this.loNbr) * 10 ) -5;
		if(xPos > 250)xPos-=10;
		////this.dateLine.style.zIndex = "1";
		const blackDownArrowImage = getImageFile("}P.AA.Pi.Th.Sy.To.Ar.BlackDownArrow.AB.png","blackDownArrow","class ='Arrow'");
		console.log("arrowImage = "  + blackDownArrowImage[0]);

		//const blackArrowInsrtPt = document.getElementById("blackArrowInsrtPt");

		const blackArrowInsrtPt = document.getElementById("dateLineInsrtPt");
		//const blackArrowInsrtPt = document.getElementById("gamePlayArea");

		blackArrowInsrtPt.innerHTML= blackArrowInsrtPt.innerHTML + blackDownArrowImage[0] ;


		const blackDownArrow = document.getElementById("blackDownArrow");//  left:50px;


	    console.log("blackDownArrow = "  + blackDownArrow );
		blackDownArrow.style.left=xPos+"px";
		blackDownArrow.style.zIndex = "5";
		//console.log("blackDownArrow = "  + blackDownArrow.loc);
	}

// NNN |*|filePath = ../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/Ar/RedUpArrow/RedUpArrow.AA.jpg' id='redArrow'
//
//DDD  |*|filePath = ../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/Ar/RedUpArrow/RedUpArrow.AA.jpg

	
placeArrows(){console.log("^^^^^^^^^placeArrows()  " + this.sliderYearLoc);//		    console.log(" = "  + );
	

	for (let i = 0;i< 2;i++){//
		const arrowInsrtPt = document.getElementById("arrowInsrtPt" + i );
		//console.log("arrowInsrtPt = "  + arrowInsrtPt);
		const color = plu.players[i].color;
		//Presentation only: the marker is now a local transparent PNG in the
		//theme's player colours. The old ResLibry .jpg had no alpha, so it
		//drew a white box around the arrow on the dark panel.
		const img = [getUpArrowImage(i, color + "Arrow", "upArrow")];
		arrowInsrtPt.innerHTML = arrowInsrtPt.innerHTML + img[0];
		const arrowName = color + "Arrow";
		const theArrow = document.getElementById(arrowName);
		//const xLoc = theArrow.x;
		//const yLoc = theArrow.y
		let loc = parseInt(Number(this.sliderYearLoc[i]) + 3 )//-(i * 32)-17
		console.log(i +  " loc = "  + loc);
		if(loc > 260)loc-=10;
		//this.arrowLoc.push(i + " --  " + arrowName + "  " +     loc);
		theArrow.style.left = loc   +"px";

		console.log(loc + " --  " + arrowName + " *** " +    theArrow.x);

	}
	}

	

	getOnePlayerResultsXX(){		console.log("getOnePlayerResults  " + this.pAnsX[0] );
		const dif = Math.abs(this.theAnswer - this.pAnsX[0]);
		console.log("dif=  " + dif );
		console.log("this.hiNbr=  " + this.hiNbr + 1000);
		console.log("this.loNbr  " + this.loNbr  + 1000);
		const diff = dif/(this.hiNbr - this.loNbr)/10;
		console.log("diff=  " + diff );
		let result =0;
		let playResults = "\nYour were ";
		if (diff > 16) {
		  result = 0;
		  playResults+= "Way OFF";//D.d("   " + );
		}else if (diff > 7.2) {
		  result = ( (16 - diff) / 16) * .25;
		  playResults+= "In The Ball Park";
		}else if (diff > 3.4) {
		  result = ( (10 - diff) / 10) * .5;
		  playResults+= "In Range";
		}
		else if (diff > 2.01) {
		  result = ( (6 - diff) / 6) * .75;
		  playResults+= "Close";
		}
		else if(diff > 1.3) {
		  result = (3 - diff) / 2;
		  playResults+= "Real Close";
		}else  {
		  result = 1;
		  playResults+= "Right On";
		}
		console.log("  playResults= " + playResults);
		const points = parseInt(result * 100);
    return playResults + " and got " + points + " points.";
  }

	//This continues till the player lets up on the mouse ="onchange" = regAns
	addTheDay(theDay){//console.log("addTheDay")

	  const monthDayCount =  [0,31,60,91,121,152,182,213,244,274,305,336,368,400] ;
	  let monthNbr =0;
	  let dayOfMonth = 0;
	  for(let i = 0;i< 13;i++){
		 if(theDay > monthDayCount[i] && theDay < monthDayCount[i+1]){ 
		   dayOfMonth = theDay - monthDayCount[i];
		   const ansXX = 
		   this.displayBoxYear.value = dayOfMonth  + " " + this.month[i] + " " + this.theYear
		   monthNbr = i;
		  }
	  }
	  //let buf = this.theYear;
	  let bufX = this.theYear
	  if(monthNbr < 10){
		  //buf+= "0" + Number(monthNbr + 1);
		  bufX+= "0" + Number(monthNbr + 1);
	  }else{
		  //buf+= monthNbr;
		  bufX+= monthNbr;
	  }
	  if(dayOfMonth < 10){
		  //buf+= "0" + dayOfMonth;//		    console.log(" = "  + );
		  bufX+= "0" + dayOfMonth;
	  }else{
		  //buf+= dayOfMonth;
		  bufX+= dayOfMonth;
	  }
	  this.pAnsX.push(bufX);
	  this.pAns[this.playerNbr] = bufX;


		//console.log("addTheDay bottom this.pAns[this.playerNbr]  " + this.pAns[this.playerNbr] + "   " + this.playerNbr);
	}



	hideYearSlider() {   console.log("hideYearSlider");
		this.sliderYear.style.display = "none"; 
	}

	 removeYearSlider(){   console.log("removeYearSlider");
	   const parent = this.sliderYear.parentNode
	   parent.removeChild(sliderYear); 
	}

	 test(){   console.log("test");
		this.theDayTable.style.display = "block";
	}

	showDayTable() {   console.log("$$showDayTable      " +  this.theDayTableIsInserted  );
		if(!this.theDayTableIsInserted){
			this.insertDayTable();
			this.theDayTableIsInserted = true;
			this.theDayTable = document.getElementById("theDayTable");
		}
		this.sliderDay.value = 0;//player.pNbr
		//this.sliderDay.style.backgroundColor = this.thePlayer.altColor;
		this.theDayTable.style.display = "block";

	}

	 hideDayTable(){   console.log("hideDayTable  " );
		 if(this.theDayTable != null) {
			 this.theDayTable.style.display = "none"; 
		 }
	}

	 removeDaySlider(){   console.log("removeDaySlider");
		 this.theDaySlider.parentNode.removeChild(theDaySlider);
	}
 
	 removeYearSliderAndsetUpDaySliderX(){ 
		  const theParent = this.theSliderYear.getParent
		  this.theDayTable.style.display = "block";
		  const parent = document.getElementById("theDayTable");
		  this.sliderYearDiv.parentNode.removeChild(sliderDay);
		  this.showDayTable(); 
	}

	displayTheYear(theYear){
	   this.displayBoxYear.value= theYear ;//  "displayBoxYear" "displayTextLow" "displayTextMid" "displayTextHi"
	}

insertLayout(){
	let theNbrLine = "";  //buf+= "<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";
	if(onNet){
		theNbrLine = '<img src="https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/NbrLine-1/NbrLine-1.PA.gif" id="nbrLine" width="503" height="21" alt="" title="nbrLine" />'
	}else{
		if(onLapTop){
			theNbrLine = '<img src="ResLibry/Pi/Th/Sy/Ta/NbrLine-1/NbrLine-1.PA.gif" id="nbrLine" width="503" height="21" alt="" title="nbrLine" />'				   					
		}else{
		   //theNbrLine = '<img src="../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/NbrLine-1/NbrLine-1.PA.gif" id="nbrLine" width="503" height="21" alt="" title="nbrLine" />'				   					
		   theNbrLine = '<div width="500px" ><img src="../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/NbrLine-1/NbrLine-1.PA.gif" id="nbrLine" width="503" height="21" alt="" title="nbrLine" /></div>'
		}
	}

	const HTMLlayout =`
	<table  width="500px"  id="tblTitle"  >
	<caption style="font-weight: bold" style.align="center" style.font-Size="x-large"> SELECT THE YEAR</caption>
	<tr><td><input type="text" name="display" id="displayBoxYear" value="0"></td></tr>
	<tr width="500px">
	
	<table  >
	<td class="gameDCell"><div id="displayTextLow"> </div></td>
	<td class="gameDCell"><div id="displayTextMid"> </div></td>
	<td class="gameDCell"><div id="displayTextHi"> </div></td>
	 </table>      
	<tr><td><div  id="dateLineInsrtPt">   </div></td></tr>

           <!-- <tr><td><div  id='blackArrowInsrtPt'> </div></td></tr> -->
	 
	<tr><td><div  id='arrowInsrtPt0'>     </div></td></tr>
	<tr><td><div  id='arrowInsrtPt1'>     </div></td></tr>

	</tr>
	<tr>                                                           
 <tr>
   <td>
	  <div  height="24px">
		<div id="sliderDiv" width="500px" >${theNbrLine}

		<td width="500px" ><input type="range" class="sliderYear" id="sliderYear" onchange="gameD.onSelectionOfTheYear(this.value)" oninput="gameD.setYearDisplay(this.value)" width="500px" height="40px" name="theSliderYear" height="24px" /> </td>
		</div>
	  </div>
  </td>
</tr> 
	 
<!--   <tr></tr>        value="1950" min="1950" max="2000" -->
	</table>
		
	 <div id="dayTableInsertionPoint"> </div>
	 <div id="theDayTable"  div>
	</div>
	  </body>
	</html>`

	/*
	<td class="gameDCell"><input type="text" value="1"  class="nbrDisplay" id="displayTextLow" style.height = '100px'> </td>
	<td class="gameDCell"><input type="text" value="50" class="nbrDisplay" id="displayTextMid" > </td>
	<td class="gameDCell"><input type="text" value="100"class="nbrDisplay" id="displayTextHi"  > </td> 

	*/
	
		
	gamePlayArea.innerHTML = gamePlayArea.innerHTML + HTMLlayout
		//console.log("HTMLlayout= " + HTMLlayout);
		this.dateLineDoc = document.getElementById("dateLineInsrtPt");
		console.log("this.dateLineDoc= " + this.dateLineDoc);

	}

	insertDayTable(){
		let theDateLine= "";
		if(onNet){
			theDateLine = '<img src="https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/DateLine-1/DateLine-1.KA.jpg" width="500" id="dateLine" height="21" alt="" title="dateYearLine" />'
		}else{
			if(onLapTop){
				theDateLine = '<img src="ResLibry/Pi/Th/Sy/Ta/DateLine-1/DateLine-1.KA.jpg" width="400" id="dateLine" height="21" alt="" title="dateLine" />'				   					
			}else{
			    theDateLine = '<img src="../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/Ta/DateLine-1/DateLine-1.KA.jpg" width="400" id="dateLine" height="21" alt="" title="dateDayLine" />'				   					
			}
		}

		const path = getFilePathToEdugamesFolder();

		const theDayTableHTML = `
		<table  width="500px" id="theDayTable" border="0"  width="100%"><caption>SELECT THE DAY</caption>
		  <tr><!-- Row 1 -->
			 <td width="67px">    </td>
			 <td>${theDateLine}</td>
		<td width="60px">   </td>
		  </tr>
		  <tr><!-- Row 2 -->
			 <td>    </td><!--  -->
			 <td><input width="384px" padding="67px" type="range" id="sliderDay" oninput="gameD.addTheDay(this.value)" 
			 onchange="gameD.regAns(this.value)" height="24px" value="1"  min="1" max="370" /></td>
		  <td width="60px">   </td>
		  </tr>
		</table>
		<br><br>`	
		this.theDayTable = document.getElementById("dayTableInsertionPoint");//
		this.theDayTable.innerHTML = this.theDayTable.innerHTML + theDayTableHTML;

		this.sliderDay = document.getElementById("sliderDay");
		console.log("********* this.sliderDay "  +  this.sliderDay.max)
	}

	
	insertHiAndLo() {
		console.log("insertHiAndLo " + this.round.parms )//Answer=19690720

		const parmArr = this.round.parms.split("=");
		this.theAnswer = parmArr[1] + "";

		const year = this.theAnswer.substring(0, 4); console.log("year  " + year)
		const monthNbr = Number(this.theAnswer.substring(4, 6)); console.log("monthNbr " + monthNbr)
		const day = this.theAnswer.substring(6, 8); console.log("day " + day)
		console.log("this.month[month-1]" + this.month[1])

		this.displayAnswer = day + " " + this.month[monthNbr -1] + " " + year;
		this.loNbr =  year - parseInt(50 * Math.random());
		this.hiNbr = this.loNbr + 50;
		const midNbr = (this.hiNbr - this.loNbr)/2 + this.loNbr;
		//document.getElementById("displayTextLow").value = this.loNbr; 
		document.getElementById("displayTextLow").innerHTML = this.loNbr;
		document.getElementById("displayTextMid").innerHTML = midNbr;		
		document.getElementById("displayTextHi").innerHTML = this.hiNbr;

		//document.getElementById("displayTextHi").value  = this.hiNbr;
		//document.getElementById("displayTextMid").value = (this.hiNbr - this.loNbr)/2 + this.loNbr;//		    console.log(" = "  + );//  ;
		this.sliderYear.value=this.loNbr
		this.sliderYear.max=  this.hiNbr;
		this.sliderYear.min=  this.loNbr;
	}




}//Bottom of game D