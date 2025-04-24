import React, { useState, useEffect } from "react";
import "./a3.css";
import { supabase } from "../../../lib/supabase"; // تأكد من المسار

const A3About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      const { data, error } = await supabase
        .from('about') // اسم الجدول هنا
        .select('a3') // العمود الذي يحتوي على البيانات المطلوبة
        .single();

      if (error) {
        console.error("Error fetching about data:", error);
      } else {
        setAboutData(data.a3); // تعيين البيانات من العمود a3
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) return null; // إذا لم تكن البيانات موجودة بعد، لا تعرض شيئًا

  return (
    <section className="a1about-section" id="about">
      <div className="a1about-container">
        <div className="a1about-image">
          <img src={aboutData.image_url} alt={aboutData.coach_name} />
        </div>
        <div className="a1about-content">
          <h2 className="a1about-title">{aboutData.title}</h2>
          <p className="a1about-text">
            {aboutData.description}
          </p>
          <ul className="a1about-features">
            {/* فحص وجود البيانات داخل features */}
            {aboutData.features && Array.isArray(aboutData.features) && aboutData.features.length > 0 ? (
              aboutData.features.map((feature, idx) => (
                <li key={idx}>
                  <span className="dot">✔</span> {feature}
                </li>
              ))
            ) : (
              <p>No features available.</p> // رسالة عند عدم وجود features
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default A3About;