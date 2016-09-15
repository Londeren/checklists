import {LIST_FETCH_COMPLETED, LIST_UPDATE_COMPLETED, LIST_STORE_COMPLETED} from '../constants/ActionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case LIST_FETCH_COMPLETED:
      return [
        ...state,
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
    default:
      return state;
  }
}