import React, { Component } from 'react';
import { connect } from 'react-redux';
import Documents from './Documents';

class Templates extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {documents} = this.props;

    return (
        <div>
          <Documents documents={documents} />
        </div>
    );
  }
}

export default connect((state) => {
  return {...state};
})(Templates);