import React from "react";
import "./a1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faClock, faFire, faTrophy, faCrown } from "@fortawesome/free-solid-svg-icons";

const PackageCard = ({ icon, title, duration, price, monthly, features, popular }) => {
  return (
    <div className="a1-card">
      {popular && <div className="a1-popular">POPULAR</div>}
      <div className="a1-icon">{icon}</div>
      <h3 className="a1-title">{title}</h3>
      <p className="a1-duration"><FontAwesomeIcon icon={faClock} /> {duration}</p>
      <div className="a1-price">${price}</div>
      <div className="a1-monthly">${monthly}/month</div>
      <ul className="a1-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button className="a1-button">Join Now</button>
    </div>
  );
};

const A1Packages = () => {
  return (
    <section className="a1-section">
      <h2 className="a1-heading">Elite Training Packages</h2>
      <div className="a1-cards-container">
        <PackageCard
          icon={<FontAwesomeIcon icon={faDumbbell} />}
          title="Starter"
          duration="1 Month"
          price="99"
          monthly="99"
          features={[
            "24/7 Gym Access",
            "1 Personal Training Session",
            "Basic Diet Plan",
            "Locker Access",
            "Free WiFi"
          ]}
        />
        <PackageCard
          icon={<FontAwesomeIcon icon={faFire} />}
          title="Pro"
          duration="3 Months"
          price="249"
          monthly="83"
          features={[
            "24/7 Gym Access",
            "4 Personal Training Sessions",
            "Custom Diet Plan",
            "Body Composition Analysis",
            "VIP Locker",
            "Sauna Access"
          ]}
          popular={true}
        />
        <PackageCard
          icon={<FontAwesomeIcon icon={faCrown} />}
          title="Elite"
          duration="6 Months"
          price="450"
          monthly="75"
          features={[
            "24/7 Gym Access + Guest Pass",
            "10 Personal Training Sessions",
            "Premium Custom Diet Plan",
            "Full Body Analysis + Progress Tracking",
            "VIP Lounge Access",
            "Unlimited Classes",
            "Massage Discounts"
          ]}
        />
      </div>
    </section>
  );
};

export default A1Packages;