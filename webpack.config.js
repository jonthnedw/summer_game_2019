const path = require('path');

// npm install --save-dev html-webpack-plugin?
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// npm install --save-dev clean-webpack-plugin?
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');


// TODO: Only have outputs for pacman. Need to add for other projects.

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
