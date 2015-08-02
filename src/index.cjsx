# @cjsx React.DOM
React = require('react')
numeral = require 'numeral'

NumeralInput = React.createClass
  displayName : 'NumeralInput'
  propTypes:
    onChange: React.PropTypes.func
    fmt: React.PropTypes.string

  getDefaultProps: ->
    fmt: '0,0'

  getInitialState: ->
    inputStyle:@props.inputStyle
    placeholder:@props.placeholder
    value: @getNumeralValue(@props.value)

  getNumeralValue: (val)->
    numeral(val).format(@props.fmt)

  componentWillReceiveProps :(nextProps) ->
    @setState
      value: @getNumeralValue(nextProps.value)

  changeHandler:()->
    #1,000,000 -> 1000000
    inputValue = numeral(@getDOMNode().value).value()
    #parentNode onChange function
    @setState(
      value: inputValue
    , =>
      @props.onChange(inputValue) if @props.onChange
    )

  render : ->
    props = @props
    <input type="text" {...props}
      value={@state.value}
      onChange = {@changeHandler}
    />

module.exports = NumeralInput
