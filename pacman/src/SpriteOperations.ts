//var fs = require('fs'); /* commonJs syntax */
// import * as fs from 'fs'; // Don't need fs right now...

// Import assets that need to be packaged up using WebPack
import GameBoardText from './GameBoard1.txt';
import MazeParts from './spritemap-384.png';


/* Game board will use a 28x31 tile set, rendered from the sprite map (spritemap-384.png). 
The canvas size will exactly match the size of the laid out tile set. 
Each tile will be 24x24 pixels. 
This means the game board’s pixel dimensions are: 672x744. */

/* This document will map a character from the sprite map to a tile index. */


// On success, returns the file data
// On failure, returns the ErrorNoException
// function ReadFileAsync(filename: string): Promise<any> {
    
//     return new Promise<any>((resolve,reject) => {
//         fs.readFile(filename, (err, data:Buffer) => {
//             if (err) 
//                 reject(err);
//             else 
//                 resolve(data);
//         });
//     });
// }



class Tile {
    srcTileX:number;
    srcTileY:number;
    drawTileX:number;
    drawTileY:number;

    constructor(srcX:number, srcY:number, drawX:number, drawY:number) {
        this.srcTileX = srcX;
        this.srcTileY = srcY;
        this.drawTileX = drawX;
        this.drawTileY = drawY;
    }
}

var m_gameBoardLoaded:boolean = false;
var m_gameBoardTiles:Tile[] = null;
var m_gameBoardWidth:number = -1;
var m_gameBoardHeight:number = -1;

function ProcessGameboardText(gameBoardStr:string) : boolean
{
    var charCount:number = 0;
 
    console.log("Printing gameboard text...");
    console.log(gameBoardStr);

    var gameBoardRows = gameBoardStr.split('\n');
    
    // The first row will determine the map width
    m_gameBoardWidth = gameBoardRows[0].length;
    m_gameBoardHeight = gameBoardRows.length;
    
    // Check to make sure we have the correct number of map tiles
    // Make sure there isn't a newline after the last line. That will trip this error.
    for(var i=0;i<gameBoardRows.length;i++)
    {
        if (gameBoardRows[i].length !== m_gameBoardWidth)
        {
            console.log("ERROR: Line " + i + " does not have the correct number of tiles! Map is malformed!");
            return false;
        }
    }

    // Initialize the tiles
    m_gameBoardTiles = new Array<Tile>();

    for(i=0;i<gameBoardRows.length;i++)
    {
        var row:string = gameBoardRows[i];

        for(var j=0;j<row.length;j++)
        {
            switch(row[j])
            {
                case '┏':{
                    m_gameBoardTiles.push(new Tile(i,j,0,0));
                    break;
                }
                case '━':{
                    m_gameBoardTiles.push(new Tile(i,j,0,0));
                    break;
                }
                case '┓':{
                    m_gameBoardTiles.push(new Tile(i,j,0,0));
                    break;
                }
                case '┃':{
                    m_gameBoardTiles.push(new Tile(i,j,0,0));
                    break;
                }
                case '┗':{
                    m_gameBoardTiles.push(new Tile(i,j,0,0));
                    break;
                }
                case '┛':{
                    m_gameBoardTiles.push(new Tile(i,j,0,0));
                    break;
                }
                case '.':{
                    break;
                }
                case 'O':{
                    break;
                }
                case ' ':{
                    break;
                }
                default: {
                    // this is an error
                    console.log("ERROR: Unhandle char: '" + row[j] + "' at i,j=" + i + "," + j);
                    return false;
                }
            }
        }
       
    }

    console.log("Processed Gameboard. Width=" + m_gameBoardWidth + ", Height=" + m_gameBoardHeight);
    m_gameBoardLoaded = true;

    return true;
}

// Eventually, this will return a promise so that all assets are downloaded asynchronously
// function DownloadAllAssets() : void {

//     m_gameBoardLoaded = false;

//     fs.readFile("../GameBoard1.txt", (err, data:Buffer) => {
//         if (err) {
//             console.log("Error reading file");
//         }
//         else {
//             console.log("Downloaded GameBoard1.txt");
//             var gameBoardStr:string = data.toString();
//             ProcessGameboardText(gameBoardStr);
//         }
//     });

    // ReadFileAsync("../GameBoard1.txt").then((result:Buffer) => {
    //     console.log("Downloaded GameBoard1.txt");
    //     var gameBoardStr:string = result.toString();
    //     ProcessGameboardText(gameBoardStr);

    // }).catch((err:NodeJS.ErrnoException) => {

    //     // Need to fail everything
    // });


// }



class SpriteMap
{
    image:HTMLImageElement;
    tilePxSize:number;

	constructor() {
		this.image = new HTMLImageElement();
        this.image.src = MazeParts;
        this.tilePxSize = 24;
	}

    drawGameTile(code:string, context:CanvasRenderingContext2D, cenX:number, cenY:number, tileX:number, tileY:number):void
    {
        var tileW:number = this.tilePxSize;
        var tileH:number = this.tilePxSize;

        context.drawImage(this.image, 
            tileX * this.tilePxSize, tileY * this.tilePxSize, tileW, tileH,
             cenX - tileW / 2, cenY - tileH / 2, tileW, tileH);
    }

}


function DrawGameBoard(context:CanvasRenderingContext2D) : boolean
{
    if (!m_gameBoardLoaded) {
        return false;
    }


    

    return true;
}

function Initialize() : boolean
{
    if (ProcessGameboardText(GameBoardText))
    {
        m_gameBoardLoaded = true;
    }
    else
    {
        return false;
    }


    return true;
}


export { Initialize, DrawGameBoard };