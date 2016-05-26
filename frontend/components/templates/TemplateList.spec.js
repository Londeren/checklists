import chai, {expect} from 'chai';
import spies from 'chai-spies';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TemplateList from './TemplateList';
import TemplateItem from './TemplateItem';

chai.use(spies);

function setup(items = []) {
  let props = {
    items: items
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<TemplateList {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  }
}

describe('TemplateList component', () => {
  it('should render correctly', () => {
    const setupItems = [
      {
        id: '1',
        name: 'first',
        items: [
          {
            id: '1.1',
            name: 'first option 1',
            done: false
          }
        ]
      },
      {
        id: '2',
        name: 'second',
        items: [
          {
            id: '2.1',
            name: 'second option 1',
            done: false
          },
          {
            id: '2.2',
            name: 'second option 2',
            done: true
          },
          {
            id: '2.3',
            name: 'second option 3',
            done: false
          }
        ]
      }
    ];

    const { output } = setup(setupItems);

    expect(output.type).to.equal('div');
    expect(output.props.className).to.equal('list-group');

    const templateItems = output.props.children;

    expect(templateItems.length).to.equal(2);

    templateItems.forEach((templateItem, key) => {
      expect(templateItem.type).to.equal(TemplateItem);
      expect(templateItem.props.id).to.equal(setupItems[key].id);
      expect(templateItem.props.name).to.equal(setupItems[key].name);
      expect(templateItem.props.itemsCount).to.equal(setupItems[key].items.length);
    });


  });


});