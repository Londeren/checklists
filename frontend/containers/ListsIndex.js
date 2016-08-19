import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';

import AddListLink from '../components/lists/AddListLink';
import ListList from '../components/lists/ListList';
import {addList} from '../actions/Lists';
import {Templates} from '../services/templates';
import {ROUTE_LISTS_VIEW_LIST } from '../constants/routes';
import {getRouteUrl} from '../services/routes';

const propTypes = {
  templates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired
      }).isRequired
    ).isRequired
  }).isRequired).isRequired,
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired
    }).isRequired).isRequired
  }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired
};

class ListsIndex extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);

    this.templates = this.props.templates;
    this.templates = this.templates.map(tpl => {
      return {
        id: tpl.id,
        name: tpl.name
      };
    });
  }

  addItem(templateId) {
    const tpl = Templates(this.props.templates).getById(templateId);

    if (!isEmpty(tpl)) {
      const addListAction = addList(tpl);

      this.props.dispatch(addListAction);
      this.props.dispatch(routeActions.push(getRouteUrl(ROUTE_LISTS_VIEW_LIST, {listId: addListAction.id})));
    }
  }

  render() {
    return (
      <div>
        <AddListLink onAdd={this.addItem} templateList={this.templates} />
        <ListList items={this.props.lists} />
      </div>
    );
  }
}


export default connect((state) => {
  return {
    templates: state.templates,
    lists: state.lists
  };
})(ListsIndex);

ListsIndex.propTypes = propTypes;