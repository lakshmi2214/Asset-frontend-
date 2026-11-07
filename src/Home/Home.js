import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { PROD_BACKEND } from '../auth';

const shopCategories = [
  { id: 'camera', label: 'Cameras', icon: '📷', query: 'camera' },
  { id: 'lens', label: 'Lenses', icon: '🔍', query: 'lenses' },
  { id: 'lighting', label: 'Lighting', icon: '💡', query: 'lighting' },
  { id: 'audio', label: 'Audio', icon: '🎙️', query: 'audio' },
  { id: 'tripod', label: 'Tripods', icon: '📐', query: 'tripod' },
  { id: 'storage', label: 'Studio Setup', icon: '🎬', query: 'storage' },
];

const trustPoints = [
  { icon: '⭐', title: 'Quality Gear', sub: 'from Top Brands' },
  { icon: '📅', title: 'Easy Online Booking', sub: '' },
  { icon: '🔄', title: 'Flexible Rental Plans', sub: '' },
  { icon: '🎧', title: 'Support When', sub: 'You Need It' },
];

function categoryLabel(asset) {
  return asset?.category?.name || 'Equipment';
}



export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentAssets, setRecentAssets] = useState([]);

  useEffect(() => {
    fetch(`${PROD_BACKEND}/api/v1/assets/`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRecentAssets(data.slice(-4));
        }
      })
      .catch(err => console.error("Error loading recent assets:", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(searchQuery.trim()
      ? `/assets?q=${encodeURIComponent(searchQuery.trim())}`
      : '/assets');
  };

  return (
    <div style={{ backgroundColor: '#ffffff', overflowX: 'hidden', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>

      <section className="ak-hero-section">
        <Container>
          <Row className="align-items-center min-vh-hero g-0">

            <Col lg={6} md={12} className="ak-hero-left">
              <p className="ak-hero-eyebrow">CAMERA &amp; STUDIO EQUIPMENT RENTAL</p>
              <h1 className="ak-hero-heading">
                Create More,<br />Rent Better
              </h1>
              <p className="ak-hero-subtext">
                Professional camera gear, lenses, lighting, audio and<br />
                studio setups — available for your next shoot.
              </p>

              <form onSubmit={handleSearch} className="ak-search-form">
                <span className="ak-search-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="ak-search-input"
                  placeholder="Search for equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </Col>

            <Col lg={6} md={12} className="ak-hero-right d-none d-lg-flex">
              <div className="ak-hero-img-wrap">
                <img
                  src={process.env.PUBLIC_URL + '/assets/images/mockup_hero_camera.png'}
                  alt="Cinema Camera Setup"
                  className="ak-hero-img"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="ak-trust-strip">
        <Container>
          <Row className="g-0 justify-content-around">
            {trustPoints.map((t, i) => (
              <Col key={i} xs={6} lg={3} className="ak-trust-item">
                <span className="ak-trust-icon">{t.icon}</span>
                <div>
                  <div className="ak-trust-title">{t.title}</div>
                  {t.sub && <div className="ak-trust-sub">{t.sub}</div>}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="ak-section ak-bg-white">
        <Container>
          <div className="ak-section-header">
            <h2 className="ak-section-title">Shop by Category</h2>
            <Link to="/assets" className="ak-view-all">View All →</Link>
          </div>

          <Row className="g-3">
            {shopCategories.map((cat) => (
              <Col key={cat.id} xs={4} md={2}>
                <Link to={`/assets?category=${cat.query}`} className="ak-cat-tile">
                  <div className="ak-cat-icon-box">{cat.icon}</div>
                  <span className="ak-cat-label">{cat.label}</span>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="ak-section ak-bg-offwhite">
        <Container>
          <div className="ak-vision-banner">

            <div className="ak-vision-left">
              <h2 className="ak-vision-heading">Your Vision<br />Our Equipment</h2>
              <p className="ak-vision-desc">
                From indie creators to professional productions,<br />
                we've got the gear you need.
              </p>
              <Link to="/assets" className="ak-browse-btn">Browse Equipment →</Link>
            </div>

            <div className="ak-vision-right">
              <img
                src={process.env.PUBLIC_URL + '/assets/images/banner_studio.png'}
                alt="Studio Setup"
                className="ak-vision-img"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="ak-section ak-bg-white">
        <Container>
          <div className="ak-section-header">
            <h2 className="ak-section-title">Recently Added</h2>
            <Link to="/assets" className="ak-view-all">View All →</Link>
          </div>

          <Row className="g-3">
            {recentAssets.map((asset) => (
              <Col key={asset.id} xs={6} md={3}>
                <Link to="/assets" className="ak-product-card">

                  <div className="ak-product-img-box">
                    {asset.image_url || asset.image ? (
                      <img
                        src={asset.image_url || asset.image}
                        alt={asset.name}
                        className="ak-product-img"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                      />
                    ) : null}
                    <div className="ak-product-placeholder" style={{ display: (asset.image_url || asset.image) ? 'none' : 'flex' }}>
                      📷
                    </div>
                  </div>

                  <div className="ak-product-info">
                    <div className="ak-product-name">{asset.name}</div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

    </div>
  );
}
