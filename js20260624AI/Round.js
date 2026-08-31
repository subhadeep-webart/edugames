// ===========================================================
// Round.js — Clean, Modern, Safe
// ===========================================================

class Round {

    constructor(inputString) {
        console.log("Round: " + inputString);
        this.inputString = inputString;

        // Core fields
        this.serNbr = "";
        this.gameType = "";
        this.title = "";
        this.question = "";
        this.authors = "";
        this.parmString = "";
        this.roundDataArr = [];

        // Parameter map
        this.rndMap = new Map();

        // Parse immediately
        this.breakOutData(inputString);
    }

    // -------------------------------------------------------
    // Break the raw server string into fields
    // -------------------------------------------------------
    breakOutData(inputString) {

        if (!inputString || typeof inputString !== "string") {
            console.error("Round.breakOutData: invalid inputString", inputString);
            return;
        }

        // Remove trailing "|" or ",,,"
        inputString = inputString.replace(/\|$/, "");
        inputString = inputString.replace(/,+$/, "");

        // Split into array
        const arr = inputString.split(",");
        this.arr = arr; // keep raw array for debugging

        // Safety check
        if (arr.length < 20) {
            console.warn("Round.breakOutData: unexpected round format", arr);
        }

        // Extract known fields
        this.serNbr = arr[1] || "";
        this.gameType = this.serNbr.charAt(3) || "";   // G, T, M, etc.
        this.authors = arr[11] || "";
        this.title = arr[16] || "";
        this.question = arr[17] || "";
        this.parmString = arr[19] || "";

        // Parse parameters into Map
        this.setParms(this.parmString);

        // Remaining data is game‑specific
        this.roundDataArr = arr.slice(20);

        console.log("this.roundDataArr: " + this.roundDataArr);
    }

    // -------------------------------------------------------
    // Convert parmString into a Map
    // Example: "rows=4|cols=5|image=map.png"
    // -------------------------------------------------------
    setParms(parmString) {
        console.log("parmString: " + parmString);
        this.rndMap = new Map();

        if (!parmString || parmString.trim() === "") return;

        const parts = parmString.split(" ");

        for (let p of parts) {
            const [key, value] = p.split("=");
            if (key && value) {
                console.log(key + "  ---  " + value);
                this.rndMap.set(key.trim(), value.trim());
            }
        }
    }

 


    // -------------------------------------------------------
    // Safe parameter getter
    // -------------------------------------------------------
    getAParm(key) {
        if (!this.rndMap) return null;
        return this.rndMap.get(key) || null;
    }

    // -------------------------------------------------------
    // Convenience helpers for GameB modes
    // -------------------------------------------------------
    getRows() {
        return parseInt(this.getAParm("rows") || "0", 10);
    }

    getCols() {
        return parseInt(this.getAParm("cols") || "0", 10);
    }

    getImage() {
        return this.getAParm("image") || "";
    }

    getGameType() {
        // Prefer explicit parm, fallback to gameType
        return this.gameType;
    }

    getTheQuestion() {
        return this.question;
    }

    getInput() {
        return this.inputString;
    }


    getRegions() {
        // For transparent map mode
        // Expecting something like: "regions=ID:x:y:w:h|ID2:x:y:w:h"
        const raw = this.getAParm("regions");
        if (!raw) return [];

        const regions = [];
        const parts = raw.split(";");

        for (let p of parts) {
            const [id, x, y, w, h] = p.split(":");
            if (id && x && y && w && h) {
                regions.push({
                    id,
                    x: parseInt(x, 10),
                    y: parseInt(y, 10),
                    w: parseInt(w, 10),
                    h: parseInt(h, 10)
                });
            }
        }

        return regions;
    }

    getRoundDataArr() {
        return this.roundDataArr;
    }

    getImages() {
        // For multi‑image mode
        // Example: "images=img1.png,img2.png,img3.png"
        const raw = this.getAParm("images");
        console.log("getImages() raw: " + raw);
        if (!raw) return [];
        return raw.split("|").map(src => ({ id: src, src }));
    }
}
