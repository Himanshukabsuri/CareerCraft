import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import logo from '../assets/logoo.png'

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="w-full h-30 px-8 h-14 flex items-center justify-between border-b border-gray-200 bg-white">
        <img
          src={logo} // replace with your logo path
          alt="Logo"
          className="cursor-pointer w-32 sm:w-44 object-contain"
          onClick={() => navigate("/")}
        />

        {/* Mobile menu toggle */}
        <button className="sm:hidden">
          {sidebar ? (
            <X
              onClick={() => setSidebar(false)}
              className="w-6 h-6 text-gray-600"
            />
          ) : (
            <Menu
              onClick={() => setSidebar(true)}
              className="w-6 h-6 text-gray-600"
            />
          )}
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        {/* Page Content */}
        <main className="flex-1 bg-[#F2F7FB] p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
