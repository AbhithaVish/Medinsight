import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function ConsultantDashboard() {
  const [consultant, setConsultant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/consultants/me")
      .then(res => setConsultant(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Consultant Dashboard">
        <p>Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Consultant Dashboard">
      {/* ===== PROFILE CARD ===== */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          marginBottom: 24
        }}
      >
        <h2 style={{ marginBottom: 6 }}>{consultant.name}</h2>
        <p style={{ color: "#64748b", marginBottom: 10 }}>
          {consultant.bio || "No bio provided"}
        </p>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <Stat label="Experience" value={`${consultant.experience_years} yrs`} />
          <Stat label="Hourly Rate" value={`Rs. ${consultant.hourly_rate}`} />
          <Stat
            label="Hospitals"
            value={consultant.ConsultantHospitals.length}
          />
        </div>
      </div>

      {/* ===== HOSPITAL LIST ===== */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
        }}
      >
        <h3 style={{ marginBottom: 16 }}>Working Hospitals</h3>

        {!consultant.ConsultantHospitals.length ? (
          <p style={{ color: "#64748b" }}>
            No hospitals added yet
          </p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {consultant.ConsultantHospitals.map(h => (
              <div
                key={h.id}
                style={{
                  padding: 14,
                  borderRadius: 12,
                  background: "#f8fafc",
                  border: "1px solid #e5e7eb"
                }}
              >
                <strong>{h.hospital_name}</strong>
                <p style={{ margin: 0, color: "#64748b" }}>
                  📍 {h.location || "Location not specified"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ===== SMALL STAT CARD ===== */
function Stat({ label, value }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        padding: "12px 18px",
        borderRadius: 12,
        minWidth: 120
      }}
    >
      <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>{label}</p>
      <strong style={{ fontSize: 18 }}>{value}</strong>
    </div>
  );
}
