import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import {addTemplate} from '../actions/Templates';
import TemplateForm from '../components/templates/TemplateForm';


class TemplateCreate extends Component {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);
  }

  add(params) {
    this.props.dispatch(addTemplate(params.templateName, params.items));
    this.props.dispatch(routeActions.push('/templates'));
  }


  render() {
    return (
        <TemplateForm onSaveAction={this.add} templateName="" items={[]} />
    );
  }
}

export default connect((state) => {
  return {...state};
})(TemplateCreate);