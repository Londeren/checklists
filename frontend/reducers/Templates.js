import {TEMPLATE_FETCH_COMPLETED, TEMPLATE_STORE_COMPLETED, TEMPLATE_UPDATE_COMPLETED} from '../constants/ActionTypes';

export default function(state = [], action) {
  switch(action.type)
  {
    case TEMPLATE_STORE_COMPLETED:
      return [
          ...state,
        {
          id: action.id,
          name: action.name,
          items: action.items
        }
      ];
    case TEMPLATE_UPDATE_COMPLETED:
      return state.map((template) => {
        if (template.id === action.id) {
          return Object.assign({}, template, {
            name: action.name,
            items: action.items
          })
        }
        return template
      });
    case TEMPLATE_FETCH_COMPLETED:
      return [
        ...action.templates
      ];
    default:
      return state;
  }
}