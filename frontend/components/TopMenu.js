import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class TopMenu extends Component {

  render() {
    const { items, rightNavbar } = this.props;

    return (
        <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
          <Link to="/" className="navbar-brand">Lists</Link>

          <ul className="nav navbar-nav">
            {items.map(function(item) {
              return (
                  <li key={item.link} className={'nav-item' + (item.isActive ? ' active' : '')}>
                    <Link to={item.link} className="nav-link" activeClassName="active">{item.name}</Link>
                  </li>
              );
            })}
          </ul>

          {rightNavbar}
        </nav>
    );
  }
}

TopMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  rightNavbar: PropTypes.node
};