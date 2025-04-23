import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDumbbell, 
  faFire, 
  faCrown,
  faBolt,
  faShieldAlt
} from "@fortawesome/free-solid-svg-icons";
import "./a5.css";

const packages = [
  {
    title: "Warrior",
    icon: faShieldAlt,
    duration: "1 Month",
    price: 99,
    features: [
      "Basic Gym Access",
      "1 Personal Trainer Session", 
      "Free Wi-Fi",
      "Locker Access",
      "Basic Support"
    ],
  },
  {
    title: "Gladiator",
    icon: faBolt,
    duration: "3 Months",
    price: 249,
    features: [
      "Full Gym Access",
      "5 Personal Trainer Sessions",
      "Priority Support",
      "Free Merchandise",
      "Body Analysis",
      "Sauna Access"
    ],
  },
  {
    title: "Titan",
    icon: faCrown,
    duration: "6 Months",
    price: 450,
    features: [
      "VIP Gym Access",
      "10 Personal Trainer Sessions",
      "Priority Support",
      "Exclusive Events",
      "Premium Merchandise",
      "Massage Discounts",
      "Nutrition Plan"
    ],
  },
];

const A5 = () => {
  return (
    <section className="a5-container">
      {packages.map((pkg, index) => (
        <div key={index} className="a5-package">
          <div className="a5-package-header">
            <FontAwesomeIcon icon={pkg.icon} className="a5-package-icon" />
            <h3 className="a5-package-title">{pkg.title}</h3>
          </div>
          <ul className="a5-package-features">
            {pkg.features.map((feature, i) => (
              <li key={i} className="a5-package-feature">{feature}</li>
            ))}
          </ul>
          <div className="a5-price">
            <span className="a5-price-total">{pkg.price}</span>
            <span className="a5-price-monthly">
              (${(pkg.price / parseInt(pkg.duration)).toFixed(0)}/month)
            </span>
          </div>
          <button className="a5-join-btn">Enlist Now</button>
        </div>
      ))}
    </section>
  );
};

export default A5;