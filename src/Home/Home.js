import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaCalendarAlt,
  FaCamera,
  FaShieldAlt,
  FaHeadset,
  FaArrowRight,
} from 'react-icons/fa';

const equipmentCategories = [
  {
    id: 'cameras',
    title: 'Cameras',
    subtitle: 'Cinema & Mirrorless',
    image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=600&q=80',
    link: '/book-asset?category=camera',
  },
  {
    id: 'lenses',
    title: 'Lenses',
    subtitle: 'Prime & Zoom Lenses',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80',
    link: '/book-asset?category=lenses',
  },
  {
    id: 'lighting',
    title: 'Lighting',
    subtitle: 'LED & Continuous Lights',
    image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=600&q=80',
    link: '/book-asset?category=lighting',
  },
  {
    id: 'audio',
    title: 'Audio',
    subtitle: 'Mics & Wireless Kits',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    link: '/book-asset?category=audio',
  },
  {
    id: 'studio-setups',
    title: 'Studio Setups',
    subtitle: 'Soundstages & Backdrops',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
    link: '/book-asset?category=studio',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      navigate(`/book-asset?category=${selectedCategory}`);
    } else {
      navigate('/book-asset');
    }
  };

  return (
    <div className="home-page-root" style={{ overflowX: 'hidden' }}>
      {/* ── 1. CINEMATIC HERO SECTION (MATCHING OPTION 5) ── */}
      <section
        className="lensloop-hero-wrap"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="lensloop-hero-overlay" />
        <Container>
          <div className="lensloop-hero-content animate-slide-up">
            {/* Lavender / Purple Tag */}
            <div
              style={{
                color: '#a78bfa',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              CREATE | CAPTURE | PRODUCE
            </div>

            {/* Headline */}
            <h1
              style={{
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: 1.35,
                marginBottom: '0.85rem',
                letterSpacing: '-0.3px',
              }}
            >
              Book Camera &amp; Studio Equipment for Your Next Project
            </h1>

            {/* Subtitle */}
            <p
              style={{
                color: '#cbd5e1',
                fontSize: '14px',
                lineHeight: 1.55,
                marginBottom: '2rem',
                maxWidth: '560px',
              }}
            >
              From cameras and lenses to lighting, audio and full studio setups — everything you need, all in one place.
            </p>

            {/* Floating Search Pill */}
            <form onSubmit={handleSearch} className="search-capsule">
              <div className="search-capsule-item">
                <FaSearch style={{ color: '#64748b', fontSize: '13px' }} />
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="search-capsule-select"
                >
                  <option value="">All Categories</option>
                  <option value="camera">Cameras</option>
                  <option value="lenses">Lenses</option>
                  <option value="lighting">Lighting</option>
                  <option value="audio">Audio</option>
                  <option value="studio">Studio Setups</option>
                </Form.Select>
              </div>

              <div className="search-capsule-divider" />

              <div className="search-capsule-item">
                <FaCalendarAlt style={{ color: '#64748b', fontSize: '13px' }} />
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="search-capsule-input"
                  title="Select Date"
                />
              </div>

              <Button type="submit" className="btn-purple-pill">
                Search
              </Button>
            </form>
          </div>
        </Container>
      </section>

      {/* ── 2. TRUST / FEATURE HIGHLIGHTS BAR ── */}
      <section className="trust-feature-bar">
        <Container>
          <Row className="g-4 align-items-center justify-content-between text-center text-md-start">
            <Col xs={6} md={3}>
              <div className="trust-feature-item">
                <div className="trust-feature-icon">
                  <FaCamera />
                </div>
                <div>Professional Gear &amp; Accessories</div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="trust-feature-item">
                <div className="trust-feature-icon">
                  <FaCalendarAlt />
                </div>
                <div>Flexible Rental Plans</div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="trust-feature-item">
                <div className="trust-feature-icon">
                  <FaShieldAlt />
                </div>
                <div>Secure Payments &amp; Booking</div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="trust-feature-item">
                <div className="trust-feature-icon">
                  <FaHeadset />
                </div>
                <div>Support 7 Days a Week</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── 3. DISCOVER OUR EQUIPMENT (5 CARDS) ── */}
      <section className="py-5" id="equipment">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#0f172a',
                margin: 0,
                letterSpacing: '-0.3px',
              }}
            >
              Discover Our Equipment
            </h2>
            <Link
              to="/assets"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#64748b',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              View All <FaArrowRight size={12} />
            </Link>
          </div>

          <Row className="g-3">
            {equipmentCategories.map((item) => (
              <Col key={item.id} xs={6} md={4} lg style={{ flex: '1 0 0%' }}>
                <Link to={item.link} className="equipment-card-v5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="equipment-card-v5-img"
                  />
                  <div className="equipment-card-v5-overlay" />
                  <div className="equipment-card-v5-body">
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#ffffff',
                        marginBottom: '2px',
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#cbd5e1',
                      }}
                    >
                      {item.subtitle}
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── 4. BRING YOUR IDEAS TO LIFE BANNER CARD ── */}
      <section className="pb-5 pt-2">
        <Container>
          <div className="ideas-banner-card">
            <Row className="g-0 align-items-stretch">
              <Col md={5} lg={5}>
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80"
                  alt="Camera operator in studio setup"
                  className="ideas-banner-img"
                />
              </Col>
              <Col md={7} lg={7}>
                <div className="ideas-banner-content">
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#1e1b4b',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Bring Your Ideas to Life
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#475569',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem',
                      maxWidth: '520px',
                    }}
                  >
                    Whether it&apos;s a commercial, wedding, short film or content creation — we&apos;ve got the right gear for you.
                  </p>
                  <div>
                    <Button
                      as={Link}
                      to="/book-asset"
                      className="btn-purple-pill"
                    >
                      Explore Equipment <FaArrowRight size={12} />
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </div>
  );
}