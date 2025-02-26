import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import Sidebar from "./Sidebar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);  // Suppliers list
  const [items, setItems] = useState([]);          // Items list
  const [supplier, setSupplier] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState(""); // Add unit price
  const [totalPrice, setTotalPrice] = useState(""); 
  const [status, setStatus] = useState("Pending");
  const [orderId, setOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch suppliers and items when the component loads
  useEffect(() => {
    axios.get("http://localhost:5000/supplier")  // Adjust URL based on your API
      .then(response => {
        setSuppliers(response.data);  // Set suppliers data
      })
      .catch(error => {
        // Handle error but no longer log it to the console
      });

    axios.get("http://localhost:5000/items")  // Adjust URL based on your API
      .then(response => {
        setItems(response.data);  // Set items data
      })
      .catch(error => {
        // Handle error but no longer log it to the console
      });

    // Fetch orders when the component loads
    axios.get("http://localhost:5000/orders")
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        // Handle error but no longer log it to the console
      });
  }, []);


  // Open modal for Add or Edit
  const openModal = (id = null, supplier = "", item = "", quantity = "", unitPrice = "", totalPrice = "", status = "Pending") => {
    setOrderId(id);
    setSupplier(supplier);
    setItem(item);
    setQuantity(quantity);
    setUnitPrice(unitPrice); // Set unit price
    setTotalPrice(totalPrice);
    setStatus(status);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setOrderId(null);
    setSupplier("");
    setItem("");
    setQuantity("");
    setUnitPrice(""); // Reset unit price
    setTotalPrice("");
    setStatus("Pending");
    setIsModalOpen(false);
  };

  // Calculate total price based on quantity and unit price
  const calculateTotalPrice = () => {
    if (quantity && unitPrice) {
      const calculatedTotal = parseFloat(quantity) * parseFloat(unitPrice);
      setTotalPrice(calculatedTotal.toFixed(2)); // Round to two decimal places
    } else {
      setTotalPrice("");
    }
  };

  useEffect(() => {
    calculateTotalPrice(); // Recalculate total price whenever quantity or unit price changes
  }, [quantity, unitPrice]);

  // Handle Add/Edit Order
  const handleOrderSubmit = () => {
    if (supplier.trim() === "" || item.trim() === "" || quantity === "" || unitPrice === "" || totalPrice === "") {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    const orderData = { supplier, item, quantity, totalPrice, status };

    if (orderId) {
      // Edit Order
      axios.put(`http://localhost:5000/orders/${orderId}`, orderData)
        .then(response => {
          setOrders(prev => prev.map(order => order.id === orderId ? response.data : order));
          closeModal();
          Swal.fire("Success", "Order updated successfully", "success");
        })
        .catch(error => {
          console.error("Error updating order:", error);
        });
    } else {
      // Add Order
      axios.post("http://localhost:5000/orders", orderData)
        .then(response => {
          setOrders(prev => [...prev, response.data]);
          closeModal();
          Swal.fire("Success", "Order added successfully", "success");
        })
        .catch(error => {
          console.error("Error adding order:", error);
        });
    }
  };

  // Handle Delete Order
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/orders/${id}`)
          .then(() => {
            setOrders(prev => prev.filter(order => order.id !== id));
            Swal.fire("Deleted!", "Your order has been deleted.", "success");
          })
          .catch(error => {
            console.error("Error deleting order:", error);
          });
      }
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="w-full sm:w-[800px] p-6 bg-white rounded-lg shadow-lg">
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg mb-4 w-full"
            onClick={() => openModal()}
          >
            Add a new Order
          </button>

          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="px-6 py-3">Supplier</th>
                <th className="px-6 py-3">Item</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Total Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{order.supplier}</td>
                  <td className="px-6 py-4">{order.item}</td>
                  <td className="px-6 py-4">{order.quantity}</td>
                  <td className="px-6 py-4">{order.totalPrice}</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(order.id, order.supplier, order.item, order.quantity, order.unitPrice, order.totalPrice, order.status)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <BsFillTrash3Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-[500px]">
                <h3 className="text-xl font-semibold mb-4">{orderId ? "Edit Order" : "Add Order"}</h3>
                
                {/* Supplier Dropdown */}
                <select
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="border p-2 mb-4 w-full"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((sup) => (
                    <option key={sup.id} value={sup.id}>
                      {sup.name}
                    </option>
                  ))}
                </select>

                {/* Item Dropdown */}
                <select
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  className="border p-2 mb-4 w-full"
                >
                  <option value="">Select Item</option>
                  {items.map((itm) => (
                    <option key={itm.id} value={itm.id}>
                      {itm.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  className="border p-2 mb-4 w-full"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                  type="number"
                  step="0.01"
                  className="border p-2 mb-4 w-full"
                  placeholder="Unit Price"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
                <input
                  type="number"
                  step="0.01"
                  className="border p-2 mb-4 w-full"
                  placeholder="Total Price"
                  value={totalPrice}
                  disabled
                />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border p-2 mb-4 w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Received">Received</option>
                  <option value="Stopped">Stopped</option>
                </select>
                <div className="flex justify-between">
                  <button
                    onClick={closeModal}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleOrderSubmit}
                    className="bg-blue-500 hover:bg-green-700 px-4 py-2 rounded-lg text-white"
                  >
                    {orderId ? "Update Order" : "Add Order"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
