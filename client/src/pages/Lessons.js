import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/lessons')
      .then(res => { setLessons(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4" style={{ color: 'var(--tikar-red)', borderBottom: '2px solid var(--tikar-gold)', display: 'inline-block' }}>
        🎓 Apprendre la langue Tikar
      </h2>
      
      {loading ? <Spinner animation="border" /> : (
        <Row>
          {lessons.map(lesson => (
            <Col md={4} key={lesson.id} className="mb-4">
              <Card className="shadow-sm h-100 border-0">
                <Card.Body>
                  <Badge bg="success" className="mb-2">{lesson.level}</Badge>
                  <Card.Title className="fw-bold">{lesson.title}</Card.Title>
                  <Card.Text>Découvrez cette leçon interactive pour progresser en Tikar.</Card.Text>
                  <div className="d-grid gap-2">
                    {lesson.video_url && (
                      <Button variant="outline-danger" size="sm" href={lesson.video_url} target="_blank">
                        📺 Voir la vidéo
                      </Button>
                    )}
                    {lesson.pdf_url && (
                      <Button variant="outline-dark" size="sm" href={lesson.pdf_url} download>
                        📄 Télécharger le PDF
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Lessons;