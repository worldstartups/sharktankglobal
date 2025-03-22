import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SeasonsPage.css'; // Add your styles
import axios from 'axios'; 

const SeasonsPage = () => {
  const { seasonId } = useParams(); // Get the seasonId from the URL
  const [products, setProducts] = useState([]);
  
   // Fetch the products from the SeasonsProducts.json file using .then()
   useEffect(() => {
    fetch('/seasonsProducts.json') // Adjust path if needed
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data[`season${seasonId}`] || []); // Set the products for the specific season
      })
      .catch((error) => {
        console.error('Error fetching season products:', error);
      });
  }, [seasonId]);

  return (
    <div className="season-page">
      <h1>Season {seasonId} Products</h1>
      
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products found for this season.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.id}>
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

export default SeasonsPage;
