import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { DOCUMENT_FETCH_COMPLETED } from '../actions/getDocumentsActions';
import topMenu from '../reducers/TopMenu';

const rootReducer = combineReducers({
  routing: routeReducer,
  topMenu
});

export default rootReducer;

