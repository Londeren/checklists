import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { DOCUMENT_FETCH_COMPLETED } from '../actions/getDocumentsActions';

const initialState = {
  documents: [],
  topMenuItems: [
    {
      name: 'Templates',
      link: '/templates',
      isActive: false
    },
      {
      name: 'Lists',
      link: '/lists',
      isActive: false
    }
  ]
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

const topMenuItems = function(state = initialState.topMenuItems, action) {
  return state;
};


const rootReducer = combineReducers({
  routing: routeReducer,
  documents,
  topMenuItems
});

export default rootReducer;

