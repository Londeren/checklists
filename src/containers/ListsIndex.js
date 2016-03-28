import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import AddItemButton from '../components/AddItemButton';
import TemplateList from '../components/templates/TemplateList';


class ListsIndex extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
  }

  addItem() {
    this.props.dispatch(routeActions.push('/lists/create'));
  }

  render() {
    return (
      <div>
        <AddItemButton onClickAction={this.addItem}>Create list</AddItemButton>

      </div>
    );
  }
}

export default connect((state) => {
  return {...state};
})(ListsIndex);