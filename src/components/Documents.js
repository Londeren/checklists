import React, { Component } from 'react';
import { connect } from 'react-redux';


export default class Documents extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
        <table className="table table-striped">
          <tbody>
          {this.getDocuments().map(doc =>
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.status}</td>
              </tr>
          )}
          </tbody>
        </table>
    );
  }

  getDocuments() {
    return this.props.documents || [];
  }
}