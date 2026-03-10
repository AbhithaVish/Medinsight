import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

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
        message: err.response?.data?.message || "Invalid login credentials",
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
      backgroundColor: "#e8f1ff",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      padding: "20px",
    },
    card: {
      display: "flex",
      width: "100%",
      maxWidth: "1050px",
      minHeight: "600px",
      backgroundColor: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    },
    // Left Sidebar
    sidebar: {
      flex: 1,
      background: "linear-gradient(160deg, #448aff 0%, #673ab7 100%)",
      padding: "60px 50px",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    logo: { fontSize: "48px", fontWeight: "800", marginBottom: "20px", letterSpacing: "-1px" },
    sidebarText: { fontSize: "18px", lineHeight: "1.6", opacity: 0.9, marginBottom: "40px" },
    featureBox: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      borderRadius: "14px",
      marginBottom: "15px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    // Right Form
    formSection: {
      flex: 1.2,
      padding: "60px 80px",
      display: "flex",
      flexDirection: "column",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "40px",
    },
    toggleContainer: {
      display: "flex",
      backgroundColor: "#f3f4f6",
      padding: "4px",
      borderRadius: "10px",
    },
    toggleBtn: (active) => ({
      padding: "10px 24px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "0.2s all",
      backgroundColor: active ? "#1a73e8" : "transparent",
      color: active ? "#fff" : "#6b7280",
    }),
    label: {
      display: "block",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "12px",
      fontSize: "15px",
    },
    inputGroup: { position: "relative", marginBottom: "24px" },
    input: {
      width: "100%",
      padding: "14px 16px",
      border: "1px solid #d1d5db",
      borderRadius: "10px",
      fontSize: "16px",
      boxSizing: "border-box",
      outline: "none",
      transition: "border-color 0.2s",
    },
    forgotLink: {
      position: "absolute",
      right: "16px",
      top: "14px",
      fontSize: "14px",
      color: "#1a73e8",
      textDecoration: "none",
      fontWeight: "500",
    },
    submitBtn: {
      width: "100%",
      padding: "16px",
      backgroundColor: "#1a73e8",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      marginTop: "10px",
      boxShadow: "0 4px 14px 0 rgba(26, 115, 232, 0.39)",
    },
    authFooter: {
      textAlign: "center",
      marginTop: "30px",
      fontSize: "15px",
      color: "#4b5563",
    },
    link: { color: "#1a73e8", textDecoration: "none", fontWeight: "600" },
    customAlert: {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "14px 24px",
      borderRadius: "12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "15px",
      minWidth: "320px",
      zIndex: 9999,
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
      backgroundColor: "#fee2e2",
      color: "#991b1b",
      border: "1px solid #f87171",
    },
  };

  return (
    <div style={styles.wrapper}>
      {/* ALERT MESSAGE */}
      {alert && (
        <div style={styles.customAlert}>
          <span>{alert.message}</span>
          <button 
            style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontWeight: "bold" }} 
            onClick={() => setAlert(null)}
          >✕</button>
        </div>
      )}

      <div style={styles.card}>
        {/* LEFT SIDE: BRANDING */}
        <div style={styles.sidebar}>
          <h1 style={styles.logo}>MedInsight</h1>
          <p style={styles.sidebarText}>
            Secure, fast access for patients and shop owners. Manage bookings,
            orders, and your profile — all in one place.
          </p>

          <div style={styles.featureBox}>
            <span style={{ fontSize: "28px" }}>👤</span>
            <div>
              <div style={{ fontWeight: "700", fontSize: "16px" }}>For Patients</div>
              <div style={{ fontSize: "14px", opacity: 0.85 }}>Book, consult & order</div>
            </div>
          </div>

          <div style={styles.featureBox}>
            <span style={{ fontSize: "28px" }}>🏪</span>
            <div>
              <div style={{ fontWeight: "700", fontSize: "16px" }}>For Shops</div>
              <div style={{ fontSize: "14px", opacity: 0.85 }}>Inventory & quick checkout</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div style={styles.formSection}>
          <div style={styles.headerRow}>
            <h2 style={{ margin: 0, color: "#111827", fontSize: "28px" }}>Welcome back</h2>
            <div style={styles.toggleContainer}>
              <button style={styles.toggleBtn(true)}>Log in</button>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button style={styles.toggleBtn(false)}>Sign up</button>
              </Link>
            </div>
          </div>

          <form onSubmit={submit}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <label style={styles.label}>Password</label>
            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="#" style={styles.forgotLink}>Forgot?</a>
            </div>

            <button
              type="submit"
              style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Sign in"}
            </button>

            <p style={styles.authFooter}>
              Don't have an account? <Link to="/register" style={styles.link}>Create one</Link>
            </p>

            <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280", marginTop: "20px" }}>
              By continuing you agree to our <a href="#" style={styles.link}>Terms</a> and <a href="#" style={styles.link}>Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}