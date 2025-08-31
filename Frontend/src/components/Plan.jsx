import React from "react";

const Plans = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Free Plan</h2>
          <p className="text-3xl font-semibold text-blue-600 mb-6">₹0 / month</p>
          <ul className="space-y-3 text-gray-700 mb-6">
            <li>✅ Basic access</li>
            <li>✅ Limited features</li>
            <li>✅ Community support</li>
          </ul>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Premium Plan</h2>
          <p className="text-3xl font-semibold text-blue-600 mb-6">₹499 / month</p>
          <ul className="space-y-3 text-gray-700 mb-6">
            <li>✅ Unlimited Job Search</li>
            <li>✅ Resume Build with AI</li>
            <li>✅ Unlimited Chat</li>
            <li>✅ Guidance for Developing Skills</li>
          </ul>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
