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
    <div className="min-h-screen bg-amber-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-4xl shadow-xl p-8">

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          CareerCraft
        </h2>
        <p className="text-gray-600 text-center mt-2">
          {mode === "login"
            ? "Sign in to your account"
            : "Create your free account"}
        </p>

        {error && (
          <div className="mt-6 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* USERNAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full rounded-xl border border-gray-600
                px-4 py-3 text-gray-900 bg-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* EMAIL (SIGNUP ONLY) */}
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full rounded-xl border border-gray-600
                  px-4 py-3 text-gray-900 bg-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              />
            </div>
          )}

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full rounded-xl border border-gray-600
                px-4 py-3 text-gray-900 bg-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-blue-600 hover:bg-blue-700
              text-white font-semibold py-3 rounded-xl
              transition disabled:opacity-60
            "
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        {/* TOGGLE */}
        <p className="mt-8 text-center text-sm text-gray-600">
          {mode === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
            className="text-blue-600 font-semibold hover:underline"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
