import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import Sidebar from "./Sidebar";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    supplier_id: "",
    order_id: "",
    total_amount: "",
    status: "pending", // Default status
  });
  const [invoiceId, setInvoiceId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch invoices, suppliers, and orders
  useEffect(() => {
    axios.get("http://localhost:5000/invoices")
      .then(response => setInvoices(response.data))
      .catch(error => console.error("Error fetching invoices:", error));

    axios.get("http://localhost:5000/supplier")
      .then(response => setSuppliers(response.data))
      .catch(error => console.error("Error fetching suppliers:", error));

    axios.get("http://localhost:5000/orders")
      .then(response => setOrders(response.data))
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  // Open modal for Add/Edit
  const openModal = (invoice = null) => {
    if (invoice) {
      setInvoiceId(invoice.id);
      setInvoiceData({
        supplier_id: invoice.supplier_id,
        order_id: invoice.order_id || "",
        total_amount: invoice.total_amount,
        status: invoice.status, // Make sure status is set
      });
    } else {
      setInvoiceId(null);
      setInvoiceData({
        supplier_id: "",
        order_id: "",
        total_amount: "",
        status: "pending", // Default status
      });
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setInvoiceId(null);
    setInvoiceData({ supplier_id: "", order_id: "", total_amount: "", status: "pending" });
    setIsModalOpen(false);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({ ...prev, [name]: value }));
  };

  // Submit Invoice (Create or Update)
  const handleInvoiceSubmit = () => {
    if (!invoiceData.supplier_id || !invoiceData.total_amount) {
      Swal.fire("Error", "Supplier and Total Amount are required", "error");
      return;
    }

    const url = invoiceId 
      ? `http://localhost:5000/invoices/${invoiceId}`
      : "http://localhost:5000/invoices";
    const method = invoiceId ? "put" : "post";

    axios[method](url, invoiceData, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then(response => {
      if (invoiceId) {
        setInvoices(prev => prev.map(inv => inv.id === invoiceId ? response.data : inv));
        Swal.fire("Success", "Invoice updated successfully", "success");
      } else {
        setInvoices(prev => [...prev, response.data]);
        Swal.fire("Success", "Invoice created successfully", "success");
      }
      closeModal();
    })
    .catch(error => console.error("Error saving invoice:", error));
  };

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
        axios.delete(`http://localhost:5000/invoices/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
          .then(() => {
            setInvoices((prev) => prev.filter(invoice => invoice.id !== id));
            Swal.fire("Deleted!", "Invoice has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting invoice:", error);
            Swal.fire("Error", "There was an error deleting the invoice.", "error");
          });
      }
    });
  };
  

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Invoices List</h2>
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg mb-4"
            onClick={() => openModal()}
          >
            Add a new Invoice
          </button>

          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="px-6 py-3">Supplier</th>
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Total Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{invoice.supplier_id}</td>
                  <td className="px-6 py-4">{invoice.order_id || "N/A"}</td>
                  <td className="px-6 py-4">${invoice.total_amount}</td>
                  <td className="px-6 py-4">{invoice.status}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => openModal(invoice)} className="text-blue-500 hover:text-blue-700">
                      <AiOutlineEdit />
                    </button>
                    <button onClick={() => handleDelete(invoice.id)} className="text-red-500 hover:text-red-700 ml-2">
                      <BsFillTrash3Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Add/Edit Invoice */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-[500px]">
                <h3 className="text-xl font-semibold mb-4">{invoiceId ? "Edit Invoice" : "Add Invoice"}</h3>
                
                <select name="supplier_id" value={invoiceData.supplier_id} onChange={handleChange} className="border p-2 w-full mb-4">
                  <option value="">Select Supplier</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                  ))}
                </select>

                <select name="order_id" value={invoiceData.order_id} onChange={handleChange} className="border p-2 w-full mb-4">
                  <option value="">Select Order (Optional)</option>
                  {orders.map(order => (
                    <option key={order.id} value={order.id}>{order.id}</option>
                  ))}
                </select>

                <input type="number" name="total_amount" value={invoiceData.total_amount} onChange={handleChange} className="border p-2 w-full mb-4" placeholder="Total Amount" />

                <select name="status" value={invoiceData.status} onChange={handleChange} className="border p-2 w-full mb-4">
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>

                <div className="flex justify-between">
                  <button onClick={closeModal} className="text-gray-500 bg-gray-200 px-4 py-2 rounded-lg">Cancel</button>
                  <button onClick={handleInvoiceSubmit} className="text-white bg-blue-500 px-4 py-2 rounded-lg">
                    {invoiceId ? "Update Invoice" : "Add Invoice"}
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

export default Invoice;
