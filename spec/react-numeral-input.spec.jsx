import React from 'react/addons';
import NumeralInput from '../lib/react-numeral-input.jsx';

describe('ReactNumeralInput', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <NumeralInput/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().type).toEqual('text');
  });

  it('should formatPos', function() {
    const value = '1,234,567';
    expect(component.formatPos(value, 0)).toEqual(0);
    expect(component.formatPos(value, 1)).toEqual(0);
    expect(component.formatPos(value, 2)).toEqual(1);
    expect(component.formatPos(value, 3)).toEqual(1);
    expect(component.formatPos(value, 4)).toEqual(2);
    expect(component.formatPos(value, 5)).toEqual(3);
    expect(component.formatPos(value, 6)).toEqual(4);
  });

  it('should focusOnChar', function() {
    const value = '1234567';
    expect(component.focusOnChar(value, 0)).toEqual(1);
    expect(component.focusOnChar(value, 1)).toEqual(1);
    expect(component.focusOnChar(value, 3)).toEqual(4);
    expect(component.focusOnChar(value, 4)).toEqual(5);
    expect(component.focusOnChar(value, 5)).toEqual(7);
    expect(component.focusOnChar(value, 6)).toEqual(8);
  });
});
