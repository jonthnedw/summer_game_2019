"use strict";
exports.__esModule = true;
var canvas = document.querySelector('canvas');
exports.canvas = canvas;
var ctx = canvas.getContext('2d');
exports.ctx = ctx;
var width = canvas.width = window.innerWidth;
exports.width = width;
var height = canvas.height = window.innerHeight;
exports.height = height;
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}
exports.random = random;
;
function notZero(n, min, max) {
    if (n == 0) {
        return notZero(random(min, max), min, max);
    }
    return n;
}
exports.notZero = notZero;
;
var GameTile = /** @class */ (function () {
    function GameTile(imageURL) {
        this.isLoaded = false;
        this.image = new Image();
        this.image.src = imageURL;
    }
    return GameTile;
}());
exports.GameTile = GameTile;
;
var VectorObject = /** @class */ (function () {
    function VectorObject(x, y, velX, velY, exists) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }
    return VectorObject;
}());
exports.VectorObject = VectorObject;
;
