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

  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  // STRONG PASSWORD REGEX
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const validatePassword = (password) => {
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain 8+ characters, uppercase, lowercase, number, and special character."
      );
      return false;
    }

    setPasswordError("");
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validatePassword(form.password)) {
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      await api.post("/auth/register", form);

      setAlert({
        type: "success",
        message: "Account created successfully! Redirecting..."
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setAlert({
        type: "error",
        message:
          err.response?.data?.message ||
          "Registration failed. Please try again."
      });

      setTimeout(() => setAlert(null), 4000);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      {alert && (
        <div className={`custom-alert ${alert.type}`}>
          <span>{alert.message}</span>
          <button type="button" onClick={() => setAlert(null)}>✕</button>
        </div>
      )}

      <form className="auth-card" onSubmit={submit}>

        <h2>Create Account</h2>
        <p className="auth-subtitle">
          Join our smart pharmacy platform
        </p>

        <input
          placeholder="Full name"
          value={form.name}
          onChange={e =>
            setForm({ ...form, name: e.target.value })
          }
          required
          disabled={loading}
        />

        <input
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={e =>
            setForm({ ...form, email: e.target.value })
          }
          required
          disabled={loading}
        />

        {/* PASSWORD FIELD */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => {
            const password = e.target.value;
            setForm({ ...form, password });
            validatePassword(password);
          }}
          required
          disabled={loading}
        />

        {/* PASSWORD ERROR MESSAGE */}
        {passwordError && (
          <p style={{
            color: "#dc2626",
            fontSize: "13px",
            marginTop: "-8px",
            marginBottom: "8px"
          }}>
            {passwordError}
          </p>
        )}

        <select
          value={form.role}
          onChange={e =>
            setForm({ ...form, role: e.target.value })
          }
          disabled={loading}
        >
          <option value="USER">Patient / Customer</option>
          <option value="SHOP_OWNER">Pharmacy Owner</option>
        </select>

        <button disabled={loading || passwordError}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </form>

      {/* REUSABLE STYLES FOR THE ALERT */}
      <style>{`
        .custom-alert {
          position: fixed;
          top: 25px;
          left: 50%;
          transform: translateX(-50%);
          padding: 14px 24px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          min-width: 340px;
          z-index: 10000;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          font-weight: 500;
        }

        .custom-alert.error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #f87171;
        }

        .custom-alert.success {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #4ade80;
        }

        .custom-alert button {
          background: none;
          border: none;
          cursor: pointer;
          color: inherit;
          font-size: 18px;
          opacity: 0.6;
        }

        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translate(-50%, -30px); 
          }
          to { 
            opacity: 1; 
            transform: translate(-50%, 0); 
          }
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
      