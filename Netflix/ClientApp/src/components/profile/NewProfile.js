import React, { Component } from 'react';
import { Grid, Row, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NewProfile.css';

export class NewProfile extends Component {
  render() {
    return (
      <Grid id="newProfile">
        <h1>Add profile</h1>
        <h3>Add a profile for another person watching Netflix.</h3>
        <Row className="profile-entry">
          <div class="main-profile-avatar">
            <img src="https://art-s.nflximg.net/38327/c6ba4ae7fa391f422edd9ee8104c75c01e038327.png" />
          </div>
          <input type="text" placeholder="Name"/>
        </Row>
        <Row>
          <Link to="/">
            <Button id="continue" bsSize="large">Continue</Button>
          </Link>
          <Link to="/">
            <Button bsSize="large">Cancel</Button>
          </Link>
        </Row>
      </Grid>
    )
  }
}
