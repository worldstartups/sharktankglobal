import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import masterData from "./MasterData.json";
import "./AllProductsPage.css"; 
import Header from "../components/Header";
import { FaEye } from "react-icons/fa"; 

const AllProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const products = [];

    if (Array.isArray(masterData.companies)) {
      products.push(...masterData.companies); // ✅ Now correctly accessing "companies"
    } else {
      console.warn("Invalid data format:", masterData);
    }

    setAllProducts(products);
  }, []);

  return (
    <div className="all-products-page">
      <Header />
      <h1>All Products</h1>
      <div className="product-list">
        {allProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          allProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
              <div className="product-card">
                <h2>{product.product}</h2>
                <p><strong>Company:</strong> {product.company}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Sub-Category:</strong> {product.subcategory}</p>

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
