import React, { Component } from 'react';
import './TvShows.css';
import Dropdown from '../shared/Dropdown';
import { MoviesAsync, HistoryAsync } from '../../resources/Api';
import { Container } from '../shared/Container';
import { TVSHOWS_PAGE_LOADED, TVSHOWS_GENRE_FILTER } from '../../constants/actionTypes';
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.movies, ...state.common, ...state.profile });
const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({ type: TVSHOWS_PAGE_LOADED, payload }),
    onGenreChanged: payload => dispatch({ type: TVSHOWS_GENRE_FILTER, payload })
});

class TvShows extends Component {

    componentWillMount() {
        const genresPromise = MoviesAsync.getGenres().then(response => response || []);
        const moviesPromise = MoviesAsync.getTvShows().then(response => response || []);
        const [userId, profileId] = [this.props.userId, this.props.selectedProfile.id]
        const historyPromise = HistoryAsync.get(userId, profileId).then(response => response || []);
        const promises = Promise
            .all([genresPromise, moviesPromise, historyPromise])
            .then(([genres, movies, history]) => ({ genres, movies, history}));
        this.props.onLoad(promises);
    }

    onGenreChanged = (ev) => this.props.onGenreChanged(ev.target.value);
    onTvSeriesSelected = (item) => { 
        const historyItem = { 
            userId: this.props.userId,
            profileId: this.props.selectedProfile.id,
            watchingItemId: item.id,
            watchingItemType: "TvShows"
        };
        HistoryAsync.post(historyItem).then(() => this.props.onMovieSelected(item.videoId));
    }

    render() {
        const { movies, genres, selectedGenre } = this.props;
        const genre = selectedGenre ? "> " + genres.find((genre) => genre.id === selectedGenre).name : "";
        return (
            <div>
                <div id="genres">
                    <p>TV Shows {genre}</p>
                    {!selectedGenre && <Dropdown options={genres} onChange={this.onGenreChanged}></Dropdown>}
                </div>
                {movies && movies.length > 0 &&
                    <Container
                        title="Popular on Streaming Website"
                        type="tvShows-container"
                        size="small"
                        onClick={this.onTvSeriesSelected}
                        index={0}
                        items={movies}>
                    </Container>
                }
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TvShows);