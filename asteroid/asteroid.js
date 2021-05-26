define(["require", "exports", "./game_utils"], function (require, exports, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Asteroid = void 0;
    let asteroid_tile = new utils.GameTile("asteroid.png");
    class Asteroid extends utils.VectorObject {
        constructor({ x, y, velX, velY, exists, size }) {
            super(x, y, velX, velY, exists);
            this.size = size;
        }
        draw() {
            utils.ctx.beginPath();
            utils.ctx.drawImage(asteroid_tile.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
            // For debugging
            //ctx.fillStyle = "green";
            //ctx.fillRect(this.x, this.y, 3, 3)
        }
        ;
        update() {
            if ((this.x - this.size / 2) >= utils.width) {
                this.exists = false;
            }
            if ((this.x + this.size / 2) <= 0) {
                this.exists = false;
            }
            if ((this.y - this.size / 2) >= utils.height) {
                this.exists = false;
            }
            if ((this.y + this.size / 2) <= 0) {
                this.exists = false;
            }
            this.x += this.velX;
            this.y += this.velY;
        }
        ;
    }
    exports.Asteroid = Asteroid;
    ;
});
//# sourceMappingURL=asteroid.js.map