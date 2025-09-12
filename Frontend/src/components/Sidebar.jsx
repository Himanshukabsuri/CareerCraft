import React, { useEffect, useState } from "react";
import { House, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/Resume-builder", label: "Roadmap", Icon: FileText },
  { to: "/ai/resume-form", label: "Resume Form", Icon: FileText }, // 👈 new
];


const Sidebar = ({ sidebar, setSidebar }) => {
  const [username, setUsername] = useState(""); // 👈 state for username

  useEffect(() => {
    // API call to fetch logged-in user's username
    fetch("http://localhost:8000/api/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access_token"), // JWT token
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user: " + res.status);
        return res.json();
      })
      .then((data) => setUsername(data.username)) // 👈 set username from API
      .catch((err) => console.error("Error fetching username:", err));
  }, []);

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center 
      max-sm:absolute top-14 bottom-0 
      ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"} 
      transition-all duration-300 ease-in-out`}
    >
      {/* Profile Section */}
      <div className="my-7 w-full">
        <img
          src="/avatar.png"
          alt="User avatar"
          className="w-14 h-14 rounded-full mx-auto object-cover"
        />
        {/* 👈 display username dynamically */}
        <h1 className="mt-2 text-center font-semibold text-gray-700">
          {username || "Loading..."}
        </h1>

        {/* Navigation Links */}
        <div className="px-6 mt-6 text-sm font-medium text-gray-600 space-y-2">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded-lg transition-colors duration-200 
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white shadow-md"
                    : "hover:bg-gray-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-600"}`} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
