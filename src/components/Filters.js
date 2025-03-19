import React from 'react';

function Filters() {
  return (
    <div className="filters">
      <label>Category:</label>
      <select>
        <option>All</option>
      </select>

      <label>Investor:</label>
      <select>
        <option>All</option>
      </select>

      <label>Valuation:</label>
      <select>
        <option>All</option>
        <option>₹0 - ₹100 Cr</option>
        <option>₹100 - ₹300 Cr</option>
        <option>₹300 - ₹500 Cr</option>
      </select>

      <label><strong>Count:</strong></label>
      <span id="companyCount">0</span>
    </div>
  );
}

export default Filters;
