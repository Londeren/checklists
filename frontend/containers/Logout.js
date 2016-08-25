import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {routeActions} from 'react-router-redux';
import {logout} from '../actions/AuthUser';
import {getRouteUrl} from '../services/routes';
import {ROUTE_INDEX} from '../constants/routes';

const propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string,
    login: PropTypes.string,
    token: PropTypes.string,
    error: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    isFetching: PropTypes.bool.isRequired,
    isAuthorized: PropTypes.bool.isRequired
  }).isRequired,
  logout: PropTypes.func
};

class Logout extends Component {
  componentWillMount() {
    this.props.logout();
  }
  
  render() {
    return null;
  }

}

export default connect(
  (state) => ({
    authUser: state.authUser
  }),
  (dispatch) => ({
    logout: () => {
      dispatch(logout());
      dispatch(routeActions.push(getRouteUrl(ROUTE_INDEX)));
    }
  }))(Logout);

Logout.propTypes = propTypes;