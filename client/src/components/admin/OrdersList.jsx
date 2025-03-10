import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0); // Total price of filtered orders

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orders");
        setOrders(response.data);

        // Filter orders (Include only "Pending" and "Received", exclude "Stopped")
        const filteredOrders = response.data.filter(order => 
          order.status === "Pending" || order.status === "Received"
        );

        // Calculate total price of the filtered orders
        const totalPrice = filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0);
        setTotalOrderPrice(totalPrice);

      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="text-xl font-semibold">Loading orders...</span>
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-6">
        <div className="bg-white p-8 rounded-md w-full shadow-md">
          <h2 className="text-xl font-semibold mb-4">Orders List</h2>

          {/* Total Order Price Widget (Pending + Received, Excluding Stopped) */}
          <div className="mb-6 p-4 bg-blue-100 text-blue-900 font-semibold rounded-lg shadow-md flex justify-between items-center">
            <span>Total Price of Orders:</span>
            <span className="text-2xl font-bold">${totalOrderPrice.toFixed(2)}</span>
          </div>

          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="px-6 py-3">Supplier</th>
                <th className="px-6 py-3">Item</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Total Price</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{order.supplier}</td>
                    <td className="px-6 py-4">{order.item}</td>
                    <td className="px-6 py-4">{order.quantity}</td>
                    <td className="px-6 py-4">${order.totalPrice.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 font-semibold rounded-full 
                          ${order.status === 'Received' ? 'bg-green-200 text-green-900' : 
                          order.status === 'Pending' ? 'bg-yellow-200 text-yellow-900' : 
                          'bg-red-200 text-red-900'}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
