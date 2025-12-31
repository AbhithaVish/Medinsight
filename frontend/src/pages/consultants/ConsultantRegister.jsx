import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import "../assistants/AssistantAuth.css"; // ✅ reuse same modern styles

export default function ConsultantRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    experience_years: "",
    hourly_rate: "",
    bio: ""
  });

  const [hospitals, setHospitals] = useState([
    { hospital_name: "", location: "" }
  ]);

  const [loading, setLoading] = useState(false);

  const handleHospitalChange = (index, field, value) => {
    const updated = [...hospitals];
    updated[index][field] = value;
    setHospitals(updated);
  };

  const addHospital = () => {
    setHospitals([...hospitals, { hospital_name: "", location: "" }]);
  };

  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/consultants/register", {
        ...form,
        hospitals
      });

      alert("Registration successful. Please login.");
      navigate("/consultants/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assistant-auth-container">
      <form className="assistant-auth-card" onSubmit={submit}>
        <h2>Consultant Registration</h2>
        <p className="subtitle">
          Join as a medical consultant and support patients remotely
        </p>

        <div className="grid-2">
          <input
            placeholder="Full Name"
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Phone Number"
            onChange={e => setForm({ ...form, phone: e.target.value })}
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />

        <div className="grid-2">
          <input
            type="number"
            placeholder="Years of Experience"
            onChange={e =>
              setForm({ ...form, experience_years: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Hourly Rate (Rs.)"
            onChange={e =>
              setForm({ ...form, hourly_rate: e.target.value })
            }
            required
          />
        </div>

        <textarea
          placeholder="Short Bio (specialization, background, expertise)"
          rows={3}
          onChange={e => setForm({ ...form, bio: e.target.value })}
        />

        {/* ---------------- HOSPITALS ---------------- */}
        <div className="section">
          <h4>Affiliated Hospitals</h4>

          {hospitals.map((h, i) => (
            <div key={i} className="grid-2">
              <input
                placeholder="Hospital Name"
                value={h.hospital_name}
                onChange={e =>
                  handleHospitalChange(i, "hospital_name", e.target.value)
                }
                required
              />
              <input
                placeholder="Location"
                value={h.location}
                onChange={e =>
                  handleHospitalChange(i, "location", e.target.value)
                }
              />
            </div>
          ))}

          <button
            type="button"
            className="btn-outline"
            onClick={addHospital}
          >
            + Add Another Hospital
          </button>
        </div>

        <button className="btn-primary" disabled={loading}>
          {loading ? "Registering..." : "Register as Consultant"}
        </button>

        <p className="footer">
          Already registered?{" "}
          <Link to="/consultants/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}
