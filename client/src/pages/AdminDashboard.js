import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Spinner, Tab, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Modals
import AddWordModal from '../components/AddWordModal';
import AddLessonModal from '../components/AddLessonModal';
import AddPhotoModal from '../components/AddPhotoModal';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const adminName = localStorage.getItem('adminName');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showWordModal, setShowWordModal] = useState(false);
    const [showLessonModal, setShowLessonModal] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState(false);

    // Fonction pour charger les messages
    const fetchMessages = useCallback(async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const res = await axios.get('http://localhost:5000/api/messages', {
                headers: { 'x-auth-token': token } // HEADER CRUCIAL
            });
            setMessages(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Erreur 401 ou autre :", err);
            if (err.response && err.response.status === 401) {
                navigate('/login');
            }
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-5 p-4 bg-white shadow-sm rounded-4 border-start border-5 border-warning">
                <div>
                    <h2 className="m-0 fw-bold">Espace Administration</h2>
                    <span className="text-muted">Session active : <strong>{adminName}</strong></span>
                </div>
                <Button variant="outline-danger" onClick={handleLogout}>Déconnexion</Button>
            </div>

            <Tab.Container id="admin-tabs" defaultActiveKey="messages">
                <Row>
                    <Col lg={3}>
                        <Nav variant="pills" className="flex-column bg-white p-3 shadow-sm rounded-4">
                            <Nav.Item><Nav.Link eventKey="content">📝 Contenu</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="messages">📩 Messages <Badge bg="danger">{messages.length}</Badge></Nav.Link></Nav.Item>
                        </Nav>
                    </Col>
                    <Col lg={9}>
                        <Tab.Content className="bg-white p-4 shadow-sm rounded-4">
                            <Tab.Pane eventKey="content">
                                <Row>
                                    <Col md={4}><Button className="btn-tikar-gold w-100" onClick={() => setShowWordModal(true)}>+ Mot</Button></Col>
                                    <Col md={4}><Button variant="danger" className="w-100" onClick={() => setShowLessonModal(true)}>+ Vidéo</Button></Col>
                                    <Col md={4}><Button variant="success" className="w-100" onClick={() => setShowPhotoModal(true)}>+ Photo</Button></Col>
                                </Row>
                            </Tab.Pane>
                            
                            <Tab.Pane eventKey="messages">
                                {loading ? <Spinner animation="border" /> : (
                                    <Table hover responsive>
                                        <thead>
                                            <tr><th>Nom</th><th>Email</th><th>Message</th></tr>
                                        </thead>
                                        <tbody>
                                            {messages.map(m => (
                                                <tr key={m.id}>
                                                    <td>{m.sender_name}</td>
                                                    <td>{m.sender_email}</td>
                                                    <td>{m.message_content}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

            <AddWordModal show={showWordModal} handleClose={() => setShowWordModal(false)} />
            <AddLessonModal show={showLessonModal} handleClose={() => setShowLessonModal(false)} />
            <AddPhotoModal show={showPhotoModal} handleClose={() => setShowPhotoModal(false)} />
        </Container>
    );
};

export default AdminDashboard;