import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard'; // Import ProductCard component
import './ProductList.css';

const ProductList = () => {
  const { products, activeCategory } = useProducts(); // Access context data

  // Filter products based on the active category (ensure case-insensitive comparison)
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <div className="product-list">
      <div className="list-header">

      </div>
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} /> // Use ProductCard for displaying each product
          ))
        ) : (
          <p>All products have been sold out in this category. Please check again soon</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;






