import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function AssistantPublicList() {

  const [assistants, setAssistants] = useState([]);

  useEffect(() => {
    api.get("/assistants/public").then(res => {
      setAssistants(res.data);
    });
  }, []);

  return (
    <DashboardLayout title="Hospital Assistants">

      <div style={pageWrapper}>

        {/* ================= PORTAL SECTION ================= */}
        <div style={portalWrapper}>

          <div style={portalContent}>
            <h2>👩‍⚕️ Are You a Hospital Assistant?</h2>

            <p style={{ color: "#64748b", marginTop: 10 }}>
              Join MediInsight and connect with patients who need
              trusted hospital assistance and caregiving services.
            </p>

            <div style={{ marginTop: 20 }}>
              <Link to="/assistants/login">
                <button style={outlineBtn}>
                  Assistant Login
                </button>
              </Link>

              <Link to="/assistants/register">
                <button style={primaryBtn}>
                  Join as Assistant
                </button>
              </Link>
            </div>
          </div>

          <div style={portalImage}>
            <img
              src="imgs/assitant.png"
              alt="assistant"
              style={{ width: "260px" }}
            />
          </div>

        </div>

        {/* ================= ASSISTANT GRID ================= */}
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

              <p style={bioText}>{a.bio}</p>

              <a href={`tel:${a.phone}`} style={contactBtn}>
                Contact Assistant
              </a>

            </div>
          ))}
        </div>

      </div>

    </DashboardLayout>
  );
}


/* ================= PAGE ================= */

const pageWrapper = {
  padding: "40px",
  background: "#f8fafc",
  minHeight: "100vh"
};


/* ================= PORTAL ================= */

const portalWrapper = {
  background: "white",
  borderRadius: "18px",
  padding: "40px",
  marginBottom: "40px",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  boxShadow: "0 20px 40px rgba(0,0,0,0.06)"
};

const portalContent = {
  maxWidth: "520px"
};

const portalImage = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};


/* ================= BUTTONS ================= */

const primaryBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 22px",
  borderRadius: "10px",
  cursor: "pointer",
  marginLeft: "12px",
  fontWeight: 600
};

const outlineBtn = {
  background: "transparent",
  border: "2px solid #2563eb",
  color: "#2563eb",
  padding: "12px 22px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600
};


/* ================= GRID ================= */

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 25
};


/* ================= CARD ================= */

const cardStyle = {
  background: "#ffffff",
  borderRadius: 16,
  padding: 22,
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  transition: "0.3s"
};

const bioText = {
  marginTop: 8,
  color: "#64748b"
};

const contactBtn = {
  display: "block",
  marginTop: 15,
  textAlign: "center",
  padding: "11px",
  borderRadius: 10,
  background: "#2563eb",
  color: "#fff",
  textDecoration: "none",
  fontWeight: 600
};