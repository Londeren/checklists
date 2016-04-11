import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import {updateTemplate} from '../actions/Templates';
import TemplateForm from '../components/templates/TemplateForm';
import NotFound from './NotFound';
import {Templates} from '../services/templates';
import isEmpty from 'lodash/isEmpty';



class Template extends Component {
  constructor(props) {
    super(props);

    const {templateId} = this.props.params;
    this.template = Templates(this.props.templates).getById(templateId);

    this.update = this.update.bind(this);
  }


  update(params) {
    const {templateId} = this.props.params;

    this.props.dispatch(updateTemplate(templateId, params.templateName, params.items));
    this.props.dispatch(routeActions.push('/templates'));
  }


  render() {
    if(isEmpty(this.template)) {
      return (<NotFound />);
    }

    return (
      <TemplateForm onSaveAction={this.update} templateName={this.template.name} items={this.template.items} />
    );
  }
}

export default connect((state) => {
  return {...state};
})(Template);