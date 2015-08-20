// Generated by CoffeeScript 1.9.3
/** @jsx React.DOM */;
var NumeralInput, React, getCaretPosition, numeral, re, setCaretPosition;

React = require('react');

numeral = require('numeral');

re = /[^0-9km,]+/;

getCaretPosition = function(oField) {
  var iCaretPos, oSel;
  iCaretPos = 0;
  if (document.selection) {
    oField.focus();
    oSel = document.selection.createRange();
    oSel.moveStart('character', -oField.value.length);
    iCaretPos = oSel.text.length;
  } else if (oField.selectionStart || oField.selectionStart === '0') {
    iCaretPos = oField.selectionStart;
  }
  return iCaretPos;
};

setCaretPosition = function(oField, index) {
  var range;
  if (oField.setSelectionRange) {
    return oField.setSelectionRange(index, index);
  } else {
    range = oField.createTextRange();
    range.collapse(true);
    range.moveEnd('character', index);
    range.moveStart('character', index);
    return range.select();
  }
};

NumeralInput = React.createClass({
  displayName: 'NumeralInput',
  propTypes: {
    onChange: React.PropTypes.func,
    fmt: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      fmt: '0,0'
    };
  },
  focusOnChar: function(val, index) {
    var char, dotCount, finalIndex, formatVal, i;
    formatVal = numeral(val).format(this.props.fmt);
    dotCount = 0;
    i = 0;
    finalIndex = formatVal.length;
    while (i < formatVal.length) {
      char = formatVal[i];
      if (char === ',') {
        dotCount++;
      }
      if (i === (index + dotCount)) {
        finalIndex = i;
        break;
      }
      i++;
    }
    return finalIndex;
  },
  getInitialState: function() {
    return {
      inputStyle: this.props.inputStyle,
      placeholder: this.props.placeholder,
      value: this.getNumeralValue(this.props.value)
    };
  },
  getNumeralValue: function(val) {
    return numeral(val).format(this.props.fmt);
  },
  componentWillReceiveProps: function(nextProps) {
    var dot_sp, formatVal, node, val;
    node = this.getDOMNode();
    val = nextProps.value;
    if (!re.test(val)) {
      formatVal = this.getNumeralValue(val);
      dot_sp = formatVal.split(',');
    }
    return this.setState({
      value: formatVal
    }, (function(_this) {
      return function() {
        return setCaretPosition(node, _this.state.pos);
      };
    })(this));
  },
  changeHandler: function() {
    var node, pos, reTest, val;
    node = this.getDOMNode();
    val = node.value;
    pos = getCaretPosition(node);
    reTest = re.test(val);
    if (!reTest) {
      val = numeral(val).value();
      if ((this.state.value + '').length <= (val + '').length) {
        pos = this.focusOnChar(val, pos);
        pos++;
      }
    }
    return this.setState({
      pos: pos,
      value: val
    }, (function(_this) {
      return function() {
        if (_this.props.onChange) {
          return _this.props.onChange(val);
        }
      };
    })(this));
  },
  render: function() {
    var props;
    props = this.props;
    return React.createElement("input", React.__spread({
      "type": "text"
    }, props, {
      "value": this.state.value,
      "onChange": this.changeHandler
    }));
  }
});

module.exports = NumeralInput;
