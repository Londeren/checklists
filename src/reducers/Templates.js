import {TEMPLATE_ADD} from '../constants/ActionTypes';

export default function(state = [], action) {
  switch(action.type)
  {
    case TEMPLATE_ADD:
      return [
          ...state,
        {
          id: action.id,
          name: action.name,
          items: action.items
        }
      ];
      break;
    default:
      return state;
  }
};