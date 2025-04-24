import React, { useEffect, useState } from "react";
import "./a1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faDumbbell,
  faFire,
  faTrophy,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../lib/supabase"; // عدل المسار حسب مشروعك

const iconsMap = {
  dumbbell: faDumbbell,
  fire: faFire,
  trophy: faTrophy,
  crown: faCrown,
};

const PackageCard = ({
  icon,
  title,
  duration,
  price,
  monthly,
  features,
  popular,
}) => {
  return (
    <div className="a1-card">
      {popular && <div className="a1-popular">POPULAR</div>}
      <div className="a1-icon">
        <FontAwesomeIcon icon={iconsMap[icon]} />
      </div>
      <h3 className="a1-title">{title}</h3>
      <p className="a1-duration">
        <FontAwesomeIcon icon={faClock} /> {duration}
      </p>
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
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);  // لإدارة الأخطاء

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("plan").select("a1").single();

      if (error) {
        console.error("Error fetching packages:", error);
        setError(error);  // تخزين الخطأ في حالة إذا حدث
      } else {
        console.log("Fetched data:", data);  // طباعة البيانات للتأكد
        setPackages(data?.a1?.packages || []);  // التأكد من وجود المصفوفة
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;  // عرض رسالة الخطأ إذا حدث
  }

  return (
    <section className="a1-section">
      <h2 className="a1-heading">Elite Training Packages</h2>
      <div className="a1-cards-container">
        {Array.isArray(packages) && packages.length > 0 ? (
          packages.map((pkg, idx) => (
            <PackageCard key={idx} {...pkg} />
          ))
        ) : (
          <p>No packages available.</p> // رسالة عند عدم وجود بيانات
        )}
      </div>
    </section>
  );
};

export default A1Packages;