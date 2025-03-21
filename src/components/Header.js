import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="nav-buttons">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <div className="dropdown">
          <select onChange={(e) => navigate(e.target.value)}>
            <option value="#">Country</option>
            <option value="/india">India</option>
            <option value="/us">USA</option>
            <option value="/australia">Australia</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
