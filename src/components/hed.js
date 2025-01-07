import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FiSearch, FiHeart, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi'; // Feather Icons
import Search from '../pages/Search'; // Import the Search component
import Footer from './footer';
import Hero from './hero'; // Import the Hero component
import './header.css';

const Header = () => {
  const { activeCategory, changeCategory, activeFilterTabs, setActiveFilterTabs } = useProducts();
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isFiltersLoading, setIsFiltersLoading] = useState(false);
  const [isCartPage, setIsCartPage] = useState(false); // Track if the current page is the Cart page
  const [heroContent, setHeroContent] = useState({
    title: 'Have Some FLARE',
    subtitle: 'Shop the latest trends!',
  });

  const location = useLocation(); // To get the current path

  const categoriesContent = {
    men: { title: "Men's Collection", subtitle: 'Discover style and comfort.' },
    women: { title: "Women's Collection", subtitle: 'Elevate your wardrobe today.' },
    brands: { title: 'Top Brands', subtitle: 'The best brands, all in one place.' },
    home: { title: 'Home Essentials', subtitle: 'Revamp your space with style.' },
    jewellery: { title: 'Jewellery Collection', subtitle: 'Shine bright with our accessories.' },
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
  }, []);

  useEffect(() => {
    const filters = {
      men: ['T-Shirts', 'Jeans', 'Jackets', 'Shoes'],
      women: ['Dresses', 'Tops', 'Jeans', 'Jackets'],
      forYou: ['New', 'Sale', 'T-Shirts', 'Jeans', 'Tops', 'Pants', 'Hoodies', 'Accessories'],
      brands: ['Nike', 'Adidas', 'Puma', 'Reebok'],
      home: ['Furniture', 'Decor', 'Lighting', 'Kitchen'],
      jewellery: ['Necklaces', 'Bracelets', 'Rings', 'Earrings'],
    };

    if (filters[activeCategory]) {
      setIsFiltersLoading(true);
      setTimeout(() => {
        setActiveFilterTabs(filters[activeCategory]);
        setIsFiltersLoading(false);
      }, 300); // Simulate loading delay
    } else {
      setIsFiltersLoading(true);
      setActiveFilterTabs([]);
    }
  }, [activeCategory, setActiveFilterTabs]);

  useEffect(() => {
    // Set isCartPage to true if the current path is '/cart'
    setIsCartPage(location.pathname === '/cart');
  }, [location.pathname]);

  useEffect(() => {
    if (categoriesContent[activeCategory]) {
      setHeroContent(categoriesContent[activeCategory]);
    } else {
      setHeroContent({ title: 'Have Some FLARE', subtitle: 'Shop the latest trends!' });
    }
  }, [activeCategory]);

  const handleTabClick = (category) => {
    if (activeCategory !== category) {
      changeCategory(category);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userToken');
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  return (
    <header className="header">
      {/* First Row */}
      <div className="header-top-row">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">FLARE</span>
          </Link>
        </div>
        <div className="header-icons">
          {/* Search Icon */}
          <FiSearch onClick={toggleSearch} className="icon search-icon" />

          {/* Wishlist Icon */}
          <Link to="/wishlist" className="icon">
            <FiHeart />
          </Link>

          <Link to="/cart" className="icon cart-icon-wrapper">
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>

          {/* Menu Toggle Icon */}
          {isMenuOpen ? (
            <FiX onClick={toggleMenu} className="icon fa-x" />
          ) : (
            <FiMenu onClick={toggleMenu} className="icon menu-icon" />
          )}
        </div>
      </div>

      {/* Render the Search component if isSearchOpen is true */}
      {isSearchOpen ? (
        <Search closeSearch={toggleSearch} />
      ) : (
        <>
          {/* Side Menu */}
          <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <Link to="/profile" onClick={toggleMenu}>
                  Profile <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/settings" onClick={toggleMenu}>
                  Settings <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/orders" onClick={toggleMenu}>
                  Orders <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/account" onClick={toggleMenu}>
                  Account <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/cart" onClick={toggleMenu}>
                  Cart ({cartCount}) <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/help" onClick={toggleMenu}>
                  Help <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
            <Footer />
          </div>

          {/* Second Row - Categories */}
          {!isCartPage && (
            <div className="header-categories-row">
              <button
                className={`category-tab ${activeCategory === 'women' ? 'active' : ''}`}
                onClick={() => handleTabClick('women')}
              >
                Women
              </button>
              <button
                className={`category-tab ${activeCategory === 'men' ? 'active' : ''}`}
                onClick={() => handleTabClick('men')}
              >
                Men
              </button>
              <button
                className={`category-tab ${activeCategory === 'brands' ? 'active' : ''}`}
                onClick={() => handleTabClick('brands')}
              >
                Brands
              </button>
              <button
                className={`category-tab ${activeCategory === 'home' ? 'active' : ''}`}
                onClick={() => handleTabClick('home')}
              >
                Home
              </button>
              <button
                className={`category-tab ${activeCategory === 'jewellery' ? 'active' : ''}`}
                onClick={() => handleTabClick('jewellery')}
              >
                Jewellery
              </button>
            </div>
          )}

          {/* Third Row - Filters */}
          {!isCartPage && (
            <div className="header-filters-row">
              {isFiltersLoading ? (
                <button className="filter-tab">Loading Filters...</button>
              ) : activeFilterTabs && activeFilterTabs.length > 0 ? (
                activeFilterTabs.map((filter, index) => (
                  <button key={index} className="filter-tab">
                    {filter}
                  </button>
                ))
              ) : (
                <button className="filter-tab">No Filters Available</button>
              )}
            </div>
          )}

          {/* Render the Hero section */}
          <Hero title={heroContent.title} subtitle={heroContent.subtitle} />
        </>
      )}
    </header>
  );
};

export default Header;