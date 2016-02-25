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

  return {
    props,
    output,
    renderer
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
    const { props } = setup();

    let templateForm = TestUtils.renderIntoDocument(<TemplateForm {...props} />);

    templateForm.refs.templateName.value = "test";
    TestUtils.Simulate.change(templateForm.refs.templateName);
    expect(templateForm.state.templateName).to.equal("test");
  });
});