import React from 'react';
import HomeNavbar from '../../components/HomeNavbar';

const About = () => {
  return (
    <div>
      <HomeNavbar />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About TrainingHub</h1>
          <p className="text-gray-600 mb-6">
            <span className="font-semibold">TrainingHub</span> is a comprehensive software solution developed by 
            <span className="font-semibold text-blue-600"> Lizmotors Mobility Pvt. Ltd.</span> to streamline and manage employee training programs effectively.
          </p>
          <p className="text-gray-600 mb-6">
            Our platform is designed to provide a seamless learning experience with an intuitive interface, allowing employees to access training modules, track progress, and achieve their learning goals efficiently.
          </p>
          <p className="text-gray-600 mb-6">
            At Lizmotors Mobility Pvt. Ltd., we are committed to empowering organizations with the tools they need to upskill their workforce, driving both personal and professional growth.
          </p>
          <p className="text-gray-600 mb-6">
            Whether you are an employee seeking to enhance your skills or a manager looking to monitor and manage training progress, <span className="font-semibold">TrainingHub</span> is built to meet all your training needs in one place.
          </p>
          <a
            href="/contact"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
