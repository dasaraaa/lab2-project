import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from './Sidebar';
import "../../../src/App.css"
import 'font-awesome/css/font-awesome.min.css';

const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', categoryId: '', description: '', quantity: 0, minimumStock: 2, maximumStock: 100, image: null });
  const [editItem, setEditItem] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

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
  
    const formData = new FormData();
    formData.append('name', newItem.name);
    formData.append('categoryId', newItem.categoryId);
    formData.append('description', newItem.description);
    formData.append('quantity', newItem.quantity);
    formData.append('minimumStock', newItem.minimumStock);
    formData.append('maximumStock', newItem.maximumStock);
    if (newItem.image) formData.append('image', newItem.image);
  
    try {
      const response = await axios.post('http://localhost:5000/items', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      // Fetch the latest items after adding the new one
      fetchItems(); // Ensure the latest data is fetched from the server
      setNewItem({ name: '', categoryId: '', description: '', quantity: 0, minimumStock: 2, maximumStock: 100, image: null });
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

    const formData = new FormData();
    formData.append('name', editItem.name);
    formData.append('categoryId', editItem.categoryId);
    formData.append('description', editItem.description);
    formData.append('quantity', editItem.quantity);
    formData.append('minimumStock', editItem.minimumStock);
    formData.append('maximumStock', editItem.maximumStock);
    if (editItem.image) formData.append('image', editItem.image);

    try {
      const response = await axios.put(`http://localhost:5000/items/${editItem.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
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
    if (name === 'image') {
      const file = e.target.files[0];
      if (file) {
        if (editItem) {
          setEditItem(prevState => ({ ...prevState, [name]: file }));
        } else {
          setNewItem(prevState => ({ ...prevState, [name]: file }));
        }
      }
    } else {
      if (editItem) {
        setEditItem(prevState => ({ ...prevState, [name]: value }));
      } else {
        setNewItem(prevState => ({ ...prevState, [name]: value }));
      }
    }
  };

  // Sorting function
  const sortItemsAZ = () => {
    const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
    setItems(sortedItems);
  };

  const sortItemsZA = () => {
    const sortedItems = [...items].sort((a, b) => b.name.localeCompare(a.name));
    setItems(sortedItems);
  };

  // Filtering items based on search query
  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex">
      <Sidebar />
      <div className='flex-1 p-6'>
        <h2 className="text-xl font-semibold mb-4">Items List</h2>

        {/* Search Bar */}
        <div className="flex items-center space-x-3 mb-4">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 w-1/3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Add Item Button and Sorting Buttons */}
        <div className="flex justify-between mb-4">
          <div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add new Item
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={sortItemsAZ}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Sort A-Z
            </button>
            <button
              onClick={sortItemsZA}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sort Z-A
            </button>
          </div>
        </div>

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
        <th className="py-3 px-6 text-left">StockControl</th>
        <th className="py-3 px-6 text-left">Category</th>
        <th className="py-3 px-6 text-center">Image</th>
        <th className="py-3 px-6 text-center">Actions</th>
      </tr>
    </thead>
  </table>

  {/* Scrollable table body */}
  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
    <table className="min-w-full bg-white border border-gray-200 shadow-md">
      <tbody className="text-gray-600 text-sm">
        {filteredItems.map((item) => (
          <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left">{item.name}</td>
            <td className="py-3 px-6 text-left">
              {item.description.length > 50 ? `${item.description.slice(0, 50)}...` : item.description}
              {item.description.length > 50 && (
                <span className="text-blue-600 cursor-pointer" onClick={() => alert(item.description)}>
                  Read More
                </span>
              )}
            </td>
            <td className="py-3 px-6 text-center">{item.quantity}</td>
            <td className="py-3 px-6 text-center">{item.minimumStock}</td>
            <td className="py-3 px-6 text-center">{item.maximumStock}</td>
            <td className="py-3 px-6 text-center">
              {item.notification ? (
                <div
                  className={`alert-box ${
                    item.notification.includes('below')
                      ? 'alert-error'
                      : item.notification.includes('exceeds')
                      ? 'alert-warning'
                      : 'alert-success'
                  }`}
                >
                  <i
                    className={`fa ${
                      item.notification.includes('below')
                        ? 'fa-exclamation-circle'
                        : item.notification.includes('exceeds')
                        ? 'fa-exclamation-triangle'
                        : 'fa-check-circle'
                    }`}
                  ></i>
                  {item.notification}
                </div>
              ) : (
                <div className="alert-success">
                  <i className="fa fa-check-circle"></i> Stock is in range
                </div>
              )}
            </td>
            <td className="py-3 px-6 text-left">
              {categories.find((cat) => cat.id === item.categoryId)?.name || 'Unknown'}
            </td>
            <td className="py-3 px-6 text-center">
              {item.image && <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="w-12 h-12 object-cover" />}
            </td>
            <td className="py-3 px-6 text-center mb-2">
              <button
                onClick={() => {
                  setEditItem(item);
                  setShowEditModal(true);
                }}
                className="mr-2 mb-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
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
              <select
                name="categoryId"
                value={newItem.categoryId}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="mr-2 px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Item Modal */}
        {showEditModal && editItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-xl font-bold mb-4">Edit Item</h2>
              <input
                type="text"
                name="name"
                value={editItem.name}
                onChange={handleChange}
                placeholder="Item Name"
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                name="description"
                value={editItem.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="number"
                name="quantity"
                value={editItem.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full p-2 border rounded mb-2"
              />
              <select
                name="categoryId"
                value={editItem.categoryId}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="minimumStock"
                value={editItem.minimumStock}
                onChange={handleChange}
                placeholder="Minimum Stock"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="number"
                name="maximumStock"
                value={editItem.maximumStock}
                onChange={handleChange}
                placeholder="Maximum Stock"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="mr-2 px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditItem}
                  className="px-4 py-2 bg-yellow-600 text-white rounded"
                >
                  Update Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
