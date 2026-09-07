// ===========================================================
// PlayerLineUp.js — Clean, Modern, No Globals
// Parses regData from index.html and exposes player + set info
// ===========================================================

class PlayerLineUp {

    constructor(regDataString) {
        console.log("PlayerLineUp constructor START");
        this.raw = regDataString;
        console.log("plu  reg "  + regDataString);
        this.bidTime = 30;

        this.leftName = "";
        this.leftZip = "";
        this.leftGrade = "";
        this.leftSpeed = "";

        this.rightName = "";
        this.rightZip = "";
        this.rightGrade = "";
        this.rightSpeed = "";

        this.singlePlayer = false;
        this.setSerialNumber = "";

        this.parse(regDataString);
        console.log("PlayerLineUp constructor END");
    }

    parse(str) {
        if (!str) {
            console.error("PlayerLineUp.parse: empty regData");
            return;
        }

        // Split on pipes first
        const pipeParts = str.split("|");

        // -----------------------------------------
        // PART 0: bidTime
        // -----------------------------------------
        this.bidTime = parseInt(pipeParts[0], 10);

        // -----------------------------------------
        // PART 1: "0;p0;z0;g0;s0"
        // -----------------------------------------
        const leftParts = pipeParts[1].split(";");

        this.leftName = leftParts[1] || "";
        this.leftZip = leftParts[2] || "";
        this.leftGrade = leftParts[3] || "";
        this.leftSpeed = leftParts[4] || "";

        // -----------------------------------------
        // PART 2: "1;p1;z1;g1;s1,FromReg,singlePlayer,setSerNbr,"
        // -----------------------------------------
        const rightAndTail = pipeParts[2].split(",");

        const rightParts = rightAndTail[0].split(";");

        this.rightName = rightParts[1] || "";
        this.rightZip = rightParts[2] || "";
        this.rightGrade = rightParts[3] || "";
        this.rightSpeed = rightParts[4] || "";

        // Tail fields
        // rightAndTail[1] = "FromReg"
        this.singlePlayer = (rightAndTail[2] === "1" || rightAndTail[2] === "true");
        this.setSerialNumber = rightAndTail[3] || "";

        console.log("PlayerLineUp parsed:", this);
    }

    applyToContext(context) {

        // ⭐ THE FIX ⭐
        context.playerLineUp = this;

        console.log("plu applyToContext TOP: (context.players == null) " + (context.players == null));
        context.players.left.name = this.leftName;

        console.log("plu applyToContext TOP: (context.players.left.name == null) " + (context.players.left.name == null));

        context.players.right.name = this.rightName;

        context.players.left.zip = this.leftZip;
        context.players.right.zip = this.rightZip;

        context.players.left.grade = this.leftGrade;
        context.players.right.grade = this.rightGrade;

        context.players.left.speedLev = this.leftSpeed;
        context.players.right.speedLev = this.rightSpeed;

        context.state.singlePlayer = this.singlePlayer;
        context.state.bidTime = this.bidTime;

        console.log("plu applyToContext Bottom: (context.players == null) " + (context.players == null));
    }


    registerDOM() {
        this.playerTF0 = document.getElementById("player0");
        this.playerTF1 = document.getElementById("player1");
    }

    /* -----------------------------------------------------------
       PLAYER REGISTRATION
    ----------------------------------------------------------- */

    registerPlayer(dataCSV) {
        const pArr = dataCSV.split(",");
        pArr.push(this.color[this.pMax]);
        pArr.push(this.altColor[this.pMax]);
        pArr.push(this.HTMLColor[this.pMax]);

        const aPlayer = new Player(pArr);
        this.players.push(aPlayer);

        if (this.pLtr.length === 0) {
            this.pNameL = aPlayer.name;
            this.pLtr.push("L");
        } else {
            this.pNameR = aPlayer.name;
            this.pLtr.push("R");
        }

        this.pMax++;
    }

    setPlayerNames(playerInfo) {
        const arr = playerInfo.split("|");

        const playerLeft = new Player(arr[1], this.color[0], this.altColor[0], this.HTMLColor[0], "0");
        const playerRight = new Player(arr[2], this.color[1], this.altColor[1], this.HTMLColor[1], "1");

        this.players.push(playerLeft);
        this.players.push(playerRight);

        if (this.playerTF0) this.playerTF0.textContent = playerLeft.name;
        if (this.playerTF1) this.playerTF1.textContent = playerRight.name;

        this.setLog.push(playerInfo);
    }

    /* -----------------------------------------------------------
       ROUND LOGGING AND SCORING
    ----------------------------------------------------------- */

    logPlay(pNbr, pf, pts, bonusPts, gameLog) {
        const q = this.context.state.theQuestion;
        const ser = this.context.state.rndSerNbr;

        this.theQuestionforEachRound.push(q);
        this.theRndSerNbrForEachRound.push(ser);

        this.bonusPts = bonusPts;
        this.attemptThisRound += 1;

        if (pf === "passed") {
            if (pNbr === 0) {
                this.rndScorePlayer0 += pts + bonusPts;
            } else {
                this.rndScorePlayer1 += pts + bonusPts;
            }
        } else {
            if (pNbr === 1) {
                this.rndScorePlayer0 += pts;
                this.rndScorePlayer0FmPlayer1 += pts;
            } else {
                if (this.context.mode.singlePlayer) {
                    this.singlePlayerPointLoss += pts;
                    this.rndScorePlayer0 -= (pts + bonusPts);
                } else {
                    this.rndScorePlayer1 += pts;
                    this.rndScorePlayer1FmPlayer0 += pts;
                }
            }
        }
    }

    addRndScoreToSet() {
        const q = this.context.state.theQuestion;
        const maxPts = this.context.settings.maxPoints;

        const p0 = this.rndScorePlayer0;
        const p1 = this.rndScorePlayer1;

        let winner = this.players[0].name;
        if (p1 > p0) winner = this.players[1].name;

        let buf = q + ";" + maxPts + ";";
        buf += winner + ";";
        buf += p0 + "/" + this.rndScorePlayer0FmPlayer1 + ";";
        buf += p1 + "/" + this.rndScorePlayer1FmPlayer0;

        this.setLog.push(buf);

        this.cumGamePts += maxPts;
        this.cumPtsP0 += p0;
        this.cumPtsP1 += p1;
        this.cumPtsP0fmP1 += this.rndScorePlayer0FmPlayer1;
        this.cumPtsP1fmP0 += this.rndScorePlayer1FmPlayer0;

        this.zeroRoundScores();
    }

    zeroRoundScores() {
        const maxPts = this.context.settings.maxPoints;

        this.setPointTotal += maxPts;

        this.setScorePlayer0 += this.rndScorePlayer0;
        this.setScorePlayer1 += this.rndScorePlayer1;
        this.setScorePlayer0FmPlayer1 += this.rndScorePlayer0FmPlayer1;
        this.setScorePlayer1FmPlayer0 += this.rndScorePlayer1FmPlayer0;

        this.rndScorePlayer0 = 0;
        this.rndScorePlayer1 = 0;
        this.rndScorePlayer0FmPlayer1 = 0;
        this.rndScorePlayer1FmPlayer0 = 0;
        this.attemptThisRound = 0;

        this.lastRoundPoints = maxPts;
    }

    /* -----------------------------------------------------------
       SET ENDING AND GAME OVER
    ----------------------------------------------------------- */

    getWinner() {
        const p0 = Math.round(this.players[0].getSetScore());
        const p1 = Math.round(this.players[1].getSetScore());

        if (p0 > p1) return this.players[0].name;
        if (p1 > p0) return this.players[1].name;
        return "Tie";
    }

    gatherDataAndGoToGameOver() {
        if (this.endDataCollected) return;

        const score0 = Math.round(this.players[0].getSetScore());
        const score1 = Math.round(this.players[1].getSetScore());
        const winner = this.getWinner();

        let buf = "The winner of Set SerNbr [" +
            this.context.state.currentSet.setSerNbr + "] is ";

        if (winner === "Tie") {
            buf += "a tie with both players scoring " + score0;
        } else {
            const loser = (winner === this.players[0].name)
                ? this.players[1].name
                : this.players[0].name;

            const winScore = (winner === this.players[0].name) ? score0 : score1;
            const loseScore = (winner === this.players[0].name) ? score1 : score0;

            buf += winner + " with a score of " + winScore +
                " and the loser is " + loser +
                " with a score of " + loseScore;
        }

        let bufSet = "Set totals;";
        bufSet += this.cumGamePts + ";";
        bufSet += winner + ";";
        bufSet += this.cumPtsP0 + ";";
        bufSet += this.cumPtsP0fmP1 + ";";

        if (this.context.mode.singlePlayer) {
            bufSet += "singlePlayer;";
        } else {
            bufSet += this.cumPtsP1 + ";";
            bufSet += this.cumPtsP1fmP0;
        }

        this.setLog.push(bufSet);

        this.setLog.unshift(
            this.context.state.currentSet.setSerNbr + ";" +
            winner + ";" + score0 + ";" + score1 + ";" + buf
        );

        this.endDataCollected = true;

        localStorage.setItem("gameResults", this.setLog);
        window.location.href = "GameOver.html";
    }

    /* -----------------------------------------------------------
       MULTI‑PLAYER EVALUATION (used by some game types)
    ----------------------------------------------------------- */

    evalMultiPlayers(scoreArray, maxPossible) {
        const pCnt = scoreArray.length;
        let max = -1;
        let min = 9999;

        const playerScores = [];
        let bufPlayerScores = "";

        for (let i = 0; i < pCnt; i++) {
            const score = scoreArray[i];
            playerScores.push({ name: this.players[i].name, score: score });
            bufPlayerScores += this.players[i].name + ":" + score + "\n";

            if (score > max) max = score;
            if (score < min) min = score;
        }

        const tieArray = [];
        for (let i = 0; i < pCnt; i++) {
            if (scoreArray[i] === max) tieArray.push(this.players[i].name);
        }

        const tieCount = tieArray.length;
        let buf = "";

        if (tieCount === 1) {
            buf += "The winner is " + tieArray[0] +
                " with " + max + " correct out of " + maxPossible + ".";
        } else if (tieCount === 2) {
            buf += "There was a tie between " + tieArray[0] +
                " and " + tieArray[1] + ".";
        } else if (tieCount === 3) {
            buf += "There was a three‑way tie between " +
                tieArray[0] + ", " + tieArray[1] + ", and " + tieArray[2] + ".";
        } else if (tieCount === 4) {
            buf += "There was a four‑way tie.";
        }

        if (tieCount > 1) {
            buf += "\nEach got " + max + " right out of " + maxPossible + ".";
        }

        return [
            buf,
            bufPlayerScores,
            "MaxPossible:" + maxPossible +
            ",maxRight:" + max +
            ",minRight:" + min
        ];
    }

}
