import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/header';
import Footer from './components/footer';
import ProductList from './components/ProductList';
import AllProductsList from './components/AllProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/CheckOut';
import OrderConfirmation from './pages/OrderConfirmation';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import AdminDashboard from './admin/views/adminDashboard';
import LoginPage from './pages/Login';
import PrivateRoute from './routes/PrivateRoutes';
import AuthProvider from './context/AuthContext';
import ProductProvider from './context/ProductContext';
import Search from './pages/Search';
import FilterPage from './pages/FilterPage';
import Wishlist from './pages/Wishlist';

const AppWrapper = () => {
  const [selectedCategory, setSelectedCategory] = useState('Men');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // Desktop detection
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768); // Update desktop status on resize
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onCategoryChange = (category) => {
    console.log('Category changed to:', category);
    setSelectedCategory(category);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="App">
      {location.pathname === '/' && (
        <>
          <Header
            onCategoryChange={onCategoryChange}
            toggleMenu={toggleMenu}
            toggleSearch={toggleSearch}
          />
        </>
      )}

      <div className={`search ${isSearchOpen ? 'open' : ''}`}>
        {isSearchOpen && <Search closeSearch={toggleSearch} />}
      </div>

      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleMenu}>×</button>
        <ul>
          <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
          <li><Link to="/settings" onClick={toggleMenu}>Settings</Link></li>
          <li><Link to="/orders" onClick={toggleMenu}>Orders</Link></li>
          <li><Link to="/account" onClick={toggleMenu}>Account</Link></li>
          <li><Link to="/cart" onClick={toggleMenu}>Cart ({cartCount})</Link></li>
          <li><Link to="/wishlist" onClick={toggleMenu}>Wishlist</Link></li>
          <li><Link to="/help" onClick={toggleMenu}>Help</Link></li>
          <li><button className="logout-btn" onClick={() => navigate('/login')}>Logout</button></li>
        </ul>
      </div>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<Search />} />
        <Route path="/filter" element={<FilterPage />} /> {/* Add FilterPage route */}
        <Route path="/all-products" element={<AllProductsList />} /> {/* Route for AllProductsList */}
        
        <Route path="/settings" element={<PrivateRoute allowedRoles={['admin', 'user']}><Settings /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute allowedRoles={['admin', 'user']}><Profile /></PrivateRoute>} />
        <Route path="/admin/*" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <AppWrapper />
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;










