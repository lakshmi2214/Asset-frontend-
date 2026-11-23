import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaPaperPlane
} from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Equipment Rental',
    dates: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please provide your name, email, and inquiry details.');
      return;
    }

    setSubmitted(true);
    setError('');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'Equipment Rental',
      dates: '',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <div className="studio-page-container studio-contact-page">

      <section className="studio-hero-section">
        <Container>
          <div className="text-center mx-auto" style={{ maxWidth: '680px' }}>
            <div className="studio-eyebrow justify-content-center">
              <span className="studio-eyebrow-dot" />
              <span>GET IN TOUCH WITH OUR TEAM</span>
            </div>

            <h1 className="studio-hero-heading mb-3">
              Contact AsliKahani Studio
            </h1>

            <p className="studio-hero-description mx-auto mb-0">
              Have questions regarding camera availability, turnkey packages, or soundstage bookings?
              Drop us a message or visit our Malleshwaram prep facility.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 2. Contact Main Body: Address & Form ── */}
      <section className="studio-section studio-contact-main-section studio-bg-white">
        <Container>
          <Row className="gy-5 gx-lg-5">

            {/* Left Column: Company Address & Hub Information */}
            <Col lg={5} md={12}>
              <div className="studio-contact-info-card">
                <span className="studio-section-eyebrow">STUDIO ADDRESS &amp; HUB</span>
                <h2 className="studio-section-title mb-4" style={{ fontSize: '1.65rem' }}>
                  Our Bengaluru Studio
                </h2>

                <div className="studio-info-list">
                  {/* Address */}
                  <div className="studio-info-item">
                    <div className="studio-info-icon-box">
                      <FaMapMarkerAlt size={16} />
                    </div>
                    <div>
                      <div className="studio-info-label">Address</div>
                      <div className="studio-info-text">
                        #280/1, Anniamma Arcade, Sampige Road,<br />
                        18th Cross, Malleshwaram,<br />
                        Bengaluru, Karnataka — 560003
                      </div>
                    </div>
                  </div>

                  <div className="studio-info-item">
                    <div className="studio-info-icon-box">
                      <FaClock size={16} />
                    </div>
                    <div>
                      <div className="studio-info-label">Operating Hours</div>
                      <div className="studio-info-text">
                        <strong>Monday – Saturday:</strong> 9:00 AM – 8:00 PM<br />
                        <strong>Sunday:</strong> By Appointment (Prep &amp; Returns)
                      </div>
                    </div>
                  </div>

                  <div className="studio-info-item">
                    <div className="studio-info-icon-box">
                      <FaPhoneAlt size={16} />
                    </div>
                    <div>
                      <div className="studio-info-label">Phone &amp; WhatsApp</div>
                      <div className="studio-info-text">
                        <a href="tel:+916366333444" className="studio-contact-link">
                          +91 63 66 333 444
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="studio-info-item">
                    <div className="studio-info-icon-box">
                      <FaEnvelope size={16} />
                    </div>
                    <div>
                      <div className="studio-info-label">Email Support</div>
                      <div className="studio-info-text">
                        <a href="mailto:support@aslikahani.com" className="studio-contact-link">
                          support@aslikahani.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
s
              </div>
            </Col>

            <Col lg={7} md={12}>
              <div className="studio-form-card">
                <span className="studio-section-eyebrow">INQUIRY FORM</span>
                <h2 className="studio-section-title mb-2" style={{ fontSize: '1.65rem' }}>
                  Send Us a Message
                </h2>
                <p className="text-muted small mb-4">
                  Fill in your details below and our studio team will confirm availability within 2 hours.
                </p>

                {error && (
                  <Alert variant="danger" className="py-2 px-3 small rounded-3 mb-3">
                    {error}
                  </Alert>
                )}

                {submitted ? (
                  <div className="studio-form-success text-center py-5">
                    <div className="studio-success-icon mb-3">
                      <FaCheckCircle size={44} className="text-success" />
                    </div>
                    <h3 className="fw-bold mb-2 text-dark" style={{ fontSize: '1.4rem' }}>
                      Inquiry Received
                    </h3>
                    <p className="text-muted mx-auto mb-4" style={{ maxWidth: '420px', fontSize: '14px' }}>
                      Thank you, <strong>{formData.name}</strong>! Your message has been sent to our rental team.
                      We will review your equipment and date request and get back to you shortly.
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="studio-btn-secondary"
                      >
                        Send Another Inquiry
                      </button>
                      <Link to="/assets" className="studio-btn-primary">
                        <span>Browse Equipment</span>
                        <FaArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="studio-contact-form">
                    <Row className="g-3">

                      {/* Name */}
                      <Col md={6} xs={12}>
                        <div className="studio-form-group">
                          <label className="studio-form-label">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            className="studio-form-control"
                            placeholder="e.g. Rahul Sharma"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </Col>

                      {/* Email */}
                      <Col md={6} xs={12}>
                        <div className="studio-form-group">
                          <label className="studio-form-label">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            className="studio-form-control"
                            placeholder="rahul@production.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </Col>

                      {/* Phone */}
                      <Col md={6} xs={12}>
                        <div className="studio-form-group">
                          <label className="studio-form-label">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            className="studio-form-control"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </Col>

                      {/* Inquiry Type */}
                      <Col md={6} xs={12}>
                        <div className="studio-form-group">
                          <label className="studio-form-label">Inquiry Type</label>
                          <select
                            name="inquiryType"
                            className="studio-form-control"
                            value={formData.inquiryType}
                            onChange={handleChange}
                          >
                            <option value="Equipment Rental">Equipment Rental</option>
                            <option value="Soundstage Booking">Soundstage Booking</option>
                            <option value="Turnkey Package">Turnkey Production Kit</option>
                            <option value="Technical Consultation">Technical Consultation</option>
                            <option value="General Inquiry">General Inquiry</option>
                          </select>
                        </div>
                      </Col>

                      <Col xs={12}>
                        <div className="studio-form-group">
                          <label className="studio-form-label">Estimated Shoot Dates / Duration</label>
                          <input
                            type="text"
                            name="dates"
                            className="studio-form-control"
                            placeholder="e.g. Next weekend (Oct 24 - Oct 27) or 3-Day Shoot"
                            value={formData.dates}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>

                      <Col xs={12}>
                        <div className="studio-form-group">
                          <label className="studio-form-label">Required Equipment &amp; Message *</label>
                          <textarea
                            name="message"
                            rows={4}
                            className="studio-form-control"
                            placeholder="Tell us about your shoot, camera gear required (e.g. FX3, 24-70 GM, Aputure 600d), or questions..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </Col>

                      <Col xs={12} className="pt-2">
                        <button type="submit" className="studio-btn-primary w-100 justify-content-center py-3">
                          <FaPaperPlane size={13} className="me-2" />
                          <span>Submit Inquiry to Studio Desk</span>
                        </button>
                      </Col>

                    </Row>
                  </form>
                )}

              </div>
            </Col>

          </Row>
        </Container>
      </section>

    </div>
  );
}

