import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddWordModal = ({ show, handleClose, refreshData }) => {
    const [word, setWord] = useState({ word_tikar: '', word_french: '', phonetic: '', category: 'Général' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Récupération du jeton de sécurité
        
        try {
            await axios.post('http://localhost:5000/api/dictionary', word, {
                headers: { 'x-auth-token': token }
            });
            refreshData(); // Rafraîchir la liste après l'ajout
            handleClose(); // Fermer la modal
            setWord({ word_tikar: '', word_french: '', phonetic: '', category: 'Général' });
        } catch (err) {
            alert("Erreur lors de l'ajout : " + err.response?.data?.msg);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton style={{ backgroundColor: 'var(--tikar-red)', color: 'white' }}>
                <Modal.Title>Ajouter un mot au dictionnaire</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Mot en Tikar</Form.Label>
                        <Form.Control required onChange={e => setWord({...word, word_tikar: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Traduction en Français</Form.Label>
                        <Form.Control required onChange={e => setWord({...word, word_french: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phonétique (facultatif)</Form.Label>
                        <Form.Control onChange={e => setWord({...word, phonetic: e.target.value})} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Select onChange={e => setWord({...word, category: e.target.value})}>
                            <option>Général</option>
                            <option>Salutations</option>
                            <option>Famille</option>
                            <option>Nature</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Annuler</Button>
                    <Button type="submit" className="btn-tikar-gold">Enregistrer le mot</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddWordModal;