import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import TemplateList from '../components/templates/TemplateList';
import AddListLink from '../components/lists/AddListLink';
import {addList} from '../actions/Lists';
import {templates} from '../services/templates';

class ListsIndex extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);

    this.templates = this.props.templates.map(tpl => {
      return {
        id: tpl.id,
        name: tpl.name
      };
    });
  }

  addItem(templateId) {
    this.props.dispatch(routeActions.push(`/lists/create/${templateId}`));

    const tpl = templates(this.props.templates).getById(templateId);

    this.props.dispatch(addList(tpl));

  }

  render() {
    return (
      <AddListLink onAdd={this.addItem} templateList={this.templates} />
    );
  }
}


export default connect((state) => {
  return {...state};
})(ListsIndex);