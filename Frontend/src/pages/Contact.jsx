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
        setSuccess(data.message);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white pt-16 mt-10">
      

        {/* HERO */}
        <div className="bg-blue-600 dark:bg-blue-700 py-10 text-center">
          <h1 className="text-3xl font-bold text-white">Contact Us</h1>
          <p className="text-blue-100 mt-2 text-sm">
            Have a question? We’d love to hear from you.
          </p>
        </div>

        {/* FORM */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mt-10">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Send us a message
          </h2>

          {success && (
            <p className="text-green-600 text-sm text-center mb-3">{success}</p>
          )}
          {error && (
            <p className="text-red-600 text-sm text-center mb-3">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full p-2.5 border rounded-md dark:bg-gray-800"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full p-2.5 border rounded-md dark:bg-gray-800"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone (optional)"
              className="w-full p-2.5 border rounded-md dark:bg-gray-800"
            />
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              className="w-full p-2.5 border rounded-md dark:bg-gray-800"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-semibold transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

   
    </>
  );
};

export default Contact;
