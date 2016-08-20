'use strict';
import fetch from 'isomorphic-fetch';

import {LOGIN_STARTED, LOGIN_COMPLETED, LOGIN_ERROR} from '../constants/ActionTypes';

export function login(creds) {
  return dispatch => {
    dispatch({
      type: LOGIN_STARTED,
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
      .then(user => {
          dispatch({
              type: LOGIN_COMPLETED,
              id: user.id,
              login: user.login,
              token: token
            }
          );
        }
      )
      .catch(error => dispatch({
          type: LOGIN_ERROR,
          error
        }
      ));
  }
}
