import React from "react";
import "./a4.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

const A4Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <h2 className="footer-title">Coach Zeko</h2>
        <div className="footer-contact">
          <div className="footer-contact-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-svg" />
            Cairo, Egypt
          </div>
          <div className="footer-contact-item">
            <FontAwesomeIcon icon={faPhone} className="icon-svg" />
            0106 720 3240
          </div>
          <div className="footer-contact-item">
            <FontAwesomeIcon icon={faEnvelope} className="icon-svg" />
            yahyahatem53@gmail.com
          </div>
        </div>

        <div className="footer-social-buttons">
          <a href="https://www.facebook.com/yahya.hatem.94" target="_blank" rel="noopener noreferrer" className="social-btn facebook-btn">
            <FontAwesomeIcon icon={faFacebookF} className="icon-svg" /> Facebook
          </a>
          <a href="https://www.instagram.com/coach_zeko" target="_blank" rel="noopener noreferrer" className="social-btn instagram-btn">
            <FontAwesomeIcon icon={faInstagram} className="icon-svg" /> Instagram
          </a>
          <a href="https://rb.gy/9wruhd" target="_blank" rel="noopener noreferrer" className="social-btn tiktok-btn">
            <FontAwesomeIcon icon={faTiktok} className="icon-svg" /> TikTok
          </a>
        </div>
      </div>
    </footer>
  );
};

export default A4Footer;