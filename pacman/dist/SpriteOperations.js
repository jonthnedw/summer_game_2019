"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs"); // This gets transpiled into: var fs = require('fs');
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
    constructor(srcX, srcY, drawX, drawY) {
        this.srcTileX = srcX;
        this.srcTtileY = srcY;
        this.drawTileX = drawX;
        this.drawTileY = drawY;
    }
}
var m_gameBoardLoaded = false;
var m_gameBoardTiles = null;
var m_gameBoardWidth = -1;
var m_gameBoardHeight = -1;
function ProcessGameboardText(gameBoardStr) {
    var charCount = 0;
    var gameBoardRows = gameBoardStr.split('\n');
    // The first row will determine the map width
    m_gameBoardWidth = gameBoardRows[0].length;
    m_gameBoardHeight = gameBoardRows.length;
    // Check to make sure we have the correct number of map tiles
    // Make sure there isn't a newline after the last line. That will trip this error.
    for (var i = 0; i < gameBoardRows.length; i++) {
        if (gameBoardRows[i].length !== m_gameBoardWidth) {
            console.log("ERROR: Line " + i + " does not have the correct number of tiles! Map is malformed!");
            return false;
        }
    }
    // Initialize the tiles
    m_gameBoardTiles = new Array();
    for (i = 0; i < gameBoardRows.length; i++) {
        var row = gameBoardRows[i];
        for (var j = 0; j < row.length; j++) {
            switch (row[j]) {
                case '┏': {
                    m_gameBoardTiles.push(new Tile(i, j, 0, 0));
                    break;
                }
                case '━': {
                    m_gameBoardTiles.push(new Tile(i, j, 0, 0));
                    break;
                }
                case '┓': {
                    m_gameBoardTiles.push(new Tile(i, j, 0, 0));
                    break;
                }
                case '┃': {
                    m_gameBoardTiles.push(new Tile(i, j, 0, 0));
                    break;
                }
                case '┗': {
                    m_gameBoardTiles.push(new Tile(i, j, 0, 0));
                    break;
                }
                case '┛': {
                    m_gameBoardTiles.push(new Tile(i, j, 0, 0));
                    break;
                }
                case '.': {
                    break;
                }
                case 'O': {
                    break;
                }
                case ' ': {
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
function DownloadAllAssets() {
    m_gameBoardLoaded = false;
    fs.readFile("../GameBoard1.txt", (err, data) => {
        if (err) {
            console.log("Error reading file");
        }
        else {
            console.log("Downloaded GameBoard1.txt");
            var gameBoardStr = data.toString();
            ProcessGameboardText(gameBoardStr);
        }
    });
    // ReadFileAsync("../GameBoard1.txt").then((result:Buffer) => {
    //     console.log("Downloaded GameBoard1.txt");
    //     var gameBoardStr:string = result.toString();
    //     ProcessGameboardText(gameBoardStr);
    // }).catch((err:NodeJS.ErrnoException) => {
    //     // Need to fail everything
    // });
}
exports.DownloadAllAssets = DownloadAllAssets;
class SpriteMap {
    constructor() {
        this.image = new HTMLImageElement();
        this.image.src = "spritemap-384.png";
        this.tilePxSize = 24;
    }
    drawGameTile(code, context, cenX, cenY, tileX, tileY) {
        var tileW = this.tilePxSize;
        var tileH = this.tilePxSize;
        context.drawImage(this.image, tileX * this.tilePxSize, tileY * this.tilePxSize, tileW, tileH, cenX - tileW / 2, cenY - tileH / 2, tileW, tileH);
    }
}
function DrawGameBoard(context) {
    if (!m_gameBoardLoaded) {
        return false;
    }
    return true;
}
exports.DrawGameBoard = DrawGameBoard;
//# sourceMappingURL=SpriteOperations.js.map