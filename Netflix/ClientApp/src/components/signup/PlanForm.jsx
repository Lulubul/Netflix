import React, { Component } from 'react'
import './PlanForm.css';
import { getPlans } from '../../resources/Api';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

export class PlanForm extends Component {

  constructor(props) {
    super(props);
    this.state = { plans: [], planName: '' };
  }

  componentDidMount() {
    getPlans()
      .then((plans) => this.setState({ plans: plans }))
      .catch((error) => console.log(error));
  }

  selectPlan = (planName) => {
    this.setState({ planName: planName })
  }

  render() {
    return (
      <div id="signIn">
        <span>STEP 1 OF 3</span>
        <h1>Choose a plan that's right for you.</h1>
        <p>Downgrade or upgrade at any time</p>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Plan name</th>
              {this.state.plans.map((plan) => (
                <th scope="col" key={plan.id}>
                  <Button 
                    className={this.state.planName === plan.name ? "selected" : ''}
                    onClick={() => this.selectPlan(plan.name)}>
                    {plan.name}
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Monthly price</th>
              {this.state.plans.map((plan) => (<th className={this.state.planName === plan.name ? "selected" : ''} scope="col" key={plan.id}>EUR {plan.monthlyPrice}</th>))}
            </tr>
            <tr>
              <th scope="row">HD available</th>
              {this.state.plans.map((plan) => (<th className={this.state.planName === plan.name ? "selected" : ''} scope="col" key={plan.id}>{this.renderBoolean(plan.hd)}</th>))}
            </tr>
            <tr>
              <th scope="row">Ultra HD available</th>
              {this.state.plans.map((plan) => (<th className={this.state.planName === plan.name ? "selected" : ''} scope="col" key={plan.id}>{this.renderBoolean(plan.ultraHd)}</th>))}
            </tr>
            <tr>
              <th scope="row">Screens you can watch on at the same time</th>
              {this.state.plans.map((plan) => (<th className={this.state.planName === plan.name ? "selected" : ''} scope="col" key={plan.id}>{plan.noScreens}</th>))}
            </tr>
            <tr>
              <th scope="row">Cancel anytime</th>
              {this.state.plans.map((plan) => (<th className={this.state.planName === plan.name ? "selected" : ''} scope="col" key={plan.id}>{this.renderBoolean(plan.cancelAnytime)}</th>))}
            </tr>
          </tbody>
        </table>
        <Link to="/signup/register">
          <button type="button" className="btn btn-primary btn-solid btn-oversize">CONTINUE</button>
        </Link>
      </div>
    )
  }

  renderBoolean = (value) => {
    return value
      ?  <FontAwesomeIcon icon="check" />
      : <FontAwesomeIcon icon="times" />;
  }
}
