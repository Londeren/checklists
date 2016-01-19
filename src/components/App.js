import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (

        <div>
          <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
            <a className="navbar-brand" href="#/">Lists</a>
            <ul className="nav navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#/templates">Templates</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/lists">Lists</a>
              </li>
            </ul>
          </nav>

          <div className="container main">
            <div className="row">
              <div className="col-sm-5">
                {this.props.children}

                <div className="list-group">
                  <a href="#" className="list-group-item active">
                    <span className="label label-default label-pill pull-xs-right">2</span>
                    Cras justo odio
                  </a>
                  <a href="#" className="list-group-item"><span className="label label-default label-pill pull-xs-right">2</span> Dapibus ac facilisis in</a>
                  <a href="#" className="list-group-item">Morbi leo risus</a>
                  <a href="#" className="list-group-item">Porta ac consectetur ac</a>
                  <a href="#" className="list-group-item">Vestibulum at eros</a>
                </div>
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