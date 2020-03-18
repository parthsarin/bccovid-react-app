import React from 'react';

import { Link } from "react-scroll";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        }
    }

    render() {
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
                <Nav className="ml-auto">
                  <NavLink onClick={() => this.setState({ expanded: false })} target="news">News</NavLink>
                  <NavLink onClick={() => this.setState({ expanded: false })} target="guidelines">Guidelines</NavLink>
                  <NavLink onClick={() => this.setState({ expanded: false })} target="help">Get Help</NavLink>
                  <NavLink onClick={() => this.setState({ expanded: false })} target="contact">Contact</NavLink>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        );
    }
}


const NavLink = (props) => (
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