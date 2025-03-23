import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import seasonsData from "../pages/SeasonsProducts.json"; 
 import "../components/Header.css";// ✅ Updated patimport "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
 
  // Fetch categories from SeasonsProducts.json
  useEffect(() => {
    const allCategories = new Set();
    Object.values(seasonsData).forEach((season) => {
      season.forEach((product) => {
        allCategories.add(product.category);
      });
    });
    setCategories([...allCategories]);
  }, []);

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        {/* Add logo if needed */}
      </div>

     

      {/* Navigation */}
      <nav className="nav-container">
    <div className="nav-links">
    <Link to="/" className="nav-link">Home</Link>
      <Link to="/allproducts" className="nav-link">All Products</Link>

      {/* Categories Dropdown */}
      <div className="dropdown">
        <Link to="/categories" className="nav-link">Categories</Link>
        <div className="dropdown-content">
          {categories.map((category, index) => (
            <Link key={index} to={`/categories/${category.toLowerCase()}`} className="dropdown-item">
              {category}
            </Link>
          ))}
        </div>
      </div>

     {/* Seasons Link (direct navigation to SeasonsPage.js) */}
     <Link to="/seasons" className="nav-link">Seasons</Link>

      <Link to="/popular" className="nav-link">Popular</Link>
      <Link to="/investors" className="nav-link">Investors</Link>
      <Link to="/more" className="nav-link">More</Link>
    </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search Products..." disabled />
      </div>
      </nav>
    </header>
  );
};

export default Header;
