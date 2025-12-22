import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoo.png";
import Login from "../components/Login";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  // /* 🌗 LOAD THEME */
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme") || "light";
  //   setTheme(savedTheme);
  //   document.documentElement.classList.toggle("dark", savedTheme === "dark");
  // }, []);

  /* 🌗 TOGGLE THEME */
  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   localStorage.setItem("theme", newTheme);
  //   document.documentElement.classList.toggle("dark", newTheme === "dark");
  // };

  return (
    <>
      {/* NAVBAR */}
      <nav className={`fixed -top-1 left-0 w-full z-50
        bg-white dark:bg-gray-900 shadow-md
        transition-colors duration-300"
        ${
    isScrolled
      ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
      : "bg-transparent"
  }`}>

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

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
            -mt- 3        /* thoda upar pull */
            scale-150          /* visually bada lage */
            transition-all
            dark:invert dark:brightness-200
  "
/>


          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-10 text-sm font-medium
            text-gray-800 dark:text-gray-100">

            <li className="cursor-pointer" onClick={() => navigate("/")}>Home</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Services</li>
            <li className="cursor-pointer">Contact</li>

            {/* THEME TOGGLE */}
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-full
              bg-gray-200 dark:bg-gray-700 transition"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button> */}

            {/* LOGIN */}
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full
              hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </ul>

          {/* MOBILE ICON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800 dark:text-white"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900
            shadow-lg px-6 py-6 space-y-4">

            <p onClick={() => navigate("/")} className="cursor-pointer">Home</p>
            <p className="cursor-pointer">About</p>
            <p className="cursor-pointer">Services</p>
            <p className="cursor-pointer">Contact</p>

            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-full
              bg-gray-200 dark:bg-gray-700"
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>

            <button
              onClick={() => {
                setOpen(true);
                setMenuOpen(false);
              }}
              className="w-full bg-blue-600 text-white py-2 rounded-full"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* LOGIN MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60
          flex items-center justify-center z-50">

          <div className="bg-white dark:bg-gray-900
            p-8 rounded-2xl w-full max-w-md relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center mb-6
              text-gray-800 dark:text-white">
              Welcome to Career Craft
            </h2>

            <Login />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
