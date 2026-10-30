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
        <Navbar variant="dark" expand="lg" sticky="top" className="py-3 shadow" style={{ backgroundColor: '#0f172a', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Container>
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 text-decoration-none">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#ffffff', letterSpacing: '-0.3px' }}>Aslikahani</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none text-light" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto gap-4 align-items-center my-2 my-lg-0">
                <Nav.Link as={Link} to="/" className="framelease-nav-link active">Home</Nav.Link>
                <Nav.Link as={Link} to="/assets" className="framelease-nav-link">Equipment</Nav.Link>
                <Nav.Link as={Link} to="/#how-it-works" className="framelease-nav-link">How It Works</Nav.Link>
                <Nav.Link as={Link} to="/#about" className="framelease-nav-link">About</Nav.Link>
              </Nav>
              <Nav className="gap-3 align-items-center flex-row justify-content-end">
                <Link to="/assets" className="text-decoration-none p-2 d-flex align-items-center" title="Search equipment">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </Link>
                {user ? (
                  <>
                    <Nav.Link as={Link} to="/bookings" className="text-white fw-semibold px-2">My History</Nav.Link>
                    <Button variant="link" className="text-light opacity-75 text-decoration-none fw-medium p-0" onClick={handleLogout}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn rounded-pill px-4 py-1 fw-semibold text-white border-0" style={{ fontSize: '0.88rem', backgroundColor: 'rgba(255, 255, 255, 0.12)' }}>
                      Login
                    </Link>
                    <Link to="/signup" className="btn rounded-pill px-4 py-1 fw-bold text-dark border-0" style={{ fontSize: '0.88rem', backgroundColor: '#ffffff' }}>
                      Sign Up
                    </Link>
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
