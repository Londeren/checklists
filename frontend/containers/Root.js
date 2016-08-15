/* global __DEVTOOLS__ */

import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import App from './App';
import Lists from './Lists';
import List from './List';
import ListsIndex from './ListsIndex';
import TemplatesIndex from './TemplatesIndex';
import TemplateCreate from './TemplateCreate';
import Templates from './Templates';
import Template from './Template';
import NotFound from './NotFound';
import DevTools from '../containers/DevTools';

import {loadTemplates} from '../services/templates';
import {loadLists} from '../services/lists';


export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // load templates at startup
    loadTemplates(this.props.store)();
    loadLists(this.props.store)();
  }

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
              <Route path="templates" component={Templates}>
                <IndexRoute component={TemplatesIndex} />
                <Route path="create" component={TemplateCreate} />
                <Route path="view/:templateId" component={Template} />
              </Route>
              <Route path="lists" component={Lists}>
                <IndexRoute component={ListsIndex} />
                <Route path="view/:listId" component={List} />
              </Route>
            </Route>
            <Route path="*" status={404} component={NotFound} />
          </Router>

        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};