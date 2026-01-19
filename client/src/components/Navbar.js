import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TikarNavbar = () => {
  return (
    <Navbar expand="lg" variant="dark" className="navbar-tikar sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: 'var(--tikar-gold)', fontWeight: 'bold' }}>
          🏠 PEUPLE TIKAR
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/propos">À Propos</Nav.Link>
            <Nav.Link as={Link} to="/cours">Cours de Langue</Nav.Link>
            <Nav.Link as={Link} to="/dictionnaire">Dictionnaire</Nav.Link>
            <Nav.Link as={Link} to="/evenements">Événements</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="btn btn-outline-warning ms-lg-3">Rejoindre</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TikarNavbar;