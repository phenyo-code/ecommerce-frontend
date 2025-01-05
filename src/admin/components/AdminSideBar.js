import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <nav className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/admin/hero">Hero Section</Link></li>
          <li><Link to="/admin/products">Products</Link></li>
          <li><Link to="/admin/orders">Orders</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;

