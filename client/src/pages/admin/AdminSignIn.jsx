import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Navigate } from "react-router-dom";
import axios from "axios"; // For making HTTP requests
import Swal from "sweetalert2"; // SweetAlert2 for alerts

const AdminSignIn = () => {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [isSignedIn, setIsSignedIn] = useState(false); // Track sign-in status

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload for the API request
    const payload = {
      email: email,
      password: password,
    };

    try {
      // Make a POST request to the backend sign-in route
      const response = await axios.post("http://localhost:5000/admin/signin", payload);

      if (response.status === 200) {
        // If successful, show success alert
        Swal.fire({
          icon: "success",
          title: "Logged in successfully!",
          text: "Welcome back to the admin panel.",
          confirmButtonText: "Proceed",
        }).then(() => {
          // Redirect to admin dashboard (or another page) after successful login
          setIsSignedIn(true);
        });
      }
    } catch (error) {
      // If error occurs (wrong credentials, etc.), show error alert
      Swal.fire({
        icon: "error",
        title: "Sign-in Failed",
        text: error.response?.data?.error || "An error occurred during sign-in.",
        confirmButtonText: "Try Again",
      });
    }
  };

  // Redirect to the admin dashboard after a successful sign-in
  if (isSignedIn) {
    return <Navigate to="/sidebar" />; // Modify with the actual route for admin dashboard
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={logo}
          className="mx-auto h-12 w-auto mb-6"
        />
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Sign in to your admin account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2 text-base text-gray-900"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2 text-base text-gray-900"
              />
            </div>
          </div>

          {/* Sign in button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-blue-800 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignIn;
