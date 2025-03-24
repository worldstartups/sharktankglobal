import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import seasonsData from "./SeasonsProducts.json"; 
import Header from "../components/Header";
import "./CategoryPage.css";
import { FaShoppingCart } from "react-icons/fa"; 

const CategoryPage = () => {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Category changed to:", categoryName); // Debugging log

    // ✅ Reset products before updating
    setProducts([]);

    // ✅ Fetch only products of the selected category
    const filteredProducts = Object.values(seasonsData)
      .flatMap((season) => season)
      .filter((product) => product.category.toLowerCase() === categoryName.toLowerCase());

    console.log("Filtered products:", filteredProducts); // Debugging log

    setProducts(filteredProducts); // ✅ Update state properly

  }, [categoryName]); // ✅ Runs every time category changes

  return (
    <div className="category-page">
      <Header />
      <h1>{categoryName.replace(/\b\w/g, (char) => char.toUpperCase())}</h1>

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

export default CategoryPage;