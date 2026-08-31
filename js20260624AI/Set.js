// ===========================================================
// Set.js — Modern, Clean, Behavior‑Identical
// Handles nested subsets, instructions, webpages, comments,
// and uses your real getRndsToPlay() logic.
// ===========================================================

class Set {

    constructor(setDataString, context) {
        console.log("Set constructor START");

        this.context = context;
        this.raw = setDataString;

        // Core fields
        this.serNbr = "";
        this.title = "";
        this.authors = "";
        this.description = "";

        // Round serial numbers
        this.roundSerials = [];

        // Current round index
        this.currentIndex = 0;

        // Parse the Set text
        this.parse(setDataString);

        console.log("Set constructor END");

        // ❌ IMPORTANT: DO NOT auto-start the game here
        // this.playNextRnd();   <-- REMOVE THIS LINE COMPLETELY
    }



    // -------------------------------------------------------
    // Normalize commas (your legacy helper)
    // -------------------------------------------------------
    deComma(str) {
        return str.replace(/,,+/g, ",");
    }

    // -------------------------------------------------------
    // Parse the Set header + recursively process entries
    // -------------------------------------------------------
    async parse(input) {

        input = this.deComma(input);
        console.log("set input:" + input);
        const tempArr = Array.isArray(input) ? input : input.split(",");

        for (let i = 0; i < tempArr.length; i++) {
                console.log(i + " tempArr " + tempArr[i]);
        }


            // Header fields
            this.setSerNbr = tempArr[0];
            this.creationDate = tempArr[1];
            this.setData = tempArr[2];
            this.stats = tempArr[4];
            this.codes = tempArr[5];
            this.authors = tempArr[6];

            this.rndArr = [];

            // Helper to normalize getRndsToPlay output
            const normalizeList = (v) => {
                if (!v) return [];
                if (Array.isArray(v)) return v;
                return [v];
            };

            // ---------------------------------------------------
            // Recursive processor for a single Set entry
            // ---------------------------------------------------
            const processItem = async (item) => {

                if (!item || item.length < 3) return;

                item = item.trim();
                const parts = item.split(";");
                const type = parts[0];

                // -----------------------------
                // CASE 1: Nested Set
                // -----------------------------
                if (type === "Set") {

                    const inst = item;          // full instruction string
                    const subSetSerNbr = parts[1];

                    const url = `https://www.edugames.com/cgi-bin/GetASetTSD.pl?${subSetSerNbr}`;
                    console.log(`Processing nested set ${subSetSerNbr}`);

                    try {
                        const resp = await fetch(url);
                        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

                        let text = await resp.text();
                        text = this.deComma(text);

                        const subsetArr = text.split(",");

                        // Subset rounds begin at index 9
                        const subsetRounds = subsetArr.slice(9);

                        // Use your real selection logic
                        let selected = this.getRndsToPlay(inst, subsetRounds);
                        selected = normalizeList(selected);

                        // Recursively process each selected item
                        for (const sel of selected) {
                            await processItem(sel);
                        }

                    } catch (err) {
                        console.error(`Failed to load subset ${subSetSerNbr}:`, err);
                    }

                    return;
                }

                // -----------------------------
                // CASE 2: Round
                // -----------------------------
                if (type === "Rnd") {
                    this.rndArr.push(item);
                    return;
                }

                // -----------------------------
                // CASE 3: Comment, WebPage, Instruction
                // You can choose to store or ignore them.
                // For now, we ignore them in final rndArr.
                // -----------------------------
                if (type === "Cmt" || type === "WPg" || type === "Ins") {
                    // You may store them if needed
                    return;
                }

                // Unknown type → ignore
            };

            // ---------------------------------------------------
            // Process all entries starting at index 9
            // ---------------------------------------------------playNextRnd();
            for (let i = 9; i < tempArr.length; i++) {
                const entry = tempArr[i];
                await processItem(entry);
            }

        this.rndcount = this.rndArr.length;

        console.log(" this.rndcount" + this.rndcount);

        for (let i = 0; i < this.rndArr.length; i++) {
            console.log(i + " this.rndArr" + this.rndArr[i]);
        }

            //console.log("Final rndArr:", this.rndArr);
        //this.playNextRnd();
            //console.log("Final rndArr:", this.rndArr);
        }
    

    // -------------------------------------------------------
    // Your EXACT getRndsToPlay() logic (unchanged)
    // -------------------------------------------------------
    getRndsToPlay(inst, newSetRndArr) {
        console.log("getRndsToPlay inst= " + inst + "\n\n newSetRndArr=  " + newSetRndArr);
        listItemsInArr(newSetRndArr, "*top*", 0, 40, true);
        let returnArr = [];
        const instMap = new Map();
        const instArr = inst.split(":")
        listItemsInArr(instArr, "*instArr* ", 0, 40, true);

        for (let i = 0; i < instArr.length; i++) {
            if (instArr[i] == "") continue;
            const arrA = instArr[i].split("=")
            instMap.set(arrA[0], arrA[1]);
        }

        const nbrRndsToPlay = instMap.get("NbrRndsToPlay");
        const sortBy = instMap.get("SortBy");
        const selectBy = instMap.get("SelectBy");

        let headerComment = "";
        const type = newSetRndArr[0].substring(0, 3);

        if (type == "Cmt" || type == "WPg") {
            headerComment = newSetRndArr[0];
        }

        for (let i = 0; i < newSetRndArr.length; i++) {
            if (newSetRndArr[i].substring(0, 3) == "Rnd") {
                returnArr.push(newSetRndArr[i]);
            }
        }

        if (sortBy == "Difficulty") {
            returnArr = this.sortRndsBydifficulty(returnArr);
        }

        let zoneBreakDown = instMap.get("ZoneBreakDown");

        if (zoneBreakDown == undefined) {
            if (headerComment != "") returnArr.unshift(headerComment);
            return returnArr;
        }

        let zoneArr = [];
        let nbrOfZones = 1;

        if (zoneBreakDown.slice(-1) == ".") {
            zoneBreakDown = zoneBreakDown.slice(0, -1);
        }

        if (zoneBreakDown.indexOf(".") != -1) {
            zoneArr = zoneBreakDown.split(".")
            nbrOfZones = zoneArr.length;
        }

        if (nbrOfZones == 1) {
            const nbrToReturn = Number(zoneBreakDown);
            newSetRndArr.sort(() => Math.random() - 0.5);
            returnArr = newSetRndArr.slice(0, nbrToReturn)
            if (headerComment != "") returnArr.unshift(headerComment);
            return returnArr;
        }

        const nbrOfRnds = newSetRndArr.length;
        const nbrOfRndPerZone = nbrOfRnds / nbrOfZones;
        const finalArr = [];
        let pointer = 0;

        for (let i = 0; i < nbrOfZones; i++) {
            const nbrInThisArr = zoneArr[i];
            const tempArr = newSetRndArr.slice(pointer, pointer + nbrOfRndPerZone);
            tempArr.sort(() => Math.random() - 0.5);
            for (let j = 0; j < nbrInThisArr; j++) {
                finalArr.push(tempArr.shift())
            }
            pointer += nbrOfRndPerZone;
        }

        if (headerComment != "") finalArr.unshift(headerComment);
        return finalArr;
    }

    // -------------------------------------------------------
    // Optional: difficulty sorter (your original)
    // -------------------------------------------------------
    sortRndsBydifficulty(arr) {
        // Keep your original implementation
        return arr;
    }
    // ===========================================================
    // Modern playNextRnd()
    // Called after Set.rndArr is fully built
    // ===========================================================

    async playNextRnd() {
        console.log("Set: GameContext.ui.bidButs =", GameContext.ui.bidButs);
        // If no rounds left, end the set
        if (!this.rndArr || this.rndArr.length === 0) {
            console.warn("Set.playNextRnd: No rounds available");
            return;
        }

        // Track current index (initialize if missing)
        if (this.currentIndex == null) this.currentIndex = 0;

        // If we've played all rounds, stop
        if (this.currentIndex >= this.rndArr.length) {
            console.log("Set.playNextRnd: End of Set");
            return;
        }

        // -------------------------------------------------------
        // 1. Extract the next Rnd entry
        // Example entry: "Rnd;AA.Len00228;1;10;100;0;US/State Capitals;..."
        // -------------------------------------------------------
        const entry = this.rndArr[this.currentIndex];
        console.log("Set.playNextRnd: entry =", entry);

        const parts = entry.split(";");
        if (parts[0] !== "Rnd") {
            console.error("Set.playNextRnd: Expected Rnd entry, got:", parts[0]);
            this.currentIndex++;
            return this.playNextRnd(); // skip non-rounds
        }

        // Round serial number is ALWAYS parts[1]
        const roundSerNbr = parts[1];
        console.log("Loading Round:", roundSerNbr);

        // -------------------------------------------------------
        // 2. Download the Round (REAL URL)
        // -------------------------------------------------------
        const url = `https://www.edugames.com/cgi-bin/GetARoundTSD.pl?${roundSerNbr}`;

        console.log("url:"  + url);

        let roundText = "";
        try {
            const resp = await fetch(url);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            roundText = await resp.text();

            console.log("roundText:" + roundText);

        } catch (err) {
            console.error("Failed to load Round:", err);
            this.currentIndex++;
            return this.playNextRnd(); // skip and continue
        }

        // -------------------------------------------------------
        // 3. Create Round object
        // -------------------------------------------------------
        const aRound = new Round(roundText);

        // -------------------------------------------------------
        // 4. Create the correct GameB mode
        // -------------------------------------------------------
        const gameType = aRound.getGameType();   // G, T, M, etc.

        console.log(" Set gameType:" + gameType);

        let game = null;

        switch (gameType) {
            case "A":
                this.itfType = "X";
                game = new GameA(aRound, this.context);
                break;
            case "B":
                this.itfType = "B";
                game = new GameB(aRound, this.context);
                break;
            case "C":
                this.itfType = "B";
                game = new GameC(aRound, this.context);
                break;
            case "D":
                this.itfType = "D";
                game = new GameD(aRound, this.context);
                break;
            case "E":
                this.itfType = "B";
                game = new GameE(aRound, this.context);
                break;
            case "I":
                this.itfType = "I";
                game = new GameI(aRound, this.context);
                break;
            case "L":
                this.itfType = "D";
                game = new GameL(aRound, this.context);
                break;
            case "M":
                this.itfType = "B";
                game = new GameM(aRound, this.context);
                break;
            case "N":
                this.itfType = "D";
                game = new GameN(aRound, this.context);
                break;
            case "O":
                this.itfType = "B";
                game = new GameO(aRound, this.context);
                break;
            case "P":
                this.itfType = "B";
                game = new GameP(aRound, this.context);
                break;
            case "Q":
                this.itfType = "B";
                game = new GameQ(aRound, this.context);
                break;
            case "U":
                this.itfType = "B";
                game = new GameU(aRound, this.context);
                break;
            case "X":
                this.itfType = "X";
                game = new GameX(aRound, this.context);
                break;
            default:
                this.itfType = "X";
                break;
        }
        console.log(" Bottom (game == null)" + (game == null));

        // -------------------------------------------------------
        // 5. Start the game
        // -------------------------------------------------------
        game.init();

        // -------------------------------------------------------
        // 6. Advance to next round for future calls
        // -------------------------------------------------------
        this.currentIndex++;
    }

}
