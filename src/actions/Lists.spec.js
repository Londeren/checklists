import configureMockStore from 'redux-mock-store';
import {expect} from 'chai';

import {addList, updateList} from './Lists';
import {LIST_ADD, LIST_UPDATE} from '../constants/ActionTypes';


describe('Lists actions', () => {

  describe('addList', () => {

    it('should create action with type LIST_ADD', () => {
      const setupAddList = {
        id: '1',
        name: 'Template name',
        items: [{
          id: '1.1',
          name: 'item name',
          done: true
        }]
      };

      const expectedAction = {
        type: LIST_ADD,
        templateId: setupAddList.id,
        name: setupAddList.name
      };
      const expectedActionItem = {
        name: setupAddList.items[0].name,
        done: setupAddList.items[0].done
      };

      const actionResult = addList(setupAddList);

      expect(actionResult).to.include(expectedAction);
      expect(actionResult.items[0]).to.include(expectedActionItem);
    });

  });

  describe('updateTemplate', () => {

    it('should create action with type LIST_UPDATE');

  });



});