import React, { useState, useEffect } from "react";
import "./a5.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneAlt, faEnvelope, faClock } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faTiktok, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { supabase } from "../../../lib/supabase"; // تأكد من المسار

const A5Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      const { data, error } = await supabase
        .from("footer") // تحديد اسم الجدول
        .select("a5") // تحديد العمود الذي يحتوي على البيانات
        .single();

      if (error) {
        console.error("Error fetching footer data:", error);
      } else {
        setFooterData(data.a5); // تعيين البيانات القادمة من العمود a5
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) return null; // إذا لم توجد بيانات، لا تظهر شيء

  return (
    <footer className="a5-footer">
      <div className="a5-container">
        <div className="a5-section about">
          <h2 className="a5-title">{footerData.coach_name}</h2>
          <p className="a5-description">{footerData.description}</p>
        </div>
        <div className="a5-section contact">
          <h3>Contact</h3>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {footerData.address}
          </p>
          <p>
            <FontAwesomeIcon icon={faPhoneAlt} /> {footerData.phone}
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> {footerData.email}
          </p>
          <p>
            <FontAwesomeIcon icon={faClock} /> {footerData.working_hours}
          </p>
        </div>
        <div className="a5-section links">
          <h3>Quick Links</h3>
          <ul>
            {footerData.quick_links.map((link, idx) => (
              <li key={idx}>
                <a href={link.url}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="a5-section social">
          <h3>Follow Us</h3>
          <div className="a5-social-icons">
            {footerData.social_links.map((social, idx) => (
              <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={
                  social.platform === "Facebook" ? faFacebookF :
                  social.platform === "Instagram" ? faInstagram :
                  social.platform === "TikTok" ? faTiktok :
                  social.platform === "Twitter" ? faTwitter : faYoutube
                } />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="a5-bottom">
        <p>&copy; {new Date().getFullYear()} {footerData.coach_name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default A5Footer;