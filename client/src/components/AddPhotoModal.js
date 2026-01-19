import React, { useState } from 'react';
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap';
import axios from 'axios';

const AddPhotoModal = ({ show, handleClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            alert("Veuillez sélectionner une image.");
            return;
        }

        const token = localStorage.getItem('token');
        
        // FormData est obligatoire pour envoyer des fichiers
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', file); // Le nom 'image' doit être le même que dans multer [upload.single('image')]

        try {
            setUploading(true);
            await axios.post('http://localhost:5000/api/gallery', formData, {
                headers: { 
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data' 
                },
                // Optionnel : pour afficher une barre de progression
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            });

            setUploading(false);
            alert("Photo ajoutée avec succès !");
            handleClose();
            window.location.reload(); 
        } catch (err) {
            console.error(err);
            setUploading(false);
            alert("Erreur lors de l'envoi de l'image. Vérifiez que le dossier 'uploads' existe sur le serveur.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton style={{ backgroundColor: '#198754', color: 'white' }}>
                <Modal.Title>Ajouter une photo locale</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Choisir une image (JPG, PNG)</Form.Label>
                        <Form.Control 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            required 
                        />
                        <Form.Text className="text-muted">
                            Sélectionnez une photo depuis votre galerie ou votre PC.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Titre de la photo</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ex: Danse traditionnelle Tikar"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Description / Contexte</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={2} 
                            placeholder="Optionnel..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    {uploading && (
                        <div className="mt-3">
                            <p className="small mb-1 text-center">Envoi en cours... {progress}%</p>
                            <ProgressBar animated now={progress} variant="success" />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={uploading}>
                        Annuler
                    </Button>
                    <Button type="submit" variant="success" disabled={uploading}>
                        {uploading ? 'Chargement...' : 'Télécharger sur le site'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddPhotoModal;