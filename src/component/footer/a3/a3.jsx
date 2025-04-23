import React from "react";
import "./a3.css";

export default function A3() {
  return (
    <section className="a3la">
      <h2 className="a3la-title">Why Choose Us?</h2>
      <p className="a3la-subtitle">Discover what makes us different.</p>
      <div className="a3la-cards">
        <div className="a3la-card">
          <h3>Personalized Plans</h3>
          <p>Tailored workouts that match your goals, fitness level, and lifestyle.</p>
        </div>
        <div className="a3la-card">
          <h3>Expert Coaching</h3>
          <p>Get guidance from certified trainers with real-world results.</p>
        </div>
        <div className="a3la-card">
          <h3>Community Support</h3>
          <p>Stay motivated and inspired by joining our vibrant fitness tribe.</p>
        </div>
      </div>
    </section>
  );
}