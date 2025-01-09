import React from 'react';
import SearchHeader from '../components/SearchHeader';
import AllProductList from '../components/AllProductList';
import FloatingCart from '../components/FloatingCart';
import './search.css';

const Search = () => {
  // Assuming `searchQuery` is captured from the URL or input field
  const searchQuery = new URLSearchParams(window.location.search).get('query') || '';

  return (
    <div className="search-page">
      <div className="search-title">
        <AllProductList searchQuery={searchQuery} />
      </div>
      <FloatingCart />
    </div>
  );
};

export default Search;



















