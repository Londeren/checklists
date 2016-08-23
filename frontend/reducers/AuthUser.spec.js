'use strict';

import {expect} from 'chai';
import reducer, {defaultState} from './AuthUser';
import { LOGIN_STARTED, LOGIN_COMPLETED, LOGIN_ERROR, LOGOUT_COMPLETED } from '../constants/ActionTypes';


describe('AuthUser reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.be.eql(defaultState);
  });

  it('should handle LOGIN_STARTED', () => {
    const expected = {
      ...defaultState,
      isFetching: true,
    };

    expect(reducer(undefined, {
      type: LOGIN_STARTED
    })).to.eql(expected);
  });

  it('should handle LOGIN_COMPLETED', () => {
    const action = {
      type: LOGIN_COMPLETED,
      id: 'test',
      login: 'test',
      token: 'test'
    };
    const expected = {
      ...defaultState,
      id: action.id,
      login: action.login,
      token: action.token,
      isAuthorized: true
    };

    expect(reducer(undefined, action)).to.eql(expected);
  });

  it('should handle LOGIN_ERROR', () => {
    const action = {
      type: LOGIN_ERROR,
      error: 'error message',
    };
    const expected = {
      ...defaultState,
      error: action.error
    };

    expect(reducer(undefined, action)).to.eql(expected);
  });

  it('should handle LOGOUT_COMPLETED', () => {
    const action = {
      type: LOGOUT_COMPLETED
    };
    const state = {
      ...defaultState,
      id: 'test',
      login: 'test',
      token: 'test',
      isAuthorized: true
    };

    expect(reducer(state, action)).to.eql(defaultState);
  });



});
