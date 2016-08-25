import chai, {expect} from 'chai';
import {setAuthToken} from './authUser';


describe('setAuthToken', () => {
  it('should add Authorization header', () => {

    const getStorage = () => ({authUser: {token: 'test'}});
    const expected = {headers: {Authorization: 'Bearer test'}};

    expect(setAuthToken(getStorage)).to.be.eql(expected);
  });

  it('should add Authorization header to existing object', () => {
    const getStorage = () => ({authUser: {token: 'test'}});
    const existing = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }};
    const expected = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer test',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    expect(setAuthToken(getStorage, existing)).to.be.eql(expected);
  });


});