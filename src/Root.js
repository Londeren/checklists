import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import App from './components/App';
import Lists from './components/Lists';
import List from './components/List';
import TemplatesIndex from './components/TemplatesIndex';
import Templates from './components/Templates';
import Template from './components/Template';
import Documents from './components/Documents';




export default class Root extends Component {

  render() {
    return (
        <Provider store={this.props.store}>
          <Router history={this.props.history}>
            <Route path="/" component={App}>
              <Route path="lists" component={Lists}>
                <Route path="view/:listId" component={List} />
              </Route>
              <Route path="templates" component={Templates}>
                <IndexRoute component={TemplatesIndex}/>
                <Route path="view/:templateId" component={Template} />
              </Route>
            </Route>
          </Router>
        </Provider>
    );
  }
}