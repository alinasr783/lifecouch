import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faStar, faClock } from "@fortawesome/free-solid-svg-icons";
import "./a4.css";

const packages = [
  {
    title: "Basic Plan",
    icon: faDumbbell,
    duration: "1 Month",
    price: 30,
    features: ["Basic Gym Access", "1 Personal Trainer Session", "Free Wi-Fi"],
  },
  {
    title: "Pro Plan",
    icon: faStar,
    duration: "3 Months",
    price: 80,
    features: ["Full Gym Access", "5 Personal Trainer Sessions", "Priority Support", "Free Merchandise"],
  },
  {
    title: "Premium Plan",
    icon: faClock,
    duration: "6 Months",
    price: 150,
    features: ["VIP Gym Access", "10 Personal Trainer Sessions", "Priority Support", "Exclusive Events", "Free Merchandise"],
  },
];

const A4 = () => {
  return (
    <section className="a4-container">
      {packages.map((pkg, index) => (
        <div key={index} className="a4-package">
          <div className="a4-package-header">
            <FontAwesomeIcon icon={pkg.icon} className="a4-package-icon" />
            <h3 className="a4-package-title">{pkg.title}</h3>
          </div>
          <ul className="a4-package-features">
            {pkg.features.map((feature, i) => (
              <li key={i} className="a4-package-feature">{feature}</li>
            ))}
          </ul>
          <div className="a4-price">
            <span className="a4-price-total">${pkg.price}</span>
            <span className="a4-price-monthly">(${(pkg.price / parseInt(pkg.duration)).toFixed(2)} per month)</span>
          </div>
          <button className="a4-join-btn">Join Now</button>
        </div>
      ))}
    </section>
  );
};

export default A4;