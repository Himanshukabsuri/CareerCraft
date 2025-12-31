import React, { useEffect, useState } from "react";
import { House, FileText, ScanSearch } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/Resume-builder", label: "Roadmap", Icon: FileText },
  { to: "/ai/resume-form", label: "Resume Form", Icon: FileText },

  // 🔥 ATS ANALYZER ADDED
  { to: "/ai/ats-analyzer", label: "ATS Analyzer", Icon: ScanSearch },

  { to: "/ai/roadmap-history", label: "Roadmap History", Icon: FileText },
  { to: "/ai/resume-history", label: "Resume History", Icon: FileText },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access") || localStorage.getItem("access_token");
    if (!token) return;

    fetch("http://localhost:8000/api/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.username) setUsername(data.username);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <aside
      className={`
        fixed top-14 left-0 z-40 mt-10
        h-[calc(100vh-56px)] w-72
        bg-white border-r border-gray-200
        transition-transform duration-300
        max-sm:absolute
        ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"}
      `}
    >
      {/* ===== PROFILE ===== */}
      <div className="py-6 border-b border-gray-100 text-center">
     <img
  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
  alt="User"
  className="w-20 h-20 rounded-full mx-auto object-cover bg-gray-100"
 />

        <h2 className="mt-2 font-semibold text-gray-700">
          {username || "Loading..."}
        </h2>
      </div>

      {/* ===== NAV LINKS ===== */}
      <nav className="px-4 py-4 space-y-2 text-sm font-medium">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/ai"}
            onClick={() => setSidebar(false)}
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-4 py-2 rounded-lg transition
              ${
                isActive
                  ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
