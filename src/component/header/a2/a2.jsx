import React, { useState, useEffect } from 'react';
import './a2.css';
import { supabase } from '../../../lib/supabase'; // تعديل المسار حسب المكان المناسب

function A2Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerData, setHeaderData] = useState(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      const { data, error } = await supabase
        .from('header')
        .select('a2')
        .single();

      if (error) {
        console.error('Error fetching header data:', error);
      } else {
        setHeaderData(data.a2);
      }
    };

    fetchHeaderData();

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!headerData) return null;

  return (
    <>
      <header className={`a1-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="a1-container">
          <div className="a1-logo">
            <span className="a1-logo-main">{headerData.logo_main}</span>
            <span className="a1-logo-sub">{headerData.logo_sub}</span>
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
              {headerData.links.map((link, idx) => (
                <a key={idx} href={link.href} onClick={() => setMenuOpen(false)}>
                  <span className="a1-nav-number">{link.number}</span>
                  <span className="a1-nav-text">{link.label}</span>
                  <div className="a1-nav-line"></div>
                </a>
              ))}
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

export default A2Header;