/* jshint node: true */
var path = require('path');
var webpack = require('webpack');


module.exports = {
  context: path.join(__dirname),
  entry: './example/example.js',

  output: {
    path: path.join(__dirname),
    filename: './example/example.bundle.js',
  },

  module: {
    loaders: [
      {
        test: /(\.js)|(\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          optional: ['runtime'],
          stage: 0
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false
    })
  ]
};
