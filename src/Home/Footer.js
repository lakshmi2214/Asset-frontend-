import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: '40px 0', marginTop: 'auto' }}>
            <Container>
                <Row className="g-4 align-items-center">
                    <Col lg={4} md={12}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                            <h5 style={{ fontWeight: 800, margin: 0, letterSpacing: '-0.4px', color: '#ffffff' }}>FrameLease</h5>
                        </div>
                        <p style={{ color: '#94a3b8', lineHeight: 1.5, fontSize: '0.9rem', marginBottom: '1rem' }}>
                            Studio camera &amp; audio equipment reservation platform.
                        </p>
                        <div className="d-flex gap-2">
                            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub].map((Icon, idx) => (
                                <div key={idx} className="social-icon" style={{ width: '32px', height: '32px' }}>
                                    <Icon size={14} />
                                </div>
                            ))}
                        </div>
                    </Col>

                    <Col lg={5} md={6}>
                        <h6 style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', color: '#a78bfa', fontSize: '0.8rem' }}>Studio Hub Location</h6>
                        <div className="d-flex align-items-start gap-2">
                            <FaMapMarkerAlt className="mt-1" style={{ color: '#c4b5fd', fontSize: '0.9rem' }} />
                            <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.4 }}>
                                280/1, Anniamma Arcade, Sampige Road, <br />
                                18th Cross Rd, Malleshwaram, <br />
                                Bengaluru, Karnataka 560003
                            </div>
                        </div>
                    </Col>

                    <Col lg={3} md={6}>
                        <div className="d-flex flex-column gap-2">
                            <div className="d-flex align-items-center gap-2">
                                <FaPhone style={{ color: '#c4b5fd', fontSize: '0.8rem' }} />
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>+91 63 66 333 444</div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <FaEnvelope style={{ color: '#c4b5fd', fontSize: '0.8rem' }} />
                                <a href="mailto:support@aslikahani.com" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: '0.85rem' }}>support@aslikahani.com</a>
                            </div>
                        </div>
                    </Col>
                </Row>
                <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                <div className="text-center" style={{ color: '#475569', fontSize: '0.8rem' }}>
                    © {new Date().getFullYear()} Aslikahani. All rights reserved.
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
