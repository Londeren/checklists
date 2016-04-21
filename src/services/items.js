import find from 'lodash/find';

export function Items(items) {
  const itemList = items;

  return {
    getById: id => find(itemList, itm => itm.id === id)
  }
}