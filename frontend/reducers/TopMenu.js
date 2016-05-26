import { UPDATE_LOCATION } from 'react-router-redux'
import {topMenuInitialItems} from '../constants/TopMenu';

export default function(state = topMenuInitialItems, action) {

  switch (action.type) {
    case UPDATE_LOCATION:
      return state.map(item => {
        return Object.assign({}, item, {
          isActive: action.payload.pathname.slice(0, item.link.length) == item.link
        });
      }).slice();
    default:
      return state;
  }
}