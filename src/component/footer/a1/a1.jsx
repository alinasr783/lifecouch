import React, { useState, useEffect } from "react";
import "./a1.css";
import { supabase } from "../../../lib/supabase"; // تعديل المسار حسب المكان المناسب

const A1Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      const { data, error } = await supabase
        .from("footer")
        .select("a1")
        .single();

      if (error) {
        console.error("Error fetching footer data:", error);
      } else {
        setFooterData(data.a1);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) return null;

  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <h2 className="footer-title">{footerData.coach_name}</h2>
        <div className="footer-contact">
          <div className="footer-contact-item">
            <span className="icon-svg">📍</span> {footerData.address}
          </div>
          <div className="footer-contact-item">
            <span className="icon-svg">📞</span> {footerData.phone}
          </div>
          <div className="footer-contact-item">
            <span className="icon-svg">✉️</span> {footerData.email}
          </div>
        </div>

        <div className="footer-social-buttons">
          {footerData.social_links.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`social-btn ${link.platform.toLowerCase()}-btn`}
            >
              <span className="icon-svg">{link.icon}</span> {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default A1Footer;