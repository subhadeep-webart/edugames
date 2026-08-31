
class BidButs {
    constructor(rowLength) {
        console.log("BidButs Constructor" );
        this.maxButs = 0;
        this.remButs = 0;
        this.topBid = 0;
        this.centerDisplay = document.getElementById("centerDisplay");
        this.butL = document.getElementById("insrtpt0X");
        this.butR = document.getElementById("insrtpt1X");
        this.rowLength = rowLength;
        this.whoHasBid;
        this.timeBox = document.getElementById("timeBox");
        this.seconds = 0;
        //this.interval
        this.clockIsPause = false;
        this.bidClockTime = 0;
    }

    deleteAllButs() {
        this.butL.innerHTML = "";
        this.butR.innerHTML = "";
    }

    startBidClock(n) {
        console.log("startBidClock() " + n)
        if (n != undefined) {
            this.seconds = n;
        }
        interval = setInterval(this.runBidClock, 1000);
        console.log("startBidClock() this.seconds= " + this.seconds)
    }

    stopBidClock() {
        clearInterval(interval);
    }


    runBidClock() {
        console.log(" bidButs runBidClock() " + this.seconds)
        // if (!this.clockIsPause) {
        if (this.seconds > 0) {
            this.seconds--
            const sec = Math.round(this.seconds);
            timeBox.innerHTML = sec + " Seconds to START";

            if (sec <= 0) {
                cp.itf.startPlay();
                clearInterval(interval);
            }
        }
        // }
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
        for (let i = (nbr ); i < (this.butMax); i++) {
            s = "bidButL" + i
            document.getElementById(s).style.display = 'none';
            s = "bidButR" + i
            document.getElementById(s).style.display = 'none'

        }
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
    }

    makeBid(ltrNbr) {
        console.log("makBid " + ltrNbr + " remBut=  " + this.remBut);

        [this.whoHasBid, this.topBid] = ltrNbr.split(":");

        console.log("side= " + this.whoHasBid);
        console.log("this.topBid= " + this.topBid);

        if (this.topBid == this.remBut) {
            startSet();
        }
        let buf = "";
        if (this.whoHasBid == "L") {
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
    }

    resetBidButs() {
        console.log("resetBidButs() ");
        let s = "";
        let aBut = ""
        for (let i = 1; i <= this.remBut; i++) {
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
        console.log("reduceButtons by " + nbr + "  remBut = " + this.remBut)
        const newTrgNbr = this.remBut - nbr;
        let el = null;
        const n = this.remBut - 1;
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
        this.remBut = newTrgNbr;//The buttons are numbered but 0 = 1
    }


    createButs(butMax) {//type, 
        console.log("createButs" + butMax,);
        this.butMax = butMax;

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
        console.log("bottom of setTheNbrOfbuts ");

    }

}