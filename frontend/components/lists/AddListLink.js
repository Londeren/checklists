import React, { Component, PropTypes } from 'react';
import AddItemButton from '../AddItemButton';


export default class AddListLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      templateId: ''
    };

    this.onChange = this.onChange.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  addItem() {
    if(this.state.templateId) {
      this.props.onAdd(this.state.templateId);
    }
  }

  onChange(event) {
    this.setState({templateId: event.target.value});
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-7">
          <select className="form-control" onChange={this.onChange}>
            <option>1. Select template</option>
            {this.props.templateList.map((tpl) => {
              return (<option value={tpl.id} key={tpl.id}>{tpl.name}</option>);
            })}
          </select>
        </div>
        <div className="col-xs-5">
          <AddItemButton onClickAction={this.addItem}>2. Create list</AddItemButton>
        </div>
      </div>
    );
  }
}

AddListLink.propTypes = {
  onAdd: PropTypes.func.isRequired,
  templateList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
};