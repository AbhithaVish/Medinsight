import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

export default function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [alert, setAlert] = useState(null);

const { login } = useContext(AuthContext);
const navigate = useNavigate();

const submit = async (e) => {
e.preventDefault();
setAlert(null);


try {
  const res = await api.post("/auth/login", { email, password });

  const { token, user } = res.data;

  // Save token and user in AuthContext
  login(token, user);

  // Role-based navigation
  if (user.role === "ADMIN") {
    navigate("/admin/dashboard");
  } else if (user.role === "SHOP_OWNER") {
    navigate("/owner/dashboard");
  } else {
    navigate("/dashboard");
  }

} catch (err) {

  setAlert({
    type: "error",
    message: err.response?.data?.message || "Invalid login credentials"
  });

  setTimeout(() => setAlert(null), 4000);
}


};

return ( <div className="auth-container">


  {/* ALERT MESSAGE */}
  {alert && (
    <div className={`custom-alert ${alert.type}`}>
      <span>{alert.message}</span>
      <button type="button" onClick={() => setAlert(null)}>✕</button>
    </div>
  )}

  <form className="auth-card" onSubmit={submit}>
    <h2>Welcome Back</h2>

    <input
      type="email"
      placeholder="Email address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <button type="submit">Login</button>

    <p className="auth-footer">
      Don’t have an account?{" "}
      <Link to="/register">Create one</Link>
    </p>
  </form>

  <style>{`
    .custom-alert {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 14px 24px;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
      min-width: 320px;
      z-index: 9999;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      animation: slideDown 0.4s cubic-bezier(0.16,1,0.3,1);
    }

    .custom-alert.error {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #f87171;
    }

    .custom-alert button {
      background: none;
      border: none;
      cursor: pointer;
      color: inherit;
      font-size: 16px;
      font-weight: bold;
      opacity: 0.7;
    }

    .custom-alert button:hover {
      opacity: 1;
    }

    @keyframes slideDown {
      from { opacity:0; transform:translate(-50%,-20px); }
      to { opacity:1; transform:translate(-50%,0); }
    }
  `}</style>

</div>


);
}
