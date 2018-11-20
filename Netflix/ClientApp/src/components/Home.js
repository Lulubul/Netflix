import React, { Component } from 'react';
import { Col, Grid, Row, Image, Button} from 'react-bootstrap';
import './Home.css';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div className="home">
        <h1>Who's watching?</h1>
        <Grid>
          <Row>
            <Col xs={6} md={3}/>
            <Col xs={6} md={2}>
              <Image src="https://occ-0-3032-768.1.nflxso.net/art/0d282/eb648e0fd0b2676dbb7317310a48f9bdc2b0d282.png" thumbnail  />
            </Col>
            <Col xs={6} md={2}>
              <Image src="https://occ-0-3032-768.1.nflxso.net/art/adee5/994a657647584c9333956e515d8864bc854adee5.png" thumbnail  />
            </Col>
            <Col xs={6} md={2}>
              <Image src="/thumbnail.png" circle  />
            </Col>
            <Col xs={6} md={3}/>
          </Row>
          <Row>
            <Button id="manage-profile" bsSize="large">Manage profiles</Button>
          </Row>
        </Grid>
      </div>
    );
  }
}
