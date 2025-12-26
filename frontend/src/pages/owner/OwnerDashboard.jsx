import DashboardLayout from "../../components/DashboardLayout";

export default function OwnerDashboard() {
  return (
    <DashboardLayout title="Shop Owner Dashboard">
      <div className="card-grid">
        <div className="card">
          <h3>My Shop</h3>
          <p>Manage shop details</p>
        </div>

        <div className="card">
          <h3>Products</h3>
          <p>Add and manage products</p>
        </div>

        <div className="card">
          <h3>Orders</h3>
          <p>View customer orders</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
