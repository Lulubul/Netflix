import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './Profile.css';
import { SELECT_PROFILE } from "../../constants/actionTypes";
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.common, ...state.profile });
const mapDispatchToProps = dispatch => ({
  onSelectProfile: value => dispatch({ type: SELECT_PROFILE, value })
});

class Profile extends Component {

  selectProfile = (id) => this.props.onSelectProfile(id);
  
  render() {
    if (!this.props.profile) {
      return <></>
    }
    
    const {avatarUrl, name, id} = this.props.profile;
    return (
      <div className="profile-wrapper" onClick={() => this.selectProfile(id)}>
        <Image src={avatarUrl} thumbnail/>
        <span className="profile-name">{name}</span>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);