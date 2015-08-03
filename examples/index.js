var React = require('react');
var NumeralInput = React.createFactory(require('../dist/index'));

var Forms = React.createClass({
  getInitialState: function(){
    return { numeralVal: 1000000 };
  },
  onChange: function(val){
    this.setState({numeralVal: val})
  },
  render: function(){
    return NumeralInput({
      value: this.state.numeralVal,
      className: "form-control",
      placeholder: "feed me number",
      onChange:this.onChange
    });
  }
});

React.render( React.createElement(Forms) , document.querySelector('#app'));
