import webpack, { DefinePlugin, BannerPlugin } from 'webpack';

module.exports = function(config) {
  config.set({
    basePath: '.',

    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],

    files: [
      // shim to workaroud PhantomJS 1.x lack of `bind` support
      // see: https://github.com/ariya/phantomjs/issues/10522
      //'node_modules/es5-shim/es5-shim.js',

      // React is an external dependency of the component
      //'node_modules/react/dist/react-with-addons.js',

      //'spec/spec-helper.js',
      'spec/index.js'
      //{ pattern: 'lib/**/*', watched: true, included: false }
    ],

    preprocessors: {
      // add webpack as preprocessor
      'spec/*': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
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
      resolve: {
        extensions: ['', '.js', '.json', '.jsx'],
        modulesDirectories: ['node_modules', 'src'],
      },
    },

    webpackServer: {
      noInfo: true
    },

    singleRun: true
  });
};


/**
  Loads configuration while ensuring sounce-map is enabled
 */
function loadWebpackConfig () {
  var webpackConfig = require('./webpack.config.js');
  webpackConfig.devtool = 'inline-source-map';
  return webpackConfig;
}
