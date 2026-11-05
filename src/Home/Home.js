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
    name: 'Main Infinity Cyclorama Stage',
    badge: 'Soundstage A • 850 Sq.Ft',
    specs: '35ft × 25ft • 16ft Motorized Grid • 63A 3-Phase Power',
    desc: 'Full 3-wall seamless white cyclorama soundstage with acoustic baffling, dedicated green room, hair & makeup vanity station, and roll-up equipment load-in bay.',
    image: process.env.PUBLIC_URL + '/assets/images/banner_studio.png',
    link: '/book-asset?category=studio',
  },
  {
    id: 'studio-blackbox',
    name: 'Blackout Commercial Insert Stage',
    badge: 'Stage B • 450 Sq.Ft',
    specs: '22ft × 18ft • Blackout Curtains • 12ft Ceiling',
    desc: 'Acoustic black box stage ideal for high-end product photography, commercial inserts, music videos, and fashion shoots with pre-rigged ceiling pantographs.',
    image: process.env.PUBLIC_URL + '/assets/images/mockup_banner.png',
    link: '/book-asset?category=studio',
  },
  {
    id: 'studio-podcast',
    name: 'Broadcast Podcast & Livestream Suite',
    badge: 'Studio C • Acoustic Suite',
    specs: 'Soundproof Booth • 4 Shure / AT2040 Mics • 4K Switcher',
    desc: 'Turnkey acoustic recording suite equipped with multi-cam 4K recording, teleprompter, Blackmagic live switcher, sound engineer, and livestream encoder.',
    image: process.env.PUBLIC_URL + '/assets/images/Camera_1.jpeg',
    link: '/book-asset?category=audio',
  },
];

const turnkeyPackages = [
  {
    id: 'run-and-gun-cine',
    title: 'Run-&-Gun Cinema Package',
    tag: 'Most Popular for Indie Shoots',
    specs: 'Everything needed for commercial & short film shoots in one flight case.',
    items: [
      'Sony FX3 Full-Frame Cinema Camera Body',
      'Sony 50mm High-Speed Prime Lens',
      '2x NP-FZ100 Batteries + Dual Bay Charger',
      '160GB Lexar Professional CFexpress Type A Card',
      'DJI Mic Mini Wireless Transmitter & Receiver Kit',
      'Rugged Pelican Waterproof Hard Case',
    ],
    link: '/book-asset?category=camera',
  },
  {
    id: 'studio-lighting-kit',
    title: 'Commercial Studio Lighting Rig',
    tag: 'Studio & Fashion Shoots',
    specs: 'High-output continuous illumination with full softbox diffusion.',
    items: [
      '2x Godox 300W Bi-Color High-CRI LED Heads',
      '2x 85cm Octagon Grid Softboxes & Diffusers',
      '2x Heavy-Duty Steel C-Stands with 40-inch Gobo Arms',
      'Wireless 2.4GHz Digital Lighting Remote',
      '4x 10kg Shot Sandbags & Power Extension Cables',
      'Padded Wheeled Heavy-Duty Transport Bag',
    ],
    link: '/book-asset?category=lighting',
  },
  {
    id: 'podcast-broadcast-kit',
    title: '4-Person Podcast Broadcast Kit',
    tag: 'Podcasts & Livestreams',
    specs: 'Broadcast-grade multi-host dialogue and livestream recording.',
    items: [
      '4x Audio-Technica AT2040 Hypercardioid Microphones',
      'Presonus 10-Channel Low-Noise Audio Mixer / Interface',
      '4x Heavy-Duty Cast-Iron Table Boom Arms',
      '4x Professional Studio Monitoring Headphones',
      '4x Shielded Balanced XLR Audio Cables',
      'Custom Protective Equipment Flight Case',
    ],
    link: '/book-asset?category=audio',
  },
];

const popularSearches = [
  { label: 'Cinema Cameras', query: 'camera' },
  { label: 'Sony Lenses', query: 'lens' },
  { label: 'Studio Lighting', query: 'lighting' },
  { label: 'Podcast Audio', query: 'audio' },
  { label: 'C-Stands & Grip', query: 'tripod' },
  { label: 'Soundstages', query: 'studio' },
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

      {/* 1. Hero Section: Studio & Equipment Production House */}
      <section className="framelease-hero-wrap">
        <Container>
          <div className="hero-centered-content">
            <div className="framelease-section-badge mb-3">
              ✦ BENGALURU&apos;S PREMIER FILM STUDIO &amp; EQUIPMENT RENTALS
            </div>
            <h1 className="framelease-hero-title">
              The Production Hub for<br />Filmmakers &amp; Creators
            </h1>
            <p className="framelease-hero-desc">
              Full-service soundstages with infinity cyclorama walls, 8K cinema cameras, master primes, and high-CRI lighting rigs – calibrated, tested, and ready for your shoot in Malleshwaram.
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
                placeholder="Search cinema cameras, lenses, lighting, soundstages..."
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
                  key={item.query}
                  to={`/assets?category=${item.query}`}
                  className="framelease-hero-chip"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Dual CTAs: Explore Equipments & Book Studio */}
            <div className="d-flex align-items-center justify-content-center gap-3 mt-4 flex-wrap">
              <Link to="/assets" className="btn btn-dark rounded-pill px-4 py-2 fw-semibold shadow-sm" style={{ fontSize: '0.92rem' }}>
                Explore Equipments ➔
              </Link>
              <Link to="/book-asset?category=studio" className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold" style={{ fontSize: '0.92rem' }}>
                Book Studio Soundstage ➔
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
              <span>100% Sensor-Cleaned &amp; Tested Pro Gear</span>
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

      {/* 3. Section: Production Studio Facilities (Dedicated Soundstage Showcase) */}
      <section className="studio-facilities-section" id="studio-spaces">
        <Container>
          <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-5">
            <div>
              <div className="framelease-section-badge mb-2">
                ✦ SOUNDSTAGES &amp; CREATIVE SPACES
              </div>
              <h2 className="framelease-section-title mb-2">
                Our Production Studio Facilities
              </h2>
              <p className="framelease-section-sub mb-0" style={{ maxWidth: '640px' }}>
                Fully acoustically isolated, air-conditioned studio stages engineered for high-end commercials, fashion films, music videos, and multi-cam video podcasts.
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
                      {facility.badge}
                    </div>
                  </div>

                  <div className="studio-facility-body">
                    <h3 className="studio-facility-title">{facility.name}</h3>
                    <div className="studio-facility-specs">{facility.specs}</div>
                    <p className="studio-facility-desc">{facility.desc}</p>

                    <div className="mt-auto pt-2">
                      <Link
                        to={facility.link}
                        className="btn btn-dark w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                        style={{ fontSize: '0.88rem' }}
                      >
                        <span>Reserve Studio Stage</span>
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

      {/* 4. Section: Equipment Rental Departments */}
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
                  Everything you need for full-scale commercial productions and independent cinema shoots.
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

      {/* 5. Section: Curated Production Turnkey Packages */}
      <section className="rental-packages-section" id="packages">
        <Container>
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '680px' }}>
            <div className="framelease-section-badge">
              ✦ TURNKEY RENTAL PACKAGES
            </div>
            <h2 className="framelease-section-title">
              Curated Production Packages
            </h2>
            <p className="framelease-section-sub mx-auto">
              Pre-configured, field-tested kits with matching accessories, power, and media cards packed in rugged Pelican hard flight cases.
            </p>
          </div>

          <Row className="g-4 align-items-stretch">
            {turnkeyPackages.map((pkg) => (
              <Col key={pkg.id} lg={4} md={6} xs={12}>
                <div className="package-card">
                  <span className="package-pill-tag">{pkg.tag}</span>
                  <h3 className="package-card-title">{pkg.title}</h3>
                  <p className="text-muted small mb-3">{pkg.specs}</p>

                  <div className="package-items-list">
                    {pkg.items.map((item, idx) => (
                      <div key={idx} className="package-item">
                        <span className="package-item-check">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-3 border-top">
                    <Link
                      to={pkg.link}
                      className="btn btn-dark w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                      style={{ fontSize: '0.88rem' }}
                    >
                      <span>Book Package</span>
                      <span>⚡</span>
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 6. Section: Full-Bleed Cinema Dark Showcase */}
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

      {/* 7. Section: Studio Hub & Impact Stats (About Aslikahani) */}
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
