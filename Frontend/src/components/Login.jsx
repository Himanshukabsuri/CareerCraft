import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const API_URL = "http://127.0.0.1:8000/api";

  const [mode, setMode] = useState("login"); // login | signup
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    if (mode === "signup" && !email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        await axios.post(`${API_URL}/register/`, {
          username,
          email,
          password,
        });
        alert("Signup successful! Please login.");
        setMode("login");
      } else {
        const res = await axios.post(`${API_URL}/token/`, {
          username,
          password,
        });

        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        window.dispatchEvent(new Event("storage"));
        navigate("/ai");
      }

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl w-full">
        
        {/* Left Image */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?auto=format&fit=crop&w=667&q=80')",
          }}
        />

        {/* Right Form */}
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Brand
          </h2>
          <p className="text-xl text-gray-600 text-center">
            {mode === "login" ? "Welcome back!" : "Create your account"}
          </p>

          {error && (
            <p className="text-red-500 text-sm text-center mt-3">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-6">
            {/* Username */}
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-200 text-gray-700 focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full"
              />
            </div>

            {/* Email (Signup only) */}
            {mode === "signup" && (
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-200 text-gray-700 focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full"
                />
              </div>
            )}

            {/* Password */}
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 text-gray-700 focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full"
              />
            </div>

            {/* Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                  ? "Login"
                  : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Toggle */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <span
                className="text-blue-500 cursor-pointer font-semibold"
                onClick={() =>
                  setMode(mode === "login" ? "signup" : "login")
                }
              >
                {mode === "login" ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
