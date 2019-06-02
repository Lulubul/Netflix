import React, { Component } from 'react';
import './WatchItemsFounded.css';
import { Container, Row, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Item } from '../shared/Item';
import { GO_BACK } from '../../constants/actionTypes';

const mapStateToProps = state => ({ ...state.movies });
const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch({ type: GO_BACK }),
});

class WatchItemsFounded extends Component {

  onGoBackClick = () => {
    this.props.goBack();
  }

  render() {
    const { watchItems } = this.props;
    return (
      <div className="watchItems">
        <div>
          <Button variant="outline-success" onClick={() => this.onGoBackClick()}> back </Button> 
          <h1>Explore related titles</h1>
        </div>
        <Container className="col-lg-12 col-md-12">
          <Row>
            {watchItems && watchItems.map((item, index) => (
              <Link to="/watchingItem" key={index}>
                <Item key={index} imageSource={item.image} />
              </Link>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchItemsFounded);