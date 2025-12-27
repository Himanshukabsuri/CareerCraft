import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoo.png";

import { isLoggedIn, logout } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleStorage = () => {
      setLoggedIn(isLoggedIn());
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed -top-1 left-0 w-full z-50 pt-3
        bg-white dark:bg-gray-950 shadow-md
        transition-colors duration-300 "
        ${
          isScrolled
            ? "bg-white/50 dark:bg-gray-950/50 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-[80px]">
          {/* LOGO */}

          <img
            src={logo}
            alt="Career Craft"
            onClick={() => navigate("/")}
            className="
            h-[100px]           /* actual height increase */
            w-auto
            object-contain
            cursor-pointer
            -mt- 2        /* thoda upar pull */
            scale-130          /* visually bada lage */
            transition-all
            dark:invert dark:brightness-200
  "
          />

          <ul className="hidden md:flex items-center gap-8 text-gray-100 font-medium">
            <li onClick={() => navigate("/")} className="cursor-pointer">
              Home
            </li>
            <li className="cursor-pointer">About</li>
            <li
              onClick={() => navigate("/tools")}
              className="cursor-pointer hover:text-blue-600"
            >
              Services
            </li>

            <li
              onClick={() => navigate("/contact")}
              className="cursor-pointer hover:text-blue-600"
            >
              Contact
            </li>

            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-full"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-5 py-2 rounded-full"
              >
                Get Started
              </button>
            )}
          </ul>

          {/* MOBILE ICON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
            <p onClick={() => navigate("/")} className="cursor-pointer">
              Home
            </p>
            <p className="cursor-pointer">About</p>
            <p onClick={() => navigate("/tools")} className="cursor-pointer">
              Services
            </p>
            <p onClick={() => navigate("/contact")} className="cursor-pointer">
              Contact
            </p>

            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                Get Started
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
