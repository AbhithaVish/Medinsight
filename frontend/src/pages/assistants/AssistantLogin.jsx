import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import "./AssistantAuth.css";

export default function AssistantLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const res = await api.post("/assistants/login", {
        email,
        password
      });

      // store assistant token
      localStorage.setItem("assistantToken", res.data.token);

      // redirect to assistant dashboard
      navigate("/assistants/dashboard");

    } catch (err) {
      alert("Invalid assistant credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assistant-auth-container">
      <form className="assistant-auth-card" onSubmit={submit}>

        <h2>Assistant Login</h2>

        <p className="subtitle">
          Access your hospital assistant dashboard
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
          <Link to="/assistants/register">
            Join as an Assistant
          </Link>
        </p>

        <p className="footer" style={{ marginTop: 6 }}>
          <Link to="/">← Back to User Portal</Link>
        </p>

      </form>
    </div>
  );
}