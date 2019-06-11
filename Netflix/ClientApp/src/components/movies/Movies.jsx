import React, { Component } from 'react';
import './Movies.css';
import Dropdown from '../shared/Dropdown';
import { MoviesAsync, HistoryAsync, RecommandationsAsync } from '../../resources/Api';
import { Container } from '../shared/Container';
import { MOVIES_PAGE_LOADED, MOVIES_GENRE_FILTER, WATCH_ITEM, REDIRECT_TO_LOGIN } from '../../constants/actionTypes';
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.movies, ...state.common, ...state.profile });
const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: MOVIES_PAGE_LOADED, payload }),
  onGenreChanged: payload => dispatch({ type: MOVIES_GENRE_FILTER, payload }),
  onMovieSelected: watchingItemId => dispatch({ type: WATCH_ITEM, watchingItemId }),
  redirectToLogin: () => dispatch({ type: REDIRECT_TO_LOGIN }),
});
const streamingOriginalGenre = '0b452f44-ffae-41d0-b125-dfee76a2d54a';

class Movies extends Component {

  async componentWillMount() {
    if (!this.props.userId || !this.props.selectedProfile) {
      this.props.redirectToLogin();
      return;
    }

    const [userId, profileId] = [this.props.userId, this.props.selectedProfile.id];
    const genresPromise = MoviesAsync.getGenres().then(response => response || []).catch((error) => []);;
    const moviesPromise = MoviesAsync.getMovies().then(response => response || []).catch((error) => []);;
    const historyPromise = HistoryAsync.get(userId, profileId).then(response => response || []).catch((error) => []);;
    const recommandationsPromise = RecommandationsAsync
      .get(userId, profileId)
      .then(response => {
        return response && response.length > 0 && MoviesAsync.getMoviesByIds(response.join(",")).then(response => response || []);
      })
      .catch((error) => []);
    const promises = Promise
      .all([genresPromise, moviesPromise, historyPromise, recommandationsPromise])
      .then(([genres, movies, history, recommandations]) => ({genres, movies, history, recommandations}));
    this.props.onLoad(promises);
  }

  onGenreChanged = (ev) => this.props.onGenreChanged(ev.target.value);
  onMovieSelected = (item) => {
    const {history} = this.props;
    let historyItemsIds = history.map((item) => item.watchingItemId);
    if (historyItemsIds.indexOf(item.id) < 0) {
      const historyItem = { 
        userId: this.props.userId,
        profileId: this.props.selectedProfile.id,
        watchingItemId: item.id,
        watchingItemType: "Movies"
      };
      HistoryAsync.post(historyItem).then(() => this.props.onMovieSelected(item.videoId));
    }
    else {
      this.props.onMovieSelected(item.videoId)
    }
  }

  any = (array) => {
    return array && array.length > 0;
  }

  render() {
    const {movies, genres, selectedGenre, history, recommandations} = this.props;
    const genre = selectedGenre ? "> " + genres.find((genre) => genre.id === selectedGenre).name : "";
    const profileName = this.props.selectedProfile && this.props.selectedProfile.name;
    let streamingOriginalMovies;
    let popularMovies;
    let historyMovies;
    
    if (movies && movies.length > 0) {
      streamingOriginalMovies = movies.filter((movie) => movie.genres === streamingOriginalGenre);
      popularMovies = movies.filter((movie) => movie.genres !== streamingOriginalGenre);
      let historyItemsIds = history.map((item) => item.watchingItemId);
      historyMovies = movies.filter((movie) => historyItemsIds.indexOf(movie.id) >= 0);
    }
    return (
      <div>
        <div id="genres">
          <p>Movies {genre}</p>
          { !selectedGenre && genres && <Dropdown options={genres} onChange={this.onGenreChanged}></Dropdown> }
        </div>
        { this.any(popularMovies) && <Container size="small" onClick={this.onMovieSelected} title="Popular on Streaming Website" index={0} items={popularMovies}/> }
        { this.any(historyMovies) && <Container size="small" onClick={this.onMovieSelected} title={`Continue Watching for ${profileName}`} index={1} items={historyMovies}/> }
        { this.any(recommandations) && <Container size="small" onClick={this.onMovieSelected} title={`Top picks for ${profileName}`} index={1} items={recommandations}/> }
        { this.any(streamingOriginalMovies) && <Container size="large" onClick={this.onMovieSelected} title="Streaming Website Originals" index={2} items={streamingOriginalMovies}/> }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);