import { UPDATE_LOCATION } from 'redux-simple-router'

const topMenu = [
  {
    name: 'Templates',
    link: '/templates',
    isActive: false
  },
  {
    name: 'Lists',
    link: '/lists',
    isActive: false
  }
];

export default function(state = topMenu, action) {

  switch(action.type)
  {
    case UPDATE_LOCATION:
      return state.map(item => {
        return Object.assign({}, item, {
          isActive: action.location.pathname.slice(0, item.link.length) == item.link
        });
      });
      return menu;
    default:
      return state;
  }
};