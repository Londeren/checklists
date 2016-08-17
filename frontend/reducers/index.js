import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import topMenu from '../reducers/TopMenu';
import templates from '../reducers/Templates';
import lists from '../reducers/Lists';
import authUser from '../reducers/AuthUser';

const rootReducer = combineReducers({
  routing: routeReducer,
  topMenu,
  templates,
  lists,
  authUser
});

export default rootReducer;

