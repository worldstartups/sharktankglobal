import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import sharkImage from '../assets/shark9.jpg'; 

const HomePage = () => {
  const navigate = useNavigate();
  const [background, setBackground] = useState(sharkImage); 

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = sharkImage; // Preload the background image

    // Once the image is loaded, set the background image
    preloadImage.onload = () => {
      setBackground(sharkImage);
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center center', 
        backgroundRepeat: 'no-repeat', 
        height: '150vh', 
        width: '100%', 
        objectFit: 'cover', 
      }}
    >
      <header>
        <div className="nav-buttons">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <div className="dropdown">
            <select onChange={(e) => navigate(e.target.value)}>
              <option value="#">Country</option>
              <option value="/india">India</option>
              <option value="/us">USA</option>
              <option value="/australia">Australia</option>
            </select>
          </div>
        </div>
      </header>

      <section className="hero">
        <h2>Explore Shark Tank Startups from Around the World!</h2>
        <p>Discover groundbreaking startups, their investments, and their current status across various Shark Tank editions worldwide.</p>
      </section>

      <div className="featured-section">
        <div className="featured-show" onClick={() => navigate("/india")}>
          <h3>Shark Tank India</h3>
          <p>Explore the most exciting startups from India.</p>
        </div>
        <div className="featured-show" onClick={() => navigate("/us")}>
          <h3>Shark Tank US</h3>
          <p>Discover groundbreaking businesses from the USA.</p>
        </div>
        <div className="featured-show" onClick={() => navigate("/australia")}>
          <h3>Shark Tank Australia</h3>
          <p>See the most innovative companies from Australia.</p>
        </div>
      </div>

      <footer style={{ marginTop: 'auto', textAlign: 'center' }}>
        <p>&copy; 2025 Shark Tank Global | Made in INDIA ❤️</p>
      </footer>
    </div>
  );
};

export default HomePage;
