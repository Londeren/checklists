import {v4 as uniqueId}  from 'node-uuid';
import fetch from 'isomorphic-fetch';
import config from '../../config/config.json';
import {
  TEMPLATE_ADD,
  TEMPLATE_UPDATE,
  TEMPLATE_FETCH_STARTED, TEMPLATE_FETCH_COMPLETED, TEMPLATE_FETCH_ERROR,
  TEMPLATE_STORE_STARTED, TEMPLATE_STORE_COMPLETED, TEMPLATE_STORE_ERROR
} from '../constants/ActionTypes';


export function addTemplate(name, items) {
  return {
    type: TEMPLATE_ADD,
    id: uniqueId(),
    name,
    items
  };
}

export function updateTemplate(id, name, items) {
  return {
    type: TEMPLATE_UPDATE,
    id,
    name,
    items
  }
}

export function fetchTemplates() {
  return dispatch => {
    dispatch(requestTemplates());

    return fetch(`${config.base_path}/api/templates`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveTemplates(json.templates))
      )
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
      .then(json =>
        dispatch(storeCompleted(json))
      )
      .catch(error => dispatch(storeError(error)));
  }
}

function requestTemplates() {
  return {
    type: TEMPLATE_FETCH_STARTED
  }
}

function receiveTemplates(json) {
  return {
    type: TEMPLATE_FETCH_COMPLETED,
    templates: json
  }
}


function errorTemplates(error) {
  return {
    type: TEMPLATE_FETCH_ERROR,
    error: error
  }
}

function storeStarted() {
  return {
    type: TEMPLATE_STORE_STARTED
  }
}

function storeCompleted(json) {
  return {
    type: TEMPLATE_STORE_COMPLETED,
    ...json
  };
}

function storeError(error) {
  return {
    type: TEMPLATE_STORE_ERROR,
    error: error
  }
}