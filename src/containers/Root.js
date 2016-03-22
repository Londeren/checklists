/* global __DEVTOOLS__ */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import App from './App';
import Lists from './Lists';
import List from './List';
import TemplatesIndex from './TemplatesIndex';
import TemplateCreate from './TemplateCreate';
import Templates from './Templates';
import Template from './Template';
import NotFound from './NotFound';
import DevTools from '../containers/DevTools';


export default class Root extends Component {

  render() {
    let devTools = '';

    if (__DEVTOOLS__) {
      devTools = (<DevTools key="devtools" />);
    }

    return (
        <Provider store={this.props.store}>
          <div>
            {devTools}
            <Router history={this.props.history}>
              <Route path="/" component={App}>
                <Route path="lists" component={Lists}>
                  <Route path="view/:listId" component={List} />
                </Route>
                <Route path="templates" component={Templates}>
                  <IndexRoute component={TemplatesIndex}/>
                  <Route path="create" component={TemplateCreate} />
                  <Route path="view/:templateId" component={Template} />
                </Route>
              </Route>
              <Route path="*" status={404} component={NotFound}/>
            </Router>

          </div>
        </Provider>
    );
  }
}