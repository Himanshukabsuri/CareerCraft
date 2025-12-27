import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-[#F2F7FB]">
      {/* ===== TOP NAVBAR ===== */}
      <nav className="fixed top-0 left-0 z-50 w-full h-14 px-6 flex items-center justify-between bg-white border-b border-gray-200">
        {/* Mobile menu toggle */}
        <button className="sm:hidden">
          {sidebar ? (
            <X
              onClick={() => setSidebar(false)}
              className="w-6 h-6 text-gray-700"
            />
          ) : (
            <Menu
              onClick={() => setSidebar(true)}
              className="w-6 h-6 text-gray-700"
            />
          )}
        </button>
      </nav>

      {/* ===== SIDEBAR ===== */}
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

      {/* ===== MAIN CONTENT ===== */}
      <main
        className="
          pt-16
          sm:ml-72
          px-4
          min-h-screen
          transition-all
        "
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
