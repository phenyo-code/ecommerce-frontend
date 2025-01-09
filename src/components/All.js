import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext'; 
import ProductCard from './ProductCard'; 
import './ProductList.css';

const AllProductsList = () => {
  const { allProducts } = useProducts(); // Access all products from the context

  const [searchQuery, setSearchQuery] = useState(''); // Local state for search query

  // Filter products based on search query across all products
  const filteredProducts = allProducts.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           product.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update local search query
  };

  return (
    <div className="product-list">
      <div className="Search-header">
        <input
          type="text"
          placeholder="Search products across all categories..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
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
