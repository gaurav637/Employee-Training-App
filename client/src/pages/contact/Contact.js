import React, { useState } from 'react';
import HomeNavbar from '../../components/HomeNavbar';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: 'Lizmotors Mobility Pvt. Ltd.',
    email: 'LizmotorsMobility@gmail.com',
    subject: 'Inquiry about services',
    message: 'Hi Lizmotors Mobility Pvt. Ltd. Teams',
  });

  return (
    <div>
      <HomeNavbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h1>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                readOnly
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
