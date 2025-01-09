import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchHeader from '../components/SearchHeader';
import { FiTrash } from 'react-icons/fi'; 
import { FaMinus, FaPlus } from 'react-icons/fa';

import './cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    return storedCart || [];
  });

  const removeFromCart = (id, size) => {
    // Filter out items where both the `id` and `size` match
    const updatedCart = cartItems.filter((item) => !(item.id === id && item.size === size));
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  

  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + quantity) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to calculate discount percentage for an item
  const calculateDiscount = (item) => {
    if (item.originalPrice && item.price) {
      return Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
    }
    return 0;
  };

  const isUserLoggedIn = false;  // Update this based on your authentication logic

  return (
    <div className="cart-page">
      <SearchHeader placeholder="Search for products..." />
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <p><Link to="/" className="shop-now">Shop Now</Link></p>

          {!isUserLoggedIn && (
            <div className="cart-login">
              <p>Have an account? Sign in to view your cart</p>
              <p>
                <Link to="/login" className="shop-now">Log in</Link>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-wrapper">
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </Link>
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <p className="item-name">{item.name}</p>
                    <FiTrash onClick={() => removeFromCart(item.id, item.size)} className="remove-btn" />
                  </div>
                  <p className="cart-item-size">size / {item.size}</p>
                  <div className="cart-item-info">
                    <div className="cart-item-price">
                      <span className="current-price">R{item.price}</span>
                      {item.originalPrice && (
                        <span className="original-price">R{item.originalPrice}</span>
                      )}
                    </div>
                    <div className="quantity-controls">
                      <FaMinus onClick={() => updateQuantity(item.id, -1)} className="controlls" />
                      <span>{item.quantity}</span>
                      <FaPlus onClick={() => updateQuantity(item.id, 1)} className="controlls" />
                    </div>
                  </div>
                  {item.discount && (
                    <p className="cart-item-discount">Estimated -{item.discount}%</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="cart-total">
          <h3>Total: R{getTotalPrice()}</h3>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;







