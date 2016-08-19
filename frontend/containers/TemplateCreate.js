import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import {storeTemplate} from '../actions/Templates';
import TemplateForm from '../components/templates/TemplateForm';
import {ROUTE_TEMPLATES_TEMPLATES} from '../constants/routes';
import {getRouteUrl} from '../services/routes';

const propTypes = {
  dispatch: PropTypes.func.isRequired
};

class TemplateCreate extends Component {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);
  }

  add(params) {
    this.props.dispatch(storeTemplate(params.name, params.items));
    this.props.dispatch(routeActions.push(getRouteUrl(ROUTE_TEMPLATES_TEMPLATES)));
  }


  render() {
    return (
        <TemplateForm onSaveAction={this.add} templateName="" items={[]} />
    );
  }
}

export default connect((state) => {
  return {};
})(TemplateCreate);

TemplateCreate.propTypes = propTypes;