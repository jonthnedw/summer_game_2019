import * as fs from 'fs'; // This gets transpiled into: var fs = require('fs');
import { StringDecoder } from 'string_decoder';
 


/* Game board will use a 28x31 tile set, rendered from the sprite map (spritemap-384.png). 
The canvas size will exactly match the size of the laid out tile set. 
Each tile will be 24x24 pixels. 
This means the game board’s pixel dimensions are: 672x744. */

/* This document will map a character from the sprite map to a tile index. */


// On success, returns the file data
// On failure, returns the ErrorNoException
function ReadFileAsync(filename: string): Promise<any> {
    return new Promise((resolve,reject) => {
        fs.readFile(filename, (err, data:Buffer) => {
            if (err) 
                reject(err);
            else 
                resolve(data);
        });
    });
}

class Tile {
    srcTileX:number;
    srcTtileY:number;
    drawTileX:number;
    drawTileY:number;

    constructor(srcX:number, srcY:number, drawX:number, drawY:number) {
        this.srcTileX = srcX;
        this.srcTtileY = srcY;
        this.drawTileX = drawX;
        this.drawTileY = drawY;
    }
}

var m_gameBoardTiles:Tile[] = null;


function ProcessGameboardText(gameBoardStr:string) : boolean
{
    var charCount:number = 0;
 
    var gameBoardRows = gameBoardStr.split('\n');
    
    // The first row will determine the map width
    var width:number = gameBoardRows[0].length;
    var height:number = gameBoardRows.length;
    
    // Check to make sure we have the correct number of map tiles
    // Make sure there isn't a newline after the last line. That will trip this error.
    for(var i=0;i<gameBoardRows.length;i++)
    {
        if (gameBoardRows[i].length !== width)
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

    console.log("Processed Gameboard. Width=" + width + ", Height=" + height);

    return true;
}

// Eventually, this will return a promise so that all assets are downloaded asynchronously
function DownloadAllAssets() : void {

    ReadFileAsync("../GameBoard1.txt").then((result:Buffer) => {

        console.log("Downloaded GameBoard1.txt");
        var gameBoardStr:string = result.toString();
        ProcessGameboardText(gameBoardStr);

    }).catch((err:NodeJS.ErrnoException) => {

        // Need to fail everything
    });


}



class SpriteMap
{
    image:HTMLImageElement;
    tilePxSize:number;

	constructor() {
		this.image = new HTMLImageElement();
        this.image.src = "spritemap-384.png";
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


DownloadAllAssets();