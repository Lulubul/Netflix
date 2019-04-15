import React, { Component } from 'react'
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { ACCOUNT_PAGE_LOADED } from '../../constants/actionTypes';
import { PlansAsync } from "../../resources/Api";
import './Account.css';

const mapStateToProps = state => ({ ...state.common, ...state.profile });
const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({ type: ACCOUNT_PAGE_LOADED, payload })
  });

class Account extends Component {

    componentWillMount() {
        this.props.onLoad(PlansAsync.get().then(response => response || []));
    }

    render() {
        const { selectedProfile, selectedPlan, user} = this.props;
        return (
            <Container className="account">
                <Row>
                    <Col xl={3}><h3>Account</h3></Col>
                    <Col xl={3}><span>{user && user.email}</span></Col>
                </Row>
                <hr />
                <Row>
                    <Col xl={3}><h3>PLAN DETAILS</h3></Col>
                    <Col xl={3}><span>{selectedPlan && selectedPlan.name}</span></Col>
                </Row>
                <hr />
                <Row>
                    <Col xl={3}><h3>MY PROFILE</h3></Col>
                    <Col xl={3}>
                        <img className="profile-photo" src={selectedProfile && selectedProfile.avatarUrl} />
                        <span>{selectedProfile && selectedProfile.name}</span>
                    </Col>
                </Row>
                <Row>
                    <Col xl={3}></Col>
                    <Col xl={3}>Language: {selectedProfile && selectedProfile.language}</Col>
                </Row>
            </Container>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);