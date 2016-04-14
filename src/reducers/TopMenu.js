import { UPDATE_LOCATION } from 'react-router-redux'

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
          isActive: action.payload.pathname.slice(0, item.link.length) == item.link
        });
      });
    default:
      return state;
  }
}