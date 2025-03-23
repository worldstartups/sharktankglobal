import React, { useEffect, useState } from "react";
import popularData from "./PopularProducts.json"; // Import the JSON file
import "./PopularPage.css"; // Add styles
import Header from "../components/Header";

const PopularPage = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    setPopularProducts(popularData.popular || []);
  }, []);

  return (
    <div className="popular-page">
        <Header /> {/* ✅ Add Header component */}
      <h1>Popular Products</h1>
      <div className="product-list">
        {popularProducts.length === 0 ? (
          <p>No popular products found.</p>
        ) : (
          popularProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <a href={product.website} target="_blank" rel="noopener noreferrer">
                Visit Product
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularPage;
