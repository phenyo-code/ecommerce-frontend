import React from 'react';
import { useProducts } from '../context/ProductContext';
import Hero from './hero';

const ProductList = () => {
  const { products, activeCategory, changeCategory } = useProducts(); // Access context data

  // Filter products based on the active category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <div className="product-list">
      {/* Show HeroSection only when there are filtered products */}
      {filteredProducts.length > 0 && <Hero />}

      <div className="category-tabs">
        <button onClick={() => changeCategory('Men')}>Men</button>
        <button onClick={() => changeCategory('Women')}>Women</button>
      </div>

      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;



