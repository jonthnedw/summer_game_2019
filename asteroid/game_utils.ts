const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min: number, max:number): number {
    let num = Math.floor(Math.random()*(max-min)) + min;
    return num;
};

function notZero(n: number, min: number, max:number): number{
    if (n == 0){
        return notZero(random(min, max), min, max);
    }
    return n
};

class GameTile {
    isLoaded: boolean;
    image: HTMLImageElement;
    constructor(imageURL) {
        this.isLoaded = false;
        this.image = new Image();
        this.image.src = imageURL;
    }
};

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

export {VectorObject, GameTile, notZero, random, ctx, canvas, width, height};