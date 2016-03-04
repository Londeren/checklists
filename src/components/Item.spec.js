import chai, {expect} from 'chai';
import spies from 'chai-spies';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Item from './Item';

chai.use(spies);

function setup(props = {
  newItem: false,
  checked: false,
  name: '',
  onUpdateItem: chai.spy(),
  onDeleteItem: chai.spy()
}) {

  let renderer = TestUtils.createRenderer();
  renderer.render(<Item {...props} />);
  let output = renderer.getRenderOutput();

  let rendered = TestUtils.renderIntoDocument(<Item {...props} />);

  return {
    props,
    output,
    renderer,
    rendered
  }
}

describe('Item component', () => {
  it('should render correctly with name and checked status');

  it('should render correctly as new item');

  it('should change name when input changed');

  it('should change checked when ckeckbox changed');

  it('should call onUpdateItem when item updates with not empty name for new item');

  it('should call onUpdateItem when item updates with any name for not new item');

  it('should call onDeleteItem when delete button has been clicked');
});
