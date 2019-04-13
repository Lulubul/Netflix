import React, { Component } from 'react'

export class WatchingItem extends Component {
  render() {
    const source = `api/Movies/${this.props.movieId || "cosmos"}`;
    return (
      <div className="container">
         <video id="video" width="1000px" height="auto" autoPlay={false} controls>
            <source src={source} type="video/mp4" codecs="avc1.42E01E, mp4a.40.2"/>
        </video>
      </div>
    )
  }
}
