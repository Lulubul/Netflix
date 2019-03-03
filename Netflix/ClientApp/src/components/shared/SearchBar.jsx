import React, { Component } from 'react';
import { FormControl, Button, Form } from 'react-bootstrap';
import './SearchBar.css';

export class SearchBar extends Component {
  render() {
    return (
      <Form inline>
        <FormControl type="text" placeholder="Titels, people, genders" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    )
  }
}
