import React, { useEffect, useState } from "react";
import seasonsData from "./SeasonsProducts.json"; // Import products data
import "./AllProductsPage.css"; // Add styles

const AllProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // Flatten all products from different seasons into one array
    const products = [];
    Object.values(seasonsData).forEach(season => {
      products.push(...season);
    });

    setAllProducts(products);
  }, []);

  return (
    <div className="all-products-page">
      <h1>All Products</h1>
      <div className="product-list">
        {allProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          allProducts.map((product) => (
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

export default AllProductsPage;
