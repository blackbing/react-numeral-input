module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = __webpack_require__(2)['default'];

	var _interopRequireDefault = __webpack_require__(17)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(18);

	var _react2 = _interopRequireDefault(_react);

	var _numeral = __webpack_require__(19);

	var _numeral2 = _interopRequireDefault(_numeral);

	var re = /[^0-9km,]+/;

	var getCaretPosition = function getCaretPosition(oField) {
	  var iCaretPos = 0;
	  if (document.selection) {
	    oField.focus();
	    oSel = document.selection.createRange();
	    oSel.moveStart('character', -oField.value.length);
	    iCaretPos = oSel.text.length;
	  } else if (oField.selectionStart || oField.selectionStart == '0') {
	    iCaretPos = oField.selectionStart;
	  }
	  return iCaretPos;
	};

	var setCaretPosition = function setCaretPosition(oField, index) {
	  if (oField.setSelectionRange) {
	    oField.setSelectionRange(index, index);
	  } else {
	    range = oField.createTextRange();
	    range.collapse(true);
	    range.moveEnd('character', index);
	    range.moveStart('character', index);
	    range.select();
	  }
	};

	var NumeralInput = _react2['default'].createClass({
	  displayName: 'NumeralInput',
	  propTypes: {
	    onChange: _react2['default'].PropTypes.func,
	    fmt: _react2['default'].PropTypes.string
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      fmt: '0,0'
	    };
	  },
	  formatPos: function formatPos(val, index) {
	    //unformat
	    val = (0, _numeral2['default'])().unformat(val);
	    //format
	    val = (0, _numeral2['default'])(val).format(this.props.fmt);
	    var sub = val.substr(0, index - 1);
	    var dotCount = sub.split(',').length;
	    var pos = index - dotCount;
	    if (pos < 0) {
	      pos = 0;
	    }
	    return pos;
	  },
	  focusOnChar: function focusOnChar(val, index) {
	    var formatVal = (0, _numeral2['default'])(val).format(this.props.fmt);
	    var dotCount = 0;

	    var i = 0;
	    var finalIndex = formatVal.length;
	    while (i < formatVal.length) {
	      var char = formatVal[i];
	      if (i === index + dotCount) {
	        finalIndex = i;
	        break;
	      }
	      if (char === ',') {
	        dotCount++;
	      }
	      i++;
	    }
	    if (!finalIndex) {
	      finalIndex = 1;
	    }
	    return finalIndex;
	  },
	  getInitialState: function getInitialState() {
	    return {
	      inputStyle: this.props.inputStyle,
	      placeholder: this.props.placeholder,
	      value: this.getNumeralValue(this.props.value)
	    };
	  },
	  getNumeralValue: function getNumeralValue(val) {
	    return (0, _numeral2['default'])(val).format(this.props.fmt);
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var _this = this;

	    if (this.props.value === nextProps.value) {
	      return;
	    }
	    var val = nextProps.value;
	    var formatVal = '';

	    if (!re.test(val)) {
	      formatVal = this.getNumeralValue(val);
	    }
	    formatVal = this.getNumeralValue(val);

	    this.setState({
	      value: formatVal
	    }, function () {
	      var node = _this.getDOMNode();
	      setCaretPosition(node, _this.state.pos);
	    });
	  },
	  changeHandler: function changeHandler() {
	    var _this2 = this;

	    var node = this.getDOMNode();
	    var pos = getCaretPosition(node);
	    var val = node.value;
	    pos = this.formatPos(this.state.value, pos);

	    //1,000,000 -> 1000000
	    var reTest = re.test(val);
	    if (!reTest) {
	      val = (0, _numeral2['default'])(val).value();
	      var oVal = (0, _numeral2['default'])(this.state.val);
	      if ((oVal + '').length < (val + '').length) {
	        pos = this.focusOnChar(val, ++pos);
	      } else if ((oVal + '').length > (val + '').length) {
	        pos = this.focusOnChar(val, --pos);
	      } else {
	        pos = this.focusOnChar(val, pos);
	      }
	    }
	    val = (0, _numeral2['default'])(val).value();

	    //parentNode onChange function
	    this.setState({
	      pos: pos,
	      value: val
	    }, function () {
	      if (_this2.props.onChange) {
	        _this2.props.onChange(val);
	      }
	    });
	  },
	  render: function render() {
	    return _react2['default'].createElement('input', _extends({ type: 'text' }, this.props, {
	      value: this.state.value,
	      onChange: this.changeHandler
	    }));
	  }
	});

	exports['default'] = NumeralInput;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(3)["default"];

	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	module.exports = __webpack_require__(8).Object.assign;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(6);

	$def($def.S + $def.F, 'Object', {assign: __webpack_require__(9)});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var toObject = __webpack_require__(10)
	  , IObject  = __webpack_require__(12)
	  , enumKeys = __webpack_require__(14);

	module.exports = __webpack_require__(16)(function(){
	  return Symbol() in Object.assign({}); // Object.assign available and Symbol is native
	}) ? function assign(target, source){   // eslint-disable-line no-unused-vars
	  var T = toObject(target)
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = IObject(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(11);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(13);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(15);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("numeral");

/***/ }
/******/ ]);