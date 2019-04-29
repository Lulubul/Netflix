import React, { Component } from 'react';
import './TvShows.css';
import Dropdown from '../shared/Dropdown';
import { MoviesAsync } from '../../resources/Api';
import { Container } from '../shared/Container';
import { TVSHOWS_PAGE_LOADED, TVSHOWS_GENRE_FILTER } from '../../constants/actionTypes';
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.movies, ...state.common });
const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({ type: TVSHOWS_PAGE_LOADED, payload }),
    onGenreChanged: payload => dispatch({ type: TVSHOWS_GENRE_FILTER, payload })
});

class TvShows extends Component {

    componentWillMount() {
        let genresPromise = MoviesAsync.getGenres().then(response => response || []);
        let moviesPromise = MoviesAsync.getTvShows().then(response => response || []);
        this.props.onLoad(Promise.all([genresPromise, moviesPromise]).then(([genres, movies]) => ({ genres, movies })));
    }

    onGenreChanged = (ev) => this.props.onGenreChanged(ev.target.value);

    render() {
        const { movies, genres, selectedGenre } = this.props;
        console.log("hello" + selectedGenre);
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