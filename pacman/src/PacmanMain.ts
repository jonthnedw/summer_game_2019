
import * as SpriteOperations from './SpriteOperations';

// Import any assets that need to be packaged up using WebPack
import './pacman_style.css';


console.log("Starting game logic...");

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



console.log("Initializing SpriteOperations...");

if (SpriteOperations.Initialize())
{
	console.log("Sprites initialized! Starting game loop...");

	// Sprites initialized. Start game loop.
	loop(0);
}
else
{
	console.log("Sprites failed to load!");
	// Show error display

}


