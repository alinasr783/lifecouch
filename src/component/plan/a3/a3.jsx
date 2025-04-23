// a3.jsx
import React from "react";
import "./a3.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faStar, faClock } from "@fortawesome/free-solid-svg-icons";

const packages = [
  {
    title: "Starter",
    duration: "1 Month",
    icon: faDumbbell,
    features: ["Access to gym", "1 Personal session", "Locker access"],
    button: "Join Now",
  },
  {
    title: "Pro",
    duration: "3 Months",
    icon: faStar,
    features: ["All Starter features", "Diet Plan", "Weekly Check-in"],
    button: "Subscribe",
  },
  {
    title: "Elite",
    duration: "6 Months",
    icon: faClock,
    features: ["All Pro features", "Private Coaching", "Priority Support"],
    button: "Join Elite",
  },
];

const A3Packages = () => {
  return (
    <section className="a3-packages">
      <h2 className="a3-title">Choose Your Plan</h2>
      <div className="a3-packages-container">
        {packages.map((pkg, index) => (
          <div key={index} className="a3-card">
            <div className="a3-card-header">
              <FontAwesomeIcon icon={pkg.icon} className="a3-icon" />
              <h3>{pkg.title}</h3>
              <p className="a3-duration">{pkg.duration}</p>
            </div>
            <ul className="a3-features">
              {pkg.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button className="a3-button">{pkg.button}</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default A3Packages;