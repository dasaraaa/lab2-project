import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaBox, FaShoppingCart, FaBell } from "react-icons/fa";
import Sidebar from '../../components/admin/Sidebar';

const Dashboard = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchItems(),
        fetchOrders(),
        fetchUserCount(),
        fetchRevenue(),
        fetchRecentOrders(),
        fetchNotifications(),
      ]);
    } catch (err) {
      setError("Failed to fetch data.");
    }
    setLoading(false);
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      setTotalItems(response.data.length);
    } catch (err) {
      console.error("Error fetching items", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders");
      setTotalOrders(response.data.length);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/count");
      setUserCount(response.data.count);
    } catch (err) {
      console.error("Error fetching user count", err);
    }
  };

  const fetchRevenue = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders/revenue");
      setTotalRevenue(response.data.totalRevenue);
    } catch (err) {
      console.error("Error fetching revenue", err);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders");
      const filteredOrders = response.data.filter(
        order => order.status === "Pending" || order.status === "Received"
      );
      setRecentOrders(filteredOrders);

      const totalPrice = filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0);
      setTotalOrderPrice(totalPrice);
    } catch (err) {
      console.error("Error fetching recent orders", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      const stockNotifications = response.data.filter(item => item.notification);
      setNotifications(stockNotifications);
    } catch (err) {
      console.error("Error fetching stock notifications", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="text-xl font-semibold text-blue-500">Loading data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="text-xl text-red-500 font-semibold">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6 bg-gradient-to-br from-gray-100 to-gray-300">
        <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Dashboard Title */}
          <div className="col-span-2 md:col-span-3 p-6 mb-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-gray-800">University Inventory System</h1>
            <p className="text-sm text-gray-600">Comprehensive overview of the inventory, orders, and stock levels.</p>
          </div>

          {/* Total Users Widget */}
          <div className="flex items-center p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg rounded-lg hover:scale-105 transition-all transform">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-white bg-opacity-10 rounded-full mr-4 shadow-md">
              <FaUser className="h-8 w-8" />
            </div>
            <div>
              <span className="block text-2xl font-semibold">{userCount}</span>
              <span className="block text-sm">Registered Users</span>
            </div>
          </div>

          {/* Total Orders Widget */}
          <div className="flex items-center p-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg rounded-lg hover:scale-105 transition-all transform">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-white bg-opacity-10 rounded-full mr-4 shadow-md">
              <FaShoppingCart className="h-8 w-8" />
            </div>
            <div>
              <span className="block text-2xl font-semibold">{totalOrders}</span>
              <span className="block text-sm">Total Orders</span>
            </div>
          </div>

          {/* Total Items in Stock Widget */}
          <div className="flex items-center p-6 bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg rounded-lg hover:scale-105 transition-all transform">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-white bg-opacity-10 rounded-full mr-4 shadow-md">
              <FaBox className="h-8 w-8" />
            </div>
            <div>
              <span className="block text-2xl font-semibold">{totalItems}</span>
              <span className="block text-sm">Unique Items in Stock</span>
            </div>
          </div>

          {/* Recent Orders and Notifications Widget */}
          <div className="col-span-2 p-6 bg-white shadow-lg rounded-lg flex space-x-6">
            {/* Recent Orders Widget */}
            <div className="flex-1 p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold">Recent Orders</h3>

              {/* Total Order Price Widget */}
              <div className="mb-4 p-4 bg-blue-100 text-blue-900 font-semibold rounded-lg shadow-md flex justify-between items-center">
                <span>Total Price of Orders:</span>
                <span className="text-xl font-bold">${totalOrderPrice.toFixed(2)}</span>
              </div>

              {/* Scrollable Section */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div key={order.id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                      <div className="flex justify-between text-sm">
                        <p className="font-semibold">{order.supplier}</p>
                        <p>Order ID: {order.id}</p>
                      </div>
                      <div className="flex justify-between text-xs">
                        <p>Item: {order.item}</p>
                        <p>Status: {order.status}</p>
                      </div>
                      <div className="flex justify-between text-xs">
                        <p>Total: ${order.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No recent orders available.</p>
                )}
              </div>
            </div>

            {/* Stock Notifications Widget */}
            {notifications.length > 0 && (
              <div className="w-80 h-80 p-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg rounded-lg hover:scale-105 transition-all transform overflow-y-auto">
                <h3 className="text-lg font-medium flex items-center mb-3">
                  <FaBell className="mr-3" /> Stock Notifications
                </h3>
                <div className="space-y-3">
                  {notifications.slice(0, 7).map((item, index) => (  // Show up to 7 notifications
                    <div key={index} className="bg-yellow-700 text-white rounded-md p-3 shadow-md text-xs">
                      <p className="font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-xs">{item.notification}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
