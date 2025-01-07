import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import './ProductCard.css';

function ProductCard({ product }) {
  const [showAnimation, setShowAnimation] = useState(false);

  const calculateDiscount = () => {
    if (product.originalPrice && product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const addToCart = (event) => {
    // Prevent navigation when clicking the cart button
    event.preventDefault();
    event.stopPropagation();

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = existingCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      existingProduct = { ...product, quantity: 1 };
      existingCart.push(existingProduct);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Trigger the animation
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000); // Hide animation after 1 second
  };

  const discount = calculateDiscount();

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        <div
          className="discount-badge"
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation for the cart button
            e.stopPropagation();
          }}
        >
          <FiShoppingCart onClick={addToCart} className="cart-button" />
        </div>
        {showAnimation && <div className="cart-animation"></div>}
      </div>
      <div className="product-details">
        <div className="prod-name">
          <p className="product-details-name">{product.name}</p>
        </div>
        <div className="product-price-container">
          <p className="product-details-price">R{product.price.toFixed(2)}</p>
          {product.originalPrice && (
            <p className="product-original-price">R{product.originalPrice.toFixed(2)}</p>
          )}
        </div>
        <div className="sale">
          {discount > 0 && <p className="up-to">{discount}% OFF FLARE wide</p>}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;












