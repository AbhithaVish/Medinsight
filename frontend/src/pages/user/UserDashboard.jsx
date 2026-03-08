import DashboardLayout from "../../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function UserDashboard() {
const { user } = useContext(AuthContext);


  const navigate = useNavigate();

  return (
    <DashboardLayout>

      {/* HERO */}
      <div className="hero-container">
        <div className="hero-left">
          <h2>Welcome {user?.name}.</h2>
          <h1>
            We are expert <br />
            <span>AI Medical Analysis</span>
          </h1>

          <p>
            Upload X-rays and receive instant fracture detection
            powered by artificial intelligence technology.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/ai-xray")}
            >
              Start Analysis
            </button>

            <button className="secondary-btn">
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="circle-bg">
            <img src="src/assets/dashboard.png" alt="" />
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="features">
        <h2>Platform Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>⚡ Instant AI Detection</h3>
            <p>Analyze X-rays within seconds.</p>
          </div>

          <div className="feature-card">
            <h3>📊 Smart Reports</h3>
            <p>Detailed medical insights & results.</p>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure Records</h3>
            <p>Your medical data stays protected.</p>
          </div>

          <div className="feature-card">
            <h3>🧠 AI Recommendations</h3>
            <p>Suggested treatments & equipment.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <h2>Medical Services</h2>

        <div className="service-grid">
          <div className="service-card">
            <h3>AI X-Ray Analysis</h3>
            <p>Bone fracture detection using AI.</p>
          </div>

          <div className="service-card">
            <h3>Order Medicines</h3>
            <p>Track pharmacy orders easily.</p>
          </div>

          <div className="service-card">
            <h3>Recommended Equipment</h3>
            <p>AI suggested medical products.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat-box">
          <h2>1200+</h2>
          <p>X-rays Analyzed</p>
        </div>

        <div className="stat-box">
          <h2>98%</h2>
          <p>Accuracy Rate</p>
        </div>

        <div className="stat-box">
          <h2>350+</h2>
          <p>Active Users</p>
        </div>

        <div className="stat-box">
          <h2>24/7</h2>
          <p>AI Support</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start Your AI Diagnosis Today</h2>
        <button
          onClick={() => navigate("/ai-xray")}
        >
          Upload X-Ray
        </button>
      </section>

    </DashboardLayout>
  );
}