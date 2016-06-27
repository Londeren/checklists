import {expect} from 'chai';
import reducer from './Lists';
import {LIST_ADD, LIST_UPDATE} from '../constants/ActionTypes';

describe('Templates reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.be.eql([]);
  });

  it('should handle LIST_ADD', () => {
    expect(reducer([], {
      type: LIST_ADD,
      id: '1',
      templateId: '0.1',
      name: 'test',
      items: []
    })).to.be.eql([
      {
        id: '1',
        templateId: '0.1',
        name: 'test',
        items: []
      }
    ]);

    expect(reducer([{
      id: '1',
      templateId: '0.1',
      name: 'test',
      items: []
    }], {
      type: LIST_ADD,
      id: '2',
      templateId: '0.2',
      name: 'test2',
      items: [{name: 'first item'}]
    })).to.be.eql([
      {
        id: '1',
        templateId: '0.1',
        name: 'test',
        items: []
      },
      {
        id: '2',
        templateId: '0.2',
        name: 'test2',
        items: [{name: 'first item'}]
      }
    ]);
  });

  it('should handle LIST_UPDATE', () => {
    expect(reducer([], {
      type: LIST_UPDATE,
      id: '1',
      name: 'test',
      items: []
    })).to.be.eql([]);

    expect(reducer([{
      id: '1',
      templateId: '0.1',
      name: 'test',
      items: []
    }], {
      type: LIST_UPDATE,
      id: '1',
      name: 'test1',
      items: [{name: 'first item'}]
    })).to.be.eql([
      {
        id: '1',
        templateId: '0.1',
        name: 'test1',
        items: [{name: 'first item'}]
      }
    ]);
  });
});