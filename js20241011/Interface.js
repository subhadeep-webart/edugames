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
    this.ptFacDoc;
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
    this.nbrButSelected =0;
    this.targNbr =0;
    this.insrtPt;
    this.insrtPtMDoc;
    this.nxtButDoc;
    this.startRoundBut;
    //this.nextAndTimeDoc;
    this.startsetBut;
    this.checkButDoc;
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

    this.pointsThisPlay = 0;
    this.p0RndPlusScore = 0;
    this.p1RndPlusScore = 0;
    this.p0RndNegScore = 0;
    this.p1RndNegcore = 0;

    this.thePtFacDoc;
    }

    init(){console.log("itf.init top" );//nowPlayWin
        this.registerDocs();
        this.ub = new UniBut(cp,this);
        this.ub.init();
        this.exp = new Explain();
        this.enableStartButs();
        this.setUpPage();
        console.log("itf.init bottom" );
    }
    
	helloWorld(){console.log("Interface.helloWorld" );		
		
	}

    displaySerNbr(serNbr){console.log(" displaySerNbr  " + serNbr)
        this.displayDoc.textContent = serNbr;

	}

    endPlay(){console.log("itf.endPlay ");
       // cp.theGameInPlay.endPlay();
    }

    startPlay(txt) {
        console.log("^^^itf.startPlay " + txt + " itfType = " + cp.itfType + " cp.theGameInPlay= " + cp.theGameInPlay);
        if(this.playInProgress){
            console.log(" *************  Play in progress  ");
            return;
        }
        this.postNotice("PLAY STARTED!!")
	    const aLtr = txt.charAt(0);
        this.nbrButSelected = txt.substring(1);
        this.targNbr= this.nbrButSelected;
        console.log("aLtr  " + aLtr);
        let voiceBuf = "Audio/";
        if(aLtr == "L"){
            this.setPlayerUp(0)//convert to 0 left 1 right
            voiceBuf+= "Blue";

        }else{
            this.setPlayerUp(1);
            voiceBuf+= "Red";
        }
        if(cp.itfType == "D"){
            voiceBuf+= "GoingFirst.wav"
        }else{
            voiceBuf+= this.targNbr + ".wav"
        }
;
        console.log("voiceBuf " + voiceBuf);
        const voiceResp = new Audio(voiceBuf);
        voiceResp.play();

        if (cp.itfType == "D") {
            cp.theGameInPlay.startPlay();
            //stopThePtFac();
            //setUpTheDecreasingPtFac(ptFac,0.05,0)
            cp.itf.playInProgress = true;
            return;
        } 
        this.PlayerNbr = Number(txt.substring(1));
        this.playInProgress = true;
        if(cp.itfType != "I"){
            this.setPtThisPlay(this.PlayerNbr);
        }
        this.startPlayTimer();
        //const arr = [this.nowPlaying,this.PlayerNbr]//
        //cp.theGameInPlay.playStarted(arr);
        cp.theGameInPlay.startPlay(this.PlayerNbr);
        

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

    displayResultsTypeD(winner,pts) {
        console.log("$$ displayResultsTypeD  winner " + winner + "   pts= " + pts)
        plu.addToScore(winner, pts)
        let winLoseBuf = "";
        let buf = "";
        if (winner == "0") {
            winLoseBuf += "<<" + plu.players[0].name + "<<";
            buf += "<" + pts.toFixed(0) + " Points";
        } else {
            winLoseBuf += ">>" + plu.players[1].name + ">>";
            buf += "" + pts.toFixed(0) + " Points >";
        }
        this.nowPlayingDoc.textContent = buf;
        this.updateScoreBoards();

    }

    displayResultsOfPlay(winner, pts) { console.log("$$ displayResultsOfPlay  winner " + winner + "   pts= " + pts)
        let winLoseBuf = "";
        let buf = "";
        if(winner == "0"){
            winLoseBuf+= "<<" + plu.players[0].name +"<<";
            buf+= "<" + pts + " Points";
        }else{
            winLoseBuf+= ">>" + plu.players[1].name +">>";
            buf+= "" + pts + " Points >";
        }
        this.playWinner(winner);
        console.log("--winLoseBuf " + winLoseBuf + " plu.players  " + plu.players[0].name);
        console.log("$$ displayResultsOfPlay buf " + buf)
        this.nowPlayingDoc.textContent = buf;
  }


    displayPtsThisPlay(passFail,results){console.log("*|*|*displayPts  " + passFail + "   this.nowPlaying= " + this.nowPlaying + "  results = " + results);
        this.postNotice(results)
        console.log("this.timeFactor= " + this.timeFactor)//comes from script stopTheClock
        console.log("AAAitf.this.ptsThisPlayDoc.textContent  " + this.ptsThisPlayDoc.textContent)

        let ptsForThisPlay =  Number(this.ptsThisPlayDoc.textContent);

        console.log("--this.ptsThisPlayDoc.textContent " + this.ptsThisPlayDoc.textContent)
        console.log("--ptsForThisPlay " + ptsForThisPlay)
        console.log("--this.timeFactor " + this.timeFactor)

        let bonusPts = Number((ptsForThisPlay *  this.timeFactor)).toFixed(0);
         console.log("bonusPts " + bonusPts)

        if(isNaN(bonusPts)) bonusPts=0;
        console.log("**** this.nowPlaying= " + this.nowPlaying)//           console.log(" " +)
        const timeBox = document.getElementById("timeBox");
        const totalPts = Number(Number(ptsForThisPlay) + Number(bonusPts)).toFixed(0);
        console.log("totalPts= " + totalPts +  "  this.nowPlaying = " +  this.nowPlaying  + " cp.theGameInPlay=   " + cp.theGameInPlay )

        if(passFail == "passed"){
            timeBox.textContent = "Bonus = " +  bonusPts  ;
            this.winner = this.nowPlaying;
            this.awardPoints(this.nowPlaying,totalPts,results);
            this.displayResultsOfPlay(this.nowPlaying,totalPts);//totalPts includes Bonus
            this.reduceButtons(this.PlayerNbr);
            this.looser =this.theOtherSide;
            //plu.addToScore(this.nowPlaying,totalPts);
            console.log(" winner= " + this.winner);
            console.log(" looser= " + this.looser);
            this.playAudioThisPlay(this.nowPlaying,true);
        }else{//failed
            this.failedPlayCount--;
            this.looser = this.pNbr;
            //plu.addToScore(this.nowPlaying,-ptsForThisPlay);
            this.awardPoints(this.theOtherSide,ptsForThisPlay,results);
            this.displayResultsOfPlay(this.theOtherSide,ptsForThisPlay);//ptsForThisPlay does not include Bonus
            //this.postWinner(this.theOtherSide);
            this.playAudioThisPlay(this.nowPlaying,false);
        }

        this.resetTopDisplay(cp.itfType != "I");

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

    displayNxtRndBut(text){console.log("displayNxtRndBut" );
        const theNextBut = document.getElementById("nxtBut")
        if(text > 0){
            theNextBut.textContent = text;
            this.ub.setText(text);
        }else{
            this.ub.setNextRound();
           
        }
        //theNextBut.style.display = "block";
    }



    countRemainingButs(){console.log("countRemainingButs" );
        const collection = document.getElementsByClassName("but2Player");
        //console.log(" bbb" +  collection.length);
        return collection.length;
    }

    awardPoints(pNbr,points,results){console.log("||||itf.awardPoints  points= " + points + "   pNbr= " + pNbr);
        const ptAwd = Number(points);
        //this.postWinner(pNbr);
        console.log("aaa" + plu.players[pNbr].getRndScore())
        plu.players[pNbr].addToRndScore(Number(points));
        console.log("bbb" + plu.players[pNbr].getRndScore());
        plu.players[pNbr].addToSetScore(Number(points));

        this.displayResultsOfPlay();
        this.updateScoreBoards();
        /*
        if(pNbr == 0){
            //const el =document.getElementById("pt0")
            this.pt0Doc
			const pointAlreadyThere = Number(this.pt0Doc.textContent);
            this.pt0Doc.textContent = (pointAlreadyThere + ptAwd).toFixed(0);
		}else{
            //const el =document.getElementById("pt1")
			const pointAlreadyThere = Number(this.pt1Doc.textContent);
            this.pt1Doc.textContent = (pointAlreadyThere + ptAwd).toFixed(0);
		}
        */
        this.postNotice(results);
    }

     enableStartButs(){console.log("itf.enableStartButs" );
         this.startsetBut.disabled = false;   
         this.startRoundBut.disabled = false;
         
    }
 
   
    testA(){console.log("itf testA " );
        this.countRemainingButs()
        //this.showTheNextRoundBut();
    }

    showTheNextRoundBut(){console.log("itf showTheNextRoundBut "  )
        this.nxtButDoc.style.display = "block";
    }

    hideTheNextRoundBut(){console.log("itf hideTheNextRoundBut " +  this.insrtPtMDoc)
        if(this.nxtButDoc != undefined)this.nxtButDoc.style.display = "none"; 
    }

    hideTheCheckBut(){console.log("itf hideTheCheckBut " +  this.insrtPtMDoc)
        if(hideTheCheckBut != undefined)hideTheCheckBut.style.display = "none"; 
    }

    hideTheCheckBut(){console.log("itf hideTheCheckBut "  )

    }





     resetTopDisplay(zeroPts){console.log("resetTopDisplay " +  zeroPts)
        cp.itf.playInProgress = false;
        if(zeroPts){
            this.ptsThisPlayDoc.textContent = 0;
        }
        //this.nowPlayingDoc.textContent = "";
        //this.nowPlayingDoc.style.background= "white";
    }





   registerDocs(){console.log("itf.regDisplayPts " )
       this.timeBox =  document.getElementById("timeBox");//id="setTotR"
       this.qBox = document.getElementById("qBox");
       this.resultBox = document.getElementById("result");
       this.instBox = document.getElementById("instBox");
       this.ptFacDoc = document.getElementById("ptFac");
       this.displayLeft = document.getElementById("player0");
       this.displayRight = document.getElementById("player1");
       this.notice = document.getElementById("notice");
       this.stopClockButton = document.getElementById("butStopClock");
       this.ptsThisPlayDoc = document.getElementById("ptsThisPlay");
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
       console.log("*********************************this.ptsThisPlayDoc " +  this.ptFacDoc);
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

  goToNextPlayer(){
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

    startPlayTimer(){console.log("startPlayTimer "  );
        this.secPerQuest = this.cp.sp.secPerQuest;
        console.log("itf.this.secPerQuest = " +this.secPerQuest);
        setUpTheClock(this.PlayerNbr * this.secPerQuest);//Tis goes to script
        startTheClock();//This goes to script
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


     reduceThePts(inc){console.log("itf.reduceThePts " + inc);
        const thePoints = this.ptsThisPlayDoc.innerHTML;
        console.log("thePoints=  " + thePoints);
        this.ptsThisPlayDoc.innerHTML = (thePoints - inc).toFixed(0);
    }

    getPtFac(){console.log("itf ###getPtFac " +  this.ptFacDoc.innerHTML);//Factor: 1.900
        const ptFac = this.ptFacDoc.innerHTML;
        console.log("ptFac " + ptFac);
        const tempArr =  ptFac.split(":");
        console.log(" tempArr[1]" +tempArr[1] );
        const theFac = Number(tempArr[1].trim());
        console.log(" theFac" + theFac);
        return theFac;
    }

    testC(){console.log("testC ");
        this.setQuestion("THE CHALLENGE: Place the states in order from north [top] to south.");
    }
    setClockButtonText(txt){console.log("setClockButtonText " +  txt);
     this.stopClockButton.value = txt;
    }

    setPoints(thePoints ){console.log("itf.setPoints -" + thePoints +  "-  this.ptsThisPlayDoc= " + this.ptsThisPlayDoc.textContent);
        this.ptsThisPlayDoc.textContent = thePoints;
    }

    getPoints(){console.log("itf.getPoints ");
        return this.ptsThisPlayDoc.innerHTML;
    }


    getPlayerNameXX(pLtr) {
        console.log("itf.getPlayerName " + pLtr);
            return plu.players[pLtr];

    }
 
    
    setRegFormXX(){console.log("itf.setRegForm ");
        this.insrtFrm();
    }

    setQuestion(theQuestion){console.log("setQuestion " + theQuestion );
        if(this.qBox != undefined)this.qBox.textContent = "-" + theQuestion + "-";
    }

  setInstructions(txt){console.log("setInstructions " + txt);//not used
    
  }

  timeIsUp(){console.log("timeIsUp " );
    const theFac = Number(document.getElementById("ptFac").innerHTML);
    console.log("theFac " + theFac);

  }

   setPtThisPlay(trgNbr){
    const n = (trgNbr * trgNbr) *  this.thePtFac;console.log("setPtThisPlay trgNbr=  " + trgNbr + " ptsThisPlay  " + n);
    this.ptThisPlayDoc = document.getElementById("ptsThisPlay");
    this.ptThisPlayDoc.textContent = n.toFixed(0);
   }

  setPtFac(n){console.log("setPtFactor  " + n);
    this.thePtFac = n;
    //this.ptFacDoc = document.getElementById("ptFac");
    this.ptFacDoc.textContent = "Point Factor: " +  n.toFixed(1);
   }

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
  
	setPtFac(nbrOfButs){
        const maxPts = (nbrOfButs * nbrOfButs); //25 
        this.thePtFac = 100/maxPts;
       console.log("********* this.ptFac = " + this.ptFacDoc + "   " + this.twoPlayerDisplaySet);
        document.getElementById("ptFac").textContent = "Point factor: " + (this.thePtFac).toFixed(2);
    }

    setTieResults(){console.log("setTieResults ");

    }

    setTheNbrOfbuts(nbr,type){console.log("itf setTheNbrOfbuts " + nbr + "  type= " + type);
        //const x = this.DoNothing();
        this.butMax = nbr;
        this.remBut = nbr;
        this.setPtFac(nbr)
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
         //console.log("****buf=  " + buf);
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

    setUpPage(){console.log("Interface.setUpPage" );
        this.ub.setText("Start Set");
        this.ub.setfunction("start");
        this.ptFacDoc.textContent = "Point Factor: 1.0"
    }

    isPlayInProgress(){
        return this.playInProgress;
    }

    checkPlayArea(){
        if(!this.playAreaIsDisplayed){
            this.setUpPlayArea();
        }
    }

   postNotice(txt){console.log("postNotice() txt= " + txt + "  this.docsHaveBeenRegistered = " + this.docsHaveBeenRegistered)
      console.log("this.notice= " + this.notice);
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
       this.notice.addEventListener('click', function(event) {
           this.postNotice("");
       });
    }

    displaySelForm(){console.log("itf.displaySelForm()");

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

    reduceButtons(nbr){console.log("reduceButtons by " + nbr + " PlayerNbr = " + this.PlayerNbr + "  remBut = " + this.remBut)
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

    setNowPlayWinDoc(txt){console.log("itf setNowPlayWinDoc" );
        this.nowPlayWinDoc.textContent = txt;
    }

    setUpPlayArea(){console.log("itf setUpPlayArea" );
        if(!this.playAreaIsSetUp){
            //this.reg2Players();
            //this.insertPlayersInto2PlayerDisplay()
            this.hideTheNextRoundBut();
            this.hideTheCheckBut();
            //this.registerDocs();
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

 

   setTheNbrOfbutsXX(nbr,type){console.log("itf setTheNbrOfbuts " + nbr + "  type= " + type);
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
         

    }
 
}