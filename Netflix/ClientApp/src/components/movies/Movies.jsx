import React, { Component } from 'react';
import './Movies.css';
import Dropdown from '../shared/Dropdown';
import { MoviesAsync, HistoryAsync } from '../../resources/Api';
import { Container } from '../shared/Container';
import { MOVIES_PAGE_LOADED, MOVIES_GENRE_FILTER, WATCH_ITEM } from '../../constants/actionTypes';
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.movies, ...state.common, ...state.profile });
const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: MOVIES_PAGE_LOADED, payload }),
  onGenreChanged: payload => dispatch({ type: MOVIES_GENRE_FILTER, payload }),
  onMovieSelected: watchingItemId => dispatch({ type: WATCH_ITEM, watchingItemId })
});
const streamingOriginalGenre = '0b452f44-ffae-41d0-b125-dfee76a2d54a';

class Movies extends Component {

  componentWillMount() {
    const genresPromise = MoviesAsync.getGenres().then(response => response || []);
    const moviesPromise = MoviesAsync.getMovies().then(response => response || []);
    const [userId, profileId] = [this.props.userId, this.props.selectedProfile.id]
    const historyPromise = HistoryAsync.get(userId, profileId).then(response => response || []);
    const promises = Promise
      .all([genresPromise, moviesPromise, historyPromise])
      .then(([genres, movies, history]) => ({genres, movies, history}));
    this.props.onLoad(promises);
  }

  onGenreChanged = (ev) => this.props.onGenreChanged(ev.target.value);
  onMovieSelected = (item) => {
    const historyItem = { 
      userId: this.props.userId,
      profileId: this.props.selectedProfile.id,
      watchingItemId: item.id,
      watchingItemType: "Movies"
    };
    HistoryAsync.post(historyItem).then(() => this.props.onMovieSelected(item.videoId));
  }

  render() {
    const {movies, genres, selectedGenre, history} = this.props;
    const genre = selectedGenre ? "> " + genres.find((genre) => genre.id === selectedGenre).name : "";

    let streamingOriginalMovies;
    let popularMovies;
    let historyItemsIds;
    let historyMovies;
    let historyTitle;
    if (movies && movies.length > 0) {
      streamingOriginalMovies = movies.filter((movie) => movie.genres === streamingOriginalGenre);
      popularMovies = movies.filter((movie) => movie.genres !== streamingOriginalGenre);
      historyItemsIds = history.map((item) => item.watchingItemId);
      historyMovies = movies.filter((movie) => historyItemsIds.indexOf(movie.id) >= 0);
      historyTitle = `Continue Watching for ${this.props.selectedProfile.name}`;
    }
    return (
      <div>
        <div id="genres">
          <p>Movies {genre}</p>
          { !selectedGenre && genres && <Dropdown options={genres} onChange={this.onGenreChanged}></Dropdown> }
        </div>
        { popularMovies && popularMovies.length > 0 && <Container size="small" onClick={this.onMovieSelected} title="Popular on Streaming Website" index={0} items={popularMovies}/> }
        { historyMovies && historyMovies.length > 0 && <Container size="small" onClick={this.onMovieSelected} title={historyTitle} index={1} items={historyMovies}/> }
        { streamingOriginalMovies && streamingOriginalMovies.length > 0 && <Container size="large" onClick={this.onMovieSelected} title="Streaming Website Originals" index={2} items={streamingOriginalMovies}/> }
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);