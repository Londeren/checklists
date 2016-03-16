/* global __DEVTOOLS__ */

import './styles/styles.scss';


import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import thunk from 'redux-thunk';
import Root from './containers/Root';
import rootReducer from './reducers';
const createHistory = require('history/lib/createHashHistory');
import DevTools from './containers/DevTools';


const history = createHistory();
const reduxRouterMiddleware = syncHistory(history);

const storeEnhancers = [];

if (__DEVTOOLS__) {
  storeEnhancers.push(DevTools.instrument())
}


const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, reduxRouterMiddleware),
    ...storeEnhancers
)(createStore);
const store = createStoreWithMiddleware(rootReducer);

if (__DEVTOOLS__) {
  reduxRouterMiddleware.listenForReplays(store);
}


ReactDOM.render(
    <Root store={store} history={history} />,
    document.getElementById('app'));
