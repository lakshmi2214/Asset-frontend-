import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import Signup from './Home/Signup';
import Login from './Home/Login';
import AssetList from './Navpages/Assets/AssetList';
import AssetDetail from './Navpages/Assets/AssetDetail';
import BookingList from './Navpages/Bookings/BookingList';
import Home from './Home/Home';
import AssetBooking from './Navpages/Bookings/BookingForm';
import VerifyEmail from './Home/VerifyEmail';
import Footer from './Home/Footer';

import { API_BASE } from './auth';

function App() {
  const [user, setUser] = useState(() => localStorage.getItem('access') || null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      setUser(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar variant="dark" expand="lg" sticky="top" className="shadow-sm" style={{ backgroundColor: '#0f172a' }}>
          <Container>
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 800,
                fontSize: '1rem'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <span style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>LensLoop</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto ms-lg-4 gap-2">
                <Nav.Link as={Link} to="/" className="px-3">Home</Nav.Link>
                <Nav.Link as={Link} to="/assets" className="px-3">Equipment</Nav.Link>
                <Nav.Link as={Link} to="/book-asset" className="px-3">Studio</Nav.Link>
                <Nav.Link as={Link} to="/#equipment" className="px-3">How It Works</Nav.Link>
                {user && <Nav.Link as={Link} to="/bookings" className="px-3">My History</Nav.Link>}
              </Nav>
              <Nav className="gap-2 align-items-center">
                {user ? (
                  <Button variant="link" className="text-light text-decoration-none fw-bold" onClick={handleLogout}>
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login" className="px-3 text-light">Login</Nav.Link>
                    <Button as={Link} to="/signup" className="btn-purple-pill py-2 px-4 shadow-none">
                      Sign Up
                    </Button>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Container className="mt-4"><Signup setUser={setUser} /></Container>} />
            <Route path="/verify-email" element={<Container className="mt-4"><VerifyEmail /></Container>} />
            <Route path="/login" element={<Container className="mt-4"><Login setUser={setUser} /></Container>} />

            <Route path="/assets" element={user ? <Container className="mt-4"><AssetList /></Container> : <Navigate to="/login" />} />
            <Route path="/assets/:id" element={user ? <Container className="mt-4"><AssetDetail /></Container> : <Navigate to="/login" />} />
            <Route path="/book-asset" element={user ? <Container className="mt-4"><AssetBooking /></Container> : <Navigate to="/login" />} />
            <Route path="/bookings" element={user ? <Container className="mt-4"><BookingList /></Container> : <Navigate to="/login" />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
