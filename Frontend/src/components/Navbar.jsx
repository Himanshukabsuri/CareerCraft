import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all
      ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* LOGO */}
        <img
          src={logo}
          alt="Career Craft"
          onClick={() => navigate("/")}
          className="h-12 cursor-pointer"
        />

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8 text-gray-800">
          <li className="cursor-pointer" onClick={() => navigate("/")}>Home</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Services</li>
          <li className="cursor-pointer">Contact</li>

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700"
          >
            Get Started
          </button>
        </ul>

        {/* MOBILE MENU ICON */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow px-6 py-4 space-y-3">
          <p onClick={() => navigate("/")} className="cursor-pointer">Home</p>
          <p className="cursor-pointer">About</p>
          <p className="cursor-pointer">Services</p>
          <p className="cursor-pointer">Contact</p>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 text-white py-2 rounded-full"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
