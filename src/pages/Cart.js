import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchHeader from '../components/SearchHeader';
import './cart.css';

function Cart() {
  // Load cart items from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    console.log('Stored Cart Items from localStorage:', storedCart);  // Log to check cart items stored in localStorage
    return storedCart || [];
  });

  // Handle removal of an item from the cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Handle updating the quantity of an item in the cart
  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map((item) => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + quantity) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate the total price of all items in the cart
  const getTotalPrice = () => {
    const total = cartItems.reduce((total, item) => {
      const price = parseFloat(item.price); // Ensure price is a number
      const quantity = parseInt(item.quantity, 10); // Ensure quantity is an integer

      console.log(`Item Price: ${price}, Item Quantity: ${quantity}`); // Log price and quantity for each item

      if (isNaN(price) || isNaN(quantity)) {
        console.warn('Invalid data for price or quantity:', item); // Warn if any value is invalid
        return total;
      }

      return total + price * quantity;
    }, 0);
    
    console.log('Total Price:', total); // Log the calculated total price for debugging
    return total.toFixed(2); // Ensure we return a string with 2 decimal places
  };

  // Update cartItems from localStorage when it changes
  useEffect(() => {
    console.log('Updated Cart Items:', cartItems); // Log when cartItems change
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="cart-page">
      <SearchHeader placeholder="Search for products..." />
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Shop Now</Link></p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="cart-total">
          <h3>Total: ${getTotalPrice()}</h3>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;


