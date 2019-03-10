import React, { Component } from "react";
import './Payment.css';
import { Button, Form, Dropdown } from "react-bootstrap";
import { getPlans } from '../../resources/Api';

export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = { plans: [], planName: '' };
    }

    componentDidMount() {
        getPlans()
            .then((plans) => this.setState({ plans: plans }))
            .catch((error) => console.log(error));
    }

  render() {
    return (
      <div class="paymentContainer" data-uia="payment-container">
        <div class="stepHeader-container">
          <div class="stepHeader">
            <span class="stepIndicator">
              STEP <b>3</b> OF <b>3</b>
            </span>
            <h1 class="stepTitle">Set up your payment.</h1>
          </div>
        </div>
        <div>
            <label>Your plan</label>
            <Dropdown>
                <Dropdown.Toggle variant="success">
                    Dropdown Button
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
            <Button>START MEMBERSHIP</Button>
        </Form>
      </div>
    );
  }
}
