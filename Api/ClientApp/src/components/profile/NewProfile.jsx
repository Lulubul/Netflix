import React, { Component } from 'react';
import { Container, Row, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProfilesAsync } from '../../resources/Api';
import { Image } from 'react-bootstrap';
import './NewProfile.css';
import { ADD_NEW_PROFILE, UPDATE_PROFILE_FIELD } from "../../constants/actionTypes";
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.common, ...state.profile });
const mapDispatchToProps = dispatch => ({
  onChangeProfileName: value => dispatch({ type: UPDATE_PROFILE_FIELD, key: "profileName", value }),
  addNewProfile: payload => dispatch({ type: ADD_NEW_PROFILE, payload })
});

class NewProfile extends Component {

  avatarUrl = 'https://cdn2.iconfinder.com/data/icons/male-users-2/512/male_avatar20-512.png';

  addProfile = () => {
    const newProfile = { avatarUrl: this.avatarUrl, language: "English", name: this.props.profileName, maturityLevel: "All" };
    this.props.addNewProfile(ProfilesAsync.post(this.props.userId, newProfile).then(response => response));
  }

  onNameChanged = (event) => {
    this.props.onChangeProfileName(event.target.value);
  }

  render() {
    return (
      <Container id="newProfile">
        <h1>Add profile</h1>
        <h3>Add a profile for another person watching Streaming Website.</h3>
        <Row className="profile-entry">
          <div className="main-profile-avatar">
            <Image alt={"Profile"} src={this.avatarUrl} />
          </div>
          <input type="text" onChange={this.onNameChanged} placeholder="Name" />
        </Row>
        <Row>
          <Button id="continue" size="lg" onClick={this.addProfile}>Continue</Button>
          <Link to="/profiles">
            <Button size="lg">Cancel</Button>
          </Link>
        </Row>
      </Container>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProfile);