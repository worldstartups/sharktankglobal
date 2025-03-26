import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import masterData from "./MasterData.json"; 
import Header from "../components/Header";
import "./CategoryPage.css";
import { FaEye } from "react-icons/fa"; 

const CategoryPage = () => {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Category changed to:", categoryName); // Debugging log

    // ✅ Filter products from MasterData.json
    const filteredProducts = masterData.companies.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );

    console.log("Filtered products:", filteredProducts); // Debugging log

    setProducts(filteredProducts); // ✅ Update state properly

  }, [categoryName]); // ✅ Runs every time category changes

  return (
    <div className="category-page">
      <Header />
      <h1>{categoryName.replace(/\b\w/g, (char) => char.toUpperCase())}</h1>
      <hr />

      <div className="product-list">
        {products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
              <div className="product-card">
                <img 
                  src={product.image || "/images/default.jpg"} // ✅ Use default image if missing
                  alt={product.name || "Product Image"} 
                />
                <h2>{product.company}</h2> {/* ✅ Show company name instead of product.name */}
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

export default CategoryPage;
