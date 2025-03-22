import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        <h1>Shark Tank Global</h1>
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
      </nav>

      {/* Search bar (Placeholder only) */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Products..."
          disabled
        />
        <button disabled>
          <FaSearch />
        </button>
      </div>

      {/* Cart & User Icons */}
      <div className="header-icons">
        <FaShoppingCart className="icon" />
        <FaUser className="icon" />
      </div>
    </header>
  );
};

export default Header;
