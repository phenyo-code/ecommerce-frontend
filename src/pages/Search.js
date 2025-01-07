import React from 'react';
import SearchHeader from '../components/SearchHeader';
import ProductList from '../components/ProductList';
import FloatingCart from '../components/FloatingCart';

import './search.css';

const Search = () => {
  return (
    <div className="search-page">
      <SearchHeader placeholder="Search for products..." />
      <div className="search-title">
        <p className="top">Top products</p>
        <ProductList />
      </div>
      <FloatingCart />
    </div>
  );
};

export default Search;

















