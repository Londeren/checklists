import chai, {expect} from 'chai';
import spies from 'chai-spies';
import reducer from './TopMenu';
import {topMenuInitialItems} from '../constants/TopMenu';
import { UPDATE_LOCATION } from 'react-router-redux'

chai.use(spies);


describe('TopMenu reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.be.eql(topMenuInitialItems);
  });

  it('should handle UPDATE_LOCATION', () => {

    let expected = topMenuInitialItems.slice();
    expected[1].isActive = true;

    expect(reducer(topMenuInitialItems, {
      type: UPDATE_LOCATION,
      payload: {
        pathname: '/lists/'
      }
    })).to.be.eql(expected);
  });

});