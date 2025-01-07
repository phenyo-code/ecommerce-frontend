// src/pages/Checkout.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchHeader from '../components/SearchHeader';
import './CheckOut.css';

function Checkout() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    return storedCart || [];
  });

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = () => {
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zip) {
      alert('Please complete all fields.');
      return;
    }
    
    // Proceed with order (you can later integrate payment gateway here)
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  return (
    <div className="checkout-page">
      <SearchHeader placeholder="Search for products..." />
      <h2>Checkout</h2>

      <div className="shipping-info">
        <h3>Shipping Information</h3>
        <form>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={shippingInfo.name}
            onChange={handleInputChange}
          />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleInputChange}
          />
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={handleInputChange}
          />
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={shippingInfo.state}
            onChange={handleInputChange}
          />
          <label>Zip Code:</label>
          <input
            type="text"
            name="zip"
            value={shippingInfo.zip}
            onChange={handleInputChange}
          />
        </form>
      </div>

      <div className="checkout-total">
        <h3>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
        <button onClick={handleCheckout}>Proceed to Payment</button>
      </div>

      
    </div>
  );
}

export default Checkout;

