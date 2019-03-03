import React, { Component } from 'react'

export default class Dropdown extends Component {

  render() {
    const {options} = this.props;
    return (
      <select>
        <option defaultChecked>Genres</option> 
        {options && options.map((option, index) => (<option value={option.id} key={index}>{option.name}</option>))}
      </select>
    )
  }
}
