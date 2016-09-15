import {v4 as uniqueId}  from 'node-uuid';
import fetch from 'isomorphic-fetch';
import {LIST_ADD, LIST_UPDATE,
  LIST_FETCH_STARTED, LIST_FETCH_COMPLETED, LIST_FETCH_ERROR,
  LIST_STORE_STARTED, LIST_STORE_COMPLETED, LIST_STORE_ERROR,
  LIST_UPDATE_STARTED, LIST_UPDATE_COMPLETED, LIST_UPDATE_ERROR
} from '../constants/ActionTypes';
import {setAuthToken} from '../services/authUser';

export function fetchLists() {
  return (dispatch, store) => {
    dispatch({
        type: LIST_FETCH_STARTED
      }
    );

    return fetch(`${config.base_path}/api/lists`, setAuthToken(store))
      .then(response => response.json())
      .then(json =>
        dispatch({
          type: LIST_FETCH_COMPLETED,
          lists: json.lists
        })
      )
      .catch(error => dispatch({
          type: LIST_FETCH_ERROR,
          error: error
        }
      ));
  }
}

export function storeList(templateId, name, items, action = undefined) {
  return (dispatch, store) => {
    dispatch({
        type: LIST_STORE_STARTED
      }
    );

    items = items.map(item => {
      return {
        name: item.name,
        done: item.done
      }
    });

    return fetch(`${config.base_path}/api/lists`, setAuthToken(store, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({templateId, name, items})
    }))
      .then(response => response.json())
      .then(list => {
        const actionObject = {
          type: LIST_STORE_COMPLETED,
          ...list
        };
        dispatch(actionObject);

        if(typeof action === 'function') {
          action(actionObject);
        }
      })
      .catch(error => dispatch({
        type: LIST_STORE_ERROR,
        error: error
      }));
  }
}

export function updateList(id, name, items) {
  return (dispatch, store)=> {
    dispatch({
      type: LIST_UPDATE_STARTED
    });

    const {authUser: {token}} = store();

    return fetch(`${config.base_path}/api/lists`, setAuthToken(store, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, name, items})
    }))
      .then(response => response.json())
      .then(list => dispatch({
        type: LIST_UPDATE_COMPLETED,
        ...list
      }))
      .catch(error => dispatch({
        type: LIST_UPDATE_ERROR,
        error: error
      }));
  }
}

export function updateListSync(id, name, items) {
  return {
    type: LIST_UPDATE,
    id,
    name,
    items
  }
}