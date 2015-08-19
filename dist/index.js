// Generated by CoffeeScript 1.9.3
/** @jsx React.DOM */;
var NumeralInput, React, numeral, re;

React = require('react');

numeral = require('numeral');

re = /[^0-9km,]+/;

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
    var val;
    val = nextProps.value;
    if (!re.test(val)) {
      val = this.getNumeralValue(val);
    }
    return this.setState({
      value: val
    });
  },
  changeHandler: function() {
    var reTest, val;
    val = this.getDOMNode().value;
    reTest = re.test(val);
    if (!reTest) {
      val = numeral(val).value();
    }
    return this.setState({
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
