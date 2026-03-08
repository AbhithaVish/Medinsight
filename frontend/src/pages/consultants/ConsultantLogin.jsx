import { useState, useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Consultant.css"; // reuse the same styling

export default function ConsultantLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/consultants/auth/login", {
        email,
        password
      });

      // store token + role
      login(res.data.token, "CONSULTANT");

      // redirect
      nav("/consultants/dashboard");

    } catch (err) {
      alert("Invalid consultant credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assistant-auth-container">
      <form onSubmit={submit} className="assistant-auth-card">

        <h2>Consultant Login</h2>
        <p className="subtitle">
          Access your consultant dashboard
        </p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button className="btn-primary" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="footer">
          Not registered yet?{" "}
          <Link to="/consultants/register">
            Join as a Consultant
          </Link>
        </p>

        <p className="footer" style={{ marginTop: 6 }}>
          <Link to="/consultants">← Back to User Portal</Link>
        </p>

      </form>
    </div>
  );
}