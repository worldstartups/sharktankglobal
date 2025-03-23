import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import seasonsData from "./SeasonsProducts.json"; // Import the SeasonsProducts.json file
import "./HomePage.css";
import ContactPage from "./ContactPage";
import Header from "../components/Header";


const HomePage = () => {
  const navigate = useNavigate();
  
  

  return (
 

      <div className="home-page">
              <Header /> {/* ✅ Add Header component */}
            <h1>All Products</h1>

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
        <p>&copy; 2025 Shark Tank Global | Made in India ❤️</p>
      </footer>
    </div>
  );
};

export default HomePage;
