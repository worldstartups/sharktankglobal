import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IndiaPage from "./pages/IndiaPage";
import InvestorsPage from "./pages/InvestorsPage"; 

function App() {
  return (
    <Routes>
    <Route path="/sharktankglobal" element={<HomePage />} />
    <Route path="/sharktankglobal/india" element={<IndiaPage />} />
    <Route path="/sharktankglobal/india/investors/:season" element={<InvestorsPage />} />
  </Routes>
  );
}

export default App;
