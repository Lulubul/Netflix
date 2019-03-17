import React, { Component } from 'react';
import './TvShows.css';
import Dropdown from './shared/Dropdown';
import { getGenres, getTvShows } from '../resources/Api';
import { Container } from './shared/Container';

export class TvShows extends Component {

  constructor(props) {
      super(props);
      this.state = { genres: [], tvShows: [] };
  } 

  componentDidMount() {
    getGenres()
      .then((genres) => this.setState({genres: genres}));
    getTvShows()
      .then((tvShows) => this.setState({tvShows: tvShows}))
  }

  render() {
    return (
        <div>
            <div id="genres">
                <p>TV Shows</p>
                <Dropdown options={this.state.genres}></Dropdown>
            </div>
            <Container title="Popular on Streaming Website" items={this.state.tvShows}></Container>
        </div>
    )
  }
}
