// JavaScript source code
class GameL extends Game {//console.log(" =" + );
	constructor(round, cp, utl) {
		console.log("GameL.constructor TOP");
		super(round, cp, utl);
		this.utl = utl;
		this.inputArray;
		this.ptInc = 0;
		this.firstHit = true
		this.gameInPlay = "gameL";
		this.gameType = 'L';
		this.map;
		this.scale;
		this.units;
		this.locArr = new Array(2);
		this.playCount = 0;
		this.ansLocX = 0;
		this.ansLocY = 0;
		this.dotBeingDisplayed;
		this.blueDot;
		this.redDot;
		this.blackCrossHair;
		this.playHasBeenChecked = false;
		this.isfirstPlayer = true;
		//this.getData();
		this.picJustHit = false;
		this.gameOver = false;
		//this.getData();
		cp.itf.playInProgress = false;

		if (singlePlayerMode) {
			this.showSinglePlayerNotice();
		} else {
			this.pickWhoGoesFirst();
            this.showPregameNotice();
		}
		console.log("GameL.constructor BOTTOM");
	}



	init() {
		console.log("GameL.init TOP");
		super.init();
		this.getData();
		cp.itf.playInProgress = false;
		console.log("GameL.init BOTTOM " + this.gameInPlay);//        console.log("GameL. "  + )
	}


	showSinglePlayerNotice() {
		console.log("GameL.showSinglePlayerNotice() top ");
		const theTime = bidButs.getTimeForGameLND();
		const buf = `<font size="5"><font size="1"><font size="6"><div style="text-align:center">Pre-Game Notice</div></font></font>
     <p>The next Game requires you to click on a location on a map or image. 
     <font size="4"><p>The point award is a function of how close you get to the correct location.</p></font>
      <div style="text-align:center; font-size:24px;"><input type=button style="text-align:center; font-size:24px;" 
	  onclick="gameL.startGame()" value="Start Round"></div></br></br></br></br>`

		gamePlayArea.innerHTML = buf;
		//console.log("GameL.showPregameNotice() bottom ");
	}


	showPregameNotice() {
		console.log("GameL.showPregameNotice() top ");
		const theTime = bidButs.getTimeForGameLND()
		const buf = `<font size="5"><font size="1"><font size="6"><div style="text-align:center">Pre-Game Notice</div></font></font>
     <p>The next Game requires each player to click on a location on a map or image.  
     <p><b>The player closest to the correct location wins.</b></p></p>
     <font size="4"><p>The point award is a function of how much closer the winner is than the looser.</p></font>
     <b>IMPORTANT:</b> Players need to decide if the second player is allowed to view the first player's placement or not.
     If not, the second player must turn away while the first player makes the selection.
     <p>The Game has selected ${this.nameFirstUp} at random to go first and has ${theTime} seconds to complete the play.</p></font>
      <div style="text-align:center; font-size:24px;"><input type=button style="text-align:center; font-size:24px;" 
	  onclick="gameL.startGame()" value="Start Round"></div></br></br></br></br>`

		gamePlayArea.innerHTML = buf;
		console.log("GameL.showPregameNotice() bottom ");
	}

	nextPlayer() {
		console.log("GameL.nextPlayer() ");
        const bidTime = bidButs.getTimeForGameLND();
        startGameLNDTimer(bidTime);
        super.nextPlayer();
	}

	showAnswers() {
		console.log("GameL showAnswers()");

		this.showAllTokens();
		let buf = "24,white,The answer is indicated by the black crosshair.<br> The players choices are indicated by a red or blue DOT. ";
		postNoticeCenterDisplay(buf);
		this.logPlay();
	}

	testToken() {
		console.log("	testToken()");
		this.blackCrossHair.style.display = "block";
		this.blackCrossHair.style = `left: 150px; top:50px; z-index:50; `;
	}

	checkPlay(reason) {	console.log("GameL.checkPlay() reason  " + reason)//Timed out
		this.picHit(0,0)
	}

	picHit(x, y) {
		console.log("-picHit " + x + " " + y + "  " + cp.itf.nowPlaying + "  " + singlePlayerMode);
		if (this.gameOver) {
			return;
		}
		const time = stopGameLNDTimer("GameL picHit");
		const xy = "left: " + (x - 8) + "px; top:" + (y - 8) + "px; z-index:50;";
		console.log("xy = " + xy);
		let firstDot = null;

		if (singlePlayerMode) {
				this.time[0] = time;
				console.log("#picHit blue");
				this.blueDot.style.display = "block";
				firstDot = this.blueDot;
				this.blueDot.style = xy;
				this.locArr[0] = x + ":" + y;
				this.positionBlackCrossHair();
				this.singlePlayerResults();
				this.gameOver = true;

		} else { 

			if (cp.itf.nowPlaying == 1) {
				this.time[1] = time;
				console.log("#picHit red");
				this.redDot.style.display = "block";
				firstDot = this.redDot;
				this.redDot.style = xy;
			} else {
				this.time[0] = time;
				console.log("#picHit blue");
				this.blueDot.style.display = "block";
				firstDot = this.blueDot;
				this.blueDot.style = xy;
			}
		

			console.log("***picHit AA " + cp.itf.nowPlaying);

			if (this.isfirstPlayer) {
				this.locArr[this.nbrFirstUp] = x + ":" + y;
				this.map.display = "none"
				gamePlayArea.style.display = 'none';
				firstDot.style.display = 'none';
				this.showNextPlayerNotice(this.nameSecondUp);
				this.isfirstPlayer = false;
				cp.itf.changePlayers();
				console.log("***picHit BB " + cp.itf.nowPlaying);
			} else {
				this.locArr[this.nbrSecondUp] = x + ":" + y;
				console.log(this.nbrSecondUp + " this.locArr[0]  " + this.locArr[0])
				console.log(this.nbrSecondUp + " this.locArr[1]  " + this.locArr[1])
				this.positionBlackCrossHair();
				this.showAllTokens();
				this.checkResults();
				this.gameOver = true;
			}

		}
		console.log("-picHit Bottom " +  cp.itf.nowPlaying);

	}



	logPlay() {
		console.log("GameL logPlay()");
		this.playDetails.push(cp.rndSerNbr + "|"  +  this.time[0] + "," + this.locArr[0] + " | " + this.time[1] + "," + this.locArr[1]);				
		logRoundPlay(this.playDetails);
	}

	getPlayDetails() {
		console.log("playDetails= "  + this.playDetails );
		return this.playDetails;
	}


	checkSinglePlayerHit(nbr) {
		console.log("GameL.checkSinglePlayerHit() " + nbr);
		let winPNbr = getOtherPlayer(nbr);
        const otherPlayer = plu.players[winPNbr].name;
		let buf = "The answer is indicated by the black crosshair. <br>";
		buf += "Player " + plu.players[nbr].name + " did not make a selection in time.<br> and the point award goes to " + otherPlayer + ".";
        const postedPts = cp.itf.getPointsForThisRound();
		cp.itf.displayResultsTypeD(winPNbr, postedPts, buf);
		this.showAllTokens();
		postNoticeCenterDisplay("24," + plu.players[winPNbr].color + "," + buf);
	}

    singlePlayerResults() {
        console.log("singlePlayerResults()" + "this.locArr[0] " + this.locArr[0] + "  this.map.get(Loc)= " + this.map.get("Loc") + " w= "+ imageWidth + " h= " + imageHeight);
        const mediam = (imageWidth + imageHeight)/ 2; 			

		const x = Number(this.locArr[0].split(":")[0]);
        const y = Number(this.locArr[0].split(":")[1]);
		console.log("mediam= " + mediam + " x " + this.ansLocX + " y " + this.ansLocY  + " x1 "  + x  + " y1 "  + y);

		const dist = Math.sqrt(Math.pow(this.locArr[0].split(":")[0] - this.ansLocX, 2) + Math.pow(this.locArr[0].split(":")[1] - this.ansLocY, 2));
        console.log("dist= " + dist);
		const ratio = dist/(mediam / 10);
		console.log("ratio= " + ratio);
		const postedPts = cp.itf.getPointsForThisRound();
		const ptAwd = (1 - ratio) * postedPts;
		console.log("ptAwd= " + ptAwd);
		const distAway = (this.map.get("Scale") * dist).toFixed(0);
        if (ptAwd < 0) ptAwd = 0;
		cp.itf.displayResultsTypeD(0, ptAwd)
		let buf = "The answer is indicated by the black crosshair. <br> You were " + distAway + " " + this.map.get('Units') + " away from the correct location and got " + ptAwd.toFixed(0) + " points.";
        postNoticeCenterDisplay("24," + plu.players[0].color + "," + buf);
	}



	checkResults() {
		if (singlePlayerMode) {
			this.singlePlayerResults();
			return;
		}
		console.log("|checkResults  " + this.locArr[0] + "  " + this.locArr[1] + " map.get(Loc)= " + this.map.get("Loc") );//        console.log(" "  + )
		let x = 0;
		let y = 0;
		[x, y] = this.locArr[0].split(":");
		if (x == 0 || y == 0) {
			this.checkSinglePlayerHit(0);
			return;
		}
        [x, y] = this.locArr[1].split(":");
		if (x == 0 || y == 0) {
			this.checkSinglePlayerHit(1);
			return;
		}


		let buf = "The answer is indicated by the black crosshair. <br>The closests player was ";


		const result = [];
		let winDist = 9999;
		let looseDif = 0;
		let winPNbr = "9";
		let winPtFac = 0;
		let dist = 0;
		for (let i = 0; i < 2; i++) {
			console.log(i + "  this.locArr[i]= " + this.locArr[i])
			const aPlay = this.locArr[i].split(":")
			const x = Number(aPlay[0]);
			console.log("x = " + x);
			const y = Number(aPlay[1]);
			console.log("y = " + y);
			const ptFac = Number(aPlay[2]);
			const distX = Math.abs(x - this.ansLocX);
			console.log("distX = " + distX);
			const distY = Math.abs(y - this.ansLocY);
			console.log("distY = " + distY);
			dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
			console.log(i + " dist = " + dist);
			console.log(i + " winDist = " + winDist);
			if (dist < winDist) {
				winDist = dist;
				winPNbr = i;
				winPtFac = Number(ptFac)
			}
			if (dist > looseDif) {
				looseDif = dist;
			}

			result.push(i + ";" + dist.toFixed(0) + ";" + ptFac);
			console.log(i + "  " + i + ";" + dist.toFixed(0) + ";" + ptFac);
		}
		const ratio = winDist / looseDif;
		const timesCloser = 1 / ratio;
		console.log("ratio= " + ratio)

		const postedPts = cp.itf.getPointsForThisRound();

		let ptAwd = postedPts;
		if (timesCloser < 1) {
			ptAwd = timesCloser * postedPts;
		}

		const scale = Number(this.map.get("Scale"));
		const loosDist = (scale * dist).toFixed(0);
		const theWinDist = (scale * winDist).toFixed(0);

		buf += plu.players[winPNbr].name + ", who was " + theWinDist + " " + this.map.get("Units") + " away."
		let looser = 0;
		if (winPNbr == 0) {
			looser = 1
		}
		buf += "</br> which was around " + timesCloser.toFixed(1) + " times closer than ";
		buf += plu.players[looser].name;

		buf += "<br>The colored dots indicate the location of each player."
		//this.addDots();
		console.log("buf= " + buf);
		console.log("winPNbr= " + winPNbr);
		console.log("ptAwd= " + ptAwd);
		//this.positionDots();
		this.showAllTokens();
		cp.itf.displayResultsTypeD(winPNbr, ptAwd, buf)
		postNoticeCenterDisplay("24," + plu.players[winPNbr].color + "," + buf);
		console.log("***buf = " + buf);
		this.setNextRound()
		this.logPlay();
		//cp.itf.addToQuestion(buf);
		//stopThePtFac();

		//cp.itf.awardPoints(winPNbr,ptAwd,buf);
	}


	setBidTime() {console.log("setBidTime() top");
		const bidTime = bidButs.getTimeForGameLND();
		startGameLNDTimer(bidTime);
	}

	startGame() {console.log("startGameL() top");
		gamePlayArea.innerHTML = "";
		this.setBidTime();
		this.init();
		gamePlayArea.style.display = "block";
		insrtPtA.display = "none";

	}
	startPlay() {
		console.log("Game LstartPlay ")
		cp.itf.playInProgress = true;
		gamePlayArea.style.display = "block";
		insrtPtA.display = "none";

	}



	helloWorld(){
	console.log("GameL.helloWorld" );//        console.log("GameL. "  + )
		super.helloWorld();
	}

	positionBlackCrossHair() {
		console.log("positionBlackCrossHair() ")
		const loc = this.map.get("Loc").toString();
		this.ansLocX = loc.substring(0, 3);
		this.ansLocY = loc.substring(3);
		console.log("ansX " + this.ansLocX)
		console.log("ansy " + this.ansLocY)
		const xxPt = this.ansLocX - 32 ;
		const yyPt = this.ansLocY - 32;
		this.blackCrossHair.style = `left: ${xxPt}px; top:${yyPt}px; z-index:50;`;		
	}

	hideDot(){console.log("hideDot " + this.dotBeingDisplayed)
		if(!this.playOver)this.dotBeingDisplayed.style.display = "none";
	}

	showAllTokens(){console.log("GameL showAllTokens() "  )
		this.redDot.style.display = "block";
		this.blueDot.style.display = "block";
		this.blackCrossHair.style.display = "block";
	}

	playerStartTimer(){console.log("GameL playerStartTimer() " + "this.playCoun = " + this.playCount);
		if(this.playCount > 0){
			this.playStarted = true;
			stopThePtFac();
			const thePts = Number(document.getElementById("ptFac").innerHTML)
			setUpThePtFac(thePts,0.025);//Starts with the increasing Pt Fac and Now counts down
			//startThePtFac();
			this.playCount++;
		}else{
			this.playCount++;			
			//setUpThePtFac(2.0,0.05)
		}
	}

	//        console.log("GameL. "  + )//Pi/Th/Sy/To/LTokenM/LTokenM.BB.gif Pi/Th/Sy/To/RedDot/RedDot.AA.jpg" Pi/Th/Sy/To/RedDot/RedDot.AA.jpg  />"
	//"<img src='https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/RedCheckMark/RedCheckMark.BB.jpg'";

	addDots(){console.log("------addDots " )
		//gamePlayArea = document.getElementById("gameLInsrtPtB");
		let theblackCrossHair = "";
		if(onNet){
			//theblackCrossHair = '<img src="../../../edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/LTokenM/LTokenM.BB.gif" id="blackCrossHair" width="64" height="64" />'
			theblackCrossHair = '<img src="https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/LTokenM/LTokenM.BB.gif" id="blackCrossHair" class="token" width="64" height="64" />'
		}else{
			if(onLapTop){
				theblackCrossHair = '<img src="ResLibry/Pi/Th/Sy/To/LTokenM/LTokenM.BB.gif" class="token" id="blackCrossHair" width="64" height="64" />'
			}else{
				theblackCrossHair = '<img src="../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/LTokenM/LTokenM.BB.gif" class="token" id="blackCrossHair" width="64" height="64" />'
			}			
		}
		console.log(" theblackCrossHair" + theblackCrossHair)
		gamePlayArea.innerHTML = gamePlayArea.innerHTML + theblackCrossHair;
		let buff = "";

		for (let i = 0;i < 2; i++){
			let buf ="";

			if(onNet){
				console.log("  -- onNet --- ")
				//buf+= "<img class='gameLDot' src=\"../../../edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/"
				buf += "<img class='gameLDot' class='token' src=\"https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/"

			} else {
				if(onLapTop){
					buf += "<img class='gameLDot' class='token' src=\"ResLibry/Pi/Th/Sy/To/"					
				}else{
				   //buf+= "<img class='gameLDot' src=\"../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/"
					buf += "<img class='gameLDot'class='token' src=\"https://www.edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/"				   
				}
			}
			const aDot = getImageFile()
			if(i == 1 ){
				buf += "RedDot/RedDot.AA.jpg\" class='token' id='redDot'  />"
				buff+= buf;;
				console.log(i + "  --RED--- " + buf )
			}else{
				buf += "BlueDot/BlueDot.AA.jpg\" class='token' id='blueDot'  />"
				buff+= buf;
				//gameLInsrtPtB.innerHTML = gameLInsrtPtB.innerHTML + buf;
				console.log(i + "  --BLUE--- " + buf )
			}
		}

		gamePlayArea.innerHTML = gamePlayArea.innerHTML + buff;
		console.log("  --  --- " + buff )

		this.redDot = document.getElementById("redDot");
		this.redDot.style.display = "none";
		this.blueDot = document.getElementById("blueDot");
		this.blueDot.style.display = "none";
		this.blackCrossHair = document.getElementById("blackCrossHair");
		this.blackCrossHair.style.display = "none";
		console.log("addDots() bottom "  )

		//this.positionDots();
	}


	


	getData(){console.log("****getData "   +  this.gameDataArray )
		console.log("round.parms= "  + this.round.parms);
		const parmArr = this.round.parms.split(" ");
		this.map = new Map()
		for (let i = 0;i< this.round.parms.length;i++){//The map
			console.log("parmArr[i] = "  + parmArr[i])
			if(parmArr[i] == undefined)break;
			const temp = parmArr[i].split("=");
			this.map.set(temp[0],temp[1]);
		 }
		console.log("Loc "  + this.map.get('Loc'));
		console.log("Map "  + this.map.get('Map'));
		console.log("AAthis.gameDataArray.length = "  + this.gameDataArray.length);
		let buf = ""

		if(this.gameDataArray[0] != undefined){
			this.gameDataArray[0] = this.gameDataArray[0].replace("|","");
			console.log("BBthis.gameDataArray[0] = --"  + this.gameDataArray[0] + "--");
			if(this.gameDataArray[0].length > 10){//There is a "|" at the end that come out as another line
				if(this.gameDataArray.length > 0){//there is a image to add to 
					for (let i = 0;i<this.gameDataArray.length;i++){
						console.log(i + "  this.gameDataArray[i]"  + this.gameDataArray[i]);
						const imagePath = getImageFile(this.gameDataArray[i]);
						buf+= imagePath[0];
					}
				}
			}
		}
		gamePlayArea.innerHTML = gamePlayArea.innerHTML + buf;
		
		const theMap = getImageFile(this.map.get("Map"), "map","class='gameLOverlay'");

		buf+= theMap[0];
		console.log("GetData buf= "  + buf);
		
		gamePlayArea.innerHTML = gamePlayArea.innerHTML + buf;
		this.addDots();
		console.log("this.blackCrossHair.checkVisibility= " + this.blackCrossHair.checkVisibility);

		const mapDisplay = document.getElementById("map");
		mapDisplay.addEventListener('click', function(event) {
		  gameL.picHit(event.offsetX,event.offsetY);
		});	
		console.log("GetData bottom " );
	}

	cleanPlayArea() {
		console.log("GameL cleanUpPlayArea  ");//this.theAnsBar
		//super.cleanPlayArea();
		let collection = gamePlayArea.children;
		console.log("collection  " + collection);//blueDot redDot
		for (let j = 0; j < collection.length; j++) {
			console.log(j + " AA collection[j]  " + collection[j]);
			collection[j].remove();
		}
		if (gamePlayArea != undefined) {
			collection = gamePlayArea.children;
			console.log("collection  " + collection);//blueDot redDot
			for (let j = 0; j < collection.length; j++) {
				console.log(j + " bb collection[j]  " + collection[j]);
				collection[j].remove();
			}
		}

		if (gamePlayArea != undefined) {
			collection = gamePlayArea.children;
			console.log("collection  " + collection);//blueDot redDot
			for (let j = 0; j < collection.length; j++) {
				console.log(j + " cc  collection[j]  " + collection[j][0]);
				collection[j].remove();
			}
		}
		

		if (this.redDot != undefined) {
			this.redDot.remove();
		}
		if (this.blueDot != undefined) {
			this.blueDot.remove();
		}
		if (this.blackCrossHair != undefined) {
			this.blackCrossHair.remove();
		}
	}

	picHitXX(x, y) {
		console.log("**picHit " + x + " " + y + "  isfirstPlayer= " + this.isfirstPlayer);
		const loc = this.map.get("Loc").toString();
		console.log("**loc = " + loc)
		let ptFac = 0;
		const pNbr = cp.itf.nowPlaying


		if (this.isfirstPlayer) {
			this.locArr[this.nbrFirstUp] = x + "," + y;
			this.map.display = "none"
			gamePlayArea.style.display = 'none';
			this.showNextPlayerNotice(this.nameSecondUp);

			this.isfirstPlayer = false;
		} else {
			this.locArr[this.nbrSecondUp] = x + "," + y;
			//stopThePlayClock("Game Over");

			console.log(this.nbrSecondUp + " this.locArr[0]  " + this.locArr[0])
			console.log(this.nbrSecondUp + " this.locArr[1]  " + this.locArr[1])

			this.checkPlay(this.playCount);
		}

		this.redDot.style.display = "block";
		this.redDot.style = `left: 100px; top:100px; z-index:50; `;

	}

}
