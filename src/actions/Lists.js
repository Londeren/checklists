import {v4 as uniqueId}  from 'node-uuid';
import {LIST_ADD} from '../constants/ActionTypes';


export function addList({id, name, items}) {
  return {
    type: LIST_ADD,
    id: uniqueId(),
    templateId: id,
    name,
    items
  };
}