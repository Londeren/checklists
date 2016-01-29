import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import TemplateForm from './TemplateForm';


class TemplateCreate extends Component {
  constructor(props) {
    super(props);

  }

  create(params) {
    console.log('create', params);
  }


  render() {
    return (
        <TemplateForm onSaveAction={this.create} templateName="name of template" items={[{id:'1', name: 'blabla', done: false}, {id:'asdfad-grfasd', name: 'blablsfadfa', done: true}]} />
    );
  }
}

export default connect((state) => {
  return {...state};
})(TemplateCreate);