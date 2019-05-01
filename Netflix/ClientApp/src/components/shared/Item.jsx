import React, { Component } from 'react'
import './Item.css';

export class Item extends Component {
  render() {
    const source = this.props.imageSource;
    const size = this.props.size;
    const imageClasses = `boxart-image ${size && size === "small" ? "small-image" : ""}`; 
    return (
      <div className="boxart-container" onClick={this.props.onClick}>
        <img className={imageClasses} src={source} alt="movie"></img>
      </div>
    )
  }
}
