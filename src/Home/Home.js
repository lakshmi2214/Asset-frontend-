import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { OLD_DATABASE_ASSETS } from '../oldDatabaseAssets';

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

const recentAssets = OLD_DATABASE_ASSETS.slice(-4);

function categoryLabel(asset) {
  return asset?.category?.name || 'Equipment';
}

function formatRate(asset) {
  const qty = asset.total_quantity ?? 1;
  if (qty >= 5) return '₹500 / day';
  if (qty >= 3) return '₹800 / day';
  return '₹1,500 / day';
}

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

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
                    <div className="ak-product-rate">{formatRate(asset)}</div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="ak-section ak-bg-offwhite" id="how-it-works">
        <Container>
          <div className="text-center mb-5">
            <p className="ak-hero-eyebrow">SIMPLE 3-STEP RENTAL</p>
            <h2 className="ak-section-title" style={{ fontSize: '2.35rem' }}>
              How Renting Works
            </h2>
            <p className="ak-hero-subtext mx-auto" style={{ maxWidth: '580px', marginTop: '0.65rem' }}>
              Professional filmmaking equipment made accessible, fully verified, and ready for your production schedule.
            </p>
          </div>

          <Row className="g-4">
            <Col lg={4} md={6}>
              <div className="ak-step-card">
                <div className="ak-step-header">
                  <span className="ak-step-num">01</span>
                  <div className="ak-step-icon">🎥</div>
                </div>
                <h3 className="ak-step-title">Choose Your Gear</h3>
                <p className="ak-step-desc">
                  Browse verified cinema cameras, prime lenses, lighting kits, and audio setups. Select your shoot dates with transparent daily or multi-day rates.
                </p>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="ak-step-card">
                <div className="ak-step-header">
                  <span className="ak-step-num">02</span>
                  <div className="ak-step-icon">🛡️</div>
                </div>
                <h3 className="ak-step-title">Prep &amp; Calibration</h3>
                <p className="ak-step-desc">
                  Our certified technicians clean sensors, check optical alignment, format media, and charge batteries—packed securely in flight-ready Pelican cases.
                </p>
              </div>
            </Col>

            <Col lg={4} md={12}>
              <div className="ak-step-card">
                <div className="ak-step-header">
                  <span className="ak-step-num">03</span>
                  <div className="ak-step-icon">🚀</div>
                </div>
                <h3 className="ak-step-title">Shoot &amp; Return</h3>
                <p className="ak-step-desc">
                  Pick up at our studio hub or request on-set courier delivery. Roll camera with 24/7 technical support, and return hassle-free when wrap is called.
                </p>
              </div>
            </Col>
          </Row>

          <div className="ak-cta-banner mt-5">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 p-4 p-md-5">
              <div>
                <h3 className="ak-cta-heading mb-1">Need a custom production package?</h3>
                <p className="ak-cta-sub mb-0">Speak with our gear specialists or reserve your kit online today.</p>
              </div>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/assets" className="ak-browse-btn">
                  Explore Equipments →
                </Link>
                <Link to="/about" className="ak-secondary-cta-btn">
                  About Our Studio
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
