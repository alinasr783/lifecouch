import React, { useState, useEffect } from "react";
import "./a4.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { supabase } from "../../../lib/supabase";

const A4Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      const { data, error } = await supabase
        .from("footer")
        .select("a4")
        .single();

      if (error) {
        console.error("Error fetching footer data:", error);
      } else {
        setFooterData(data.a4);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) return null;

  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <h2 className="footer-title">{footerData.title}</h2>
        <div className="footer-contact">
          {footerData.contact.map((item, idx) => (
            <div key={idx} className="footer-contact-item">
              <FontAwesomeIcon
                icon={
                  item.icon === "location"
                    ? faMapMarkerAlt
                    : item.icon === "phone"
                    ? faPhone
                    : faEnvelope
                }
                className="icon-svg"
              />
              {item.text}
            </div>
          ))}
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
              <FontAwesomeIcon
                icon={
                  link.icon === "facebook"
                    ? faFacebookF
                    : link.icon === "instagram"
                    ? faInstagram
                    : faTiktok
                }
                className="icon-svg"
              />{" "}
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default A4Footer;