import React, { Component, PropTypes } from 'react';
import Item from '../Item';


export default class TemplateForm extends Component {
  constructor(props) {
    super(props);

    this.onSaveAction = this.onSaveAction.bind(this);
    this.onUpdateItem = this.onUpdateItem.bind(this);
  }

  onSaveAction() {
    this.props.onSaveAction({
      templateName: this.refs.templateName.value,
      items: this.props.items
    });
  }

  onUpdateItem(id = null) {
    return item => {
      this.props.items.push(item);
    };
  }

  render() {
    var {onSaveAction, templateName, items} = this.props;

    return (
        <form onSubmit={this.onSaveAction}>
          <fieldset className="form-group">
            <input type="text" className="form-control" ref="templateName" placeholder="Template name" value={templateName} />
          </fieldset>
          <fieldset className="form-group">
            {items.map(item => {
              return (
                  <Item key={item.id} checked={item.isDone} name={item.name} onUpdateItem={this.onUpdateItem(item.id)} />
              );
            })}
            <Item checked={false} name="" onUpdateItem={this.onUpdateItem()} />
          </fieldset>

          <button type="submit" className="btn btn-primary">Add</button>
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
    isDone: PropTypes.bool.isRequired
  }).isRequired).isRequired
};