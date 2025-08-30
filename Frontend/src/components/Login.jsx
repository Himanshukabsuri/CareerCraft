import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LoginPopup = ({ onClose }) => {
  const [mode, setMode] = useState("signup"); // "signup" or "login"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const API_URL = "http://127.0.0.1:8000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && !username.trim()) return setError("Enter your username");
    if (mode === "signup" && !email.trim()) return setError("Enter your email");
    if (!password.trim()) return setError("Enter your password");

    try {
      if (mode === "signup") {
        // Signup request
        const res = await axios.post(`${API_URL}/register/`, {
          username,
          email,
          password,
        });
        console.log("Registered:", res.data);
        alert("Signup successful! You can now login.");
        setMode("login"); // switch to login after signup
      } else {
        // Login request using username
        const res = await axios.post(`${API_URL}/token/`, {
          username, // using username now
          password,
        });
        console.log("Logged in:", res.data);

        // Save JWT tokens
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);

        navigate('/tools')
        onClose(); // close popup
      }

      // reset form
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-xl w-full max-w-sm text-white animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white/70 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-2">
          {mode === "signup" ? "Create Account" : "Login"}
        </h2>

        {error && <p className="text-red-400 text-sm mb-3 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 outline-none placeholder-white/60"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 outline-none placeholder-white/60"
              />
            </>
          )}

          {mode === "login" && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 outline-none placeholder-white/60"
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 outline-none placeholder-white/60"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 font-semibold"
          >
            {mode === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
          <span
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="text-blue-300 cursor-pointer"
          >
            {mode === "signup" ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
