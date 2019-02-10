import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { SearchBar } from './shared/SearchBar';
import './NavMenu.css';


export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Streaming Website</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/tvshows'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> TV Shows
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/movies'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Movies
              </NavItem>
            </LinkContainer>
            <NavItem className="searchBar">
              <SearchBar/>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
