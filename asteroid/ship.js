define(["require", "exports", "./game_utils"], function (require, exports, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ship = void 0;
    let ship_tile = new utils.GameTile("ship.png");
    class Ship extends utils.VectorObject {
        constructor({ x, y, exists }) {
            super(x, y, 4, 4, exists);
            this.size = 30;
        }
        ;
        draw() {
            utils.ctx.beginPath();
            utils.ctx.drawImage(ship_tile.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
            // For debugging
            //ctx.fillStyle = "green";
            //ctx.fillRect(this.x, this.y, 3, 3)
        }
        ;
        update() {
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
        }
        ;
        setControls() {
            let _this = this;
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
        }
        ;
        collisionDetect(asteroids) {
            for (let j = 0; j < asteroids.length; j++) {
                if (asteroids[j].exists) {
                    let dx = this.x - asteroids[j].x;
                    let dy = this.y - asteroids[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < this.size / 2 + asteroids[j].size / 2) {
                        this.exists = false;
                    }
                }
            }
        }
        ;
    }
    exports.Ship = Ship;
});
//# sourceMappingURL=ship.js.map