import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Image, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBar from "./SearchBar";
import "./NavMenu.css";
import { connect } from "react-redux";
import { REDIRECT } from "../../constants/actionTypes";
import Logout from "../signup/Logout";

const mapStateToProps = state => {
  return {
    appName: state.common.appName,
    redirectTo: state.common.redirectTo,
    userId: state.common.userId,
    selectedProfile: state.profile.selectedProfile
  };
};

const mapDispatchToProps = dispatch => ({
  onRedirect: () => dispatch({ type: REDIRECT })
});

class NavMenu extends Component {

  render() {
    const { appName, userId, selectedProfile } = this.props;
    return (
      <Navbar variant="dark" expand="lg" collapseOnSelect>
        <Navbar.Brand>
          <Link to={"/"}>{appName}</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        { !userId ? (
          <></>
        ) : (
            <>
              <Navbar.Collapse>
                <Nav className="mr-auto">
                  <LinkContainer to={"/profiles"} exact>
                    <Nav.Item>
                      <span glyph="home"> Home </span>
                    </Nav.Item>
                  </LinkContainer>
                  { !selectedProfile ? <></> :
                    <>
                      <LinkContainer to={"/tvshows"}>
                        <Nav.Item>
                          <span> TV Shows </span>
                        </Nav.Item>
                      </LinkContainer>
                      <LinkContainer to={"/movies"}>
                        <Nav.Item>
                          <span> Movies </span>
                        </Nav.Item>
                      </LinkContainer>
                    </>
                  }
                </Nav>
              </Navbar.Collapse>
              <div className="right-menu pull-right">
                { selectedProfile && <SearchBar/> }
                { selectedProfile && (
                  <Dropdown className="dropdown-profile">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <Image className={"profile"} src={selectedProfile.avatarUrl}/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Link to={"/settings/account"}>Account</Link>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                <Logout/>
              </div>
            </>)}
      </Navbar>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMenu);
