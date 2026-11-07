import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaClock,
  FaPaperPlane,
} from 'react-icons/fa';

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="ak-footer-root">
      <Container>
        {/* ── PRE-FOOTER CREATOR CLUB NEWSLETTER ── */}
        <div className="ak-footer-newsletter-box">
          <Row className="align-items-center g-4">
            <Col lg={7} md={12}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="ak-footer-newsletter-badge">CREATOR NEWSLETTER</span>
                <span style={{ color: '#f59e0b', fontSize: '13px', fontWeight: 600 }}>✦ 10% Off First Shoot</span>
              </div>
              <h3 className="ak-footer-newsletter-title mb-2">
                Get On-Set Ready with AsliKahani
              </h3>
              <p className="ak-footer-newsletter-sub mb-0">
                Receive weekly kit additions, lens calibration tips, and weekend equipment offers straight to your inbox.
              </p>
            </Col>
            <Col lg={5} md={12}>
              {subscribed ? (
                <div className="ak-newsletter-success">
                  <span>✓ You're in! Check your inbox for your 10% promo code.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="ak-newsletter-form">
                  <input
                    type="email"
                    className="ak-newsletter-input"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="ak-newsletter-btn">
                    <span>Subscribe</span>
                    <FaPaperPlane size={11} />
                  </button>
                </form>
              )}
            </Col>
          </Row>
        </div>

        {/* ── 4-COLUMN MAIN FOOTER CONTENT ── */}
        <Row className="g-5">
          {/* Col 1: Brand & Live Status */}
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span style={{ fontWeight: 600, fontSize: '1.4rem', color: '#ffffff', letterSpacing: '-0.3px' }}>
                AsliKahani
              </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.65, marginBottom: '1.25rem', fontWeight: 400 }}>
              Bangalore's premier cinema camera, master prime lens, and soundstage reservation platform. Calibrated for filmmakers, creators, and commercial crews.
            </p>

            {/* Live studio hub status */}
            <div className="ak-footer-status-pill">
              <span className="ak-footer-status-dot"></span>
              <span>Malleshwaram Hub • Open for Check-in &amp; Prep</span>
            </div>

            {/* Social Icons */}
            <div className="d-flex gap-2 mt-4">
              {[
                { Icon: FaInstagram, href: 'https://instagram.com' },
                { Icon: FaYoutube, href: 'https://youtube.com' },
                { Icon: FaTwitter, href: 'https://twitter.com' },
                { Icon: FaLinkedinIn, href: 'https://linkedin.com' },
                { Icon: FaFacebookF, href: 'https://facebook.com' },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ak-footer-social-btn"
                  aria-label="Social Link"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </Col>

          {/* Col 2: Equipment Catalog */}
          <Col lg={2} md={6} xs={6}>
            <h6 className="ak-footer-heading">Gear Catalog</h6>
            <Link to="/assets" className="ak-footer-link">Cinema Cameras</Link>
            <Link to="/assets" className="ak-footer-link">Prime &amp; Zoom Lenses</Link>
            <Link to="/assets" className="ak-footer-link">Studio Lighting</Link>
            <Link to="/assets" className="ak-footer-link">Microphones &amp; Audio</Link>
            <Link to="/assets" className="ak-footer-link">Tripods &amp; Gimbals</Link>
            <Link to="/assets" className="ak-footer-link">Soundstages &amp; Grip</Link>
          </Col>

          {/* Col 3: Quick Links & Platform */}
          <Col lg={2} md={6} xs={6}>
            <h6 className="ak-footer-heading">Explore</h6>
            <Link to="/" className="ak-footer-link">Home</Link>
            <Link to="/about" className="ak-footer-link">About AsliKahani</Link>
            <Link to="/assets" className="ak-footer-link">All Equipments</Link>
            <a href="https://aslikahani.com" target="_blank" rel="noopener noreferrer" className="ak-footer-link">
              AsliKahani Magazine ↗
            </a>
            <Link to="/login" className="ak-footer-link">Creator Sign In</Link>
            <Link to="/signup" className="ak-footer-link">Register Account</Link>
          </Col>

          {/* Col 4: Hub Dispatch & Contacts */}
          <Col lg={4} md={6}>
            <h6 className="ak-footer-heading">Studio Hub &amp; Dispatch</h6>
            <div className="d-flex align-items-start gap-2 mb-3">
              <FaMapMarkerAlt className="mt-1 flex-shrink-0" style={{ color: '#38bdf8', fontSize: '1rem' }} />
              <div style={{ color: '#cbd5e1', fontSize: '13.5px', lineHeight: 1.55 }}>
                280/1, Anniamma Arcade, Sampige Road,<br />
                18th Cross, Malleshwaram, Bengaluru 560003
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 mb-3">
              <FaClock className="flex-shrink-0" style={{ color: '#38bdf8', fontSize: '0.9rem' }} />
              <div style={{ color: '#cbd5e1', fontSize: '13px' }}>
                Mon – Sat: 9:00 AM – 8:00 PM <span style={{ color: '#94a3b8' }}>(Sunday by booking)</span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 mb-3">
              <FaPhone className="flex-shrink-0" style={{ color: '#38bdf8', fontSize: '0.9rem' }} />
              <a href="tel:+916366333444" style={{ color: '#ffffff', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none' }}>
                +91 63 66 333 444
              </a>
            </div>

            <div className="d-flex align-items-center gap-2">
              <FaEnvelope className="flex-shrink-0" style={{ color: '#38bdf8', fontSize: '0.9rem' }} />
              <a href="mailto:support@aslikahani.com" style={{ color: '#38bdf8', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none' }}>
                support@aslikahani.com
              </a>
            </div>
          </Col>
        </Row>

        {/* ── BOTTOM COPYRIGHT & BADGE ── */}
        <div className="ak-footer-bottom">
          <Row className="align-items-center g-3">
            <Col md={6} className="text-center text-md-start">
              <span>© {new Date().getFullYear()} AsliKahani. All rights reserved.</span>
              <span className="ms-3 text-secondary d-none d-sm-inline">Privacy Policy • Terms of Rental • Damage Waiver</span>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <span className="ak-footer-cinema-badge">
                🎬 Crafted for Bangalore Filmmakers &amp; Digital Storytellers
              </span>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
