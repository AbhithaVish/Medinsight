// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Activity, UploadCloud, ShoppingBag, Users, HeartHandshake } from "lucide-react";

export default function Sidebar() {
  const NavItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
          isActive ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col justify-between">
      <div>
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <div className="flex items-center gap-2 text-blue-600">
            <Activity size={28} strokeWidth={2.5} />
            <span className="text-xl font-bold tracking-tight">MedInsight</span>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
          <NavItem to="/home" icon={<Activity size={18} />} label="Dashboard" />
          <NavItem to="/home/xray" icon={<UploadCloud size={18} />} label="AI X-Ray Analysis" />
          <NavItem to="/home/pharmacy" icon={<ShoppingBag size={18} />} label="Pharmacy" />
          <NavItem to="/home/booking" icon={<Users size={18} />} label="Booking" />
          <NavItem to="/home/support" icon={<HeartHandshake size={18} />} label="Support" />
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold">AV</div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">Abhitha V.</p>
            <p className="text-xs text-gray-500 truncate">Patient Profile</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
