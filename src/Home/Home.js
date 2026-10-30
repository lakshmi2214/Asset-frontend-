import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'cameras',
    name: 'Cameras',
    query: 'camera',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_1.png',
  },
  {
    id: 'lenses',
    name: 'Lenses',
    query: 'lenses',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_2.png',
  },
  {
    id: 'lighting',
    name: 'Lighting',
    query: 'lighting',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_3.png',
  },
  {
    id: 'audio',
    name: 'Audio',
    query: 'audio',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_4.png',
  },
  {
    id: 'tripods',
    name: 'Tripods',
    query: 'tripods',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_5.png',
  },
  {
    id: 'studio-setup',
    name: 'Studio Setup',
    query: 'studio',
    image: process.env.PUBLIC_URL + '/assets/images/cat_icon_6.png',
  },
];

const recentlyAdded = [
  {
    id: 'canon-r5',
    title: 'Canon R5 Camera',
    image: process.env.PUBLIC_URL + '/assets/images/item_img_1.png',
  },
  {
    id: 'aputure-300d',
    title: 'Aputure 300D II',
    image: process.env.PUBLIC_URL + '/assets/images/item_img_2.png',
  },
  {
    id: 'rode-ntg5',
    title: 'Rode NTG5 Mic',
    image: process.env.PUBLIC_URL + '/assets/images/item_img_3.png',
  },
  {
    id: 'manfrotto-tripod',
    title: 'Manfrotto Tripod',
    image: process.env.PUBLIC_URL + '/assets/images/item_img_4.png',
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
      {/* Hero Section */}
      <section className="framelease-hero-wrap">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6} md={12}>
              <div className="framelease-hero-tag">
                CAMERA &amp; STUDIO EQUIPMENT RENTAL
              </div>
              <h1 className="framelease-hero-title">
                Create More,<br />Rent Better
              </h1>
              <p className="framelease-hero-desc">
                Professional camera gear, lenses, lighting, audio and studio setups – available for your next shoot.
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
                  placeholder="Search for equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="framelease-search-input"
                />
                <button type="submit" className="framelease-search-btn">
                  Search
                </button>
              </form>
            </Col>

            <Col lg={6} md={12} className="text-center">
              <div className="framelease-hero-img-box">
                <img
                  src={process.env.PUBLIC_URL + '/assets/images/mockup_hero_camera.png'}
                  alt="Camera & Studio Rig on Tripod"
                  className="framelease-hero-img"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Feature / Value Propositions Strip */}
      <section className="framelease-features-wrap">
        <Container>
          <Row className="g-4 align-items-center justify-content-between">
            <Col xs={6} md={3}>
              <div className="framelease-feature-item">
                <div className="framelease-feature-icon">
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
                <div className="framelease-feature-icon">
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
                <div className="framelease-feature-icon">
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
                <div className="framelease-feature-icon">
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
        </Container>
      </section>

      {/* Shop by Category */}
      <section className="py-5" id="categories">
        <Container>
          <div className="framelease-section-header">
            <h2 className="framelease-section-title">Shop by Category</h2>
            <Link to="/assets" className="framelease-view-all">
              View All <span>&rarr;</span>
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
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Your Vision Our Equipment Promo Banner */}
      <section className="pb-5 pt-2">
        <Container>
          <div className="framelease-promo-card">
            <Row className="g-0 align-items-stretch">
              <Col md={6} lg={6}>
                <div className="framelease-promo-content">
                  <h2 className="framelease-promo-title">
                    Your Vision<br />Our Equipment
                  </h2>
                  <p className="framelease-promo-desc">
                    From indie creators to professional productions, we&apos;ve got the gear you need.
                  </p>
                  <div>
                    <Link to="/assets" className="framelease-promo-btn">
                      Browse Equipment <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={6}>
                <img
                  src={process.env.PUBLIC_URL + '/assets/images/banner_studio.png'}
                  alt="Photography studio with lights and cyclorama"
                  className="framelease-promo-img"
                />
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Recently Added Section */}
      <section className="pb-5 pt-3" id="recently-added">
        <Container>
          <div className="framelease-section-header">
            <h2 className="framelease-section-title">Recently Added</h2>
            <Link to="/assets" className="framelease-view-all">
              View All <span>&rarr;</span>
            </Link>
          </div>

          <Row className="g-4">
            {recentlyAdded.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={3}>
                <Link to="/assets" className="framelease-product-card text-center">
                  <div className="framelease-product-img-box">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="framelease-product-img"
                    />
                  </div>
                  <div className="framelease-product-title mb-0">{item.title}</div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}
