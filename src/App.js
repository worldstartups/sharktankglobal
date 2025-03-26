import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InvestorsPage from "./pages/InvestorsPage"; 
import SeasonsPage from './pages/SeasonsPage';
import CategoryPage from "./pages/CategoryPage";  
import PopularPage from "./pages/PopularPage";
import AllProductsPage from "./pages/AllProductsPage"; 
import ContactPage from "./pages/ContactPage"; 
import ProductPage from "./pages/ProductPage";  



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      <Route path="/seasons" element={<SeasonsPage />} /> {/* Dynamic route for seasons */}
      <Route path="/investors" element={<InvestorsPage />} />  {/* Add the investor route */}
      <Route path="/categories/:categoryName" element={<CategoryPage key={window.location.pathname} />} />
      <Route path="/popular" element={<PopularPage />} /> {/* Category Page Route */}
      <Route path="/allproducts" element={<AllProductsPage />} /> {/* Add All Products route */}
      <Route path="/contact" element={<ContactPage />} /> {/* Add All Products route */}
      <Route path="/product/:id" element={<ProductPage />} /> {/* ✅ New Route */}
    </Routes>
  );
}

export default App;
