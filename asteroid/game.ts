import {Ship} from "./assets/Ship"


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let player = new Ship(100, 100, "./images/ship.png", 32, 32)
player.setControls();

function gameLoop(timestamp: any): void{
    ctx.fillStyle = 'rgba(54,53,87,0.5)';
    ctx.fillRect(0,0,width,height);   
    
    player.draw(ctx);
    player.update(width, height);
    requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);