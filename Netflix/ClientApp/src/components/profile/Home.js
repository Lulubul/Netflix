import React, { Component } from 'react';
import { Col, Grid, Row, Button} from 'react-bootstrap';
import { Profile } from './Profile';
import { getProfiles } from '../../resources/Api';
import { Link } from 'react-router-dom';
import './Home.css';

export class Home extends Component {
  displayName = Home.name
  constructor(props) {
    super(props);
    this.state = { profiles: [] };
  }

  componentDidMount() {
    const userId = '3f008259-8509-40a2-8118-f047861e4f31';
    getProfiles(userId)
      .then((profiles) => this.setState({profiles: profiles}))
  }

  render() {
    const { profiles } = this.state;

    return (
      <div className="home">
        <h1>Who's watching?</h1>
        <Grid lg={12} md={12}>
          <Row>
            {profiles.map((profile, index) => (
              <Col key={index} className="profile-wrapper" xs={2} md={2} lg={2}> 
                <Profile key={index} profile={profile}/> 
              </Col>
            ))}
            <Col className="profile-wrapper" xs={2} md={2} lg={2}>
                <div>
                  <Link to={'/newProfile'}>
                    <span className="glyphicon glyphicon-plus-sign"></span>
                    <span className="profile-name">Add Profile</span>
                  </Link>
                </div>
            </Col>
          </Row>
          <Row>
            <Button id="manage-profile" bsSize="large">Manage profiles</Button>
          </Row>
        </Grid>
      </div>
    );
  }
}
