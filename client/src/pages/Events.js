import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-5" style={{ color: 'var(--tikar-red)' }}>📅 Agenda Culturel</h2>
      <Row>
        {events.map(event => (
          <Col md={6} key={event.id} className="mb-4">
            <Card className="flex-row shadow-sm border-0 overflow-hidden">
              <div style={{ width: '150px', backgroundColor: 'var(--tikar-gold)', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h3 className="m-0">{new Date(event.event_date).getDate()}</h3>
                <span>{new Date(event.event_date).toLocaleString('default', { month: 'short' })}</span>
              </div>
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text className="text-muted"><i className="bi bi-geo-alt"></i> {event.location}</Card.Text>
                <Card.Text>{event.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Events;