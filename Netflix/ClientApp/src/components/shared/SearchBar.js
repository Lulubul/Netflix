import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import './SearchBar.css';

export class SearchBar extends Component {
  render() {
    return (
        <FormControl
            type="text"
            placeholder="Enter text"
        />
    )
  }
}
