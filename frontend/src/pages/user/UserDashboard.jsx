import DashboardLayout from "../../components/DashboardLayout";

export default function UserDashboard() {
  return (
    <DashboardLayout title="My Dashboard">
      <div className="card-grid">
        <div className="card">
          <h3>My Orders</h3>
          <p>Track your pharmacy orders</p>
        </div>

        <div className="card">
          <h3>AI X-ray Analysis</h3>
          <p>Upload and analyze your medical images</p>
        </div>

        <div className="card">
          <h3>Recommended Products</h3>
          <p>Medical equipment suggested for you</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
