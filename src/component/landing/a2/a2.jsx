import React, { useEffect, useState } from 'react';
import './a2.css';
import { supabase } from '../../../lib/supabase'; // غيّر المسار حسب مشروعك

export default function A2() {
  const [content, setContent] = useState(null);

  // Cursor animation
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

  // Fetch from Supabase
  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('landing')
        .select('a2')
        .single();

      if (error) {
        console.error('Supabase error:', error);
      } else {
        setContent(data.a2);
      }
    };

    fetchContent();
  }, []);

  if (!content) return null;

  return (
    <section className="a1la">
      <div className="a1la-image-bg"></div>
      <div className="a1la-bg"></div>
      <div className="a1la-glow"></div>
      <div className="a1la-grid"></div>
      <div className="a1la-scanlines"></div>

      <div className="a1la-particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="a1la-particle"></div>
        ))}
      </div>

      <div className="a1la-content">
        <h1 className="a1la-title">
          <span className="a1la-title-highlight">{content.titleHighlight}</span>
          <span className="a1la-title-sub">{content.titleSub}</span>
        </h1>
        <p className="a1la-subtitle">{content.subtitle}</p>
        <button className="a1la-btn">
          <span className="a1la-btn-text">{content.buttonText}</span>
          <span className="a1la-btn-hover"></span>
        </button>
      </div>

      <div className="a1la-tech-elements">
        <div className="a1la-tech-1"></div>
        <div className="a1la-tech-2"></div>
        <div className="a1la-tech-3"></div>
      </div>
    </section>
  );
}