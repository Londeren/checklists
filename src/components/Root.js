import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import App from './App';
import Lists from './Lists';
import List from './List';
import Templates from './Templates';
import Template from './Template';


export default class Root extends Component {

  render() {
    return (
        <Router>
          <Route path="/" component={App}>
            <Route path="lists" component={Lists}>
              <Route path="list/:id" component={List} />
            </Route>
            <Route path="templates" component={Templates}>
              <Route path="template/:id" component={Template} />
            </Route>
          </Route>
        </Router>
    );
  }
}