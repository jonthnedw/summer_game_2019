const fs = require('fs');
const ncp = require('ncp').ncp;


fs.copyFile("./index.html", "./public/client/index.html", (err) =>
{
    if (err) throw err;
});

fs.copyFile("./index_stylesheet.css", "./public/client/index_stylesheet.css", (err) =>
{
    if (err) throw err;
});

ncp("./resource", './public/client/resource', (err) => {
    if (err) throw err;
});

ncp("./gameserver/dist", "./public/server/dist");

console.log("Client index files copied.");





// Call the deploy for our individual games
const pacman = require('./pacman/deploy');


