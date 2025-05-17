// Orders.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./cart.css";

function Orders() {
  const orders = useSelector((state) => state.orders);
  const navigate = useNavigate();

  if (!orders || orders.length === 0) {
    return (
      <div className="empty-orders">
        <h2>No orders placed yet 🛍️</h2>
        <button className="continue-btn" onClick={() => navigate('/Cart')}>
          🛒 Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="order-list">
      <h1>🧾 Order History</h1>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <h3>Order ID: #ORD-{String(order.id).slice(-6)}</h3>
          <p>Date: {order.date}</p>
          <p>Total: ₹{parseFloat(order.total).toFixed(2)}</p>
          <h4>Items:</h4>
          <ul>
            {order.items.map((item) => (
              <li key={item.id} className="order-item">
                <img src={item.image} alt={item.name} width="50" />
                <span>{item.name} × {item.quantity} — ₹{parseFloat(item.price).toFixed(2)} each</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Orders;
