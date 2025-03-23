import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/SeasonsProducts.json'); // Adjust if path is different
        const data = await response.json();

        // Collect unique categories from all seasons
        const categorySet = new Set();
        Object.keys(data).forEach((season) => {
          data[season].forEach((product) => {
            categorySet.add(product.category);
          });
        });

        // Convert set to array and set the state
        setCategories([...categorySet]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
      
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        <a href="/" className="nav-link">All Products</a>
        <a href="/categories" className="nav-link">Categories</a>

        {/* Seasons Dropdown */}
        <div className="dropdown">
          <a href="/seasons" className="nav-link">Seasons</a>
          <div className="dropdown-content">
            <a href="/seasons/1">Season 1</a>
            <a href="/seasons/2">Season 2</a>
            <a href="/seasons/3">Season 3</a>
            <a href="/seasons/4">Season 4</a>
          </div>
        </div>

        <a href="/popular" className="nav-link">Popular</a>
        <a href="/investors" className="nav-link">Investors</a>
        <a href="/more" className="nav-link">More</a>

        {/* Categories Dropdown */}
        <div className="category-dropdown">
          <a href="#" className="nav-link">Categories</a>
          <div className="dropdown-content">
            {categories.length === 0 ? (
              <p>Loading...</p>
            ) : (
              categories.map((category, index) => (
                <a href={`/category/${category}`} key={index}>{category}</a>
              ))
            )}
          </div>
        </div>
      </nav>

      {/* Search bar (Placeholder only) */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Products..."
          disabled
        />
        <button disabled>
          {/* Add search icon here if needed */}
        </button>
      </div>
    </header>
  );
};

export default Header;
