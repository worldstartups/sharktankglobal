import React from "react";
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
