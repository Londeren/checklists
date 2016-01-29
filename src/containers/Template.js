import React, { Component } from 'react';
import { connect } from 'react-redux';


class Template extends Component {
  constructor(props) {
    super(props);

  }


  render() {

    return (
        <div>
          Template {this.props.params.templateId}
        </div>
    );
  }
}

export default connect((state) => {
  return {...state};
})(Template);