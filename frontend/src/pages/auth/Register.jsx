import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";

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

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const validatePassword = (password) => {
    if (password && !passwordRegex.test(password)) {
      setPasswordError("Password must be 8+ chars with uppercase, lowercase, number & symbol.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validatePassword(form.password)) return;

    setLoading(true);
    setAlert(null);

    try {
      await api.post("/auth/register", form);
      setAlert({ type: "success", message: "Account created successfully! Redirecting..." });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Registration failed. Please try again."
      });
      setTimeout(() => setAlert(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f0f7ff",
      fontFamily: "'Inter', sans-serif",
      padding: "20px",
    },
    container: {
      display: "flex",
      width: "100%",
      maxWidth: "1000px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    },
    sidebar: {
      flex: 1,
      background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
      padding: "60px 40px",
      color: "white",
      display: "flex",
      flexDirection: "column",
    },
    logo: { fontSize: "32px", fontWeight: "bold", marginBottom: "20px" },
    sidebarDesc: { opacity: 0.9, lineHeight: "1.6", marginBottom: "40px" },
    featureCard: {
      background: "rgba(255, 255, 255, 0.15)",
      padding: "16px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      marginBottom: "16px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    formSection: {
      flex: 1.2,
      padding: "50px 60px",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    toggleGroup: {
      background: "#f3f4f6",
      padding: "4px",
      borderRadius: "8px",
      display: "flex",
    },
    toggleBtn: (active) => ({
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      backgroundColor: active ? "#3b82f6" : "transparent",
      color: active ? "white" : "#6b7280",
      textDecoration: "none",
    }),
    label: {
      display: "block",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "8px",
      fontSize: "14px",
    },
    roleRow: { display: "flex", gap: "12px", marginBottom: "20px" },
    roleBtn: (active) => ({
      flex: 1,
      padding: "12px",
      borderRadius: "8px",
      border: active ? "2px solid #3b82f6" : "1px solid #e5e7eb",
      backgroundColor: active ? "#eff6ff" : "white",
      color: active ? "#2563eb" : "#4b5563",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      fontWeight: "600",
      transition: "0.2s",
    }),
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      marginBottom: "20px",
      fontSize: "15px",
      boxSizing: "border-box",
    },
    submitBtn: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    legal: {
      textAlign: "center",
      fontSize: "12px",
      color: "#9ca3af",
      marginTop: "20px",
    },
    errorText: {
      color: "#dc2626",
      fontSize: "13px",
      marginTop: "-15px",
      marginBottom: "15px",
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* ALERTS (Logic Kept) */}
      {alert && (
        <div className={`custom-alert ${alert.type}`}>
          <span>{alert.message}</span>
          <button onClick={() => setAlert(null)}>✕</button>
        </div>
      )}

      <div style={styles.container}>
        {/* LEFT SIDEBAR */}
        <div style={styles.sidebar}>
          <div style={styles.logo}>MedInsight</div>
          <p style={styles.sidebarDesc}>
            Secure, fast access for patients and shop owners. Manage bookings, orders, and your profile — all in one place.
          </p>

          <div style={styles.featureCard}>
            <span style={{ fontSize: "24px" }}>👤</span>
            <div>
              <div style={{ fontWeight: "bold" }}>For Patients</div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>Book, consult & order</div>
            </div>
          </div>

          <div style={styles.featureCard}>
            <span style={{ fontSize: "24px" }}>🏪</span>
            <div>
              <div style={{ fontWeight: "bold" }}>For Shops</div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>Inventory & quick checkout</div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div style={styles.formSection}>
          <div style={styles.headerRow}>
            <h2 style={{ margin: 0, color: "#111827" }}>Welcome back</h2>
            <div style={styles.toggleGroup}>
              <Link to="/login" style={styles.toggleBtn(false)}>Log in</Link>
              <button style={styles.toggleBtn(true)}>Sign up</button>
            </div>
          </div>

          <form onSubmit={submit}>
            <label style={styles.label}>You are</label>
            <div style={styles.roleRow}>
              <button
                type="button"
                style={styles.roleBtn(form.role === "USER")}
                onClick={() => setForm({ ...form, role: "USER" })}
              >
                👤 Patient
              </button>
              <button
                type="button"
                style={styles.roleBtn(form.role === "SHOP_OWNER")}
                onClick={() => setForm({ ...form, role: "SHOP_OWNER" })}
              >
                🏪 Shop Owner
              </button>
            </div>

            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              placeholder="Full name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              disabled={loading}
            />

            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              disabled={loading}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label style={styles.label}>Password</label>
              <a href="#" style={{ ...styles.label, color: '#3b82f6', textDecoration: 'none' }}>Forgot?</a>
            </div>
            <input
              style={styles.input}
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => {
                const password = e.target.value;
                setForm({ ...form, password });
                validatePassword(password);
              }}
              required
              disabled={loading}
            />

            {passwordError && <p style={styles.errorText}>{passwordError}</p>}

            <button style={{...styles.submitBtn, opacity: loading ? 0.7 : 1}} disabled={loading || passwordError}>
              {loading ? "Creating..." : "Sign in"}
            </button>

            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#4b5563' }}>
              Already have an account? <Link to="/login" style={{ color: '#3b82f6', fontWeight: '600', textDecoration: 'none' }}>Login</Link>
            </p>

            <p style={styles.legal}>
              By continuing you agree to our <a href="#" style={{ color: '#6b7280' }}>Terms</a> and <a href="#" style={{ color: '#6b7280' }}>Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>

      <style>{`
        .custom-alert {
          position: fixed; top: 25px; left: 50%; transform: translateX(-50%);
          padding: 14px 24px; border-radius: 12px; display: flex;
          justify-content: space-between; align-items: center; gap: 20px;
          min-width: 340px; z-index: 10000; box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          animation: slideDown 0.4s ease; font-weight: 500;
        }
        .custom-alert.error { background: #fee2e2; color: #991b1b; border: 1px solid #f87171; }
        .custom-alert.success { background: #dcfce7; color: #166534; border: 1px solid #4ade80; }
        .custom-alert button { background: none; border: none; cursor: pointer; color: inherit; font-size: 18px; }
        @keyframes slideDown { from { opacity: 0; transform: translate(-50%, -30px); } to { opacity: 1; transform: translate(-50%, 0); } }
      `}</style>
    </div>
  );
}