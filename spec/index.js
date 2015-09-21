/* eslint-disable */

'use strict';

// Browser ES6 Polyfill
require('babel/polyfill');

var context = require.context('./', true, /\.spec\.jsx?$/);
context.keys().forEach(context);
