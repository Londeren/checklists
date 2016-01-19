import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
        <div>
          List
        </div>
    );
  }

}

export default connect((state) => {
  return {...state};
})(List);