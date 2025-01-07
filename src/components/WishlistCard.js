import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash } from 'react-icons/fi'; // Import the trash bin icon
import './WishListCard.css';

function WishListCard({ product, removeFromWishlist }) {
  const [showAnimation, setShowAnimation] = useState(false);

  const handleRemove = (e) => {
    e.preventDefault(); // Prevent navigation to the product page
    e.stopPropagation(); // Stop propagation to the parent Link
    setShowAnimation(true);

    setTimeout(() => {
      setShowAnimation(false);
      removeFromWishlist(product.id); // Call the parent removeFromWishlist function
    }, 500); // Optional animation delay
  };

  return (
    <Link to={`/product/${product.id}`} className="wish-card">
      <div className="wish-image-wrapper">
        <img src={product.image} alt={product.name} className="wish-image" />
        <div className="wish-badge" onClick={handleRemove}>
          <FiTrash className="delete-button" />
        </div>
      </div>
      <div className="wish-product-details">
        <p className="wish-product-name">{product.name}</p>
        <p className="wish-product-price">R{product.price}</p>
      </div>
    </Link>
  );
}

export default WishListCard;
