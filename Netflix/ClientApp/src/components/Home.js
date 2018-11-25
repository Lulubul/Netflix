import React, { Component } from 'react';
import { Col, Grid, Row, Image, Button} from 'react-bootstrap';
import { Profile } from './Profile';
import { getProfiles } from '../resources/Api';
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
        <Grid>
          <Row>
            <Col xs={6} md={3}/>
            {profiles.map((profile, index) => (<Profile key={index} profile={profile}/>))}
            <Col xs={6} md={5}/>
          </Row>
          <Row>
            <Button id="manage-profile" bsSize="large">Manage profiles</Button>
          </Row>
        </Grid>
      </div>
    );
  }
}
