import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions'; // Correct import path
import { Link } from 'react-router-dom'; // Import Link for navigation
import './ProductCard.css';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Dispatch the action to add product to the cart
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <button onClick={handleAddToCart} className="product-button">Add to Cart</button>
      {/* Link to Product Details page */}
      <Link to={`/product/${product.id}`} className="product-details-link">
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;
