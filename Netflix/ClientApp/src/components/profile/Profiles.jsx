import React, { Component } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Profile from "./Profile";
import { ProfilesAsync } from "../../resources/Api";
import { Link } from "react-router-dom";
import "./Profiles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PROFILES_PAGE_LOADED } from "../../constants/actionTypes";
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.common, ...state.profile });
const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: PROFILES_PAGE_LOADED, payload })
});


class Profiles extends Component {
  
  componentWillMount() {
    const { userId } = this.props;
    if (userId) {
      this.props.onLoad(ProfilesAsync.get(userId).then(response => response || []));
    }
  }

  render() {
    const { profiles } = this.props;

    return (
      <div className="home">
        <h1>Who's watching?</h1>
        <Container lg={12} md={12}>
          <Row>
            { profiles && profiles.map((profile, index) => (
              <Col key={index} xs={2} md={2} lg={2}>
                <Profile key={index} profile={profile} />
              </Col>
            ))}
            <Col xs={2} md={2} lg={2}>
              <div className="profile-wrapper">
                <Link to={"/newProfile"}>
                  <FontAwesomeIcon icon="plus-circle" />
                  <span className="profile-name">Add Profile</span>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Button id="manage-profile" size="lg">
              Manage profiles
            </Button>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles);