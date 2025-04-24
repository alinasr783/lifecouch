import React from "react";
import "./a1.css";

const A1Policy = () => {
  return (
    <section className="a1policy-section" id="policy">
      <div className="a1policy-container">
        <h2 className="a1policy-title">Terms of Use</h2>
        <p className="a1policy-intro">
          By using our services, you agree to follow the terms outlined below. These policies are in place to ensure a safe, respectful, and effective training environment for everyone.
        </p>

        <ul className="a1policy-list">
          <li><strong>Respect & Behavior:</strong> Users must maintain respectful communication and conduct.</li>
          <li><strong>Payment Terms:</strong> All plans must be paid in full before training begins. No refunds after sessions start.</li>
          <li><strong>Health Responsibility:</strong> You confirm you are physically fit and responsible for your health condition.</li>
          <li><strong>Schedule & Attendance:</strong> You must notify at least 12 hours before any absence. Missed sessions without notice will be counted.</li>
          <li><strong>Privacy:</strong> Your personal and health information will be kept confidential and secure.</li>
        </ul>

        <p className="a1policy-note">
          For any questions, feel free to <a href="#contact">contact us</a>. We're here to help!
        </p>
      </div>
    </section>
  );
};

export default A1Policy;