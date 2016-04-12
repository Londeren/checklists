import {LIST_ADD, LIST_UPDATE} from '../constants/ActionTypes';
import {v4 as uniqueId}  from 'node-uuid';

export default function(state = [], action) {
  switch(action.type)
  {
    case LIST_ADD:
      const items = action.items.map(item => {
        return {
          id: uniqueId(),
          name: item.name,
          done: item.done
        }
      });

      return [
        ...state,
        {
          id: action.id,
          templateId: action.templateId,
          name: action.name,
          items: items
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
};