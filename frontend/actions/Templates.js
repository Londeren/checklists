import {v4 as uniqueId}  from 'node-uuid';
import fetch from 'isomorphic-fetch';
import config from '../../config/config.json';
import {
  TEMPLATE_ADD,
  TEMPLATE_FETCH_STARTED, TEMPLATE_FETCH_COMPLETED, TEMPLATE_FETCH_ERROR,
  TEMPLATE_STORE_STARTED, TEMPLATE_STORE_COMPLETED, TEMPLATE_STORE_ERROR,
  TEMPLATE_UPDATE_STARTED, TEMPLATE_UPDATE_COMPLETED, TEMPLATE_UPDATE_ERROR,
} from '../constants/ActionTypes';


export const addTemplate = (name, items) => ({
  type: TEMPLATE_ADD,
  id: uniqueId(),
  name,
  items
});

export function updateTemplate(id, name, items) {
  return dispatch => {
    dispatch(updateStarted());

    return fetch(`${config.base_path}/api/templates`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, name, items})
    }).then(response => response.json())
      .then(json => dispatch(updateCompleted(json)))
      .catch(error => dispatch(updateError(error)));
  }
}

export function fetchTemplates() {
  return dispatch => {
    dispatch(requestTemplates());

    return fetch(`${config.base_path}/api/templates`)
      .then(response => response.json())
      .then(json => dispatch(receiveTemplates(json.templates)))
      .catch(error => dispatch(errorTemplates(error)));
  }
}

export function storeTemplate(name, items) {
  return dispatch => {
    dispatch(storeStarted());

    return fetch(`${config.base_path}/api/templates`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, items})
    }).then(response => response.json())
      .then(json => dispatch(storeCompleted(json)))
      .catch(error => dispatch(storeError(error)));
  }
}

const requestTemplates = () => ({
  type: TEMPLATE_FETCH_STARTED
});

const receiveTemplates = json => ({
  type: TEMPLATE_FETCH_COMPLETED,
  templates: json
});


const errorTemplates = error => ({
  type: TEMPLATE_FETCH_ERROR,
  error: error
});

const storeStarted = () => ({
  type: TEMPLATE_STORE_STARTED
});

const storeCompleted = template => ({
  type: TEMPLATE_STORE_COMPLETED,
  ...template
});

const storeError = error => ({
  type: TEMPLATE_STORE_ERROR,
  error: error
});

const updateStarted = () => ({
  type: TEMPLATE_UPDATE_STARTED
});

const updateCompleted = template => ({
  type: TEMPLATE_UPDATE_COMPLETED,
  ...template
});

const updateError = error => ({
  type: TEMPLATE_UPDATE_ERROR,
  error: error
});