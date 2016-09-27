import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NumeralInput from '../lib/react-numeral-input.jsx';

describe('ReactNumeralInput', function() {
  var component;
  var component2;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(
      <NumeralInput/>
    );
    component2 = TestUtils.renderIntoDocument(
      <NumeralInput fmt="$0,0"/>
    );
  });

  it('should render', function() {
    expect(ReactDOM.findDOMNode(component).type).toEqual('text');
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

  it('should formatPos with fmt', function() {
    const value = '$1,234,567';
    expect(component2.formatPos(value, 0)).toEqual(0);
    expect(component2.formatPos(value, 1)).toEqual(0);
    expect(component2.formatPos(value, 2)).toEqual(1);
    expect(component2.formatPos(value, 3)).toEqual(2);
    expect(component2.formatPos(value, 4)).toEqual(2);
    expect(component2.formatPos(value, 5)).toEqual(3);
    expect(component2.formatPos(value, 6)).toEqual(4);
  });
});
