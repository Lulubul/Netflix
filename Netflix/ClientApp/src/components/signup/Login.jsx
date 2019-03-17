import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { Button, Form } from "react-bootstrap";

export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { validated: false };
  }

  render() {
    const { validated } = this.state;
    return (
      <div id="login" className="col-xs-6 col-md-6 col-lg-3">
        <h2>Sign In.</h2>
        <Form 
            noValidate 
            validated={validated} 
            method="POST">
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" required/>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" min="5" placeholder="Password" required/>
            </Form.Group>
            <Link to="/profiles">
              <Button disabled={validated} type="submit" className="btn btn-primary btn-solid btn-oversize">Sign In</Button>
            </Link>
            <span>New to Streaming Website? <Link to="/signup/planform">Sign up now.</Link></span>
          </Form>
      </div>
    )
  }
}
