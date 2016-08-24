'use strict';
import fetch from 'isomorphic-fetch';
import {routeActions} from 'react-router-redux';

import {LOGIN_STARTED, LOGIN_COMPLETED, LOGIN_ERROR, LOGOUT_COMPLETED} from '../constants/ActionTypes';
import userStore from '../services/authUserStore';
import {ROUTE_INDEX} from '../constants/routes';
import {getRouteUrl} from '../services/routes';

export function login(creds, nextUrl = ROUTE_INDEX) {
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
          userStore.save(user);

          dispatch({
              type: LOGIN_COMPLETED,
              id: user.user.id,
              login: user.user.login,
              token: user.token
            }
          );

          dispatch(routeActions.push(getRouteUrl(nextUrl)));
        }
      )
      .catch(error => dispatch({
          type: LOGIN_ERROR,
          error
        }
      ));
  }
}

export function logout() {
  userStore.delete();

  return {
    type: LOGOUT_COMPLETED
  }
}
