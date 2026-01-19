import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('adminName', res.data.admin.name);
            navigate('/admin/dashboard');
        } catch (err) {
            alert("Identifiants incorrects");
        }
    };

    return (
        <div style={{
            background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000')", // Remplace par une photo Tikar si tu en as une
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Container>
                <Card className="mx-auto p-4 border-0 shadow-lg" style={{ 
                    maxWidth: '400px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '15px'
                }}>
                    <div className="text-center mb-4">
                        <h2 className="fw-bold" style={{ color: 'var(--tikar-red)' }}>TIKAR ADMIN</h2>
                        <p className="text-muted small">Accès réservé aux administrateurs</p>
                    </div>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Email professionnel</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="nom@tikar.com"
                                onChange={e => setEmail(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Mot de passe</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="••••••••"
                                onChange={e => setPassword(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Button type="submit" className="btn-tikar-gold w-100 py-2 fw-bold shadow-sm">
                            Se connecter
                        </Button>
                    </Form>
                    <div className="text-center mt-4">
                        <Button variant="link" onClick={() => navigate('/')} className="text-decoration-none text-muted small">
                            ← Retour au site public
                        </Button>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Auth;