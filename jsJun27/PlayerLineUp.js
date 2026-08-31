// JavaScript source code

class PlayerLineUp{
	constructor(cp) {
		this.cp = cp;
		this.players = [];
		this.color = ["#00008B","#8B0000","purple","green"];//blue= BFC4FF, red =FF7B80 green= A9FFA9 purple = FF00FF
		this.altColor = ["SkyBlue","Salmon","Violet","Lime"];
		this.HTMLColor = ["#00008B","#8B0000","Purple","Green"];//for the HTML
		this.pNbr = 0;
		this.colorMap;
		this.firstPlayerNbr =0;
		this.playerTF0;
		this.playerTF1;
		this.pLtr =[]
		this.pNameL;
		this.pNameR;
		this.pMax = 2;////	           console.log("  "  );  Salmon Orange Magenta Lime SkyBlue		

		this.setScore =[];//remove
		this.goingfirst;
		this.setLog = [];
		this.theQuestionforEachRound = []
		this.setScorePlayer0 = 0;
		this.setScorePlayer1 = 0;
		this.setScorePlayer0FmPlayer1 = 0;
		this.setScorePlayer1FmPlayer0 = 0;
		this.setPointTotal = 0;
		this.rndScorePlayer0 = 0;
		this.rndScorePlayer1 = 0;
		this.attemptThisRound = 0.0;
		this.rndScorePlayer0FmPlayer1 = 0;
		this.rndScorePlayer1FmPlayer0 = 0;
		this.count = 0;
		this.bonusPts = 0.0;
		this.init();
		this.rndScoreFmPlayer = new Array();
		this.rndScoreFmAponent = new Array();
		this.theRndSerNbrForEachRound = new Array();
		this.lastRoundPoints = 0;

		this.cumGamePts = 0;
		this.cumPtsP0 = 0;
		this.cumPtsP1 = 0;
		this.cumPtsP0fmP1 = 0;
		this.cumPtsP1fmP0 = 0;
        this.singlePlayerPointLoss = 0;//In single player mode we want to track the points lost to the computer as a measure of how well the player did. We can use this in future games to set handicaps and to track improvement over time. We also want to track the points won by the player in single player mode for similar reasons. In single player mode we will have two arrays rndScoreFmPlayer and rndScoreFmAponent that will track the points won and lost by the player on each round. We can then use these arrays to calculate the total points won and lost by the player at the end of each set and at the end of the game.

		this.players[0] = new Player("", "#00008B", "SkyBlue", "#00008B", 0);
		this.players[1] = new Player("", "#8B0000", "Salmon", "#8B0000", 1);
		this.cumPts
		//this.cumulitiveSetPoints = 0;
        this.endDataCollected = false;
	}

	init(){//console.log("PlayerLineUp init() "  );//this.parmMap.set(twoParts[0],twoParts[1]);
		this.rndScore = [];
		this.rndFromOtherPlayer = []
		this.roundLog = [];
	}



	logPlay(pNbr, pf, pts,bonusPts,gameLog) {
		console.log("plu.logPlay()  pNbr= " + pNbr + " pf=  " + pf + " pt=  " + pts + " bonusPts=  " + bonusPts);
		this.theQuestionforEachRound.push(theQuestion);
        this.theRndSerNbrForEachRound.push(rndSerNbr);
		this.bonusPts = bonusPts;
		this.attemptThisRound += 1;
		
		console.log("rndSerNbr =  " + rndSerNbr);
		if (pf == "passed") {
			if (pNbr == 0) {
				this.rndScorePlayer0 += pts + bonusPts;
			} else {
				this.rndScorePlayer1 += pts + bonusPts;
			}
		} else {//pf = failed
			if (pNbr == 1) {
				this.rndScorePlayer0 += pts;
				this.rndScorePlayer0FmPlayer1 += pts;
			} else {
				if (singlePlayerMode) {
					this.singlePlayerPointLoss += pts;
					this.rndScorePlayer0 += -(pts + bonusPts);
				} else { 
					this.rndScorePlayer1 += pts;
					this.rndScorePlayer1FmPlayer0 = + pts;
				}
			}
		}

		console.log("logPlay = " + theQuestion + "  " + this.attemptThisRound + "," + this.rndScorePlayer0 + "," + this.rndScorePlayer0FmPlayer1 +
			"," + this.rndScorePlayer1 + "," + this.rndScorePlayer1FmPlayer0);
		this.readOutRndScore();	 
	}



	addRndScoreToSet() {
		console.log("plu.addRndScoreToSet " + setBeingPlayed.setSerNbr + "  " + singlePlayerMode);
		if (setBeingPlayed == undefined) {
			return;
		}
		if (theQuestion == "????" ){
			return;
		}
		
		const p0 = this.rndScorePlayer0;
		const p1 = this.rndScorePlayer1;
		console.log("plu XX =  " +  serNbrOfRndInPlay + "  " + p0  + " " + p1);

		let winner = this.players[0].name;
		if(p0 < p1)winner = this.players[1].name;


		let buf = theQuestion + ";" + settings.maxPoints + ";"

		

		this.cumGamePts += settings.maxPoints;
		this.cumPtsP0 += this.rndScorePlayer0
		this.cumPtsP1 += this.rndScorePlayer1;

		this.cumPtsP0fmP1 += this.rndScorePlayer0FmPlayer1;
		this.cumPtsP1fmP0 += this.rndScorePlayer1FmPlayer0;

		buf += winner + ";"
		buf += this.rndScorePlayer0 + "/"
		buf += this.rndScorePlayer0FmPlayer1 + ";"
		buf += this.rndScorePlayer1 + "/"
		buf += this.rndScorePlayer1FmPlayer0;

		console.log("addRndScoreToSet()  buf=  " + buf);

		this.setLog.push(buf);
		this.zeroRoundScores();
		this.readSetLog();
		//console.log("addRndScoreToSet()  this.setLog =\n" + this.setLog);		

	}

	zeroSetScores() {//console.log("plu.zeroSetScores");
		this.setScore = [];
	} 

	readOutRndScore() {//console.log("plu.readOutRndScore");
		let buf = "Player   Points WON   Points LOST  On this Round. \n";
		buf += "Blue         " + Math.round(this.rndScorePlayer0) + "              " + this.rndScorePlayer0FmPlayer1 + "\n";
		buf += "Red          " + Math.round(this.rndScorePlayer1) + "              " + this.rndScorePlayer1FmPlayer0 + "\n";
		console.log("buf  \n" + buf);

		//this.postPlayDetails();
	}

	displayResultsOfSet() {console.log("plu.displayResultsOfSet()");
		let buf = `ABCD`
	}

	postPlayDetails() {
		console.log("plu.postPlayDetails  = ");
		//return;//temp
		//let buf = "Play Details:\n";
		//const playDetails = cp.theGameInPlay.playDetails;
		//for (let i = 0; i < playDetails.length; i++) {
			//buf += playDetails[i] + "\n";
		//}
        //console.log("plu.postPlayDetails() buf= \n" + buf);

	}


	windUpSet() {
		console.log("plu.windUpSet  = ");
		//plu.displayResultsOfSet();
        this.addRndScoreToSet();//Usually called at the end of each round
		const results = this.getWinner();
		console.log("cp.windUpSet  winner = " +  results );
		//this.readOutRndScore();
		this.getInfo();
		//this.listPlayers();
		this.getStatusLine();
		console.log("plu gameDetails  =\n " + cp.theGameInPlay.playDetails + "\n\n") ;
		this.gatherDataAndGoToGameOver();

	}
	


	gatherDataAndGoToGameOver() {
		console.log("plu gatherDataAndGoTogameOver  " + this.players[0].getSetScore() + "   " + this.players[1].getSetScore());
		if (this.endDataCollected == true) return;//Prevent double logging by hitting Next twice
		let cumGamePts = 0;
		let buf = "The winner of Set SerNbr [" + cp.setSerNbr + "] is "
		const score0 = Math.round(this.players[0].getSetScore());
		const score1 = Math.round(this.players[1].getSetScore());
		let winner = this.players[0].name;
		if (score0 > score1) {
			//results += this.players[1].name + ";";
			buf += this.players[0].name + " with a score of " + score0 + " and the looser is " + this.players[1].name;
			buf += " with a score of " + score1;
		} else if (score0 < score1) {
			winner = this.players[1].name;
			buf += this.players[1].name + " with a score of " + score1 + " and the looser is " + this.players[0].name;
			buf += " with a score of " + score0;
		} else {
			buf += " tied with both scores being " + score0 + " points";//this.cumGamePts
		}

		const cumSetPoints = this.setPointTotal - this.lastRoundPoints;

		let bufSet = "Set totals;";
		bufSet += this.cumGamePts + ";"
		bufSet += winner + ";"
		bufSet += this.cumPtsP0 + ";"
		bufSet += this.cumPtsP0fmP1 + ";"
		if (singlePlayerMode) {
			bufSet += "SinglePlayerMode;"
		}  else{
			bufSet += this.cumPtsP1 + ";"
			bufSet += this.cumPtsP1fmP0
		}
		
		
		this.setLog.push(bufSet)

		this.setLog.unshift(cp.setSerNbr  + ";" +  winner + ";" + score0 + ";" + score1 + ";" + buf);		

		console.log("plu this.setLog=\n " + this.setLog);
        this.endDataCollected = true;
		localStorage.setItem("gameResults", this.setLog);

		/*gPRA1_1863;Peter;191;185;The winner of Set SerNbr [PRA1_1863] is Peter with a score of 191 and the looser is Helen with a score of 185
		,30|0;Peter;94566;12;10|1;Helen;94066;12;10
		,Which cities are not in California;100;Helen;19;0;160;0
		,Pick out the four Arizona cities.;100;Peter;172;25;25;25
		,Set totals;100;Peter;200;191;25;185;25
		*/


		window.location.href = "GameOver.html";
		
	}// https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Ge/No/No/US/Re/US_MidAtlanticA_Color/US_MidAtlanticA_Color.PI.jpg

	

	addToScore(pNbr,n){console.log("plu addToRndScore  "  + pNbr + "   " + n );
		//cp.stop();
		n = Number(n);
		if (singlePlayerMode && pNbr == 1) {
			n = -n;
		}

		this.players[pNbr].addToRndScore(n);
		this.players[pNbr].addToSetScore(n);
		if (pNbr == 0) {
			this.rndScorePlayer0 = n;
		} else {
            this.rndScorePlayer1 = n;
		}


		if(n > 0){
			this.rndScoreFmPlayer[pNbr]+= n ;
		}else{
			this.rndScoreFmAponent[pNbr]+= n;

		}
		this.readSetLog();
	}


	readSetLog() {
		console.log("plu.readSetLog()\n "  + this.setLog.length);
		let buf = "Set Log:\n";
		for (let i = 0; i < this.setLog.length; i++) {
			console.log("log =  " + this.setLog[i] + "\n");
			buf += this.setLog[i] + "\n";
		}
		console.log("plu.readSetLog() buf= \n" + buf);
	}




	setPlayerNames(playerInfo) {
		console.log("SetPlayerNamesXX " + playerInfo + " singlePlayerMode= " + singlePlayerMode);

		const arr = playerInfo.split("|");

		// arr[0] = "30" (bid time)
		// arr[1] = "0;Peter;94566;10;5"
		// arr[2] = "1;Helen;94066;11;5"

		// Start bid timer (legacy compatibility)
		//bidButs.startTimer(Number(arr[0]));
		bidButs.startBidClock(arr[0]);
		// Parse left player
		const leftParts = arr[1].split(";");
		const leftName = leftParts[1];

		// Parse right player
		const rightParts = arr[2].split(";");
		const rightName = rightParts[1];

		// Assign to GameContext players
		this.players[0].name = leftName;
		this.players[1].name = rightName;

		// Update UI
		document.getElementById("player0Name").textContent = leftName;
		document.getElementById("player1Name").textContent = rightName;

		// Log
		this.setLog.push(playerInfo);
	}

	getWhoIsAhead(){
		const n = 0;
		if(this.setPlusScore[0] == this.setPlusScore[1]){
			const r = Random();
			if(r > 0.5 ){
				return 1;
			}else{
				return 0;
			}
		}else{
			if(this.setPlusScore[0] > this.setPlusScore[1]){
				return 0;
			}else{
				return 1;
			}
		}
	}

	clearRndScores(){//console.log("PlayerLineUp clearRndScores()top "  )
		this.players[0].clearRndScore();
		this.players[1].clearRndScore();
		//console.log("PlayerLineUp clearRndScores() bottom "  )
	}

	getWhoIsGoingFirst(){//console.log("PlayerLineUp getWhoIsGoingFirst "  )
		if(this.goingfirst == undefined){
			const n = this.getWhoIsAhead(); 
		}else{
			if (this.goingfirst == 0){
				this.goingfirst = 1;
			}else{
				this.goingfirst = 0
			}
		}
		return this.goingfirst;
	}

	getWinner() {
		return "The winner is:";
	}

	 mapData(startData){//console.log("plu.mapDat()  " +  mapData);
		 let temp = null;
		 let setSerNbr = null;
		 const arr = startData.split("|");
		 [temp,setSerNbr] = arr.shift().split("="); 
        for(let i = 0 ;i < arr.length;i++){
            const x = arr.shift().split("=");
			this.x[0] = x[1];
        }
    }

	getPlayerArr(){//console.log("plu getPlayerArr" );
		return [this.pNameL,this.pNameR];
	}

	createDisplayLine(){
		for(let i = 0 ;i < pCnt;i++){

		}
	}


	evalMutiPlayers(scoreArray,maxPossible){//console.log("PLU.evalMutiPlayers  "   + scoreArray);
		const pCnt = scoreArray.length;
		let max = -1;
		let min = 9999;
		let pNbr =0;
		let score= 0;
		let pHiNbr = 0;
		let pLoNbr = 0;
		let tyeCnt = 0;
		const returnArr=[];
		const playerArr =[];
		let bufPlayerScores = "";
		for(let i = 0 ;i < pCnt;i++){
			//[pNbr,score] = scoreArray[i].split(";")
			score =scoreArray[i];
			playerArr.push(this.players[i].name + ":" + score);
			bufPlayerScores+= this.players[i].name + ":" + score + "\n"
			if(score > max){
				max = score;
				pHiNbr = pNbr;
			}
			if(score < min){
				min = score;
				pLoNbr = pNbr;
			}
		}
		//now to determin a tye
		const tyeArray = [];
		for(let i = 0 ;i < pCnt;i++){
			score = scoreArray[i];
			if(score == max){
            //console.log(score + " S|||M " +  max);
				tyeArray.push(this.players[i].name);//	           console.log("  "  );
				tyeCnt++;
			}
		}
		let buf = ""
		//console.log("tyeCnt  " +tyeCnt );
		if(tyeCnt == 2){
			buf+= "There was a tye between " + tyeArray[0] + " and " + tyeArray[1] +".";
		}else if(tyeCnt == 3){
			buf+= "There was a three way tye between " + tyeArray[0] + " and " + tyeArray[1] + " and " + tyeArray[2]  +".";
		}else if(tyeCnt == 4){
			buf+= "There was a four way tye.";
		}else{
			buf+= "The winner is " + tyeArray[0] + " with " +  max + " correct out of " + maxPossible + ". ";
		}
		if(tyeCnt > 1){
			buf+= "\nEach got " +  max + " right out of " + maxPossible + "."
		}


		returnArr.push(buf);;
		returnArr.push(bufPlayerScores);
		returnArr.push("MaxPossible:" + maxPossible + ",maxRight:" + max + ",minRight:" + min);

		//console.log("max=   " + max + "  min= " +  min + " pHiNbr= " + pHiNbr + "  pLoNbr= " + pLoNbr + " tyeCnt= " + tyeCnt  + " winners=   " + tyeArray);  
		return returnArr;
	}
	getHTMLColor(pNbr){console.log("getHTMLColor= ")
		if(pNbr == null)pNbr = this.pNbr;
		return this.HTMLColor[pNbr];
	}

	setFirstPlayer(n){
		this.pNbr = n;
	}

	setPlayerDisplayXX(n){//console.log(" setPlayerDisplay "  );
		if(n == null)n = this.pNbr;
		this.playerTF.value = this.players[n].name;
		this.playerTF.style.backgroundColor = this.players[n].altColor;
	}

	resetNextPlayers(){
		this.players = [];
		this.pNbr = 0;
		this.pMax = 0;////	           console.log("  "  );
	}
		
	getInfo(){     //console.log("plu.getInfo()  " + this.players.length);
		let buf = "The results So far:/n";
		for(let i = 0 ;i < this.players.length;i++){
			buf += this.players[i].getInfo();
			buf += "\n\n";
		}
		return buf;//        console.log("plu  = " + );
	}

	getPlayerByNbr(nbr){
		this.pNbr = nbr;
		return this.players[nbr];
	}

	//We dont't always start with the first player
	setFirstPlayerNbr(nbr){       //console.log("plu setFirstPlayerNbr = " + nbr);
		this.firstPlayerNbr = nbr;//It could be player 2
		this.pNbr = nbr;
	}

	getNextPlayer(){//console.log("AAplu getNextPlayer= "+  "  this.pNbr=  " + this.pNbr + " this.pMax = " + this.pMax);
		if(this.pMax == 1){
			return this.players[0]
		}else{
			this.pNbr++;
			if(this.pNbr == this.pMax){
				this.pNbr = 0;//We go around the loop
			}
			return this.players[this.pNbr];//		console.log("  " + )
		}
	}
	
	isLastPlayer(){
		//console.log("plu.isLastPlayer pNbr= " + this.pNbr + " pMax= " + this.pMax)
		if(this.pNbr >= this.pMax){
			return true;
		}else{
			return false;
		}
	}

	registerPlayer(dataCSV){//console.log("|-|plu.registerPlayer.  " +  dataCSV)
		const pArr = dataCSV.split(",")
		pArr.push(this.color[this.pMax]);
		pArr.push(this.altColor[this.pMax]);
		pArr.push(this.HTMLColor[this.pMax])
		//console.log("plu.registerPlayer=   " + pArr)
		const aPlayer = new Player(pArr);
		this.players.push(aPlayer);
		if(this.pLtr.length == 0){
			this.pNameL = aPlayer.name;
			this.pLtr.push("L")
		}else{
			this.pNameR = aPlayer.name;
			this.pLtr.push("R")
		}
		this.pMax++;
		//this.setLog.push(this.players[0].name + ";" + this.players[0].speedLev + ";" + this.players[1].name + ";" + this.players[1].speedLev);

		//console.log("********setLog " + this.setLog)
	}

	listPlayers(){//console.log("listPlayers  "  + this.pMax);
		let buf = "List of Players:\n";
		for(let i = 0 ;i < this.pMax;i++){
			buf+= this.players[i].getInfo() + "\n"
		}
         console.log(" " + buf );
	}
		
	changePlayer(){
		this.pNbr++;
		if(this.pNbr >this.pMax)this.pNbr = 0; 
	}

	setPNbr(n){
		this.pNbr = n;
	}

	getPlayerUpName(){
		const player= this.players[this.pNbr].name;
	}

	addToPlayerScore(pNbr, points) {
		console.log("|||addToPlayerScore pNbr=  " + pNbr + " points=  " + points);


		this.players[pNbr].addToScore(Number(points));
	}

	logPlayerScore(pNbr,score){
		this.players[pNbr].logScore(score);
	}

	getPlayerScore(n){
		return this.players[n].score;
	}

	getStatusLine(){
		return;
		const nbrOfPlayers = playerArray.length;
		const buf = `The game being played serNbr is ${this.gameSerNbr}.  There are ${nbrOfPlayers} players with scores as follows:`;
		for(let i = 0 ;i < nbrOfPlayers;i++){
			buf+= playerArray[i].getStatus();//          console.log(" = " + );
		}
		return buf;
	}

	zeroRoundScores() {
		console.log("plu.zeroRndScore() this.setPointTotal= " + this.setPointTotal);
		this.setPointTotal += settings.maxPoints;
		this.setScorePlayer0 += this.rndScorePlayer0;
		this.setScorePlayer1 += this.rndScorePlayer1;
		this.setScorePlayer0FmPlayer1 += this.rndScorePlayer0FmPlayer1;
		this.setScorePlayer1FmPlayer0 += this.rndScorePlayer1FmPlayer0;


		this.rndScorePlayer0 = 0;
		this.rndScorePlayer1 = 0;
		this.attemptThisRound = 0;
		this.rndScorePlayer0FmPlayer1 = 0;
		this.rndScorePlayer1FmPlayer0 = 0;

		this.lastRoundPoints = settings.maxPoints;//For use in GameOver substracting from cumulitive

		console.log("this.setPointTotal " + this.setPointTotal);


	}

	logTheRoundXXXX() {
		console.log("plu.logTheRound() ");
		this.roundLog.push(cp.theQuestion + ";" + this.attemptThisRound + ";" + this.rndScore[0] + ";" + this.rndScore[1] + ";" + this.rndFromOtherPlayer[0] + ";" +
			this.rndFromOtherPlayer[1]);
		this.zeroRoundScores();
		for (let i = 0; i < this.roundLog.length; i++) {
			console.log(i + " this.roundLog=  " + this.roundLog);
		}
	}
	logTheRoundXX(pnbr, score0, score1) {
		console.log("plu.logThePlay() ");
		const theQuestion = cp.setBeingPlayed.getQuestionBeingPlayed();
		console.log("theQuestion =  " + theQuestion);
	}



	logThePlayXX(pNbr, n) {
		console.log("plu.logThePlay() ");
		const theQuestion = cp.setBeingPlayed.getQuestionBeingPlayed();
		console.log("theQuestion =  " + theQuestion);
		this.setLog.push(theQuestion + ";" + pNbr + ";" + Math.round(n));
		for (let i = 0; i < this.setLog.length; i++) {
			console.log("log =  " + this.setLog[i] + "\n");
		}

	}

}
