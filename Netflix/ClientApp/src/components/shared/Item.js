import React, { Component } from 'react'
import './Item.css';

export class Item extends Component {
  render() {
    const source = this.props.imageSource;
    const size = this.props.size;
    return (
      <div className="boxart-container col-sm-4">
        <img className="boxart-image" src={source}></img>
      </div>
    )
  }
}
