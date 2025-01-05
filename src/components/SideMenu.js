import React from 'react';
import './SideMenu.css'; // Import styles

const SideMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      <ul>
        <li><a href="/account">Account</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/orders">Orders</a></li>
        <li><a href="/cart">Cart</a></li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default SideMenu;
