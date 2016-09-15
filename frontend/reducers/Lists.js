import {LIST_FETCH_COMPLETED, LIST_UPDATE_COMPLETED, LIST_STORE_COMPLETED} from '../constants/ActionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case LIST_FETCH_COMPLETED:
      return [
        ...action.lists
      ];
    case LIST_STORE_COMPLETED:
      return [
        ...state,
        {
          id: action.id,
          templateId: action.templateId,
          name: action.name,
          items: action.items
        }
      ];
    case LIST_UPDATE_COMPLETED:
      return state.map((list) => {
        if (list.id === action.id) {
          return Object.assign({}, list, {
            name: action.name,
            items: action.items
          })
        }
        return list;
      });
    default:
      return state;
  }
}