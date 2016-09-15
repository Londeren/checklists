import {expect} from 'chai';
import reducer from './Lists';
import {LIST_STORE_COMPLETED, LIST_UPDATE_COMPLETED, LIST_FETCH_COMPLETED} from '../constants/ActionTypes';

describe('Templates reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.be.eql([]);
  });

  it('should handle LIST_FETCH_COMPLETED', () => {
    expect(reducer([{
      id: '1',
      templateId: '0.1',
      name: 'test',
      items: []
    }], {
      type: LIST_FETCH_COMPLETED,
      lists: [{
        id: '2',
        templateId: '0.2',
        name: 'test2',
        items: [{name: 'first item'}]
      }]
    })).to.be.eql([
      {
        id: '1',
        name: 'test',
        templateId: '0.1',
        items: []
      },
      {
        id: '2',
        name: 'test2',
        templateId: '0.2',
        items: [{name: 'first item'}]
      }
    ]);
  });

  it('should handle LIST_STORE_COMPLETED', () => {
    expect(reducer([{
      id: '1',
      templateId: '0.1',
      name: 'test',
      items: []
    }], {
      type: LIST_STORE_COMPLETED,
      lists: [{
        id: '2',
        templateId: '0.2',
        name: 'test2',
        items: [{name: 'first item'}]
      }]
    })).to.be.eql([
      {
        id: '1',
        name: 'test',
        templateId: '0.1',
        items: []
      },
      {
        id: '2',
        name: 'test2',
        templateId: '0.2',
        items: [{name: 'first item'}]
      }
    ]);
  });
});