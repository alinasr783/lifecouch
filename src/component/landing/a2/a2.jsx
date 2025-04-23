import React, { useEffect } from 'react';
import './a2.css';

export default function A1() {
  // Dynamic cursor effect
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'a1la-cursor';
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <section className="a1la">
      {/* Background & Glow Effects */}
      <div className="a1la-image-bg"></div>
      <div className="a1la-bg"></div>
      <div className="a1la-glow"></div>
      <div className="a1la-grid"></div>
      <div className="a1la-scanlines"></div>

      {/* Floating Particles */}
      <div className="a1la-particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="a1la-particle"></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="a1la-content">
        <h1 className="a1la-title">
          <span className="a1la-title-highlight">Enter The Depths</span>
          <span className="a1la-title-sub">Of Innovation</span>
        </h1>
        <p className="a1la-subtitle">
          Where design meets technology, and creativity becomes reality.
        </p>
        <button className="a1la-btn">
          <span className="a1la-btn-text">Dive In</span>
          <span className="a1la-btn-hover"></span>
        </button>
      </div>

      {/* Floating Tech Elements */}
      <div className="a1la-tech-elements">
        <div className="a1la-tech-1"></div>
        <div className="a1la-tech-2"></div>
        <div className="a1la-tech-3"></div>
      </div>
    </section>
  );
}