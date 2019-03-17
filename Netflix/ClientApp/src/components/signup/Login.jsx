import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { Button, Form } from "react-bootstrap";

export class Login extends Component {
  render() {
    return (
      <div id="login">
        <h1>Sign In.</h1>
        <Form method="POST">
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Email" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Password" />
            </Form.Group>
            <Link to="/profiles">
              <Button type="submit" className="btn btn-primary btn-solid btn-oversize">Sign In</Button>
            </Link>
            <span>New to Streaming Website? <Link to="/signup/planform">Sign up now.</Link></span>
          </Form>
      </div>
    )
  }
}
