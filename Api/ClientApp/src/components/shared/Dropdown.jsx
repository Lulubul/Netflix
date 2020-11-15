import React, { Component } from 'react'

export default class Dropdown extends Component {

  render() {
    const {options, onChange} = this.props;
    return (
      <select onChange={onChange}>
        <option defaultChecked>Genres</option> 
        {options && options.map((option, index) => (<option value={option.id} key={index}>{option.name}</option>))}
      </select>
    )
  }
}
