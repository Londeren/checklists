import chai, {expect} from 'chai';
import spies from 'chai-spies';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TemplateItem from './TemplateItem';
import { Link } from 'react-router';
import {ROUTE_TEMPLATES_VIEW_TEMPLATE } from '../../constants/routes';
import {getRouteUrl} from '../../services/routes';


chai.use(spies);

function setup(id, name, itemsCount) {
  let props = {
    id,
    name,
    itemsCount
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<TemplateItem {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  }
}

describe('TemplateItem component', () => {
  it('should render correctly', () => {

    const id = '1';
    const name = 'test';
    const itemsCount = 2;

    const { output } = setup(id, name, itemsCount);

    expect(output.type).to.equal(Link);
    expect(output.props.to).to.equal(getRouteUrl(ROUTE_TEMPLATES_VIEW_TEMPLATE, {templateId: id}));
    expect(output.props.className).to.equal('list-group-item');

    const [label, itemName] = output.props.children;
    {
      expect(label.type).to.equal('span');
      expect(label.props.className).to.equal('label label-default label-pill pull-xs-right');
      expect(label.props.children).to.equal(itemsCount);

      expect(itemName).to.equal(name);

    }
  });


});