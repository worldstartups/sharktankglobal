import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './AllProductsPage.css';
import Header from "../components/Header";
import { FaEye } from "react-icons/fa";

const AllProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [seasonsData, setSeasonsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the seasons data to get available seasons and episodes
  useEffect(() => {
    const fetchSeasonsData = async () => {
      try {
        const response = await fetch('https://worldstartups.github.io/sharktankglobal/data/seasons.json');
        const data = await response.json();
        setSeasonsData(data.seasons);
      } catch (error) {
        console.error('Error fetching seasons data:', error);
      }
    };

    fetchSeasonsData();
  }, []);

  // Fetch all products dynamically from each SeasonX.json
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        let products = [];

        // Loop through each season and fetch its products
        for (const season of seasonsData) {
          const seasonResponse = await fetch(`https://worldstartups.github.io/sharktankglobal/data/Season${season.season}.json`);
          
          const text = await seasonResponse.text();
          console.log("Season data response text:", text);  // Log raw response

          try {
            const seasonData = JSON.parse(text); // Parse manually
            if (Array.isArray(seasonData.companies)) {
              products = [...products, ...seasonData.companies];
            }
          } catch (error) {
            console.error(`Error parsing Season ${season.season} data:`, error);
          }
        }

        setAllProducts(products);
        setLoading(false); // Stop loading once products are fetched
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    if (seasonsData.length > 0) {
      fetchAllProducts();
    }
  }, [seasonsData]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className="all-products-page">
      <Header />
      <h1>All Products</h1>
      <hr />
      <div className="product-list">
        {allProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          allProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
              <div className="product-card">
                {/* Product Image */}
                <img src={product.image} alt={product.product} className="product-image" />

                <div className="product-details">
                  <h2>{product.company}</h2>
                  <p><strong>Product:</strong> {product.product}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Sub-Category:</strong> {product.subcategory}</p>
                  
                </div>

                {/* View Button */}
                <div className="view-button">
                  <FaEye style={{ marginRight: "5px" }} /> View
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;

