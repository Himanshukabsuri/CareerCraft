import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/contactus/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      {/* PAGE WRAPPER */}
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 pt-16 mt-10">
        
        {/* HERO SECTION */}
        <div className="bg-blue-600 dark:bg-blue-800 py-10 text-center">
          <h1 className="text-3xl font-bold text-white">Contact Us</h1>
          <p className="text-blue-100 mt-2 text-sm">
            Have a question? We’d love to hear from you.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mt-10">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Send us a message
          </h2>

          {success && (
            <p className="text-green-600 text-sm text-center mb-3">
              {success}
            </p>
          )}
          {error && (
            <p className="text-red-600 text-sm text-center mb-3">
              {error}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone (optional)"
              className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white py-2.5 rounded-md font-semibold transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
