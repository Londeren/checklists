import chai, {expect} from 'chai';
import spies from 'chai-spies';
import reducer from './Templates';
import {TEMPLATE_ADD, TEMPLATE_UPDATE} from '../constants/ActionTypes';

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

  it('should handle TEMPLATE_UPDATE');

});