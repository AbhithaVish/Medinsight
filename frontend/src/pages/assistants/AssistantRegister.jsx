import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import "./AssistantAuth.css";

export default function AssistantRegister() {
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
      await api.post("/assistants/register", {
        ...form,
        hospitals
      });

      alert("Registration successful. Please login.");
      navigate("/assistants/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assistant-auth-container">
      <form className="assistant-auth-card" onSubmit={submit}>
        <h2>Hospital Assistant Registration</h2>
        <p className="subtitle">
          Join our care network and support patients in need
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
          placeholder="Short Bio (skills, background, care experience)"
          rows={3}
          onChange={e => setForm({ ...form, bio: e.target.value })}
        />

        {/* ---------------- HOSPITALS ---------------- */}
        <div className="section">
          <h4>Working Hospitals</h4>

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
          {loading ? "Registering..." : "Register as Assistant"}
        </button>

        <p className="footer">
          Already registered?{" "}
          <Link to="/assistants/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}
