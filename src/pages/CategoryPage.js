import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";// Import the SeasonsProducts.json file
import seasonsData from './SeasonsProducts.json';// Add any styling as necessary

const CategoryPage = () => {
  const { categoryName } = useParams(); // Get the category name from the URL
  const [products, setProducts] = useState([]);

  // Fetch products from SeasonsProducts.json based on category
  useEffect(() => {
    const filteredProducts = [];
    // Loop through all seasons and filter the products by category
    Object.values(seasonsData).forEach(season => {
      season.forEach(product => {
        if (product.category.toLowerCase() === categoryName.toLowerCase()) {
          filteredProducts.push(product);
        }
      });
    });
    setProducts(filteredProducts);
  }, [categoryName]);

  return (
    <div className="category-page">
      <h1>{categoryName} Products</h1>
      
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          products.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={`/images/${product.image}`} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <a href={product.website} target="_blank" rel="noopener noreferrer">Visit Product</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
