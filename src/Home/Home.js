import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'cameras',
    name: 'Cameras',
    query: 'camera',
    count: '12+ Units',
    desc: 'Full-frame mirrorless & broadcast cine bodies with 8K RAW recording.',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_1.png',
  },
  {
    id: 'lenses',
    name: 'Lenses',
    query: 'lenses',
    count: '18+ Units',
    desc: 'High-speed cine primes, telephoto zooms, and anamorphic glass.',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_2.png',
  },
  {
    id: 'lighting',
    name: 'Lighting',
    query: 'lighting',
    count: '8+ Units',
    desc: 'High-CRI LED panels & continuous lights.',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_3.png',
  },
  {
    id: 'audio',
    name: 'Audio',
    query: 'audio',
    count: '10+ Units',
    desc: 'Broadcast shotgun & wireless lav kits.',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_4.png',
  },
  {
    id: 'tripods',
    name: 'Tripods',
    query: 'tripods',
    count: '6+ Units',
    desc: 'Fluid video heads & carbon legs.',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_5.png',
  },
  {
    id: 'studio-setup',
    name: 'Studio Setup',
    query: 'studio',
    count: '3 Studios',
    desc: 'Soundstages with cyclorama walls.',
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

const impactStats = [
  { number: '500+', label: 'Verified Gear Units' },
  { number: '100%', label: 'Tested & Insured' },
  { number: '4.9★', label: 'Filmmaker Rating' },
  { number: '24/7', label: 'Technical Support' },
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

  const heroItem = recentlyAdded[0];
  const listItems = recentlyAdded.slice(1);

  return (
    <div className="home-page-root" style={{ backgroundColor: '#ffffff', overflowX: 'hidden' }}>

      {/* 1. Hero Section: Centered Vertical Stack Layout */}
      <section className="framelease-hero-wrap">
        <Container>
          <div className="hero-centered-content">
            <div className="framelease-section-badge mb-3">
              ✦ ASLIKAHANI STUDIO RENTALS
            </div>
            <h1 className="framelease-hero-title">
              Create More, Rent Better
            </h1>
            <p className="framelease-hero-desc">
              Professional cinema camera bodies, prime lenses, continuous lighting, wireless audio, and studio setups – prepared and tested in Bengaluru.
            </p>

            {/* Centered Search Capsule */}
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

            {/* Centered Category Quick Filter Chips */}
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
          </div>

          {/* Panoramic Gear Banner at Bottom of Hero */}
          <div className="hero-panoramic-showcase">
            <img
              src={process.env.PUBLIC_URL + '/assets/images/mockup_hero_camera.png'}
              alt="Professional Cinema Rig"
              className="hero-panoramic-img"
            />
            <div className="hero-panoramic-badge-left">
              <span>⚡</span>
              <span>100% Tested Pro Gear • Ready to Shoot</span>
            </div>
            <div className="hero-panoramic-badge-right">
              <span>📍</span>
              <span>Malleshwaram Hub • Bengaluru</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Full-Width Solid Dark Navy Trust Ribbon (Instant Visual Contrast) */}
      <section className="framelease-trust-ribbon">
        <Container>
          <Row className="g-4 align-items-center justify-content-between">
            <Col xs={6} lg={3}>
              <div className="framelease-trust-ribbon-item">
                <div className="framelease-trust-ribbon-icon ribbon-icon-blue">
                  🛡️
                </div>
                <div>
                  <div className="framelease-trust-ribbon-title">Quality Cinema Gear</div>
                  <div className="framelease-trust-ribbon-sub">from Top Brands</div>
                </div>
              </div>
            </Col>

            <Col xs={6} lg={3}>
              <div className="framelease-trust-ribbon-item">
                <div className="framelease-trust-ribbon-icon ribbon-icon-green">
                  ⚡
                </div>
                <div>
                  <div className="framelease-trust-ribbon-title">Instant Booking</div>
                  <div className="framelease-trust-ribbon-sub">Zero Paperwork</div>
                </div>
              </div>
            </Col>

            <Col xs={6} lg={3}>
              <div className="framelease-trust-ribbon-item">
                <div className="framelease-trust-ribbon-icon ribbon-icon-purple">
                  📅
                </div>
                <div>
                  <div className="framelease-trust-ribbon-title">Flexible Shoot Plans</div>
                  <div className="framelease-trust-ribbon-sub">Day &amp; Week Rates</div>
                </div>
              </div>
            </Col>

            <Col xs={6} lg={3}>
              <div className="framelease-trust-ribbon-item">
                <div className="framelease-trust-ribbon-icon ribbon-icon-orange">
                  📍
                </div>
                <div>
                  <div className="framelease-trust-ribbon-title">Malleshwaram Hub</div>
                  <div className="framelease-trust-ribbon-sub">Local Studio Pickup</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 3. Section 3: Categories Split Layout (Sticky Sidebar Left + 2x3 Grid Right) */}
      <section className="framelease-cat-split-section" id="categories">
        <Container>
          <Row className="g-5 align-items-start">
            {/* Left Sticky Sidebar */}
            <Col lg={4} md={12}>
              <div className="cat-sticky-sidebar">
                <div className="framelease-section-badge mb-3">
                  ✦ GEAR DEPARTMENTS
                </div>
                <h2 className="framelease-section-title mb-3" style={{ fontSize: '2.2rem' }}>
                  Explore by Department
                </h2>
                <p className="framelease-section-sub mb-4">
                  Everything you need for full-scale commercial productions and independent film shoots.
                </p>

                <div className="cat-info-card">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="text-primary fw-bold">✓</span>
                    <span className="small fw-semibold text-dark">Calibrated and tested sensors</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="text-primary fw-bold">✓</span>
                    <span className="small fw-semibold text-dark">Batteries and memory cards ready</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="text-primary fw-bold">✓</span>
                    <span className="small fw-semibold text-dark">Rigid Pelican protective cases</span>
                  </div>
                  <Link to="/assets" className="btn btn-outline-dark w-100 rounded-pill py-2 small fw-semibold">
                    View Complete Inventory &rarr;
                  </Link>
                </div>
              </div>
            </Col>

            {/* Right 2x3 Category Tile Grid */}
            <Col lg={8} md={12}>
              <Row className="g-3">
                {categories.map((cat) => (
                  <Col key={cat.id} xs={12} sm={6}>
                    <Link to={`/assets?category=${cat.query}`} className="cat-tile-card">
                      <div className="cat-tile-icon-box">
                        <img src={cat.image} alt={cat.name} className="cat-tile-img" />
                      </div>
                      <div>
                        <div className="cat-tile-name">{cat.name}</div>
                        <div className="cat-tile-count">{cat.count} Available</div>
                      </div>
                      <div className="cat-tile-arrow">&rarr;</div>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 4. Section 4: Full-Bleed Cinema Dark Showcase (Reversed: Image Left, Text Right) */}
      <section className="framelease-cinema-section" id="studio-banner">
        <Container>
          <Row className="align-items-center g-5">
            {/* Left: Studio Image */}
            <Col lg={6} md={12}>
              <div className="cinema-img-frame">
                <img
                  src={process.env.PUBLIC_URL + '/assets/images/banner_studio.png'}
                  alt="Photography studio with lights and cyclorama"
                  className="cinema-img"
                />
                <div className="cinema-img-badge">
                  <span>📍</span> Malleshwaram Studio Hub • Bangalore
                </div>
              </div>
            </Col>

            {/* Right: Studio Details & Checklist */}
            <Col lg={6} md={12}>
              <div className="framelease-section-badge framelease-section-badge-dark mb-3">
                ✦ PRODUCTION READY GEAR
              </div>
              <h2 className="cinema-title">
                Your Vision,<br />Our Equipment
              </h2>
              <p className="cinema-desc">
                From indie filmmakers to commercial crews, we supply broadcast-ready cinema camera packages, anamorphic lenses, and studio lighting.
              </p>

              <div className="cinema-features-list">
                <div className="cinema-feature-item">
                  <span className="cinema-check-badge">✓</span>
                  <span>Sensor-cleaned and battery-charged before pickup</span>
                </div>
                <div className="cinema-feature-item">
                  <span className="cinema-check-badge">✓</span>
                  <span>Protective hard cases, extra cables &amp; media cards included</span>
                </div>
                <div className="cinema-feature-item">
                  <span className="cinema-check-badge">✓</span>
                  <span>Transparent day rates with no hidden deposit surprises</span>
                </div>
              </div>

              <div>
                <Link to="/assets" className="cinema-cta-btn">
                  Browse Equipment Catalog <span>&rarr;</span>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 5. Section 5: Spotlight Layout (1 Large Featured Card Left + 3 Stacked Horizontal Rows Right) */}
      <section className="framelease-spotlight-section" id="recently-added">
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

          <Row className="g-4 align-items-stretch">
            {/* Left: 1 Large Hero Card */}
            <Col lg={5} md={12}>
              <div className="gear-hero-card">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-1 rounded-pill small fw-semibold">
                      Featured Cinema Unit
                    </span>
                    <span className="small text-success fw-bold">● Available Now</span>
                  </div>

                  <div className="gear-hero-img-box">
                    <img
                      src={heroItem.image}
                      alt={heroItem.title}
                      className="gear-hero-img"
                    />
                  </div>

                  <div className="small text-muted fw-bold text-uppercase mb-1">{heroItem.category}</div>
                  <h3 className="fw-bold mb-2 text-dark" style={{ fontSize: '1.4rem' }}>{heroItem.title}</h3>
                  <p className="text-muted small mb-4">{heroItem.specs}</p>
                </div>

                <Link
                  to={`/assets?q=${encodeURIComponent(heroItem.title)}`}
                  className="btn btn-dark w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                >
                  <span>Book Equipment</span>
                  <span>➔</span>
                </Link>
              </div>
            </Col>

            {/* Right: 3 Stacked Horizontal Row Cards */}
            <Col lg={7} md={12}>
              <div className="d-flex flex-column gap-3 h-100 justify-content-between">
                {listItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/assets?q=${encodeURIComponent(item.title)}`}
                    className="gear-row-card"
                  >
                    <div className="gear-row-img-box">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ maxHeight: '60px', maxWidth: '68px', objectFit: 'contain' }}
                      />
                    </div>

                    <div className="flex-grow-1">
                      <div className="small text-primary fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>
                        {item.category}
                      </div>
                      <div className="fw-bold text-dark mb-1" style={{ fontSize: '1.05rem' }}>
                        {item.title}
                      </div>
                      <div className="text-muted small">
                        {item.specs}
                      </div>
                    </div>

                    <div className="gear-row-btn">
                      Book ➔
                    </div>
                  </Link>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 6. Section 6: Studio Hub & Impact Stats (Asymmetrical Split Layout) */}
      <section className="framelease-about-section" id="about">
        <Container>
          <Row className="g-4 align-items-stretch">
            {/* Left: Brand story & 2x2 Impact Stats Grid */}
            <Col lg={7} md={12}>
              <div className="pe-lg-4 mb-4">
                <div className="framelease-section-badge">
                  ✦ ABOUT ASLIKAHANI
                </div>
                <h2 className="framelease-section-title mb-2">
                  Empowering Bengaluru&apos;s Filmmakers
                </h2>
                <p className="framelease-section-sub mb-4" style={{ maxWidth: '100%' }}>
                  We provide independent creators, commercial crews, and film students with frictionless access to professional production equipment.
                </p>

                <Row className="g-3">
                  {impactStats.map((stat, idx) => (
                    <Col key={idx} xs={6}>
                      <div className="stat-box">
                        <div className="stat-number">{stat.number}</div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>

            {/* Right: Physical Studio Hub Details Card */}
            <Col lg={5} md={12}>
              <div className="studio-location-card">
                <div>
                  <div className="studio-hub-badge">
                    📍 BANGALORE STUDIO HUB
                  </div>
                  <h3 className="studio-hub-title">Malleshwaram Studio &amp; Prep Bay</h3>
                  <div className="studio-hub-detail">
                    <strong>Address:</strong><br />
                    280/1, Anniamma Arcade, Sampige Road,<br />
                    18th Cross Rd, Malleshwaram,<br />
                    Bengaluru, Karnataka 560003
                  </div>
                  <div className="studio-hub-detail">
                    <strong>Operating Hours:</strong><br />
                    Monday – Saturday: 9:00 AM – 8:00 PM<br />
                    Sunday: By Reservation
                  </div>
                  <div className="studio-hub-detail">
                    <strong>Contact:</strong><br />
                    📞 +91 63 66 333 444 &bull; ✉️ support@aslikahani.com
                  </div>
                </div>

                <div className="pt-3 border-top mt-3">
                  <Link to="/assets" className="btn btn-dark w-100 rounded-pill py-2 fw-semibold">
                    Browse Studio Equipment ➔
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
}
