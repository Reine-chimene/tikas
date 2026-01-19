import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddLessonModal = ({ show, handleClose }) => {
    const [lesson, setLesson] = useState({ 
        title: '', 
        video_url: '', 
        level: 'Débutant',
        description: '' 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        try {
            // Nettoyage de l'URL YouTube : 
            // Si l'admin colle "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
            // on ne garde que "dQw4w9WgXcQ"
            let videoId = lesson.video_url;
            if (videoId.includes('v=')) {
                videoId = videoId.split('v=')[1].split('&')[0];
            } else if (videoId.includes('youtu.be/')) {
                videoId = videoId.split('youtu.be/')[1];
            }

            await axios.post('http://localhost:5000/api/lessons', 
                { ...lesson, video_url: videoId }, 
                { headers: { 'x-auth-token': token } }
            );

            alert("Vidéo de cours ajoutée avec succès !");
            handleClose();
            window.location.reload(); // Pour voir la nouvelle vidéo sur la page cours
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'ajout de la leçon.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton style={{ backgroundColor: '#dc3545', color: 'white' }}>
                <Modal.Title>Ajouter une Leçon Vidéo</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Titre de la leçon</Form.Label>
                        <Form.Control 
                            required 
                            type="text" 
                            placeholder="Ex: Apprendre les chiffres en Tikar"
                            onChange={e => setLesson({...lesson, title: e.target.value})} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Lien YouTube</Form.Label>
                        <Form.Control 
                            required 
                            type="text" 
                            placeholder="Collez le lien de la vidéo ici..."
                            onChange={e => setLesson({...lesson, video_url: e.target.value})} 
                        />
                        <Form.Text className="text-muted">
                            Collez l'adresse complète de la vidéo YouTube.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Niveau de difficulté</Form.Label>
                        <Form.Select onChange={e => setLesson({...lesson, level: e.target.value})}>
                            <option value="Débutant">Débutant</option>
                            <option value="Intermédiaire">Intermédiaire</option>
                            <option value="Avancé">Avancé</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Annuler</Button>
                    <Button type="submit" variant="danger">Publier la leçon</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddLessonModal;