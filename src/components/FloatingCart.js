import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import './FloatingCart.css';

function FloatingCart({ cartCount }) {
  return (
    <div className="floating-cart">
      <div className="float">
        <Link to="/cart" aria-label="Go to Cart">
          <FiShoppingCart className="cart-cart" />
          {/* Display cart count next to the cart icon */}
          {cartCount > 0 && <span className="counting-cart">{cartCount}</span>}
        </Link>
      </div>
    </div>
  );
}

export default FloatingCart;

