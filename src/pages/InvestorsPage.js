import React, { useState } from "react";
import { useParams } from "react-router-dom";
import investors from "../data/investors.json";
import Header from "../components/Header"; // ✅ Import Header
import "./InvestorsPage.css";
import backgroundImage from '../assets/shark7.jpg'; // Static background image

const InvestorsPage = () => {
  const { season } = useParams(); // Get season from URL
  const [selectedSeason, setSelectedSeason] = useState("season1"); // Default: Season 1
  const seasonInvestors = investors[selectedSeason] || [];

  return (
    <div
      className="investors-container"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundSize: "cover", // Ensure the image covers the full screen
        backgroundPosition: "center center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent image repetition
        minHeight: "100vh", // Full viewport height (minHeight to ensure it covers even with content)
        width: "100%", // Full width
        position: "relative", 
      }}
    >
      <Header /> {/* ✅ Add the Header component */}
      <div className="investors-content">
        <h1>Shark Tank India - Investors</h1>

        <div className="tabs-container">
          <div className="tabs">
            {Object.keys(investors).map((seasonKey) => (
              <button
                key={seasonKey}
                className={`tab ${selectedSeason === seasonKey ? "active" : ""}`}
                onClick={() => setSelectedSeason(seasonKey)}
              >
                {seasonKey.replace("season", "Season ")}
              </button>
            ))}
          </div>
        </div>

        {/* Investors List */}
        <div className="investors-list">
          {seasonInvestors.map((investor, index) => (
            <div key={index} className="investor-card">
              <div className="investor-image-container">
                <img
                  src={investor.image}
                  alt={investor.name}
                  className="investor-image investor-image-default"
                />
                <img
                  src={investor.hoverImage}
                  alt={investor.name}
                  className="investor-image investor-image-hover"
                />
              </div>
              <div className="investor-info">
                <h3>{investor.name}</h3>
                <p><strong>Company:</strong> {investor.company}</p>
                <p><strong>Designation:</strong> {investor.designation}</p>
                <p><strong>Born:</strong> {investor.born}</p>
                <p><strong>Education:</strong> {investor.education}</p>
                <a
                  href={investor.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="investor-website-link"
                >
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestorsPage;
