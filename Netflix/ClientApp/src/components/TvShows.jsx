import React, { Component } from 'react';
import './TvShows.css';
import Dropdown from './shared/Dropdown';
import { MoviesAsync } from '../resources/Api';
import { Container } from './shared/Container';
import { TVSHOWS_PAGE_LOADED } from '../constants/actionTypes';
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.movies });
const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({ type: TVSHOWS_PAGE_LOADED, payload })
});

class TvShows extends Component {

    componentWillMount() {
        let genresPromise = MoviesAsync.getGenres().then(response => response || []);
        let moviesPromise = MoviesAsync.getMovies().then(response => response || []);
        this.props.onLoad(Promise.all([genresPromise, moviesPromise]).then(([genres, movies]) => ({genres, movies})));
    }

    render() {
        const {movies, genres} = this.props;
        return (
            <div>
                <div id="genres">
                    <p>TV Shows</p>
                    <Dropdown options={genres}></Dropdown>
                </div>
                { movies && movies.length > 0 && <Container title="Popular on Streaming Website" items={movies}></Container> }
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TvShows);