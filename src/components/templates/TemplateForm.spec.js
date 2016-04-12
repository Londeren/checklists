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
    expect(submitButton.props.children).to.equal('Save');
  });

  it('should change template name if input changed', () => {
    let { rendered } = setup();

    rendered.refs.name.value = "test";
    TestUtils.Simulate.change(rendered.refs.name);
    expect(rendered.state.name).to.equal("test");
  });

  it('should add item to state on call onUpdateItem on `addItem`', () => {
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

  it('should insert added item to DOM', () => {
    let { rendered } = setup();

    let newItem = TestUtils.findRenderedComponentWithType(rendered, Item);
    newItem.props.onUpdateItem({
      checked: false,
      name: 'first item'
    });

    const itemList = TestUtils.scryRenderedComponentsWithType(rendered, Item);

    expect(itemList.length).equal(2);
  });

  it('should update state.items when item updated', () => {
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

  it('should delete Item component on delete item from state', () => {
    const initialItem = {
      id: 'first',
      name: 'first item',
      done: false
    };

    let { rendered } = setup('', [initialItem]);
    let [newItem] = TestUtils.scryRenderedComponentsWithType(rendered, Item);
    newItem.props.onDeleteItem();

    let itemsAfterDelete = TestUtils.scryRenderedComponentsWithType(rendered, Item);

    expect(itemsAfterDelete.length).to.equal(1);

    expect(rendered.state.items.length).to.equal(0);
  });

  it('should call onSaveAction if length of template name is greater than 0', () => {
    let { rendered } = setup();

    let form = TestUtils.findRenderedDOMComponentWithTag(rendered, 'form');

    TestUtils.Simulate.submit(form);

    expect(rendered.props.onSaveAction).to.have.not.been.called();

    rendered.refs.name.value = "test";
    TestUtils.Simulate.change(rendered.refs.name);

    TestUtils.Simulate.submit(form);

    expect(rendered.props.onSaveAction).to.have.been.called.once();
  });
});