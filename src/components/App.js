import React, { Component } from 'react';
import { connect } from 'react-redux';
import Documents from './Documents';
import {fetchDocuments as fetchDocumentsAction} from '../actions/getDocumentsActions';

class App extends Component {
  constructor(props) {
    super(props);

    this.fetchDocuments = this.fetchDocuments.bind(this);
  }

  render() {
    const {documents} = this.props;

    return (
        <div>
          <Documents documents={documents} />
        </div>
    );
  }

  fetchDocuments() {
    this.props.dispatch(fetchDocumentsAction());
  }
}

export default connect((state) => {
  return {...state};
})(App);