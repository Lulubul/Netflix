import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { Button, Form } from "react-bootstrap";
import { Auth } from '../../resources/Api';
import {
  UPDATE_FIELD_AUTH,
  REGISTER
} from '../../constants/actionTypes';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) => {
    const payload = Auth.register('', email, password);
    dispatch({ type: REGISTER, payload })
  }
});

class Register extends Component {
  
  constructor() {
    super();
  }

  changeEmail = ev => this.props.onChangeEmail(ev.target.value);
  changePassword = ev => this.props.onChangePassword(ev.target.value);
  submitForm = (email, password) => ev => {
    ev.preventDefault();
    this.props.onSubmit(email, password);
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;

    return (
      <div id="register-container" className="col-xs-6 col-md-6 col-lg-3" >
        <span>STEP 2 OF 3</span>
        <h2>Sign up to start your free month.</h2>
        <div id="register">
          <Form method="POST" onSubmit={this.submitForm(email, password)}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Email" onChange={this.changeEmail} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.changePassword} />
            </Form.Group>
            <Link to="/signup/payment">
              <Button>Continue</Button>
            </Link>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
