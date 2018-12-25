import React, { Component } from 'react'
import './SignIn.css';
import { getPlans } from '../resources/Api';

export default class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = { plans: [] };
  }

  componentDidMount() {
    getPlans()
      .then((plans) => this.setState({plans: plans}));
  }

  render() {
    return (
      <div>
        <h1>Choose a plan that's right for you.</h1>
        <p>Downgrade or upgrade at any time</p>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Plan name</th>
              {this.state.plans.map((plan) => (<th scope="col" key={plan.id}>{plan.name}</th>))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Monthly price</th>
              {this.state.plans.map((plan) => (<th scope="col" key={plan.id}>EUR {plan.monthlyPrice}</th>))}
            </tr>
            <tr>
              <th scope="row">HD available</th>
              {this.state.plans.map((plan) => (<th scope="col" key={plan.id}>{this.renderBoolean(plan.hd)}</th>))}
            </tr>
            <tr>
              <th scope="row">Ultra HD available</th>
              {this.state.plans.map((plan) => (<th scope="col" key={plan.id}>{this.renderBoolean(plan.ultraHd)}</th>))}
            </tr>
            <tr>
              <th scope="row">Screens you can watch on at the same time</th>
              {this.state.plans.map((plan) => (<th scope="col" key={plan.id}>{plan.noScreens}</th>))}
            </tr>
            <tr>
              <th scope="row">Cancel anytime</th>
              {this.state.plans.map((plan) => (<th scope="col" key={plan.id}>{this.renderBoolean(plan.cancelAnytime)}</th>))}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  renderBoolean = (value) => {
    return value 
      ? <span class="glyphicon glyphicon-ok"></span> 
      : <span class="glyphicon glyphicon-remove"></span>;
  }
}
