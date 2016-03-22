import {v4 as uniqueId}  from 'node-uuid';
import {TEMPLATE_ADD, TEMPLATE_UPDATE} from '../constants/ActionTypes';


export function addTemplate(name, items) {
  return {
    type: TEMPLATE_ADD,
    id: uniqueId(),
    name,
    items
  };
}

export function updateTemplate(id, name, items) {
  return {
    type: TEMPLATE_UPDATE,
    id,
    name,
    items
  }
}