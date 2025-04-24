import React, { useState, useEffect } from 'react';
import './a1.css';
import { supabase } from "../../../lib/supabase"; // تأكد من المسار

const A1About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      const { data, error } = await supabase
        .from('about') // حدد اسم الجدول هنا
        .select('a1') // حدد العمود المطلوب
        .single(); // استخدام single لتحميل سجل واحد

      if (error) {
        console.error('Error fetching about data:', error);
      } else {
        setAboutData(data.a1); // تعيين البيانات
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) return null; // إذا لم تكن البيانات موجودة، لا تعرض شيئًا

  return (
    <div className="a1-about">
      {/* Hero Section */}
      <div className="a1-about-hero">
        <div className="a1-about-overlay"></div>
        <div className="a1-container">
          <h1 className="a1-about-title">{aboutData.hero_title} <span>{aboutData.hero_span}</span></h1>
          <p className="a1-about-subtitle">{aboutData.hero_subtitle}</p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="a1-about-mission">
        <div className="a1-container">
          <div className="a1-section-header">
            <h2>{aboutData.mission_title}</h2>
            <div className="a1-section-line"></div>
          </div>

          <div className="a1-mission-content">
            <p>{aboutData.mission_text}</p>
            <button className="a1-btn">{aboutData.mission_button_text}</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="a1-about-services">
        <div className="a1-container">
          <div className="a1-section-header">
            <h2>{aboutData.services_title}</h2>
            <div className="a1-section-line"></div>
          </div>

          <div className="a1-services-grid">
            {aboutData.services.map((service, idx) => (
              <div key={idx} className="a1-service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default A1About;