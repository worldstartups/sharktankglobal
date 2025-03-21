import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./IndiaPage.css";
import companies from "../data/companies.json";
import Header from "../components/Header"; // ✅ Import the Header component
import sharkImage from '../assets/shark8.jpg'; // Import the image directly if needed

const IndiaPage = () => {
  const [activeTab, setActiveTab] = useState("season1");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({
    company: "",
    category: "",
    subCategory: "",
    investor: "",
    minValuation: "",
    maxValuation: "",
  });
  const [background, setBackground] = useState(""); // State for the background image

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = sharkImage; // Preload the background image
    preloadImage.onload = () => {
      setBackground(sharkImage); // Once loaded, set the background
    };
  }, []); // Runs only once on component mount

  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSeasonChange = (season) => {
    setActiveTab(season);
    setFilters({
      company: "",
      category: "",
      subCategory: "",
      investor: "",
      minValuation: "",
      maxValuation: "",
    });
  };

  const uniqueCategories = [...new Set(companies[activeTab]?.map((c) => c.category))];
  const uniqueSubCategories = [...new Set(companies[activeTab]?.map((c) => c.subCategory))];
  const uniqueInvestors = [...new Set(companies[activeTab]?.flatMap((c) => c.investor.split(", ")))];

  const filteredCompanies = (companies[activeTab] || []).filter((company) => {
    const matchesCompany = company.name.toLowerCase().includes(filters.company.toLowerCase());
    const matchesCategory = !filters.category || company.category === filters.category;
    const matchesSubCategory = !filters.subCategory || company.subCategory === filters.subCategory;
    const matchesInvestor = !filters.investor || company.investor.includes(filters.investor);

    const companyValuation = parseFloat(company.valuation.replace(/[^0-9.]/g, "")) || 0;
    const minVal = filters.minValuation ? parseFloat(filters.minValuation) : 0;
    const maxVal = filters.maxValuation ? parseFloat(filters.maxValuation) : Infinity;
    const matchesValuation = companyValuation >= minVal && companyValuation <= maxVal;

    return matchesCompany && matchesCategory && matchesSubCategory && matchesInvestor && matchesValuation;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortColumn) {
      let valueA = a[sortColumn]?.toString().toLowerCase();
      let valueB = b[sortColumn]?.toString().toLowerCase();

      if (sortColumn === "valuation") {
        valueA = parseFloat(valueA.replace(/[^0-9.]/g, "")) || 0;
        valueB = parseFloat(valueB.replace(/[^0-9.]/g, "")) || 0;
      }

      return sortOrder === "asc"
        ? valueA.localeCompare(valueB, undefined, { numeric: true })
        : valueB.localeCompare(valueA, undefined, { numeric: true });
    }
    return 0;
  });

  return (
    <div
      className="india-container"
      style={{
        backgroundImage: `url(${background})`, // Dynamically set the background image
        backgroundSize: "cover", // Ensures it covers the whole screen
        backgroundPosition: "center center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        height: "100vh", // Full viewport height
      }}
    >
      {/* ✅ Use Header Component */}
      <Header />

      {/* Page Title & Investors Button */}
      <div className="header-container">
        <h1 className="page-title">Shark Tank India Startups</h1>
        <Link to={`/india/investors/${activeTab}`} className="view-investors-btn">
          Investors
        </Link>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["season1", "season2", "season3", "season4"].map((season) => (
          <button
            key={season}
            className={activeTab === season ? "tab active" : "tab"}
            onClick={() => handleSeasonChange(season)}
          >
            {season.replace("season", "Season ")}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="filters">
        <input type="text" name="company" placeholder="Search Company" value={filters.company} onChange={handleFilterChange} />
        
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select name="subCategory" value={filters.subCategory} onChange={handleFilterChange}>
          <option value="">All</option>
          {uniqueSubCategories.map((sub) => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>

        <select name="investor" value={filters.investor} onChange={handleFilterChange}>
          <option value="">All</option>
          {uniqueInvestors.map((inv) => (
            <option key={inv} value={inv}>{inv}</option>
          ))}
        </select>

        <input type="number" name="minValuation" placeholder="Min Valuation (Cr)" value={filters.minValuation} onChange={handleFilterChange} />
        <input type="number" name="maxValuation" placeholder="Max Valuation (Cr)" value={filters.maxValuation} onChange={handleFilterChange} />
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: "50px", textAlign: "left" }}>S.No</th>
              {["name", "category", "subCategory", "investor", "valuation"].map((column) => (
                <th key={column} onClick={() => handleSort(column)} style={{ cursor: "pointer" }}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  {sortColumn === column ? (sortOrder === "asc" ? " ▲" : " ▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedCompanies.length > 0 ? (
              sortedCompanies.map((company, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "left", fontWeight: "bold" }}>{index + 1}</td>
                  <td>{company.name}</td>
                  <td>{company.category}</td>
                  <td>{company.subCategory}</td>
                  <td>{company.investor}</td>
                  <td>{company.valuation}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No Data Available</td>
              </tr>
            )}
          </tbody>
        </table>
        <footer style={{ marginTop: 'auto', textAlign: 'center' }}>
        <p>&copy; 2025 Shark Tank Global | Made in INDIA ❤️</p>
      </footer>
      </div>
    </div>
  );
};

export default IndiaPage;
