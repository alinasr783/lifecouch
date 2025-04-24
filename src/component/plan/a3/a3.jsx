import React, { useEffect, useState } from "react";
import "./a3.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faStar, faClock } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../lib/supabase"; // عدل المسار حسب مشروعك

const A3Packages = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);  // لإدارة الأخطاء

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("plan").select("a3").single();

      if (error) {
        console.error("Error fetching packages:", error);
        setError(error);  // تخزين الخطأ في حالة إذا حدث
      } else {
        console.log("Fetched data:", data);  // طباعة البيانات للتأكد
        // التأكد من أن data.a3.packages موجودة وتحتوي على مصفوفة
        if (data?.a3?.packages && Array.isArray(data.a3.packages)) {
          setPackages(data.a3.packages);  // تعيين البيانات إذا كانت مصفوفة
        } else {
          setError("Packages data is not available or is not an array.");  // إذا كانت البيانات غير صحيحة
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;  // عرض رسالة الخطأ إذا حدث
  }

  return (
    <section className="a3-packages">
      <h2 className="a3-title">Choose Your Plan</h2>
      <div className="a3-packages-container">
        {packages.length > 0 ? (
          packages.map((pkg, index) => (
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
          ))
        ) : (
          <p>No packages available.</p> // رسالة عند عدم وجود بيانات
        )}
      </div>
    </section>
  );
};

export default A3Packages;