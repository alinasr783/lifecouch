import React, { useState, useEffect } from 'react';
import './a2.css';
import { supabase } from '../../../lib/supabase'; // تأكد من تعديل المسار

export default function A1Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      const { data, error } = await supabase
        .from('footer')
        .select('a2')
        .single();

      if (error) {
        console.error('Error fetching footer data:', error);
      } else {
        setFooterData(data.a2);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) return null;

  return (
    <footer className="a1-footer">
      <div className="a1-footer-container">
        <div className="a1-footer-section">
          <h3 className="a1-footer-title">{footerData.site_name}</h3>
          <p className="a1-footer-text">{footerData.tagline}</p>
        </div>

        <div className="a1-footer-section">
          <h4>Quick Links</h4>
          <ul className="a1-footer-links">
            {footerData.quick_links.map((link, idx) => (
              <li key={idx}>
                <a href={link.url}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="a1-footer-section">
          <h4>Follow Us</h4>
          <div className="a1-footer-socials">
            {footerData.social_links.map((social, idx) => (
              <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer">
                <i className={`fab fa-${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="a1-footer-bottom">
        &copy; {new Date().getFullYear()} {footerData.site_name}. All rights reserved.
      </div>
    </footer>
  );
}