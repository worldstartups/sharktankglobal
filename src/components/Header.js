import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/Header.css";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // 🔹 Fetch seasons and products data from JSON files
  useEffect(() => {
    const fetchSeasonsData = async () => {
      try {
        const seasonsResponse = await fetch("/data/seasons.json");
        const seasons = await seasonsResponse.json();
        console.log("Seasons Data:", seasons);

        const allCategories = new Set();
        let allProductsData = [];

        for (let season of seasons.seasons) {
          const seasonNumber = season.season;
          const seasonDataResponse = await fetch(`/data/Season${seasonNumber}.json`);
          const seasonData = await seasonDataResponse.json();

          seasonData.companies.forEach((product) => {
            if (product.category) {
              allCategories.add(product.category);
            }
            allProductsData.push(product);
          });
        }

        setCategories([...allCategories]);
        setAllProducts(allProductsData);
        console.log("All Products Data:", allProductsData);
      } catch (error) {
        console.error("Error fetching season data:", error);
      }
    };

    fetchSeasonsData();
  }, []);

  // 🔹 Handle Search Query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    console.log("Search Query:", query);

    const filteredResults = allProducts.filter((product) => {
      const productNameMatch = product.product.toLowerCase().includes(query);
      const companyNameMatch = product.company.toLowerCase().includes(query);
      const categoryMatch = product.category.toLowerCase().includes(query);
      const subcategoryMatch = product.subcategory.toLowerCase().includes(query);

      return productNameMatch || companyNameMatch || categoryMatch || subcategoryMatch;
    });

    setSearchResults(filteredResults);
    console.log("Filtered Results:", filteredResults);
  };

  // 🔹 Handle Product Selection
  const handleProductSelect = (productId) => {
    setSearchQuery("");
    setSearchResults([]);
  };

  // 🔹 Toggle dropdown on click
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // 🔹 Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      {/* 🔹 Hamburger for Mobile */}
      <button className="hamburger" onClick={toggleMobileMenu}>
        ☰
      </button>

      {/* 🔹 Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Home</Link>
        <Link to="/allproducts" className="nav-link" onClick={toggleMobileMenu}>All Products</Link>
        <Link to="/seasons" className="nav-link" onClick={toggleMobileMenu}>Seasons</Link>
        <Link to="/popular" className="nav-link" onClick={toggleMobileMenu}>Popular</Link>
        <Link to="/investors" className="nav-link" onClick={toggleMobileMenu}>Investors</Link>
        <Link to="/contact" className="nav-link" onClick={toggleMobileMenu}>Contact</Link>
        <Link to="/more" className="nav-link" onClick={toggleMobileMenu}>More</Link>

        {/* 🔹 Search in Mobile Menu */}
        <div className="mobile-search">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for company or product"
          />
          {searchQuery && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.slice(0, 10).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="search-item"
                  onClick={() => handleProductSelect(product.id)}  // Close results on select
                >
                  <strong>{product.company}</strong> - {product.product}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Desktop Navigation */}
      <nav className="nav-container">
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/allproducts" className="nav-link">All Products</Link>

          {/* 🔹 Categories Dropdown */}
          <div className="dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)} onClick={toggleDropdown}>
            <span className="nav-link">Categories</span>
            <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <Link key={index} to={`/categories/${category.toLowerCase()}`} className="dropdown-item">
                    {category}
                  </Link>
                ))
              ) : (
                <p>No categories available</p>
              )}
            </div>
          </div>

          <Link to="/seasons" className="nav-link">Seasons</Link>
          <Link to="/popular" className="nav-link">Popular</Link>
          <Link to="/investors" className="nav-link">Investors</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/more" className="nav-link">More</Link>
        </div>

        {/* 🔹 Search Bar (Desktop Only) */}
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for company or product"
            className="search-input"
          />
          
          {searchQuery && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.slice(0, 10).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="search-item"
                  onClick={() => handleProductSelect(product.id)}  // Close results on select
                >
                  <strong>{product.company}</strong> - {product.product}
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
