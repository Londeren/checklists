import './styles/styles.scss';


import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'redux-simple-router';
import thunk from 'redux-thunk';
import Root from './containers/Root';
import rootReducer from './reducers';
const createHistory = require('history/lib/createHashHistory');

const history = createHistory();
const reduxRouterMiddleware = syncHistory(history);
const createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);


ReactDOM.render(
    <Root store={store} history={history} />,
    document.getElementById('app'));
