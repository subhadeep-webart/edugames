// GameBt.js — Transparent regions on a single image

class GameBt {

    constructor(round, context) {
        this.round = round;
        this.context = context;
        this.ui = context.ui;

        this.imageSrc = round.imageSrc;
        this.regions = round.regions || [];   // [{id, x, y, w, h}, ...]
    }

    init() {
        var html = "<div id='mapContainer' style='position:relative; display:inline-block;'>";
        html += "<img src='" + this.imageSrc + "' id='mapImage'>";
        var i;

        for (i = 0; i < this.regions.length; i++) {
            var r = this.regions[i];
            html += "<div id='" + r.id + "' " +
                "class='mapRegion' " +
                "style='position:absolute; left:" + r.x + "px; top:" + r.y + "px; " +
                "width:" + r.w + "px; height:" + r.h + "px;'></div>";
        }

        html += "</div>";

        this.ui.gameInsrtPt.innerHTML = html;

        this.attachHandlers();
    }

    attachHandlers() {
        var i;
        for (i = 0; i < this.regions.length; i++) {
            var r = this.regions[i];
            var el = document.getElementById(r.id);
            if (el) {
                el.onclick = this.makeRegionHandler(r);
            }
        }
    }

    makeRegionHandler(region) {
        var self = this;
        return function () {
            self.handleClick(region.x, region.y, region);
        };
    }

    handleClick(x, y, region) {
        // Move your existing map?style logic here
        console.log("Map region clicked:", region);
    }
}
// JavaScript source code
