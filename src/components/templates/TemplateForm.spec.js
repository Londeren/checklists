import chai, {expect} from 'chai';
import spies from 'chai-spies';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TemplateForm from './TemplateForm';
import Item from '../Item';

chai.use(spies);

function setup(templateName = '', items = []) {
  let props = {
    onSaveAction: chai.spy(),
    templateName: templateName,
    items: items
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<TemplateForm {...props} />);
  let output = renderer.getRenderOutput();

  let rendered = TestUtils.renderIntoDocument(<TemplateForm {...props} />);

  return {
    props,
    output,
    renderer,
    rendered
  }
}

describe('TemplateForm component', () => {
  it('should render correctly', () => {
    const { output } = setup();

    expect(output.type).to.equal('form');

    let [ fieldsetName, fieldsetItems, submitButton ] = output.props.children;

    expect(fieldsetName.type).to.equal('fieldset');

    let templateNameInput = fieldsetName.props.children;

    expect(templateNameInput.type).to.equal('input');
    expect(templateNameInput.props.type).to.equal('text');
    expect(templateNameInput.props.className).to.equal('form-control');
    expect(templateNameInput.props.placeholder).to.equal('Template name');
    expect(templateNameInput.props.value).to.equal('');
    expect(templateNameInput.props.tabIndex).to.equal("1");
    expect(templateNameInput.props.autoFocus).to.equal("true");
    expect(templateNameInput.props.tabIndex).to.equal("1");

    let firstItem = fieldsetItems.props.children[1];
    expect(firstItem.type).to.equal(Item);
    expect(firstItem.props.newItem).to.equal(true);
    expect(firstItem.props.checked).to.equal(false);
    expect(firstItem.props.name).to.equal('');

    expect(submitButton.type).to.equal('button');
    expect(submitButton.props.type).to.equal('submit');
    expect(submitButton.props.className).to.equal('btn btn-primary');
    expect(submitButton.props.children).to.equal('Add');
  });

  it('must change template name if input changed', () => {
    let { rendered } = setup();

    rendered.refs.templateName.value = "test";
    TestUtils.Simulate.change(rendered.refs.templateName);
    expect(rendered.state.templateName).to.equal("test");
  });

  it('must add item to state on call onUpdateItem on `addItem`', () => {
    let { rendered } = setup();

    let newItem = TestUtils.findRenderedComponentWithType(rendered, Item);

    const addItem = {
      checked: false,
      name: 'first item'
    };

    newItem.props.onUpdateItem(addItem);

    const [expected] = rendered.state.items;

    expect(expected).to.include({
      done: addItem.checked,
      name: addItem.name
    });
  });

  it('must insert added item to DOM', () => {
    let { rendered } = setup();

    let newItem = TestUtils.findRenderedComponentWithType(rendered, Item);
    newItem.props.onUpdateItem({
      checked: false,
      name: 'first item'
    });

    const itemList = TestUtils.scryRenderedComponentsWithType(rendered, Item);

    expect(itemList.length).equal(2);
  });

  it('must update state.items when item updated', () => {
    const initialItem = {
      id: 'first',
      name: 'first item',
      done: false
    };

    const updatedItem = {
      checked: true,
      name: 'done'
    };

    let { rendered } = setup('', [initialItem]);
    let [newItem] = TestUtils.scryRenderedComponentsWithType(rendered, Item);
    newItem.props.onUpdateItem(updatedItem);

    const [expected] = rendered.state.items;

    expect(expected).to.eql({
      id: initialItem.id,
      done: updatedItem.checked,
      name: updatedItem.name
    });
  });

  it('must delete Item component on delete item from state');
});