import React, { Component } from 'react';
import { Grid, Row, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { postProfile } from '../../resources/Api';
import './NewProfile.css';

export class NewProfile extends Component {

  avatarUrl = 'https://art-s.nflximg.net/38327/c6ba4ae7fa391f422edd9ee8104c75c01e038327.png';

  constructor(props) {
    super(props);
    this.state = { name: '' };
  } 

  addProfile = () => {
    const userId = '3f008259-8509-40a2-8118-f047861e4f31';
    postProfile(userId, {
      avatarUrl: this.avatarUrl,
      language: "English",
      name: this.state.name,
      maturityLevel: "All"
    }).then((response) => {
      this.props.history.push('/');
    })
  }

  onNameChanged = (event) => {
    this.setState({name: event.target.value});
  }

  render() {
    return (
      <Grid id="newProfile">
        <h1>Add profile</h1>
        <h3>Add a profile for another person watching Netflix.</h3>
        <Row className="profile-entry">
          <div className="main-profile-avatar">
            <img src={this.avatarUrl} />
          </div>
          <input type="text" value={this.state.name} onChange={this.onNameChanged} placeholder="Name"/>
        </Row>
        <Row>
          <Button id="continue" bsSize="large" onClick={this.addProfile}>Continue</Button>
          <Link to="/">
            <Button bsSize="large">Cancel</Button>
          </Link>
        </Row>
      </Grid>
    )
  }
}
