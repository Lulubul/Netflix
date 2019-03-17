import React, { Component } from "react";
import "./Payment.css";
import { Button, Form, Dropdown } from "react-bootstrap";
import { getPlans } from "../../resources/Api";
import { Link } from "react-router-dom";

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = { plans: [], planName: "" };
  }

  componentDidMount() {
    getPlans()
      .then(plans => this.setState({ plans: plans }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="paymentContainer" data-uia="payment-container">
        <div className="stepHeader-container">
          <div className="stepHeader">
            <span className="stepIndicator">
              STEP <b>3</b> OF <b>3</b>
            </span>
            <h1 className="stepTitle">Set up your payment.</h1>
          </div>
        </div>
        <div>
          <label>Your plan: </label>
          <Dropdown>
            <Dropdown.Toggle variant="success">Plans:</Dropdown.Toggle>
            <Dropdown.Menu>
              {this.state.plans.map((plan, index) => (
                <Dropdown.Item key={index}>{plan.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name" />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" />
          </Form.Group>
          <Form.Group controlId="formCardtNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="text" placeholder="Card Number" />
          </Form.Group>
          <Form.Group controlId="formSecurityCode">
            <Form.Label>Security Code</Form.Label>
            <Form.Control type="text" placeholder="Security Code" />
          </Form.Group>
          <Link to="/profiles">
            <Button>START MEMBERSHIP</Button>
          </Link>
        </Form>
      </div>
    );
  }
}
