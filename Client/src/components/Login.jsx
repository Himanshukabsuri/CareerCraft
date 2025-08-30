import React, { useState } from "react";

const LoginPopup = ({ onClose }) => {
  const [mode, setMode] = useState("signup"); // "signup" or "login"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && !name.trim()) return setError("Enter your name");
    if (!email.trim()) return setError("Enter your email");
    if (!password.trim()) return setError("Enter your password");

    console.log("Form submitted:", { name, email, password, mode });

    // reset
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-xl w-full max-w-sm text-white animate-scaleIn">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white/70 hover:text-white"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          {mode === "signup" ? "Create Account" : "Login"}
        </h2>

        {/* Error */}
        {error && <p className="text-red-400 text-sm mb-3 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 outline-none placeholder-white/60"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 outline-none placeholder-white/60"
          />
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

        {/* Switch */}
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
