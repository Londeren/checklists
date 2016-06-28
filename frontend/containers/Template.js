import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import {updateTemplate} from '../actions/Templates';
import TemplateForm from '../components/templates/TemplateForm';
import NotFound from './NotFound';
import {Templates} from '../services/templates';
import isEmpty from 'lodash/isEmpty';
import {ROUTE_TEMPLATES_TEMPLATES} from '../constants/routes';
import {getRouteUrl} from '../services/routes';


class Template extends Component {
  constructor(props) {
    super(props);

    const {templateId} = this.props.params;
    this.template = Templates(this.props.templates).getById(templateId);

    this.update = this.update.bind(this);
  }


  update(params) {
    const {templateId} = this.props.params;

    this.props.dispatch(updateTemplate(templateId, params.name, params.items));
    this.props.dispatch(routeActions.push(getRouteUrl(ROUTE_TEMPLATES_TEMPLATES)));
  }


  render() {
    if (isEmpty(this.template)) {
      return (<NotFound />);
    }

    return (
      <TemplateForm onSaveAction={this.update} name={this.template.name} items={this.template.items} />
    );
  }
}

export default connect((state) => {
  return {...state};
})(Template);

Template.propTypes = {
  params: PropTypes.shape({
    templateId: PropTypes.string.isRequired
  }).isRequired,
  templates: PropTypes.arrayOf(
      PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired
      }).isRequired).isRequired
    }).isRequired
  ).isRequired,
  dispatch: PropTypes.func.isRequired
};