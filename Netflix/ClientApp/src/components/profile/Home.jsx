import React, { Component } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Profile } from "./Profile";
import { getProfiles } from "../../resources/Api";
import { Link } from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Home extends Component {
  displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = { profiles: [] };
  }

  componentDidMount() {
    const userId = "3f008259-8509-40a2-8118-f047861e4f31";
    getProfiles(userId).then(profiles => this.setState({ profiles: profiles }));
  }

  render() {
    const { profiles } = this.state;

    return (
      <div className="home">
        <h1>Who's watching?</h1>
        <Container lg={12} md={12}>
          <Row>
            {profiles.map((profile, index) => (
              <Col key={index} className="profile-wrapper" xs={2} md={2} lg={2}>
                <Profile key={index} profile={profile} />
              </Col>
            ))}
            <Col className="profile-wrapper" xs={2} md={2} lg={2}>
              <div>
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
