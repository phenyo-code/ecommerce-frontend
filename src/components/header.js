import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Search from './Search';  // Import the Search component
import './header.css';

const Header = () => {
  const { activeCategory, changeCategory } = useProducts();
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);  // State for controlling search visibility

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
  }, []);

  // Disable body scroll when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const handleTabClick = (category) => {
    changeCategory(category);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userToken');
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);  // Toggle the search overlay visibility
  };

  return (
    <header className="header">
      {/* First Row */}
      <div className="header-top-row">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">FLARE</span>  {/* Logo text */}
          </Link>
        </div>
        <div className="header-icons">
          <i className="fa-solid fa-search" onClick={toggleSearch}></i>  {/* Trigger the search overlay */}
          <Link to="/wishlist" className="icon">
            <i className="fa-solid fa-heart"></i>
          </Link>
          <Link to="/cart" className="icon">
            <i className="fa-solid fa-shopping-cart"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <i
            className={`fa-solid ${isMenuOpen ? 'fa-x' : 'fa-bars'}`}
            onClick={toggleMenu}  // Toggling between bars and X
          ></i>  {/* Hamburger or close icon */}
        </div>
      </div>

      {/* Side Menu */}
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
          <li><Link to="/settings" onClick={toggleMenu}>Settings</Link></li>
          <li><Link to="/orders" onClick={toggleMenu}>Orders</Link></li>
          <li><Link to="/account" onClick={toggleMenu}>Account</Link></li>
          <li><Link to="/cart" onClick={toggleMenu}>Cart ({cartCount})</Link></li>
          <li><Link to="/help" onClick={toggleMenu}>Help</Link></li>
          <li><button className="logout-btn" onClick={logout}>Logout</button></li>
        </ul>
      </div>

      {/* Second Row */}
      <div className="header-categories-row">
        <button
          className={`category-tab ${activeCategory === 'For You' ? 'active' : ''}`}
          onClick={() => handleTabClick('For You')}
        >
          For You
        </button>
        <button
          className={`category-tab ${activeCategory === 'Women' ? 'active' : ''}`}
          onClick={() => handleTabClick('Women')}
        >
          Women
        </button>
        <button
          className={`category-tab ${activeCategory === 'Men' ? 'active' : ''}`}
          onClick={() => handleTabClick('Men')}
        >
          Men
        </button>
        <button className="category-tab">Brands</button>
        <button className="category-tab">Home</button>
        <button className="category-tab">Jewellery</button>
      </div>

      {/* Third Row */}
      <div className="header-filters-row">
        <button className="filter-tab">New</button>
        <button className="filter-tab">Sale</button>
        <button className="filter-tab">T-Shirts</button>
        <button className="filter-tab">Jeans</button>
        <button className="filter-tab">Tops</button>
        <button className="filter-tab">Pants</button>
        <button className="filter-tab">Hoodies</button>
        <button className="filter-tab">Accessories</button>
      </div>

      {/* Render the Search component only if isSearchOpen is true */}
      {isSearchOpen && <Search closeSearch={toggleSearch} />}
    </header>
  );
};

export default Header;













