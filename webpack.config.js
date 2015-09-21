/* jshint node: true */
var path = require('path');


module.exports = {
  context: path.join(__dirname),
  entry: './lib/index.js',

  output: {
    path: path.join(__dirname),
    filename: 'dist/index.js',
    libraryTarget: 'commonjs2',
    library: 'NumeralInput'
  },

  externals: {
   'react': 'react',
   'react/addons': 'react/addons',
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
  }
};
