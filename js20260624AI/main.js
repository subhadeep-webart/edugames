

console.log(" Top of Main ")

window.onload = async function () {

    // 1. Load registration data
    const regData = localStorage.getItem("regData");

    // 2. Create PlayerLineUp
    const plu = new PlayerLineUp(regData);

    plu.applyToContext(GameContext);

    console.log("main GameContext.plu == null = " + (GameContext.plu == null));
    if (GameContext.plu) {
        console.log("Game GameContext.plu.players == null = " + (GameContext.plu.players == null));
    }
    
    console.log("main GameContext.playerLineUp == null = " + (GameContext.playerLineUp == null));
    if (GameContext.playerLineUp) {
        console.log("main GameContext.playerLineUp.players == null = " + (GameContext.playerLineUp.players == null));
    }


    // 3. Download Set
    const setSerNbr = plu.setSerialNumber;
    const url = `https://www.edugames.com/cgi-bin/GetASetTSD.pl?${setSerNbr}`;

    console.log("Main url=  " + url);

    const resp = await fetch(url);
    const setText = await resp.text();

    // 4. Create Set (DO NOT auto-start)
    const set = new Set(setText, GameContext);

    // 5. NOW start the first round
    set.playNextRnd();
};

/*
window.onload = async function () {

    console.log("Top of Main");

    // GameContext already exists from GameContext.js
    // UI already exists from script.js + GamePanel.html
    // DO NOT recreate them here.

    // 1. Load registration data
    const regData = localStorage.getItem("regData");
    if (!regData) {
        console.error("No regData found");
        return;
    }

    // 2. Initialize PlayerLineUp
    const plu = new PlayerLineUp(regData);
    plu.applyToContext(GameContext);

    // 3. Download the Set
    const setSerNbr = plu.setSerialNumber;
    const url = `https://www.edugames.com/cgi-bin/GetASetTSD.pl?${setSerNbr}`;

    let setText = "";
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        setText = await resp.text();
    } catch (err) {
        console.error("Failed to load Set:", err);
        return;
    }

    // 4. Create Set (this triggers playNextRnd)
    const set = new Set(setText, GameContext);
};
*/




function createGameForRound(round) {
    console.error("createGameForRound:"  + round);

    const type = round.getGameType();   // e.g., "B", "X", "G", "T"

    switch (type) {

        case "B":
            return new GameB(round, GameContext);

        case "X":
            return new BoxGame(round, GameContext);

        // If you add more game types later, put them here:
        // case "M": return new GameM(round, GameContext);

        default:
            return new Game(round, GameContext);
    }
}

// ===========================================================
// 4. Wire up top‑level UI buttons
// ===========================================================

// Start Play button
const startBtn = document.getElementById("startBtn");
if (startBtn) {
    startBtn.onclick = function () {
        game.startPlay();
    };
}

// Next Round button
const nextRoundBtn = document.getElementById("nextRoundBtn");
if (nextRoundBtn) {
    nextRoundBtn.onclick = function () {

        // Load next round
        currentRound = new Round();   // or however you fetch the next round

        // Create new game object
        game = createGameForRound(currentRound);

        // Initialize it
        game.init();
    };
}
