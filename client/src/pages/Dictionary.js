import React, { useState, useEffect } from 'react';
import { Container, Table, Form, InputGroup, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const Dictionary = () => {
    const [words, setWords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les données du Backend
    useEffect(() => {
        const fetchWords = async () => {
            try {
                // Remplace localhost:5000 par ton URL de serveur si besoin
                const response = await axios.get('http://localhost:5000/api/dictionary');
                setWords(response.data);
                setLoading(false);
            } catch (err) {
                setError("Impossible de charger le dictionnaire. Vérifiez que le serveur est lancé.");
                setLoading(false);
            }
        };
        fetchWords();
    }, []);

    // Filtrer les mots selon la recherche
    const filteredWords = words.filter(word =>
        word.word_tikar.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.word_french.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4" style={{ color: 'var(--tikar-red)' }}>
                📖 Dictionnaire Tikar - Français
            </h2>

            {/* Barre de recherche */}
            <InputGroup className="mb-4 shadow-sm">
                <Form.Control
                    placeholder="Rechercher un mot (Tikar ou Français)..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </InputGroup>

            {loading && <div className="text-center"><Spinner animation="border" variant="warning" /></div>}
            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
                <div className="table-responsive shadow-sm">
                    <Table hover striped borderless bg="white">
                        <thead style={{ backgroundColor: 'var(--tikar-gold)', color: 'white' }}>
                            <tr>
                                <th>Mot Tikar</th>
                                <th>Traduction (Fr)</th>
                                <th>Phonétique</th>
                                <th>Catégorie</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredWords.map((item) => (
                                <tr key={item.id}>
                                    <td className="fw-bold">{item.word_tikar}</td>
                                    <td>{item.word_french}</td>
                                    <td className="text-muted italic">/{item.phonetic}/</td>
                                    <td><span className="badge bg-secondary">{item.category}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
};

export default Dictionary;