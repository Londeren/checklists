import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {ROUTE_LISTS_VIEW_LIST } from '../../constants/routes';
import {getRouteUrl} from '../../services/routes';

export default class ListItem extends Component {

  render() {
    const {id, name, itemsCount} = this.props;

    return (
      <Link to={getRouteUrl(ROUTE_LISTS_VIEW_LIST, {listId: id})} className="list-group-item">
        <span className="label label-default label-pill pull-xs-right">{itemsCount}</span>
        {name}</Link>
    );
  }
}

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  itemsCount: PropTypes.number.isRequired
};