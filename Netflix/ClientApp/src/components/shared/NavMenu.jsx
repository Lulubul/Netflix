import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { SearchBar } from './SearchBar';
import './NavMenu.css';


export class NavMenu extends Component {
  displayName = NavMenu.name

  constructor(props) {
    super(props);
    this.state = { avatarUrl: '', userId: '' };
}

  render() {
    return (
      <Navbar variant="dark" expand="lg" collapseOnSelect>
        <Navbar.Brand>
          <Link to={'/'}>Streaming Website</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          { !this.state.userId ? <></> :
            <Nav className="mr-auto">
                <LinkContainer to={'/'} exact>
                  <Nav.Item>
                    <span glyph='home' /> Home
                  </Nav.Item>
                </LinkContainer>
                <LinkContainer to={'/tvshows'}>
                  <Nav.Item>
                    <span /> TV Shows
                  </Nav.Item>
                </LinkContainer>
                <LinkContainer to={'/movies'}>
                  <Nav.Item>
                    <span/> Movies
                  </Nav.Item>
                </LinkContainer>
                <SearchBar className="pull-right"/>
                { !!this.state.avatarUrl ? <Image src={this.state.avatarUrl} /> : <></> }
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
