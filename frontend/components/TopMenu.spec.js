import chai, {expect} from 'chai';
import spies from 'chai-spies';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TopMenu from './TopMenu';
import { Link } from 'react-router';


chai.use(spies);

function setup(items, rightNavbar = 'rightNavbar') {

  let renderer = TestUtils.createRenderer();
  renderer.render(<TopMenu items={items} rightNavbar={rightNavbar}/>);
  let output = renderer.getRenderOutput();

  return {
    output,
    renderer
  }
}

describe('TopMenu component', () => {
  it('should render correctly', () => {
    const setupItems = [
      {
        name: 'Test1',
        link: '/test1',
        isActive: true
      },
      {
        name: 'Test2',
        link: '/test2',
        isActive: false
      },
      {
        name: 'Test3',
        link: '/test3',
        isActive: true
      }
    ];

    const rightNavbar = 'right navbar';

    const { output } = setup(setupItems, rightNavbar);

    expect(output.type).to.equal('nav');
    expect(output.props.className).to.equal('navbar navbar-fixed-top navbar-dark bg-inverse');

    {
      const [mainPageLink, menuUl, rightNavbarChild] = output.props.children;

      {
        expect(mainPageLink.type).to.equal(Link);
        expect(mainPageLink.props.className).to.equal('navbar-brand');
        expect(mainPageLink.props.children).to.equal('Lists');

        expect(menuUl.type).to.equal('ul');
        expect(menuUl.props.className).to.equal('nav navbar-nav');

        menuUl.props.children.forEach((menuItem, k) => {
          expect(menuItem.type).to.equal('li');
          expect(menuItem.props.className).to.equal('nav-item' + (setupItems[k].isActive ? ' active' : ''));

          const itemLink = menuItem.props.children;

          {
            expect(itemLink.type).to.equal(Link);
            expect(itemLink.props.to).to.equal(setupItems[k].link);
            expect(itemLink.props.className).to.equal('nav-link');
            expect(itemLink.props.activeClassName).to.equal('active');
            expect(itemLink.props.children).to.equal(setupItems[k].name);
          }
        });

        expect(rightNavbarChild).to.equal(rightNavbar);
      }
    }

  });

});
