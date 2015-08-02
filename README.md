# react-numeral-input

It is very tiny commponent which is a replacement of HTML input element for post-editing format of number values.

ex. 1000000 -> 1,000,000

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


