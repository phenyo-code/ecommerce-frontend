import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import './ProductCard.css';

function ProductCard({ product, searchQuery }) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false); // Track if the product is in the wishlist

  const calculateDiscount = () => {
    if (product.originalPrice && product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const addToWishlist = (event) => {
    // Prevent navigation when clicking the heart button
    event.preventDefault();
    event.stopPropagation();

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isProductInWishlist = wishlist.some(item => item.id === product.id);

    if (!isProductInWishlist) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(true); // Set the product as added to wishlist
    } else {
      // Remove from wishlist if already in
      const updatedWishlist = wishlist.filter(item => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false); // Set the product as removed from wishlist
    }

    // Trigger the animation
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000); // Hide animation after 1 second
  };

  const discount = calculateDiscount();

  // Filter product based on search query
  const isProductVisible = searchQuery
    ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
    : true;

  return isProductVisible ? (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        <div
          className="discount-badge"
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation for the heart button
            e.stopPropagation();
          }}
        >
          <FiHeart onClick={addToWishlist} className="cart-button" />
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
  ) : null;
}

export default ProductCard;














