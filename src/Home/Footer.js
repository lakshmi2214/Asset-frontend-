import React from 'react';
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
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="ak-footer-root">
      <Container>
        <Row className="gy-4 gx-lg-5 align-items-start">
          {/* Brand & Social */}
          <Col lg={5} md={6}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span style={{ fontWeight: 600, fontSize: '1.25rem', color: '#ffffff', letterSpacing: '-0.3px' }}>
                AsliKahani
              </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.5, marginBottom: '1rem', fontWeight: 400, maxWidth: '360px' }}>
              Bangalore's hub for professional cinema cameras, master prime lenses, and production equipment rentals.
            </p>
            <div className="d-flex gap-2">
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
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={3} sm={6} xs={6}>
            <h6 className="ak-footer-heading">Quick Links</h6>
            <div className="d-flex flex-column gap-2">
              <Link to="/" className="ak-footer-link">Home</Link>
              <Link to="/assets" className="ak-footer-link">Equipment Catalog</Link>
              <Link to="/about" className="ak-footer-link">About Us</Link>
              <Link to="/login" className="ak-footer-link">Sign In / Register</Link>
            </div>
          </Col>

          {/* Contact & Location */}
          <Col lg={4} sm={6} xs={6}>
            <h6 className="ak-footer-heading">Contact &amp; Hub</h6>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt style={{ color: '#38bdf8', fontSize: '0.85rem' }} className="flex-shrink-0" />
                <span style={{ color: '#cbd5e1', fontSize: '13px' }}>Malleshwaram, Bengaluru 560003</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaPhone style={{ color: '#38bdf8', fontSize: '0.85rem' }} className="flex-shrink-0" />
                <a href="tel:+916366333444" style={{ color: '#ffffff', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
                  +91 63 66 333 444
                </a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaEnvelope style={{ color: '#38bdf8', fontSize: '0.85rem' }} className="flex-shrink-0" />
                <a href="mailto:support@aslikahani.com" style={{ color: '#38bdf8', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
                  support@aslikahani.com
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <div className="ak-footer-bottom">
          <Row className="align-items-center">
            <Col sm={6} className="text-center text-sm-start">
              <span>© {new Date().getFullYear()} AsliKahani. All rights reserved.</span>
            </Col>
            <Col sm={6} className="text-center text-sm-end mt-2 mt-sm-0">
              <span style={{ color: '#94a3b8', fontSize: '12px' }}>
                Bangalore Studio &amp; Equipment Rentals
              </span>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
