import {expect} from 'chai';
import reducer from './Lists';
import {LIST_STORE_COMPLETED, LIST_UPDATE_COMPLETED, LIST_FETCH_COMPLETED} from '../constants/ActionTypes';

describe('Templates reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.be.eql([]);
  });

  it('should handle LIST_FETCH_COMPLETED', () => {
    const state = [{
      id: '1',
      templateId: '0.1',
      name: 'test',
      items: []
    }];

    const action = {
      type: LIST_FETCH_COMPLETED,
      lists: [{
        id: '2',
        templateId: '0.2',
        name: 'test2',
        items: [{name: 'first item'}]
      }]
    };

    const expected = [
      ...action.lists
    ];

    expect(reducer(state, action)).to.be.eql(expected);
  });

  it('should handle LIST_STORE_COMPLETED', () => {
    const state = [{
      id: '1',
      templateId: '0.1',
      name: 'test',
      items: []
    }];

    const action = {
      type: LIST_STORE_COMPLETED,
      id: '2',
      templateId: '0.2',
      name: 'test2',
      items: [{name: 'first item'}]
    };

    const expected = [
      ...state,
      {
        id: action.id,
        templateId: action.templateId,
        name: action.name,
        items: action.items,
      }
    ];

    expect(reducer(state, action)).to.be.eql(expected);
  });

  it('should handle LIST_UPDATE_COMPLETED', () => {
    const state = [{
      id: '1',
      templateId: '0.1',
      name: 'test',
      items: []
    }, {
      id: '2',
      templateId: '0.2',
      name: 'test2',
      items: [{name: 'first item'}]
    }];

    const action = {
      type: LIST_UPDATE_COMPLETED,
      id: '2',
      templateId: '0.2',
      name: 'test2!',
      items: [{name: 'first item!'}]
    };

    const expected = [
      state[0],
      {
        ...state[1],
        id: action.id,
        templateId: action.templateId,
        name: action.name,
        items: action.items,
      }
    ];

    expect(reducer(state, action)).to.be.eql(expected);
  });


});