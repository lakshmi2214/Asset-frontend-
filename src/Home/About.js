import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: '📖',
    title: 'Real Stories',
    desc: 'We go beyond the headlines — uncovering ground-level truth that sparks empathy and drives real-world change.',
  },
  {
    icon: '🎙️',
    title: 'Independent Voice',
    desc: 'Free from corporate sponsorships and algorithm-driven noise. Our journalism is powered by people, not profit.',
  },
  {
    icon: '🌍',
    title: 'Community-First',
    desc: 'Amplifying unheard voices, grassroots struggles, and everyday changemakers across Bangalore and beyond.',
  },
  {
    icon: '📷',
    title: 'Multi-Medium',
    desc: 'From digital magazines and ground reports to documentaries, podcasts and studio production — we tell stories in every format.',
  },
];

const stats = [
  { number: '2018', label: 'Founded' },
  { number: '50+', label: 'Contributors' },
  { number: '500+', label: 'Stories Published' },
  { number: '1M+', label: 'Readers Reached' },
];

const whatWeDo = [
  { icon: '📰', label: 'Digital E-Magazine',   desc: 'Monthly magazine covering art, culture, business, tech, education & social issues.' },
  { icon: '🎬', label: 'Documentaries',         desc: 'Short-form documentary films on stories that mainstream media ignores.' },
  { icon: '🎧', label: 'Unmute Podcast',        desc: 'Our signature podcast series giving a mic to unheard voices across India.' },
  { icon: '📡', label: 'Ground Reports',        desc: 'On-ground journalism from the streets, villages, and communities of India.' },
  { icon: '🏢', label: 'Studio & Gear Rental',  desc: 'Professional camera gear, soundstages and equipment for creators in Bangalore.' },
  { icon: '🤝', label: 'Creator Community',     desc: 'A collective of journalists, filmmakers, photographers and storytellers.' },
];

export default function About() {
  return (
    <div style={{ backgroundColor: '#ffffff', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section className="about-hero-section">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <p className="about-eyebrow">ABOUT ASLIKAHANI</p>
              <h1 className="about-hero-heading">
                People-Powered<br />Stories That Matter
              </h1>
              <p className="about-hero-desc">
                AsliKahani is an independent digital media platform and monthly magazine rooted in
                responsible, grassroots storytelling. We exist to uncover the untold stories that
                spark empathy, truth, and real-world change — free from corporate noise.
              </p>
              <div className="d-flex gap-3 flex-wrap mt-4">
                <Link to="/assets" className="ak-browse-btn">
                  Explore Our Equipment →
                </Link>
                <a
                  href="https://aslikahani.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-secondary-btn"
                >
                  Visit AsliKahani.com ↗
                </a>
              </div>
            </Col>

            <Col lg={5}>
              {/* Stats card */}
              <div className="about-stats-card">
                {stats.map((s, i) => (
                  <div key={i} className="about-stat-item">
                    <div className="about-stat-num">{s.number}</div>
                    <div className="about-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── OUR STORY ── */}
      <section className="about-section about-bg-off">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div className="about-story-visual">
                <div className="about-story-quote-box">
                  <div className="about-quote-mark">"</div>
                  <p className="about-quote-text">
                    We are not just another media outlet. We are a movement driven by
                    citizens who care — storytellers who believe that every person's
                    truth deserves to be heard.
                  </p>
                  <div className="about-quote-author">— Team AsliKahani</div>
                </div>

                <div className="about-location-pill">
                  <span>📍</span>
                  <span>Malleshwaram, Bengaluru, India</span>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <p className="about-eyebrow">OUR STORY</p>
              <h2 className="about-section-heading">Born From the Streets of Bengaluru</h2>
              <p className="about-body-text">
                AsliKahani — which literally translates to <em>"Real Story"</em> in Hindi — was born
                in the lanes of Malleshwaram, Bengaluru. We started as a small collective of journalists,
                filmmakers, and citizens frustrated by the gap between mainstream media and the
                stories that actually matter.
              </p>
              <p className="about-body-text">
                Over the years, we've grown into a full-fledged multi-format media platform — publishing
                digital magazines, producing documentaries, running the <strong>Unmute Podcast</strong>,
                and filing ground reports from the heart of communities across India.
              </p>
              <p className="about-body-text">
                Today, our Malleshwaram studio also doubles as a production hub where filmmakers and
                creators can rent professional camera gear, lighting rigs, and soundstages to tell
                their own stories.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="about-section about-bg-white">
        <Container>
          <div className="text-center mb-5">
            <p className="about-eyebrow text-center">WHAT WE DO</p>
            <h2 className="about-section-heading" style={{ fontSize: '2rem' }}>
              More Than a Media Platform
            </h2>
            <p className="about-body-text mx-auto" style={{ maxWidth: '540px' }}>
              We deliver stories through every format that connects people — and we give creators
              the tools to tell their own.
            </p>
          </div>

          <Row className="g-4">
            {whatWeDo.map((item, i) => (
              <Col key={i} lg={4} md={6}>
                <div className="about-service-card">
                  <div className="about-service-icon">{item.icon}</div>
                  <h3 className="about-service-title">{item.label}</h3>
                  <p className="about-service-desc">{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── OUR VALUES ── */}
      <section className="about-section about-bg-dark">
        <Container>
          <div className="text-center mb-5">
            <p className="about-eyebrow-light">OUR VALUES</p>
            <h2 className="about-section-heading-light">What Drives Us</h2>
          </div>

          <Row className="g-4">
            {values.map((v, i) => (
              <Col key={i} lg={3} md={6}>
                <div className="about-value-card">
                  <div className="about-value-icon">{v.icon}</div>
                  <h3 className="about-value-title">{v.title}</h3>
                  <p className="about-value-desc">{v.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── LOCATION / CONTACT ── */}
      <section className="about-section about-bg-off">
        <Container>
          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <p className="about-eyebrow">FIND US</p>
              <h2 className="about-section-heading">Our Studio Hub in Malleshwaram</h2>
              <p className="about-body-text">
                We're based in the heart of Malleshwaram — Bengaluru's cultural and creative district.
                Whether you're dropping by to rent equipment, attend a screening, or pitch a story — our
                doors are always open.
              </p>

              <div className="about-contact-list">
                <div className="about-contact-row">
                  <span className="about-contact-icon">📍</span>
                  <div>
                    <div className="about-contact-label">Address</div>
                    <div className="about-contact-val">
                      #280/1, Anniamma Arcade, Sampige Road,<br />
                      18th Cross, Malleshwaram,<br />
                      Bengaluru, Karnataka — 560003
                    </div>
                  </div>
                </div>
                <div className="about-contact-row">
                  <span className="about-contact-icon">🕐</span>
                  <div>
                    <div className="about-contact-label">Hours</div>
                    <div className="about-contact-val">
                      Monday – Saturday: 9:00 AM – 8:00 PM<br />
                      Sunday: By Appointment
                    </div>
                  </div>
                </div>
                <div className="about-contact-row">
                  <span className="about-contact-icon">✉️</span>
                  <div>
                    <div className="about-contact-label">Get in Touch</div>
                    <div className="about-contact-val">
                      <a href="mailto:support@aslikahani.com" className="about-email-link">
                        support@aslikahani.com
                      </a><br />
                      +91 63 66 333 444
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="about-cta-card">
                <div className="about-cta-icon">🎬</div>
                <h3 className="about-cta-heading">Ready to Create?</h3>
                <p className="about-cta-desc">
                  Whether you need a soundstage for your next film, a Sony FX3 for a shoot,
                  or a podcast recording suite — we've got everything you need at AsliKahani Studio.
                </p>
                <div className="d-flex flex-column gap-2">
                  <Link to="/assets" className="ak-browse-btn justify-content-center text-center">
                    Browse Equipment Catalog →
                  </Link>
                  <a
                    href="https://aslikahani.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-secondary-btn text-center justify-content-center"
                  >
                    Visit AsliKahani.com ↗
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
}

