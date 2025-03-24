// src/components/AdsSection.js
import React from "react";
import "./AdsSection.css"; // Create a separate CSS file for styling

const AdsSection = () => {
  return (
    <section className="ads-section">
      <h2>Ads</h2>
      <div className="offers-container">
        <div className="offer-card">
          <h3>🔥 50% OFF on Selected Products</h3>
          <p>Limited-time offer on trending startups!</p>
        </div>
        <div className="offer-card">
          <h3>🎉 Buy 1 Get 1 Free</h3>
          <p>Exclusive deal on innovative Shark Tank brands.</p>
        </div>
        <div className="offer-card">
          <h3>🚀 Early Bird Discounts</h3>
          <p>Get amazing deals before they are gone!</p>
        </div>
      </div>
    </section>
  );
};

export default AdsSection;
