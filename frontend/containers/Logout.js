import React, {Component} from 'react';
import {connect} from 'react-redux';
import {routeActions} from 'react-router-redux';
import {logout} from '../actions/AuthUser';
import {getRouteUrl} from '../services/routes';
import {ROUTE_INDEX} from '../constants/routes';

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