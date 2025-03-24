import React, { useState, useEffect } from "react";
import investorsData from "../data/investors.json";
import Header from "../components/Header";
import "./InvestorsPage.css";

const InvestorsPage = () => {
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    setInvestors(investorsData);
  }, []);

  return (
    <div className="investor-page">
      <Header />
      <h1>Our Investors</h1>

      <div className="investor-list">
        {investors.length === 0 ? (
          <p>No investors found.</p>
        ) : (
          investors.map((investor) => (
            <InvestorCard key={investor.name} investor={investor} />
          ))
        )}
      </div>
    </div>
  );
};

const InvestorCard = ({ investor }) => {
  const [hovered, setHovered] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const shortText = investor.bio?.slice(0, 150) || "";
  const longText = investor.bio || "";

  return (
    <div className="investor-card">
      <img
        src={investor.image} // ✅ Use only the main image (No hover effect)
        alt={investor.name}
        className="investor-image"
      />
      <h2>{investor.name}</h2>
      <p><strong>Company:</strong> {investor.company}</p>
      <p><strong>Designation:</strong> {investor.designation}</p>
      <p><strong>Born:</strong> {investor.born}</p>
      <p><strong>Education:</strong> {investor.education}</p>
      <p>{showMore ? longText : `${shortText}...`}</p>

      {longText.length > 150 && (
        <button className="show-more-btn" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}

      <a href={investor.websiteLink} target="_blank" rel="noopener noreferrer">
        Visit Profile
      </a>
    </div>
  );
};

export default InvestorsPage;
