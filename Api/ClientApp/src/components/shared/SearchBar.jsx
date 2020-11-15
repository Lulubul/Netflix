import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import './SearchBar.css';
import { connect } from "react-redux";
import { SEARCH_MOVIE, UPDATE_SEARCH_INPUT, CLEAR_SEARCH_INPUT } from '../../constants/actionTypes';
import { MoviesAsync } from '../../resources/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mapStateToProps = state => ({ ...state.movies });
const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: SEARCH_MOVIE, payload }),
  onUpdateSearchInput: (value) => dispatch({ type: UPDATE_SEARCH_INPUT, value }),
  clearSearchInput: () => dispatch({ type: CLEAR_SEARCH_INPUT }),
});

class SearchBar extends Component {

  searchMovieByName = () => {
    this.props.onLoad(MoviesAsync.getMoviesByName(this.props.searchInput).then((movies) => movies));
  }

  clearSearchInput = () => {
    this.props.clearSearchInput();
  }

  onNameChanged = (event) => {
    this.props.onUpdateSearchInput(event.target.value);
  }

  onKeyPress = (event) => {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }

  render() {
    const { searchInput } = this.props;
    const hasClearButton = searchInput && searchInput.length > 1;
    return (
      <Form inline className="pull-right">
        <div className="search-bar">
          <input 
              type="text" 
              value={searchInput}
              onChange={(event) => this.onNameChanged(event)} 
              placeholder="Titels, people, genders"
              onKeyPress={this.onKeyPress}
              className="mr-sm-2" />
          { hasClearButton && <span onClick={this.clearSearchInput}><FontAwesomeIcon icon="times" /></span>}
        </div>
        <Button onClick={() => this.searchMovieByName()} variant="outline-success">Search</Button>
      </Form>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
