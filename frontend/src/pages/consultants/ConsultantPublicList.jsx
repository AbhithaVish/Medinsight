import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function ConsultantPublicList() {

  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    api.get("/consultants/public").then(res => {
      setConsultants(res.data);
    });
  }, []);

  return (
    <DashboardLayout title="Medical Consultants">

      <div style={pageWrapper}>

        {/* ================= CONSULTANT PORTAL ================= */}
        <div style={portalWrapper}>

          <div style={portalContent}>
            <h2>👨‍⚕️ Are You a Medical Consultant?</h2>

            <p style={{ color: "#64748b", marginTop: 10 }}>
              Join MediInsight and provide professional consultation
              services to patients and hospital visitors who need guidance.
            </p>

            <div style={{ marginTop: 20 }}>
              <Link to="/consultants/login">
                <button style={outlineBtn}>
                  Consultant Login
                </button>
              </Link>

              <Link to="/consultants/register">
                <button style={primaryBtn}>
                  Join as Consultant
                </button>
              </Link>
            </div>
          </div>

          <div style={portalImage}>
            <img
              src="/consultant-portal.png"
              alt="consultant"
              style={{ width: "260px" }}
            />
          </div>

        </div>

        {/* ================= CONSULTANT GRID ================= */}
        <div style={gridStyle}>
          {consultants.map(c => (
            <div key={c.id} style={cardStyle}>

              <h3>{c.name}</h3>

              <p>👨‍⚕️ Experience: {c.experience_years} years</p>

              <p style={{ fontWeight: 600 }}>
                💰 Rs. {c.hourly_rate} / hour
              </p>

              {c.ConsultantHospitals?.map((h, i) => (
                <p key={i} style={{ color: "#475569" }}>
                  🏥 {h.hospital_name} – {h.location}
                </p>
              ))}

              <p style={bioText}>{c.bio}</p>

              <a href={`tel:${c.phone}`} style={contactBtn}>
                Contact Consultant
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
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
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