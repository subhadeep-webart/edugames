// GameBg.js — Grid mode

class GameBg {

    constructor(round, context) {
        this.round = round;
        this.context = context;
        this.ui = context.ui;

        this.rows = round.rows || 4;
        this.cols = round.cols || 4;
        this.imageSrc = round.imageSrc;   // main image
    }

    init() {
        // Render grid container
        var html = "<div id='gridContainer' style='position:relative; display:inline-block;'>";

        html += "<img src='" + this.imageSrc + "' id='gridImage'>";

        // Overlay clickable cells
        for (var r = 0; r < this.rows; r++) {
            for (var c = 0; c < this.cols; c++) {
                var cellId = "cell_" + r + "_" + c;
                html += "<div id='" + cellId + "' class='gridCell'></div>";
            }
        }

        html += "</div>";

        this.ui.gameInsrtPt.innerHTML = html;

        this.attachHandlers();
    }

    attachHandlers() {
        var r, c;
        for (r = 0; r < this.rows; r++) {
            for (c = 0; c < this.cols; c++) {
                var cellId = "cell_" + r + "_" + c;
                var el = document.getElementById(cellId);
                if (el) {
                    el.onclick = this.makeCellHandler(r, c);
                }
            }
        }
    }

    makeCellHandler(r, c) {
        var self = this;
        return function () {
            self.handleClick(r, c, null);
        };
    }

    handleClick(row, col, extra) {
        // Here you move your existing grid?answer logic
        console.log("Grid click:", row, col);
    }
}
// JavaScript source code
