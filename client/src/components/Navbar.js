import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Section: Logo and Name */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-10 w-10"
              src="https://via.placeholder.com/40"
              alt="Logo"
            />
            <span className="ml-3 text-xl font-bold text-gray-800">TrainingHub</span>
          </div>

          {/* Right Section: Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <a
              href="/"
              className="text-gray-600 hover:text-blue-500 font-medium transition duration-300"
            >
              Home
            </a>
            <a
              href="/profile"
              className="text-gray-600 hover:text-blue-500 font-medium transition duration-300"
            >
              Profile
            </a>
            <a
              href="/login"
              className="text-gray-600 hover:text-blue-500 font-medium transition duration-300"
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
