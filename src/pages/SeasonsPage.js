import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; // Import Link for navigation
import './SeasonsPage.css'; 
import seasonsData from './SeasonsProducts.json'; 
import Header from "../components/Header"; 

const SeasonsPage = () => {
  const [products, setProducts] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("1"); 
  const [selectedEpisode, setSelectedEpisode] = useState("All"); 

  useEffect(() => {
    const allSeasons = Object.keys(seasonsData).map((seasonKey) => seasonKey.replace("season", ""));
    setSeasons(allSeasons);
  }, []);

  useEffect(() => {
    if (selectedSeason === "All") {
      const allProducts = [];
      Object.values(seasonsData).forEach(season => allProducts.push(...season));
      setProducts(allProducts);
    } else {
      setProducts(seasonsData[`season${selectedSeason}`] || []);
    }
  }, [selectedSeason]);

  useEffect(() => {
    if (selectedSeason !== "All") {
      const seasonEpisodes = seasonsData[`season${selectedSeason}`]?.map(product => product.episode) || [];
      setEpisodes([...new Set(seasonEpisodes)]);
    }
  }, [selectedSeason]);

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
    setSelectedEpisode("All");
  };

  const handleEpisodeChange = (event) => {
    setSelectedEpisode(event.target.value);
  };

  return (
    <div className="season-page">
      <Header />

      <h1>{selectedSeason === "All" ? "All Seasons" : `Season ${selectedSeason} Products`}</h1>

      {/* Wrapper for the Seasons and Episodes dropdowns */}
      <div className="tabs-container">
        {/* Seasons Dropdown */}
        <div className="seasons-dropdown">
          <select id="season-select" value={selectedSeason} onChange={handleSeasonChange}>
            <option value="All">All Seasons</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                Season {season}
              </option>
            ))}
          </select>
        </div>

        {/* Episodes Dropdown (only shows for selected season) */}
        {selectedSeason !== "All" && (
          <div className="episodes-dropdown">
            <select id="episode-select" value={selectedEpisode} onChange={handleEpisodeChange}>
              <option value="All">All Episodes</option>
              {episodes.map((episode, index) => (
                <option key={index} value={episode}>
                  Episode {episode}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Product List */}
      <div className="product-list">
        {products.filter(product => selectedEpisode === "All" || product.episode === selectedEpisode).length === 0 ? (
          <p>No products found for this season or episode.</p>
        ) : (
          products.filter(product => selectedEpisode === "All" || product.episode === selectedEpisode).map((product) => (
            <div className="product-card" key={product.id}>
              <img src={`/images/${product.image}`} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Investors:</strong> {product.investors}</p>
              <p><strong>Valuation:</strong> ${product.valuation.toLocaleString()}</p>
              
              {/* ✅ Updated "Buy" button to navigate to ProductPage */}
              <Link to={`/product/${product.id}`} className="buy-button">
                Buy
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SeasonsPage;
