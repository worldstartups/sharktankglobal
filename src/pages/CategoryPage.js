import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link for navigation
import seasonsData from "./SeasonsProducts.json"; // Import products data
import Header from "../components/Header";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams(); // Get the category name from the URL
  const [products, setProducts] = useState([]);

  // Fetch products from SeasonsProducts.json based on category
  useEffect(() => {
    const filteredProducts = [];
    Object.values(seasonsData).forEach((season) => {
      season.forEach((product) => {
        if (product.category.toLowerCase() === categoryName.toLowerCase()) {
          filteredProducts.push(product);
        }
      });
    });
    setProducts(filteredProducts);
  }, [categoryName]);

  return (
    <div className="category-page">
      <Header />
      <h1>{categoryName.replace(/\b\w/g, char => char.toUpperCase())}</h1>

      
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={`/images/${product.image}`} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              
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

export default CategoryPage;
