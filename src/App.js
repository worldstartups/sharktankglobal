import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IndiaPage from "./pages/IndiaPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/india" element={<IndiaPage />} />
    </Routes>
  );
}

export default App;
