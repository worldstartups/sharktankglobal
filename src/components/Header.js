import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import seasonsData from "../pages/SeasonsProducts.json"; 
import "../components/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // 🔹 Added for mobile menu

  // Fetch categories from JSON
  useEffect(() => {
    const allCategories = new Set();
    Object.values(seasonsData).forEach((season) => {
      season.forEach((product) => {
        allCategories.add(product.category);
      });
    });
    setCategories([...allCategories]);
  }, []);

  // Toggle dropdown on click
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // 🔹 Search Functionality (Fixed)
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const productMap = new Map();
    Object.values(seasonsData).forEach((season) => {
      season.forEach((product) => {
        if (
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !productMap.has(product.id) // Prevent duplicate IDs
        ) {
          productMap.set(product.id, product);
        }
      });
    });

    setSearchResults([...productMap.values()]);
  }, [searchQuery]);

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        Shark Tank India
      </div>

      {/* 🔹 Hamburger Menu for Mobile */}
      <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* 🔹 Desktop Navigation */}
      <nav className={`nav-container ${mobileMenuOpen ? "mobile-nav" : ""}`}>
        <div className="nav-links">
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/allproducts" className="nav-link" onClick={() => setMobileMenuOpen(false)}>All Products</Link>

          {/* Categories Dropdown */}
          <div 
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)} 
            onMouseLeave={() => setDropdownOpen(false)}
            onClick={toggleDropdown}
          >
            <span className="nav-link">Categories</span>
            <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
              {categories.map((category, index) => (
                <Link key={index} to={`/categories/${category.toLowerCase()}`} className="dropdown-item">
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/seasons" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Seasons</Link>
          <Link to="/popular" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Popular</Link>
          <Link to="/investors" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Investors</Link>
          <Link to="/more" className="nav-link" onClick={() => setMobileMenuOpen(false)}>More</Link>
        </div>

        {/* 🔹 Search Bar */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search Products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* 🔹 Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`} 
                  className="search-item"
                  onClick={() => setSearchQuery("")}
                >
                  {product.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
