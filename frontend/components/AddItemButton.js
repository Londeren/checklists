import React, { Component, PropTypes } from 'react';


export default function AddItemButton({ onClickAction, buttonAdditionalClasses, children }) {
  return (
    <div className="add-item">
      <button type="button" className={'btn btn-info-outline btn-block ' + buttonAdditionalClasses } onClick={onClickAction}>{children}</button>
    </div>
  );
}

AddItemButton.propTypes = {
  onClickAction: PropTypes.func.isRequired,
  buttonAdditionalClasses: PropTypes.string,
  children: PropTypes.string.isRequired
};