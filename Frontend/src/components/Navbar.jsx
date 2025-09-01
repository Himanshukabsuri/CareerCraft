import React, { useState } from "react";
import logo from '../assets/logoo.png';
import Login from '../components/Login';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-60 bg-transparent py-4 px-6" style={{ zIndex: 60 }}>
        <div className="w-full flex items-center justify-between px-6">

          
          {/* Logo - Far Left */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="Career Craft Logo"
              className="w-36 sm:w-44 object-contain cursor-pointer"
              onClick={() => navigate('/')}
              aria-label="Navigate to homepage"
            />
          </div>

          {/* Right Section: Get Started + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Get Started Button */}
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200"
              aria-label="Open login or signup modal"
            >
              Get Started
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
                aria-label="Toggle mobile menu"
                aria-expanded={menuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white/90 shadow-lg rounded-b-lg mt-2">
            <div className="flex flex-col space-y-4 py-4 px-6">
              <button
                onClick={() => {
                  setOpen(true);
                  setMenuOpen(false);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 text-left"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Login/Signup Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-70 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all scale-100 animate-fadeIn">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
              aria-label="Close modal"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome to Career Craft</h2>

            <Login />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
