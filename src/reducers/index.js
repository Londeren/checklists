import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { DOCUMENT_FETCH_COMPLETED } from '../actions/getDocumentsActions';
import topMenu from '../reducers/TopMenu';

const initialState = {
  documents: []

};

const documents = function(state = initialState.documents, action) {
  switch(action.type)
  {
    case DOCUMENT_FETCH_COMPLETED:
      return action.documents;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  routing: routeReducer,
  topMenu,
  documents
});

export default rootReducer;

