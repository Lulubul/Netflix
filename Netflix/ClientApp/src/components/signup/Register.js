import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Register.css';

export class Register extends Component {
  render() {
    return (
      <div id="register">
        <h1>Create your account.</h1>
        <form method="POST">
            <input name="email" placeholder="email"></input><br/>
            <input name="password" placeholder="password"></input><br/>
            <Link to="/">
              <button type="submit" className="btn btn-primary btn-solid btn-oversize">CONTINUE</button>
            </Link>
        </form>
      </div>
    )
  }
}
