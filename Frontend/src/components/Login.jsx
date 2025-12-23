import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ open: controlledOpen, onClose }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(true);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const navigate = useNavigate();
  const API_URL = "http://127.0.0.1:8000/api";

  const [mode, setMode] = useState("signup"); // "signup" | "login"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const requestClose = () => {
    // Hide self if uncontrolled
    if (!isControlled) setUncontrolledOpen(false);
    // Notify parent if provided
    onClose?.();
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && !username.trim()) return setError("Enter your username");
    if (mode === "signup" && !email.trim()) return setError("Enter your email");
    if (!password.trim()) return setError("Enter your password");

    setLoading(true);
    try {
      if (mode === "signup") {
        await axios.post(`${API_URL}/register/`, { username, email, password });
        alert("Signup successful! You can now login.");
        setMode("login");
      } else {
        const res = await axios.post(`${API_URL}/token/`, { username, password });
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        navigate("/ai");
        requestClose(); // close after successful login
      }
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          // show first validation error if present
          (err.response?.data && Object.values(err.response.data)[0]) ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={requestClose} // backdrop click
    >
      <div
        className="relative w-full max-w-sm rounded-xl bg-white/10 p-6 text-white backdrop-blur-md animate-scaleIn"
        onClick={(e) => e.stopPropagation()} // block backdrop close when clicking inside
        role="dialog"
        aria-modal="true"
      >
        {/* Close (ensure type=button so forms never submit) */}
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className="absolute right-3 top-2 text-white/70 hover:text-white"
        >
          ✕
        </button>

        <h2 className="mb-2 text-center text-2xl font-bold">
          {mode === "signup" ? "Create Account" : "Login"}
        </h2>

        {error && <p className="mb-3 text-center text-sm text-red-400">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg bg-white/20 px-4 py-2 outline-none placeholder-white/60 focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-white/20 px-4 py-2 outline-none placeholder-white/60 focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}

          {mode === "login" && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg bg-white/20 px-4 py-2 outline-none placeholder-white/60 focus:ring-2 focus:ring-blue-400"
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-white/20 px-4 py-2 outline-none placeholder-white/60 focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-500 py-2 font-semibold hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
          <span
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="cursor-pointer text-blue-300"
          >
            {mode === "signup" ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
