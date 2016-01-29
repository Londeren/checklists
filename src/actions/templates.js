import {v4 as uniqueId}  from 'node-uuid';
import {TEMPLATE_ADD} from '../constants/ActionTypes';


export function addTemplate(name, items) {
  return {
    type: TEMPLATE_ADD,
    id: uniqueId(),
    name,
    items
  };
}