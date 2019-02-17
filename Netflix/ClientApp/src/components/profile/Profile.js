import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import './Profile.css';

export class Profile extends Component {
  render() {
    const {avatarUrl, name} = this.props.profile;
    return (
        <div className="profile-wrapper">
          <Link to={'/movies'}>
            <Image src={avatarUrl} thumbnail/>
            <span className="profile-name">{name}</span>
          </Link>
        </div>
    )
  }
}
