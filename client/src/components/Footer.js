import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--tikar-black)', color: 'white', padding: '50px 0 20px 0', marginTop: '50px', borderTop: '5px solid var(--tikar-red)' }}>
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 style={{ color: 'var(--tikar-gold)' }}>ASSOCIATION TIKAR</h5>
            <p className="small">Préserver le patrimoine, éduquer la jeunesse et bâtir un avenir fier de ses racines.</p>
          </Col>
          <Col md={4} className="mb-4">
            <h5 style={{ color: 'var(--tikar-gold)' }}>Liens Rapides</h5>
            <ul className="list-unstyled">
              <li><a href="/propos" className="text-white text-decoration-none">Histoire</a></li>
              <li><a href="/cours" className="text-white text-decoration-none">Leçons de langue</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Nous contacter</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4 text-md-end">
            <h5 style={{ color: 'var(--tikar-gold)' }}>Suivez-nous</h5>
            <div className="d-flex justify-content-md-end gap-3 mt-3">
               {/* Ici tu pourras mettre des icônes Facebook/WhatsApp/YouTube */}
               <span style={{cursor: 'pointer'}}>📱 WhatsApp</span>
               <span style={{cursor: 'pointer'}}>🌐 Facebook</span>
               <span style={{cursor: 'pointer'}}>📺 YouTube</span>
            </div>
          </Col>
        </Row>
        <hr style={{ backgroundColor: 'var(--tikar-gold)' }} />
        <p className="text-center small mb-0">© {new Date().getFullYear()} Peuple Tikar - Fait avec fierté.</p>
      </Container>
    </footer>
  );
};

export default Footer;