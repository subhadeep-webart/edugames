// JavaScript source code

class Interface{
constructor (cp){
    this.cp = cp;
    this.thePtFac = 1;
    this.ltr = "X";
    this.seconds = 60;
    this.nowPlaying=0;
    //this.interval = "";
    this.secPerNbr = 3;
    this.secPerQuest = 5;
    this.timeFac = 1;  
    this.orgSec = 15;
    this.playerR = ""
    this.playerL = ""
    this.theOtherSide = 1;
    this.qBox;
    this.resultBox;
    this.instBox;
    this.playerColorArr = ["blue","red"];
    this.playerAltColorArr = ["SkyBlue","Salmon"]
    this.displayLeft = "";
    this.displayRight = "" ;
    this.timeBox = "";
    this.testXX= 0;
    //this.butMax= 0;
    this.remBut=0;
    this.playInProgress = false;
    this.secondPlay = false;
    this.notice;
    this.ptsThisPlayDoc;
    this.timeFactor;
    this.winner;
    this.looser;
    this.winColor;
    this.looseColor;
    this.stopClockButton;
    ///this.ptFacDoc;
    this.pNbr=0;
    this.pChoice = [2];
    this.startingPoints = 100;
    this.timeBoxDoc;
    this.resultBox;
    this.instBox;
    this.displayLeft;
    this.stopClockButton;
    this.insrtpt0X;
    this.insrtpt1X;
    this.insrtPtA;
    this.targNbr =0;
    this.insrtPt;
    this.insrtPtMDoc;
    this.nxtButDoc;
    this.startRoundBut;
    this.startsetBut;
    this.checkButDoc;
    this.nextRoundButDoc
    this.nowPlayingDoc;
    this.failedPlayCount = 3;
    this.playAreaIsDisplayed = false;
    this.twoPlayerDisplaySet = false;
    this.docsHaveBeenRegistered = false;
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
    this.nowPlayWinDoc
    ///this.thePtFacDoc;
	this.gameOver = false;
    this.runningPtCount = 100;
    }

    init(){console.log("itf.init top" );//nowPlayWin//id=""
        this.registerDocs();
        this.exp = new Explain();
        this.enableStartButs();
        ///this.setUpPage();
        this.nowPlayWinDoc = document.getElementById("nowPlayWin");
        
        console.log("itf.init bottom" );
    }
    
	helloWorld(){console.log("Interface.helloWorld" );		
		
	}

    setPoints(thePoints ){console.log("itf.setPoints =" + thePoints );
        this.ptsThisPlayDoc.textContent = thePoints.toFixed(0);
    }

    setGameOver(rightAns){console.log("itf.setGameOver  " + rightAns)
		this.gameOver = true;
		this.showAnswer(rightAns);
        this.displayNxtRndBut();
	}

    getPointsForThisRound(){
        return cp.theRoundInPlay.getPointsForThisRound();

    }


     startPlayTimer(){console.log("startPlayTimer   itfType= " +  cp.itfType);
        let colRow = 1.0;
        if(cp.itfType == "O"){
            colRow = cp.theGameInPlay.rows;
        }else{
            colRow = cp.theGameInPlay.cols;
        }
        console.log("colRow= " +  colRow);
        const time =  settings.getTime(this.pNbr,this.targNbr);
        console.log("startPlayTimer time=   " +  time);
        setUpTheClock(time);//This goes to script
        startTheClock();//This goes to script
    }


    displaySerNbr(serNbr){console.log(" displaySerNbr  " + serNbr)
        this.displayDoc.textContent = serNbr;

	}

    endPlay(){console.log("itf.endPlay ");
       // cp.theGameInPlay.endPlay();
    }

    gameTypeDStartPlayXX(){console.log("^^^gameTypeDStartPlay " )
       cp.theGameInPlay.startPlay();
       const firstPlayer = cp.theGameInPlay.numberThatGoesFirst;
       console.log("firstPlayer " + firstPlayer);
       this.playStartVoiceForD(firstPlayer);
    }

    gameTypeBStartPlay(){console.log("^^^gameTypeBStartPlay pNbr= "  + this.pNbr)
        this.pointsThisPlay  = settings.getPointsForThisPlay(this.targNbr)
        this.playStartVoiceForB(this.pNbr);
        cp.theGameInPlay.startPlay();
    }


    gameTypeIStartPlay(){console.log("^^^gameTypeIStartPlay " )

    }

    playStartVoiceForB(pNbr){console.log("playStartVoice  this.targNbr=  " + this.targNbr + "   = " + pNbr)
        let voiceBuf = "Audio/";
        if(pNbr == 0){
            voiceBuf+= "Blue";
        }else{
            voiceBuf+= "Red";
        }
        voiceBuf+= this.targNbr + ".wav";
        const voiceResp = new Audio(voiceBuf);
        voiceResp.play();
    }

    playStartVoiceForD(pNbr){console.log("playStartVoice " )
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

    startPlay(txt) {console.log("^^^itf.startPlay " + txt + " itfType = " + cp.itfType + " cp.theGameInPlay= " + cp.theGameInPlay);
        if(this.playInProgress){
            console.log(" *************  Play in progress  ");
            return;
        }
        this.postNotice("PLAY STARTED!!")
        cp.theGameInPlay.startPlay();
        this.playInProgress = true;
	    const aLtr = txt.charAt(0);
        if(aLtr == "L"){//This where I convert from Right Left to 0 and 1
            this.pNbr = 0;//= now PLAYING
            this.theOtherSide = 1;
        }else{
            this.pNbr = 1;
            this.theOtherSide = 0;
        }
        this.nowPlaying = this.pNbr;

        this.targNbr = Number(txt.substring(1));
        console.log("start play -- pNbr  " + this.pNbr  + " targNbr  " + this.targNbr + "  itfType = " + cp.itfType );

        switch (cp.itfType){
            case "B":
                this.gameTypeBStartPlay();
            break;
            case "D":
                this.gameTypeDStartPlay();
            break;
           case "I":
                this.gameTypeIStartPlay();
            break;
        }

        ///this.startPlayTimer();
        cp.theGameInPlay.startPlay(this.pNbr);

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


  updateScoreBoards(){console.log("updateScoreBoards top " )
      let player0r = Number( plu.players[0].getRndScore());
      let player0s = Number(plu.players[0].getSetScore());
      let player1r = Number(plu.players[1].getRndScore());
      let player1s = Number(plu.players[1].getSetScore());

     //console.log("updateScoreBoards A"  + "  " + player0r+ "  " +player0s + "  " + player1r+ "  " +player1s )
      this.setTotLDoc.textContent = "Set Total = " + Number(plu.players[0].getSetScore().toFixed(0));
      this.setTotRDoc.textContent = "Set Total = " + Number(plu.players[1].getSetScore().toFixed(0));
      this.rndTotLDoc.textContent = Number(plu.players[0].getRndScore().toFixed(0));
      this.rndTotRDoc.textContent = Number(plu.players[1].getRndScore().toFixed(0));
      player0r = Number(plu.players[0].getRndScore());
      player0s = Number(plu.players[0].getSetScore());
      player1r = Number(plu.players[1].getRndScore());
      player1s = Number(plu.players[1].getSetScore());
     //console.log("updateScoreBoards b "  + "  " + player0r+ "  " +player0s + "  " + player1r+ "  " +player1s )

    }

    gameTypeDNoticeXX(){console.log("Game.audioToStartGameD" );
		const txt  =`The Point Factor increases until either player presses the 'Press to Go First' button.
		At which time, it will start to decrease. 
		The second player's time starts immediately on completion of the first player's selection decreasing from 
		a Point Factor of 2.0. `
		cp.itf.postNotice(txt);
		const snd = new Audio("Audio/BonusIncreasing.wav");
		snd.volume = 0.2;
		snd.play();
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
        this.nowPlayingDoc.textContent = buf;
        this.updateScoreBoards();
        this.postNotice(buff);
    }


    displayPtsThisPlay(passFail,results){console.log("*|*|*displayPts  " + passFail + "   this.nowPlaying= " + this.nowPlaying + "  results = " + results);
        this.postNotice(results)
        console.log("this.timeFactor= " + this.timeFactor)//comes from script stopTheClock
        let bonusPts = this.pointsThisPlay *  this.timeFactor;
        if(isNaN(bonusPts)) bonusPts=0;
        console.log("**** this.nowPlaying= " + this.nowPlaying)//           console.log(" " +)
        const timeBox = document.getElementById("timeBox");
        if(cp.itfType == "I"){
            this.pointsThisPlay = this.runningPtCount;
        }
        console.log("--ptsForThisPlay= " + this.pointsThisPlay);
        console.log("bonusPts= " + bonusPts)        
        const totalPts = this.pointsThisPlay + bonusPts;
        console.log("++pointsThisPlay= " + this.pointsThisPlay);
        console.log("totalPts= " + totalPts +  "  this.nowPlaying = " +  this.nowPlaying + "  passFail=  "  + passFail )

        if(passFail == "passed"){
            timeBox.textContent = "Bonus = " +  bonusPts.toFixed(0);  ;
            this.winner = this.nowPlaying;
            this.awardPoints(this.nowPlaying,totalPts,results);
            this.reduceButtons(this.targNbr);
            this.displayResultsOfPlay(this.nowPlaying,totalPts,"p");//totalPts includes Bonus
            this.looser =this.theOtherSide;
            //plu.addToScore(this.nowPlaying,totalPts);
            console.log(" winner= " + this.winner);
            console.log(" looser= " + this.looser);
            this.playAudioThisPlay(this.nowPlaying,true);
        }else{//failed
            this.failedPlayCount--;
            this.looser = this.pNbr;
            this.awardPoints(this.theOtherSide,this.pointsThisPlay,results);//Note the other side does not get Bomus points
            this.displayResultsOfPlay(this.theOtherSide,this.pointsThisPlay,"f");//ptsThisPlay does not include Bonus
            this.playAudioThisPlay(this.nowPlaying,false);
        }
        cp.theGameInPlay.reset(passFail);
        if(passFail == "passed"){
            const remButs = this.countRemainingButs();
            console.log("remButs = " + remButs);
            if(remButs <= 1){
                this.postNotice(!"On to the next Round");
                this.displayNxtRndBut();
                //this.nextRound();
            }
        }else if(this.failedPlayCount == 0){
            this.postNotice(!"On to the next Round");
            this.displayNxtRndBut();
            //this.nextRound();
        }
       this.updateScoreBoards();
    }

    awardPoints(pNbr,pts,results){console.log("||||itf.awardPoints  pts= " + pts + "   pNbr= " + pNbr);
        const ptAwd = Number(pts);
        plu.players[pNbr].addToRndScore(Number(ptAwd));
        plu.players[pNbr].addToSetScore(Number(ptAwd));
        this.displayResultsOfPlay(pNbr,pts);
        this.updateScoreBoards();
        this.postNotice(results);
    }

    displayResultsOfPlay(player,pts,passfail) { console.log("$$ displayResultsOfPlay  player " + player + "   pts= " + pts + "  passfail= " + passfail)
        this.playInProgress = false;
        let winLoseBuf = ""
        if(passfail == "p"){
            winLoseBuf+=  "The winner is ";
        }else{
            winLoseBuf+=  "Sorry! "
             if(player == "0"){
                winLoseBuf+= plu.players[1].name;//we swith players
            }else{
                winLoseBuf+= plu.players[0].name;
            }           
            winLoseBuf+= " failed and "           
        }
       
        if(player == "0"){
            winLoseBuf+= plu.players[0].name;
        }else{
            winLoseBuf+= plu.players[1].name;
        }

        if(passfail == "p"){
            winLoseBuf+= " and gets " + pts.toFixed(0) ;

        }else{

            winLoseBuf+=  " gets " + pts.toFixed(0) ;       
        }
        if(pts == 1){
            winLoseBuf+= " Point."
        }else{
            winLoseBuf+= " Points"
        }

        this.nowPlayWinDoc.textContent = winLoseBuf;


      }

    displayNxtRndBut(text){console.log("displayNxtRndBut" );
        const theNextBut = document.getElementById("nextround");
        this.nextRoundButDoc.style.display ="block"
    }



    countRemainingButs(){console.log("countRemainingButs" );
        const collection = document.getElementsByClassName("but2Player");
        //console.log(" bbb" +  collection.length);
        return collection.length;
    }


     enableStartButs(){console.log("itf.enableStartButs" );
         this.startsetBut.disabled = false;   
         this.startRoundBut.disabled = false;
         
    }
 
   
    testA(){console.log("itf testA " );
        this.countRemainingButs()
        //this.showTheNextRoundBut();
    }

    showNextRoundBut(){console.log("itf showNextRoundBut "  )
        this.nextRoundButDoc.style.display = "block";
    }

    hideNextRoundBut(){console.log("itf hideNextRoundBut ")
        this.nextRoundButDoc.style.display = "none"; 
    }

    hideCheckBut(){console.log("itf hideTheCheckBut ")
        this.checkButDoc.style.display = "none"; 
    }

    showCheckBut(){console.log("itf showCheckBut "  )
        this.checkButDoc.style.display = "block";
    }

     /*resetTopDisplay(zeroPts){console.log("resetTopDisplay " +  zeroPts)
        this.playInProgress = false;
        if(zeroPts){
            this.ptsThisPlayDoc.textContent = 0;
        }
    }*/


   registerDocs(){console.log("itf.regDisplayPts " )
       this.checkButDoc = document.getElementById("checkBut");
       this.nextRoundButDoc = document.getElementById("nextRoundBut");
       this.timeBox =  document.getElementById("timeBox");//id="setTotR"
       this.qBox = document.getElementById("qBox");
       this.resultBox = document.getElementById("result");
       this.instBox = document.getElementById("instBox");
       ///this.ptFacDoc = document.getElementById("ptFac");
       this.displayLeft = document.getElementById("player0");
       this.displayRight = document.getElementById("player1");
       this.notice = document.getElementById("notice");
       this.stopClockButton = document.getElementById("butStopClock");
       this.ptsThisPlayDoc = document.getElementById("nowPlayWin");// changed from "ptsThisPlay"
       this.nowPlayWinDoc = document.getElementById("nowPlayWin");
       this.leftBottomDoc = document.getElementById("leftBottom");
       this.insrtpt0X = document.getElementById('insrtpt0X');
       this.insrtpt1X = document.getElementById('insrtpt1X');
       this.insrtPtA = document.getElementById("insrtPtA");
       this.insrtPt = document.getElementById('insrtPt');
       this.startRoundBut = document.getElementById('butStartRound');
       this.startsetBut = document.getElementById('butStartSet');
       this.nowPlayingDoc = document.getElementById("nowPlaying");
       this.setTotRDoc = document.getElementById("setTotR");//
       this.setTotLDoc = document.getElementById("setTotL");
       this.rndTotRDoc = document.getElementById("rndTotR");//
       this.rndTotLDoc = document.getElementById("rndTotL")//display  serNbr
       this.serNbrDoc = document.getElementById("serNbr")//
       this.displayDoc = document.getElementById("display")
       this.docsHaveBeenRegistered = true;
       ///console.log("*********************************this.ptsThisPlayDoc " +  this.ptFacDoc);
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
    this.nowPlayWinDoc.textContent = "*NOW PLAYING*"
    if(nbr == 0){
        this.nowPlaying = 0;
        this.theOtherSide =1;
        const aName = plu.players[0].name;
        this.nowPlayingDoc.textContent = plu.players[0].name;
        this.nowPlayingDoc.style.background=plu.players[0].altColor;
    }else{
        this.nowPlaying = 1;
        this.theOtherSide= 0
        this.nowPlayingDoc.textContent = plu.players[1].name;
        this.nowPlayingDoc.style.background=plu.players[1].altColor;
      }


   }



   timesUp(timeFactor){console.log("itf.timesUp() ");
        this.timeFactor = timeFactor;
        this.playInProgress = false;
        cp.theGameInPlay.checkPlay("itf.timesUp");//this comes back with displayPtsThisPlay
   }

    setTimeBonusPts(timeFac){console.log("setTimeBonusPts " + timeFac)
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

    ptAwdGameI(sideNbr,wl){console.log("itf.displayPtsThisPlay  " + sideNbr)
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
        this.ptsThisPlayDoc.innerHTML = "Points = " + this.runningPtCount.toFixed(0) ;
    }

    /*
    getPtFac(){console.log("itf ###getPtFac " +  this.ptFacDoc.innerHTML);//Factor: 1.900
        const ptFac = this.ptFacDoc.innerHTML;
        //console.log("ptFac " + ptFac);
        const tempArr =  ptFac.split(":");
        //console.log(" tempArr[1]" +tempArr[1] );
        const theFac = Number(tempArr[1].trim());
       // console.log(" theFac" + theFac);
        return theFac;
    }*/

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
         const theOrgTxt = this.qBox.textContent;

        this.qBox.textContent = theOrgTxt + "\n" + txt;

    }
 
    
    setRegFormXX(){console.log("itf.setRegForm ");
        this.insrtFrm();
    }

    setQuestion(theQuestion){console.log("setQuestion " + theQuestion );
        if(this.qBox != undefined)this.qBox.textContent = "-" + theQuestion + "-";
    }

    showAnswer(theAns){console.log("showAnswer  "  + theAns)
        let buf = this.qBox.textContent;
        buf+= "The answer is: " + theAns;
		this.qBox.textContent = buf;
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

   /*
  setPtFac(n){console.log("setPtFactor  " + n);
    this.thePtFac = n;
    this.ptFacDoc.textContent = "Point Factor: " +  n.toFixed(1);
   }
   */
    getOtherPlayerName(){
        return plu.players[0].name;

    }
   
   start2PlayerProgramXX(){console.log("itf.start2PlayerProgram  " );
    reg2Players();
    removeInputForm();
	sp.setSelForm();
   }

 setPlayerNamesXX(){console.log("setPlayerNames  " );
   //[this.playerl,this.playerR] = playerArr;
   this.displayLeft = document.getElementById("playerL");  
   this.displayRight = document.getElementById("playerR");    
   this.displayLeft.innerHTML = this.playerL;
   this.displayRight.innerHTML = this.playerR;
   this.playerDisplay = "";
     if(playerLtr == 0) { //playerL
        this.playerDisplay = document.getElementById("playerL");
        //this.playerDisplay.value = plu.pNameL;
        this.playerDisplay.value = plu.players[0].name;
         this.playerDisplay.style.background=playerAltColorArr[0];       
     }else{
        this.playerDisplay = document.getElementById("playerR");
        //this.playerDisplay.value = plu.pNameR;
        this.playerDisplay.value = plu.players[1].name;
        this.playerDisplay.style.background=playerAltColorArr[1];        
     }                                         
  }
 
     reportPlayResults(rtnArr){console.log("itf reportPlayResults   " + rtnArr)
      const failed =rtnArr[0];
      const text = rtnArr[1];
     }

  insertPlayersInto2PlayerDisplay(){console.log("itf.insertPlayersInto2PlayerDisplay   ")    
    this.displayLeft = document.getElementById("player0");
    this.displayRight = document.getElementById("player1");
    this.displayLeft.textContent = plu.players[0].name;//.name
    this.displayRight.textContent = plu.players[1].name;;//.name

    //this.displayLeft.textContent = plu.p0;//.name
    //this.displayRight.textContent = plu.p1;//.name
  }

  setCheckButXX(){console.log("setCheckBut   " )
      this.checkButDoc = document.getElementById('butStopClock');
      this.checkButDoc.value = "CHECK"; 
  }



   postNoticeGameDNLXXX(){console.log("GameD postNotice ");
		const txt  =`The Point Factor increases until either player presses the 'Press to Go First' button.
		At which time, it will start to decrease. 
		<P>The second player's time starts immediately on completion of the first player's selection, decreasing from 
		a Point Factor of 2.0. `
		cp.itf.postNotice(txt);
	}
  /*
	setPtFac(nbrOfButs){
        const maxPts = (nbrOfButs * nbrOfButs); //25 
        this.thePtFac = 100/maxPts;
       console.log("********* this.ptFac = " + this.ptFacDoc + "   " + this.twoPlayerDisplaySet);
        document.getElementById("ptFac").textContent = "Point factor: " + (this.thePtFac).toFixed(2);
    }*/

    setTieResults(){console.log("setTieResults ");

    }

    setTheNbrOfbuts(nbr,type){console.log("itf setTheNbrOfbuts " + nbr + "  type= " + type);
        //const x = this.DoNothing();
        //(gameType,totalButs,pNbr0Speed,pNbr1Speed,rows )
        settings.fillBoxes(type,nbr);
        this.butMax = nbr;
        this.remBut = nbr;
        //this.setPtFac(nbr)
        let width = nbr * 32;
        width = 150;
       const twoRows = (nbr > 5)
       if(twoRows){
         width/= 2 ;     
         console.log(" twoRows")
       }
       const lrArr = ["L","R"];   
       for (let j = 0;j< 2;j++){
         const LorR = lrArr[j]   
         //let buf = "<table border='3' class='itfTbl' width='"+ width +"px'><tr><td>"
         let buf = "<table border='3' class='itfTbl' width='100%'><tr><td>"         
         for (let i = 0;i< nbr;i++){
             buf+= "\n<input type='button' class='but2Player' onclick=\"startPlay('"
            buf+= LorR ;
            buf+= (i+1);
            buf+= "')\"  value="
            if(type == "D" || type == "N" || type == "L"){
                //console.log("***DDDD")
                buf+= "'Press to Go First'"
            }else if(type == "I"){
                buf+= "'Press to Choose an Answer'"
            }else{
                buf+= (i+1);
            }

             buf+= " id='";
             buf+=  "trgNbr" + LorR +  (i+1)+ "' >";
             if(i == 4){
               buf+= "</td></tr><tr><td>"
             }
         }
         buf+=  "</td></tr></table>" 
         console.log("****buf=  " + buf);
         const aPt = "insrtPt" + LorR ;
         let el = null;
         if(j==0){
            el = document.getElementById("insrtpt0X")
         }else{
            el = document.getElementById("insrtpt1X");
         }
         el.innerHTML = el.innerHTML + buf;
       }
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
	    this.postNotice(txt);
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
	    this.postNotice(txt);
   }
   /*
    setUpPage(){console.log("Interface.setUpPage" );
        this.ptFacDoc.textContent = "Point Factor: 1.0"
    }*/

    isPlayInProgress(){
        return this.playInProgress;
    }

    checkPlayArea(){
        if(!this.playAreaIsDisplayed){
            this.setUpPlayArea();
        }
    }

   postNotice(txt){//console.log("postNotice() txt= " + txt + "  this.docsHaveBeenRegistered = " + this.docsHaveBeenRegistered)
      //console.log("this.notice= " + this.notice);
      if(this.notice != null)this.notice.innerHTML = txt;
   }

  insrtFrmXX(){console.log("itf.insrtFrm  "  )
    const theForm = `<div id='formA'> 
    <p>Please complete the below form and press the start button. </p>
    <font size=2 color='#000000' face='Arial'>
    <div><table width='100%' border='1' cellpadding='2' bordercolor='#003366' cellspacing='2' bgcolor='#ccffff'>
    <tr valign='top'>
    <td><input type='text' id='p1' name='' value='Peter'>
    <input type='text' id='z1' name='' cols='12' value='94566'>
    Highest School Grade Completed
    <select id='g1' name='Grade' align='top'>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
      <option value='5'>5</option>
      <option value='6'>6</option>
      <option value='7'>7</option>
      <option value='8'>8</option>
      <option value='9'>9</option>
      <option  selected value='10'>10</option>
      <option value='11'>11</option>
      <option value='12'>12</option>
      <option value='13'>13</option>
      <option value='14'>14</option>
      <option value='14+'>14</option>
    </select>
    <tr valign='top'>
    <td>
    <input type='text'  id='p2' name='' value='Paul'>
    <input type='text' id='z2' name='' value='94066'>
    Highest School Grade Completed
    <select id='g2' name='Grade' align='top'>
        <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
      <option value='5'>5</option>
      <option value='6'>6</option>
      <option value='7'>7</option>
      <option value='8'>8</option>
      <option value='9'>9</option>
      <option value='10'>10</option>
      <option selected  value='11'>11</option>
      <option value='12'>12</option>
      <option value='13'>13</option>
      <option value='14'>14</option>
      <option value='14+'>14</option>
    </select></td>
    <tr>
    <td ><div id='startDiv'>
    <input id='startBut' type='button' onclick='regPlayersAndDisplaySelForm()' id='regForm' value='Start'></div></tr>
    </td>
    </table>
    </div>
    </div>
    </body>
</html>`

   const insrtPt = document.getElementById("regFormInsrtPt");
   insrtPt.innerHTML =  insrtPt.innerHTML + theForm

   //this.addButEvent();

}
    addButEvent(){console.log("itf.addButEvent");
       const regForm = document.getElementById("regForm");
       regForm.addEventListener('click', function(event) {
           cp.regPlayers();
       });
       //this.notice.addEventListener('click', function(event) {
           //this.postNotice("");
       //});
    }



    displaySelForm(){console.log("itf.displaySelForm()");

     }
     blankTimeBox(){console.log("blankTimeBox=  " )
        this.timeBoxDoc.contents = "";

     }

     removeAllButtons(){console.log("removeAllButtons this.remBut=  " + this.remBut )
         let el = document.getElementById("insrtpt0X");
         if(el != null){
             let collection = el.children ;
		     for(let j = 0;j <collection.length;j++){
			    collection[j].remove();
		     }
             el = document.getElementById("insrtpt1X");
             if(el != null){
                 collection = el.children ;
		         for(let j = 0;j <collection.length;j++){
			         collection[j].remove();
		         } 
             }
         }
     }

    reduceButtons(nbr){console.log("reduceButtons by " + nbr + "  remBut = " + this.remBut)
        const newTrgNbr = this.remBut-nbr;
        console.log("newTrgNbr " +  newTrgNbr)
        let el = null;
        //for (let i = newTrgNbr;i <= this.remBut; i++){
        const n = this.remBut -1;
        for (let i = n;i >= newTrgNbr; i--){
            const butL = "trgNbrL" + (i+1);
            //console.log("butL = " +  butL)
            el = document.getElementById(butL);
            if(el != null)el.parentNode.removeChild(el)
            const butR = "trgNbrR" + (i+1);
            el = document.getElementById(butR);
            if(el != null)el.parentNode.removeChild(el)
            const ptTbl = "tbl" + (i+1);
            el = document.getElementById(ptTbl);
            if(el != null)el.parentNode.removeChild(el)
        }
         this.remBut = newTrgNbr;//The buttons are numbered but 0 = 1

        console.log("^^^^^this.remBut " +  this.remBut)
    }

 removeInputForm(){console.log("removeInputForm");
    const theChild =    document.getElementById("formA");
    const formParent = theChild.parentNode;
	  formParent.removeChild(theChild);          
 }

 
 

  cleanPlayArea(){console.log("itf cleanPlayArea "  + this.cp.theGameInPlay  + "  " +  this.ptsThisPlayDoc)
         this.setNowPlayWinDoc("NOW PLAYING");
        this.removeAllButtons();
        if(this.cp.theGameInPlay != null){
            this.cp.theGameInPlay.cleanPlayArea();
        }
        if(this.ptsThisPlayDoc != null)this.ptsThisPlayDoc.textContent = "";
        this.setQuestion("");
        this.postNotice("");
    }

    setNowPlayWinDoc(txt){console.log("itf.setNowPlayWinDoc" + txt);
        this.nowPlayWinDoc.textContent = txt;
    }

    setUpPlayArea(){console.log("itf setUpPlayArea" );
        if(!this.playAreaIsSetUp){
            //this.reg2Players();
            //this.insertPlayersInto2PlayerDisplay()
            this.hideNextRoundBut();
            this.hideCheckBut();
            this.playAreaIsSetUp = true;
           this.notice.addEventListener('click', function(event) {
               cp.itf.postNotice("");
           });
        }
    }

    setFailedPlayCount(nbr){console.log("itf setFailedPlayCount" + nbr);
        this.failedPlayCount = nbr;
    }

    changePlayers(){console.log("changPlayers from " + this.nowPlaying )
        if(this.nowPlaying == 0){
            this.nowPlaying = 1;
        }else{
            this.nowPlaying = 0;
        }        
        console.log("changPlayers to " + this.nowPlaying )
    }

  setOtherPlayer(){console.log("setOtherPlayer  theOtherSide = " + cp.itf.theOtherSide + " this.secondPlay= " + this.secondPlay);
    if(this.secondPlay){
        cp.theGameInPlay.checkPlay("setOtherPlayer");
    }else{
        console.log(" Not secondPlay  this.nowPlaying=    " + this.nowPlaying)
        if(this.nowPlaying == 0){
            this.nowPlaying = 1;
        }else{
            this.nowPlaying = 0;
        }
        this.secondPlay = true;
    }
  }

 

   /*setTheNbrOfbutsXX(nbr,type){console.log("itf setTheNbrOfbuts " + nbr + "  type= " + type);
        this.butMax = nbr;
        this.remBut = nbr;
        this.setPtFac(nbr)
        let width = nbr * 28;
       const twoRows = (nbr > 8)
       if(twoRows){
         width/= 2 ;     
         console.log(" twoRows")
       }
       const lrArr = ["L","R"];
       //const lrArr = [0,1];   
       for (let j = 0;j< 2;j++){
          const LorR = lrArr[j]   
         let buf = "<table border='3' class='itfTbl' width='"+ width +"px'><tr><td>"           
         for (let i = 0;i< nbr;i++){
             buf+= "\n<input type='button' class='but2Player' onclick=\"startPlay('"
            buf+= LorR ;
            buf+= (i+1);
            buf+= "')\"  value="
            if(type == "D" || type == "N" || type == "L"){
                console.log("***DDDD")
                buf+= "'Press to Go First'"
            }else if(type == "I"){
                buf+= "'Press Choose an Answer'"
            }else{
                buf+= (i+1);
            }

             buf+= " id='";
             buf+=  "trgNbr" + LorR +  (i+1)+ "' >";
             if(twoRows && i == (nbr/2)){
               buf+= "</td></tr><tr><td>"
             }
         }
         buf+=  "</td></tr></table>" 
         console.log("&&&&&&&&&&&buf=  " + buf);
         //const aPt = "insrtPt" + LorR ;
         let el = null;
         if(j==0){
            el = document.getElementById("insrtpt0X");
         }else{
            el = document.getElementById("insrtpt1X");
         }
         el.innerHTML = el.innerHTML + buf;
         const aPt = "insrtPt" + j +"X";
         console.log("aPt=  " + aPt);
      }
         

    }*/
 
}