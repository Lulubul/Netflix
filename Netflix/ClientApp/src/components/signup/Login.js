import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export default class Login extends Component {
  render() {
    return (
      <div id="login">
        <h1>Sign In.</h1>
        <form method="POST">
            <input name="email" placeholder="email"></input><br/>
            <input name="password" placeholder="password"></input><br/>
            <Link to="/">
              <button type="submit" className="btn btn-primary btn-solid btn-oversize">Sign In</button>
            </Link>
        </form>
      </div>
    )
  }
}