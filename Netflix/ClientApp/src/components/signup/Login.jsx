import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { Button, Form } from "react-bootstrap";
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from "../../constants/actionTypes";
import { AuthAsync } from "../../resources/Api";
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.auth });
const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: AuthAsync.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends Component {

  changeEmail = ev => this.props.onChangeEmail(ev.target.value);
  changePassword = ev => this.props.onChangePassword(ev.target.value);
  submitForm = () => this.props.onSubmit(this.props.email, this.props.password);
  formHasValues = () => this.props.email && this.props.password;

  componentWillUnmount() {
    this.props.onUnload();
  }


  render() {

    return (
      <div id="login" className="col-xs-6 col-md-6 col-lg-3">
        <h2>Sign In.</h2>
        { this.props.errors ?
          <div>
            Sorry, we can't find an account with this email address. 
            Please try again or <Link to="/signup/planform"> create a new account</Link>. 
          </div>
          : <></>
        }
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={this.changeEmail}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              min="5"
              placeholder="Password"
              onChange={this.changePassword}
              required
            />
          </Form.Group>
          <Button
            disabled={!this.formHasValues()}
            onClick={this.submitForm} 
            className="btn btn-primary btn-solid btn-oversize">
            Sign In
          </Button>
          <span>
            New to Streaming Website?{" "}
            <Link to="/signup/planform">Sign up now.</Link>
          </span>
        </Form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
