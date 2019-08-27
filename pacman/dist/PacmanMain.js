"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpriteOperations_1 = require("./SpriteOperations");
alert("starting loop...");
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = 700;
var height = canvas.height = 700;
// define loop that keeps drawing the scene constantly
function loop(timestamp) {
    SpriteOperations_1.DrawGameBoard(ctx);
    // This method will aim for 60 fps depending on your monitor refresh rate,
    // and is always called before the next buffer drawn in the browser.
    // This is a special method optimized for animations.
    // The method will not run if the canvas is offscreen (I'll need to verify).
    // Can be cancelled using cancelAnimationFrame()
    requestAnimationFrame(loop);
}
loop(0);
//# sourceMappingURL=PacmanMain.js.map