import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Signup from './Home/Signup';
import Login from './Home/Login';
import AssetList from './Navpages/Assets/AssetList';
import BookingList from './Navpages/Bookings/BookingList';
import Home from './Home/Home';
import AssetBooking from './Navpages/Bookings/BookingForm';
import Footer from './Home/Footer';
import About from './Home/About';
import { API_BASE } from './auth';

function AssetRedirect() {
  const { id } = useParams();
  return <Navigate to={`/book-asset?assetId=${id}`} replace />;
}

function AppContent({ user, setUser, handleLogout }) {
  const location = useLocation();
  const [navExpanded, setNavExpanded] = useState(false);

  // Automatically collapse the mobile 3-bar hamburger menu whenever navigating to any page
  useEffect(() => {
    setNavExpanded(false);
  }, [location.pathname, location.search, location.hash]);

  const closeNav = () => setNavExpanded(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        expand="lg"
        sticky="top"
        expanded={navExpanded}
        onToggle={(expanded) => setNavExpanded(expanded)}
        collapseOnSelect
        className="py-2 ak-navbar"
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" onClick={closeNav} className="d-flex align-items-center gap-2 text-decoration-none">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span style={{ fontWeight: 600, fontSize: '1.42rem', color: '#0a192f', letterSpacing: '-0.4px' }}>AsliKahani</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="ak-nav" className="border-0 shadow-none" />

          <Navbar.Collapse id="ak-nav">
            {/* Left-aligned links */}
            <Nav className="ms-lg-4 me-auto gap-1 align-items-center my-2 my-lg-0">
              <Nav.Link as={Link} to="/" onClick={closeNav} className="ak-nav-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" onClick={closeNav} className="ak-nav-link">About</Nav.Link>
              <Nav.Link as={Link} to="/assets" onClick={closeNav} className="ak-nav-link">Equipments</Nav.Link>
            </Nav>

            {/* Right actions */}
            <Nav className="gap-2 align-items-center flex-row justify-content-end">
              {user ? (
                <>
                  <Nav.Link as={Link} to="/bookings" onClick={closeNav} className="ak-nav-link">My History</Nav.Link>
                  <button
                    className="btn ak-btn-outline btn-sm rounded-pill px-3"
                    onClick={() => { closeNav(); handleLogout(); }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeNav} className="ak-nav-link px-2">Login</Link>
                  <Link to="/signup" onClick={closeNav} className="btn ak-btn-dark btn-sm rounded-pill px-3">
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
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Container className="mt-4"><Signup setUser={setUser} /></Container>} />
          <Route path="/login" element={<Container className="mt-4"><Login setUser={setUser} /></Container>} />

          <Route path="/assets" element={user ? <Container className="mt-4"><AssetList /></Container> : <Navigate to="/login" />} />
          <Route path="/assets/:id" element={user ? <AssetRedirect /> : <Navigate to="/login" />} />
          <Route path="/book-asset" element={user ? <Container className="mt-4"><AssetBooking /></Container> : <Navigate to="/login" />} />
          <Route path="/bookings" element={user ? <Container className="mt-4"><BookingList /></Container> : <Navigate to="/login" />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

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
      <AppContent user={user} setUser={setUser} handleLogout={handleLogout} />
    </Router>
  );
}

export default App;
