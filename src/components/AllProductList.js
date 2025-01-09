import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext'; 
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import ProductCard from './ProductCard'; 
import './ProductList.css';
import './AllProductList.css'; // Ensure this CSS is properly scoped or reusable

const AllProductsList = () => {
  const { allProducts } = useProducts(); // Access all products from the context
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // Local state for search query

  useEffect(() => {
    // Automatically focus the input field when the component mounts
    document.getElementById('search-input').focus();
  }, []);

  // Filter products based on search query across all products
  const filteredProducts = allProducts.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           product.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update local search query
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return (
    <div className="product-list">
      <div className="all-header">
        <IoIosArrowBack onClick={handleBack} className="back-icon" />
        <div className="search-form">
          <input
            id="search-input"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
        <FiSearch className="search-icons" />
      </div>
      <div>
        <p className="top">Discover</p>
      </div>
      <div className="products">
        
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} /> 
          ))
        ) : (
          <p>No products found. Please try a different search.</p>
        )}
      </div>
    </div>
  );
};

export default AllProductsList;




