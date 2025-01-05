import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';  // Add 'Link' and 'useNavigate'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/header';
import Footer from './components/footer';
import ProductList from './components/ProductList';
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


const AppWrapper = () => {
  const [selectedCategory, setSelectedCategory] = useState('Men');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();  // Ensure navigate is available

  // Function to handle category change
  const onCategoryChange = (category) => {
    console.log('Category changed to:', category);  // Log category change
    setSelectedCategory(category);
  };

  // Toggle side menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <Header onCategoryChange={onCategoryChange} toggleMenu={toggleMenu} />
      
      {/* Side Menu */}
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleMenu}>×</button>
        <ul>
          <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
          <li><Link to="/settings" onClick={toggleMenu}>Settings</Link></li>
          <li><Link to="/orders" onClick={toggleMenu}>Orders</Link></li>
          <li><Link to="/account" onClick={toggleMenu}>Account</Link></li>
          <li><Link to="/cart" onClick={toggleMenu}>Cart ({cartCount})</Link></li>
          <li><Link to="/help" onClick={toggleMenu}>Help</Link></li>
          <li><button className="logout-btn" onClick={() => navigate('/login')}>Logout</button></li>
        </ul>
      </div>

      <Routes>
        {/* Pass selectedCategory to ProductList */}
        <Route path="/" element={<ProductList selectedCategory={selectedCategory} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/settings"
          element={
            <PrivateRoute allowedRoles={['admin', 'user']}>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute allowedRoles={['admin', 'user']}>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

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





