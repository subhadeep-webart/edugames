// JavaScript source code

class Interface{
constructor (cp){
    this.cp = cp;
    this.thePtFac = 1;
    this.ltr = "X";
    this.seconds = 60;
    this.nowPlaying=0;
    this.secPerNbr = 3;
    this.secPerQuest = 5;
    this.timeFac = 1;  
    this.orgSec = 15;
    this.playerR = ""
    this.playerL = ""
    this.theOtherSide = 1;
    this.resultBox;
    this.instBox;
    this.playerColorArr = ["blue","red"];
    this.playerAltColorArr = ["SkyBlue","Salmon"]
    this.displayLeft = "";
    this.displayRight = "" ;
    this.testXX= 0;
    this.playInProgress = false;
    this.secondPlay = false;
    this.ptsThisPlayDoc;
    this.timeFactor;
    this.winner;
    this.looser;
    this.winColor;
    this.looseColor;
    this.stopClockButton;
    this.pNbr=0;
    this.pChoice = [2];
    this.startingPoints = 100;
    //this.timeBoxDoc;
    this.resultBox;
    this.instBox;
    this.stopClockButton;
    //this.insrtpt0X;
    //this.insrtpt1X;
   //this.insrtPtA;
   // this.insrtPt;
    this.insrtPtMDoc;
    this.nxtButDoc;
    //this.startRoundBut;
    this.startsetBut;
    checkBut;
    this.nowPlayingDoc;
    this.failedPlayCount = 3;
    this.playAreaIsDisplayed = false;
    this.twoPlayerDisplaySet = false;
    //this.docsHaveBeenRegistered = false;
    this.playAreaIsSetUp = false;
    this.ub;
    this.exp;
    this.serNbrDoc;
    this.displayDoc;
    this.pointsThisPlayDoc;
    this.pointsThisPlay = 0;
    this.p0RndPlusScore = 0;
    this.p1RndPlusScore = 0;
    this.p0RndNegScore = 0;
    this.p1RndNegcore = 0;
	this.gameOver = false;
    this.runningPtCount = 100;
    this.bonusPts = 0;
    //this.theQuestion;
    this.playerBid = "";
    centerDisplay;
    this.whoHasBid = "";
    this.maxButs = 0;
    this.LogThePlay = true;//This is get around a problem with testing
    this.counter = 0;
    }

    init(){console.log("itf.init top" );//centerDisplay//id=""
       //this.registerDocs();
        this.exp = new Explain();
     
       
    }

    changePlayers() {
        if (this.nowPlaying == 1) {
            this.nowPlaying = 0;
        } else {
            this.nowPlaying = 1
        }
    }
    
	helloWorld(){console.log("Interface.helloWorld" );		
		
    }

    displayPtsThisPlay(passFail, results,from) {
        console.log("*|*|*displayPts  " + passFail + " nowPlaying= " + this.nowPlaying + " results = " + results + "\n bidButs.topBid = " + bidButs.topBid + " from = " + from);
        if (this.counter++ > 0) {
            //const x = 3 + y;
        }
        postNoticeCenterDisplay("16,white," + results);
        if (cp.theGameInPlay == gameI) {
            this.pointsThisPlay = this.runningPtCount;
        }
        this.bonusPts = Math.round(this.pointsThisPlay * this.timeFactor);
        if (isNaN(this.bonusPts)) this.bonusPts = 0;
        if (cp.itfType == "I") {
            this.pointsThisPlay = this.runningPtCount;
        }
        const totalPts = this.pointsThisPlay + this.bonusPts;
        console.log("totalPts= " + totalPts + "  this.nowPlaying = " + this.nowPlaying + "  passFail=  " + passFail)

        if (passFail == "passed") {
            timeBox.value = "Bonus = " + this.bonusPts.toFixed(0);;//
            this.winner = this.nowPlaying;
            this.awardPoints(this.nowPlaying, totalPts, results);
            ////bidButs.reduceButtons();
            
            if (singlePlayerMode) {
                //alert("displayPtsThisPlay singlePlayerMode  should not get here")
                //this.displaySinglePlayerResultsOfPlay(this.pointsThisPlay);
            }else{
                this.displayResultsOfPlay(this.nowPlaying, this.pointsThisPlay, "p", this.bonusPts);//totalPts includes Bonus
            }
            
            this.looser = this.theOtherSide;
            ////plu.addToScore(this.nowPlaying,totalPts,"p");
            this.playAudioThisPlay(this.nowPlaying, true);
        } else {//failed
            this.failedPlayCount--;
            this.looser = this.pNbr;
            if (singlePlayerMode === true) {
                this.awardPoints(this.nowPlaying, (-this.pointsThisPlay), results);//Note the other side does not get Bomus points
            } else {
                this.awardPoints(this.theOtherSide, this.pointsThisPlay, results);//Note the other side does not get Bomus points
                this.displayResultsOfPlay(this.theOtherSide, this.pointsThisPlay, "f", this.bonusPts);//ptsThisPlay does not include Bonus
                this.playAudioThisPlay(this.nowPlaying, false);
            }
 
        }
        //cp.theGameInPlay.reset(passFail);
        this.updateScoreBoards();
        if (cp.itfType == "B") {
             bidButs.restartBidding();
        }
        if (this.LogThePlay) {
            //const passFail = (passFail == "passed") ? "p" : "f";
            const playDetails = cp.theGameInPlay.getPlayDetails();
            plu.logPlay(this.nowPlaying, passFail, Math.round(this.pointsThisPlay), Math.round(this.bonusPts), playDetails);
        }
    }


    startPlay() {
        console.log("^^^itf.startPlay whoHasBid= " + bidButs.whoHasBid + " bidButs.topBid = " + bidButs.topBid + " this.playInProgress= " + this.playInProgress);

        this.playInProgress = true;
        this.clearRndScores();
        //this.gameOver = false;
        ////cp.theGameInPlay.startPlay();

        if (bidButs.whoHasBid == "Blue") {//This where I convert from Right Left to 0 and 1
            console.log("*************BLUE Has The PLAY")
            postNoticeCenterDisplay("24,Blue,BLUE Has the PLAY with " + bidButs.topBid)
            this.pNbr = 0;//= now PLAYING
            this.theOtherSide = 1;
        } else {
            postNoticeCenterDisplay("24,Red,RED Has the PLAY with " + bidButs.topBid)
            this.pNbr = 1;
            this.theOtherSide = 0;
        }
        this.nowPlaying = this.pNbr;//

        console.log("start play -- pNbr  " + this.pNbr + " targNbr  " + bidButs.topBid + "  itfType = " + cp.itfType);
        switch (cp.itfType) {
            case "B":
                this.gameTypeBStartPlay(bidButs.topBid);
                break;
            case "D":
                cp.theGameInPlay.startPlay();
                break;
            case "I":
                this.gameTypeIStartPlay(bidButs.topBid);
                break;
        }
        console.log("^^^itf.startPlay Bottom")
    }

    gameTypeBStartPlay() {  console.log("^^^gameTypeBStartPlay top pNbr= " + this.pNbr)
        this.pointsThisPlay = bidButs.getPointsForThisPlay(bidButs.topBid);
        console.log("pointsThisPlay= " + this.pointsThisPlay);
        this.playStartVoiceForB(this.pNbr);
       // cp.theGameInPlay.startPlay(bidButs.topBid);
        this.startPlayTimer();
        console.log("pointsThisPlay= " + this.pointsThisPlay);
        console.log("^^^gameTypeBStartPlay bottom pNbr= " + this.pNbr)
    }

    startPlayTimer() { console.log("itf.startPlayTimer   pauseGame " + pauseGame);
        if (pauseGame) {
            return;
        } else { 
            console.log("itf.startPlayTimer   itfType= " + cp.itfType);
            const time = bidButs.getTime(this.pNbr, bidButs.topBid);
            console.log("startPlayTimer time=   " + time);
            setUpTheClock(time);//This goes to script
            startTheClock();//This goes to script
        }
    }
    stopPlayTimer() {
        console.log("stopPlayTimer()" );


    }

   
    setPoints(thePoints ){console.log("itf.setPoints =" + thePoints );
       // this.ptsThisPlayDoc.textContent = thePoints.toFixed(0);
    }

    setGameOverXX(rightAns){console.log("itf.setGameOver  " + rightAns)
		this.gameOver = true;
		this.showAnswer(rightAns);
        this.displayNxtRndBut();
	}

    getPointsForThisRound(){console.log("getPointsForThisRound()" );
        return cp.theRoundInPlay.getPointsForThisRound();
    }

    

    displaySerNbr(serNbr){console.log(" displaySerNbr  " + serNbr)
        this.displayDoc.textContent = serNbr;
	}

    endPlay(){console.log("itf.endPlay ");
       // cp.theGameInPlay.endPlay();
    }



    gameTypeIStartPlay(){console.log("^^^gameTypeIStartPlay " )

    }

    playStartVoiceForB(pNbr){console.log("playStartVoice  bidButs.topBid=  " + bidButs.topBid + "   = " + pNbr)
        let voiceBuf = "Audio/";
        if(pNbr == 0){
            voiceBuf+= "Blue";
        }else{
            voiceBuf+= "Red";
        }
        voiceBuf+= bidButs.topBid + ".wav";
        const voiceResp = new Audio(voiceBuf);
        voiceResp.play();
    }

    playStartVoiceForD(pNbr){console.log("************playStartVoice " + pNbr)
        //this.pNbr = pNbr;
        this.nowPlaying = pNbr;
        if(pNbr == 1){
            this.theOtherSide = 0;
        }else{
            this.theOtherSide = 1;
        }
        let voiceBuf = "Audio/";
        if(pNbr == 0){
            voiceBuf+= "Blue";
        }else{
            voiceBuf+= "Red";
        }
        voiceBuf+= "GoingFirst.wav"
        const voiceResp = new Audio(voiceBuf);
        voiceResp.play();
    }

    

 

    playWinner(pNbr) {
        let buf = "Audio/";
        if (pNbr == 0) {
            buf += "BlueWon.wav";
        } else {
            buf += "RedWon.wav";
        }
        const snd = new Audio(buf);
        snd.play();
    }

  playAudioThisPlay(pNbr,passed){console.log("playAudioThisPlay pNbr= "  + pNbr + "   passed= " + passed)
      let buf = "Audio/";
      if(pNbr ==0){
        buf+="Blue";
      }else{
        buf+="Red";
      }
      if(passed){
        buf+="Wins";
      }else{
        buf+="Fails"
      }
      buf+="Play.wav"
      console.log("buf= " + buf)
      const snd = new Audio(buf);
      snd.play();
  }



  updateScoreBoards(){console.log("updateScoreBoards top "  + singlePlayerMode)
         setTotL.textContent = "Set Total= " + Number(plu.players[0].getSetScore().toFixed(0));
         rndTotL.textContent = Number(plu.players[0].getRndScore().toFixed(0));
        if(singlePlayerMode === false){
            setTotR.textContent = "Set Total = " + Number(plu.players[1].getSetScore().toFixed(0));
            rndTotR.textContent = Number(plu.players[1].getRndScore().toFixed(0));
        }
        /*
      let player0r = Number(plu.players[0].getRndScore());//For future use
      let player0s = Number(plu.players[0].getSetScore());
      let player1r = Number(plu.players[1].getRndScore());
      let player1s = Number(plu.players[1].getSetScore());
      player0r = Number(plu.players[0].getRndScore());
      player0s = Number(plu.players[0].getSetScore());
      player1r = Number(plu.players[1].getRndScore());
      player1s = Number(plu.players[1].getSetScore());
    */
  }

     setTieResults(pts,theRatio){console.log("setTieResults " + pts + "   " + theRatio);
        let buf = "There is a tie and the point award is split.<br>";
        postNotice(buf);
        const thePtAwd = Number(pts)*theRatio;
        plu.addToScore(0, thePtAwd/2);
        plu.addToScore(1, thePtAwd/2);
        this.updateScoreBoards();
    }

    displayResultsTypeD(winner,pts,buff) {console.log("$$ displayResultsTypeD  winner " + winner + "   pts= " + pts + "  buff " + buff)
        this.playInProgress = false;


        plu.addToScore(winner, pts)//plu.players[0].name
        let winLoseBuf = "";
        let buf = "";
        const thePts = Number(pts);
        console.log("thePts " + thePts)
        console.log("thePts + 8 " + (thePts + 8));
        if (winner == "0") {
            winLoseBuf += "<<" + plu.players[0].name + "<<";
            buf += "<" + thePts.toFixed(0) + " Points";
        } else {
            winLoseBuf += ">>" + plu.players[1].name + ">>";
            buf += "" + thePts.toFixed(0) + " Points >";
        }
        //this.nowPlayingDoc.textContent = buf;
        this.updateScoreBoards();
        const txt = "16," + plu.players[winner].altColor + "," + buff;
        console.log("txt = " + txt )
        postNoticeCenterDisplay(txt);//
    }

 
   

    clearRndScores(){//console.log("clearScreBoard() top " );
      //this.rndTotLDoc.textContent = "--";
      //this.rndTotRDoc.textContent = "--";
      plu.clearRndScores();
      //console.log("clearScreBoard() bottom " );
    }

    awardPoints(pNbr,pts,results){console.log("||||itf.awardPoints  pts= " + pts + "   pNbr= " + pNbr);
        const ptAwd = Number(pts);
        ///console.log("||||itf.awardPoints  pts= " + pts + "   pNbr= " + pNbr);
        plu.players[pNbr].addToRndScore(Number(ptAwd));
        plu.players[pNbr].addToSetScore(Number(ptAwd));
        /*
        if (singlePlayerMode === true) {
            const x = 3 + y;
            //alert("awardPoints  singlePlayerMode ")
            //this.displaySinglePlayerResultsOfPlay(pts);
        }else{
            this.displayResultsOfPlay(pNbr,pts,"P");

        }
        */
        //postNoticeCenterDisplay("16," + plu.players[pNbr].color + "," + results);//
    }

    

    displaySinglePlayerResultsOfPlay(pts) {
        console.log("$$** didisplaySinglePlayerResultsOfPlay  " + "   pts= " + pts + " Number(pts)= " + Number(pts + "  " ))
        this.playInProgress = false;
        let buf = ""
        const n = Number(pts);
        if (Number(pts) < 0) {
            buf += "You got at least one wrong and losse " + pts + " points";
        } else {
            console.log("$$**3 " + pts + "  " + Number(pts));
            //const x = 3 + y;
            buf += "You got it right and are awarded " + pts + " points";
            if (this.bonusPts > 0) {
                buf += " plus " + this.bonusPts + " Bonus Point for finishing fast."
            }
        }

        console.log("$$**2 " + pts + "  " + "  " + buf);

        postNoticeCenterDisplay("24," + plu.players[0].color + "," + buf);

        rndTotL.textContent = Number(plu.players[0].getRndScore().toFixed(0));
        setTotL.textContent = Number(plu.players[0].getSetScore().toFixed(0));

        console.log("$$ Number(plu.players[0].getSetScore().toFixed(0) " + Number(plu.players[0].getSetScore().toFixed(0)))

    }

   



    displayResultsOfPlay(player, pts, passfail) {
        console.log("$$ displayResultsOfPlay  player " + player + "   pts= " + pts + "  passfail= " + passfail + " this.bonusPts= " + this.bonusPts)
        this.playInProgress = false;
        let winLoseBuf = ""

        if (passfail == "p") {
            winLoseBuf += "Winner is ";
        } else {
            winLoseBuf += "Sorry! "
            if (player == "0") {
                winLoseBuf += plu.players[1].name;//we swith players
            } else {
                winLoseBuf += plu.players[0].name;
            }
            winLoseBuf += " failed and "
        }
        if (player == "0") {
            winLoseBuf += plu.players[0].name;
        } else {
            winLoseBuf += plu.players[1].name;
        }
        if (passfail == "p") {
            console.log("PPPA" + this.bonusPt)
            winLoseBuf += " & gets " + pts.toFixed(0);
            if (pts == 1) {
                winLoseBuf += " Point."
            } else {
                winLoseBuf += " Points"
            }
            console.log("PPPb " + this.bonusPts)
            if (this.bonusPts > 0) {
                winLoseBuf += " plus ";
                if (this.bonusPt == 1) {
                    winLoseBuf += this.bonusPts + " bonus Point."
                } else {
                    winLoseBuf += this.bonusPts + " bonus Points"
                }

            }

        } else {
            winLoseBuf += " gets " + pts.toFixed(0);
        
            if (pts == 1) {
                winLoseBuf += " Point."
            } else {
                winLoseBuf += " Points"
            }
        }
        //centerDisplay.textContent = winLoseBuf;
        const pNbr = Number(player);
        console.log("player + 5) =" + (pNbr + 5)); 
        console.log("plu.player[0]" + plu.players[0].name);         
        console.log("plu.player[0]" + plu.players[1].name);
        console.log("plu.player[0]" + plu.players[pNbr].color);
        

        
        postNoticeCenterDisplay("24," + plu.players[Number(pNbr)].color + "," + winLoseBuf);//
      }

    displayNxtRndBut(text){console.log("displayNxtRndBut" );
        nextRoundBut.style.display = "block"
        ansBut.style.display = "block"
    }

    countRemainingButs(){console.log("countRemainingButs" );
        const collection = document.getElementsByClassName("but2Player");
        return collection.length;
    }

     enableStartButs(){console.log("itf.enableStartButs" );
         this.startsetBut.disabled = false;   
         startRoundBut.disabled = false;        
    }
    
    testA(){console.log("itf testA " );
        this.countRemainingButs()
    }



    setWL(winner,ratio){console.log("setRL " + winner + "  ratio  ")
        if(winner == 0){
            this.winner = 0
            this.Looser = 1
            this.winColor = "blue"
            this.looseColor = "red"
         }else{
            this.winner = 1
            this.Looser = 0
            this.winColor = "red"
            this.looseColor = "blue"
         }
    }

  loadsetList(){console.log("loadsetList "  );
    const setList = cp.set.getRoundList();
    const theSet =  cp.set;
    if(set != null){
        const rnd = set.getTypeOfNextRnd();
        console.log("rnd " + rnd);
    }

  }

  startClockDType(){console.log("startClockDType "  );
        cp.theGameInPlay.playerStartTimer();
  }

  goToNextPlayer(){console.log("&--itf.goToNextPlayer  " + this.nowPlaying);
      if(this.nowPlaying == 0){
            this.nowPlaying = 1;
      }else{
            this.nowPlaying = 0;
      }
  }
 
  setPlayerUp(nbr){console.log("&&&itf.setPlayerUp  " + nbr);
    //this.nowPlayingDoc = document.getElementById("nowPlaying");
    centerDisplay.textContent = "*NOW PLAYING*"
    if(nbr == 0){
        this.nowPlaying = 0;
        this.theOtherSide =1;
        const aName = plu.players[0].name;
        postNoticeCenterDisplay("24," + plu.players[0].color + "," + aName + ": Select an Answer");
        //this.nowPlayingDoc.textContent = plu.players[0].name;
        //this.nowPlayingDoc.style.background=plu.players[0].altColor;
    }else{
        this.nowPlaying = 1;
        this.theOtherSide= 0;
        const aName = plu.players[1].name;
        postNoticeCenterDisplay("24," + plu.players[1].color + "," + aName + ": Select an Answer");
        //this.nowPlayingDoc.textContent = plu.players[1].name;
        //this.nowPlayingDoc.style.background=plu.players[1].altColor;
      }

   }



    setTimeBonusPts(timeFac) {console.log("setTimeBonusPts timeFac = " + timeFac)
        this.timeFactor = timeFac;
    }

    displayPtsTypeDXX(winner,ptAwd,result){console.log("displayPts " + winner + "  ratio  ")
        if(winner == 0){
            this.winner = 0
            this.Looser = 1
         }else{
            this.winner = 1
            this.Looser = 0
         }
    }

    ptAwdGameI(sideNbr, wl) { console.log("itf.ptAwdGameIy  " + sideNbr)
        if(wl == "L"){
        }else{
            return  Number(this.ptsThisPlayDoc.textContent)/4;
        }
    }

    setRunningPoints(n){console.log("setRunningPoints " + n);
        this.runningPtCount = n;
    }

     reduceThePts(inc){//console.log("itf.reduceThePts " + inc  + " this.runningPtCount=  " + this.runningPtCount);
        this.runningPtCount-= inc;
        postNoticeCenterDisplay("36,white,Points = " + this.runningPtCount.toFixed(0));
        //this.ptsThisPlayDoc.innerHTML = "Points = " + this.runningPtCount.toFixed(0) ;
    }


    testC(){console.log("testC ");
        this.setQuestion("THE CHALLENGE: Place the states in order from north [top] to south.");
    }

    setClockButtonText(txt){console.log("setClockButtonText " +  txt);
     this.stopClockButton.value = txt;
    }

    getPlayerNameXX(pLtr) {
        console.log("itf.getPlayerName " + pLtr);
        return plu.players[pLtr];
    }

    addToQuestion(txt){console.log("itf.addToQuestion ");
        const theOrgTxt = qBox.textContent;
        qBox.textContent = theOrgTxt + "\n" + txt;
    }
    
    setRegFormXX(){console.log("itf.setRegForm ");
        this.insrtFrm();
    }

    setQuestion(theQuestion) {
        if(qBox != undefined)qBox.textContent =  theQuestion ;
    }

    showAnswer(theAns){console.log("showAnswer  "  + theAns)
        let buf = qBox.textContent;
        buf+= "The answer is: " + theAns;
		qBox.textContent = buf;
	}

  setInstructions(txt){console.log("setInstructions " + txt);//not used
    
  }

  timeIsUp(){console.log("timeIsUp " );
    const theFac = Number(document.getElementById("ptFac").innerHTML);
    console.log("theFac " + theFac);

  }

   setPtThisPlayXX(trgNbr){
    const n = (trgNbr * trgNbr) *  this.thePtFac;console.log("setPtThisPlay trgNbr=  " + trgNbr + " ptsThisPlay  " + n);
    this.ptThisPlayDoc.textContent = n.toFixed(0);
   }

    getOtherPlayerName(){
        return plu.players[0].name;
    }
   
   start2PlayerProgramXX(){console.log("itf.start2PlayerProgram  " );
    reg2Players();
    removeInputForm();
	sp.setSelForm();
   }

 
 
  reportPlayResults(rtnArr){console.log("itf reportPlayResults   " + rtnArr)
      const failed =rtnArr[0];
      const text = rtnArr[1];
     }

  insertPlayersInto2PlayerDisplayXX(){console.log("itf.insertPlayersInto2PlayerDisplay   ")    
    this.displayLeft = document.getElementById("player0");
    this.displayRight = document.getElementById("player1");
    this.displayLeft.textContent = plu.players[0].name;//.name
    this.displayRight.textContent = plu.players[1].name;;//.name
  }

  

   explainThisRound(){console.log("Interface.explainThisRound  " + this.cp.setBeingPlayed.getSerNbr());
        let theType = 'X';
        const aSet = this.cp.setBeingPlayed;
        let aRnd = "";
        if(aSet != null){
           aRnd = aSet.getRndBeingPlayed();
        }
        console.log("aRnd= " + aRnd);
        theType = aRnd.charAt(7);
        console.log("theType=  " + theType);
        const txt = this.exp.explain(theType);
	    postNotice(txt);
   }

   setUpPlay(){console.log("itf.setUpPlay ");
        this.ub.setNextRound();
    }

   explainNextRound(){console.log("Interface.explainNextRound  " + this.cp.setBeingPlayed);
        let type = 'X';
        const aSet = this.cp.setBeingPlayed;
        if(aSet != null){
           type = aSet.getTypeOfNextRnd();
        }
        const txt = this.exp.explain(type);
	    postNotice(txt);
   }
 

    isPlayInProgress(){
        return this.playInProgress;
    }

    checkPlayArea(){
        if(!this.playAreaIsDisplayed){
            this.setUpPlayArea();
        }
    }

   postNotice(txt){//console.log("postNotice() txt= " + txt + "  this.docsHaveBeenRegistered = " + this.docsHaveBeenRegistered)
       if (centerDisplay != null) centerDisplay.innerHTML = txt;
   }

 
    addButEvent(){console.log("itf.addButEvent");
       const regForm = document.getElementById("regForm");
       regForm.addEventListener('click', function(event) {
           cp.regPlayers();
       });

    }

    displaySelForm(){console.log("itf.displaySelForm()");

    }
     blankTimeBox(){console.log("blank timeBox=  " )
        timeBox.value = "";
    }

    hideButGrp() {
        console.log("hideButGrp()  ")
        let butGp = document.getElementById("insrtpt0X")
        butGp.style.display = 'none'
        butGp = document.getElementById("insrtpt1X")
        butGp.style.display = 'none'
    }

    showButGrpXX() {
        console.log("showButGrp()  ")
        let butGp = document.getElementById("insrtpt0X")
        butGp.style.display = 'block'
        butGp = document.getElementById("insrtpt1X")
        butGp.style.display = 'block'
    }


    disableAllButtoms() {
        console.log("disableAllButtoms()  " + bidButs.remButs)

        let aBut = document.getElementById("insrtpt0X");
        let el = document.getElementById("butLeft");
        if (el != null) {
            let collection = el.children;
            for (let j = 0; j < collection.length; j++) {
                collection[j].setAttribute("disabled", "disabled");
            }
            el = document.getElementById("butRight");
            if (el != null) {
                collection = el.children;
                for (let j = 0; j < collection.length; j++) {
                    collection[j].setAttribute("disabled", "disabled");
                }
            }
        }
    }

    enableAllButtoms() {
        console.log("enableAllButtoms()  " + bidButs.remButs)
        let el = document.getElementById("butRight");
        if (el != null) {
            let collection = el.children;
            console.log("collection.length=  " + collection.length)
            for (let j = 0; j < collection.length; j++) {
                console.log(j + "  " + collection[j].id + "   " + collection[j])
                collection[j].removeAttribute("butLeft");
            }
            el = document.getElementById("insrtpt1X");
            if (el != null) {
                collection = el.children;
                for (let j = 0; j < collection.length; j++) {
                    collection[j].removeAttribute("disabled");
                }
            }
        }
    }


    removeAllButtons() {
        console.log("removeAllButtons bidButs.remButs=  " + bidButs.remButs)
        let el = document.getElementById("insrtpt0X");
        if (el != null) {
            let collection = el.children;
            //console.log("collection.length=  " + collection.length)
            for (let j = 0; j < collection.length; j++) {
                //console.log(j + "  " + collection[j].id + "   " + collection[j])   
                collection[j].remove();
            }
            el = document.getElementById("insrtpt1X");
            if (el != null) {
                collection = el.children;
                for (let j = 0; j < collection.length; j++) {
                    collection[j].remove();
                }
            }
        }
    }

    resetBidButsXX() {
        console.log("resetBidButs() ");
        let s = "";
        let aBut = ""
        for (let i = 1; i <= bidButs.remButs; i++) {
            s = "bidButL" + i;
            aBut = document.getElementById(s);
            aBut.disabled = false;
            aBut.style.background = "blue";
            s = "bidButR" + i;
            aBut = document.getElementById(s);
            aBut.disabled = false;
            aBut.style.background = "red";
        }
        // clear, not repaint white — css/gamepanel.css styles the notice
        centerDisplay.style.background = "";
        postNotice("");
    }

    reduceButtonsXX(nbr) {
        console.log("reduceButtons by " + nbr + "  remBut = " + bidButs.remButs)
        const newTrgNbr = bidButs.remButs - nbr;
        let el = null;
        const n = bidButs.remButs - 1;
        for (let i = n; i >= newTrgNbr; i--) {//bidBut
            const butL = "bidButL" + (i + 1);

            el = document.getElementById(butL);
            //console.log(" el=  " + el)
            if (el != null) el.parentNode.removeChild(el)
            const butR = "bidButR" + (i + 1);
            el = document.getElementById(butR);
            if (el != null) el.parentNode.removeChild(el)
            const ptTbl = "tbl" + (i + 1);
            el = document.getElementById(ptTbl);
            if (el != null) el.parentNode.removeChild(el)
        }
        bidButs.remButs = newTrgNbr;//The buttons are numbered but 0 = 1
    }

    removeInputForm() {
        console.log("removeInputForm");
        const theChild = document.getElementById("formA");
        const formParent = theChild.parentNode;
        formParent.removeChild(theChild);
    }

    setNowPlaying(arr) {
        console.log("itf setNowPlaying " + arr)//[0,plu.players[0].name,"Blue"]
        centerDisplay.textContent = arr[2] + "is going first!";
        this.nowPlaying = arr[0];
    }


    cleanPlayArea() {
        console.log("itf cleanPlayArea " + this.cp.theGameInPlay + "  " + this.ptsThisPlayDoc)
        //this.setcenterDisplay("NOW PLAYING");
        this.removeAllButtons();
        bidButs.deletePtTbl();
        if (this.cp.theGameInPlay != null) {
            this.cp.theGameInPlay.cleanPlayArea();
        }
        if (this.ptsThisPlayDoc != null) this.ptsThisPlayDoc.textContent = "";
        this.setQuestion("");
        postNoticeCenterDisplay("18,white,---")
        if(cp.theGameInPlay != null){
            console.log("cp.theGameInPlay = " + cp.theGameInPlay )
            cp.theGameInPlay != null;
            console.log("cp.theGameInPlay === " + cp.theGameInPlay )
        }
        //postNotice("");
        this.clearRndScores();

    }

    setcenterDisplay(txt) {
        console.log("itf.setcenterDisplay " + txt);
        centerDisplay.textContent = txt;
    }

    setUpPlayArea() {
        console.log("itf setUpPlayArea   " + this.playAreaIsSetUp);
        if (!this.playAreaIsSetUp) {
            hideCheckBut();
            disableAnsBut();
            disableNextRndBut()
            this.playAreaIsSetUp = true;
            centerDisplay.addEventListener('click', function (event) {
                cp.itf.postNotice("XXX");
            });
        }
    }

    setFailedPlayCount(nbr) {
        console.log("itf setFailedPlayCount" + nbr);
        this.failedPlayCount = nbr;
    }

    changePlayers() {
        console.log("changPlayers from " + this.nowPlaying)
        if (this.nowPlaying == 0) {
            this.nowPlaying = 1;
        } else {
            this.nowPlaying = 0;
        }
        console.log("changPlayers to " + this.nowPlaying)
    }

    setOtherPlayer() {
        console.log("setOtherPlayer  theOtherSide = " + cp.itf.theOtherSide + " this.secondPlay= " + this.secondPlay);
        if (this.secondPlay) {
            cp.theGameInPlay.checkPlay("setOtherPlayer");
        } else {
            console.log(" Not secondPlay  this.nowPlaying=    " + this.nowPlaying)
            if (this.nowPlaying == 0) {
                this.nowPlaying = 1;
            } else {
                this.nowPlaying = 0;
            }
            this.secondPlay = true;
        }
    }

    
 
}
