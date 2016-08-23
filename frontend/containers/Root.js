/* global __DEVTOOLS__ */

import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
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
import Login from './Login';

import {loadTemplates} from '../services/templates';
import {loadLists} from '../services/lists';
import {requiredAuth} from '../components/RequiredAuth';
import Logout from './Logout';


export default class Root extends Component {
  constructor(props) {
    super(props);
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
              <Route path="templates" component={requiredAuth(Templates)}>
                <IndexRoute component={TemplatesIndex} />
                <Route path="create" component={TemplateCreate} />
                <Route path="view/:templateId" component={Template} />
              </Route>
              <Route path="lists" component={requiredAuth(Lists)}>
                <IndexRoute component={ListsIndex} />
                <Route path="view/:listId" component={List} />
              </Route>
              <Route path='login' component={Login} />
              <Route path='logout' component={Logout} />
              <Route path="*" status={404} component={NotFound} />
            </Route>
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