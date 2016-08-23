import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {routeActions} from 'react-router-redux';

export function requiredAuth(Component) {
  class RequiredAuth extends React.Component {

    componentWillMount() {
      this.checkAuth(this.props.isAuthorized);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthorized);
    }

    checkAuth(isAuthorized) {
      if (!isAuthorized) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(routeActions.push(`/login?next=${redirectAfterLogin}`));
      }
    }

    render() {
      return (
        this.props.isAuthorized === true
          ? <Component {...this.props} />
          : null
      );

    }
  }

  const mapStateToProps = (state) => ({
    ...state.authUser
  });

  return connect(mapStateToProps)(RequiredAuth);
}
