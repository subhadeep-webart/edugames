class Player {

    constructor(playerInfo, color, altColor, capColor, nbr) {
        console.log("New Player " + playerInfo + "  " + color);

        // Identity
        this.nbr = Number(nbr);
        this.name = "";
        this.zipCode = "";
        this.gradeLev = "";
        this.speedLev = 1;          // raw speed level from CSV
        this.speedFactor = 1;       // converted numeric factor

        // Colors
        this.color = color;
        this.altColor = altColor;
        this.capColor = capColor;

        // Scoring
        this.score = 0;
        this.rndScore = 0;
        this.setScore = 0;

        // Logging
        this.log = [];

        // Parse playerInfo string
        this.procPlayerInfo(playerInfo);
    }

    /* -----------------------------------------------------------
       PARSE PLAYER INFO
       Format: "nbr;name;zip;grade;speed"
    ----------------------------------------------------------- */

    procPlayerInfo(playerInfo) {
        const arr = playerInfo.split(";");

        this.nbr = Number(arr[0]);
        this.name = arr[1];
        this.zipCode = arr[2];
        this.gradeLev = arr[3];
        this.speedLev = Number(arr[4]);

        // Convert speed level to a numeric factor
        // (You can tune this mapping however you want)
        this.speedFactor = this.convertSpeedLevel(this.speedLev);

        console.log("Player parsed: " + this.getInfo());
    }

    convertSpeedLevel(speedLev) {
        // Example mapping:
        // 1 = slow, 2 = medium, 3 = fast
        if (speedLev <= 1) return 0.5;
        if (speedLev === 2) return 1.0;
        if (speedLev >= 3) return 1.5;
        return 1.0;
    }

    /* -----------------------------------------------------------
       SCORING
    ----------------------------------------------------------- */

    clearRndScore() {
        this.rndScore = 0;
    }

    addToRndScore(amt) {
        const n = Number(amt);
        this.rndScore += n;
    }

    addToSetScore(amt) {
        const n = Number(amt);
        this.setScore += n;
        this.log.push("SetScore+" + n);
    }

    getRndScore() {
        return Number(this.rndScore);
    }

    getSetScore() {
        return Number(this.setScore);
    }

    zeroRndScore() {
        this.rndScore = 0;
    }

    zeroSetScore() {
        this.setScore = 0;
    }

    /* -----------------------------------------------------------
       LOGGING
    ----------------------------------------------------------- */

    logScore(score) {
        this.log.push(score);
    }

    displayLog() {
        console.log("Player Log (" + this.name + "): " + this.log.join(", "));
    }

    /* -----------------------------------------------------------
       INFO
    ----------------------------------------------------------- */

    getName() {
        return this.name;
    }

    getScore() {
        return this.score;
    }

    getInfo() {
        let buf = "";
        buf += "\n name      = " + this.name;
        buf += "\n gradeLev  = " + this.gradeLev;
        buf += "\n zipCode   = " + this.zipCode;
        buf += "\n color     = " + this.color;
        buf += "\n altColor  = " + this.altColor;
        buf += "\n capColor  = " + this.capColor;
        buf += "\n nbr       = " + this.nbr;
        buf += "\n speedLev  = " + this.speedLev;
        buf += "\n speedFact = " + this.speedFactor;
        return buf;
    }

    sumScoreToDate() {
        return `${this.name} = ${this.getScore()}`;
    }

}
