import React, { Component } from 'react';
import './WatchItemsFounded.css';
import { Container, Row } from 'react-bootstrap';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Item } from '../shared/Item';

const mapStateToProps = state => ({ ...state.movies });
const mapDispatchToProps = dispatch => ({});

class WatchItemsFounded extends Component {
  render() {
    const { watchItems } = this.props;
    return (
      <div className="watchItems">
        <div>
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