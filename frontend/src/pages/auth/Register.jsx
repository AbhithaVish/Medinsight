import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import "./Auth.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submit}>
        <h2>Create Account</h2>
        <p className="auth-subtitle">
          Join our smart pharmacy platform
        </p>

        <input
          placeholder="Full name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="USER">Patient / Customer</option>
          <option value="SHOP_OWNER">Shop Owner</option>
        </select>

        <button disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
