import React, { Component } from "react";
import "./PlanForm.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Table, Spinner } from "react-bootstrap";
import { PlansAsync } from "../../resources/Api";
import { UPDATE_PLAN, PLANFORM_PAGE_LOADED } from "../../constants/actionTypes";
import { connect } from "react-redux";
import { GO_BACK } from '../../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onPlanChange: value => dispatch({ type: UPDATE_PLAN, value }),
  onLoad: payload => dispatch({ type: PLANFORM_PAGE_LOADED, payload }),
  goBack: () => dispatch({ type: GO_BACK }),
});

class PlanForm extends Component {

  componentWillMount() {
    this.props.onLoad(PlansAsync.get().then(response => response));
  }

  selectPlan = planId => this.props.onPlanChange(planId);
  getPlanClassName = plan => plan.id === this.props.selectedPlan ? "selected" : "";
  renderBoolean = value => value ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="times" />;
  hasSelectedPlan = () => !!this.props.selectedPlan && this.props.selectedPlan.length > 0;

  onGoBackClick = () => {
    this.props.goBack();
  }

  render() {
    const plans = (this.props && this.props.plans) || [];
    return (
      
      <div id="signIn">
         
        <span> STEP 1 OF 3</span>
        <h2>Choose a plan that's right for you.</h2>
        <p>Downgrade or upgrade at any time</p>
        { !plans || plans.length === 0 ? <Spinner animation="border" /> : 
        <Table className="table table-dark" >
          <thead>
            <tr>
              <th scope="col">Plan name</th>
              {plans.map(plan => (
                <th scope="col" key={plan.id}>
                  <Button
                    className={this.getPlanClassName(plan)}
                    onClick={() => this.selectPlan(plan.id)}
                  >
                    {plan.name}
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Monthly price</th>
              {plans.map(plan => (
                <th
                  className={this.getPlanClassName(plan)}
                  scope="col"
                  key={plan.id}
                >
                  EUR {plan.monthlyPrice}
                </th>
              ))}
            </tr>
            <tr>
              <th scope="row">HD available</th>
              {plans.map(plan => (
                <th
                  className={this.getPlanClassName(plan)}
                  scope="col"
                  key={plan.id}
                >
                  {this.renderBoolean(plan.hd)}
                </th>
              ))}
            </tr>
            <tr>
              <th scope="row">Ultra HD available</th>
              {plans.map(plan => (
                <th
                  className={this.getPlanClassName(plan)}
                  scope="col"
                  key={plan.id}
                >
                  {this.renderBoolean(plan.ultraHd)}
                </th>
              ))}
            </tr>
            <tr>
              <th scope="row">Screens you can watch on at the same time</th>
              {plans.map(plan => (
                <th
                  className={this.getPlanClassName(plan)}
                  scope="col"
                  key={plan.id}
                >
                  {plan.noScreens}
                </th>
              ))}
            </tr>
            <tr>
              <th scope="row">Cancel anytime</th>
              {plans.map(plan => (
                <th
                  className={this.getPlanClassName(plan)}
                  scope="col"
                  key={plan.id}
                >
                  {this.renderBoolean(plan.cancelAnytime)}
                </th>
              ))}
            </tr>
          </tbody>
        </Table> 
        }
        <Button variant="outline-success" onClick={() => this.onGoBackClick()}> BACK </Button>
        <Link to="/signup/register">
          <Button
            type="button"
            className="btn btn-primary btn-solid btn-oversize"
            disabled={!this.hasSelectedPlan()}
          >
            CONTINUE
          </Button>
        </Link>

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanForm);
