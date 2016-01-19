import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Root from './components/Root';
import rootReducer from './reducers/index';
import {fetchDocuments} from './actions/getDocumentsActions';

import './styles/styles.scss';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

store.dispatch(fetchDocuments());

ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('app'));
