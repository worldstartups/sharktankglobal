import React from "react";
import { useParams } from "react-router-dom";
import investors from "../data/investors.json"; // Ensure JSON file exists
import "./InvestorsPage.css";

const InvestorsPage = () => {
  const { season } = useParams(); // Get season from URL
  const seasonInvestors = investors[season] || [];

  return (
    <div className="investors-container">
      <h1>Investors  : {season.replace("season", "Season ")}</h1>
      <div className="investors-list">
        {seasonInvestors.map((investor, index) => (
          <div key={index} className="investor-card">
            {/* Image Section - Now on Top */}
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

            {/* Investor Details - Below Image */}
            <div className="investor-info">
              <h3>{investor.name}</h3>
              <p><strong>Company:</strong> {investor.company}</p>
              <p><strong>Designation:</strong> {investor.designation}</p>
              <p><strong>Born:</strong> {investor.born}</p>
              <p><strong>Education:</strong> {investor.education}</p>
              
              {/* Website Link */}
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
  );
};

export default InvestorsPage;
