import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopMenu from './TopMenu';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <TopMenu items={this.props.topMenu} />

          <div className="container main">
            <div className="row">
              <div className="col-sm-5">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default connect((state) => {
  return {...state};
})(App);