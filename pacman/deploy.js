
// To install: npm install ncp
var ncp = require('ncp').ncp;
var path = require('path');
var fs = require('fs');

var destRootDir = path.join(__dirname, "/../public/client/pacman");

fs.copyFile(path.join(__dirname, "pacman_game.html"), path.join(destRootDir, "/pacman_game.html"), (err) =>
{
    if (err) return console.error(err);
});

fs.copyFile(path.join(__dirname, "pacman_style.css"), path.join(destRootDir, "/pacman_style.css"), (err) =>
{
    if (err) return console.error(err);
});

// Copy the compiled javascript files
fs.mkdir(path.join(destRootDir, "/dist"), { recursive:true}, (err) =>
{
    if (err)
    {
        return console.error(err);
    }

    // recursive copy of directories
    ncp(path.join(__dirname, "/dist"), path.join(destRootDir, "/dist"), (err) =>
    { 
        if (err) {
            return console.error(err);
        }
        console.log('Copied pacmac/dist!');
    });
});


// Copy the assets
fs.mkdir(path.join(destRootDir, "/assets"), { recursive:true}, (err) =>
{
    if (err)
    {
        return console.error(err);
    }

    // recursive copy of directories
    ncp(path.join(__dirname, "/assets"), path.join(destRootDir, "/assets"), (err) =>
    { 
        if (err) {
            return console.error(err);
        }
        console.log('Copied pacmac/assets!');
    });
});

