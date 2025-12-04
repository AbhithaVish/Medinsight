import React, { useEffect, useState } from "react";
import { getAppointments } from "../../api/api";

export default function Booking() {
  const [appts, setAppts] = useState([]);
  useEffect(()=>{ (async ()=>{ setAppts(await getAppointments()); })(); }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold">Appointments</h2>
      <div className="mt-4 space-y-3">
        {appts.length === 0 ? <div>No appointments</div> : appts.map(a => (
          <div key={a.id} className="p-3 border rounded">
            <div className="font-semibold">{a.doctor}</div>
            <div className="text-xs text-gray-500">{new Date(a.date_time || a.date).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
