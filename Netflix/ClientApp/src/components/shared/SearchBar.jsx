import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import './SearchBar.css';
import { connect } from "react-redux";
import { SEARCH_MOVIE, UPDATE_SEARCH_INPUT } from '../../constants/actionTypes';
import { MoviesAsync } from '../../resources/Api';

const mapStateToProps = state => ({ ...state.movies });
const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: SEARCH_MOVIE, payload }),
  onUpdateSearchInput: (value) => dispatch({ type: UPDATE_SEARCH_INPUT, value })
});

class SearchBar extends Component {

  searchMovieByName = () => {
    this.props.onLoad(MoviesAsync.getMoviesByName(this.props.searchInput).then((movies) => movies));
  }

  onNameChanged = (event) => {
    this.props.onUpdateSearchInput(event.target.value);
  }

  render() {
    return (
      <Form inline className="pull-right">
        <input type="text" onChange={(event) => this.onNameChanged(event)} placeholder="Titels, people, genders" className="mr-sm-2" />
        <Button onClick={() => this.searchMovieByName()} variant="outline-success">Search</Button>
      </Form>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
