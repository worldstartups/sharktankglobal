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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // 🔹 Search Functionality
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
          !productMap.has(product.id)
        ) {
          productMap.set(product.id, product);
        }
      });
    });

    setSearchResults([...productMap.values()]);
  }, [searchQuery]);

  return (
    <header className="header">
      {/* 🔹 Hamburger for Mobile */}
      <button className="hamburger" onClick={toggleMobileMenu}>
        ☰
      </button>

      {/* 🔹 Mobile Menu (Hidden by default) */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        {/* 🔹 Search inside Mobile Menu */}
        <div className="mobile-search-container">
          <input 
            type="text" 
            placeholder="Search Products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* 🔹 Search Results in Mobile Menu */}
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`} 
                  className="search-item"
                  onClick={() => {
                    setSearchQuery("");
                    setMobileMenuOpen(false); // Close menu on selection
                  }}
                >
                  {product.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Home</Link>
        <Link to="/allproducts" className="nav-link" onClick={toggleMobileMenu}>All Products</Link>
        <Link to="/seasons" className="nav-link" onClick={toggleMobileMenu}>Seasons</Link>
        <Link to="/popular" className="nav-link" onClick={toggleMobileMenu}>Popular</Link>
        <Link to="/investors" className="nav-link" onClick={toggleMobileMenu}>Investors</Link>
        <Link to="/contact" className="nav-link" onClick={toggleMobileMenu}>Contact</Link>
        <Link to="/more" className="nav-link" onClick={toggleMobileMenu}>More</Link>
      </div>

      {/* 🔹 Desktop Navigation (Unchanged) */}
      <nav className="nav-container">
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/allproducts" className="nav-link">All Products</Link>

          {/* Categories Dropdown */}
          <div className="dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)} onClick={toggleDropdown}>
            <span className="nav-link">Categories</span>
            <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
              {categories.map((category, index) => (
                <Link key={index} to={`/categories/${category.toLowerCase()}`} className="dropdown-item">
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/seasons" className="nav-link">Seasons</Link>
          <Link to="/popular" className="nav-link">Popular</Link>
          <Link to="/investors" className="nav-link">Investors</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/more" className="nav-link">More</Link>
        </div>

        {/* 🔹 Search Bar (Desktop - Unchanged) */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search Products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* 🔹 Search Results Dropdown (Desktop) */}
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`} 
                  className="search-item"
                  onClick={() => setSearchQuery("")} // Clear search on click
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
