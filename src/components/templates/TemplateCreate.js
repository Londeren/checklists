import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import TemplateForm from './TemplateForm';


class TemplateCreate extends Component {
  constructor(props) {
    super(props);

  }

  create() {

  }


  render() {
    return (
        <TemplateForm onSaveAction={this.create} items={[{id:1, name: 'blabla', isDone: false}, {id:'asdfad-grfasd', name: 'blablsfadfa', isDone: true}]} />
    );
  }
}

export default connect((state) => {
  return {...state};
})(TemplateCreate);