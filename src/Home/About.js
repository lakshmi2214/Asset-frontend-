import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaVideo,
  FaShieldAlt,
  FaTools,
  FaWarehouse,
  FaCalendarAlt,
  FaArrowRight
} from 'react-icons/fa';

const studioPillars = [
  {
    icon: FaShieldAlt,
    title: 'Bench-Tested & Cleaned',
    desc: 'Every camera sensor, optic element, and cable undergoes a rigorous bench test and optical cleaning before each checkout.'
  },
  {
    icon: FaTools,
    title: 'Free Camera Prep Bays',
    desc: 'Our Malleshwaram hub features dedicated, air-conditioned prep bays equipped with test charts, power stations, and balance tables.'
  },
  {
    icon: FaWarehouse,
    title: 'Soundstage Facilities',
    desc: 'A 2,500 sq.ft acoustically treated studio featuring an 18ft pre-rigged lighting grid, 3-wall cyclorama, and green room.'
  }
];

const studioHighlights = [
  { number: '350+', label: 'Equipment Assets' },
  { number: '100%', label: 'Sensor Inspected' },
  { number: '3 Bays', label: 'Camera Prep Stations' },
  { number: '24 / 7', label: 'On-Call Tech Support' },
];

export default function About() {
  return (
    <div className="studio-page-container">

      <section className="studio-hero-section">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={7} md={12}>
              <div className="studio-eyebrow">
                <span className="studio-eyebrow-dot" />
                <span>ABOUT ASLIKAHANI STUDIO</span>
              </div>

              <h1 className="studio-hero-heading">
                Quality Equipment for Every Production.
              </h1>

              <p className="studio-hero-description">
                Based in Malleshwaram, Bengaluru, AsliKahani Studio provides filmmakers, commercial directors,
                and content creators with industry-standard cinema cameras, master prime lenses, continuous lighting,
                and dedicated studio facilities.
              </p>

              <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
                <Link to="/assets" className="studio-btn-primary">
                  <span>Browse Equipment</span>
                  <FaArrowRight size={12} />
                </Link>
                <Link to="/contact" className="studio-btn-secondary">
                  <span>Contact Our Team</span>
                </Link>
              </div>
            </Col>

            <Col lg={5} md={12}>
              <div className="studio-about-stats-card">
                <Row className="g-3">
                  {studioHighlights.map((stat, i) => (
                    <Col key={i} xs={6}>
                      <div className="studio-stat-item">
                        <div className="studio-stat-num">{stat.number}</div>
                        <div className="studio-stat-label">{stat.label}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="studio-section studio-bg-white">
        <Container>
          <div className="text-center mb-5">
            <span className="studio-section-eyebrow">OUR COMMITMENT</span>
            <h2 className="studio-section-title">Built for Working Filmmakers</h2>
            <p className="studio-section-subtitle mx-auto" style={{ maxWidth: '620px' }}>
              We know that every minute on set matters. Our focus is ensuring your equipment arrives
              production-ready, perfectly organized in custom flight cases with zero surprises.
            </p>
          </div>

          <Row className="g-4">
            {studioPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <Col key={idx} lg={4} md={6} xs={12}>
                  <div className="studio-pillar-card">
                    <div className="studio-pillar-icon-wrap">
                      <IconComp size={20} />
                    </div>
                    <h3 className="studio-pillar-title">{pillar.title}</h3>
                    <p className="studio-pillar-desc">{pillar.desc}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      <section className="studio-section studio-bg-light border-top border-bottom">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={6} md={12}>
              <div className="studio-about-img-box">
                <img
                  src={process.env.PUBLIC_URL + '/assets/images/banner_studio.png'}
                  alt="AsliKahani Studio Soundstage"
                  className="studio-about-img"
                  onError={(e) => {
                    e.target.src = process.env.PUBLIC_URL + '/assets/images/mockup_hero_camera.png';
                  }}
                />
                <div className="studio-about-img-caption">
                  Malleshwaram Studio Hub &amp; Prep Bay
                </div>
              </div>
            </Col>

            <Col lg={6} md={12}>
              <span className="studio-section-eyebrow">OUR STORY</span>
              <h2 className="studio-section-title mb-3">
                Born in Malleshwaram, Built for Production
              </h2>
              <p className="studio-body-lead">
                AsliKahani started as a creative collective of storytellers and filmmakers in Bengaluru.
                Early on, we faced the common industry challenge: finding dependable, well-maintained equipment
                on transparent rental terms was unnecessarily difficult.
              </p>
              <p className="studio-body-text">
                We built our studio hub to solve this. Today, we offer an expansive inventory of cinema cameras
                (Sony FX, RED, Blackmagic), precision lenses, and continuous lighting, alongside a full 2,500 sq.ft
                soundstage with a 3-wall cyclorama.
              </p>
              <p className="studio-body-text mb-4">
                Whether you are shooting a national commercial, or an interview podcast, our
                technical team is here to ensure your gear is prepped, tested, and ready to roll.
              </p>

              <div className="d-flex align-items-center gap-3">
                <Link to="/contact" className="studio-btn-primary">
                  <span>Visit Our Studio</span>
                  <FaArrowRight size={12} />
                </Link>
                <Link to="/assets" className="studio-link-arrow">
                  <span>Explore Equipment List</span>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
s
      <section className="studio-section studio-bg-white">
        <Container>
          <div className="studio-about-cta-box text-center">
            <span className="studio-section-eyebrow">GET IN TOUCH</span>
            <h2 className="studio-section-title mb-2">Ready to Plan Your Next Shoot?</h2>
            <p className="studio-section-subtitle mx-auto mb-4" style={{ maxWidth: '560px' }}>
              Drop by our Malleshwaram studio to prep your gear, test cameras, or tour Soundstage A.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/assets" className="studio-btn-primary">
                <span>View Rental Equipment</span>
                <FaArrowRight size={12} />
              </Link>
              <Link to="/contact" className="studio-btn-secondary">
                <span>Contact &amp; Studio Directions</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}


