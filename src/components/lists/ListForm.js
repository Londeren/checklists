import React, { Component, PropTypes } from 'react';
import {v4 as uniqueId}  from 'node-uuid';
import Item from '../Item';


export default class ListForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name || '',
      items: props.items || []
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleSetTemplateName = this.handleSetTemplateName.bind(this);
  }

  handleSave() {
    if(this.state.name.length !== 0)
    {
      this.props.onSaveAction({
        name: this.state.name,
        items: this.state.items
      });
    }
  }

  handleSetTemplateName(e) {
    this.setState({name: this.refs.name.value});
  }

  handleUpdateItem(id = null) {
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

  handleDeleteItem(id) {
    return () => {
      this.setState({items: this.state.items.filter((item) => item.id != id)});
    }
  }


  handleAddItem() {
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
    let {name, items} = this.state;

    return (
        <form onSubmit={this.handleSave}>
          <fieldset className="form-group">
            <input type="text" className="form-control" placeholder="Template name" ref="name" value={name} onChange={this.handleSetTemplateName} autoFocus="true" tabIndex="1"/>
          </fieldset>

          <fieldset className="form-group">
            {items.map(item => {
              return (
                  <Item key={item.id} checked={item.done} name={item.name} onUpdateItem={this.handleUpdateItem(item.id)} onDeleteItem={this.handleDeleteItem(item.id)}/>
              );
            })}
            <Item newItem checked={false} name="" onUpdateItem={this.handleAddItem()} />
          </fieldset>

          <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
  }
}

ListForm.propTypes = {
  onSaveAction: PropTypes.func.isRequired,
  name: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }).isRequired).isRequired
};