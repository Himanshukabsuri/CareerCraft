import React from "react";

const Plans = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-6 md:p-12">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Free Plan</h2>
          <p className="text-4xl font-semibold text-blue-600 mb-6">₹0 / month</p>
          <ul className="space-y-4 text-gray-600 mb-8">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Basic access
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Limited features
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Community support
            </li>
          </ul>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300">
            Get Started
          </button>
        </div>

        {/* Premium Plan */}
        <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <span className="absolute top-0 right-0 bg-yellow-400 text-gray-800 text-sm font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
            Recommended
          </span>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Premium Plan</h2>
          <p className="text-4xl font-semibold text-blue-600 mb-6">₹499 / month</p>
          <ul className="space-y-4 text-gray-600 mb-8">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Unlimited Job Search
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Resume Build with AI
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Unlimited Chat
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Guidance for Developing Skills
            </li>
          </ul>
          <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-900 transition-all duration-300">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plans;