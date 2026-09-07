// ===========================================================
// BidButs.js — Modernized, No Globals
// ===========================================================

class BidButs {

    constructor(context) {
        this.context = context;

        // UI references
        this.ui = context.ui;

        // Bidding state
        this.bidding = {
            active: false,
            seconds: 30,
            timerId: null
        };

        // Build buttons immediately
        this.createButtons();
    }

    // -------------------------------------------------------
    // Create the bid buttons for both players
    // -------------------------------------------------------
    createButtons() {

        // Left player buttons
        this.ui.insrtpt0X.innerHTML = this.makeBidButtonHTML("L", "X");
        this.ui.insrtpt0Y.innerHTML = this.makeBidButtonHTML("L", "Y");

        // Right player buttons
        this.ui.insrtpt1X.innerHTML = this.makeBidButtonHTML("R", "X");
        this.ui.insrtpt1Y.innerHTML = this.makeBidButtonHTML("R", "Y");

        // Attach handlers
        this.attachHandlers();
    }

    // -------------------------------------------------------
    // Build HTML for a single bid button
    // -------------------------------------------------------
    makeBidButtonHTML(side, type) {
        return `
            <button class="bidBtn" data-side="${side}" data-type="${type}">
                ${side}-${type}
            </button>
        `;
    }

    // -------------------------------------------------------
    // Attach click handlers to all bid buttons
    // -------------------------------------------------------
    attachHandlers() {
        const buttons = document.querySelectorAll(".bidBtn");

        buttons.forEach(btn => {
            btn.onclick = () => {
                const side = btn.dataset.side;
                const type = btn.dataset.type;
                this.processBid(side, type);
            };
        });
    }

    // -------------------------------------------------------
    // Handle a bid click
    // -------------------------------------------------------
    processBid(side, type) {

        // Prevent double bidding
        if (this.context.state.biddingInProgress) {
            this.ui.noticeA.textContent = "ALREADY SELECTED!";
            this.ui.show(this.ui.noticeA);
            return;
        }

        this.context.state.biddingInProgress = true;

        // Update center display
        this.ui.centerDisplay.textContent = `Player ${side} selected ${type}`;

        // Notify interface
        GameContext.itf.playInProgress = true;

        // Start the bid clock
        this.startBidClock();
    }

    // -------------------------------------------------------
    // Start the bid countdown
    // -------------------------------------------------------
    startBidClock() {

        this.bidding.seconds = 30;
        this.updateTimeBox();

        this.bidding.timerId = setInterval(() => {
            this.bidding.seconds--;
            this.updateTimeBox();

            if (this.bidding.seconds <= 0) {
                this.stopBidClock("time expired");
            }

        }, 1000);
    }

    // -------------------------------------------------------
    // Update the timeBox UI
    // -------------------------------------------------------
    updateTimeBox() {
        this.ui.timeBox.value = `${this.bidding.seconds} Sec`;
    }

    getTimeForGameLND() {
        return 15;
    }

    // -------------------------------------------------------
    // Stop the bid clock
    // -------------------------------------------------------
    stopBidClock(reason = "stopped") {

        clearInterval(this.bidding.timerId);
        this.bidding.timerId = null;

        this.context.state.biddingInProgress = false;

        this.context.timers.stopPlayClock(reason);

        this.ui.timeBox.value = "30 Sec";
    }

    // -------------------------------------------------------
    // Reset buttons (if needed)
    // -------------------------------------------------------
    reset() {
        this.stopBidClock("reset");
        this.context.state.biddingInProgress = false;
        this.ui.centerDisplay.textContent = "";
    }
}
