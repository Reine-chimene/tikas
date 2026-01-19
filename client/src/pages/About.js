import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';

const About = () => {
    return (
        <Container className="my-5">
            <Row className="align-items-center mb-5">
                <Col lg={6}>
                    <Badge bg="warning" text="dark" className="mb-2">Histoire & Origines</Badge>
                    <h2 className="display-4 fw-bold mb-4" style={{ color: 'var(--tikar-red)' }}>Le Berceau Bankim</h2>
                    <p className="lead text-dark">
                        Le peuple Tikar trouve ses racines dans la région de l'Adamaoua. Selon la tradition orale, 
                        c'est à <strong>Bankim</strong> que s'est formé le noyau originel du royaume.
                    </p>
                    <p>
                        Considérée comme la "ville mère", Bankim a donné naissance à plusieurs autres grands royaumes 
                        du Cameroun (Bamoun, Bamiléké, Bamenda) lors des grandes migrations du XIVème siècle. 
                        Aujourd'hui, le Sultanat de Bankim reste le garant de ces traditions sacrées.
                    </p>
                </Col>
                <Col lg={6}>
                    <img 
                        src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1974" 
                        alt="Culture Tikar" 
                        className="img-fluid rounded-4 shadow-lg"
                    />
                </Col>
            </Row>

            <hr className="my-5" />

            {/* SECTION CARTE & LOCALISATION */}
            <Row className="text-center mb-5">
                <Col>
                    <h3 className="fw-bold mb-4">Où nous trouver ?</h3>
                    <p className="text-muted">La plaine Tikar s'étend au cœur du Cameroun, entre montagnes et savanes.</p>
                    <div className="ratio ratio-21x9 rounded-4 overflow-hidden shadow">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31765.18342261546!2d11.48000!3d5.91000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10f607498c09d59f%3A0x66c8868c7e997576!2sBankim%2C%20Cameroun!5e0!3m2!1sfr!2sfr!4v1700000000000" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy"
                        ></iframe>
                    </div>
                </Col>
            </Row>

            {/* PETITE CHRONOLOGIE */}
            <div className="bg-light p-5 rounded-4 border-start border-5 border-danger">
                <h4 className="fw-bold mb-4">Dates Clés</h4>
                <ul className="list-unstyled">
                    <li className="mb-3">📌 <strong>XIIe - XIIIe Siècle :</strong> Émergence de l'entité Tikar dans l'Adamaoua.</li>
                    <li className="mb-3">📌 <strong>XIVe Siècle :</strong> Fondation de Bankim et début des grandes migrations.</li>
                    <li className="mb-3">📌 <strong>Aujourd'hui :</strong> Rayonnement culturel à travers le festival annuel et la préservation de la langue.</li>
                </ul>
            </div>
        </Container>
    );
};

export default About;