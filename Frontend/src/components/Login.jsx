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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg w-80 shadow">
        <h2 className="text-xl font-bold text-center mb-4">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          {mode === "signup" && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-3">
          {mode === "login" ? "New user?" : "Already have an account?"}{" "}
          <span
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-blue-500 cursor-pointer"
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
