import {Vector} from "../utils/Vector"
import {Tile} from "../utils/Tile"

class Asteroid extends Vector {
    game_tile: Tile;
    height: number;
    width: number;

    constructor(x: number, y: number, dx: number, dy: number, imgURL: string, width: number = 16, height: number = 16) {
        super(x, y)
        this.dx = dx;
        this.dy = dy;
        this.game_tile = new Tile(imgURL);
        this.game_tile.visible = true;
        this.width = width;
        this.height = height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.game_tile.image, 
            this.x - this.width / 2,
            this.y - this.height / 2, 
            this.width, 
            this.height);
        // For debugging
        //ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, 3, 3)
    };

    update(canvas_width: number, canvas_height: number){
        this.x += this.dx;
        this.y += this.dy;

        if (this.y - this.height / 2 > canvas_height ||
            this.y < 0 ||
            this.x - this.width / 2 > canvas_width || 
            this.x < 0) {
            this.game_tile.visible = false;
        }
    };
};

export {Asteroid}