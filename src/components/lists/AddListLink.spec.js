import chai, {expect} from 'chai';
import spies from 'chai-spies';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import AddListLink from './AddListLink';
import AddItemButton from '../AddItemButton';

chai.use(spies);

function setup(templateList = []) {
  let props = {
    templateList,
    onAdd: chai.spy()
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<AddListLink {...props} />);
  let output = renderer.getRenderOutput();

  let rendered = TestUtils.renderIntoDocument(<AddListLink {...props} />);


  return {
    props,
    output,
    renderer,
    rendered
  }
}

describe('AddListLink component', () => {
  it('should render correctly', () => {
    const setupTemplateList = [
      {
        id: "1",
        name: "first"
      },
      {
        id: "2",
        name: "second"
      }
    ];

    const { output } = setup(setupTemplateList);

    expect(output.type).to.equal('div');
    expect(output.props.className).to.equal('row');

    const [selectCol, buttonCol] = output.props.children;
    {
      expect(selectCol.type).to.equal('div');
      expect(selectCol.props.className).to.equal('col-xs-7');

      const selectTemplate = selectCol.props.children;
      {
        expect(selectTemplate.type).to.equal('select');
        expect(selectTemplate.props.className).to.equal('form-control');

        const [defaultOption, options] = selectTemplate.props.children;
        {
          expect(defaultOption.type).to.equal('option');
          expect(defaultOption.props.children).to.equal('1. Select template');

          options.map((option, index) => {
            expect(option.type).to.equal('option');
            expect(option.props.children).to.equal(setupTemplateList[index].name);
            expect(option.props.value).to.equal(setupTemplateList[index].id);
          });
        }

      }

      expect(buttonCol.type).to.equal('div');
      expect(buttonCol.props.className).to.equal('col-xs-5');

      const addItemButton = buttonCol.props.children;
      {
        expect(addItemButton.type).to.equal(AddItemButton);
        expect(addItemButton.props.children).to.equal('2. Create list');
      }
    }
  });

  it('should set `state.templateId` if template changed', () => {
    const setupTemplateList = [
      {
        id: "1",
        name: "first"
      },
      {
        id: "2",
        name: "second"
      }
    ];

    let { rendered } = setup(setupTemplateList);
    let select = TestUtils.findRenderedDOMComponentWithTag(rendered, 'select');

    select.value = setupTemplateList[1].id;
    TestUtils.Simulate.change(select);

    expect(rendered.state.templateId).to.equal(setupTemplateList[1].id);
  });

  it('should call function `onAdd` if templateId greather than 0', () => {
    const setupTemplateList = [
      {
        id: "1",
        name: "first"
      },
      {
        id: "2",
        name: "second"
      }
    ];

    let { rendered } = setup(setupTemplateList);
    let select = TestUtils.findRenderedDOMComponentWithTag(rendered, 'select');

    rendered.addItem();

    expect(rendered.props.onAdd).to.have.not.been.called();


    select.value = setupTemplateList[1].id;
    TestUtils.Simulate.change(select);

    rendered.addItem();

    expect(rendered.props.onAdd).to.have.been.called.once();
  });




});