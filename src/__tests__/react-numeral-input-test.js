import expect from 'expect'
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NumeralInput from '../react-numeral-input';

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
    expect(ReactDOM.findDOMNode(component).type).toBe('tel');
  });

  it('should formatPos', function() {
    const value = '1,234,567';
    expect(component.formatPos(value, 0)).toBe(0);
    expect(component.formatPos(value, 1)).toBe(0);
    expect(component.formatPos(value, 2)).toBe(1);
    expect(component.formatPos(value, 3)).toBe(1);
    expect(component.formatPos(value, 4)).toBe(2);
    expect(component.formatPos(value, 5)).toBe(3);
    expect(component.formatPos(value, 6)).toBe(4);
  });

  it('should focusOnChar', function() {
    const value = '1234567';
    expect(component.focusOnChar(value, 0)).toBe(1);
    expect(component.focusOnChar(value, 1)).toBe(1);
    expect(component.focusOnChar(value, 3)).toBe(4);
    expect(component.focusOnChar(value, 4)).toBe(5);
    expect(component.focusOnChar(value, 5)).toBe(7);
    expect(component.focusOnChar(value, 6)).toBe(8);
  });

  it('should formatPos with fmt', function() {
    const value = '$1,234,567';
    expect(component2.formatPos(value, 0)).toBe(0);
    expect(component2.formatPos(value, 1)).toBe(0);
    expect(component2.formatPos(value, 2)).toBe(1);
    expect(component2.formatPos(value, 3)).toBe(2);
    expect(component2.formatPos(value, 4)).toBe(2);
    expect(component2.formatPos(value, 5)).toBe(3);
    expect(component2.formatPos(value, 6)).toBe(4);
  });
});
