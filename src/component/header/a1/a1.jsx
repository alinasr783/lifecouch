import React, { useState } from 'react';
import './a1.css';

function A1Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="a1-header">
        <div className="a1-container">
          <div className="a1-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <nav className={`a1-side-nav ${menuOpen ? 'show' : ''}`}>
            <a href="#" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <div className="a1-logo">MySite</div>

        </div>
      </header>

      {menuOpen && <div className="a1-overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
}

export default A1Header;