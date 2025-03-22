import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
       
        backgroundSize: 'cover', // Ensure it covers the screen
        backgroundPosition: 'center center', // Center the image
        backgroundRepeat: 'no-repeat', // Don't repeat the image
        height: '100vh', // Full viewport height
      }}
    >
      <header className="home-header">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          
        </div>

        {/* Navigation */}
        <nav className="home-nav">
          <Link to="/" className="nav-link">All Products</Link>
          <Link to="/seasons" className="nav-link">Categories</Link>
           {/* Seasons Dropdown */}
         <div className="dropdown">
            <Link to="/seasons" className="nav-link">Seasons</Link>
            <div className="dropdown-content">
              <Link to="/seasons/1" className="dropdown-item">Season 1</Link>
              <Link to="/seasons/2" className="dropdown-item">Season 2</Link>
              <Link to="/seasons/3" className="dropdown-item">Season 3</Link>
              <Link to="/seasons/4" className="dropdown-item">Season 4</Link>
            </div>
          </div>
          <Link to="/popular" className="nav-link">Popular</Link>
          <Link to="/investors" className="nav-link">Investors</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/more" className="nav-link">More</Link>
        </nav>

        

     
        {/* Search bar (Placeholder only) */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Products..."
            disabled
          />
        </div>
      </header>

      

      {/* Hero Section */}
      <section className="hero">
        <h2>Explore Shark Tank Startups from Around the World!</h2>
      </section>

      {/* Featured Section */}
      <div className="featured-section">
        <div className="featured-show" onClick={() => navigate("/india")}>
          <h3>Popular 1</h3>
          <p>Explore the most exciting startups from India.</p>
        </div>
        <div className="featured-show" onClick={() => navigate("/us")}>
          <h3>Popular 2</h3>
          <p>Discover groundbreaking businesses from the USA.</p>
        </div>
        <div className="featured-show" onClick={() => navigate("/australia")}>
          <h3>Popular 3</h3>
          <p>See the most innovative companies from Australia.</p>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Shark Tank Global | Made in india ❤️</p>
      </footer>
    </div>
  );
};

export default HomePage;
