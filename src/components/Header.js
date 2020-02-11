import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import logo from '../img/logo.svg';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import styles from './Header.scss';

const NavButton = props => <Button as={Link} {...props} />;

const Header = ({ variant = 'light' }) => {
  return (
    <Navbar
      expand="lg"
      collapseOnSelect
      variant={variant}
      className={variant === 'light' ? styles.navbarLight : styles.navbarDark}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto p-2 p-md-0 bg-white">
            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/events">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/get-involved">
              Get Involved
            </Nav.Link>
            <Nav.Link as={Link} to="/shop">
              Shop
            </Nav.Link>
            <Nav.Link as={Link} to="/faq">
              FAQ
            </Nav.Link>
            <NavButton to="/rsvp" variant="danger" className="ml-md-2">
              RSVP
            </NavButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  variant: PropTypes.string
};

export default Header;
