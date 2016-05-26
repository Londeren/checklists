import chai, {expect} from 'chai';
import spies from 'chai-spies';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import AddItemButton from './AddItemButton';

chai.use(spies);

function setup({ buttonAdditionalClasses = '', children }) {
  let props = {
    buttonAdditionalClasses,
    children,
    onClickAction: chai.spy()
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<AddItemButton {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  }
}

describe('AddItemButton component', () => {
  it('should render correctly', () => {
    const setupParams = {
      buttonAdditionalClasses: 'externalClass',
      children: 'Push me'
    };
    const {output} = setup(setupParams);

    expect(output.type).to.equal('div');
    expect(output.props.className).to.equal('add-item');

    {
      const button = output.props.children;

      expect(button.type).to.equal('button');
      expect(button.props.type).to.equal('button');
      expect(button.props.className).to.equal(`btn btn-info-outline btn-block ${setupParams.buttonAdditionalClasses}`);
      expect(button.props.children).to.equal(setupParams.children);
    }
  });

  it('should call onClickAction on button click', () => {
    const setupParams = {
      buttonAdditionalClasses: 'externalClass',
      children: 'Push me'
    };
    const {output, props} = setup(setupParams);
    const button = output.props.children;

    button.props.onClick();
    expect(props.onClickAction).to.have.been.called.once();
  });
});
