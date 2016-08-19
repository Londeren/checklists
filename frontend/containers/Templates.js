import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
  children: PropTypes.node
};

class Templates extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
        <div>
          {this.props.children}
        </div>
    );
  }
}

export default connect((state) => {
  return {};
})(Templates);

Templates.propTypes = propTypes;