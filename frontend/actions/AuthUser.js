'use strict';
import fetch from 'isomorphic-fetch';

import { LOGIN_STARTED, LOGIN_COMPLETED, LOGIN_ERROR } from '../constants/ActionTypes';

export function login(creds) {
  return dispatch => {
    dispatch({
      type: LOGIN_STARTED,
      isFetching: true,
      isAuthorized: false,
      creds
    });

    return fetch(`${config.base_path}/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(creds)
    })
      .then(response => response.json())
      .then(user =>
        dispatch({
            type: LOGIN_COMPLETED,
            isFetching: false,
            isAuthorized: true,
            login: user.login
          }
        )
      )
      .catch(error => dispatch({
          type: LOGIN_ERROR,
          isFetching: false,
          isAuthorized: false,
          error
        }
      ));
  }
}
