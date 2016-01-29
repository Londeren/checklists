import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { DOCUMENT_FETCH_COMPLETED } from '../actions/getDocumentsActions';
import topMenu from '../reducers/TopMenu';
import templates from '../reducers/Templates';

const rootReducer = combineReducers({
  routing: routeReducer,
  topMenu,
  templates
});

export default rootReducer;

