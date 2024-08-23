import React from 'react'

const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to MyApp!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Your one-stop platform for all your training needs.
          </p>
          <a
            href="/training-list"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            View Training List
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;