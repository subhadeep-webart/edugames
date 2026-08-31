class Player {

    constructor(playerInfo, color, altColor, capColor, nbr) {
        console.log("Player created:", playerInfo);

        this.color = color;
        this.altColor = altColor;
        this.capColor = capColor;

        this.nbr = Number(nbr);
        this.zipCode = "";
        this.gradeLev = "";
        this.speedLev = "";

        this.rndScore = 0;
        this.setScore = 0;
        this.totalScore = 0;

        this.log = [];

        this.procPlayerInfo(playerInfo);
    }

    // ------------------------------------------------------------
    // INITIALIZATION
    // ------------------------------------------------------------
    procPlayerInfo(playerInfo) {
        const arr = playerInfo.split(";");

        this.nbr = Number(arr[0]);
        this.name = arr[1];
        this.zipCode = arr[2];
        this.gradeLev = arr[3];
        this.speedLev = arr[4];

        // Register speed with BidButs
        bidButs.setPlayerSpeedFacs(this.nbr, this.speedLev);
    }

    // ------------------------------------------------------------
    // SCORE MANAGEMENT
    // ------------------------------------------------------------
    clearRndScore() {
        this.rndScore = 0;
    }

    clearSetScore() {
        this.setScore = 0;
    }

    addToRndScore(amt) {
        this.rndScore += Number(amt);
    }

    addToSetScore(amt) {
        this.setScore += Number(amt);
        this.logScore(amt);
    }

    getRndScore() {
        return Number(this.rndScore);
    }

    getSetScore() {
        return Number(this.setScore);
    }

    // ------------------------------------------------------------
    // LOGGING
    // ------------------------------------------------------------
    logScore(amt) {
        this.log.push({
            amount: amt,
            time: Date.now()
        });
    }

    displayLog() {
        console.log("Player Log:", this.name, this.log);
    }

    // ------------------------------------------------------------
    // INFO HELPERS
    // ------------------------------------------------------------
    getName() {
        return this.name;
    }

    getInfo() {
        return `
        name:      ${this.name}
        gradeLev:  ${this.gradeLev}
        zipCode:   ${this.zipCode}
        color:     ${this.color}
        altColor:  ${this.altColor}
        capColor:  ${this.capColor}
        nbr:       ${this.nbr}
        speedLev:  ${this.speedLev}
        `;
    }
}
