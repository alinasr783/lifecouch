import React, { useEffect, useState } from 'react';
import './a1.css';
import { supabase } from '../../../lib/supabase'; // غيّر المسار حسب مكان الملف

export default function A1() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchLandingContent = async () => {
      const { data, error } = await supabase
        .from('landing')
        .select('a1')
        .single();

      if (error) {
        console.error('Error fetching landing content:', error);
      } else {
        setContent(data.a1);
      }
    };

    fetchLandingContent();
  }, []);

  if (!content) return null; // أو ممكن تحط لودينج سبينر

  return (
    <section className="a1la">
      <div className="a1la-image-bg"></div>
      <div className="a1la-bg"></div>
      <div className="a1la-glow"></div>
      <div className="a1la-content">
        <h1 className="a1la-title">{content.title}</h1>
        <p className="a1la-subtitle">{content.subtitle}</p>
        <button className="a1la-btn">{content.buttonText}</button>
      </div>
    </section>
  );
}