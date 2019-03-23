import React, { Component } from "react";
import "./Payment.css";
import { Button, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { UPDATE_PLAN, PAYMENT_PAGE_LOADED, REGISTER_FLOW_UNLOADED } from '../../constants/actionTypes';
import { Plans } from '../../resources/Api';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onPlanChange: value =>
    dispatch({ type: UPDATE_PLAN, value }),
  onLoad: payload =>
    dispatch({ type: PAYMENT_PAGE_LOADED, payload }),
  onUnload: () =>  dispatch({ type: REGISTER_FLOW_UNLOADED })
});

class Payment extends Component {

  componentWillMount() {
    if (!this.props.plans || this.props.plans.length == 0) {
      this.props.onLoad(Plans.get().then((response) => response));
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  selectPlan = (planName) => {
    this.props.onPlanChange(planName);
  }

  render() {
    const { plans, selectedPlan } = this.props;
    return (
      <div className="paymentContainer col-xs-6 col-md-6 col-lg-3" data-uia="payment-container">
        <div className="stepHeader-container">
          <div className="stepHeader">
            <span className="stepIndicator">
              STEP <b>3</b> OF <b>3</b>
            </span>
            <h2 className="stepTitle">Set up your payment.</h2>
          </div>
        </div>
        <div>
          <label>Your plan: </label>
          <ListGroup as="ul">
            {plans && plans.map((plan, index) => (
              <ListGroup.Item 
                  variant="dark"
                  as="li"
                  key={index}
                  onClick={() => this.selectPlan(plan.name)}
                  active={plan.name === selectedPlan}>
                {plan.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
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
            <Form.Control type="tel" placeholder="Card Number" />
          </Form.Group>
          <Form.Group controlId="formSecurityCode">
            <Form.Label>Security Code</Form.Label>
            <Form.Control type="tel" placeholder="Security Code" />
          </Form.Group>
          <Link to="/profiles">
            <Button>START MEMBERSHIP</Button>
          </Link>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);