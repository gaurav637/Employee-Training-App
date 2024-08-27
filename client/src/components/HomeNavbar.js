import React from "react";

const HomeNavbar = () => {
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
    
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-10"
                src="data:image/jpeg;base64,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"
                alt="Logo"
              />
              <span className="ml-3 text-xl font-bold text-gray-800">TrainingHub</span>
            </div>
  
            {/* Right Section: Navigation Links */}
            <div className="hidden md:flex space-x-6 items-center">
              <a
                href="/home"
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
                href="/training"
                className="text-gray-600 hover:text-blue-500 font-medium transition duration-300"
              >
                Training List
              </a>
          
              <a
                href="/about"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                About
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

export default HomeNavbar;
