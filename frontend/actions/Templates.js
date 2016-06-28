import {v4 as uniqueId}  from 'node-uuid';
import fetch from 'isomorphic-fetch';
import config from '../../config/config.json';
import {
  TEMPLATE_ADD,
  TEMPLATE_UPDATE,
  TEMPLATE_FETCH_STARTED, TEMPLATE_FETCH_COMPLETED, TEMPLATE_FETCH_ERROR
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

