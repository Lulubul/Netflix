import React, { Component } from 'react';
import './WatchItemsFounded.css';
import { MoviesAsync } from '../../resources/Api';
import { Container, Row } from 'react-bootstrap';
import { MOVIES_PAGE_LOADED } from '../../constants/actionTypes';
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.movies });
const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: MOVIES_PAGE_LOADED, payload })
});

class WatchItemsFounded extends Component {

  componentWillMount() {
  }

  render() {
    const { watchItems } = this.props;
    return (
      <div>
        <div>
          <p>Explore related titles</p>
        </div>
        <Container>
          <Row></Row>
        </Container>
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchItemsFounded);