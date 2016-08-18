import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/AuthUser';

class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  login() {
    this.props.dispatch(login({
      login: 'test',
      password: 'test'
    }));
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
  return {...state};
})(Login);