import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Footer from '../components/Footer';
import foto from "../assets/images/contact.svg";

const ContactUs = () => {
  const [districts, setDistricts] = useState([]);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    districtId: '',
    itemId: '',
    quantity: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // Fetch Districts and Items for Dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const districtResponse = await axios.get('http://localhost:5000/district');
        const itemResponse = await axios.get('http://localhost:5000/items');
        setDistricts(districtResponse.data);
        setItems(itemResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire('Error', 'Failed to load data. Please try again.', 'error');
      }
    };
    fetchData();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validateForm = () => {
    let formErrors = {};
    if (!formData.districtId) formErrors.districtId = 'District is required';
    if (!formData.itemId) formErrors.itemId = 'Item is required';
    if (!formData.quantity || formData.quantity < 1) formErrors.quantity = 'Quantity must be at least 1';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:5000/api/district-requests', formData);
      Swal.fire('Success', 'Request submitted successfully!', 'success');
      setFormData({
        districtId: '',
        itemId: '',
        quantity: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      Swal.fire('Error', 'Failed to submit request. Please try again.', 'error');
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-white px-4 py-20 sm:py-38 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 flex-1">
            {/* Title Section */}
            <div className="mx-auto max-w-2xl text-center lg:text-left">
              <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
                Request Item for District
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Complete the form below to request an item for your district. Please make sure all fields are filled out correctly.
              </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="mx-auto mt-8 lg:mt-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {/* District Dropdown */}
                <div>
                  <label htmlFor="districtId" className="block text-sm font-semibold leading-6 text-gray-900">
                    District
                  </label>
                  <div className="mt-2.5">
                    <select
                      id="districtId"
                      name="districtId"
                      value={formData.districtId}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Choose a District</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    {errors.districtId && <p className="text-red-500 text-xs">{errors.districtId}</p>}
                  </div>
                </div>

                {/* Item Dropdown */}
                <div>
                  <label htmlFor="itemId" className="block text-sm font-semibold leading-6 text-gray-900">
                    Item
                  </label>
                  <div className="mt-2.5">
                    <select
                      id="itemId"
                      name="itemId"
                      value={formData.itemId}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Choose an Item</option>
                      {items.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.itemId && <p className="text-red-500 text-xs">{errors.itemId}</p>}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold leading-6 text-gray-900">
                    Quantity
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      min="1"
                    />
                    {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}
                  </div>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                    Message (Optional)
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-blue-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black border border-black"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>

          {/* Image on the Right */}
          <div className="hidden lg:block lg:w-1/2 flex items-center justify-center mt-10 lg:mt-0">
            <img
              src={foto}
              alt="Contact Illustration"
              className="object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
