import { Tile } from "../utils/Tile";
import { Vector } from "../utils/Vector";

class Ship extends Vector {
    game_tile: Tile;
    angle: number; // In pi radians
    angular_velocity: number;
    width: number;
    height: number;
    key_press: number;

    constructor(x: number, y: number, imgURL: string, width: number, height: number) {
        super(x, y);
        this.dx = 0;
        this.dy = 0;
        this.angle = 0;
        this.angular_velocity = 0;
        this.key_press = 0;
        this.game_tile = new Tile(imgURL);
        this.width = width;
        this.height = height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.rotate(this.angle * Math.PI)
        ctx.drawImage(
            this.game_tile.image, 
            this.x - this.width / 2,
            this.y - this.height / 2, 
            this.width, 
            this.height);
        ctx.restore();
        // For debugging
        //ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, 3, 3)
    };

    update(canvas_width: number, canvas_height: number){
        if (this.key_press = 1) {
            this.angular_velocity = -(15/360)
        } else if (this.key_press == 3) {
            this.angular_velocity = (15/360)
        }
        this.key_press = 0;

        this.x += this.dx;
        this.y += this.dy;
        this.angle += this.angular_velocity;

        this.angular_velocity = 0;

        if (this.y - this.height / 2 > canvas_height ||
            this.y < 0 ||
            this.x - this.width / 2 > canvas_width || 
            this.x < 0) {
            this.game_tile.visible = false;
        }
    };

    setControls() {
        let _this = this;
		window.onkeydown = function(e) {
			// 65 = a, 37 = left arrow
			if (e.keyCode === 65 || e.keyCode === 37) {
				_this.key_press = 1;
			}
			// 87 = w, 38 = up arrow
			else if (e.keyCode === 87 || e.keyCode === 38) {
				_this.key_press = 2;
			}
			// 68 = d, 39 = right arrow
			else if (e.keyCode === 68 || e.keyCode === 39) {
				_this.key_press = 3;
			}
			// 83 = s, 40 = down arrow
			else if (e.keyCode === 83 || e.keyCode === 40) {
				_this.key_press = 4;
			}
		}
    };
}

export { Ship }