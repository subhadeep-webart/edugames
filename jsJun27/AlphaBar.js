class AlphaBar {
    constructor() {
        console.log("AlphaBar constructor");

        this.rightAns = "";
        this.playerAnswering = 0;

        this.alphaLeft = null;
        this.alphaRight = null;

        this.dropDownMenuLeft = null;
        this.dropDownMenuRight = null;
        this.dropDownMenuInUse = null;

        this.ansLstFileDotPath = "";
        this.ansLstIndex = [];
        this.ansLst = [];

        this.playDetails = [];
        this.playerHasPlay = false;
        this.bidTime = 15;

        this.init();
    }

    init() {
        console.log("AlphaBar.init");
        this.placeButsLR();
        this.createButtonEventListeners();
        this.hideAlphaButtons(0);
        this.hideAlphaButtons(1);
        this.showAlphaButtons();
        this.addSelectionListener();
    }

    // ---------------- DATA LOADING ----------------

    loadData(ansLstFileDotPath, rightAns) {
        console.log("AlphaBar.loadData", ansLstFileDotPath, rightAns);
        this.rightAns = rightAns;
        this.ansLstFileDotPath = ansLstFileDotPath;
        this.downloadAnsLst(ansLstFileDotPath);
    }

    downloadAnsLst(ansLstFileDotPath) {
        console.log("AlphaBar.downloadAnsLst", ansLstFileDotPath);
        const theFilePath = getTextFile(ansLstFileDotPath);
        console.log("theFilePath", theFilePath);

        if (onNet) {
            fetch(theFilePath)
                .then(response => response.text())
                .then(data => {
                    this.separateTheAnsLst(data);
                });
        } else {
            const data = cp.ansButtons.getData(cp.rndSerNbr);
            const twoParts = data.split("|");
            const header = twoParts[0].split(",");
            this.ansLstIndex = header.slice(5);
            this.ansLst = twoParts[1].split(",");
        }
    }

    separateTheAnsLst(data) {
        this.ansLst = data.split("\n");
        this.ansLst.shift(); // first line
        this.ansLst.shift(); // second line
        this.ansLst.shift(); // third line
        this.ansLst.shift(); // copyright
        this.ansLstIndex = this.ansLst.shift().slice(5).split(",");
    }

    // ---------------- BUTTON / UI SETUP ----------------

    placeButsLR() {
        console.log("AlphaBar.placeButsLR");

        for (let j = 0; j < 2; j++) {
            let buf = "<table><tr><td>";

            if (singlePlayerMode && j === 0) {
                buf += `<input type='button' id='-IGiveup' onclick='abp.playerGivesUp()' class='alphaBut' value='-I Give Up'>`;
            }

            for (let i = 0; i < 26; i++) {
                const aLtr = String.fromCharCode(65 + i);
                const butLtr = "but" + j + aLtr;
                buf += `<input type='button' id='${butLtr}' class='alphaBut${j}' value='${aLtr}'>`;
                if (i === 8 || i === 17) {
                    buf += "</td></tr><tr><td>";
                }
            }

            buf += "</td></tr></table>";

            if (j === 0) {
                buf += `<select name='aBarDropDownLeft' id='dropDownMenuLeft' style='display:none;' value='Select Answer'>`;
            } else {
                buf += `<select name='aBarDropDownRight' id='dropDownMenuRight' style='display:none;' value='Select Answer'>`;
            }

            buf += `<option value="No selection">ANSWER GOES HERE</option>`;
            buf += `<div id='butLine'></div>`;

            const iPt = "insrtpt" + j + "Y";
            //const insrtPt = document.getElementById(iPt);

            const insrtPt = (j === 0)
                ? document.getElementById("alphaBarInsrtPtLeft")
                : document.getElementById("alphaBarInsrtPtRight");
/*
            if (j === 0) {
                this.alphaLeft = insrtPt;
            } else {
                this.alphaRight = insrtPt;
            }*/

            insrtPt.innerHTML = insrtPt.innerHTML + buf;
        }

        this.dropDownMenuLeft = document.getElementById("dropDownMenuLeft");
        this.dropDownMenuRight = document.getElementById("dropDownMenuRight");
    }

    createButtonEventListeners() {
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 26; i++) {
                const aLtr = String.fromCharCode(65 + i);
                const butLtr = "but" + j + aLtr;
                const el = document.getElementById(butLtr);
                if (!el) continue;

                el.addEventListener("click", () => {
                    console.log("AlphaBar letter clicked", butLtr);
                    this.loadLstIntoDropDown(butLtr);
                });
            }
        }
    }

    addSelectionListener() {
        console.log("AlphaBar.addSelectionListener");
        // dropdown change handled in loadLstIntoDropDown
    }

    // ---------------- SHOW / HIDE ----------------

    showAlphaButtons() {
        if (this.alphaLeft) this.alphaLeft.style.display = "block";
        if (this.alphaRight) this.alphaRight.style.display = "block";
    }

    hideAlphaButtons(side) {
        console.log("AhideAlphaButtons ", side);
        if (side === 0 || side === "left") {
            if (this.alphaBarInsrtPtRight) this.alphaBarInsrtPtRight.style.display = "none";
        } else {
            if (this.alphaBarInsrtPtLeft) this.alphaBarInsrtPtLeft.style.display = "none";
        }
    }

    hideDropDownMenus() {
        if (this.dropDownMenuLeft) this.dropDownMenuLeft.style.display = "none";
        if (this.dropDownMenuRight) this.dropDownMenuRight.style.display = "none";
    }

    resetDropDownMenus() {
        if (this.dropDownMenuLeft) {
            this.dropDownMenuLeft.style.display = "none";
            this.dropDownMenuLeft.innerHTML = "<option value='No selection'>Select Answer</option>";
        }
        if (this.dropDownMenuRight) {
            this.dropDownMenuRight.style.display = "none";
            this.dropDownMenuRight.innerHTML = "<option value='No selection'>Select Answer</option>";
        }
    }

    removeAnswerMenus() {
        const el0 = document.getElementById("aBarDropDownMenu0");
        if (el0) el0.remove();
        const el1 = document.getElementById("aBarDropDownMenu1");
        if (el1) el1.remove();
    }

    clearTheAnsLst(el) {
        const nbrOfItems = el.options.length - 1;
        for (let i = nbrOfItems; i >= 0; i--) {
            el.remove(i);
        }
    }

    // ---------------- ANSWER LIST / DROPDOWN ----------------

    loadLstIntoDropDown(butLtr) {
        console.log("AlphaBar.loadLstIntoDropDown", butLtr);

        if (cp.itf.gameOver) return;

        if (!this.playerHasPlay) {
            this.bidTime = bidButs.getTimeForGameLND();
            startGameLNDTimer(this.bidTime);
            this.playerHasPlay = true;
        }

        pausePanelRemoval();

        const rl = Number(butLtr.charAt(3)); // 0 or 1
        if (rl === 1) {
            this.hideAlphaButtons("left");
        } else {
            this.hideAlphaButtons("right");
        }

        this.playerAnswering = rl;

        let el = (rl === 0 ? this.dropDownMenuLeft : this.dropDownMenuRight);
        if (!el) return;

        this.dropDownMenuInUse = el.id;
        this.clearTheAnsLst(el);

        const indexNbrs = butLtr.charCodeAt(4) - 65;
        const xx = this.ansLstIndex[indexNbrs];
        const thePointer = xx.split(" ");
        const startPnt = Number(thePointer[1] - 2);
        const numberOfItems = Number(thePointer[2]);

        const alphaAnsLst = [];

        if (numberOfItems > 0) {
            const endPoint = startPnt + numberOfItems;
            const theLtr = this.ansLst[startPnt].charAt(0);
            alphaAnsLst.push("All answers that start with: " + theLtr);
            for (let i = startPnt; i < endPoint; i++) {
                alphaAnsLst.push(this.ansLst[i]);
            }
            alphaAnsLst.push("----");
            alphaAnsLst.push("----");
            alphaAnsLst.push("-- --");
        } else {
            alphaAnsLst.push("No answers for letter " + butLtr);
        }

        alphaAnsLst.forEach(a => {
            const opt = document.createElement("option");
            opt.value = a;
            opt.innerHTML = a;
            el.appendChild(opt);
        });

        el.style.display = "block";
        el.focus();

        el.addEventListener("change", () => {
            const selection = el.value;
            this.checkAnswer(selection);
        });
    }

    // ---------------- ANSWER CHECKING / GAME FLOW ----------------

    checkAnswer(ans) {
        console.log("AlphaBar.checkAnswer", ans, "rightAns =", this.rightAns);

        this.playerHasPlay = false;
        this.proposedAns = ans;

        cp.itf.setPlayerUp(this.playerAnswering);
        this.timeToAnswer = stopGameLNDTimer();
        this.logPlay(ans);

        const arr = ans.split("_");
        if (arr.length > 1) ans = arr[1];

        if (this.rightAns === ans) {
            cp.itf.displayPtsThisPlay("passed", "Got it Right");
            this.endGame(false);
            if (theGameInPlay !== undefined && cp.itf.theGameInPlay) {
                cp.itf.theGameInPlay.setGameOver();
            }
        } else {
            this.deleteAllAnswers();
            this.showAlphaButtons();
            cp.itf.displayPtsThisPlay("failed", "Sorry Wrong Answer");
            unPausePanelRemoval();
        }

        this.resetDropDownMenus();
    }

    deleteAllAnswers() {
        const ansBar = document.getElementById("ansBar");
        if (ansBar) ansBar.innerHTML = "";
    }

    logPlay(ans) {
        this.playDetails.push(cp.rndSerNbr + "|" + ans + "," + gameI.getButCount());
        logRoundPlay(this.playDetails);
    }

    endGame(gaveUp) {
        console.log("AlphaBar.endGame", gaveUp);

        if (gaveUp) {
            cp.itf.displayPtsThisPlay("failed", "You Gave Up and got -10 Points");
        }

        cp.theGameInPlay.hideAllButs();
        stopThePlayClock();
        stopPanelRemoval();
        gameI.removeAllButs();
        hideAlphaButtons();
        qBox.textContent = qBox.textContent + "\nThe Correct Answer is: " + this.rightAns;
        enableAnsBut();
        enableNextRndBut();
        stopThePlayClock("End of Play");
    }

    playerGivesUp() {
        console.log("AlphaBar.playerGivesUp");
        cp.itf.displayPtsThisPlay("failed", "You Gave Up");
        this.endGame(true);
        stopThePlayClock("End of Play");
    }

    // ---------------- CLEANUP ----------------

    cleanUp() {
        console.log("AlphaBar.cleanUp");
        hideAlphaButtons();
        this.removeAnswerMenus();
        this.resetDropDownMenus();
        this.hideDropDownMenus();
    }

    setRightAns(rightAns) {
        this.rightAns = rightAns;
    }
}
