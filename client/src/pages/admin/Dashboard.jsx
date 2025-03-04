import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser, FaBox, FaShoppingCart, FaExclamationTriangle, FaBell } from "react-icons/fa"; 
import Sidebar from '../../components/admin/Sidebar';

const Dashboard = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchItems(), fetchOrders(), fetchUserCount(), fetchNotifications()]);
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

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      const stockNotifications = response.data.filter(item => item.notification);
      setNotifications(stockNotifications);
      
      // Count low stock items from notifications
      const lowStockItems = stockNotifications.filter(item => item.notification.toLowerCase().includes("low stock"));
      setLowStockCount(lowStockItems.length);
    } catch (err) {
      console.error("Error fetching stock notifications", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gradient-to-br from-gray-100 to-gray-300">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="spinner-border animate-spin h-8 w-8 border-t-4 border-blue-600 rounded-full"></div>
          </div>
        ) : (
          <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Dashboard Title */}
            <div className="col-span-2 md:col-span-3 p-4 mb-6 bg-white  ">
  <h1 className="text-2xl font-semibold text-gray-800">University Inventory System</h1>
  <p className="text-sm text-gray-600">Comprehensive overview of the inventory, orders, and stock levels.</p>
</div>


            {/* Total Users Widget */}
            <div className="flex items-center p-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg rounded-lg hover:scale-105 transition-all transform h-32">
              <div className="inline-flex items-center justify-center h-14 w-14 bg-white bg-opacity-10 rounded-full mr-4 shadow-md">
                <FaUser className="h-7 w-7" />
              </div>
              <div>
                <span className="block text-xl font-semibold">{userCount}</span>
                <span className="block text-sm">Registered Users</span>
              </div>
            </div>

            {/* Total Orders Widget */}
            <div className="flex items-center p-5 bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg rounded-lg hover:scale-105 transition-all transform h-32">
              <div className="inline-flex items-center justify-center h-14 w-14 bg-white bg-opacity-10 rounded-full mr-4 shadow-md">
                <FaShoppingCart className="h-7 w-7" />
              </div>
              <div>
                <span className="block text-xl font-semibold">{totalOrders}</span>
                <span className="block text-sm">Total Orders</span>
              </div>
            </div>

            {/* Total Items in Stock Widget */}
            <div className="flex items-center p-6 bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg rounded-xl hover:scale-105 transition-all transform h-32">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-white bg-opacity-10 rounded-full mr-6 shadow-md">
                <FaBox className="h-10 w-10" />
              </div>
              <div>
                <span className="block text-3xl font-bold">{totalItems}</span>
                <span className="block text-lg">Unique Items in Stock</span>
              </div>
            </div>

            {/* Stock Notifications Section (Smaller Version) */}
            {notifications.length > 0 && (
              <div className="p-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg rounded-lg hover:scale-105 transition-all transform col-span-2 md:col-span-3">
                <h3 className="text-xs font-medium flex items-center mb-1">
                  <FaBell className="mr-1" /> Stock Notifications
                </h3>
                <div className="space-y-1">
                  {notifications.map((item, index) => (
                    <div key={index} className="bg-yellow-700 text-white rounded-md p-1 shadow-md text-xs">
                      <p className="font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-xs">{item.notification}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
