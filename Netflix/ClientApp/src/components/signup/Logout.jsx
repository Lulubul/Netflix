import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { LOGOUT } from "../../constants/actionTypes";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: LOGOUT }),
});

class Logout extends Component {

  logout = () => this.props.logout();

  render() {
    return (
      <Button onClick={this.logout}>Logout</Button>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Logout);
