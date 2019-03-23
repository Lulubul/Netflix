import React, { Component } from 'react'
import './PlanForm.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table } from 'react-bootstrap';
import { Plans } from '../../resources/Api';
import {
  UPDATE_PLAN,
  PLANFORM_PAGE_LOADED
} from '../../constants/actionTypes';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onPlanChange: value =>
    dispatch({ type: UPDATE_PLAN, value }),
  onLoad: payload =>
    dispatch({ type: PLANFORM_PAGE_LOADED, payload }),
});

class PlanForm extends Component {

  componentWillMount() {
    this.props.onLoad(Plans.get().then((response) => response));
  }

  selectPlan = (planName) => {
    this.props.onPlanChange(planName);
  }

  getPlanClassName = (planName) => {
    return planName === this.props.selectPlan ? "selected" : '';
  }

  renderBoolean = (value) => {
    return value ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="times" />;
  }

  render() {
    const plans = (this.props && this.props.plans) || [];
    return (
      <div id="signIn">
        <span>STEP 1 OF 3</span>
        <h2>Choose a plan that's right for you.</h2>
        <p>Downgrade or upgrade at any time</p>
        <Table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Plan name</th>
              {plans.map((plan) => (
                <th scope="col" key={plan.id}>
                  <Button 
                    className={this.getPlanClassName(plan.name)}
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
              {plans.map((plan) => (<th className={this.getPlanClassName(plan.name)} scope="col" key={plan.id}>EUR {plan.monthlyPrice}</th>))}
            </tr>
            <tr>
              <th scope="row">HD available</th>
              {plans.map((plan) => (<th className={this.getPlanClassName(plan.name)} scope="col" key={plan.id}>{this.renderBoolean(plan.hd)}</th>))}
            </tr>
            <tr>
              <th scope="row">Ultra HD available</th>
              {plans.map((plan) => (<th className={this.getPlanClassName(plan.name)} scope="col" key={plan.id}>{this.renderBoolean(plan.ultraHd)}</th>))}
            </tr>
            <tr>
              <th scope="row">Screens you can watch on at the same time</th>
              {plans.map((plan) => (<th className={this.getPlanClassName(plan.name)} scope="col" key={plan.id}>{plan.noScreens}</th>))}
            </tr>
            <tr>
              <th scope="row">Cancel anytime</th>
              {plans.map((plan) => (<th className={this.getPlanClassName(plan.name)} scope="col" key={plan.id}>{this.renderBoolean(plan.cancelAnytime)}</th>))}
            </tr>
          </tbody>
        </Table>
        <Link to="/signup/register">
          <Button type="button" className="btn btn-primary btn-solid btn-oversize">CONTINUE</Button>
        </Link>
      </div> 
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanForm);
