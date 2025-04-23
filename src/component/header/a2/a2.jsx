import React, { useState, useEffect } from 'react';
import './a2.css';

function A1Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`a1-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="a1-container">
          <div className="a1-logo">
            <span className="a1-logo-main">STRONGHOLD</span>
            <span className="a1-logo-sub">FITNESS</span>
          </div>

          <div 
            className={`a1-menu-toggle ${menuOpen ? 'open' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="bar top"></div>
            <div className="bar middle"></div>
            <div className="bar bottom"></div>
          </div>

          <nav className={`a1-side-nav ${menuOpen ? 'show' : ''}`}>
            <div className="a1-nav-background"></div>
            <div className="a1-nav-content">
              <a href="#" onClick={() => setMenuOpen(false)}>
                <span className="a1-nav-number">01</span>
                <span className="a1-nav-text">HOME</span>
                <div className="a1-nav-line"></div>
              </a>
              <a href="#" onClick={() => setMenuOpen(false)}>
                <span className="a1-nav-number">02</span>
                <span className="a1-nav-text">TRAINING</span>
                <div className="a1-nav-line"></div>
              </a>
              <a href="#" onClick={() => setMenuOpen(false)}>
                <span className="a1-nav-number">03</span>
                <span className="a1-nav-text">NUTRITION</span>
                <div className="a1-nav-line"></div>
              </a>
              <a href="#" onClick={() => setMenuOpen(false)}>
                <span className="a1-nav-number">04</span>
                <span className="a1-nav-text">RESULTS</span>
                <div className="a1-nav-line"></div>
              </a>
              <a href="#" onClick={() => setMenuOpen(false)}>
                <span className="a1-nav-number">05</span>
                <span className="a1-nav-text">CONTACT</span>
                <div className="a1-nav-line"></div>
              </a>
            </div>
          </nav>
        </div>
      </header>

      {menuOpen && (
        <div 
          className="a1-overlay-header" 
          onClick={() => setMenuOpen(false)}
          style={{ animation: menuOpen ? 'fadeIn 0.4s forwards' : 'fadeOut 0.4s forwards' }}
        ></div>
      )}
    </>
  );
}

export default A1Header;