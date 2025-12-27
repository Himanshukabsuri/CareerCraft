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
        setError("Something went wrong");
      }
    } catch {
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white pt-24">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Have a question? We’d love to hear from you.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="max-w-2xl mx-auto bg-white border border-gray-800 p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
            Send us a message
          </h2>

          {success && (
            <p className="text-green-600 text-sm text-center mb-4">
              {success}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">
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
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone (optional)"
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
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
