import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


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
  return {...state};
})(Templates);

Templates.propTypes = {
  children: PropTypes.node
};