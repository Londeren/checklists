import {LIST_ADD, LIST_UPDATE} from '../constants/ActionTypes';

export default function(state = [], action) {
  switch(action.type)
  {
    case LIST_ADD:
      return [
        ...state,
        {
          id: action.id,
          templateId: action.templateId,
          name: action.name,
          items: action.items
        }
      ];
    case LIST_UPDATE:
      return state.map((list) => {
        if (list.id === action.id) {
          return Object.assign({}, list, {
            name: action.name,
            items: action.items
          })
        }
        return list
      });
    default:
      return state;
  }
}