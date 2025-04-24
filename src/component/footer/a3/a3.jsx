import React, { useState, useEffect } from "react";
import "./a3.css";
import { supabase } from "../../../lib/supabase"; // تأكد من تعديل المسار

export default function A3() {
  const [a3Data, setA3Data] = useState(null);

  useEffect(() => {
    const fetchA3Data = async () => {
      const { data, error } = await supabase
        .from("footer") // الجدول الأساسي
        .select("a3") // المدخل (العمود) المطلوب
        .single();

      if (error) {
        console.error("Error fetching A3 data:", error);
      } else {
        setA3Data(data.a3); // نعين الداتا من داخل العمود a3
      }
    };

    fetchA3Data();
  }, []);

  if (!a3Data) return null;

  return (
    <section className="a3la">
      <h2 className="a3la-title">{a3Data.title}</h2>
      <p className="a3la-subtitle">{a3Data.subtitle}</p>
      <div className="a3la-cards">
        {a3Data.cards.map((card, idx) => (
          <div key={idx} className="a3la-card">
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}