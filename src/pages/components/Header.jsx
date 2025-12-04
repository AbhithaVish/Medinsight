// src/components/Header.jsx
import React from "react";
import { Search, Bell, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ cartCount = 0, mobileToggle }) {
  const navigate = useNavigate();
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 w-1/2">
        <button className="md:hidden text-gray-500" onClick={mobileToggle}><Menu /></button>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search for doctors, medicines, or reports..." className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="hidden sm:inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm shadow-sm hover:shadow-md" onClick={() => navigate("/login")}>Log in</button>
        <button className="hidden sm:inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600" onClick={() => navigate("/login")}>Sign up</button>

        <button className="relative text-gray-500 hover:text-blue-600 transition"><Bell size={20} /><span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span></button>
        <button onClick={() => navigate("/home/booking")} className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200">Book Appointment</button>
        <button className="relative text-gray-600" title="Open cart">Cart <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">{cartCount}</span></button>
      </div>
    </header>
  );
}
