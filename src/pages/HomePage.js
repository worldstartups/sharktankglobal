import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homePageProductsData from "./HomePageProducts.json"; // ✅ Import JSON
import "./HomePage.css";
import Header from "../components/Header";
import AdsSection from "../components/AdsSection";
import PromotionsSection from "../components/PromotionsSection";

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [mostBoughtProducts, setMostBoughtProducts] = useState([]);
  const [editorsPick, setEditorsPick] = useState([]); // ✅ State for Editor's Pick

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentEditorIndex, setCurrentEditorIndex] = useState(0); // Editor's Pick
  
  useEffect(() => {
    if (homePageProductsData) {
      setFeaturedProducts(homePageProductsData.featured || []);
      setTrendingProducts(homePageProductsData.trending || []);
      setMostBoughtProducts(homePageProductsData.mostBought || []);
      setEditorsPick(homePageProductsData.editorsPick || []);
    }
  }, []);
  
  // 🔄 Move to next Featured Products slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };
  
  // 🔄 Move to previous Featured Products slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };
  
  // 🔄 Move to next Editor's Pick slide
  const nextEditorSlide = () => {
    setCurrentEditorIndex((prev) => (prev + 1) % editorsPick.length);
  };
  
  // 🔄 Move to previous Editor's Pick slide
  const prevEditorSlide = () => {
    setCurrentEditorIndex((prev) => (prev - 1 + editorsPick.length) % editorsPick.length);
  };
  
  return (
    <div className="home-page">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <h2>Explore Shark Tank India Products!</h2>
      </section>

      {/* 🔥 EDITORS Products Carousel */}
      <section className="featured-carousel">
      <h2>🔥 EDITOR'S PICK</h2>
      <div className="carousel-container">
        <button className="carousel-btn left" onClick={prevEditorSlide}>
          &#10094;
        </button>

        <div className="carousel-slide">
          {editorsPick.length > 0 && (
            <div className="trending-card">
              <img
                src={editorsPick[currentEditorIndex].image}
                alt={editorsPick[currentEditorIndex].name}
              />
              <h3>{editorsPick[currentEditorIndex].name}</h3>
              <p>{editorsPick[currentEditorIndex].description}</p>
              <button
                onClick={() =>
                  window.open(editorsPick[currentEditorIndex].website, "_blank")
                }
              >
                Buy Now
              </button>
            </div>
          )}
        </div>

        <button className="carousel-btn right" onClick={nextEditorSlide}>
          &#10095;
        </button>
      </div>
    </section>

      {/* 🔥 Featured Products Carousel */}
      <section className="featured-carousel">
        <h2>🔥 Featured Products</h2>
        <div className="carousel-container">
          <button className="carousel-btn left" onClick={prevSlide}>&#10094;</button>
          
          <div className="carousel-slide">
            {featuredProducts.length > 0 && (
              <div className="featured-card">
                <img src={featuredProducts[currentIndex].image} alt={featuredProducts[currentIndex].name} />
                <h3>{featuredProducts[currentIndex].name}</h3>
                <p>{featuredProducts[currentIndex].description}</p>
                <button onClick={() => window.open(featuredProducts[currentIndex].website, "_blank")}>
                  Buy Now
                </button>
              </div>
            )}
          </div>

          <button className="carousel-btn right" onClick={nextSlide}>&#10095;</button>
        </div>
      </section>

      {/* 🚀 Trending Products */}
      <section className="product-section">
        <h2>🚀 Trending Products</h2>
        <div className="product-container">
          {trendingProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button onClick={() => window.open(product.website, "_blank")}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 🏆 Most Bought Products */}
      <section className="product-section">
        <h2>🏆 Most Purchased Products</h2>
        <div className="product-container">
          {mostBoughtProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button onClick={() => window.open(product.website, "_blank")}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Ads & Promotions */}
      <AdsSection />
      <PromotionsSection />

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Shark Tank Global | Made in India ❤️</p>
      </footer>
    </div>
  );
};

export default HomePage;
