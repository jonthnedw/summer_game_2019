// import { DrawGameBoard } from "./SpriteOperations";
// var SpriteOperations = require('./SpriteOperations'); // commonJs syntax
import * as SpriteOperations from './SpriteOperations';

alert("starting loop...");

var canvas:HTMLCanvasElement = document.querySelector('canvas');
var ctx:CanvasRenderingContext2D = canvas.getContext('2d');

var width:number = canvas.width = 700;
var height:number = canvas.height = 700;




// define loop that keeps drawing the scene constantly
function loop(timestamp:number):void 
{

    SpriteOperations.DrawGameBoard(ctx);

	// This method will aim for 60 fps depending on your monitor refresh rate,
	// and is always called before the next buffer drawn in the browser.
	// This is a special method optimized for animations.
	// The method will not run if the canvas is offscreen (I'll need to verify).
	// Can be cancelled using cancelAnimationFrame()
	requestAnimationFrame(loop);
}



loop(0);
