import {fetchLists} from '../actions/Lists';
import {Items} from './items';

export function Lists(templates) {
  return Items(templates);
}

export function loadLists(store) {
  return () => {
    store.dispatch(fetchLists());
  };
}