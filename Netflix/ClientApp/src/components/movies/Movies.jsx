import React, { Component } from 'react';
import './Movies.css';
import Dropdown from '../shared/Dropdown';
import { MoviesAsync } from '../../resources/Api';
import { Container } from '../shared/Container';
import { MOVIES_PAGE_LOADED, MOVIES_GENRE_FILTER } from '../../constants/actionTypes';
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.movies, ...state.common });
const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: MOVIES_PAGE_LOADED, payload }),
  onGenreChanged: payload => dispatch({ type: MOVIES_GENRE_FILTER, payload })
});
const streamingOriginalGenre = '0b452f44-ffae-41d0-b125-dfee76a2d54a';

class Movies extends Component {

  componentWillMount() {
    let genresPromise = MoviesAsync.getGenres().then(response => response || []);
    let moviesPromise = MoviesAsync.getMovies().then(response => response || []);
    this.props.onLoad(Promise.all([genresPromise, moviesPromise]).then(([genres, movies]) => ({genres, movies})));
  }

  onGenreChanged = (ev) => this.props.onGenreChanged(ev.target.value);

  render() {
    const {movies, genres, selectedGenre} = this.props;
    const genre = selectedGenre ? "> " + genres.find((genre) => genre.id === selectedGenre).name : "";
    const streamingOriginalMovies = movies.filter((movie) => movie.genres === streamingOriginalGenre);
    const popularMovies = movies.filter((movie) => movie.genres !== streamingOriginalGenre);
    return (
      <div>
        <div id="genres">
          <p>Movies {genre}</p>
          { !selectedGenre && genres && <Dropdown options={genres} onChange={this.onGenreChanged}></Dropdown> }
        </div>
        { popularMovies && popularMovies.length > 0 && <Container title="Popular on Streaming Website" type="movie-container" index={0} items={popularMovies}></Container> }
        { streamingOriginalMovies && streamingOriginalMovies.length > 0 && <Container title="Streaming Website originals" type="movie-container" index={1} items={streamingOriginalMovies}></Container> }
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);