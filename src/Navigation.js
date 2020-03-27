import React from 'react';

import { Link } from "react-scroll";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        }
    }

    render() {
      const user = this.props.user;

      const authComponent = user ? (
        <Dropdown as={NavItem}>
          <Dropdown.Toggle as={NavLink}>
            Welcome, {user.displayName}.
          </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={this.props.signOut}
              >Sign Out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button 
          as={NavLink}
          variant="link" 
          className="p-0 text-left"
          onClick={this.props.signInGoogle}
        >
          Login With Google
        </Button>
      );

      return (
          <Navbar 
            expanded={this.state.expanded}
            expand="md" 
            fixed="top" 
            className="navbar-theme" 
            variant="dark"
          >
            <Navbar.Toggle 
              onClick={ () => this.setState({ expanded: !this.state.expanded }) } 
              aria-controls="responsive-navbar-nav" 
            />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                {
                  authComponent
                }
              </Nav>

              <Nav className="ml-auto">
                <ScrollNavLink 
                  onClick={() => this.setState({ expanded: false })} 
                  target="help"
                >
                  Get and Give Help
                </ScrollNavLink>
                <ScrollNavLink 
                  onClick={() => this.setState({ expanded: false })} 
                  target="guidelines"
                >
                  Guidelines
                </ScrollNavLink>
                <ScrollNavLink 
                  onClick={() => this.setState({ expanded: false })} 
                  target="map"
                >
                  Map
                </ScrollNavLink>
                <ScrollNavLink 
                  onClick={() => this.setState({ expanded: false })} 
                  target="sunshine"
                >
                  Rays of Sunshine
                </ScrollNavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      );
    }
}


const ScrollNavLink = (props) => (
  <Link
    href={ "#" + props.target }
    onClick={ props.onClick }
    data-rb-event-key={ '#' + props.target }
    className="nav-link scroll-nav-link"
    to={props.target}
    activeClass="active"
    spy={true}
    smooth={true}
    offset={-70}
    duration={400}
  >{props.children}</Link>
);