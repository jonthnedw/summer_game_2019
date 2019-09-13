const path = require('path');

// This configuration file is used by WebPack to compile ts code and package up all assets into a dist folder.
// See: https://webpack.js.org/guides/getting-started/
// 
// Other games should follow this pattern:
// 1. Create your own [game].webpack.config.js
// 2. Add a build script in package.json (see pacman example)
//

module.exports = {
  entry: './pacman/src/PacmanMain.ts',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './pacman/dist')
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.txt$/,
        use: [
          'raw-loader'
        ]
      }
    ]
  }
};
