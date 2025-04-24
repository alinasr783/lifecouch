import React, { useState, useEffect } from "react";
import "./a2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faFire, faCrown, faClock, faCheck } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../lib/supabase";

const iconMap = {
  dumbbell: faDumbbell,
  fire: faFire,
  crown: faCrown,
};

const A2Packages = () => {
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    const fetchPlanData = async () => {
      const { data, error } = await supabase
        .from("plan")
        .select("a2")
        .single();

      if (error) {
        console.error("Error fetching plan data:", error);
      } else {
        setPlanData(data.a2);
      }
    };

    fetchPlanData();
  }, []);

  if (!planData) return null;

  return (
    <section className="a2-packages">
      <h2 className="a2-heading">{planData.title}</h2>
      <div className="a2-cards">
        {planData.packages.map((pkg, index) => (
          <div className="a2-card" key={index}>
            {pkg.popular && <div className="a2-popular">Most Popular</div>}
            <div className="a2-icon">
              <FontAwesomeIcon icon={iconMap[pkg.icon]} />
            </div>
            <h3 className="a2-title">{pkg.title}</h3>
            <p className="a2-duration">
              <FontAwesomeIcon icon={faClock} /> {pkg.duration}
            </p>
            <div className="a2-price">${pkg.price}</div>
            <div className="a2-monthly">${pkg.monthly}/month</div>
            <ul className="a2-features">
              {pkg.features.map((feature, i) => (
                <li key={i}>
                  <FontAwesomeIcon icon={faCheck} style={{ color: "#ff2828", fontSize: "0.8rem" }} />
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