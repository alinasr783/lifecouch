import React, { useEffect, useState } from "react";
import "./a5.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDumbbell, 
  faFire, 
  faCrown,
  faBolt,
  faShieldAlt
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../lib/supabase"; // عدل المسار حسب مشروعك

const iconMap = {
  faDumbbell,
  faFire,
  faCrown,
  faBolt,
  faShieldAlt,
};

const A5 = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("plan").select("a5").single();

      if (error) {
        console.error("Error fetching packages:", error);
        setError(error.message || "An error occurred while fetching data.");
      } else {
        console.log("Fetched data:", data);
        if (data?.a5?.packages && Array.isArray(data.a5.packages)) {
          setPackages(data.a5.packages);
        } else {
          setError("Packages data is not available or is not an array.");
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="a5-container">
      {packages.map((pkg, index) => (
        <div key={index} className="a5-package">
          <div className="a5-package-header">
            <FontAwesomeIcon icon={iconMap[pkg.icon]} className="a5-package-icon" />
            <h3 className="a5-package-title">{pkg.title}</h3>
          </div>
          <ul className="a5-package-features">
            {pkg.features.map((feature, i) => (
              <li key={i} className="a5-package-feature">{feature}</li>
            ))}
          </ul>
          <div className="a5-price">
            <span className="a5-price-total">${pkg.price}</span>
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