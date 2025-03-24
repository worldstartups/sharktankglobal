import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import seasonsData from "./SeasonsProducts.json";
import "./AllProductsPage.css"; 
import Header from "../components/Header";
import { FaShoppingCart } from "react-icons/fa"; 

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
      <Header /> {/* ✅ Add Header component */}
      <h1>All Products</h1>
      <div className="product-list">
        {allProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          allProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={`/images/${product.image}`} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              
              {/* ✅ Updated "Buy" button to navigate to ProductPage */}
                          <Link to={`/product/${product.id}`} className="buy-button">
                <FaShoppingCart style={{ marginRight: "5px" }} /> Buy
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;
