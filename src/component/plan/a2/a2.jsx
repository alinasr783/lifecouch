import React from "react";
import "./a2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDumbbell, 
  faFire, 
  faCrown,
  faClock,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

const packages = [
  {
    title: "Starter",
    duration: "1 Month",
    icon: faDumbbell,
    price: "99",
    monthly: "99",
    features: [
      "Access to all gym equipment",
      "1 Group class per week",
      "Basic support",
      "Locker access",
      "Free WiFi"
    ],
  },
  {
    title: "Pro",
    duration: "3 Months",
    icon: faFire,
    price: "249",
    monthly: "83",
    features: [
      "All Starter features",
      "3 Group classes per week",
      "Nutrition Guide",
      "Body composition analysis",
      "Sauna access",
      "Progress tracking"
    ],
    popular: true
  },
  {
    title: "Elite",
    duration: "6 Months",
    icon: faCrown,
    price: "450",
    monthly: "75",
    features: [
      "All Pro features",
      "Unlimited classes",
      "1-on-1 Coaching session",
      "VIP lounge access",
      "Custom meal plan",
      "Massage discounts",
      "Guest passes"
    ],
  },
];

const A2Packages = () => {
  return (
    <section className="a2-packages">
      <h2 className="a2-heading">Elite Membership Plans</h2>
      <div className="a2-cards">
        {packages.map((pkg, index) => (
          <div className="a2-card" key={index}>
            {pkg.popular && <div className="a2-popular">Most Popular</div>}
            <div className="a2-icon">
              <FontAwesomeIcon icon={pkg.icon} />
            </div>
            <h3 className="a2-title">{pkg.title}</h3>
            <p className="a2-duration">
              <FontAwesomeIcon icon={faClock} /> {pkg.duration}
            </p>
            <div className="a2-price">{pkg.price}</div>
            <div className="a2-monthly">${pkg.monthly}/month</div>
            <ul className="a2-features">
              {pkg.features.map((feature, i) => (
                <li key={i}>
                  <FontAwesomeIcon icon={faCheck} style={{color: "#ff2828", fontSize: "0.8rem"}} /> 
                  {feature}
                </li>
              ))}
            </ul>
            <button className="a2-btn">Join Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default A2Packages;