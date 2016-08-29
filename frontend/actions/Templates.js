import fetch from 'isomorphic-fetch';
import {
  TEMPLATE_FETCH_STARTED, TEMPLATE_FETCH_COMPLETED, TEMPLATE_FETCH_ERROR,
  TEMPLATE_STORE_STARTED, TEMPLATE_STORE_COMPLETED, TEMPLATE_STORE_ERROR,
  TEMPLATE_UPDATE_STARTED, TEMPLATE_UPDATE_COMPLETED, TEMPLATE_UPDATE_ERROR,
} from '../constants/ActionTypes';
import {setAuthToken} from '../services/authUser';

export function fetchTemplates() {
  return (dispatch, store) => {
    dispatch({
      type: TEMPLATE_FETCH_STARTED
    });

    return fetch(`${config.base_path}/api/templates`, setAuthToken(store))
      .then(response => response.json())
      .then(json => dispatch(receiveTemplates(json.templates)))
      .catch(error => dispatch(errorTemplates(error)));
  }
}

export function storeTemplate(name, items) {
  return (dispatch, store) => {
    dispatch({
      type: TEMPLATE_STORE_STARTED
    });

    return fetch(`${config.base_path}/api/templates`, setAuthToken(store, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, items})
    }))
      .then(response => response.json())
      .then(json => dispatch(storeCompleted(json)))
      .catch(error => dispatch(storeError(error)));
  }
}

export function updateTemplate(id, name, items) {
  return (dispatch, store)=> {
    dispatch({
      type: TEMPLATE_UPDATE_STARTED
    });

    const {authUser: {token}} = store();

    return fetch(`${config.base_path}/api/templates`, setAuthToken(store, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, name, items})
    }))
      .then(response => response.json())
      .then(json => dispatch(updateCompleted(json)))
      .catch(error => dispatch(updateError(error)));
  }
}

const receiveTemplates = json => ({
  type: TEMPLATE_FETCH_COMPLETED,
  templates: json
});


const errorTemplates = error => ({
  type: TEMPLATE_FETCH_ERROR,
  error: error
});

const storeCompleted = template => ({
  type: TEMPLATE_STORE_COMPLETED,
  ...template
});

const storeError = error => ({
  type: TEMPLATE_STORE_ERROR,
  error: error
});


const updateCompleted = template => ({
  type: TEMPLATE_UPDATE_COMPLETED,
  ...template
});

const updateError = error => ({
  type: TEMPLATE_UPDATE_ERROR,
  error: error
});