import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { Button, Form } from "react-bootstrap";
import { UPDATE_FIELD_AUTH } from "../../constants/actionTypes";
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value })
});

class Register extends Component {

  changeEmail = ev => this.props.onChangeEmail(ev.target.value);
  changePassword = ev => this.props.onChangePassword(ev.target.value);
  formHasValues = () => this.props.email && this.props.password;

  render() {
    return (
      <div id="register-container" className="col-xs-6 col-md-6 col-lg-3">
        <span>STEP 2 OF 3</span>
        <h2>Sign up to start your free month.</h2>
        <div id="register">
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                onChange={this.changeEmail}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.changePassword}
              />
            </Form.Group>
            <Link to="/signup/payment">
              <Button
                disabled={!this.formHasValues()}
              >Continue
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
