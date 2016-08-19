import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {
  render() {
    return (
      <div>
        Not found
      </div>
    );
  }

}

export default connect((state) => {
  return {};
})(List);