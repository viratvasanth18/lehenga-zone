import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-6 mt-10">
      <div className="max-w-4xl w-full rounded-2xl p-10 shadow-lg">
        <h2 className="text-4xl font-bold text-blue-700 text-center mb-8">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-gray-700 mb-6">
              Have questions or need support? Reach out to us, and we'll get back to you as soon as possible.
            </p>
            <div className="p-4 rounded-lg shadow-md mb-4 flex items-center gap-4">
              <FaPhone className="text-blue-600 text-xl" />
              <span className="text-gray-800">9909090988</span>
            </div>
            <div className="p-4 rounded-lg shadow-md mb-4 flex items-center gap-4">
              <FaEnvelope className="text-red-600 text-xl" />
              <span className="text-gray-800">admin123@example.com</span>
            </div>
            <div className="p-4 rounded-lg shadow-md flex items-center gap-4">
              <FaMapMarkerAlt className="text-green-600 text-xl" />
              <span className="text-gray-800">123 Street,Kumbakonam, India</span>
            </div>
          </div>
          <form className="space-y-4 p-6 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            ></textarea>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;