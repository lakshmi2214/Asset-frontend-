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

const howItWorksSteps = [
  {
    step: '01',
    title: 'Select Your Gear',
    desc: 'Browse our catalog of cinema cameras, lenses, lighting, and audio equipment. Pick the exact units you need for your shoot.',
  },
  {
    step: '02',
    title: 'Choose Shoot Dates',
    desc: 'Pick your start and return schedule. Book single-day shoots, weekend packages, or multi-week production blocks.',
  },
  {
    step: '03',
    title: 'Pick Up & Create',
    desc: 'Collect fully tested, sensor-cleaned equipment from our Malleshwaram studio hub and bring your creative vision to life.',
  },
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

  const cameraCat = categories[0];
  const lensCat = categories[1];
  const compactCats = categories.slice(2);

  return (
    <div className="home-page-root" style={{ backgroundColor: '#ffffff', overflowX: 'hidden' }}>

      {/* 1. Hero Section (Studio Dot Grid Background) */}
      <section className="framelease-hero-wrap">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6} md={12}>
              <div className="framelease-section-badge mb-3">
                ✦ ASLIKAHANI STUDIO RENTALS
              </div>
              <h1 className="framelease-hero-title">
                Create More,<br />Rent Better
              </h1>
              <p className="framelease-hero-desc">
                Professional cinema camera bodies, prime lenses, continuous lighting, wireless audio and studio setups – prepared and tested in Bengaluru.
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

      {/* 2. Solid Dark Navy Trust Ribbon (Instant Visual Separation) */}
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

      {/* 3. Section 3: Bento Grid Categories (Asymmetrical Modern Layout) */}
      <section className="framelease-bento-section" id="categories">
        <Container>
          <div className="framelease-section-header">
            <div>
              <div className="framelease-section-badge">
                ✦ GEAR DEPARTMENTS
              </div>
              <h2 className="framelease-section-title">Explore by Department</h2>
              <p className="framelease-section-sub">
                Pick the exact camera bodies, glass, lighting and audio for your shoot.
              </p>
            </div>
            <Link to="/assets" className="framelease-view-all">
              View All Equipment <span>&rarr;</span>
            </Link>
          </div>

          <Row className="g-3">
            {/* Featured Bento 1: Cameras (Large Dark Card) */}
            <Col lg={7} md={12}>
              <Link to={`/assets?category=${cameraCat.query}`} className="bento-card bento-card-camera">
                <Row className="h-100 align-items-center">
                  <Col sm={7}>
                    <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25 px-3 py-1 rounded-pill small mb-3">
                      Featured • {cameraCat.count}
                    </span>
                    <h3 className="bento-title">{cameraCat.name}</h3>
                    <p className="bento-desc mb-4">{cameraCat.desc}</p>
                    <div className="bento-action-link">
                      Explore Cinema Cameras <span>&rarr;</span>
                    </div>
                  </Col>
                  <Col sm={5} className="text-center mt-3 mt-sm-0">
                    <img
                      src={cameraCat.image}
                      alt={cameraCat.name}
                      style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </Col>
                </Row>
              </Link>
            </Col>

            {/* Featured Bento 2: Lenses (Wide Light Card) */}
            <Col lg={5} md={12}>
              <Link to={`/assets?category=${lensCat.query}`} className="bento-card bento-card-lens">
                <Row className="h-100 align-items-center">
                  <Col sm={7}>
                    <span className="badge bg-light text-secondary border px-3 py-1 rounded-pill small mb-3">
                      Optics • {lensCat.count}
                    </span>
                    <h3 className="bento-title">{lensCat.name}</h3>
                    <p className="bento-desc mb-4">{lensCat.desc}</p>
                    <div className="bento-action-link">
                      Explore Glass <span>&rarr;</span>
                    </div>
                  </Col>
                  <Col sm={5} className="text-center mt-3 mt-sm-0">
                    <img
                      src={lensCat.image}
                      alt={lensCat.name}
                      style={{ maxHeight: '130px', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </Col>
                </Row>
              </Link>
            </Col>

            {/* Row 2: 4 Compact Bento Cards */}
            {compactCats.map((cat) => (
              <Col key={cat.id} xs={6} md={3}>
                <Link to={`/assets?category=${cat.query}`} className="bento-card bento-card-compact">
                  <div className="bento-img-box">
                    <img src={cat.image} alt={cat.name} className="bento-img" />
                  </div>
                  <div className="bento-title">{cat.name}</div>
                  <span className="bento-unit-pill">{cat.count}</span>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 4. Section 4: How It Works — Connected Step Roadmap (Linear Flow) */}
      <section className="framelease-roadmap-section" id="how-it-works">
        <Container>
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }}>
            <div className="framelease-section-badge">
              ✦ 3 SIMPLE STEPS
            </div>
            <h2 className="framelease-section-title">How Rental Works</h2>
            <p className="framelease-section-sub mx-auto">
              Fast, reliable equipment booking built specifically for creators and filmmakers.
            </p>
          </div>

          <Row className="g-4">
            {howItWorksSteps.map((stepItem) => (
              <Col key={stepItem.step} md={4}>
                <div className="roadmap-card">
                  <div className="roadmap-step-badge">
                    {stepItem.step}
                  </div>
                  <h4 className="roadmap-title">{stepItem.title}</h4>
                  <p className="roadmap-desc">{stepItem.desc}</p>
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <Link to="/assets" className="btn-purple-pill py-2 px-5 text-white text-decoration-none">
              Start Your Reservation ➔
            </Link>
          </div>
        </Container>
      </section>

      {/* 5. Section 5: Full-Bleed Cinema Dark Showcase */}
      <section className="framelease-cinema-section" id="studio-banner">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6} md={12}>
              <div className="framelease-section-badge framelease-section-badge-dark mb-3">
                ✦ PRODUCTION READY GEAR
              </div>
              <h2 className="cinema-title">
                Your Vision,<br />Our Equipment
              </h2>
              <p className="cinema-desc">
                From indie filmmakers to full production teams, we supply broadcast-ready cinema camera packages, anamorphic lenses, and studio lighting.
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
          </Row>
        </Container>
      </section>

      {/* 6. Section 6: Recently Added Equipment (Modern Catalog Cards) */}
      <section className="framelease-catalog-section" id="recently-added">
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
              <Col key={item.id} xs={12} sm={6} lg={3}>
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

      {/* 7. Section 7: Studio Hub & Impact Stats (Asymmetrical Split Layout) */}
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
