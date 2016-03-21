import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {getRouteUrl, ROUTE_TEMPLATES_VIEW_TEMPLATE } from '../../constants/routes';

export default class TemplateItem extends Component {

  render() {
    const {id, name, itemsCount} = this.props;

    return (
      <Link to={getRouteUrl(ROUTE_TEMPLATES_VIEW_TEMPLATE, {templateId: id})} className="list-group-item">
        <span className="label label-default label-pill pull-xs-right">{itemsCount}</span>
        {name}</Link>
    );
  }
}

TemplateItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  itemsCount: PropTypes.number.isRequired
};