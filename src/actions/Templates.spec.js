import {expect} from 'chai';
import {addTemplate} from './Templates';
import {TEMPLATE_ADD} from '../constants/ActionTypes';


describe('Templates actions', () => {

  describe('addTemplate', () => {

    it('should create an action to create a template', () => {
      const name = 'Template name';
      const items = [
        {
          name: 'first item'
        }
      ];
      const expectedAction = {
        type: TEMPLATE_ADD,
        name,
        items
      };

      expect(addTemplate(name, items)).to.include(expectedAction);
    });

  });

});