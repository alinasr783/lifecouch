import React, { useState, useEffect } from 'react';
import './a1.css';
import { supabase } from '../../../lib/supabase'; // عدّل المسار حسب مشروعك

function A1Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      const { data, error } = await supabase
        .from('header')
        .select('a1')
        .single();

      if (error) {
        console.error('Supabase error:', error);
      } else {
        setHeaderData(data.a1);
      }
    };

    fetchHeaderData();
  }, []);

  if (!headerData) return null;

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
            {headerData.links.map((link, idx) => (
              <a key={idx} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="a1-logo">{headerData.logo}</div>
        </div>
      </header>

      {menuOpen && <div className="a1-overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
}

export default A1Header;