import {LIST_ADD} from '../constants/ActionTypes';
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
      break;
    default:
      return state;
  }
};