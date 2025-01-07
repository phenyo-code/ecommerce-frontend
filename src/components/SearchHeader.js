import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';

import './SearchHeader.css'; // Ensure this CSS is properly scoped or reusable

const SearchHeader = ({ placeholder = "Search for products...", onSearch }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/search?query=${query}`);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  const handleInputClick = () => {
    // Navigate to search page as soon as the input is clicked
    navigate(`/search?query=${query}`);
  };

  return (
    <div className="search-header">
      <IoIosArrowBack onClick={handleBack} className="back-icon" />
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleSearch}
          onClick={handleInputClick} // Trigger navigation when input is clicked
          className="search-input"
        />
      </form>
      <FiSearch className="search-icons" />
    </div>
  );
};

export default SearchHeader;



