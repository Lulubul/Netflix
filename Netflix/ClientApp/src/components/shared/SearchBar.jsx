import React, { Component } from 'react';
import { FormControl, Button, Form } from 'react-bootstrap';
import './SearchBar.css';
import { connect } from "react-redux";
import { SEARCH_MOVIE } from '../../constants/actionTypes';

const mapStateToProps = state => ({ ...state.common });
const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: SEARCH_MOVIE, payload })
});

class SearchBar extends Component {

  searchMovieByName = () => {
    this.props.loadMovies();
  }

  render() {
    return (
      <Form inline className="pull-right">
        <FormControl type="text" placeholder="Titels, people, genders" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
