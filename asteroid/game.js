"use strict";
exports.__esModule = true;
var utils = require("./game_utils");
var asteroid_1 = require("./asteroid");
var ship_1 = require("./ship");
var asteroids = [];
while (asteroids.length < 10) {
    var sizes = [50, 100, 150];
    var size = sizes[utils.random(0, 3)];
    var ast = new asteroid_1.Asteroid({ x: utils.random(0 + size, utils.width - size), y: utils.random(0 + size, utils.height - size), velX: utils.notZero(utils.random(-3, 3), -3, 3), velY: utils.notZero(utils.random(-3, 3), -3, 3), exists: true, size: size });
    asteroids.push(ast);
}
var player = new ship_1.Ship({ x: utils.random(0 + 30, utils.width - 30), y: utils.random(0 + 30, utils.height - 30), exists: true });
player.setControls();
function gameLoop(timestamp) {
    utils.ctx.fillStyle = 'rgba(54,53,87,0.5)';
    utils.ctx.fillRect(0, 0, utils.width, utils.height);
    for (var i = 0; i < asteroids.length; i++) {
        if (asteroids[i].exists) {
            asteroids[i].draw();
            asteroids[i].update();
        }
    }
    ;
    if (player.exists) {
        player.draw();
        player.update();
        player.collisionDetect(asteroids);
    }
    requestAnimationFrame(gameLoop);
}
;
requestAnimationFrame(gameLoop);
