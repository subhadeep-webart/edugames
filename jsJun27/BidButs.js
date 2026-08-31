class BidButs {

    constructor(rowLength) {
        console.log("BidButs Constructor");

        // --- DOM insert points ---
        this.leftDiv = document.getElementById("insrtpt0X");
        this.rightDiv = document.getElementById("insrtpt1X");
        this.ptDiv = document.getElementById("ptAndTimeInsrtPt");

        // --- Bidding state ---
        this.rowLength = rowLength;
        this.butMax = 0;
        this.remButs = 0;
        this.topBid = 0;
        this.whoHasBid = null;

        // --- Timing ---
        this.bidClockTime = 0;
        this.timer = null;
        this.timeLeft = 0;

        // --- Speed & points ---
        this.playerSpeed = [];
        this.p0Time = [];
        this.p1Time = [];
        this.ptArr = [];
        this.maxPoints = 100;

        // --- Maps ---
        this.createSpeedMap();
        this.createColFacMap();
    }

    // ------------------------------------------------------------
    // PUBLIC API
    // ------------------------------------------------------------
    setBidTime(n) {
        this.bidClockTime = n;
    }

    setBidSeconds(n) {
        this.bidClockTime = n;
    }

    setPlayerSpeedFacs(pNbr, speedLev) {
        this.playerSpeed[pNbr] = speedLev;
    }

    getPointsForThisPlay(butNbr) {
        return this.ptArr[butNbr - 1];
    }

    getTime(pNbr, butNbr) {
        return (pNbr === 0 ? this.p0Time[butNbr - 1] : this.p1Time[butNbr - 1]);
    }

    // ------------------------------------------------------------
    // BUTTON CREATION
    // ------------------------------------------------------------
    createButs(butMax, gameType, rows) {
        console.log("BidButs createButs  " + butMax + ", " + gameType + ", " + rows );
        this.butMax = butMax;
        this.remButs = butMax;

        this.fillBoxes(butMax, gameType, rows);

        let bufL = "<table class='bidButs'><tr><td>";
        let bufR = "<table class='bidButs'><tr><td>";

        for (let i = 1; i <= butMax; i++) {
            bufL += `<input type='button' class='but2Player' 
                     style='background-color: blue;' 
                     id='bidButL${i}' value='${i}'
                     onclick='makeBid("L:${i}")'>`;

            bufR += `<input type='button' class='but2Player' 
                     style='background-color: red;' 
                     id='bidButR${i}' value='${i}'
                     onclick='makeBid("R:${i}")'>`;

            if (i === this.rowLength) {
                bufL += "</td></tr><tr><td>";
                bufR += "</td></tr><tr><td>";
            }
        }

        bufL += "</td></tr></table>";
        bufR += "</td></tr></table>";

        this.leftDiv.innerHTML = bufL;
        this.rightDiv.innerHTML = bufR;

        this.showButDisplay();
    }

    // ------------------------------------------------------------
    // BID SELECTION
    // ------------------------------------------------------------
    makeBid(ltrNbr) {
        const [side, bid] = ltrNbr.split(":");
        this.topBid = Number(bid);

        if (side === "L") {
            this.whoHasBid = "Blue";
            centerDisplay.style.backgroundColor = plu.players[0].color;
        } else {
            this.whoHasBid = "Red";
            centerDisplay.style.backgroundColor = plu.players[1].color;
        }

        centerDisplay.style.color = "white";
        centerDisplay.innerHTML = `${this.whoHasBid} BID ${this.topBid}`;

        // Disable all buttons up to the bid
        for (let i = 1; i <= this.topBid; i++) {
            document.getElementById(`bidButL${i}`).disabled = true;
            document.getElementById(`bidButR${i}`).disabled = true;
        }

        if (this.topBid === this.remButs) {
            this.procBid();
        }
    }

    procBid() {
        this.stopBidClock();
        biddingInProgress = false;

        if (!this.whoHasBid) {
            this.procNoBids();
            return;
        }

        this.hideButDisplay();
        cp.itf.startPlay();
    }

    procNoBids() {
        this.hideButDisplay();
        this.hidePtDisplay();
        postNoticeCenterDisplay("24,white,No Bids — Press NEXT ROUND");
        enableNextRndBut();
        enableAnsBut();
        gameInPlay = false;
        postToTimeBox("---");
    }

    // ------------------------------------------------------------
    // CLOCK
    // ------------------------------------------------------------
    startBidClock(n) {
        biddingInProgress = true;
        postNoticeCenterDisplay("24,white,BIDDING STARTED");

        this.whoHasBid = null;
        this.topBid = 0;

        this.timeLeft = (n !== undefined ? n : this.bidClockTime);

        if (this.timer) clearInterval(this.timer);

        this.timer = setInterval(() => {
            this.timeLeft--;
            cp.itf.timeBox.value = `${this.timeLeft} Sec`;

            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.timer = null;
                biddingInProgress = false;
                this.procBid();
            }
        }, 1000);
    }
    getTimeForGameLND() {  
        return 15;//This will change to half the time of bidding.  This is a placeholder for now.
    }


    stopBidClock() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        cp.itf.timeBox.value = "--";
    }

    // ------------------------------------------------------------
    // POINT TABLES
    // ------------------------------------------------------------
    fillBoxes(totalButs, gameType, rows) {
        this.p0Time = [];
        this.p1Time = [];
        this.ptArr = [];

        let buf = `<table id="ptTbl" class="ptTable"><tr>`;

        const sameSpeed = (this.playerSpeed[0] === this.playerSpeed[1]);
        const x = 1 / (totalButs * totalButs);

        for (let i = 1; i <= totalButs; i++) {
            const pts = Math.round(x * i * i * this.maxPoints);
            this.ptArr.push(pts);

            const t0 = this.getTheTime(0, gameType, i, rows);
            const t1 = this.getTheTime(1, gameType, i, rows);

            this.p0Time.push(t0);
            this.p1Time.push(sameSpeed ? t0 : t1);

            buf += `
                <td>
                    <table id="tbl${i}" class="ptInner">
                        <tr><td>${i}</td></tr>
                        <tr><td>${pts} Pts</td></tr>
                        <tr><td>${t0.toFixed(0)} Sec</td></tr>
                        ${sameSpeed ? "" : `<tr><td>${t1.toFixed(0)} Sec</td></tr>`}
                    </table>
                </td>`;
        }

        buf += "</tr></table>";

        this.ptDiv.innerHTML = buf;
        this.showPtDisplay();
    }

    deletePtTbl() {
        const outer = document.getElementById("ptTbl");
        if (outer) outer.remove();

        for (let i = 1; i <= this.remButs; i++) {
            const tbl = document.getElementById(`tbl${i}`);
            if (tbl) tbl.remove();
        }
    }

    // ------------------------------------------------------------
    // DISPLAY CONTROL
    // ------------------------------------------------------------
    showButDisplay() {
        this.leftDiv.style.display = "block";
        this.rightDiv.style.display = "block";
    }

    hideButDisplay() {
        this.leftDiv.style.display = "none";
        this.rightDiv.style.display = "none";
    }

    showPtDisplay() {
        this.ptDiv.style.display = "block";
    }

    hidePtDisplay() {
        this.ptDiv.style.display = "none";
    }

    // ------------------------------------------------------------
    // SPEED & TIME CALCULATION
    // ------------------------------------------------------------
    getTheTime(pNbr, gameType, nbrBut, rows) {
        const base = Number(this.speedMap.get(this.playerSpeed[pNbr]));
        let time = nbrBut * base * this.getGameTypeSpeedFac(gameType, rows);

        if (rows !== undefined) {
            time *= Number(this.colFacMap.get(rows));
        }

        return time;
    }

    getGameTypeSpeedFac(gameType, cols) {
        switch (gameType) {
            case "B": return 0.5;
            case "P": return 0.6;
            case "M": return this.colFacMap.get("2");
            case "Q": return 1.5;
            case "U": return this.colFacMap.get(cols);
            case "E": return 1.25;
            default: return 1.0;
        }
    }

    createSpeedMap() {
        const arr = ['1-3', '2-3.5', '3-4', '4-4.5', '5-5', '6-5.5', '7-6', '8-6.5', '9-7', '10-7.5'];
        this.speedMap = new Map(arr.map(s => s.split("-")));
    }

    createColFacMap() {
        const arr = ['1-1.25', '2-1.25', '3-1.5', '4-1.75', '5-2'];
        this.colFacMap = new Map(arr.map(s => s.split("-")));
    }
}
