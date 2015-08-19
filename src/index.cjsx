# @cjsx React.DOM
React = require('react')
numeral = require 'numeral'

re = /[^0-9km,]+/
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
    val = nextProps.value

    if not re.test(val)
      val = @getNumeralValue(val)
    @setState
      value: val

  changeHandler:()->
    val = @getDOMNode().value
    #1,000,000 -> 1000000
    reTest = re.test(val)
    if not reTest
      val = numeral(val).value()

    #parentNode onChange function
    @setState(
      value: val
    , =>
      if @props.onChange
        @props.onChange(val)
    )

  render : ->
    props = @props
    <input type="text" {...props}
      value={@state.value}
      onChange = {@changeHandler}
    />

module.exports = NumeralInput
