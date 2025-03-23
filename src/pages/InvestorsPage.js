import React, { useState, useEffect } from "react";
import investorsData from "../data/investors.json";  // Import the investors data from the correct path
import "./InvestorsPage.css";  // Optional: Add styles for this page

const InvestorsPage = () => {
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    // Fetch investors data (if you're using static data in the json)
    setInvestors(investorsData);
  }, []);

  return (
    <div className="investor-page">
      <h1>Our Investors</h1>

      <div className="investor-list">
        {investors.length === 0 ? (
          <p>No investors found.</p>
        ) : (
          investors.map((investor, index) => (
            <div className="investor-card" key={index}>
            <img src={investor.image} alt={investor.name} />
            <h2>{investor.name}</h2>
            <p><strong>Company:</strong> {investor.company}</p>
            <p><strong>Designation:</strong> {investor.designation}</p>
            <p><strong>Born:</strong> {investor.born}</p>
            <p><strong>Education:</strong> {investor.education}</p>
            <a href={investor.websiteLink} target="_blank" rel="noopener noreferrer">Visit Profile</a>
          </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InvestorsPage;
