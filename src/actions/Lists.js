import {v4 as uniqueId}  from 'node-uuid';
import {LIST_ADD, LIST_UPDATE} from '../constants/ActionTypes';


export function addList({id, name, items}) {
  items = items.map(item => {
    return {
      id: uniqueId(),
      name: item.name,
      done: item.done
    }
  });

  return {
    type: LIST_ADD,
    id: uniqueId(),
    templateId: id,
    name,
    items
  };
}

export function updateList(id, name, items) {
  return {
    type: LIST_UPDATE,
    id,
    name,
    items
  }
}