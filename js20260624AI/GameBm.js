// GameBm.js — Multiple clickable images

class GameBm {

    constructor(round, context) {
        this.round = round;
        this.context = context;
        this.ui = context.ui;

        this.images = round.images || [];   // [{id, src, label}, ...]
    }

    init() {
        var html = "<div id='multiImageContainer'>";

        var i;
        for (i = 0; i < this.images.length; i++) {
            var img = this.images[i];
            html += "<div class='multiImageItem'>" +
                "<img src='" + img.src + "' id='" + img.id + "' class='multiImage'>" +
                "</div>";
        }

        html += "</div>";

        this.ui.gameInsrtPt.innerHTML = html;

        this.attachHandlers();
    }

    attachHandlers() {
        var i;
        for (i = 0; i < this.images.length; i++) {
            var img = this.images[i];
            var el = document.getElementById(img.id);
            if (el) {
                el.onclick = this.makeImageHandler(img);
            }
        }
    }

    makeImageHandler(img) {
        var self = this;
        return function () {
            self.handleClick(0, 0, img);
        };
    }

    handleClick(x, y, img) {
        // Move your existing multi?image logic here
        console.log("Image clicked:", img);
    }
}
// JavaScript source code
