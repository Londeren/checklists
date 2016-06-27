import {fetchTemplates} from '../actions/Templates';
import {Items} from './items';

export function Templates(templates) {
  return Items(templates);
}

export function loadTemplates(store) {
  return () => {
    store.dispatch(fetchTemplates());
  };
}