import React from 'react'
import './a2.css'

export default function A1Footer() {
  return (
    <footer className="a1-footer">
      <div className="a1-footer-container">
        <div className="a1-footer-section">
          <h3 className="a1-footer-title">MySite</h3>
          <p className="a1-footer-text">Where innovation meets elegance.</p>
        </div>

        <div className="a1-footer-section">
          <h4>Quick Links</h4>
          <ul className="a1-footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="a1-footer-section">
          <h4>Follow Us</h4>
          <div className="a1-footer-socials">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="a1-footer-bottom">
        &copy; {new Date().getFullYear()} MySite. All rights reserved.
      </div>
    </footer>
  )
}