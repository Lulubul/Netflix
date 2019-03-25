import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { SearchBar } from "./SearchBar";
import "./NavMenu.css";
import { connect } from "react-redux";
import { REDIRECT } from "../../constants/actionTypes";

const mapStateToProps = state => {
  return {
    appName: state.common.appName,
    redirectTo: state.common.redirectTo,
    userId: state.common.userId
  };
};

const mapDispatchToProps = dispatch => ({
  onRedirect: () => dispatch({ type: REDIRECT })
});

class NavMenu extends Component {
  render() {
    return (
      <Navbar variant="dark" expand="lg" collapseOnSelect>
        <Navbar.Brand>
          <Link to={"/"}>{this.props.appName}</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        {!this.props.userId ? (
          <></>
        ) : (
        <>
        <Navbar.Collapse>
            <Nav className="mr-auto">
              <LinkContainer to={"/profiles"} exact>
                <Nav.Item>
                  <span glyph="home" /> Home
                </Nav.Item>
              </LinkContainer>
              <LinkContainer to={"/tvshows"}>
                <Nav.Item>
                  <span /> TV Shows
                </Nav.Item>
              </LinkContainer>
              <LinkContainer to={"/movies"}>
                <Nav.Item>
                  <span /> Movies
                </Nav.Item>
              </LinkContainer>
              { this.props.user && !!this.props.user.avatarUrl ? (
                <Image src={this.props.user.avatarUrl} />
              ) : (
                <></>
              )}
            </Nav>
        </Navbar.Collapse>
        <SearchBar className="pull-right" />
        </>)}
      </Navbar>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMenu);
