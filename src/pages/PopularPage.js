import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import popularData from "./PopularProducts.json"; // Import the JSON file
import "./PopularPage.css"; 
import Header from "../components/Header";
import { FaEye } from "react-icons/fa"; 

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
            <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
              <div className="product-card">
                <img src={`/images/${product.image}`} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p><strong>Category:</strong> {product.category}</p>

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

export default PopularPage;
