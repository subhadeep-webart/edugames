// JavaScript source code
class BoxGame extends Game {

    constructor(round, context) {
        super(round, context);
        this.nbrOfButs = 0;
        this.insrtId = [];
        this.insrtPtArray = [];
        this.butArray = [];
        this.trysLeft = 0;
    }

    init() {
        super.init();

        var total = this.rows * this.cols;

        if (total > 20 && this.gameType === "M") {
            this.resetNbrOfButs();
        }

        this.nbrOfButs = this.rows * this.cols;
        this.trysLeft = this.trysPerPlayer;

        this.createInsrtIds();
        this.createGrid();
        this.cacheInsertPoints();
        this.loadButtonsIntoGrid();

        console.log("BoxGame.init complete. Buttons:", this.nbrOfButs);
    }

    resetNbrOfButs() {
        this.rows = 5;
        this.cols = 4;
        this.nbrOfButs = 20;
    }

    cleanPlayArea() {
        super.cleanPlayArea();

        var area = this.context.ui.gamePlayArea;
        var kids = Array.from(area.children);

        for (var i = 0; i < kids.length; i++) {
            kids[i].remove();
        }
    }

    /* ---------------------------------------------------------
       GRID + INSERT POINTS
    --------------------------------------------------------- */

    createInsrtIds() {
        this.insrtId = [];

        for (var r = 0; r < this.rows; r++) {
            for (var c = 0; c < this.cols; c++) {
                this.insrtId.push(r + "X" + c);
            }
        }
    }

    createGrid() {
        var buf = "<table border='5' background='#CCFFFF'>";

        var n = 0;
        for (var r = 0; r < this.rows; r++) {
            buf += "<tr>";
            for (var c = 0; c < this.cols; c++) {
                var id = this.insrtId[n++];
                buf += "<td>";
                buf += "<div class='gridInsrtPt' " +
                    "style='background-color:aquamarine; text-align:center;' " +
                    "id='" + id + "'></div>";
                buf += "</td>";
            }
            buf += "</tr>";
        }

        buf += "</table>";

        this.context.ui.gamePlayArea.innerHTML += buf;
    }

    cacheInsertPoints() {
        var list = document.getElementsByClassName("gridInsrtPt");
        this.insrtPtArray = Array.prototype.slice.call(list);
    }

    /* ---------------------------------------------------------
       BUTTON CREATION
    --------------------------------------------------------- */

    loadButtonsIntoGrid() {
        this.butArray = [];

        for (var i = 0; i < this.nbrOfButs; i++) {
            var id = this.insrtId[i];
            var host = this.insrtPtArray[i];

            var btn = document.createElement("input");
            btn.type = "button";
            btn.id = "but" + id;
            btn.className = "but";
            btn.name = "Xname";
            btn.value = "but" + id;
            btn.style.backgroundColor = "aquamarine";

            host.innerHTML = "";
            host.appendChild(btn);

            this.butArray.push(btn);
        }
    }

    /* ---------------------------------------------------------
       BUTTON TEXT + VISIBILITY
    --------------------------------------------------------- */

    fillButtons(list) {
        var count = Math.min(list.length, this.nbrOfButs);

        for (var i = 0; i < count; i++) {
            this.butArray[i].value = list[i];
        }
    }

    hideShowBlankAllButtons(mode) {
        for (var i = 0; i < this.butArray.length; i++) {
            var b = this.butArray[i];

            if (mode === "hide") {
                b.hidden = true;
            } else if (mode === "show") {
                b.hidden = false;
            } else if (mode === "blank") {
                b.value = "";
            }
        }
    }

    /* ---------------------------------------------------------
       GAME LOGIC HELPERS
    --------------------------------------------------------- */

    getUnHitButtons() {
        var list = [];

        for (var i = 0; i < this.butArray.length; i++) {
            if (this.butArray[i].hidden === true) {
                list.push(this.butArray[i].name);
            }
        }

        return list;
    }

}
