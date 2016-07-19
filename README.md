# react-numeral-input [![npm version](https://badge.fury.io/js/react-numeral-input.svg)](https://badge.fury.io/js/react-numeral-input) [![Build Status](https://api.travis-ci.org/blackbing/react-numeral-input.svg?branch=master)](https://travis-ci.org/blackbing/react-numeral-input) 

It is a very tiny component which is a replacement of HTML input element for post-editing format of number values.

ex. 1000000 -> 1,000,000

[![react-numeral-input](http://i.imgur.com/7eUVb7z.gif)](http://i.imgur.com/7eUVb7z.gif)

# Live Demo

[react-numeral-input](http://blackbing.github.io/react-numeral-input/)

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

# Example

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


# Options
You can set any original input props. such as minlength, maxlength. For example:

```jsx
<NumeralInput value={this.state.numeralVal} className="" placeholder="" onChange={this.onChange} minLength={2} maxLength={10}/>
```

### fmt(:string)

Default: "0,0"

It is passed to configure numeral format, You can find more information from [Numeral.js](http://numeraljs.com/).

### onChange(:function)

Callback when value is changed, you will receieve unformated number (1000000 instead of 1,000,000).
