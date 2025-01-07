// src/pages/OrderConfirmation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './OrderConfirmation.css';
import SearchHeader from '../components/SearchHeader';

function OrderConfirmation() {
  // Optionally, you can retrieve order details from localStorage or backend API if needed
  const orderNumber = Math.floor(Math.random() * 1000000); // Mock order number for demonstration

  return (
    <div className="order-confirmation">
      <SearchHeader placeholder="Search for products..." />
      <h2>Thank You for Your Order!</h2>
      <p>Your order has been successfully placed. Here are the details:</p>
      <div className="order-summary">
        <p><strong>Order Number:</strong> #{orderNumber}</p>
        <p><strong>Status:</strong> Processing</p>
        <p>Your order will be processed and shipped soon. You will receive an email with tracking information once your order is shipped.</p>
      </div>
      <div className="order-navigation">
        <Link to="/"><button>Continue Shopping</button></Link>
        <Link to="/cart"><button>View Cart</button></Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
