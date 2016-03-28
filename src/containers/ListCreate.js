import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';


class ListCreate extends Component {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);
  }

  add(params) {

  }


  render() {
    return (
        <div>ListCreate</div>
    );
  }
}

export default connect((state) => {
  return {...state};
})(ListCreate);