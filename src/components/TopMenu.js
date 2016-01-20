import React, { Component } from 'react';
import { Link } from 'react-router';

export default class TopMenu extends Component {

  render() {
    const { items } = this.props;

    return (
        <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
          <Link to="/" className="navbar-brand">Lists</Link>

          <ul className="nav navbar-nav">
            {items.map(function(item) {
              return (
                  <li className={'nav-item' + (item.isActive ? ' active' : '')}>
                    <Link to={item.link} className="nav-link">{item.name}</Link>
                  </li>
              );
            })}
          </ul>
        </nav>
    );
  }
}