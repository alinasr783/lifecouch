import React from "react";
import "./a1.css";

const A1Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <h2 className="footer-title">coach zeko</h2>
        <div className="footer-contact">
          <div className="footer-contact-item">
            <span className="icon-svg">📍</span> القاهرة، مصر
          </div>
          <div className="footer-contact-item">
            <span className="icon-svg">📞</span> 0106<span></span>720<span></span>3240
          </div>
          <div className="footer-contact-item">
            <span className="icon-svg">✉️</span> yahyahatem53@gmail.com
          </div>
        </div>

        <div className="footer-social-buttons">
          <a href="https://www.facebook.com/yahya.hatem.94" target="_blank" rel="noopener noreferrer" className="social-btn facebook-btn">
            <span className="icon-svg">f</span> Facebook
          </a>
          <a href="https://www.instagram.com/coach_zeko" target="_blank" rel="noopener noreferrer" className="social-btn instagram-btn">
            <span className="icon-svg">i</span> Instagram
          </a>
          <a href="https://rb.gy/9wruhd" target="_blank" rel="noopener noreferrer" className="social-btn tiktok-btn">
            <span className="icon-svg">t</span> TikTok
          </a>
        </div>
      </div>
    </footer>
  );
};

export default A1Footer;