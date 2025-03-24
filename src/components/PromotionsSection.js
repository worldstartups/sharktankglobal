// src/components/PromotionsSection.js
import React from "react";
import "./PromotionsSection.css"; // Create a separate CSS file for styling

const PromotionsSection = () => {
  return (
    <section className="promotions-section">
      <h2>🚀 Special Promotions</h2>
      <div className="promo-container">
        <div className="promo-card">
          <h3>🔔 Exclusive Startup Launch!</h3>
          <p>Discover the next big thing in the startup world.</p>
        </div>
        <div className="promo-card">
          <h3>🎯 Limited-Time Special Offers</h3>
          <p>Get huge discounts on the latest Shark Tank products.</p>
        </div>
        <div className="promo-card">
          <h3>🏆 Featured Entrepreneurs</h3>
          <p>Meet the minds behind the most successful startups.</p>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
