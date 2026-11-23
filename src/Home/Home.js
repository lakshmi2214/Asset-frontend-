import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { PROD_BACKEND } from '../auth';
import {
  FaArrowRight,
  FaSearch,
  FaVideo,
  FaCamera,
  FaLightbulb,
  FaMicrophone,
  FaCheck,
  FaShieldAlt,
  FaCalendarAlt,
  FaClock
} from 'react-icons/fa';

const featuredCategories = [
  {
    id: 'camera',
    title: 'Cinema Cameras',
    desc: 'Sony FX, RED, ARRI, Blackmagic 6K',
    image: '/assets/images/mockup_hero_camera.png',
    icon: FaVideo,
    query: 'camera'
  },
  {
    id: 'lens',
    title: 'Lenses & Optics',
    desc: 'Sony G Master, Cine Primes, Anamorphic',
    image: '/assets/images/Camera_1.jpeg',
    icon: FaCamera,
    query: 'lens'
  },
  {
    id: 'lighting',
    title: 'Studio Lighting',
    desc: 'Aputure COBs, Softboxes, RGB tubes, Grip',
    image: '/assets/images/mockup_item_1.png',
    icon: FaLightbulb,
    query: 'lighting'
  },
  {
    id: 'audio',
    title: 'Sound & Audio',
    desc: 'Shotguns, 32-bit field recorders, Lavs',
    image: '/assets/images/mockup_item_3.png',
    icon: FaMicrophone,
    query: 'audio'
  }
];

const featuredProducts = [
  {
    id: 101,
    name: 'Sony FX3 Full-Frame Cinema Camera',
    category: 'Cinema Camera',
    specs: '4K 120p • 15+ Stops Dynamic Range • S-Cinetone',
    rate: '₹2,200',
    unit: '/ day',
    image: '/assets/images/mockup_hero_camera.png',
    tag: 'Popular'
  },
  {
    id: 102,
    name: 'Sony FE 24-70mm f/2.8 GM II Lens',
    category: 'Cine Optics',
    specs: 'Constant f/2.8 • Dual XD Linear Motors • Nano AR II',
    rate: '₹950',
    unit: '/ day',
    image: '/assets/images/Camera_1.jpeg',
    tag: 'Sharp Optics'
  },
  {
    id: 103,
    name: 'Aputure LS 600d Pro Daylight LED',
    category: 'Studio Lighting',
    specs: '600W COB • CRI 96+ • Weatherproof IP54',
    rate: '₹1,500',
    unit: '/ day',
    image: '/assets/images/mockup_item_1.png',
    tag: 'High Output'
  },
  {
    id: 105,
    name: 'DJI RS 3 Pro Gimbal Stabilizer',
    category: 'Grip & Motion',
    specs: '4.5kg Payload • Carbon Fiber Arms • Automated Locks',
    rate: '₹1,100',
    unit: '/ day',
    image: '/assets/images/Tripod_0840.jpg',
    tag: 'Stabilization'
  }
];

const simpleSteps = [
  {
    number: '01',
    title: 'Browse & Reserve',
    desc: 'Select your equipment and pick your shoot dates with transparent daily rates.'
  },
  {
    number: '02',
    title: 'Test in Prep Bays',
    desc: 'Check out and balance your rig in our dedicated, air-conditioned camera prep bays.'
  },
  {
    number: '03',
    title: 'Shoot & Return',
    desc: 'Produce with 24/7 on-call tech assistance. Seamless return with rapid deposit release.'
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [apiGear, setApiGear] = useState([]);

  useEffect(() => {
    fetch(`${PROD_BACKEND}/api/v1/assets/`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setApiGear(data.slice(0, 4));
        }
      })
      .catch(() => {
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/assets?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/assets');
    }
  };

  const displayProducts = React.useMemo(() => {
    if (apiGear.length >= 4) {
      return apiGear.map((item, idx) => ({
        id: item.id || (101 + idx),
        name: item.name || 'Studio Gear',
        category: item.category?.name || 'Equipment',
        specs: item.description || 'Pre-calibrated and bench-tested',
        rate: item.rental_price ? `₹${item.rental_price}` : (item.price ? `₹${item.price}` : '₹1,200'),
        unit: '/ day',
        image: item.image_url || item.image || featuredProducts[idx % featuredProducts.length].image,
        tag: 'Available'
      }));
    }
    return featuredProducts;
  }, [apiGear]);

  return (
    <div className="studio-page-container">

      <section className="studio-hero-section">
        <Container>
          <Row className="align-items-center gy-5">

            <Col lg={6} md={12} className="studio-hero-content">
              <div className="studio-eyebrow">
                <span className="studio-eyebrow-dot" />
                <span>STUDIO &amp; PRODUCTION EQUIPMENT RENTALS</span>
              </div>

              <h1 className="studio-hero-heading">
                Premium Gear for Your Next Production.
              </h1>

              <p className="studio-hero-description">
                Rent cinema cameras, master prime lenses, continuous lighting, and audio equipment in Bangalore.
                Every piece is bench-tested, sensor-cleaned, and ready to shoot.
              </p>

              <div className="studio-hero-action-box">
                <form onSubmit={handleSearch} className="studio-search-bar">
                  <FaSearch className="studio-search-icon" />
                  <input
                    type="text"
                    className="studio-search-input"
                    placeholder="Search camera, lens, lighting..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="studio-search-submit-btn">
                    Search
                  </button>
                </form>

                <div className="d-flex align-items-center gap-3 mt-3 flex-wrap">
                  <Link to="/assets" className="studio-btn-primary">
                    <span>Explore Equipment</span>
                    <FaArrowRight size={12} />
                  </Link>

                  <Link to="/about" className="studio-btn-secondary">
                    <span>Studio Facilities</span>
                  </Link>
                </div>
              </div>

              <div className="studio-trust-row mt-4 pt-3">
                <div className="studio-trust-item">
                  <FaShieldAlt className="text-primary me-2" size={13} />
                  <span>100% Bench-Tested</span>
                </div>
                <div className="studio-trust-divider" />
                <div className="studio-trust-item">
                  <FaCalendarAlt className="text-primary me-2" size={13} />
                  <span>Weekend 1-Day Rate</span>
                </div>
                <div className="studio-trust-divider" />
                <div className="studio-trust-item">
                  <FaClock className="text-primary me-2" size={13} />
                  <span>Free Prep Bay Access</span>
                </div>
              </div>
            </Col>

            <Col lg={6} md={12} className="d-none d-md-block">
              <div className="studio-hero-card">
                <div className="studio-hero-img-wrap">
                  <img
                    src={process.env.PUBLIC_URL + '/assets/images/mockup_hero_camera.png'}
                    alt="Professional Studio Cinema Rig"
                    className="studio-hero-img"
                    onError={(e) => {
                      e.target.src = process.env.PUBLIC_URL + '/assets/images/Camera_1.jpeg';
                    }}
                  />
                </div>
                <div className="studio-hero-card-meta">
                  <div>
                    <div className="studio-meta-title">Sony FX Cinema Setup</div>
                    <div className="studio-meta-sub">Calibrated &amp; Ready for Checkout</div>
                  </div>
                  <Link to="/assets?category=camera" className="studio-meta-link">
                    <span>View System</span>
                    <FaArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </Col>

          </Row>
        </Container>
      </section>

      <section className="studio-section studio-bg-light">
        <Container>
          <div className="d-flex align-items-end justify-content-between mb-4 flex-wrap gap-2">
            <div>
              <span className="studio-section-eyebrow">DEPARTMENTS</span>
              <h2 className="studio-section-title mb-1">Equipment Categories</h2>
              <p className="studio-section-subtitle mb-0">Browse curated production departments for your shoot.</p>
            </div>
            <Link to="/assets" className="studio-link-arrow">
              <span>All Equipment</span>
              <FaArrowRight size={12} />
            </Link>
          </div>

          <Row className="g-4">
            {featuredCategories.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <Col key={cat.id} lg={3} sm={6} xs={12}>
                  <Link to={`/assets?category=${cat.query}`} className="studio-category-card">
                    <div className="studio-category-img-box">
                      <img
                        src={process.env.PUBLIC_URL + cat.image}
                        alt={cat.title}
                        className="studio-category-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="studio-category-icon-pill">
                        <IconComponent size={14} />
                      </div>
                    </div>
                    <div className="studio-category-info">
                      <h3 className="studio-category-name">{cat.title}</h3>
                      <p className="studio-category-desc">{cat.desc}</p>
                      <div className="studio-category-link">
                        <span>Browse Category</span>
                        <FaArrowRight size={11} />
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      <section className="studio-section studio-bg-white">
        <Container>
          <div className="d-flex align-items-end justify-content-between mb-4 flex-wrap gap-2">
            <div>
              <span className="studio-section-eyebrow">CURATED GEAR</span>
              <h2 className="studio-section-title mb-1">Featured Equipment</h2>
              <p className="studio-section-subtitle mb-0">Popular cinema and lighting setups bench-tested by our crew.</p>
            </div>
            <Link to="/assets" className="studio-link-arrow">
              <span>View All Equipment</span>
              <FaArrowRight size={12} />
            </Link>
          </div>

          <Row className="g-4">
            {displayProducts.map((prod) => (
              <Col key={prod.id} lg={3} sm={6} xs={12}>
                <div className="studio-product-card">
                  <div className="studio-product-tag-row">
                    <span className="studio-product-category">{prod.category}</span>
                    <span className="studio-product-tag">{prod.tag}</span>
                  </div>

                  <div className="studio-product-img-box">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="studio-product-img"
                      onError={(e) => {
                        e.target.src = process.env.PUBLIC_URL + '/assets/images/mockup_hero_camera.png';
                      }}
                    />
                  </div>

                  <div className="studio-product-details">
                    <h3 className="studio-product-name" title={prod.name}>{prod.name}</h3>
                    <p className="studio-product-specs">{prod.specs}</p>

                    <div className="studio-product-footer">
                      <span className="studio-product-status">
                        <span className="studio-avail-dot" />
                        Ready for Shoot
                      </span>

                      <Link
                        to={`/book-asset?assetId=${prod.id}`}
                        className="studio-btn-rent"
                      >
                        <span>Book Now</span>
                        <FaArrowRight size={10} className="ms-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <Link to="/assets" className="studio-btn-catalog">
              <span>Explore Entire Rental Catalog</span>
              <FaArrowRight size={12} />
            </Link>
          </div>
        </Container>
      </section>

      <section className="studio-section studio-bg-cream">
        <Container>
          <div className="studio-space-banner">
            <Row className="align-items-center gy-4">
              <Col lg={8} md={12}>
                <span className="studio-section-eyebrow text-secondary">STUDIO FACILITIES</span>
                <h2 className="studio-space-title">
                  Looking for a Dedicated Soundstage?
                </h2>
                <p className="studio-space-desc">
                  Rent our 2,500 sq.ft acoustically treated studio in Malleshwaram alongside your gear.
                  Includes a 3-wall seamless cyclorama, 18ft pre-rigged lighting grid, client green room,
                  and direct on-site equipment checkout.
                </p>
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <Link to="/about" className="studio-btn-primary">
                    <span>Explore Studio &amp; Rates</span>
                    <FaArrowRight size={12} />
                  </Link>
                  <Link to="/assets" className="studio-btn-outline-dark">
                    <span>Browse Equipment</span>
                  </Link>
                </div>
              </Col>

              <Col lg={4} md={12} className="d-none d-lg-block">
                <div className="studio-space-img-wrap">
                  <img
                    src={process.env.PUBLIC_URL + '/assets/images/banner_studio.png'}
                    alt="AsliKahani Soundstage A"
                    className="studio-space-img"
                    onError={(e) => {
                      e.target.src = process.env.PUBLIC_URL + '/assets/images/mockup_banner.png';
                    }}
                  />
                  <div className="studio-space-badge">
                    STAGE A • MALLIKHESHWARAM
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <section className="studio-section studio-bg-white border-top">
        <Container>
          <div className="text-center mb-5">
            <span className="studio-section-eyebrow">HOW IT WORKS</span>
            <h2 className="studio-section-title">Simple, Reliable Studio Rentals</h2>
            <p className="studio-section-subtitle mx-auto" style={{ maxWidth: '580px' }}>
              We keep the rental process straightforward so you and your team can focus on production.
            </p>
          </div>

          <Row className="g-4">
            {simpleSteps.map((step, idx) => (
              <Col key={idx} lg={4} md={4} sm={12}>
                <div className="studio-step-card">
                  <div className="studio-step-num">{step.number}</div>
                  <h3 className="studio-step-title">{step.title}</h3>
                  <p className="studio-step-desc">{step.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

    </div>
  );
}
