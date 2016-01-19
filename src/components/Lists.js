import React, { Component } from 'react';
import { connect } from 'react-redux';

class Lists extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
        <div>
          Lists
        </div>
    );
  }
}

export default connect((state) => {
  return {...state};
})(Lists);