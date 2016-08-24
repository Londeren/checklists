import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/AuthUser';
import {ROUTE_INDEX} from '../constants/routes';

class Login extends Component {
  constructor(props) {
    super(props);

    this.authorizeUser = this.authorizeUser.bind(this);
  }

  authorizeUser() {
    const nextUrl = this.props.location.query.next || ROUTE_INDEX;

    this.props.dispatch(login({
      login: this.login.value,
      password: this.password.value
    }, nextUrl));
  }

  render() {
    const isError = !!this.props.authUser.error;

    let error = null;
    if (isError) {
      error = (<div className="alert alert-danger" role="alert">{this.props.authUser.error}</div>);
    }

    return (
      <div className="container">
        {error}
        <form onSubmit={this.authorizeUser}>
          <div className="form-group row">
            <label htmlFor="login" className="col-sm-3 col-form-label">Login</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="login" ref={(ref) => this.login = ref} placeholder="Login" autoFocus="true" tabIndex="1" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="password" ref={(ref) => this.password = ref} placeholder="Password" tabIndex="2" />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-3 col-sm-9">
              <button type="submit" className="btn btn-primary" tabIndex="3">Sign in</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

}

export default connect((state) => {
  return {
    authUser: state.authUser
  };
})(Login);