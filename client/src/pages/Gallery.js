import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import axios from 'axios';

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/gallery')
            .then(res => setPhotos(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Container className="my-5">
            <h2 className="text-center mb-5" style={{ color: 'var(--tikar-red)' }}>🖼️ Galerie Culturelle</h2>
            <Row>
                {photos.map(photo => (
                    <Col md={4} sm={6} key={photo.id} className="mb-4">
                        <Card className="border-0 shadow-sm h-100 gallery-card" 
                              onClick={() => setSelectedImg(photo)}
                              style={{ cursor: 'pointer', transition: '0.3s' }}>
                            <Card.Img variant="top" src={photo.image_url} style={{ height: '250px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title className="small fw-bold">{photo.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal pour voir l'image en grand */}
            <Modal show={selectedImg !== null} onHide={() => setSelectedImg(null)} size="lg" centered>
                <Modal.Body className="p-0">
                    <img src={selectedImg?.image_url} alt="Zoom" className="w-100" />
                    <div className="p-3 bg-white text-center">
                        <h5>{selectedImg?.title}</h5>
                        <p className="text-muted">{selectedImg?.description}</p>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Gallery;