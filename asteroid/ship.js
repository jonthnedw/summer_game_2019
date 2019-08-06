"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var utils = require("./game_utils");
var ship_tile = new utils.GameTile("ship.png");
var Ship = /** @class */ (function (_super) {
    __extends(Ship, _super);
    function Ship(_a) {
        var x = _a.x, y = _a.y, exists = _a.exists;
        var _this_1 = _super.call(this, x, y, 4, 4, exists) || this;
        _this_1.size = 30;
        return _this_1;
    }
    ;
    Ship.prototype.draw = function () {
        utils.ctx.beginPath();
        utils.ctx.drawImage(ship_tile.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        // For debugging
        //ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, 3, 3)
    };
    ;
    Ship.prototype.update = function () {
        // left
        if (this.direction == 1)
            this.x -= this.velX;
        // up
        if (this.direction == 2)
            this.y -= this.velY;
        // right
        if (this.direction == 3)
            this.x += this.velX;
        // down
        if (this.direction == 4)
            this.y += this.velY;
        // if we hit a wall, stop
        if ((this.x + this.size / 2) >= utils.width) {
            this.x = utils.width - this.size / 2 - 1;
            this.direction = 0; // stop
        }
        if ((this.x - this.size / 2) <= 0) {
            this.x = this.size / 2 + 1;
            this.direction = 0; // stop
        }
        if ((this.y + this.size / 2) >= utils.height) {
            this.y = utils.height - this.size / 2 - 1;
            this.direction = 0; // stop
        }
        if ((this.y - this.size / 2) <= 0) {
            this.y = this.size / 2 + 1;
            this.direction = 0; // stop
        }
    };
    ;
    Ship.prototype.setControls = function () {
        var _this = this;
        window.onkeydown = function (e) {
            // 65 = a, 37 = left arrow
            if (e.keyCode === 65 || e.keyCode === 37) {
                _this.direction = 1;
            }
            // 87 = w, 38 = up arrow
            else if (e.keyCode === 87 || e.keyCode === 38) {
                _this.direction = 2;
            }
            // 68 = d, 39 = right arrow
            else if (e.keyCode === 68 || e.keyCode === 39) {
                _this.direction = 3;
            }
            // 83 = s, 40 = down arrow
            else if (e.keyCode === 83 || e.keyCode === 40) {
                _this.direction = 4;
            }
        };
    };
    ;
    Ship.prototype.collisionDetect = function (asteroids) {
        for (var j = 0; j < asteroids.length; j++) {
            if (asteroids[j].exists) {
                var dx = this.x - asteroids[j].x;
                var dy = this.y - asteroids[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.size / 2 + asteroids[j].size / 2) {
                    this.exists = false;
                }
            }
        }
    };
    ;
    return Ship;
}(utils.VectorObject));
exports.Ship = Ship;
