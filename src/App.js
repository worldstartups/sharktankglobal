import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IndiaPage from "./pages/IndiaPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/india" element={<IndiaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
