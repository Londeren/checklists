import {TEMPLATE_ADD, TEMPLATE_UPDATE, TEMPLATE_FETCH_COMPLETED} from '../constants/ActionTypes';

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
    case TEMPLATE_UPDATE:
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
        ...state,
        ...action.templates
      ];
    default:
      return state;
  }
};