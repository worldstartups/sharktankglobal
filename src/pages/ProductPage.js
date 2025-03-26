import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import masterData from "./MasterData.json";
import Header from "../components/Header";
import "./ProductPage.css";

// ✅ Import the image dynamically
import cosiqImage from "../assets/season1images/cosiq.jpg"; 

const ProductPage = () => {
  const { id } = useParams();
  const [storyContent, setStoryContent] = useState(null);

  // Find the product by ID
  const product = masterData.companies.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (product?.story_link) {
      fetch(product.story_link)
        .then((res) => res.text())
        .then((html) => setStoryContent(html))
        .catch((err) => console.error("Failed to load story:", err));
    }
  }, [product?.story_link]);

  if (!product) {
    return (
      <div>
        <Header />
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="product-container">
        <div className="product-details">
          <h1>{product.company}</h1>
          <hr />





          <p><strong>Company:</strong> {product.company}</p>
          <p><strong>Product:</strong> {product.product}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Sub-Category:</strong> {product.subcategory}</p>
          <p><strong>City:</strong> {product.city}, {product.state}</p>
          <p><strong>Founders:</strong> {product.founders?.join(", ")}</p>
          <p><strong>Investors:</strong> {product.investors?.join(", ")}</p>
          <p><strong>Valuation:</strong> ₹{product.valuation.toLocaleString()}</p>
          <p><strong>Original Ask:</strong> {product.original_ask_equity}</p>
          <p><strong>Final Deal:</strong> {product.final_equity}</p>
          <p>
            <strong>Season:</strong> {product.season_no} |  
            <strong>Episode:</strong> {product.episode_no} |  
            <strong>Date:</strong> {product.episode_air_date}
          </p>

          <img
        src={product.image} // ✅ Use only the main image (No hover effect)
        alt={product.name}
        className="product-image"
      />

          {/* Story Below Image */}
          {product.story ? (
            <div className="story-container" dangerouslySetInnerHTML={{ __html: product.story }} />
          ) : (
            <p>No detailed story available.</p>
          )}

          {/* Buy Now Button */}
          <button className="buy-now-button">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
