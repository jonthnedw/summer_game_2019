"use strict";
exports.__esModule = true;
var fs = require("fs"); // This gets transpiled into: var fs = require('fs');
/* Game board will use a 28x31 tile set, rendered from the sprite map (spritemap-384.png).
The canvas size will exactly match the size of the laid out tile set.
Each tile will be 24x24 pixels.
This means the game board’s pixel dimensions are: 672x744. */
/* This document will map a character from the sprite map to a tile index. */
// On success, returns the file data
// On failure, returns the ErrorNoException
function ReadFileAsync(filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}
var Tile = /** @class */ (function () {
    function Tile(x, y) {
        this.tileX = x;
        this.tileY = y;
    }
    return Tile;
}());
var m_gameBoardTiles = null;
function ProcessGameboardText(gameBoardStr) {
    var charCount = 0;
    var gameBoardRows = gameBoardStr.split('\n');
    // The first row will determine the map width
    var width = gameBoardRows[0].length;
    var height = gameBoardRows.length;
    // Check to make sure we have the correct number of map tiles
    for (var i = 0; i < gameBoardRows.length; i++) {
        if (gameBoardRows[i].length !== width) {
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
                    m_gameBoardTiles.push(new Tile(0, 0));
                    break;
                }
                case '━': {
                    m_gameBoardTiles.push(new Tile(0, 0));
                    break;
                }
                case '┓': {
                    m_gameBoardTiles.push(new Tile(0, 0));
                    break;
                }
                case '┃': {
                    m_gameBoardTiles.push(new Tile(0, 0));
                    break;
                }
                case '┗': {
                    m_gameBoardTiles.push(new Tile(0, 0));
                    break;
                }
                case '┛': {
                    m_gameBoardTiles.push(new Tile(0, 0));
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
                case '\n': {
                    console.log("ERROR: A newline was left in the code");
                    return false;
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
function DownloadAllAssets() {
    ReadFileAsync("../GameBoard1.txt").then(function (result) {
        console.log("Downloaded GameBoard1.txt");
        var gameBoardStr = result.toString();
        ProcessGameboardText(gameBoardStr);
    })["catch"](function (err) {
        // Need to fail everything
    });
}
var SpriteMap = /** @class */ (function () {
    function SpriteMap() {
        this.image = new HTMLImageElement();
        this.image.src = "spritemap-384.png";
        this.tilePxSize = 24;
    }
    SpriteMap.prototype.drawGameTile = function (code, context, cenX, cenY, tileX, tileY) {
        var tileW = this.tilePxSize;
        var tileH = this.tilePxSize;
        context.drawImage(this.image, tileX * this.tilePxSize, tileY * this.tilePxSize, tileW, tileH, cenX - tileW / 2, cenY - tileH / 2, tileW, tileH);
    };
    return SpriteMap;
}());
DownloadAllAssets();
