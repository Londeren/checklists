import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import AddItemButton from '../components/AddItemButton';


class TemplatesIndex extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
  }

  addItem() {
    this.props.dispatch(routeActions.push('/templates/create'));
  }

  render() {
    return (
        <div>

          <AddItemButton onClickAction={this.addItem}>Create template</AddItemButton>

        </div>
    );
  }
}

export default connect((state) => {
  return {...state};
})(TemplatesIndex);