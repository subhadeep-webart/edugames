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
		this.scale = 0;
		this.units = "";
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
		this.picJustHit = false;
		this.gameOver = false;
		this.lastMapScale = 0;
		this.pickWhoGoesFirst();

		if (singlePlayerMode) {
			this.showSinglePlayerPregameNotice();
		} else {
			this.showPregameNotice();
		}
		console.log("GameL.constructor BOTTOM");
	}



	init() {
		console.log("GameL.init TOP");
		super.init();
		this.getData();
		this.locArr[0] = "0:0";
        this.locArr[1] = "0:0";
		cp.itf.playInProgress = false;
		console.log("GameL.init BOTTOM " + this.gameInPlay);//        console.log("GameL. "  + )
	}

	showSinglePlayerPregameNotice() {
		console.log("GameL.showPregameNotice() top ");
		const theTime = bidButs.getTimeForGameLND()
		const buf = `<div class="tsd-pregame"><div class="tsd-pregame-head"><div class="tsd-pregame-title">Pre-Game Notice</div></div><div class="tsd-pregame-rules"><div class="tsd-pregame-rules-inner"><font size="5">
     <p>The next Game requires you to click on a location on a map or image.</p>
     <font size="4"><p>The point award is a function of how close you get to the correct location.</p></font>
     <b>IMPORTANT:</b>
     <p>You have ${theTime} seconds to complete the play.</p></font></div></div><div class="tsd-pregame-foot"><button type="button" class="tsd-pregame-start" onclick="gameL.startGame()"><i class="tsd-pregame-play" aria-hidden="true"></i><span>Start Round</span></button></div></div>`

		gamePlayArea.innerHTML = buf;
		
		console.log("GameL.showPregameNotice() bottom ");
	}


	showPregameNotice() {
		console.log("GameL.showPregameNotice() top ");
		const theTime = bidButs.getTimeForGameLND()
		const buf = `<div class="tsd-pregame"><div class="tsd-pregame-head"><div class="tsd-pregame-title">Pre-Game Notice</div></div><div class="tsd-pregame-rules"><div class="tsd-pregame-rules-inner"><font size="5">
     <p>The next Game requires each player to click on a location on a map or image.  
     <p><b>The player closest to the correct location wins.</b></p></p>
     <font size="4"><p>The point award is a function of how much closer the winner is than the looser.</p></font>
     <b>IMPORTANT:</b> Players need to decide if the second player is allowed to view the first player's placement or not.
     If not, the second player must turn away while the first player makes the selection.</font></div></div><div class="tsd-pregame-foot"><button type="button" class="tsd-pregame-start" onclick="gameL.startGame()"><i class="tsd-pregame-play" aria-hidden="true"></i><span>Start Round</span></button></div></div>`

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

	picHit(x, y) {console.log("-picHit " + x + " " + y + "  " + cp.itf.nowPlaying);
		if (this.gameOver) {
			return;
		}
		const time = stopGameLNDTimer("GameL picHit");
		// event.offsetX/offsetY arrive in RENDERED pixels. Convert to the
		// map's natural pixels immediately, so the stored play, the answer's
		// Loc and every distance below are all in the same system.
		const mapScale = this.getMapScale();
		x = Math.round(x / mapScale);
		y = Math.round(y / mapScale);
		let firstDot = null;
		
		if (cp.itf.nowPlaying == 1) {
            this.time[1] = time;
			console.log("#picHit red");
			this.redDot.style.display = "block";
			firstDot = this.redDot;
			this.placeToken(this.redDot, x, y, 16);
		} else {
            this.time[0] = time;
			console.log("#picHit blue");
			this.blueDot.style.display = "block";
			firstDot = this.blueDot;
			this.placeToken(this.blueDot, x, y, 16);
		}
		

		console.log("***picHit AA " + x + ":" + y);
		if (singlePlayerMode) {
			this.locArr[0] = x + ":" + y;
			this.map.display = "none"
			//gamePlayArea.style.display = 'none';
			//firstDot.style.display = 'none';
			this.showAllTokens();
			this.checkResults();
			this.gameOver = true;
			this.checkSinglePlayerResults();
			return;
		}
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

	checkSinglePlayerResults(nbr) {
		console.log("GameL.checkSinglePlayerResults() " + this.locArr[0] + "  ansLoc= " + this.ansLocX + ":" + this.ansLocY);
		let buf = "The answer is indicated by the black crosshair.<br> ";
		//let locX = 0;
        //let locY = 0;
		
		console.log( "  this.locArr[0]= " + this.locArr[0])
		const [locX,locY] = this.locArr[0].split(":");

		const distX = Math.abs(locX - this.ansLocX);
		console.log("distX = " + distX + "  " + locX + " - " + this.ansLocX);
		const distY = Math.abs(locY - this.ansLocY);
		console.log("distY = " + distY + "  " + locY + " - " + this.ansLocY);
		const dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

		console.log(" dist = " + dist);
		const realDist = (dist * this.scale).toFixed(0);

		console.log(" realDist = " + realDist);
		console.log(" this.units = " + this.units);

		buf += "You were " + realDist + " " + this.units + " away from the correct location ";

		const avgPicSize = (this.picWidth + this.picHeight) / 2;
		console.log(" avgPicSize = " + avgPicSize);
        const maxPtDistForPts = avgPicSize / 10; //If he gets within 10% of the average pic size he gets points.  If he is further away he gets no points.  This is a linear scale.
//        const ratio = (dist / maxPtDist);
        let ptAwd = 0;
		if (dist < maxPtDistForPts) {
			const ratio = (dist / avgPicSize);//The closer he is the more points he gets.  If he is at the maxPtDistForPts he gets 0 points.  If he is at 0 distance he gets all the points.
            //confirm("ratio = " + ratio + "  dist = " + dist + "  avgPicSize = " + avgPicSize);
            ptAwd = Math.round(cp.itf.getPointsForThisRound() * (1 - ratio));
		} 
        buf += " and was awarded " + ptAwd + " points.";
		console.log(" ptAwd = " + ptAwd);
		this.showAllTokens();
		this.positionBlackCrossHair();
		cp.itf.displayResultsTypeD(0, ptAwd, buf)
		postNoticeCenterDisplay("24," + plu.players[0].color + "," + buf);
		console.log("***buf = " + buf);
		this.setNextRound()
		this.logPlay();
		
	}


	checkResults() {
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

		this.scale = Number(this.map.get("Scale"));
		const loosDist = (this.scale * dist).toFixed(0);
		const theWinDist = (this.scale * winDist).toFixed(0);

		buf += plu.players[winPNbr].name + ", who was " + theWinDist + " " + this.units + " away."
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

	// ---- coordinate systems -------------------------------------------
	// The question data's Loc, and this.picWidth/picHeight, are in the map's
	// NATURAL pixels (from the size code: QJ = 544x320). The rendered map is
	// usually smaller, because the stylesheet fits it to the available band.
	// A click's event.offsetX/offsetY are in those RENDERED pixels.
	//
	// Mixing the two put the answer crosshair off the true location and,
	// because checkResults() measures the distance between a rendered-pixel
	// click and a natural-pixel answer, skewed the awarded points as well.
	//
	// Everything from the click onward is kept in NATURAL pixels: clicks are
	// converted on capture (see picHit), so Loc, this.locArr and every
	// distance share one system. Only drawing converts back the other way.
	getMapScale() {
		const mapEl = document.getElementById("map");
		if (!mapEl || !this.picWidth) return this.lastMapScale || 1;
		// offsetWidth as well as the rect: while the play area is hidden
		// between players both read 0, and falling back to 1 there would
		// place the tokens as if the map were at natural size. Reuse the last
		// good scale instead -- the map is the same size when it reappears.
		const shown = mapEl.getBoundingClientRect().width || mapEl.offsetWidth;
		if (!shown) return this.lastMapScale || 1;
		this.lastMapScale = shown / Number(this.picWidth);
		return this.lastMapScale;
	}

	// natural-pixel point -> rendered-pixel offset. `half` centres the token
	// art on the point: 32 for the 64x64 crosshair, 16 for the 32x32 dots.
	// (The old code subtracted 8, sizing the dots as if they were 16x16,
	// so every dot sat down-and-right of the point it marked.)
	placeToken(el, xNat, yNat, half) {
		const s = this.getMapScale();
		const left = (Number(xNat) * s) - half;
		const top  = (Number(yNat) * s) - half;
		el.style = `left: ${left}px; top:${top}px; z-index:50;`;
	}

	positionBlackCrossHair() {
		console.log("positionBlackCrossHair() ")
		const loc = this.map.get("Loc").toString();
		this.ansLocX = loc.substring(0, 3);
		this.ansLocY = loc.substring(3);
		console.log("ansX " + this.ansLocX)
		console.log("ansy " + this.ansLocY)
		this.placeToken(this.blackCrossHair, this.ansLocX, this.ansLocY, 32);
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
			console.log(i + "parmArr[i] = "  + parmArr[i])
			if(parmArr[i] == undefined)break;
			const temp = parmArr[i].split("=");
			this.map.set(temp[0],temp[1]);
		 }
		console.log("Loc " + this.map.get('Loc'));
		const loc = this.map.get("Loc").toString();
		this.ansLocX = loc.substring(0, 3);
		this.ansLocY = loc.substring(3);
		console.log("ansX= " + this.ansLocX);
		console.log("ansY= " + this.ansLocY);
		this.scale = Number(this.map.get("Scale"));
		this.units = this.map.get("Units");
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
		
		const theMapArr = getImageFile(this.map.get("Map"), "map", "class='gameLOverlay'");

		listItemsInArr(theMapArr, "theMapArr");
		this.picWidth = theMapArr[2];
        this.picHeight = theMapArr[3];
		

		// Append the map ALONE below. `buf` still holds the lead-in images
		// appended a few lines above, so adding the map to `buf` and
		// re-appending the whole string inserted every lead-in image twice.
		console.log("GetData theMapArr= " + theMapArr);
		
		gamePlayArea.innerHTML = gamePlayArea.innerHTML + theMapArr[0];
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

	

}
