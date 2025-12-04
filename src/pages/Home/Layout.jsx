import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";   // adapt path to where you put Sidebar
import Header from "../components/Header";

export default function HomeLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
