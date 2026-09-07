
class BidButs {
    constructor(rowLength) {
        console.log("BidButs Constructor" );
        this.butMax = 0;
        this.remButs = 0;
        this.topBid = 0;
        this.centerDisplay = document.getElementById("centerDisplay");
        this.butL = document.getElementById("insrtpt0X");
        this.butR = document.getElementById("insrtpt1X");
        this.rowLength = rowLength;
        this.whoHasBid;
        this.timeBox = document.getElementById("timeBox");
        this.clockIsPause = false;
        this.bidClockTime = 0;
        this.theBiddingSide = null;
        this.XYZZ = "ABC";
    }

    

    deleteAllButs() {
        this.butL.innerHTML = "";
        this.butR.innerHTML = "";
    }

    setBidTime(n) {
        console.log("bb setBidTime" + n )
        this.bidClockTime = n;

    }

    showButs() {
        this.butL.style.display = 'block';
        this.butR.style.display = 'block';
    }

    hideButDisplay() {
        this.butL.style.display = 'none';
        this.butR.style.display = 'none';
    }

    setBidSeconds(n) {
        console.log("BB setBidSeconds " + n + " bidSeconds  " +  bidSeconds)
        bidSeconds = n;
    }

    startBidClock(n) {console.log("startBidClock() " + n + "  " + bidSeconds)
        return;
        const x = this.abc;
        biddingInProgress = true;
        console.log("startBidClock() " + n + "  " + bidSeconds)
        this.whoHasBid = null;
        this.topBid = null;
        if (n != undefined) {
            bidSeconds = n;
        } else {
            bidSeconds = this.bidClockTime;
        }

        interval = setInterval(this.runBidClock, 1000);
        console.log("startBidClock() bidSeconds= " + bidSeconds)
    }

    runBidClock() {
        console.log(" bidButs runBidClock() " + seconds + " this.whoHasBid=  " + this.whoHasBid + " this.XYZZ=  " + this.XYZZ)
        const sec = Math.round(bidSeconds);
        bidSeconds--
        this.timeBox.innerHTML = sec + " Seconds to START";
        if (bidSeconds <= 0) {
            this.timeBox.innerHTML = "Play In Progress"
            console.log(" *****this.seconds <= 0 ")
            clearInterval(interval);
            procBid();//This goes to script
        }
    }

    procBid() {//this comes over from Script
        biddingInProgress = false;
        console.log(" bidButs procBid() " + this.whoHasBid)
        this.stopBidClock();
        if (this.whoHasBid == null) {//No one has bid, so go to next round
            console.log(" this.whoHasBid == null")
            alert("nextRound()")
            //nextRound();
        } else {
            const ltrNbr = this.whoHasBid + this.topBid;
            this.hideButDisplay();
            cp.itf.startPlay(ltrNbr);           
        }
    }


    stopBidClock() {
        clearInterval(interval);
    }

    sayHello() {
        console.log(" Hello ");
    }

    startStopBidClock() {
        if (this.clockPause == false) {
            this.startBidClock()
        } else {
            this.stopBidClock()
        }
    }


    resetBidButs() {
        console.log("resetButs " + this.butMax);
        this.centerDisplay.value = "";
        let s = ""
        let aBut = "";
        for (let i = 1; i <= this.butMax; i++) {
            s = "bidButL" + i;
            aBut = document.getElementById(s);
            aBut.disabled = false;
            aBut.style.background = "blue";
            s = "R" + i;
            aBut = document.getElementById("bidButR" + i);
            aBut.disabled = false;
            aBut.style.background = "red";
        }
        this.centerDisplay.style.background = "white";
        this.remButs = this.butMax;
    }

    makeBid(ltrNbr) {
        console.log("makBid " + ltrNbr + " remBut=  " + this.remButs);
        [this.theBiddingSide, this.topBid] = ltrNbr.split(":");
        //console.log("side= " + this.theBiddingSide);
        //console.log("this.topBid= " + this.topBid);
        let buf = "";
        if (this.theBiddingSide == "L") {
            this.whoHasBid = "Blue"
            buf += "BLUE BID " + this.topBid;
            this.centerDisplay.style.backgroundColor = 'lightblue';
        } else {
            this.whoHasBid = "Red"
            buf += "RED BID " + this.topBid;
            this.centerDisplay.style.backgroundColor = '#ff8040';
        }

        //this.centerDisplay.textvalue = buf;
        this.centerDisplay.innerHTML = buf
        console.log("buf " + buf)
        let aBut = "";
        let s = ""
        for (let i = 1; i <= this.topBid; i++) {
            s = "bidButL" + i;
            console.log("s= " + s);
            aBut = document.getElementById(s);
            aBut.disabled = true;
            aBut.style.background = "white";
            s = "bidButR" + i;
            aBut = document.getElementById("bidButR" + i);
            aBut.disabled = true;
            aBut.style.background = "white";
        }
        if (this.topBid == this.remButs) {//No need to continue with bidding
           bidSeconds = 0;
        }
        console.log("makBid  bottom this.whoHasBid = " + this.whoHasBid + " this.topBid=  " + this.topBid );

    }

    resetBidButs() {
        console.log("resetBidButs() ");
        let s = "";
        let aBut = ""
        for (let i = 1; i <= this.remButs; i++) {
            s = "bidButL" + i;
            aBut = document.getElementById(s);
            aBut.disabled = false;
            aBut.style.background = "blue";
            s = "bidButR" + i;
            aBut = document.getElementById(s);
            aBut.disabled = false;
            aBut.style.background = "red";
        }
        this.centerDisplay.style.background = "white";
        postNotice("");
    }

    reduceButtons(nbr) {
        console.log("reduceButtons by " + nbr + "  remBut = " + this.remButs)
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
        console.log("reduceButtonsthis.remButs= " + this.remButs);

        //this.remButs = newTrgNbr;//The buttons are numbered but 0 = 1
    }


    createButs(butMax) {//type, 
        console.log("createButs" + butMax,);
        this.butMax = butMax;
        this.remButs = butMax;
        ///settings.fillBoxes(type, nbr);
        let width = butMax * 32;
        width = 150;
        const twoRows = (butMax > this.rowLength)
        if (twoRows) {
            width /= 2;
        }
        const lrArr = ["L", "R"];
        //for (let j = 0; j < 2; j++) {
            //const LorR = lrArr[j]
            let bufR = "<table border='3' class='bidButs' width='100%'><tr><td>"
            let bufL = "<table border='3' class='bidButs' width='100%'><tr><td>"

            for (let i = 0; i < butMax; i++) {
                const theNbr = (i + 1);
                bufL += `<input type='button' style='background-color: blue; ' class='but2Player' onclick='makeBid(\"L:${theNbr}\")'`;

                bufR += `<input type='button' style='background-color:  red; ' class='but2Player' onclick='makeBid(\"R:${theNbr}\")'`;
                bufR += " value=" + (i + 1);
                bufL += " value=" + (i + 1);
                bufR += " id='bidButR" + (i + 1) + "' >";
                bufL += " id='bidButL" + (i + 1) + "' >";

                if (i == this.rowLength) {
                    bufR += "</td></tr><tr><td>"
                    bufL += "</td></tr><tr><td>"
                }
                /*
                if (type == "D" || type == "N" || type == "L") {
                    bufR += "'Press to Go First'"
                    bufL += "'Press to Go First'"
                } else if (type == "I") {
                    bufR += "'Press to Choose an Answer'"
                    bufL += "'Press to Choose an Answer'"
                } else {
                    bufR += (i + 1);
                    bufL += (i + 1);
                }
                */
            //}
            //console.log("bufL= " + bufL);
            //console.log("bufR= " + bufR);
            
            this.butL.innerHTML = bufL;
            this.butR.innerHTML = bufR;

        }
        this.bidButs = butMax;
        console.log("bottom of createButs ");

    }

    setButDisplayXX(nbr) {
        let but = null;
        let s = "";
        for (let i = 1; i < (nbr); i++) {
            s = "bidButL" + i
            //document.getElementById(s).style.display = 'block';
            s = "bidButR" + i
            //document.getElementById(s).style.display = 'block';
        }
        for (let i = (nbr); i < (this.butMax); i++) {
            s = "bidButL" + i
            document.getElementById(s).style.display = 'none';
            s = "bidButR" + i
            document.getElementById(s).style.display = 'none'

        }
    }

}