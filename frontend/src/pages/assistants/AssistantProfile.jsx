import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/AssistantDashboardLayout";
import "./AssistantProfile.css";

export default function AssistantProfile() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience_years: "",
    hourly_rate: "",
    bio: ""
  });

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= LOAD PROFILE ================= */

  useEffect(() => {
    api.get("/assistants/me")
      .then(res => {
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          experience_years: res.data.experience_years || "",
          hourly_rate: res.data.hourly_rate || "",
          bio: res.data.bio || ""
        });

        setHospitals(res.data.hospitals || []);
      })
      .catch(() => alert("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  /* ================= UPDATE PROFILE ================= */

  const saveProfile = async () => {
    setSaving(true);

    try {
      await api.put("/assistants/me", form);
      alert("Profile updated successfully");
    } catch {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="profile-loading">Loading profile...</p>;

  return (
    <DashboardLayout title="My Assistant Profile">

      <div className="profile-container">

        {/* ===== PROFILE HEADER ===== */}

        <div className="profile-header">

          <div className="profile-avatar">
            {form.name ? form.name.charAt(0).toUpperCase() : "A"}
          </div>

          <div>
            <h2>{form.name || "Assistant"}</h2>
            <p className="profile-email">{form.email}</p>
          </div>

        </div>

        {/* ===== BASIC INFO CARD ===== */}

        <div className="profile-card">

          <h3>Basic Information</h3>

          <div className="profile-grid">

            <div className="form-group">
              <label>Full Name</label>
              <input
                value={form.name}
                onChange={e =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input value={form.email} disabled />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                value={form.phone}
                onChange={e =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Experience (years)</label>
              <input
                type="number"
                value={form.experience_years}
                onChange={e =>
                  setForm({ ...form, experience_years: e.target.value })
                }
              />
            </div>

            <div className="form-group full">
              <label>Hourly Rate (Rs.)</label>
              <input
                type="number"
                value={form.hourly_rate}
                onChange={e =>
                  setForm({ ...form, hourly_rate: e.target.value })
                }
              />
            </div>

          </div>

        </div>

        {/* ===== BIO CARD ===== */}

        <div className="profile-card">

          <h3>Professional Bio</h3>

          <textarea
            rows={4}
            placeholder="Describe your experience, care skills, certifications..."
            value={form.bio}
            onChange={e =>
              setForm({ ...form, bio: e.target.value })
            }
          />

        </div>

        {/* ===== HOSPITALS CARD ===== */}

        <div className="profile-card">

          <h3>Working Hospitals</h3>

          {hospitals.length === 0 && (
            <p className="empty-hospital">
              Hospitals added during registration
            </p>
          )}

          {hospitals.map((h, i) => (
            <div key={i} className="hospital-card">
              <strong>{h.hospital_name}</strong>
              <p>📍 {h.location}</p>
            </div>
          ))}

        </div>

        {/* ===== SAVE BUTTON ===== */}

        <div className="profile-actions">

          <button
            className="save-btn"
            onClick={saveProfile}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}