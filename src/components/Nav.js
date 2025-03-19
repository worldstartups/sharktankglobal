import React from 'react';

function Nav() {
  return (
    <nav className="nav">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/investors">Investors</a>
      <select>
        <option>Country</option>
        <option>India</option>
        <option>USA</option>
        <option>Australia</option>
      </select>
    </nav>
  );
}

export default Nav;
