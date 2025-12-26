import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      const { token, role } = res.data;
      login(token, role);

      // ✅ Role-based redirect
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "SHOP_OWNER") {
        navigate("/owner/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submit}>
        <h2>Welcome Back</h2>

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

        <button type="submit">Login</button>

        {/* 🔗 REGISTER LINK */}
        <p className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}
