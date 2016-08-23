import React, {Component} from 'react';
import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux';
import {logout} from '../actions/AuthUser';
import {getRouteUrl} from '../services/routes';
import {ROUTE_INDEX} from '../constants/routes';

class Logout extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);

    this.logout();
  }

  logout() {
    this.props.dispatch(logout());
    this.props.dispatch(routeActions.push(getRouteUrl(ROUTE_INDEX)));
  }

  render() {
    return null;
  }

}

export default connect((state) => {
  return {
    authUser: state.authUser
  };
})(Logout);