import chai, {expect} from 'chai';
import spies from 'chai-spies';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Item, {ENTER} from './Item';

chai.use(spies);

function setup({newItem = false, checked = false, name = '', onDeleteItem} = {}) {
  const props = {
    newItem,
    checked,
    name,
    onDeleteItem,
    onUpdateItem: chai.spy()
  };

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
  it('should render correctly with name and checked status', () => {
    const setupParams = {
      name: 'test',
      checked: true,
      onDeleteItem: chai.spy()
    };

    const { output } = setup(setupParams);

    expect(output.type).to.equal('div');
    expect(output.props.className).to.equal('input-group');

    {
      const [checkboxSpan, nameInput, deleteSpan] = output.props.children;
      const checkbox = checkboxSpan.props.children;

      {
        expect(checkboxSpan.type).to.equal('span');
        expect(checkboxSpan.props.className).to.equal('input-group-addon');

        {
          expect(checkbox.type).to.equal('input');
          expect(checkbox.props.type).to.equal('checkbox');
          expect(checkbox.ref).to.equal('checked');
          expect(checkbox.props.checked).to.equal(setupParams.checked);
        }

        expect(nameInput.type).to.equal('input');
        expect(nameInput.props.type).to.equal('text');
        expect(nameInput.ref).to.equal('name');
        expect(nameInput.props.className).to.equal('form-control');
        expect(nameInput.props.placeholder).to.equal('Add item');
        expect(nameInput.props.value).to.equal(setupParams.name);
        expect(nameInput.props.tabIndex).to.equal('2');

        expect(deleteSpan.type).to.equal('span');
        expect(deleteSpan.props.className).to.equal('input-group-btn');

        const deleteButton = deleteSpan.props.children;

        {
          expect(deleteButton.type).to.equal('button');
          expect(deleteButton.props.type).to.equal('button');
          expect(deleteButton.props.className).to.equal('btn btn-secondary text-danger');
          expect(deleteButton.props.children).to.equal('X');
        }
      }
    }

  });

  it('should render correctly as new item (without delete button)', () => {
    const setupParamsWithoutDeleteButton = {
      name: 'test'
    };
    const { output: outputWithoutDelete } = setup(setupParamsWithoutDeleteButton);

    const [,, emptyDeleteButton] = outputWithoutDelete.props.children;

    expect(emptyDeleteButton.length).to.equal(0);
  });

  it('should change name when input changed', () => {
    const { rendered } = setup();

    rendered.refs.name.value = 'test';
    TestUtils.Simulate.change(rendered.refs.name);
    expect(rendered.state.name).to.equal('test');
  });

  it('should change checked when ckeckbox changed', () => {
    const setupParams = {
      checked: false,
      name: 'test'
    };
    const { rendered } = setup(setupParams);

    rendered.refs.checked.checked = !setupParams.checked;
    TestUtils.Simulate.change(rendered.refs.checked);
    expect(rendered.state.checked).to.equal(!setupParams.checked);
  });

  it('should call onUpdateItem when item updates (onBlur or on press Enter) with not empty name for new item', () => {
    let { rendered } = setup({
      newItem: true,
      name: 'test'
    });

    TestUtils.Simulate.blur(rendered.refs.name);

    expect(rendered.props.onUpdateItem).to.have.been.called.once();
    expect(rendered.state).to.include({
      checked: false,
      name: ''
    });


    rendered.refs.name.value = 'second test';
    TestUtils.Simulate.change(rendered.refs.name);

    TestUtils.Simulate.keyDown(rendered.refs.name, {keyCode: ENTER});

    expect(rendered.props.onUpdateItem).to.have.been.called.twice();
    expect(rendered.state).to.include({
      checked: false,
      name: ''
    });

  });

  it('should call onUpdateItem when item\'s checkbox clicked', () => {
    let { rendered } = setup({
      checked: false,
      name: 'checkbox test'
    });

    TestUtils.Simulate.change(rendered.refs.checked);

    expect(rendered.props.onUpdateItem).to.have.been.called.once();
  });

  it('should not call onUpdateItem when new item updates without name', () => {
    const setupParams = {
      newItem: true,
      checked: true,
      name: ''
    };
    let { rendered } = setup(setupParams);

    TestUtils.Simulate.blur(rendered.refs.name);

    expect(rendered.props.onUpdateItem).to.have.not.been.called();
    expect(rendered.state).to.include({
      checked: setupParams.checked,
      name: setupParams.name
    });
  });

  it('should call onUpdateItem when item updates with any (empty) name for not new item', () => {
    const setupParams = {
      checked: true,
      name: ''
    };
    let { rendered } = setup(setupParams);

    TestUtils.Simulate.keyDown(rendered.refs.name, {keyCode: ENTER});

    expect(rendered.props.onUpdateItem).to.have.been.called.once();
  });

  it('should call onDeleteItem when delete button has been clicked', () => {
    const setupParams = {
      checked: true,
      name: 'test',
      onDeleteItem: chai.spy()
    };
    let { rendered } = setup(setupParams);

    const deleteButton = TestUtils.findRenderedDOMComponentWithTag(rendered, 'button');
    TestUtils.Simulate.click(deleteButton);

    expect(rendered.props.onDeleteItem).to.have.been.called.once();
  });
});
