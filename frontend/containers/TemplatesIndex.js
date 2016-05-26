import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import AddItemButton from '../components/AddItemButton';
import TemplateList from '../components/templates/TemplateList';
import {ROUTE_TEMPLATES_CREATE} from '../constants/routes';
import {getRouteUrl} from '../services/routes';

class TemplatesIndex extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
  }

  addItem() {
    this.props.dispatch(routeActions.push(getRouteUrl(ROUTE_TEMPLATES_CREATE)));
  }

  render() {
    return (
      <div>
        <AddItemButton onClickAction={this.addItem} buttonAdditionalClasses="btn-lg">Create template</AddItemButton>

        <TemplateList items={this.props.templates} />
      </div>
    );
  }
}

export default connect((state) => {
  return {...state};
})(TemplatesIndex);