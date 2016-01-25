import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import AddItemButton from './AddItemButton';


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

          <div className="list-group">
            <a href="#" className="list-group-item active">
              <span className="label label-default label-pill pull-xs-right">2</span>
              Cras justo odio
            </a>
            <a href="#" className="list-group-item">
              <span className="label label-default label-pill pull-xs-right">2</span>
              Dapibus ac facilisis in</a>
            <a href="#" className="list-group-item">Morbi leo risus</a>
            <a href="#" className="list-group-item">Porta ac consectetur ac</a>
            <a href="#" className="list-group-item">Vestibulum at eros</a>
          </div>

        </div>
    );
  }
}

export default connect((state) => {
  return {...state};
})(TemplatesIndex);