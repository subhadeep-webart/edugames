
class BidButs {
    constructor(rowLength) {
        console.log("BidButs Constructor " + rowLength);
        this.butMax = 0;
        this.remButs = 0;
        this.topBid = 0;
        this.rows;
        // this.centerDisplay = document.getElementById("centerDisplay");
        this.butL = insrtpt0X;
        this.butR = insrtpt1X;
        this.rowLength = rowLength;
        this.whoHasBid = "Blue";
        clockIsPause = false;
        this.bidClockTime = 0.0;
        this.theBiddingSide = null;
        this.playerSpeed = [];
        this.maxPoints = 100.0;
        this.p0Time = [];
        this.p1Time = [];
        this.ptArr = []
        this.XYZZ = "ABC";
        this.init();
        this.bidWinnerNbr = 0;
    }

    init() {
        this.createSpeedMap();
        this.createColFacMap();
        this.showButDisplay();
    }

    togleClock() { console.log("aaa BB.togleClock() " + clockIsPause);
        if (clockIsPause == false) {
            clockIsPause = true
        } else {
            clockIsPause = false;
        }
        console.log("bbb BB.togleClock() " + clockIsPause);
    }

    stopBidingAndCheckPlay() {
        console.log("BB.stopBidingAndCheckPlay()");
        cp.theGameInPlay.checkPlay("timedOut from CheckBut  " + seconds);
    }

    makeBid(ltrNbr) {
        console.log("makBid " + ltrNbr + " remBut=  " + this.remButs + "  " + singlePlayerMode);
        [this.theBiddingSide, this.topBid] = ltrNbr.split(":");
        let buf = "";
        if (this.theBiddingSide == "L") {
            this.whoHasBid = "Blue"
            buf += plu.players[0].name + " BID " + this.topBid;
            centerDisplay.style.backgroundColor = plu.players[0].color;
            centerDisplay.style.color = "white";
            this.bidWinnerNbr = 0;

        } else {
            this.whoHasBid = "Red"
            buf += plu.players[1].name + " BID " + this.topBid;
            centerDisplay.style.backgroundColor = plu.players[1].color;
            centerDisplay.style.color = "white";
            this.bidWinnerNbr = 1;
        }

        centerDisplay.innerHTML = buf
        let aBut = "";
        let s = ""
        // Buttons up to the bid are taken out of play. They stay VISIBLE —
        // css/gamepanel.css styles [disabled], and the winning number gets
        // .is-bid for the blue highlight. No inline background here: an
        // inline colour would beat the stylesheet (it used to paint them
        // "white", which read as blank against the dark panel).
        for (let i = 1; i <= this.topBid; i++) {
            s = "bidButL" + i;
            console.log("s= " + s);
            aBut = document.getElementById(s);
            aBut.disabled = true;
            aBut.classList.toggle("is-bid", i == this.topBid && this.theBiddingSide == "L");
            s = "bidButR" + i;
            aBut = document.getElementById("bidButR" + i);
            aBut.disabled = true;
            aBut.classList.toggle("is-bid", i == this.topBid && this.theBiddingSide == "R");
        }
        if (singlePlayerMode) {
            this.procBid();
            return;
        }
        if (this.topBid == this.remButs) {//No need to continue with bidding
            this.procBid();//No reason to continue is no higher bids
        }
        console.log("*********makBid  bottom this.whoHasBid = " + this.whoHasBid + " this.topBid=  " + this.topBid);
    }

    procBid() {//this comes over from Script of if remaing bids = the bid
        console.log(" bidButs procBid() top " + this.whoHasBid + " this.topBid=  " + this.topBid)
        this.stopBidClock();
        biddingInProgress = false;
        cp.theGameInPlay.startPlay();//Used by game C
        if (this.whoHasBid == null) {//No one has bid, so go to next round
            console.log(" this.whoHasBid == null")
            this.procNoBids();
        } else {
            const ltrNbr = this.whoHasBid + this.topBid;
            this.hideButDisplay();
            cp.itf.startPlay(ltrNbr);
        }
        console.log(" bidButs procBid() Bottom " + this.whoHasBid + " this.topBid=  " + this.topBid)
    }

    deleteAllButs() {
        this.butL.innerHTML = "";
        this.butR.innerHTML = "";
    }

    setBidTime(n) {
        console.log("bb setBidTime= " + n)
        this.bidClockTime = parseInt(n, 10);

    }

    showButDisplay() {
        console.log("showButDisplay top() ")
        this.butL.style.display = 'block';
        this.butR.style.display = 'block';
    }

    hideButDisplay() {
        console.log("hideButDisplay top() ")
        this.butL.style.display = 'none';
        this.butR.style.display = 'none';
    }

    setBidSeconds(n) {
        console.log("BB setBidSeconds " + n + " bidSeconds  " + bidSeconds)
        bidSeconds = n;
    }

    startBidClock(n) {
        console.log("startBidClock()  top n=  " + n + "  " + bidSeconds + " this.topBid=  " + this.topBid)
        biddingInProgress = true;
        if(singlePlayerMode === false)postNoticeCenterDisplay("24,white,-BIDDING STARTED");
        console.log("startBidClock() " + n + "  " + bidSeconds)
        this.whoHasBid = null;
        this.topBid = 0;
        if (n != undefined) {
            bidSeconds = n;
        } else {
            bidSeconds = this.bidClockTime;
        }

        interval = setInterval(this.runBidClock, 1000);
        console.log("startBidClock() bottom bidSeconds= " + bidSeconds)
    }

    stopBidClock() { console.log("bb Hello stopBidClock() "); 
       clearInterval(interval);//this stops bid clock
    }

    runBidClock() {
        //console.log(" timeBox  bidButs runBidClock()  " + seconds + " this.whoHasBid=  " + this.whoHasBid + "   " + clockIsPause)
        if (clockIsPause == true) {
            console.log(" ----");
            return;
        }
        console.log(" +++");
        const sec = Math.round(bidSeconds);
        bidSeconds--
        //timeBox.value = sec + " Sec";
        timeBox.value = sec + " Sec";
        if (bidSeconds <= 0) {
            //this.timeBox.value = "Play In Progress"
            clearInterval(interval);//this stops bid clock
            biddingInProgress = false;
            this.procBid();
        }
    }

    procNoBids() {console.log(" procNoBids() ");
        this.hideButDisplay();
        this.hidePtDisplay();
        postNoticeCenterDisplay("24,white,No Bids=Press NEXT ROUND");
        enableNextRndBut();
        showAnsBut();
        gameInPlay = false;
        postToTimeBox("---");
    }

    showAnsButXX() {
        console.log("BB showAnsBut ")
        ansBut.style.visibility = "visible";
    }


    postEndOfPlay() {
        postNoticeCenterDisplay("24,white,Press NEXT ROUND");
    }
 

    stopBidClock() { console.log("bb Hello stopBidClock() ");
        clearInterval(interval);
        timeBox.value= "--";
    }

    sayHello() {
        console.log(" Hello ");
    }

    startStopBidClock() {  console.log("startStopBidClock() was= " + this.clockPause);
        if (this.clockPause == false) {
            this.startBidClock()
        } else {
            this.stopBidClock()
        }
    }

 
 
    restartBidding() { console.log("resetBidButs Top() bidButs.remButs = " + bidButs.remButs);
        this.stopBidClock()
        stopThePlayClock();//from script
        //this.reduceButtons();
        if (bidButs.remButs == 0) {
            nextRoundBut.style.display = "block";
            return;
        }
        let s = "";
        let aBut = ""
        // Back into play: re-enable and drop the previous round's highlight.
        // No inline background — css/gamepanel.css paints these (an inline
        // colour would override the stylesheet).
        for (let i = 1; i <= this.remButs; i++) {
            s = "bidButL" + i;
            aBut = document.getElementById(s);
            aBut.disabled = false;
            aBut.classList.remove("is-bid");
            s = "bidButR" + i;
            aBut = document.getElementById(s);
            aBut.disabled = false;
            aBut.classList.remove("is-bid");
        }
        this.fillBoxes(this.remButs, "B", this.rows);//We reset to the new amount of buts
        this.startBidClock(this.bidClockTime,"from restartBidding");
        if(singlePlayerMode === false)postNoticeCenterDisplay("24,white,BIDDING STARTED-");
        this.showButDisplay();
        console.log("bb resetBidButs Bottom() ");
    }

    reduceButtons(nbr,reason) {
        console.log("reduceButtonsTop by " + nbr + "  remBut = " + this.remButs + " this.topBid=  " + this.topBid + "  " + reason)
        if (nbr == null) {
            nbr = this.topBid;
        }
        const newTrgNbr = this.remButs - nbr;
        let el = null;
        const n = this.remButs - 1;
        for (let i = n; i >= newTrgNbr; i--) {//bidBut
            this.remButs--;
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
        this.showButDisplay();
        console.log("reduceButtons bottom remButs= " + this.remButs);
    }


    createButs(butMax, gameType, rows) { 
        this.rows = rows;
        console.log("createButs" + butMax + " gameType= " + gameType);
        this.butMax = butMax;
        this.remButs = butMax;
        this.fillBoxes(butMax,gameType,rows);
        let width = butMax * 32;
        width = 150;
        const twoRows = (butMax > this.rowLength)
        if (twoRows) {
            width /= 2;
        }
        const lrArr = ["L", "R"];
            let bufR = "<table border='3' class='bidButs' width='100%'><tr><td>"
            let bufL = "<table border='3' class='bidButs' width='100%'><tr><td>"

            for (let i = 0; i < butMax; i++) {
                const theNbr = (i + 1);
                // Colour comes from css/gamepanel.css (.tsd-bid-panel .but2Player),
                // not an inline fill — an inline background-color would win over
                // the stylesheet and defeat the outlined-square treatment.
                bufL += `<input type='button' class='but2Player' onclick='makeBid(\"L:${theNbr}\")'`;
                bufR += `<input type='button' class='but2Player' onclick='makeBid(\"R:${theNbr}\")'`;
                bufR += " value=" + (i + 1);
                bufL += " value=" + (i + 1);
                bufR += " id='bidButR" + (i + 1) + "' >";
                bufL += " id='bidButL" + (i + 1) + "' >";
                if (i == this.rowLength) {
                    bufR += "</td></tr><tr><td>"
                    bufL += "</td></tr><tr><td>"
                }
            this.butL.innerHTML = bufL;
            this.butR.innerHTML = bufR;
        }
        this.bidButs = butMax;
        this.showButDisplay();
        console.log("bottom of createButs ");

    }

    hidePtDisplay() {
        ptAndTimeInsrtPt.style.display = 'none';
    }

    showPtDisplay() {
        ptAndTimeInsrtPt.style.display = 'block';
    }


    fillBoxes(totalButs, gameType, rows) {//
        console.log("fillBoxes totalButs=  " + totalButs + " gameType  " + gameType + " rows  " + rows  + "  "  + singlePlayerMode + "  " + this.butMax);
        this.p0Time = [];
        this.p1Time = [];
        this.ptArr = [];
        const speed0 = this.playerSpeed[0];
        const speed1 = this.playerSpeed[1];

        //<input type='button' style="background-color: blue; color: white"  class='but2Player' onclick='makeBid(L:1 )' value=1 id='trgNbrL1' >

        const sameSpeedForEachPlayer = (speed0 == speed1) || singlePlayerMode;//<tr>

        let buf = '\n<table border="1" style="font-size: 8px"; id="ptTbl" width="100%">\n<tr><td><table border="1" width = "100%" ><tr> <td class="TmPtHeader"><p class="timePts">Item Count</p></td></tr><tr> <td class="TmPtHeader"><p class="timePts">Points</p></td>';

        if (sameSpeedForEachPlayer) {
            buf += "<tr class='timePts'><td> <p class='timePts'>Time</p></td></table>";
        } else {
            buf += "<td class='TmPtHeader'>Blue Time</td>";
            buf += "<td class='TmPtHeader'>Red Time</td></table>";
        }
        let nbrOfButs = totalButs;
        if (singlePlayerMode) {
            nbrOfButs = this.butMax
        }		
       // const x = Number(1 / (totalButs * totalButs))
        const x = Number(1 / (nbrOfButs * totalButs))
        for (let i = 1; i <= nbrOfButs; i++) {
            const points = (Number(x * i * i * this.maxPoints));
            this.ptArr.push(Math.round(points));

            const speed0 = Number(this.getTheTime(0, gameType, i, rows))
            const speed1 = Number(this.getTheTime(1, gameType, i, rows))
            buf += `\n<td><table border="1" id="tbl${i}" width="100%"><tr class="TmPtHeader"><td id="b${i}"><p class="timePts">${i}</p></td></tr><tr class="TmPtHeader"><td id="p${i}"><p class="timePts">${points.toFixed(0)} Pts</p></td></tr>`;

            if (sameSpeedForEachPlayer) {
                this.p0Time.push(speed0);
                this.p1Time.push(speed0);
                buf += `<tr class="TmPtHeader" ><td id="t${i}"><p class="timePts">${speed0.toFixed(0)} Sec</p> </td></tr>`;
            } else {
                this.p0Time.push(speed0);
                this.p1Time.push(speed1);
                buf += `<tr class="TmPtHeader"><td id="t${i}">${speed0.toFixed(0)} Sec</td></tr>`;
                buf += `<tr class="TmPtHeader"><td id="tt${i}">${speed1.toFixed(0)} Sec</td>`;//</tr>
            }
            buf += "</table></td>";
            
        }
        buf += "</tr></table></tr>"


        //console.log(buf);
        // --- points/time table hidden at the client's request -------------
        // Only the RENDER is commented out. Everything above still runs: it
        // fills this.ptArr / this.p0Time / this.p1Time, which
        // getPointsForThisPlay() and getTimeFor...() read to score the game
        // (see Interface.js -> this.pointsThisPlay). Do not gut fillBoxes().
        // To restore the table, un-comment the two lines below.
        // ptAndTimeInsrtPt.innerHTML = buf;
        // this.showPtDisplay();
        this.hidePtDisplay();
    }

    getTheTime(pNbr, gameType, nbrBut, rows) {//console.log("|||Settings getTime pNbr= "  + pNbr +  "  gameType= " + gameType  +  " nbrBut=  "+ nbrBut +  " rows=  "+ rows)
        let time = 0.0;
        const gameTypeFac = this.getGameTypeSpeedFac(gameType, rows);
        //console.log("gameTypeFac=  " + gameTypeFac );
        const playerTimePerBut = this.speedMap.get(this.playerSpeed[pNbr]);
        //console.log("playerTimePerBut=  " + playerTimePerBut );
        time += nbrBut * playerTimePerBut * gameTypeFac;
        //console.log("time=  " + time );
        if (rows != undefined) {
            const n = Number(this.colFacMap.get(rows));
            //console.log("n=  " + n );
            time *= n;
        }
        //console.log(" setting time=  " + time );
        return time;
    }

    getGameTypeSpeedFac(gameType, cols) {//console.log("Settings getGameTypeSpFac gameType=  " + gameType  + "  cols "  + cols)
        switch (gameType) {
            case "B":
                return 0.5;
            case "P":
                return 0.6;
                break;
            case "M":
                return this.colFacMap.get("2");
                break;
            case "Q":
                return 1.5;
                break;
            case "U":
                return this.colFacMap.get(cols);
                break;
            case "E":
                return 1.25;
                break;
            default:
                //console.log("this is Default")
                return 1.0;
        }
        //if(db)console.log("this is bottom o fgetGameTypeSpeedFac ")
    }

    getTimeForGameLND(playerSpeedLev) {  
        return (this.bidClockTime * 0.6).toFixed(0);
    }

    getTime(pNbr, nbrBut) {
        console.log("|||Settings getTime pNbr= " + pNbr + " nbrBut = " + nbrBut)
        if (pNbr == 0) {
            return this.p0Time[nbrBut - 1];
        } else {
            return this.p1Time[nbrBut - 1];
        }
    }
    setPlayerSpeedFacs(pNbr, speedLev) {
        console.log("setSpeeds pNbr=  " + pNbr + " speedLev=  " + speedLev);
        this.playerSpeed[pNbr] = speedLev;
    }

    getPointsForThisPlay(butNbr) {
        return this.ptArr[butNbr - 1]
    }

    deletePtTbl() {
        console.log("Setting  deletePtTbl ");
        const el = document.getElementById("ptTbl");
        if (el != null) {
            el.remove();
        }
    }

    createSpeedMap() {//console.log("Settings createSpeedMap "  );// 1 is fastest, 10 slowests
        const arr = ['1-3', '2-3.5', '3-4', '4-4.5', '5-5', '6-5.5', '7-6', '8-6.5', '9-7', '10-7.5'];
        this.speedMap = new Map();
        for (let j = 0; j < arr.length; j++) {
            const newArr = arr[j].split("-");
            this.speedMap.set(newArr[0], newArr[1]);
        }
    }

    createColFacMap() {
        console.log("bidbuts createColFacMap() ")
        const arr = ['1-1.25', '2-1.25', '3-1.5', '4-1.75', '5-2'];
        this.colFacMap = new Map();
        for (let j = 0; j < arr.length; j++) {
            const newArr = arr[j].split("-");
            this.colFacMap.set(newArr[0], newArr[1]);
        }
    }

    

}