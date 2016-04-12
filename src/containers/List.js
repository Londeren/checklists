import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';

import {updateList} from '../actions/Lists';
import ListForm from '../components/lists/ListForm';
import NotFound from './NotFound';
import {Templates} from '../services/templates';
import {ROUTE_LISTS_LISTS } from '../constants/routes';
import {getRouteUrl} from '../services/routes';


class List extends Component {
  constructor(props) {
    super(props);

    const {listId} = this.props.params;
    this.list = Templates(this.props.lists).getById(listId);

    this.update = this.update.bind(this);
  }

  update(params) {
    const {listId} = this.props.params;

    this.props.dispatch(updateList(listId, params.name, params.items));
    this.props.dispatch(routeActions.push(getRouteUrl(ROUTE_LISTS_LISTS)));
  }


  render() {
    if(isEmpty(this.list)) {
      return (<NotFound />);
    }

    return (
      <ListForm onSaveAction={this.update} name={this.list.name} items={this.list.items} />
    );
  }
}

export default connect((state) => {
  return {...state};
})(List);