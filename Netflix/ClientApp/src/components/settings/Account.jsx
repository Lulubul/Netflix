import React, { Component } from 'react'
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";

const mapStateToProps = state => ({ ...state.common });
const mapDispatchToProps = dispatch => ({});

class Account extends Component {
    render() {
        return (
            <Container>
                <Row><h1>Account</h1></Row>
                <Row><h2>MEMBERSHIP BILLING</h2></Row>
                <Row><h2>PLAN DETAILS</h2></Row>
                <Row><h2>SETTINGS</h2></Row>
                <Row><h2>MY PROFILE</h2></Row>
            </Container>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);