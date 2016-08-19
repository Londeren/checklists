import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import AddItemButton from '../components/AddItemButton';
import TemplateList from '../components/templates/TemplateList';
import {ROUTE_TEMPLATES_CREATE} from '../constants/routes';
import {getRouteUrl} from '../services/routes';

const propTypes = {
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

class TemplatesIndex extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
  }

  addItem() {
    this.props.dispatch(routeActions.push(getRouteUrl(ROUTE_TEMPLATES_CREATE)));
  }

  render() {
    return (
      <div>
        <AddItemButton onClickAction={this.addItem} buttonAdditionalClasses="btn-lg">Create template</AddItemButton>

        <TemplateList items={this.props.templates} />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    templates: state.templates
  };
})(TemplatesIndex);

TemplatesIndex.propTypes = propTypes;