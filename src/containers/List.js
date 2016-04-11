import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';

import TemplateForm from '../components/templates/TemplateForm';
import NotFound from './NotFound';
import {Templates} from '../services/templates';


class List extends Component {
  constructor(props) {
    super(props);

    const {listId} = this.props.params;
    this.list = Templates(this.props.lists).getById(listId);

    this.add = this.add.bind(this);
  }

  add(params) {

  }


  render() {
    if(isEmpty(this.list)) {
      return (<NotFound />);
    }

    return (
      <TemplateForm onSaveAction={this.add} templateName={this.list.name} items={this.list.items} />
    );
  }
}

export default connect((state) => {
  return {...state};
})(List);