import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { FaUser, FaBox, FaShoppingCart } from "react-icons/fa"; // Icons for widgets

const Dashboard = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchItems(), fetchOrders(), fetchUserCount()]);
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

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="spinner-border animate-spin h-8 w-8 border-t-4 border-blue-600 rounded-full"></div>
          </div>
        ) : (
          <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Total Users Widget */}
            <div className="flex items-center p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-xl hover:scale-105 transition-all">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-white bg-opacity-20 rounded-full mr-6">
                <FaUser className="h-10 w-10" />
              </div>
              <div>
                <span className="block text-3xl font-bold">{userCount}</span>
                <span className="block text-lg">Registered Users</span>
              </div>
            </div>

            {/* Total Items in Stock */}
            <div className="flex items-center p-6 bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg rounded-xl hover:scale-105 transition-all">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-white bg-opacity-20 rounded-full mr-6">
                <FaBox className="h-10 w-10" />
              </div>
              <div>
                <span className="block text-3xl font-bold">{totalItems}</span>
                <span className="block text-lg">Unique Items in Stock</span>
              </div>
            </div>

            {/* Purchasing Orders */}
            <div className="flex items-center p-6 bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg rounded-xl hover:scale-105 transition-all">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-white bg-opacity-20 rounded-full mr-6">
                <FaShoppingCart className="h-10 w-10" />
              </div>
              <div>
                <span className="block text-3xl font-bold">{totalOrders}</span>
                <span className="block text-lg">Purchasing Orders</span>
              </div>
              
            </div>
            
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
