import React, { Component, PropTypes } from 'react';
import {v4 as uniqueId}  from 'node-uuid';
import Item from '../Item';


export default class TemplateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      templateName: props.templateName,
      items: props.items
    };

    this.saveAction = this.saveAction.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setTemplateName = this.setTemplateName.bind(this);
  }

  saveAction() {
    this.props.onSaveAction({
      templateName: this.state.templateName,
      items: this.state.items
    });
  }

  setTemplateName(e) {
    this.setState({templateName: this.refs.templateName.value});
  }

  updateItem(id = null) {
    return item => {
      const items = this.state.items.map((singleItem) => {
        if(singleItem.id !== id)
        {
          return singleItem;
        }

        return {
          id,
          done: item.checked,
          name: item.name
        }
      });

      this.setState({items});
    };
  }

  deleteItem(id) {
    return () => {
      this.setState({items: this.state.items.filter((item) => item.id != id)});
    }
  }


  addItem() {
    return item => {
      this.setState({
        items: [...this.state.items, {
          id: uniqueId(),
          done: item.checked,
          name: item.name
        }]
      })
    };
  }

  render() {
    let {onSaveAction} = this.props;

    let {templateName, items} = this.state;

    return (
        <form onSubmit={this.saveAction}>
          <fieldset className="form-group">
            <input type="text" className="form-control" placeholder="Template name" ref="templateName" value={templateName} onChange={this.setTemplateName} />
          </fieldset>

          <fieldset className="form-group">
            {items.map(item => {
              return (
                  <Item key={item.id} checked={item.done} name={item.name} onUpdateItem={this.updateItem(item.id)} onDeleteItem={this.deleteItem(item.id)} />
              );
            })}
            <Item newItem checked={false} name="" onUpdateItem={this.addItem()} />
          </fieldset>

          <button type="button" className="btn btn-primary">Add</button>
        </form>
    );
  }
}

TemplateForm.propTypes = {
  onSaveAction: PropTypes.func.isRequired,
  templateName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }).isRequired).isRequired
};