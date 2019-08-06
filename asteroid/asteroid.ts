// Module for asteroids
import * as utils from "./game_utils"

let asteroid_tile = new utils.GameTile("asteroid.png");

class Asteroid extends utils.VectorObject {
    size: number; // Size of asteroid (length/witdth)
    constructor({ x, y, velX, velY, exists, size }: { x: number; y: number; velX: number; velY: number; exists: boolean; size: number; }){
        super(x, y, velX, velY, exists);
        this.size = size;
    }

    draw() {
        utils.ctx.beginPath();
        utils.ctx.drawImage(asteroid_tile.image, this.x - this.size / 2,
            this.y - this.size / 2, this.size, this.size);
        // For debugging
        //ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, 3, 3)
    };

    update(){
        if ((this.x - this.size / 2) >= utils.width){
            this.exists = false;
        }

        if ((this.x + this.size / 2) <= 0){
            this.exists = false;
        }

        if ((this.y - this.size / 2) >= utils.height){
            this.exists = false;
        }

        if ((this.y + this.size / 2) <= 0){
            this.exists = false;
        }
        
        this.x += this.velX;
        this.y += this.velY;
    };
};

export {Asteroid};