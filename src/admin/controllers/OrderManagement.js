import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: 'John Doe',
      items: 'Product A, Product B',
      total: 49.99,
      status: 'Pending',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      items: 'Product C',
      total: 19.99,
      status: 'Shipped',
    },
  ]);
  const [filter, setFilter] = useState('');

  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = filter
    ? orders.filter((order) => order.status === filter)
    : orders;

  return (
    <div className="order-management">
      <h2>Order Management</h2>

      <div className="filter-section">
        <label>
          Filter by Status:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
      </div>

      <div className="order-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="order-item">
              <h3>Order #{order.id}</h3>
              <p><strong>Customer:</strong> {order.customer}</p>
              <p><strong>Items:</strong> {order.items}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <p><strong>Status:</strong> {order.status}</p>

              <div className="action-buttons">
                <button
                  onClick={() => handleStatusChange(order.id, 'Pending')}
                  disabled={order.status === 'Pending'}
                >
                  Set to Pending
                </button>
                <button
                  onClick={() => handleStatusChange(order.id, 'Shipped')}
                  disabled={order.status === 'Shipped'}
                >
                  Set to Shipped
                </button>
                <button
                  onClick={() => handleStatusChange(order.id, 'Delivered')}
                  disabled={order.status === 'Delivered'}
                >
                  Set to Delivered
                </button>
                <button
                  onClick={() => handleStatusChange(order.id, 'Cancelled')}
                  disabled={order.status === 'Cancelled'}
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found for the selected status.</p>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
