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
});
