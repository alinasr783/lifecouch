import React, { useEffect, useState } from "react";
import "./a1.css";
import { supabase } from "../../../lib/supabase"; // عدل المسار حسب مشروعك

const A1Policy = () => {
  const [policy, setPolicy] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      const { data, error } = await supabase.from("police").select("a1").single();

      if (error) {
        console.error("Error fetching policy:", error);
        setError(error.message || "Error loading policy.");
      } else {
        setPolicy(data.a1);
      }
    };

    fetchPolicy();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!policy) return <div>Loading...</div>;

  return (
    <section className="a1policy-section" id="policy">
      <div className="a1policy-container">
        <h2 className="a1policy-title">{policy.title}</h2>
        <p className="a1policy-intro">{policy.intro}</p>

        <ul className="a1policy-list">
          {policy.list.map((item, index) => (
            <li key={index}>
              <strong>{item.title}:</strong> {item.description}
            </li>
          ))}
        </ul>

        <p className="a1policy-note">
          {policy.note} <a href="#contact">contact us</a>.
        </p>
      </div>
    </section>
  );
};

export default A1Policy;