import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <header>
        <div className="nav-buttons">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/investors">Investors</a>
          <div className="dropdown">
            <select onChange={(e) => (window.location.href = e.target.value)}>
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
        <div className="featured-show" onClick={() => (window.location.href = "/india")}>
          <h3>Shark Tank India</h3>
          <p>Explore the most exciting startups from India.</p>
        </div>
        <div className="featured-show" onClick={() => (window.location.href = "/us")}>
          <h3>Shark Tank US</h3>
          <p>Discover groundbreaking businesses from the USA.</p>
        </div>
        <div className="featured-show" onClick={() => (window.location.href = "/australia")}>
          <h3>Shark Tank Australia</h3>
          <p>See the most innovative companies from Australia.</p>
        </div>
      </div>

      <footer>
        <p>&copy; 2025 Shark Tank Global | Made in India ❤️</p>
      </footer>
    </div>
  );
};

export default HomePage;
