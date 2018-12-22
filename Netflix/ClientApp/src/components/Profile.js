import React, { Component } from 'react';
import { Col, Image} from 'react-bootstrap';

export class Profile extends Component {
  render() {
    const {avatarUrl} = this.props.profile;
    return (
        <Col xs={6} md={2}>
            <Image src={avatarUrl} thumbnail  />
        </Col>
    )
  }
}
