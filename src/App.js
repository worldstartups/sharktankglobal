import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IndiaPage from "./pages/IndiaPage";
import InvestorsPage from "./pages/InvestorsPage"; 
import SeasonsPage from './pages/SeasonsPage'; // Import the SeasonPage component

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      <Route path="/india" element={<IndiaPage />} />
      <Route path="/seasons/:seasonId" element={<SeasonsPage />} /> {/* Dynamic route for seasons */}
      <Route path="/india/investors/:season" element={<InvestorsPage />} /> 
    </Routes>
  );
}

export default App;
