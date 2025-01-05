import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminSidebar from '../components/AdminSideBar';
import HeroSectionEditor from '../controllers/HeroSectionEditor';
import ProductManagement from '../controllers/ProductManagement';
import OrderManagement from '../controllers/OrderManagement';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-main-content">
        <Routes>
          {/* Make the routes relative to /admin */}
          <Route path="hero" element={<HeroSectionEditor />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;

