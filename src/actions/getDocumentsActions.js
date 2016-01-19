import fetch from 'isomorphic-fetch';


export const DOCUMENT_FETCH_STARTED = 'DOCUMENT_FETCH_STARTED';
export const DOCUMENT_FETCH_COMPLETED = 'DOCUMENT_FETCH_COMPLETED';
export const DOCUMENT_FETCH_ERROR = 'DOCUMENT_FETCH_ERROR';


function requestDocuments() {
  return {
    type: DOCUMENT_FETCH_STARTED
  }
}

function receiveDocuments(json) {
  return {
    type: DOCUMENT_FETCH_COMPLETED,
    documents: json
  }
}


function errorDocuments(error) {
  return {
    type: DOCUMENT_FETCH_ERROR,
    error: error
  }
}
export function fetchDocuments() {
  return dispatch => {
    dispatch(requestDocuments());

    return fetch('/documents.json')
        .then(response => response.json())
        .then(json =>
            dispatch(receiveDocuments(json))
        )
        .catch(error => dispatch(errorDocuments(error)));
  }
}