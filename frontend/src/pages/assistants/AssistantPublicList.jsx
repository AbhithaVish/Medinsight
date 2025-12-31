import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function AssistantPublicList() {
  const [assistants, setAssistants] = useState([]);

  useEffect(() => {
    api.get("/assistants/public").then(res => {
      setAssistants(res.data);
    });
  }, []);

  return (
    <div style={{ padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      {/* ===== Header ===== */}
      <div style={headerStyle}>
        <div>
          <h1 style={{ margin: 0 }}>Hospital Assistants</h1>
          <p style={{ color: "#64748b" }}>
            Find verified hospital assistants to support your loved ones
          </p>
        </div>

        <div>
          <Link to="/assistants/login">
            <button className="btn-outline">Assistant Login</button>
          </Link>
          <Link to="/assistants/register">
            <button className="btn-primary" style={{ marginLeft: 10 }}>
              Join as Assistant
            </button>
          </Link>
        </div>
      </div>

      {/* ===== Cards ===== */}
      <div style={gridStyle}>
        {assistants.map(a => (
          <div key={a.id} style={cardStyle}>
            <h3>{a.name}</h3>

            <p>👩‍⚕️ Experience: {a.experience_years} years</p>
            <p style={{ fontWeight: 600 }}>
              💰 Rs. {a.hourly_rate} / hour
            </p>

            {/* Hospitals */}
            {a.AssistantHospitals?.map((h, i) => (
              <p key={i} style={{ color: "#475569" }}>
                🏥 {h.hospital_name} – {h.location}
              </p>
            ))}

            <p style={{ marginTop: 8, color: "#64748b" }}>
              {a.bio}
            </p>

            <a
              href={`tel:${a.phone}`}
              style={contactBtn}
            >
              Contact Assistant
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== Styles ===== */

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 30
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 20
};

const cardStyle = {
  background: "#fff",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
};

const contactBtn = {
  display: "block",
  marginTop: 12,
  textAlign: "center",
  padding: "10px",  
  borderRadius: 10,
  background: "#2563eb",
  color: "#fff",
  textDecoration: "none"
};
