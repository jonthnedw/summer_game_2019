// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let playerScore = document.getElementById("scores");
playerScore.innerHTML = "test";

class GameTile
{
    isLoaded: boolean;
    image: HTMLImageElement;
    constructor(imageURL) {
        this.isLoaded = false;
        this.image = new Image();
        this.image.src = imageURL;
    }
};

var ship_tile = new GameTile("ship.png");
var asteroid_tile = new GameTile("asteroid.png");

function random(min: number, max:number): number {
    let num = Math.floor(Math.random()*(max-min)) + min;
    return num;
};

function notZero(n: number, min: number, max:number): number{
    if (n == 0){
        return notZero(random(min, max), min, max);
    }
    return n
}

class VectorObject {
    x: number; // Object's x position
    y: number; // Object's y position
    velX: number; // Object's x-component vector
    velY: number; // Object's y-component vector
    exists: boolean; // Whether an object exists or not
    constructor(x, y, velX, velY, exists){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }
    
};

class Asteroid extends VectorObject {
    size: number; // Size of asteroid (length/witdth)
    constructor({ x, y, velX, velY, exists, size }: { x: number; y: number; velX: number; velY: number; exists: boolean; size: number; }){
        super(x, y, velX, velY, exists);
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(asteroid_tile.image, this.x - this.size / 2,
            this.y - this.size / 2, this.size, this.size);
        // For debugging
        //ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, 3, 3)
    };

    update(){
        if ((this.x - this.size / 2) >= width){
            this.exists = false;
        }

        if ((this.x + this.size / 2) <= 0){
            this.exists = false;
        }

        if ((this.y - this.size / 2) >= height){
            this.exists = false;
        }

        if ((this.y + this.size / 2) <= 0){
            this.exists = false;
        }
        
        this.x += this.velX;
        this.y += this.velY;
    };
};

class Ship extends VectorObject {
    size: number; // Size of the ship, 30x30 pxls by default
    direction: number;
    constructor({ x, y, exists }: { x: number; y: number; exists: boolean; }){
        super(x, y, 4, 4, exists);
        this.size = 30;
    };

    draw(){
        ctx.beginPath();
        ctx.drawImage(ship_tile.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        // For debugging
        //ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, 3, 3)
    };

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

        if((this.x + this.size / 2) >= width) {
            this.x = width - this.size / 2 - 1;
            this.direction = 0; // stop
        }

        if((this.x - this.size / 2) <= 0) {
            this.x = this.size / 2 + 1;
            this.direction = 0; // stop
        }

       if((this.y + this.size / 2) >= height) {
            this.y = height - this.size / 2 - 1;
            this.direction = 0; // stop
        }

       if((this.y - this.size / 2) <= 0) {
            this.y = this.size / 2 + 1;
            this.direction = 0; // stop
        }
    };

	setControls() {
        let _this = this;
		window.onkeydown = function(e) {
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
		}
    };
	collisionDetect(asteroids: Asteroid[]) {
		for(let j = 0; j < asteroids.length; j++) {
			if(asteroids[j].exists) {
				let dx = this.x - asteroids[j].x;
				let dy = this.y - asteroids[j].y;
				let distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < this.size / 2 + asteroids[j].size / 2) {
					this.exists = false;
				}
			}
		}
	};
}

let asteroids = [];

while(asteroids.length < 10){
    let sizes = [50, 100, 150]
    let size = sizes[random(0,3)];

    let ast = new Asteroid(
        { x: random(0 + size, width - size), y: random(0 + size, height - size), velX: notZero(random(-3, 3), -3, 3), velY: notZero(random(-3, 3), -3, 3), exists: true, size }    );
    asteroids.push(ast);
}

let player = new Ship(
    { x: random(0 + 30, width - 30), y: random(0 + 30, height - 30), exists: true } );
player.setControls();

function gameLoop(timestamp: any): void{
    ctx.fillStyle = 'rgba(54,53,87,0.5)';
    ctx.fillRect(0,0,width,height);   
    
    for(let i = 0; i < asteroids.length; i++){
        if (asteroids[i].exists){
            asteroids[i].draw();
            asteroids[i].update();
        }
    };
    if (player.exists){    
        player.draw();
        player.update();
        player.collisionDetect(asteroids);
    }
    requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);