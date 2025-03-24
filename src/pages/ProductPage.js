import React from "react";
import { useParams } from "react-router-dom";
import seasonsData from "./SeasonsProducts.json";
import Header from "../components/Header";
import "./ProductPage.css"; // Add styling as needed

const ProductPage = () => {
  const { id } = useParams(); // Get product ID from URL
  let product = null;

  // Loop through seasons to find the product by ID
  Object.values(seasonsData).forEach((season) => {
    const foundProduct = season.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      product = foundProduct;
    }
  });

  // If product not found
  if (!product) {
    return (
      <div>
        <Header />
        <h2>Product not found</h2>
      </div>
    );
  }

  // Function to handle "Buy Now" button click
  const handleBuyNow = () => {
    if (product.website) {
      window.open(product.website, "_blank"); // Open link in a new tab
    } else {
      alert("Product link not available");
    }
  };

  return (
    <div>
      <Header />
      <div className="product-container">
        <img src={`/images/${product.image}`} alt={product.name} className="product-image" />
        <div className="product-details">
          <h1>{product.name}</h1>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Sub-Category:</strong> {product.subCategory}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Investors:</strong> {product.investors}</p>
          <p><strong>Valuation:</strong> ${product.valuation.toLocaleString()}</p>
          <p><strong>Episode:</strong> {product.episode} | <strong>Date:</strong> {product.date}</p>

          {/* ✅ Always show Buy Now button */}
          <button 
            className="buy-now-button" 
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
