/* jshint node: true */
var path = require('path');
var webpack = require('webpack');


module.exports = {
  context: path.join(__dirname),
  entry: './src/index.js',

  output: {
    path: path.join(__dirname),
    filename: 'dist/index.js',
    libraryTarget: 'umd',
    library: 'NumeralInput'
  },

  externals: {
   'react': 'react',
   'react-dom': 'react-dom',
   'numeral': 'numeral'
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
