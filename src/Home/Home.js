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
    desc: 'High-CRI LED panels, Godox 300W continuous lights & softboxes.',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_3.png',
  },
  {
    id: 'audio',
    name: 'Audio',
    query: 'audio',
    count: '10+ Units',
    desc: 'Broadcast shotgun, Shure mics & wireless DJI mic kits.',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_4.png',
  },
  {
    id: 'tripods',
    name: 'Tripods & Grip',
    query: 'tripod',
    count: '6+ Units',
    desc: 'Fluid video heads, heavy-duty C-stands & boom arms.',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_5.png',
  },
  {
    id: 'storage-power',
    name: 'Power & Storage',
    query: 'power',
    count: '15+ Units',
    desc: '160GB Lexar CFexpress cards, NP-FZ100 batteries & chargers.',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_6.png',
  },
];

const studioFacilities = [
  {
    id: 'studio-cyc',
    name: 'Main Infinity Cyclorama Soundstage',
    stageTag: 'Soundstage A • 850 Sq.Ft',
    rate: '₹12,000 / Half-Day • ₹20,000 / Full-Day',
    dimensions: '35ft × 25ft • 16ft Motorized Grid',
    power: '63A 3-Phase Camlock Heavy Power',
    highlights: ['Seamless 3-Wall Cyc', 'Drive-In Roll-Up Bay', 'Green Room & Vanity', 'Acoustic STC-55'],
    desc: 'Full 3-wall seamless white cyclorama soundstage with acoustic baffling, dedicated green room, hair & makeup vanity station, and direct roll-up vehicle/gear load-in access.',
    image: process.env.PUBLIC_URL + '/assets/images/banner_studio.png',
    link: '/book-asset?category=studio',
  },
  {
    id: 'studio-blackbox',
    name: 'Blackout Commercial Insert & Photo Stage',
    stageTag: 'Stage B • 450 Sq.Ft',
    rate: '₹8,000 / Half-Day • ₹14,000 / Full-Day',
    dimensions: '22ft × 18ft • 12ft Ceiling',
    power: '32A Dedicated Clean Circuit',
    highlights: ['Matte Blackout Drapes', 'Pre-Rigged Pantographs', 'Turntable Available', 'Silent Ducted AC'],
    desc: 'Acoustic black box stage engineered for high-contrast commercial inserts, luxury product cinematography, music videos, and editorial fashion photography.',
    image: process.env.PUBLIC_URL + '/assets/images/mockup_banner.png',
    link: '/book-asset?category=studio',
  },
  {
    id: 'studio-podcast',
    name: 'Broadcast Podcast & Livestream Suite',
    stageTag: 'Studio C • Broadcast Suite',
    rate: '₹4,500 / 2-Hr Session • ₹15,000 / Full-Day',
    dimensions: 'Acoustically Isolated Vocal Suite',
    power: '4K Multi-Cam Switcher + Sound Desk',
    highlights: ['4 Shure/AT Mics', '1Gbps Symmetrical Fiber', 'Teleprompter Ready', 'On-Site Sound Tech'],
    desc: 'Turnkey live broadcast and video podcast recording suite equipped with multi-cam 4K recording, teleprompter, Blackmagic live switcher, sound engineer, and livestream encoder.',
    image: process.env.PUBLIC_URL + '/assets/images/Camera_1.jpeg',
    link: '/book-asset?category=audio',
  },
];

const studioAmenities = [
  {
    icon: '⚡',
    title: '63A 3-Phase Camlock Power',
    subtitle: 'Heavy Industrial Distribution',
    desc: 'Dedicated high-amperage power drops for high-draw HMIs, Aputure 1200D/600C LEDs, and Skypanels without breaker trips.',
  },
  {
    icon: '🚛',
    title: 'Drive-In Load-In Bay',
    subtitle: 'Ground-Level Roll-Up Door',
    desc: '10ft ground-floor roll-up door allows lighting trucks and camera carts to roll gear directly onto the soundstage floor.',
  },
  {
    icon: '💄',
    title: 'Private Green Room & HMU Vanity',
    subtitle: 'Talent & Wardrobe Suite',
    desc: 'Dedicated dressing suite with illuminated Hollywood vanity mirrors, wardrobe steamers, garment racks, and private changing rooms.',
  },
  {
    icon: '🌐',
    title: '1 Gbps Broadcast Fiber Internet',
    subtitle: 'Symmetrical Enterprise Line',
    desc: 'Ultra-low latency dedicated line for multi-cam 4K livestreams, remote client director feeds, and high-speed cloud rushes backup.',
  },
  {
    icon: '🔇',
    title: 'Acoustic Isolation & Silent HVAC',
    subtitle: 'STC-55 Soundproofing',
    desc: 'Acoustically treated sound walls with whisper-quiet ducted inverter air conditioning so boom microphones capture clean audio on every take.',
  },
  {
    icon: '🛠️',
    title: 'In-House Camera & Rig Prep Bay',
    subtitle: 'Pre-Shoot Rig Assembly',
    desc: 'Dual prep tables equipped with Siemens star charts, lens collimators, and monitor calibrators to build and balance rigs before shooting.',
  },
  {
    icon: '☕',
    title: 'Client Lounge & Production Desk',
    subtitle: 'Air-Conditioned Comfort',
    desc: 'Comfortable client lounge with calibrated 65-inch 4K reference OLED display, high-speed WiFi, dedicated production desks, and espresso bar.',
  },
  {
    icon: '🅿️',
    title: 'Dedicated On-Site Crew Parking',
    subtitle: 'Secure Production Staging',
    desc: 'Safe on-premises parking bays for crew vans, camera trucks, and client vehicles right outside the studio entrance in Malleshwaram.',
  },
];

const productionWorkflowSteps = [
  {
    step: '01',
    title: 'Select Space & Cinema Gear',
    desc: 'Choose soundstage hours or browse our catalog of 8K cameras, prime lenses, and lighting rigs with instant real-time availability.',
  },
  {
    step: '02',
    title: 'Prep & Test at Malleshwaram Hub',
    desc: 'Use our dedicated camera prep bay to build your rig, test focus with optical charts, and verify battery and media health before roll time.',
  },
  {
    step: '03',
    title: 'Shoot, Create & Seamless Wrap',
    desc: 'Execute your production on stage or on location with peace of mind. Transparent day rates, zero hidden deposit fees, and flexible wrap times.',
  },
];

const popularSearches = [
  { label: 'Infinity Cyc Stage', query: 'studio' },
  { label: 'Cinema Cameras', query: 'camera' },
  { label: 'Sony Lenses', query: 'lens' },
  { label: 'Studio Lighting', query: 'lighting' },
  { label: 'Podcast Audio', query: 'audio' },
  { label: 'C-Stands & Grip', query: 'tripod' },
];

const impactStats = [
  { number: '500+', label: 'Verified Gear Units' },
  { number: '3', label: 'Soundstages & Prep Bays' },
  { number: '4.9★', label: 'Filmmaker Rating' },
  { number: '24/7', label: 'Technical Support' },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

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

      {/* 1. Hero Section: Modern Rental Studio & Production Platform */}
      <section className="framelease-hero-wrap">
        <Container>
          <div className="hero-centered-content">
            <div className="framelease-section-badge mb-3">
              ✦ BANGALORE&apos;S PREMIER PRODUCTION SOUNDSTAGES &amp; FILM GEAR
            </div>
            <h1 className="framelease-hero-title">
              World-Class Soundstages &amp;<br />Cinema Equipment on Demand
            </h1>
            <p className="framelease-hero-desc">
              Drive-in cyclorama stages, blackout commercial insert bays, 4K broadcast podcast suites, and cinema camera packages. Prepped, calibrated, and ready in Malleshwaram.
            </p>

            {/* Quick Category/Space Switcher Pills */}
            <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap mb-3">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold transition-all ${
                  activeTab === 'all'
                    ? 'btn-dark text-white'
                    : 'btn-outline-secondary border-0 bg-light text-dark'
                }`}
                style={{ fontSize: '0.82rem' }}
              >
                🏢 All Spaces &amp; Gear
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('stages'); navigate('/book-asset?category=studio'); }}
                className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold transition-all ${
                  activeTab === 'stages'
                    ? 'btn-dark text-white'
                    : 'btn-outline-secondary border-0 bg-light text-dark'
                }`}
                style={{ fontSize: '0.82rem' }}
              >
                📐 Soundstage A (Cyc)
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('blackout'); navigate('/book-asset?category=studio'); }}
                className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold transition-all ${
                  activeTab === 'blackout'
                    ? 'btn-dark text-white'
                    : 'btn-outline-secondary border-0 bg-light text-dark'
                }`}
                style={{ fontSize: '0.82rem' }}
              >
                🖤 Black Box Stage B
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('podcast'); navigate('/book-asset?category=audio'); }}
                className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold transition-all ${
                  activeTab === 'podcast'
                    ? 'btn-dark text-white'
                    : 'btn-outline-secondary border-0 bg-light text-dark'
                }`}
                style={{ fontSize: '0.82rem' }}
              >
                🎙️ Podcast Suite C
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('cameras'); navigate('/assets?category=camera'); }}
                className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold transition-all ${
                  activeTab === 'cameras'
                    ? 'btn-dark text-white'
                    : 'btn-outline-secondary border-0 bg-light text-dark'
                }`}
                style={{ fontSize: '0.82rem' }}
              >
                🎥 Cinema Cameras
              </button>
            </div>

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
                placeholder="Search cyclorama stages, cinema cameras, master primes, continuous lights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="framelease-search-input"
              />
              <button type="submit" className="framelease-search-btn">
                Search
              </button>
            </form>

            {/* Quick Filter Chips */}
            <div className="framelease-hero-chips">
              <span className="text-muted small fw-semibold me-1">Popular:</span>
              {popularSearches.map((item) => (
                <Link
                  key={item.label}
                  to={`/assets?category=${item.query}`}
                  className="framelease-hero-chip"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Dual CTAs: Explore Equipments & Book Studio */}
            <div className="d-flex align-items-center justify-content-center gap-3 mt-4 flex-wrap">
              <a href="#studio-spaces" className="btn btn-dark rounded-pill px-4 py-2 fw-semibold shadow-sm" style={{ fontSize: '0.92rem' }}>
                Explore Soundstages ➔
              </a>
              <Link to="/assets" className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold" style={{ fontSize: '0.92rem' }}>
                Browse Equipment Catalog ➔
              </Link>
            </div>
          </div>

          {/* Panoramic Gear & Studio Banner */}
          <div className="hero-panoramic-showcase">
            <img
              src={process.env.PUBLIC_URL + '/assets/images/mockup_hero_camera.png'}
              alt="Professional Cinema Rig"
              className="hero-panoramic-img"
            />
            <div className="hero-panoramic-badge-left">
              <span>⚡</span>
              <span>63A 3-Phase Camlock • Drive-In Roll-Up Access</span>
            </div>
            <div className="hero-panoramic-badge-right">
              <span>📍</span>
              <span>Malleshwaram Studio Hub • Bengaluru</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Solid Dark Navy Trust Ribbon */}
      <section className="framelease-trust-ribbon">
        <Container>
          <Row className="g-4 align-items-center justify-content-between">
            <Col xs={6} lg={3}>
              <div className="framelease-trust-ribbon-item">
                <div className="framelease-trust-ribbon-icon ribbon-icon-blue">
                  🛡️
                </div>
                <div>
                  <div className="framelease-trust-ribbon-title">100% Gear Insured</div>
                  <div className="framelease-trust-ribbon-sub">Full Production Coverage</div>
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
                  <div className="framelease-trust-ribbon-sub">Real-Time Availability</div>
                </div>
              </div>
            </Col>

            <Col xs={6} lg={3}>
              <div className="framelease-trust-ribbon-item">
                <div className="framelease-trust-ribbon-icon ribbon-icon-purple">
                  🎬
                </div>
                <div>
                  <div className="framelease-trust-ribbon-title">3 Soundstages</div>
                  <div className="framelease-trust-ribbon-sub">White Cyc &amp; Podcast Bays</div>
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
                  <div className="framelease-trust-ribbon-sub">Test in Prep Bay Before Pickup</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 3. Section: Production Studio Facilities (Modern Soundstages Showcase) */}
      <section className="studio-facilities-section" id="studio-spaces">
        <Container>
          <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-5">
            <div>
              <div className="framelease-section-badge mb-2">
                ✦ PRODUCTION SOUNDSTAGES &amp; CREATIVE SPACES
              </div>
              <h2 className="framelease-section-title mb-2">
                Studio Spaces Built for Scale
              </h2>
              <p className="framelease-section-sub mb-0" style={{ maxWidth: '640px' }}>
                Acoustically isolated stages, heavy 3-phase power, high ceiling grids, and drive-in access for commercials, fashion, and broadcast productions.
              </p>
            </div>
            <Link to="/book-asset?category=studio" className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold small">
              Check Studio Calendar ➔
            </Link>
          </div>

          <Row className="g-4 align-items-stretch">
            {studioFacilities.map((facility) => (
              <Col key={facility.id} lg={4} md={6} xs={12}>
                <div className="studio-facility-card">
                  <div className="studio-facility-img-wrap">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="studio-facility-img"
                    />
                    <div className="studio-facility-badge">
                      {facility.stageTag}
                    </div>
                  </div>

                  <div className="studio-facility-body">
                    <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                      <span className="badge bg-light text-primary fw-bold px-2 py-1 rounded-pill" style={{ fontSize: '0.75rem', border: '1px solid #bfdbfe' }}>
                        {facility.rate}
                      </span>
                    </div>

                    <h3 className="studio-facility-title">{facility.name}</h3>

                    {/* Architectural Specs List */}
                    <div className="mb-3 p-2 rounded-3 bg-light" style={{ fontSize: '0.8rem' }}>
                      <div className="text-secondary mb-1">
                        <strong className="text-dark">Dimensions:</strong> {facility.dimensions}
                      </div>
                      <div className="text-secondary">
                        <strong className="text-dark">Power:</strong> {facility.power}
                      </div>
                    </div>

                    <p className="studio-facility-desc">{facility.desc}</p>

                    {/* Feature Pill Tags */}
                    <div className="d-flex flex-wrap gap-1 mb-4">
                      {facility.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="badge bg-white text-secondary fw-semibold border px-2 py-1"
                          style={{ fontSize: '0.72rem' }}
                        >
                          ✓ {h}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-2">
                      <Link
                        to={facility.link}
                        className="btn btn-dark w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                        style={{ fontSize: '0.88rem' }}
                      >
                        <span>Reserve Stage</span>
                        <span>➔</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 4. Section: Studio Amenities & Production Inclusions (Modern Studio Infrastructure Grid) */}
      <section className="studio-amenities-section" id="amenities">
        <Container>
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
            <div className="framelease-section-badge">
              ✦ INFRASTRUCTURE &amp; AMENITIES
            </div>
            <h2 className="framelease-section-title">
              Everything Your Production Needs Under One Roof
            </h2>
            <p className="framelease-section-sub mx-auto">
              Engineered specifically for film directors, commercial DP crews, photographers, and agency producers to shoot comfortably and efficiently.
            </p>
          </div>

          <Row className="g-4">
            {studioAmenities.map((amenity, index) => (
              <Col key={index} lg={3} md={6} xs={12}>
                <div className="studio-amenity-card">
                  <div className="studio-amenity-icon-box">
                    <span>{amenity.icon}</span>
                  </div>
                  <h3 className="studio-amenity-title">{amenity.title}</h3>
                  <div className="studio-amenity-sub">{amenity.subtitle}</div>
                  <p className="studio-amenity-desc">{amenity.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 5. Section: Equipment Rental Departments */}
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
                  Full-scale commercial cinema equipment, master prime optics, high-output lighting, and broadcast audio.
                </p>

                <div className="cat-info-card">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="text-primary fw-bold">✓</span>
                    <span className="small fw-semibold text-dark">Calibrated and tested camera sensors</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="text-primary fw-bold">✓</span>
                    <span className="small fw-semibold text-dark">Batteries and memory cards formatted</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="text-primary fw-bold">✓</span>
                    <span className="small fw-semibold text-dark">Rigid waterproof Pelican flight cases</span>
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

      {/* 6. Section: Production Workflow (How Studio & Gear Rentals Work) */}
      <section className="studio-workflow-section" id="how-it-works">
        <Container>
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '680px' }}>
            <div className="framelease-section-badge">
              ✦ SIMPLE 3-STEP PROCESS
            </div>
            <h2 className="framelease-section-title">
              How Studio &amp; Gear Rental Works
            </h2>
            <p className="framelease-section-sub mx-auto">
              From online booking to camera prep and wrap, our workflow is designed for maximum production efficiency.
            </p>
          </div>

          <Row className="g-4">
            {productionWorkflowSteps.map((stepItem, idx) => (
              <Col key={idx} lg={4} md={12}>
                <div className="studio-workflow-card">
                  <div className="studio-workflow-step-num">{stepItem.step}</div>
                  <h3 className="studio-workflow-title">{stepItem.title}</h3>
                  <p className="studio-workflow-desc">{stepItem.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 7. Section: Full-Bleed Cinema Dark Showcase */}
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
                ✦ PRODUCTION-READY INFRASTRUCTURE
              </div>
              <h2 className="cinema-title">
                Your Vision,<br />Our Studio &amp; Gear
              </h2>
              <p className="cinema-desc">
                From independent filmmakers to high-tier commercial crews, we provide soundstages, cinema camera packages, anamorphic lenses, and studio lighting without friction.
              </p>

              <div className="cinema-features-list">
                <div className="cinema-feature-item">
                  <span className="cinema-check-badge">✓</span>
                  <span>Sensor-cleaned bodies and battery-charged packs before pickup</span>
                </div>
                <div className="cinema-feature-item">
                  <span className="cinema-check-badge">✓</span>
                  <span>Protective Pelican hard flight cases with extra cables and media</span>
                </div>
                <div className="cinema-feature-item">
                  <span className="cinema-check-badge">✓</span>
                  <span>Dedicated Malleshwaram prep bay to build and test before shoot day</span>
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

      {/* 8. Section: Studio Hub & Impact Stats (About Aslikahani) */}
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
                  We provide independent creators, commercial crews, and film students with frictionless access to professional production equipment and soundstages.
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
