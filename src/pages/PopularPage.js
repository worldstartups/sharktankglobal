import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Header from "../components/Header";
import { FaEye } from "react-icons/fa";
import "./PopularPage.css";

// Function to dynamically import the season data
const importSeasonData = () => {
  return fetch('https://worldstartups.github.io/sharktankglobal/data/seasons.json')  // Load the seasons data
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch seasons data');
      }
      return response.json();
    })
    .then((seasonsData) => {
      console.log("Fetched Seasons Data:", seasonsData); // Log to inspect the data
      return seasonsData; // Return the data for further use
    })
    .catch((err) => {
      console.error('Error loading seasons data:', err);
      return null; // Return null if there's an error
    });
};

const PopularPage = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const popularEpisodes = [];
        
        // Fetch season data dynamically
        const seasonData = await importSeasonData();
        if (!seasonData) return; // If no data, exit

        // Loop through each popular season and fetch its products
        const popularSeasons = seasonData.popular;  // The popular seasons data

        for (let season of popularSeasons) {
          const seasonNumber = season.season;
          
          // Fetch specific season data (e.g., Season1.json, Season2.json)
          const seasonFile = `https://worldstartups.github.io/sharktankglobal/data/Season${seasonNumber}.json`;  // Updated URL for specific season file
          const seasonDetails = await fetch(seasonFile)
            .then((response) => response.json())
            .catch((err) => {
              console.error(`Error loading Season ${seasonNumber}:`, err);
              return null;
            });

          if (!seasonDetails) continue; // If no season details, skip this iteration

          // Log season details to check if the "companies" data is available
          console.log(`Season ${seasonNumber} Products:`, seasonDetails.companies);

          // Filter products that match popular episodes
          season.episodes.forEach((episodeNo) => {
            const episodeProduct = seasonDetails.companies.find(
              (product) => product.episode_no === episodeNo
            );
            if (episodeProduct) {
              popularEpisodes.push(episodeProduct);
            }
          });
        }

        setPopularProducts(popularEpisodes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching popular products:", error);
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className="popular-page">
      <Header /> {/* ✅ Add Header component */}
      <h1>Popular Products</h1>
      <div className="product-list">
        {loading ? (
          <p>Loading popular products...</p>
        ) : popularProducts.length === 0 ? (
          <p>No popular products found.</p>
        ) : (
          popularProducts.map((product) => (
            // Wrap the entire card in the Link component to make the whole card clickable
            <Link to={`/product/${product.id}`} className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h2>{product.company}</h2>
              <p>{product.product}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <div className="buy-button">
                <FaEye style={{ marginRight: "5px" }} /> View
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularPage;
