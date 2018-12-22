import React, { Component } from 'react';
import './TvShows.css';
import Dropdown from './shared/Dropdown';
import { getGenres } from '../resources/Api';

export class TvShows extends Component {

  constructor(props) {
      super(props);
      this.state = { genres: [] };
  } 

  componentDidMount() {
    getGenres()
      .then((genres) => this.setState({genres: genres}));
  }

  render() {
    const source = "api/Movies/cosmos";
    return (
        <div>
            <div id="genres">
                <p>TV Shows</p>
                <Dropdown options={this.state.genres}></Dropdown>
            </div>
            <div>
                <video id="video" width="1000px" height="auto" autoPlay="false" controls>
                    <source src={source} type="video/mp4" codecs="avc1.42E01E, mp4a.40.2"/>
                </video>
            </div>
        </div>
    )
  }
}
