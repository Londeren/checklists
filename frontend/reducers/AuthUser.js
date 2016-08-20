'use strict';
import {LOGIN_STARTED, LOGIN_COMPLETED, LOGIN_ERROR} from '../constants/ActionTypes';


export const defaultState = {
  id: undefined,
  login: undefined,
  token: undefined,
  isFetching: false,
  isAuthorized: false,
  error: undefined,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...defaultState,
        isFetching: true
      };
    case LOGIN_COMPLETED:
      return {
        ...defaultState,
        id: action.id,
        login: action.login,
        token: action.token,
        isAuthorized: true
      };
    case LOGIN_ERROR:
      return {
        ...defaultState,
        error: action.error
      };
    default:
      return state;
  }
};