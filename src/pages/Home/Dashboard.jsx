import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <h3 className="font-bold">X-Ray Analysis</h3>
          <button onClick={()=>nav("/home/xray")} className="mt-3 bg-white text-blue-700 px-3 py-1 rounded">Upload</button>
        </div>
        <div className="p-6 rounded-2xl bg-white border">
          <h3 className="font-bold">Pharmacy</h3>
          <button onClick={()=>nav("/home/pharmacy")} className="mt-3 text-blue-600">Open Pharmacy</button>
        </div>
        <div className="p-6 rounded-2xl bg-white border">
          <h3 className="font-bold">Appointments</h3>
          <button onClick={()=>nav("/home/booking")} className="mt-3 text-blue-600">Book</button>
        </div>
      </div>
    </div>
  );
}
