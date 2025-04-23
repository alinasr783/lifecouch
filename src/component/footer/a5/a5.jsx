import React from "react";
import "./a5.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const A5Footer = () => {
  return (
    <footer className="a5-footer">
      {" "}
      <div className="a5-container">
        {" "}
        <div className="a5-section about">
          {" "}
          <h2 className="a5-title">Coach Zeko</h2>{" "}
          <p className="a5-description">
            {" "}
            Helping you reach your fitness goals with modern training programs
            and full support. Let’s build the best version of you.{" "}
          </p>{" "}
        </div>
        <div className="a5-section contact">
          <h3>Contact</h3>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Cairo, Egypt
          </p>
          <p>
            <FontAwesomeIcon icon={faPhoneAlt} /> +20 106 720 3240
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> yahyahatem53@gmail.com
          </p>
          <p>
            <FontAwesomeIcon icon={faClock} /> Mon - Sat: 8:00 - 20:00
          </p>
        </div>
        <div className="a5-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Programs</a>
            </li>
            <li>
              <a href="#">Gallery</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="a5-section social">
          <h3>Follow Us</h3>
          <div className="a5-social-icons">
            <a href="https://facebook.com" target="_blank">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://instagram.com" target="_blank">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://tiktok.com" target="_blank">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            <a href="https://twitter.com" target="_blank">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://youtube.com" target="_blank">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
      </div>
      <div className="a5-bottom">
        <p>&copy; 2025 Coach Zeko. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default A5Footer;
