# react-numeral-input

It is a very tiny component which is a replacement of HTML input element for post-editing format of number values.

ex. 1000000 -> 1,000,000

[![react-numeral-input](http://i.imgur.com/7eUVb7z.gif)](http://i.imgur.com/7eUVb7z.gif)
# Dependency

* React.js
* [Numeral.js](http://numeraljs.com/)

# install

```shell
npm install react-numeral-input
```

# Usage

```jsx
// replace original input from
<input value={this.state.numeralVal} className="" placeholder="" onChange={this.onChange} />

// like this
<NumeralInput value={this.state.numeralVal} className="" placeholder="" onChange={this.onChange} />
```

# complete example

```jsx
let NumeralInput = require('react-numeral-input');

module.exports = React.createClass({
  getInitialState() {
    return {
      numeralVal: 1000000
    }
  },
  onChange(val){
    this.setState( {numeralVal:val});
  },
  render() {
    return (
      <NumeralInput
        value={this.state.numeralVal}
        className="form-control"
        placeholder=""
        onChange={this.onChange} />
    )
  }
});
```

