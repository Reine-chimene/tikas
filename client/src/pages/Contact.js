import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        sender_name: '',
        sender_email: '',
        message_content: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/messages', formData);
            setStatus({ type: 'success', msg: res.data.msg });
            setFormData({ sender_name: '', sender_email: '', message_content: '' }); // Vider le formulaire
        } catch (err) {
            setStatus({ type: 'danger', msg: "Une erreur est survenue lors de l'envoi." });
        }
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-5 fw-bold">Contactez-nous</h2>
            <Card className="mx-auto shadow-sm border-0 rounded-4 p-4" style={{ maxWidth: '600px' }}>
                {status.msg && <Alert variant={status.type}>{status.msg}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom complet</Form.Label>
                        <Form.Control 
                            type="text" 
                            required 
                            value={formData.sender_name}
                            onChange={(e) => setFormData({...formData, sender_name: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Adresse Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            required 
                            value={formData.sender_email}
                            onChange={(e) => setFormData({...formData, sender_email: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Votre message</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={5} 
                            required 
                            value={formData.message_content}
                            onChange={(e) => setFormData({...formData, message_content: e.target.value})}
                        />
                    </Form.Group>
                    <Button type="submit" className="btn-tikar-gold w-100 py-2 fw-bold">
                        Envoyer le message
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Contact;