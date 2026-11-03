import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'cameras',
    name: 'Cameras',
    query: 'camera',
    count: '12+ Units',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_1.png',
  },
  {
    id: 'lenses',
    name: 'Lenses',
    query: 'lenses',
    count: '18+ Units',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_2.png',
  },
  {
    id: 'lighting',
    name: 'Lighting',
    query: 'lighting',
    count: '8+ Units',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_3.png',
  },
  {
    id: 'audio',
    name: 'Audio',
    query: 'audio',
    count: '10+ Units',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_4.png',
  },
  {
    id: 'tripods',
    name: 'Tripods',
    query: 'tripods',
    count: '6+ Units',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_5.png',
  },
  {
    id: 'studio-setup',
    name: 'Studio Setup',
    query: 'studio',
    count: '3 Studios',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_6.png',
  },
];

const recentlyAdded = [
  {
    id: 'canon-r5',
    title: 'Canon R5 Camera',
    category: 'Cinema Camera',
    specs: '45MP Full-Frame • 8K RAW Recording',
    image: process.env.PUBLIC_URL + '/assets/images/item_img_1.png',
  },
  {
    id: 'aputure-300d',
    title: 'Aputure 300D II',
    category: 'Continuous Light',
    specs: '55,000 Lux @ 0.5m • Bowens Mount',
    image: process.env.PUBLIC_URL + '/assets/images/item_img_2.png',
  },
  {
    id: 'rode-ntg5',
    title: 'Rode NTG5 Mic',
    category: 'Broadcast Audio',
    specs: 'Supercardioid RF-Bias Shotgun Mic',
    image: process.env.PUBLIC_URL + '/assets/images/item_img_3.png',
  },
  {
    id: 'manfrotto-tripod',
    title: 'Manfrotto Tripod',
    category: 'Camera Support',
    specs: 'Fluid Video Head • 8kg Max Payload',
    image: process.env.PUBLIC_URL + '/assets/images/item_img_4.png',
  },
];

const popularSearches = [
  { label: 'Cameras', query: 'camera' },
  { label: 'Lenses', query: 'lenses' },
  { label: 'Lighting', query: 'lighting' },
  { label: 'Audio', query: 'audio' },
  { label: 'Tripods', query: 'tripod' },
];

const howItWorksSteps = [
  {
    step: '01',
    title: 'Select Your Gear',
    desc: 'Browse our curated catalog of cinema cameras, optics, lighting, and sound gear. Pick the exact units for your production.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Set Shoot Dates',
    desc: 'Choose your reservation start and return dates. Book single-day shoots or multi-week production schedule blocks.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Pick Up & Create',
    desc: 'Collect fully tested, sensor-cleaned equipment from our Malleshwaram studio hub and bring your creative vision to life.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

const creatorAssurances = [
  {
    icon: '🛡️',
    title: '100% Tested Gear',
    desc: 'Sensor-cleaned, firmware-updated, and rigorously bench-tested before every single pickup.',
  },
  {
    icon: '📍',
    title: 'Central Studio Hub',
    desc: 'Convenient Malleshwaram hub with dedicated prep bays so you can test your complete rig.',
  },
  {
    icon: '⚡',
    title: 'Flexible Schedules',
    desc: 'Half-day, daily, weekend, and long-term production rates with instant booking confirmation.',
  },
  {
    icon: '🎬',
    title: 'Filmmaker Support',
    desc: 'Direct technical support from experienced cinematographers whenever you need setup guidance.',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/assets?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/assets');
    }
  };

  return (
    <div className="home-page-root" style={{ backgroundColor: '#ffffff', overflowX: 'hidden' }}>

      {/* 1. Hero Section */}
      <section className="framelease-hero-wrap">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6} md={12}>
              <div className="framelease-section-badge mb-3">
                ✦ CAMERA &amp; STUDIO EQUIPMENT RENTAL
              </div>
              <h1 className="framelease-hero-title">
                Create More,<br />Rent Better
              </h1>
              <p className="framelease-hero-desc">
                Professional cinema camera bodies, optics, continuous lighting, wireless audio and studio setups – prepared and tested for your next shoot.
              </p>

              <form onSubmit={handleSearch} className="framelease-search-capsule">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ms-1 flex-shrink-0"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search for cameras, mics, lighting..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="framelease-search-input"
                />
                <button type="submit" className="framelease-search-btn">
                  Search
                </button>
              </form>

              <div className="framelease-hero-chips">
                <span className="text-muted small fw-semibold me-1">Popular:</span>
                {popularSearches.map((item) => (
                  <Link
                    key={item.query}
                    to={`/assets?category=${item.query}`}
                    className="framelease-hero-chip"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </Col>

            <Col lg={6} md={12} className="text-center">
              <div className="framelease-hero-img-box">
                <img
                  src={process.env.PUBLIC_URL + '/assets/images/mockup_hero_camera.png'}
                  alt="Camera & Studio Rig on Tripod"
                  className="framelease-hero-img"
                />
                <div className="framelease-hero-floating-badge">
                  <span>⚡</span>
                  <span>100% Tested Pro Gear • Ready to Shoot</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 2. Floating Feature Ribbon Strip */}
      <section className="framelease-features-wrap">
        <Container>
          <div className="framelease-features-card">
            <Row className="g-4 align-items-center justify-content-between">
              <Col xs={6} md={3}>
                <div className="framelease-feature-item">
                  <div className="framelease-feature-icon framelease-feature-icon-blue">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="7" r="4.5" />
                      <circle cx="7.5" cy="15" r="4.5" />
                      <circle cx="16.5" cy="15" r="4.5" />
                    </svg>
                  </div>
                  <div>
                    <div className="framelease-feature-title">Quality Gear</div>
                    <div className="framelease-feature-sub">from Top Brands</div>
                  </div>
                </div>
              </Col>

              <Col xs={6} md={3}>
                <div className="framelease-feature-item">
                  <div className="framelease-feature-icon framelease-feature-icon-green">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <path d="m9 16 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <div className="framelease-feature-title">Easy Online</div>
                    <div className="framelease-feature-sub">Booking</div>
                  </div>
                </div>
              </Col>

              <Col xs={6} md={3}>
                <div className="framelease-feature-item">
                  <div className="framelease-feature-icon framelease-feature-icon-purple">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="13" r="8" />
                      <path d="M12 9v4l2.5 2.5" />
                      <path d="M10 2h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="framelease-feature-title">Flexible Rental</div>
                    <div className="framelease-feature-sub">Plans</div>
                  </div>
                </div>
              </Col>

              <Col xs={6} md={3}>
                <div className="framelease-feature-item">
                  <div className="framelease-feature-icon framelease-feature-icon-orange">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="framelease-feature-title">Support When</div>
                    <div className="framelease-feature-sub">You Need It</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* 3. Shop by Category (Soft Gray Background) */}
      <section className="framelease-section-alt" id="categories">
        <Container>
          <div className="framelease-section-header">
            <div>
              <div className="framelease-section-badge">
                ✦ GEAR DEPARTMENTS
              </div>
              <h2 className="framelease-section-title">Shop by Category</h2>
              <p className="framelease-section-sub">
                Explore our comprehensive inventory organized by production department.
              </p>
            </div>
            <Link to="/assets" className="framelease-view-all">
              View All Equipment <span>&rarr;</span>
            </Link>
          </div>

          <Row className="g-3">
            {categories.map((cat) => (
              <Col key={cat.id} xs={6} sm={4} md={2}>
                <Link to={`/assets?category=${cat.query}`} className="framelease-cat-card">
                  <div className="framelease-cat-img-box">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="framelease-cat-img"
                    />
                  </div>
                  <div className="framelease-cat-name">{cat.name}</div>
                  <span className="framelease-cat-count">{cat.count}</span>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 4. How It Works (Crisp White Background) */}
      <section className="framelease-section-white" id="how-it-works">
        <Container>
          <div className="framelease-section-header text-center mx-auto" style={{ maxWidth: '640px', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div className="framelease-section-badge">
              ✦ 3 SIMPLE STEPS
            </div>
            <h2 className="framelease-section-title">How Rental Works</h2>
            <p className="framelease-section-sub text-center">
              Simple, transparent camera and lighting reservations designed for filmmakers and creators.
            </p>
          </div>

          <Row className="g-4 mt-2">
            {howItWorksSteps.map((stepItem) => (
              <Col key={stepItem.step} md={4}>
                <div className="framelease-step-card">
                  <div className="framelease-step-header">
                    <div className="framelease-step-icon">
                      {stepItem.icon}
                    </div>
                    <span className="framelease-step-num">{stepItem.step}</span>
                  </div>
                  <h4 className="framelease-step-title">{stepItem.title}</h4>
                  <p className="framelease-step-desc">{stepItem.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 5. Production Ready Promo Banner (Cinema Dark Contrast) */}
      <section className="framelease-section-alt" id="studio-banner">
        <Container>
          <div className="framelease-promo-card">
            <Row className="g-0 align-items-stretch">
              <Col lg={6} md={12}>
                <div className="framelease-promo-content">
                  <div className="framelease-section-badge framelease-section-badge-dark mb-3">
                    ✦ PRODUCTION READY
                  </div>
                  <h2 className="framelease-promo-title">
                    Your Vision,<br />Our Equipment
                  </h2>
                  <p className="framelease-promo-desc">
                    From indie creators to full production teams, we supply broadcast-ready cameras, cinema glass, and studio lighting.
                  </p>

                  <div className="framelease-promo-features mb-4">
                    <div className="framelease-promo-feature-row">
                      <span className="framelease-check-badge">✓</span>
                      <span>Sensor-cleaned and battery-charged before pickup</span>
                    </div>
                    <div className="framelease-promo-feature-row">
                      <span className="framelease-check-badge">✓</span>
                      <span>Protective hard cases, cables and media cards included</span>
                    </div>
                    <div className="framelease-promo-feature-row">
                      <span className="framelease-check-badge">✓</span>
                      <span>Transparent day rates with no hidden deposit surprises</span>
                    </div>
                  </div>

                  <div>
                    <Link to="/assets" className="framelease-promo-btn">
                      Browse Equipment Catalog <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={12}>
                <div className="framelease-promo-img-wrap">
                  <img
                    src={process.env.PUBLIC_URL + '/assets/images/banner_studio.png'}
                    alt="Photography studio with lights and cyclorama"
                    className="framelease-promo-img"
                  />
                  <div className="framelease-promo-img-badge">
                    <span>📍</span> Malleshwaram Studio Hub
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* 6. Recently Added (Crisp White Background) */}
      <section className="framelease-section-white" id="recently-added">
        <Container>
          <div className="framelease-section-header">
            <div>
              <div className="framelease-section-badge">
                ✦ INVENTORY SPOTLIGHT
              </div>
              <h2 className="framelease-section-title">Recently Added Gear</h2>
              <p className="framelease-section-sub">
                Fresh additions to our rental catalog, ready to reserve for your upcoming shoot.
              </p>
            </div>
            <Link to="/assets" className="framelease-view-all">
              View All Equipment <span>&rarr;</span>
            </Link>
          </div>

          <Row className="g-4">
            {recentlyAdded.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={3}>
                <div className="framelease-product-card">
                  <div className="framelease-product-img-box">
                    <span className="framelease-product-cat-tag">{item.category}</span>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="framelease-product-img"
                    />
                  </div>
                  <div className="framelease-product-title">{item.title}</div>
                  <div className="framelease-product-specs">{item.specs}</div>

                  <div className="framelease-product-status">
                    <span className="framelease-product-status-dot"></span>
                    <span>Available Now</span>
                  </div>

                  <Link
                    to={`/assets?q=${encodeURIComponent(item.title)}`}
                    className="framelease-product-book-btn"
                  >
                    <span>Book Gear</span>
                    <span>⚡</span>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 7. Why Choose Us / About (Soft Gray Background) */}
      <section className="framelease-section-alt" id="about">
        <Container>
          <div className="framelease-section-header text-center mx-auto" style={{ maxWidth: '640px', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div className="framelease-section-badge">
              ✦ WHY CREATORS CHOOSE US
            </div>
            <h2 className="framelease-section-title">Built for Filmmakers &amp; Creators</h2>
            <p className="framelease-section-sub text-center">
              Everything you need to produce cinematic content without capital gear expenses.
            </p>
          </div>

          <Row className="g-4 mt-2">
            {creatorAssurances.map((item, idx) => (
              <Col key={idx} xs={12} sm={6} md={3}>
                <div className="framelease-trust-card text-center">
                  <span className="framelease-trust-icon">{item.icon}</span>
                  <h5 className="framelease-trust-title">{item.title}</h5>
                  <p className="framelease-trust-desc">{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

    </div>
  );
}
