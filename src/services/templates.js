import find from 'lodash/find';
import {fetchTemplates} from '../actions/Templates';

export function Templates(templates) {
  const items = templates;

  return {
    getById: id => find(items, tpl => tpl.id === id)
  }
}

export function loadTemplates(store) {
  return () => {
    store.dispatch(fetchTemplates());
  };
}