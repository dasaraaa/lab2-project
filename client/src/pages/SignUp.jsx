import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const phoneRegex = /^[+]?[0-9]{10,15}$/;

    if (!formData.name) newErrors.name = 'Name is required';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!passwordRegex.test(formData.password))
      newErrors.password = 'Password must be at least 8 characters long and contain both letters and numbers';
    if (!phoneRegex.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Invalid phone number. Must be between 10 to 15 digits and may include a leading "+"';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const onSubmit = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/auth', data);
    console.log(response.data);
    // Check if response indicates success (e.g., status code 200)
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      throw new Error('Failed to create account');
    }
  } catch (error) {
    console.error('Error during signup:', error);
    return false;
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (validate()) {
    const isSuccess = await onSubmit(formData);
    if (isSuccess) {
      Swal.fire('Success', 'Account created successfully!', 'success');
      navigate("/signin");
    } else {
      Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
    }
  }
};


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center">
          <a href="#" className="text-4xl text-gray-900 dark:text-white mb-6">
            UBT Inventory System
          </a>
        </div>
        <div className="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="font-bold leading-tight tracking-tight text-gray-900 md:text-xl text-center dark:text-white">
              Create an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@gmail.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+383 49 ••• •••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-900 hover:bg-white hover:text-black border border-blue-800 font-medium text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{' '}
                <a href="/signin" className="font-medium text-primary-600 hover:underline">
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
