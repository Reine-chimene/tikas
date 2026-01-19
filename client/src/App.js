import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// COMPOSANTS DE STRUCTURE
import TikarNavbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// PAGES PUBLIQUES
import Home from './pages/Home';
import About from './pages/About';
import Dictionary from './pages/Dictionary';
import Lessons from './pages/Lessons';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Auth from './pages/Login';

// PAGES ADMIN
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

/**
 * Composant interne pour gérer l'affichage conditionnel de la Navbar et du Footer
 */
const AppContent = () => {
  const location = useLocation();

  // On définit les pages où on ne veut PAS voir la Navbar et le Footer
  // Cela inclut la page de login et toutes les pages commençant par /admin
  const isAdminPath = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <>
      {/* Affiche la Navbar uniquement si on n'est pas en mode Admin/Login */}
      {!isAdminPath && <TikarNavbar />}
      
      <main style={{ minHeight: isAdminPath ? '100vh' : '80vh' }}>
        <Routes>
          {/* --- ROUTES PUBLIQUES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/propos" element={<About />} />
          <Route path="/dictionnaire" element={<Dictionary />} />
          <Route path="/cours" element={<Lessons />} />
          <Route path="/evenements" element={<Events />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Auth />} />

          {/* --- ROUTE ADMIN PROTÉGÉE --- */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* --- PAGE 404 --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Affiche le Footer uniquement si on n'est pas en mode Admin/Login */}
      {!isAdminPath && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;