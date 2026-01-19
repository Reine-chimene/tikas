import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Container className="text-center my-5 py-5">
            <h1 style={{ fontSize: '6rem', color: 'var(--tikar-red)' }}>404</h1>
            <h2 className="mb-4">Oups ! Page introuvable</h2>
            <p className="lead mb-5">
                La page que vous recherchez n'existe pas ou a été déplacée dans une autre chefferie.
            </p>
            <Button as={Link} to="/" className="btn-tikar-gold px-4 py-2">
                Retour à l'accueil
            </Button>
        </Container>
    );
};

// C'EST CETTE LIGNE QUI MANQUE :
export default NotFound;