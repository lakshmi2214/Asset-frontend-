import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#ffffff', color: '#1e40af', padding: '45px 0 25px', marginTop: 'auto', borderTop: '2px solid #dbeafe' }}>
            <Container>
                <Row className="g-4 align-items-center">
                    <Col lg={4} md={12}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                            <h5 style={{ fontWeight: 800, margin: 0, letterSpacing: '-0.4px', color: '#1e3a8a', fontSize: '1.25rem' }}>AsliKahani</h5>
                        </div>
                        <p style={{ color: '#2563eb', lineHeight: 1.6, fontSize: '0.92rem', marginBottom: '1.2rem', opacity: 0.9 }}>
                            Studio camera &amp; audio equipment reservation platform. Powered by creators, built for Bangalore.
                        </p>
                        <div className="d-flex gap-2">
                            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub].map((Icon, idx) => (
                                <div key={idx} className="social-icon" style={{ width: '34px', height: '34px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                                    <Icon size={14} />
                                </div>
                            ))}
                        </div>
                    </Col>

                    <Col lg={5} md={6}>
                        <h6 style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', color: '#1d4ed8', fontSize: '0.82rem' }}>Studio Hub Location</h6>
                        <div className="d-flex align-items-start gap-2">
                            <FaMapMarkerAlt className="mt-1" style={{ color: '#2563eb', fontSize: '1rem', flexShrink: 0 }} />
                            <div style={{ color: '#1e40af', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                280/1, Anniamma Arcade, Sampige Road, <br />
                                18th Cross Rd, Malleshwaram, <br />
                                Bengaluru, Karnataka 560003
                            </div>
                        </div>
                    </Col>

                    <Col lg={3} md={6}>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center gap-2">
                                <FaPhone style={{ color: '#2563eb', fontSize: '0.9rem' }} />
                                <div style={{ color: '#1e40af', fontSize: '0.9rem', fontWeight: 600 }}>+91 63 66 333 444</div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <FaEnvelope style={{ color: '#2563eb', fontSize: '0.9rem' }} />
                                <a href="mailto:support@aslikahani.com" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>support@aslikahani.com</a>
                            </div>
                        </div>
                    </Col>
                </Row>
                <hr className="my-4" style={{ borderColor: '#dbeafe' }} />
                <div className="text-center" style={{ color: '#3b82f6', fontSize: '0.85rem', fontWeight: 500 }}>
                    © {new Date().getFullYear()} AsliKahani. All rights reserved.
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
