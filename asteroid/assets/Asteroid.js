define(["require", "exports", "../utils/Vector", "../utils/Tile"], function (require, exports, Vector_1, Tile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Asteroid = void 0;
    class Asteroid extends Vector_1.Vector {
        constructor(x, y, dx, dy, imgURL, width = 16, height = 16) {
            super(x, y);
            this.dx = dx;
            this.dy = dy;
            this.game_tile = new Tile_1.Tile(imgURL);
            this.game_tile.visible = true;
            this.width = width;
            this.height = height;
        }
        draw(ctx) {
            ctx.drawImage(this.game_tile.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            // For debugging
            //ctx.fillStyle = "green";
            //ctx.fillRect(this.x, this.y, 3, 3)
        }
        ;
        update(canvas_width, canvas_height) {
            this.x += this.dx;
            this.y += this.dy;
            if (this.y - this.height / 2 > canvas_height ||
                this.y < 0 ||
                this.x - this.width / 2 > canvas_width ||
                this.x < 0) {
                this.game_tile.visible = false;
            }
        }
        ;
    }
    exports.Asteroid = Asteroid;
    ;
});
//# sourceMappingURL=Asteroid.js.map