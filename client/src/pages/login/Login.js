import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  const navigate = useNavigate(); // React Router's navigation hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${process.env.REACT_APP_BACKEND_URL}/employee/login`;
    try {
      const response = await axios.post(URL, formData);
      toast.success(response.data.message);

      if (response.data.success) {
        console.log("success 26");
       //  console.log("token-> ",response?.data?.token);
        localStorage.setItem('token', response?.data?.token);
        navigate("/home");
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg); // Display error using toast
      setErrorMessage(errorMsg); // Set error message in state to display on the screen
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          TrainingHub
        </h2>

        {/* Display Error Message */}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Log In
          </button>
        </form>

        {/* Forgot Password and Signup */}
        <div className="text-center text-gray-600 mt-4">
          <p className="mt-2">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
