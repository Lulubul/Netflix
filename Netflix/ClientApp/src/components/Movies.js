import React, { Component } from 'react';
import './Movies.css';

export class Movies extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
  }

  render() {
    return (
      <div>
        <video id="video" width="1000px" height="auto" autoPlay="true" controls>
          <source src="api/Movies" type="video/mp4" codecs="avc1.42E01E, mp4a.40.2"/>
        </video>
      </div>
    );
  }
}
