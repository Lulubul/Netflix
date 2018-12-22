import React, { Component } from 'react';
import './Movies.css';
import Dropdown from './shared/Dropdown';
import { getGenres } from '../resources/Api';

export class Movies extends Component {

  constructor(props) {
      super(props);
      this.state = { genres: [] };
  } 

  componentDidMount = () => {
    getGenres()
      .then((genres) => this.setState({genres: genres}));
  }

  render() {
    const source = "api/Movies/cosmos";
    return (
      <div>
        <div id="genres">
          <p>Movies</p>
          <Dropdown options={this.state.genres}></Dropdown>
        </div>
        <video id="video" width="1000px" height="auto" autoPlay="true" controls>
          <source src={source} type="video/mp4" codecs="avc1.42E01E, mp4a.40.2" />
        </video>
      </div>
    );
  }
}
