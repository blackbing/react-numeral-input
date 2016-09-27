import path from 'path'
import webpack, { DefinePlugin, BannerPlugin } from 'webpack';

module.exports = function(config) {
  const { env } = process

  const isCi = env.CONTINUOUS_INTEGRATION === 'true'
  const runCoverage = env.COVERAGE === 'true' || isCi

  const coverageLoaders = []
  const coverageReporters = []

  if (runCoverage) {
    coverageLoaders.push({
      test: /\.js$/,
      include: path.resolve('lib/'),
      exclude: /spec/,
      loader: 'isparta'
    })

    coverageReporters.push('coverage')

    if (isCi) {
      coverageReporters.push('coveralls')
    }
  }
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

    reporters: [ ...coverageReporters ],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage'
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
