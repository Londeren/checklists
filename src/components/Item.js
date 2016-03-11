import React, { Component, PropTypes } from 'react';

export const ENTER = 13;

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked || false,
      name: props.name || ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.saveItem = this.saveItem.bind(this);
  }

  saveItem() {
    let {checked, name} = this.refs;
    const {onUpdateItem, newItem} = this.props;

    checked = checked.checked;
    name = name.value;

    if(newItem)
    {
      if(!name)
        return;

      this.setState({
        checked: false,
        name: ''
      });
    }

    onUpdateItem({
      checked,
      name
    });
  }

  handleSubmit(e) {
    if(e.keyCode === ENTER)
    {
      e.preventDefault();
      this.saveItem();
    }
  }

  handleChange() {
    const {checked, name} = this.refs;

    this.setState({
      checked: checked.checked,
      name: name.value
    });
  }

  handleBlur() {
    this.saveItem();
  }

  handleClickDelete() {
    this.props.onDeleteItem();
  }


  render() {
    var {checked, name} = this.state;

    var deleteBlock = '';

    if(typeof this.props.onDeleteItem === 'function')
    {
      deleteBlock = (<span className="input-group-btn">
        <button className="btn btn-secondary text-danger" type="button" onClick={this.handleClickDelete}>X</button>
      </span>);
    }

    return (
        <div className="input-group">
          <span className="input-group-addon">
            <input
                type="checkbox"
                ref="checked"
                checked={checked}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
            />
          </span>
          <input type="text"
                 ref="name"
                 className="form-control"
                 placeholder="Add item"
                 value={name}
                 onBlur={this.handleBlur}
                 onChange={this.handleChange}
                 onKeyDown={this.handleSubmit}
                 tabIndex="2"
          />
          {deleteBlock}
        </div>
    );
  }
}

Item.propTypes = {
  newItem: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func
};