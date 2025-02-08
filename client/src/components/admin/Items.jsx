import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from './Sidebar';
const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', categoryId: '', description: '', quantity: 0, minimumStock: 2, maximumStock: 100 });
  const [editItem, setEditItem] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch items and categories on component mount
  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
    } catch (err) {
      setError('Error fetching items');
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/category');
      setCategories(response.data);
    } catch (err) {
      setError('Error fetching categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/items', newItem);
      setItems([...items, response.data]);
      setNewItem({ name: '', categoryId: '', description: '', quantity: 0, minimumStock: 2, maximumStock: 100 });
      setShowAddModal(false);
      Swal.fire('Success', 'Item added successfully!', 'success');
    } catch (err) {
      setError('Error adding item');
      Swal.fire('Error', 'There was an error adding the item.', 'error');
      console.error(err);
    }
  };

  const handleEditItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/items/${editItem.id}`, editItem);
      setItems(items.map(item => (item.id === response.data.id ? response.data : item)));
      setEditItem(null);
      setShowEditModal(false);
      Swal.fire('Success', 'Item updated successfully!', 'success');
    } catch (err) {
      setError('Error updating item');
      Swal.fire('Error', 'There was an error updating the item.', 'error');
      console.error(err);
    }
  };

  const handleDeleteItem = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/items/${id}`);
          setItems(items.filter(item => item.id !== id));
          Swal.fire('Deleted!', 'The item has been deleted.', 'success');
        } catch (err) {
          setError('Error deleting item');
          Swal.fire('Error', 'There was an error deleting the item.', 'error');
          console.error(err);
        }
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editItem) {
      setEditItem(prevState => ({ ...prevState, [name]: value }));
    } else {
      setNewItem(prevState => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <div className="flex">
      <Sidebar />
<div className='flex-1 p-6'>
      {/* Add Item Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add new Item
      </button>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Item Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Minimum Stock</th>
              <th className="py-3 px-6 text-left">Maximum Stock</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
  {items.map((item) => (
    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left">{item.name}</td>
      <td className="py-3 px-6 text-left">{item.description}</td>
      <td className="py-3 px-6 text-center">{item.quantity}</td>
      <td className="py-3 px-6 text-center">{item.minimumStock}</td>
      <td className="py-3 px-6 text-center">{item.maximumStock}</td>
      <td className="py-3 px-6 text-left">
        {categories.find((cat) => cat.id === item.categoryId)?.name || 'Unknown'}
      </td>
      
      <td className="py-3 px-6 text-center">
        <button
          onClick={() => {
            setEditItem(item);
            setShowEditModal(true);
          }}
          className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteItem(item.id)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Add New Item</h2>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleChange}
              placeholder="Item Name"
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              name="quantity"
              value={newItem.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              name="minimumStock"
              value={newItem.minimumStock}
              onChange={handleChange}
              placeholder="Minimum Stock"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              name="maximumStock"
              value={newItem.maximumStock}
              onChange={handleChange}
              placeholder="Maximum Stock"
              className="w-full p-2 border rounded mb-4"
            />
            <select
              name="categoryId"
              value={newItem.categoryId}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddItem}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Edit Item</h2>

            {/* Name Input */}
            <input
              type="text"
              name="name"
              value={editItem.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter item name"
            />

            {/* Description Input */}
            <textarea
              name="description"
              value={editItem.description}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter item description"
            />

            {/* Quantity Input */}
            <input
              type="number"
              name="quantity"
              value={editItem.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter quantity"
            />

            {/* Minimum Stock */}
            <input
              type="number"
              name="minimumStock"
              value={editItem.minimumStock}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter minimum stock"
            />

            {/* Maximum Stock */}
            <input
              type="number"
              name="maximumStock"
              value={editItem.maximumStock}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter maximum stock"
            />

            {/* Category Dropdown */}
            <select
              name="categoryId"
              value={editItem.categoryId}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Save Changes */}
            <button
              onClick={handleEditItem}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>

            {/* Close Modal */}
            <button
              onClick={() => setShowEditModal(false)}
              className="w-full py-2 px-4 mt-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Error Handling */}
      {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default Items;
