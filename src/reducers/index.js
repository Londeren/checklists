import {combineReducers} from 'redux';
import {DOCUMENT_FETCH_COMPLETED} from '../constants/actions';

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
  documents
});

export default rootReducer;

