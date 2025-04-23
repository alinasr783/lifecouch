import React from 'react';
import './a1.css';

const A1About = () => {
  return (
    <div className="a1-about">
      {/* Hero Section */}
      <div className="a1-about-hero">
        <div className="a1-about-overlay"></div>
        <div className="a1-container">
          <h1 className="a1-about-title">UNLOCK YOUR <span>POTENTIAL</span></h1>
          <p className="a1-about-subtitle">Transform your mindset, transform your life</p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="a1-about-mission">
        <div className="a1-container">
          <div className="a1-section-header">
            <h2>MY APPROACH</h2>
            <div className="a1-section-line"></div>
          </div>

          <div className="a1-mission-content">
            <p>
              I help high-achieving men break through mental barriers and achieve 
              extraordinary results in all areas of life through proven mindset strategies.
            </p>
            <button className="a1-btn">BOOK A SESSION</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="a1-about-services">
        <div className="a1-container">
          <div className="a1-section-header">
            <h2>SERVICES</h2>
            <div className="a1-section-line"></div>
          </div>

          <div className="a1-services-grid">
            <div className="a1-service-card">
              <h3>1-ON-1 COACHING</h3>
              <p>Personalized transformation program</p>
            </div>

            <div className="a1-service-card">
              <h3>GROUP MASTERMIND</h3>
              <p>Brotherhood of high performers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default A1About;