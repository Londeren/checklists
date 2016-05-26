import chai, {expect} from 'chai';
import spies from 'chai-spies';
import reducer from './Templates';
import {TEMPLATE_ADD, TEMPLATE_UPDATE, TEMPLATE_FETCH_COMPLETED} from '../constants/ActionTypes';

chai.use(spies);


describe('Templates reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.be.eql([]);
  });

  it('should handle TEMPLATE_ADD', () => {
    expect(reducer([], {
      type: TEMPLATE_ADD,
      id: '1',
      name: 'test',
      items: []
    })).to.be.eql([
      {
        id: '1',
        name: 'test',
        items: []
      }
    ]);

    expect(reducer([{
      id: '1',
      name: 'test',
      items: []
    }], {
      type: TEMPLATE_ADD,
      id: '2',
      name: 'test2',
      items: [{name: 'first item'}]
    })).to.be.eql([
      {
        id: '1',
        name: 'test',
        items: []
      },
      {
        id: '2',
        name: 'test2',
        items: [{name: 'first item'}]
      }
    ]);
  });

  it('should handle TEMPLATE_UPDATE', () => {
    expect(reducer([], {
      type: TEMPLATE_UPDATE,
      id: '1',
      name: 'test',
      items: []
    })).to.be.eql([]);

    expect(reducer([{
      id: '1',
      name: 'test',
      items: []
    }], {
      type: TEMPLATE_UPDATE,
      id: '1',
      name: 'new name',
      items: [{name: 'new item'}]
    })).to.be.eql([
      {
        id: '1',
        name: 'new name',
        items: [{name: 'new item'}]
      }
    ]);

    expect(reducer([{
      id: '1',
      name: 'test',
      items: []
    }], {
      type: TEMPLATE_UPDATE,
      id: '2',
      name: 'new name',
      items: [{name: 'new item'}]
    })).to.be.eql([
      {
        id: '1',
        name: 'test',
        items: []
      }
    ]);

    expect(reducer([{
      id: '1',
      name: 'test',
      items: [{name: 'first item'}]
    }], {
      type: TEMPLATE_UPDATE,
      id: '1',
      name: 'new name',
      items: []
    })).to.be.eql([
      {
        id: '1',
        name: 'new name',
        items: []
      }
    ]);
  });

  it('should handle TEMPLATE_FETCH_COMPLETED', () => {
    expect(reducer([{
      id: '1',
      name: 'test',
      items: []
    }], {
      type: TEMPLATE_FETCH_COMPLETED,
      templates: [{
        id: '2',
        name: 'test2',
        items: [{name: 'first item'}]
      }]
    })).to.be.eql([
      {
        id: '1',
        name: 'test',
        items: []
      },
      {
        id: '2',
        name: 'test2',
        items: [{name: 'first item'}]
      }
    ]);
  });

});