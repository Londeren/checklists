import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {routeActions} from 'react-router-redux';
import AddItemButton from '../components/AddItemButton';
import TemplateList from '../components/templates/TemplateList';
import {ROUTE_TEMPLATES_CREATE} from '../constants/routes';
import {getRouteUrl} from '../services/routes';
import {fetchTemplates} from '../actions/Templates';

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
  loadTemplates: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired
};

class TemplatesIndex extends Component {
  componentWillMount() {
    this.props.loadTemplates();
  }

  render() {
    return (
      <div>
        <AddItemButton onClickAction={this.props.addItem} buttonAdditionalClasses="btn-lg">Create template</AddItemButton>

        <TemplateList items={this.props.templates} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    templates: state.templates
  }),
  (dispatch) => ({
    loadTemplates: () => {
      dispatch(fetchTemplates());
    },
    addItem: () => {
      dispatch(routeActions.push(getRouteUrl(ROUTE_TEMPLATES_CREATE)));
    }
  })
)(TemplatesIndex);

TemplatesIndex.propTypes = propTypes;