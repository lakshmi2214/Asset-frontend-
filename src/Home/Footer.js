import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#ffffff', color: '#0a192f', padding: '45px 0 25px', marginTop: 'auto', borderTop: '1.5px solid #e2e8f0' }}>
            <Container>
                <Row className="g-4 align-items-center">
                    <Col lg={4} md={12}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                            <h5 style={{ fontWeight: 600, margin: 0, letterSpacing: '-0.3px', color: '#0a192f', fontSize: '1.15rem' }}>AsliKahani</h5>
                        </div>
                        <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '12px', marginBottom: '1.2rem', fontWeight: 400 }}>
                            Studio camera &amp; audio equipment reservation platform. Powered by creators, built for Bangalore.
                        </p>
                        <div className="d-flex gap-2">
                            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub].map((Icon, idx) => (
                                <div key={idx} className="social-icon" style={{ width: '34px', height: '34px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', transition: 'all 0.2s ease' }}>
                                    <Icon size={14} />
                                </div>
                            ))}
                        </div>
                    </Col>

                    <Col lg={5} md={6}>
                        <h6 style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.85rem', color: '#2563eb', fontSize: '12px' }}>Studio Hub Location</h6>
                        <div className="d-flex align-items-start gap-2">
                            <FaMapMarkerAlt className="mt-1" style={{ color: '#2563eb', fontSize: '0.95rem', flexShrink: 0 }} />
                            <div style={{ color: '#0a192f', fontSize: '13px', lineHeight: 1.55, fontWeight: 400 }}>
                                280/1, Anniamma Arcade, Sampige Road, <br />
                                18th Cross Rd, Malleshwaram, <br />
                                Bengaluru, Karnataka 560003
                            </div>
                        </div>
                    </Col>

                    <Col lg={3} md={6}>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center gap-2">
                                <FaPhone style={{ color: '#2563eb', fontSize: '0.85rem' }} />
                                <div style={{ color: '#0a192f', fontSize: '13px', fontWeight: 600 }}>+91 63 66 333 444</div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <FaEnvelope style={{ color: '#2563eb', fontSize: '0.85rem' }} />
                                <a href="mailto:support@aslikahani.com" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>support@aslikahani.com</a>
                            </div>
                        </div>
                    </Col>
                </Row>
                <hr className="my-4" style={{ borderColor: '#e2e8f0' }} />
                <div className="text-center" style={{ color: '#64748b', fontSize: '12px', fontWeight: 400 }}>
                    © {new Date().getFullYear()} AsliKahani. All rights reserved.
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
