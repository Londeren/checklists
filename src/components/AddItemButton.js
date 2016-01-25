import React, { Component, PropTypes } from 'react';


export default class AddItemButton extends Component {
  render() {
    var {onClickAction} = this.props;

    return (
        <div className="add-item">
          <button type="button" className="btn btn-info-outline btn-lg btn-block" onClick={onClickAction}>{this.props.children}</button>
        </div>
    );
  }
}

AddItemButton.propTypes = {
  onClickAction: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
};