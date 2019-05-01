import React, { Component } from 'react';
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.common });
const mapDispatchToProps = dispatch => ({});

class WatchingItem extends Component {
  render() {
    const { watchingItemId } = this.props;
    const source = `api/Movies/${watchingItemId || "cosmos"}`;
    return (
      <div className="container">
         <video id="video" width="1000px" height="auto" autoPlay={false} controls>
            <source src={source} type="video/mp4" codecs="avc1.42E01E, mp4a.40.2"/>
        </video>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchingItem);
