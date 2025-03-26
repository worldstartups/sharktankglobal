import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './SeasonsPage.css'; 
import Header from "../components/Header"; 
import { FaEye } from "react-icons/fa";

const SeasonsPage = () => {
  const [seasonsData, setSeasonsData] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("1"); // Default to Season 1
  const [selectedEpisode, setSelectedEpisode] = useState("All"); // Default to All Episodes

  useEffect(() => {
    fetch('https://worldstartups.github.io/sharktankglobal/data/seasons.json')
      .then((response) => response.json())
      .then((data) => {
        setSeasonsData(data.seasons);
        const defaultSeason = data.seasons.find(season => season.season === 1);
        if (defaultSeason) {
          setEpisodes(defaultSeason.episodes);
        }
      })
      .catch((error) => console.error("Error fetching seasons data:", error));
  }, []);

  useEffect(() => {
    if (selectedSeason) {
      const seasonInfo = seasonsData.find(season => season.season.toString() === selectedSeason);
      setEpisodes(seasonInfo ? seasonInfo.episodes : []);

      const seasonFile = `https://worldstartups.github.io/sharktankglobal/data/Season${selectedSeason}.json`;
      fetch(seasonFile)
        .then((response) => response.json())
        .then((data) => setProducts(data.companies))
        .catch((error) => console.error(`Error fetching Season${selectedSeason} data:`, error));
    }
  }, [selectedSeason, seasonsData]);

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

      <div className="tabs-container">
        <div className="seasons-dropdown">
          <select id="season-select" value={selectedSeason} onChange={handleSeasonChange}>
            {seasonsData.map((season) => (
              <option key={season.season} value={season.season}>
                Season {season.season}
              </option>
            ))}
          </select>
        </div>

        {selectedSeason && (
          <div className="episodes-dropdown">
            <select id="episode-select" value={selectedEpisode} onChange={handleEpisodeChange}>
              <option value="All">All Episodes</option>
              {episodes.map((episode) => (
                <option key={episode} value={episode}>
                  Episode {episode}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="product-list">
      {episodes
  .filter(ep => selectedEpisode === "All" || ep.toString() === selectedEpisode)
  .map((episode) => {
    const episodeProducts = products.filter(product => product.episode_no.toString() === episode.toString());

          if (episodeProducts.length === 0) return null; // Skip empty episodes

          return (
            <div key={episode} className="episode-section">
              <h2 className="episode-header">Season {selectedSeason} Episode {episode}</h2>
              <hr className="episode-divider" />
              <div className="episode-products">
                {episodeProducts.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                    <div className="product-card-content">
                      <img src={product.image} alt={product.company} />
                      <h2>{product.company}</h2>
                      <p>{product.product}</p>
                      <p><strong>Category:</strong> {product.category}</p>
                      <p><strong>Investors:</strong> {Array.isArray(product.investors) ? product.investors.join(", ") : "No Investors"}</p>
                      <p><strong>Valuation:</strong> ₹{product.valuation.toLocaleString()}</p>
                      <button className="view-button">
                        <FaEye style={{ marginRight: "5px" }} /> View
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeasonsPage;
