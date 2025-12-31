import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function AssistantList() {
  const [assistants, setAssistants] = useState([]);

  useEffect(() => {
    api.get("/assistants").then(res => setAssistants(res.data));
  }, []);

  return (
    <DashboardLayout title="Hospital Assistants">
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <Link to="/assistants/login" className="btn-outline">
          Assistant Login
        </Link>
        <Link to="/assistants/register" className="btn-primary">
          Become an Assistant
        </Link>
      </div>

      <div className="grid">
        {assistants.map(a => (
          <div key={a.id} className="card">
            <h3>{a.name}</h3>
            <p>{a.bio}</p>
            <p><b>Experience:</b> {a.experience_years} years</p>
            <p><b>Rate:</b> Rs. {a.hourly_rate}/hour</p>

            <button className="btn-primary">
              Contact Assistant
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
 