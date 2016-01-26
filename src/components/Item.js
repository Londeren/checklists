import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.updateItem = this.updateItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
  }

  updateItem(e) {
    const ENTER = 13;

    if(e.keyCode === ENTER)
    {
      this.changeItem();
    }
  }

  changeItem() {
    this.props.onUpdateItem({
      checked: this.refs.checked.checked,
      name: this.refs.name.value
    });
  }

  render() {
    var {checked, name} = this.props;

    return (
        <div className="input-group">
          <span className="input-group-addon">
            <input type="checkbox" ref="checked" checked={checked} onChange={this.changeItem}/>
          </span>
          <input type="text" ref="name" className="form-control" placeholder="Add item" value={name} onKeyDown={this.updateItem} onChange={this.changeItem}/>
        </div>
    );
  }
}

Item.propTypes = {
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onUpdateItem: PropTypes.func.isRequired
};