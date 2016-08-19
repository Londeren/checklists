import {v4 as uniqueId}  from 'node-uuid';
import fetch from 'isomorphic-fetch';
import {LIST_ADD, LIST_UPDATE,
  LIST_FETCH_STARTED, LIST_FETCH_COMPLETED, LIST_FETCH_ERROR
} from '../constants/ActionTypes';


export function addList({id, name, items}) {
  items = items.map(item => {
    return {
      id: uniqueId(),
      name: item.name,
      done: item.done
    }
  });

  return {
    type: LIST_ADD,
    id: uniqueId(),
    templateId: id,
    name,
    items
  };
}

export function updateList(id, name, items) {
  return {
    type: LIST_UPDATE,
    id,
    name,
    items
  }
}

export function fetchLists() {
  return dispatch => {
    dispatch(requestLists());

    return fetch(`${config.base_path}/api/lists`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveLists(json.lists))
      )
      .catch(error => dispatch(errorLists(error)));
  }
}


function requestLists() {
  return {
    type: LIST_FETCH_STARTED
  }
}

function receiveLists(json) {
  return {
    type: LIST_FETCH_COMPLETED,
    lists: json
  }
}


function errorLists(error) {
  return {
    type: LIST_FETCH_ERROR,
    error: error
  }
}