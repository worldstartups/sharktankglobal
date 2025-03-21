import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IndiaPage from "./pages/IndiaPage";
import InvestorsPage from "./pages/InvestorsPage"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/india" element={<IndiaPage />} />
      <Route path="/india/investors/:season" element={<InvestorsPage />} /> 
    </Routes>
  );
}

export default App;
