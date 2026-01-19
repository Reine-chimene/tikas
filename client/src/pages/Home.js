import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* HERO SECTION */}
            <div className="hero-section text-white d-flex align-items-center" style={{
                background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072') center/cover",
                height: "80vh"
            }}>
                <Container className="text-center">
                    <h1 className="display-2 fw-bold mb-3">Le Royaume Tikar</h1>
                    <p className="lead fs-3 mb-4">Gardien d'une histoire millénaire et d'une langue ancestrale.</p>
                    <div className="d-flex justify-content-center gap-3">
                        <Button as={Link} to="/propos" size="lg" className="btn-tikar-gold border-0 px-4">
                            Découvrir notre histoire
                        </Button>
                        <Button as={Link} to="/dictionnaire" size="lg" variant="outline-light" className="px-4">
                            Apprendre la langue
                        </Button>
                    </div>
                </Container>
            </div>

            {/* SECTION VALEURS */}
            <Container className="my-5 py-5">
                <Row className="text-center">
                    <Col md={4} className="mb-4">
                        <div className="fs-1 mb-3">👑</div>
                        <h4 className="fw-bold">Royauté</h4>
                        <p className="text-muted">Un héritage dynastique porté par le Sultanat de Bankim depuis des siècles.</p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <div className="fs-1 mb-3">🎨</div>
                        <h4 className="fw-bold">Artisanat</h4>
                        <p className="text-muted">Des bronzes célèbres et des tissus traditionnels qui racontent notre identité.</p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <div className="fs-1 mb-3">🗣️</div>
                        <h4 className="fw-bold">Langue</h4>
                        <p className="text-muted">Une richesse linguistique que nous préservons pour les générations futures.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;