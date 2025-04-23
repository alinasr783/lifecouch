import React from "react";
import "./a3.css";

const A1About = () => {
  return (
    <section className="a1about-section" id="about">
      <div className="a1about-container">
        <div className="a1about-image">
          <img src="https://via.placeholder.com/220x220.png?text=Coach+Zeko" alt="Coach Zeko" />
        </div>
        <div className="a1about-content">
          <h2 className="a1about-title">About Coach Zeko</h2>
          <p className="a1about-text">
            With over <strong>10 years of experience</strong> in fitness training, Coach Zeko has helped hundreds of people transform their lives through discipline, dedication, and hard work.
          </p>
          <ul className="a1about-features">
            <li><span className="dot">✔</span> Certified Personal Trainer</li>
            <li><span className="dot">✔</span> 300+ Successful Transformations</li>
            <li><span className="dot">✔</span> Strength & Conditioning Expert</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default A1About;