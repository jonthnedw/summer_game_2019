const path = require('path');

// THIS IS ONLY FOR PACMAN RIGHT NOW!!!

module.exports = {
  entry: './pacman/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './pacman/dist')
  }
};
