import React, { useState } from 'react';

const Search = ({ isOpen, toggleSearch }) => {
  return (
    <div className={`search-container ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSearch}>×</button>
      <input type="text" placeholder="Search products..." className="search-input" />
    </div>
  );
};

export default Search;
