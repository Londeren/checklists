import find from 'lodash/find';

export function Templates(templates) {
  const items = templates;

  return {
    getById: id => find(items, (tpl) => tpl.id === id)
  }
}