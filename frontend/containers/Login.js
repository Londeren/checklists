import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/AuthUser';
import {ROUTE_INDEX} from '../constants/routes';

class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  login() {
    const nextUrl = this.props.location.query.next || ROUTE_INDEX;

    this.props.dispatch(login({
      login: 'admin',
      password: '111'
    }, nextUrl));
  }

  render() {
    return (
      <div>
        <a onClick={this.login}>Login</a>
      </div>
    );
  }

}

export default connect((state) => {
  return {
    authUser: state.authUser
  };
})(Login);