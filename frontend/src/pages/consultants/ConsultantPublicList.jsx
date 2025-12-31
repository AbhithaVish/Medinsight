import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function ConsultantPublicList() {
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    api.get("/consultants/public").then(res => {
      setConsultants(res.data);
    });
  }, []);

  return (
    <div style={{ padding: 40, background: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <div style={header}>
        <div>
          <h1>Medical Consultants</h1>
          <p style={{ color: "#64748b" }}>
            Find trusted consultants for hospital patient support
          </p>
        </div>

        <div>
          <Link to="/consultants/login">
            <button className="btn-outline">Consultant Login</button>
          </Link>
          <Link to="/consultants/register">
            <button className="btn-primary" style={{ marginLeft: 10 }}>
              Join as Consultant
            </button>
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div style={grid}>
        {consultants.map(c => (
          <div key={c.id} style={card}>
            <h3>{c.name}</h3>

            <p>👨‍⚕️ Experience: {c.experience_years} years</p>
            <p style={{ fontWeight: 600 }}>
              💰 Rs. {c.hourly_rate} / hour
            </p>

            {c.ConsultantHospitals?.map((h, i) => (
              <p key={i}>🏥 {h.hospital_name} – {h.location}</p>
            ))}

            <p style={{ color: "#64748b" }}>{c.bio}</p>

            <a href={`tel:${c.phone}`} style={contactBtn}>
              Contact Consultant
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Styles */
const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 30
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 20
};

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
};

const contactBtn = {
  display: "block",
  marginTop: 12,
  padding: 10,
  background: "#2563eb",
  color: "#fff",
  textAlign: "center",
  borderRadius: 10,
  textDecoration: "none"
};
