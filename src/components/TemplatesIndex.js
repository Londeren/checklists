import React, { Component } from 'react';
import { connect } from 'react-redux';
import Documents from './Documents';
import { fetchDocuments} from '../actions/getDocumentsActions';


class TemplatesIndex extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.dispatch(fetchDocuments());
  }

  render() {
    const {documents} = this.props;

    return (
        <div>
          templates index <br />
          {this.props.children} <br />
          <Documents documents={documents} />
        </div>
    );
  }
}

export default connect((state) => {
  return {...state};
})(TemplatesIndex);