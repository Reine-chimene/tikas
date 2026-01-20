import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';

const About = () => {
    return (
        <Container className="my-5">
            {/* SECTION HISTOIRE */}
            <Row className="align-items-center mb-5">
                <Col lg={6}>
                    <Badge bg="warning" text="dark" className="mb-2">Histoire & Origines</Badge>
                    <h2 className="display-4 fw-bold mb-4" style={{ color: '#d9534f' }}>Le Berceau Bankim</h2>
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
                        alt="Culture et paysages Tikar" 
                        className="img-fluid rounded-4 shadow-lg"
                    />
                </Col>
            </Row>

            <hr className="my-5" />

            {/* SECTION CARTE & LOCALISATION (Corrigée pour Vercel) */}
            <Row className="text-center mb-5">
                <Col>
                    <h3 className="fw-bold mb-4">Où nous trouver ?</h3>
                    <p className="text-muted">La plaine Tikar s'étend au cœur du Cameroun, entre montagnes et savanes.</p>
                    <div className="ratio ratio-21x9 rounded-4 overflow-hidden shadow">
                        <iframe 
                            title="Carte de localisation du Royaume Tikar à Bankim"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15874.123456789!2d11.4833!3d6.0833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10f63b4f55555555%3A0xabcdef123456789!2sBankim%2C%20Cameroun!5e0!3m2!1sfr!2sfr!4v1642500000000!5m2!1sfr!2sfr" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy"
                        ></iframe>
                    </div>
                </Col>
            </Row>

            {/* SECTION CHRONOLOGIE */}
            <div className="bg-light p-5 rounded-4 border-start border-5 border-danger shadow-sm">
                <h4 className="fw-bold mb-4">Dates Clés de notre Peuple</h4>
                <ul className="list-unstyled">
                    <li className="mb-3">
                        <span className="text-danger fw-bold">XIIe - XIIIe Siècle :</span> Émergence de l'entité Tikar dans l'Adamaoua.
                    </li>
                    <li className="mb-3">
                        <span className="text-danger fw-bold">XIVe Siècle :</span> Fondation de Bankim et début des grandes migrations vers l'Ouest et le Noun.
                    </li>
                    <li className="mb-3">
                        <span className="text-danger fw-bold">Aujourd'hui :</span> Rayonnement culturel à travers le Sultanat et la préservation de notre patrimoine linguistique.
                    </li>
                </ul>
            </div>
        </Container>
    );
};

export default About;