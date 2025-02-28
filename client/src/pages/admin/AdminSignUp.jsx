import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Navigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import Swal from "sweetalert2"; // Import SweetAlert2

const AdminSignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false); // Track signup status
  const [error, setError] = useState(""); // Track error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the payload for the API request
    const payload = {
      username: username,
      email: email,
      password: password,
    };

    try {
      // Make a POST request to your backend API
      const response = await axios.post("http://localhost:5000/admin", payload);

      if (response.data === "Successfully added!") {
        // Show success alert with SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Sign Up Successful!",
          text: "You can now log in with your admin account.",
          confirmButtonText: "Go to Sign In",
        }).then(() => {
          // Redirect to the sign-in page after showing the alert
          setIsSignedUp(true);
        });
      }
    } catch (error) {
      // Handle any errors from the backend
      Swal.fire({
        icon: "error",
        title: "Sign Up Failed",
        text: error.response?.data?.error || "An error occurred during signup.",
        confirmButtonText: "Try Again",
      });
      setError(error.response?.data?.error || "An error occurred during signup.");
    }
  };

  // Redirect to sign-in page after successful sign-up
  if (isSignedUp) {
    return <Navigate to="/adminLogin" />;
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
          Sign up for an admin account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2 text-base text-gray-900"
              />
            </div>
          </div>

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
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2 text-base text-gray-900"
              />
            </div>
          </div>

          {/* Display error message if any */}
          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}

          {/* Sign up button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-blue-800 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already a member?{' '}
          <a href="/adminLogin" className="font-semibold text-blue-600 hover:text-blue-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminSignUp;
