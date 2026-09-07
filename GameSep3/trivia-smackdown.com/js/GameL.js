// JavaScript source code
class GameL extends Game{//console.log(" =" + );
	constructor (round,cp,utl){
		console.log("GameL.constructor TOP"  );
		super (round,cp,utl);
		this.utl = utl;
		this.inputArray;
		this.ptInc = 0;
		this.firstHit=true
		this.gameInPlay = "gameL";
		this.gameType = 'L';
		this.map;
		this.scale;
		this.units;
		this.locArr =[2];
		this.playCount = 0;
		this.ansLocX = 0;
		this.ansLocY = 0;
		this.dotBeingDisplayed;
		this.blueDotDoc;
		this.redDotDoc;
		this.blackDotDoc;
		this.playOver = false;
		this.gameLInsrtPtBDoc;
		this.gameLInsrtPtADoc;
		this.playHasBeenChecked = false;
		this.isfirstPlayer = true;

		console.log("GameM.constructor BOTTOM"  );
	}
	init(){
		console.log("GameL.init TOP"  );
		super.init();
		this.getData();
		cp.itf.playInProgress = false;
		cp.itf.setPoints(100);
		cp.itf.setTheNbrOfbuts(1,"L");
	    this.gameTypeDNotice();
		console.log("GameL.init BOTTOM "  +  this.gameInPlay);//        console.log("GameL. "  + )
	}

	helloWorld(){
	console.log("GameL.helloWorld" );//        console.log("GameL. "  + )
		super.helloWorld();
	}

	testA(){//trgNbrL
		const aBut= document.getElementById("timeBox");
		flashAnObject(aBut,20,5);
	}

	cleanPlayArea(){console.log("GameI cleanUpPlayArea  "  );//this.theAnsBar
		super.cleanPlayArea();
		const gamePlayArea= document.getElementById('gamePlayArea');
		let collection = gamePlayArea.children;
		console.log("collection  " + collection );//blueDot redDot
		for(let j = 0;j <collection.length;j++){
			collection[j].remove();
		}
		if(this.gameLInsrtPtADoc != undefined){
			collection = this.gameLInsrtPtADoc.children;
			console.log("collection  " + collection );//blueDot redDot
			for(let j = 0;j <collection.length;j++){
				collection[j].remove();
			}
		}

		if(this.gameLInsrtPtBDoc != undefined){
		collection = this.gameLInsrtPtBDoc.children;
		console.log("collection  " + collection );//blueDot redDot
			for(let j = 0;j <collection.length;j++){
				collection[j].remove();
			}
		}
	}



	picHit(x,y){console.log("**picHit "  + x + " " + y  + " this.playCount = " + this.playCount + " nowPlaying= " + cp.itf.nowPlaying);
		if(cp.itf.playInProgress == false){
			cp.itf.postNotice('You must hit the "Press To Go First" button.')
			return;
		}
       console.log("this.nowPlaying. "  + cp.itf.nowPlaying);
	   //const ptFac = cp.itf.getPtFac();
	   let ptFac = 0;
	   if(this.isfirstPlayer){
		 const ptFac = 25;
		 this.isfirstPlayer = false;
	   }

	   const pNbr = cp.itf.nowPlaying
	   this.locArr[pNbr] =  x + "," + y + "," + ptFac;


	   if(this.playCount > 1){//i.e second play is completed
		   stopTheClock("Game Over");
		   this.checkPlay(this.playCount);
	   }else{
		   let snd = null;
		   //this.playerStartTimer()//
		   if(cp.itf.nowPlaying == 0){
			snd = new Audio("Audio/RedsTurn.wav")
		   }else{
			snd = new Audio("Audio/BluesTurn.wav")
		   }
		   snd.play();
	   }
	   this.tempDot(pNbr,x,y);
	cp.itf.setOtherPlayer();

       console.log("********this.locArr 0    "  + this.locArr[0])
       console.log("********this.locArr 1    "  + this.locArr[1])
	   //cp.itf.goToNextPlayer();
	}

	checkPlay(from){console.log("|||checkPlay this.locArr= " +  this.locArr + "  map.get(Loc)= " + this.map.get("Loc"));//        console.log(" "  + )
        console.log("from -"  + from +"-")
		if(this.playHasBeenChecked){
			return;
		}else{
			this.playHasBeenChecked = true;
		}
		this.playOver = true;
		const loc =  this.map.get("Loc").toString();
		let buf = "The answer is indicated by the black crosshair. The closests player was "
        console.log("loc-"  + loc + "-")
		const result =[];
		this.ansLocX = loc.substring(0,3); 
		this.ansLocY = loc.substring(3);
        console.log("ansX "  + this.ansLocX)
        console.log("ansy "  + this.ansLocY)
		let winDist = 9999;
		let looseDif = 0;
		let winPNbr = "9";
		let winPtFac = 0;
		let dist = 0;
		for (let i = 0;i<this.locArr.length;i++){
			console.log("this.locArr[i]= "  + this.locArr[i])
			const aPlay = this.locArr[i].split(",")

			const x = Number(aPlay[0]);
			console.log("x = "  +  x);
			const y = Number(aPlay[1]);
			console.log("y = "  +  y);
			const ptFac = Number(aPlay[2]);
			const distX = Math.abs(x - this.ansLocX);
			console.log("distX = "  +  distX);
			const distY = Math.abs(y - this.ansLocY);
			console.log("distY = "  + distY );
			dist = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2));
			console.log(i + " dist = "  + dist );
			console.log(i + " winDist = "  + winDist );
			if(dist < winDist){
				winDist = dist;
				winPNbr = i;
				winPtFac = Number(ptFac)
			}
			if(dist > looseDif){
				looseDif = dist;
			}

			result.push(i + ";" + dist.toFixed(0) + ";" + ptFac);
		    console.log(i + "  "+ i + ";" + dist.toFixed(0) + ";" + ptFac);
		}
		const ratio =   winDist/looseDif;
		console.log("ratio= "  + ratio)

		const postedPts = cp.itf.getPointsForThisRound();
		console.log("postedPts= "  + postedPts);
		console.log("winPtFacs= "  + winPtFac);
		const ptAwd = (postedPts * (1-ratio) * winPtFac).toFixed(0);
		console.log("ptAwd= "  + ptAwd);
		const scale = Number(this.map.get("Scale"));

		console.log("scale= "  + scale)
		console.log("dist= "  + dist)

		const loosDist = (scale * dist).toFixed(0);
		console.log("loosDist= "  + loosDist)
		const theWinDist = (scale * winDist).toFixed(0);
		console.log(" theWinDist= "  +  theWinDist)

		buf+= plu.players[winPNbr].name + ", who was " + theWinDist +  " " + this.map.get("Units") + " away."
		buf+= "The colored dots indicate the location of each player."
		this.addDots();
		console.log("buf= "  + buf);
		console.log("winPNbr= "  + winPNbr);
		console.log("ptAwd= "  + ptAwd);
		this.positionDots();
		this.showDots();
		cp.itf.addToQuestion(buf);
		//stopThePtFac();
		cp.itf.awardPoints(winPNbr,ptAwd,buf);
	}





	tempDot(pNbr,x,y){console.log("tempDot " + pNbr + "  " + x + "   " + y)
		const xx = x-8;
		const yy = y-8;
		if(pNbr == 0){
			const blueDot = document.getElementById("blueDot");
			this.dotBeingDisplayed = blueDot;
			blueDot.style=`left: ${xx}px; top:${yy}px; z-index:50;`
		}else{
			const redDot = document.getElementById("redDot");
			this.dotBeingDisplayed = redDot;
			redDot.style=`left: ${xx}px; top:${yy}px; z-index:50;`
		}
		setDotTime();
		runDotClock();
	}

	hideDot(){console.log("hideDot " + this.dotBeingDisplayed)
		if(!this.playOver)this.dotBeingDisplayed.style.display = "none";
	}

	showDots(){
		this.redDotDoc.style.display = "block";
		this.blueDotDoc.style.display = "block";
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

	addDots(){console.log("------addDots " + this.locArr )
		this.gameLInsrtPtBDoc = document.getElementById("gameLInsrtPtB");
		let theBlackDot = "";
		if(onNet){
			theBlackDot = '<img src="../../../edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/LTokenM/LTokenM.BB.gif" id="blackDot" width="64" height="64" />'
		}else{
			if(onLapTop){
				theBlackDot = '<img src="ResLibry/Pi/Th/Sy/To/LTokenM/LTokenM.BB.gif" id="blackDot" width="64" height="64" />'
			}else{
			    theBlackDot = '<img src="../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/LTokenM/LTokenM.BB.gif" id="blackDot" width="64" height="64" />'
			}			
		}
		console.log(" theBlackDot" + theBlackDot)
		this.gameLInsrtPtBDoc.innerHTML = this.gameLInsrtPtBDoc.innerHTML + theBlackDot;
		let buff = "";
		let buf ="";
		for (let i = 0;i < 2; i++){
			//const arr = this.locArr[i].split(",");
			//const xPt = arr[0]
			//const yPt = arr[1]

			if(onNet){
				console.log("  -- onNet --- ")
				buf+= "<img class='gameLDot' src=\"../../../edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/"
			} else {
				if(onLapTop){
				   buf+= "<img class='gameLDot' src=\"ResLibry/Pi/Th/Sy/To/"					
				}else{
				   buf+= "<img class='gameLDot' src=\"../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Sy/To/"					
				}
			}

			const aDot = getImageFile()

			if(i == 1 ){
				buf+= "RedDot/RedDot.AA.jpg\" id='redDot'  />"
				buff+= buf;
				//gameLInsrtPtB.innerHTML = gameLInsrtPtB.innerHTML + buf;
				console.log(i + "  ----- " + buf )
			}else{
				buf+= "BlueDot/BlueDot.AA.jpg\" id='blueDot'  />"
				buff+= buf;
				//gameLInsrtPtB.innerHTML = gameLInsrtPtB.innerHTML + buf;
				console.log(i + "  ----- " + buf )
			}
		}
		this.gameLInsrtPtBDoc.innerHTML = this.gameLInsrtPtBDoc.innerHTML + buff;
				console.log("  --  --- " + buff )

		this.redDotDoc = document.getElementById("redDot");
		this.redDotDoc.style.display = "none";
		this.blueDotDoc = document.getElementById("blueDot");
		this.blueDotDoc.style.display = "none";
		this.blackDotDoc = document.getElementById("blackDot");
		this.blackDotDoc.style.display = "none";
		//this.positionDots();
	}



	positionDots(){console.log("positionDots " + this.locArr )
		this.redDotDoc.style.display = "block";
		this.blueDotDoc.style.display = "block";
		this.blackDotDoc.style.display = "block";

		const gameLInsrtPtB = document.getElementById("gameLInsrtPtB");
		//const blackDot = document.getElementById("blackDot");
		const xxPt = this.ansLocX -32;
		const yyPt = this.ansLocY -32;
		this.blackDotDoc.style=`left: ${xxPt}px; top:${yyPt}px; z-index:50;` 
	
		for (let i = 0;i < 2; i++){
			const locc = this.locArr[i];
			console.log(i + " ||||locc " + locc )
			const arr = locc.split(",");//positionDots 169,96,1.750
			const xPt = arr[0]-8
			const yPt = arr[1]-8
			if(i == 1 ){
				//const redDot = document.getElementById("redDot");
				this.redDotDoc.style=`left: ${xPt}px; top:${yPt}px; z-index:50; `
			}else{
				//const blueDot = document.getElementById("blueDot");
				this.blueDotDoc.style=`left: ${xPt}px; top:${yPt}px; z-index:50; `
			}
		}
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
		this.gameLInsrtPtADoc = document.getElementById("gameLInsrtPtA");
		this.gameLInsrtPtADoc.innerHTML= this.gameLInsrtPtADoc.innerHTML + buf;
		buf = ""
		const theMap = getImageFile(this.map.get("Map"),"map");

		buf+= theMap[0];
		console.log("buf= "  + buf);
		this.gameLInsrtPtBDoc = document.getElementById("gameLInsrtPtB");
		this.gameLInsrtPtBDoc.innerHTML= this.gameLInsrtPtBDoc.innerHTML + buf;
		this.addDots();
		const mapDisplay = document.getElementById("map");
		mapDisplay.addEventListener('click', function(event) {
		  gameL.picHit(event.offsetX,event.offsetY);
		});	

	}


	postNoticeXX(){console.log("GameD postNotice ");
		const txt  =`The Point Factor increases until either player presses the 'Press to Go First' button.
		At which time, it will start to decrease. 
		The second player's time starts immediately on completion of the first player's selection decreasing from 
		a Point Factor of 2.0. `
		cp.itf.postNotice(txt);
	}



}
