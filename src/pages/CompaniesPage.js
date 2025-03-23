import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CompaniesPage.css";
import Header from "../components/Header";

const CompaniesPage = () => {
  const { country } = useParams();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Fetch JSON data for the selected country
    fetch(`/data/${country}.json`)
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error("Error fetching companies:", error));
  }, [country]);

  return (
    <div className="companies-page">
      <Header />
      <h2>Shark Tank {country.charAt(0).toUpperCase() + country.slice(1)}</h2>
      <div className="company-list">
        {companies.map((company, index) => (
          <div key={index} className="company-card">
            <h3>{company.name}</h3>
            <p>{company.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesPage;
