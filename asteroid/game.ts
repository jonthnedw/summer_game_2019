import * as utils from "./game_utils"
import {Asteroid} from "./asteroid"
import {Ship} from "./ship"
let asteroids = [];

while(asteroids.length < 10){
    let sizes = [50, 100, 150]
    let size = sizes[utils.random(0,3)];

    let ast = new Asteroid(
        { x: utils.random(0 + size, utils.width - size), y: utils.random(0 + size, utils.height - size), velX: utils.notZero(utils.random(-3, 3), -3, 3), velY: utils.notZero(utils.random(-3, 3), -3, 3), exists: true, size }    );
    asteroids.push(ast);
}

let player = new Ship(
    { x: utils.random(0 + 30, utils.width - 30), y: utils.random(0 + 30, utils.height - 30), exists: true } );
player.setControls();

function gameLoop(timestamp: any): void{
    utils.ctx.fillStyle = 'rgba(54,53,87,0.5)';
    utils.ctx.fillRect(0, 0, utils.width, utils.height);   
    
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
