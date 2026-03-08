import DashboardLayout from "../../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {

  const navigate = useNavigate();

  return (
    <DashboardLayout title="Shop Owner Dashboard">

      {/* ================= STATS ================= */}
      <div style={styles.statsGrid}>
        <StatCard title="Total Sales" value="Rs. 125,000" color="#22c55e" />
        <StatCard title="Orders" value="320" color="#2563eb" />
        <StatCard title="Products" value="58" color="#f59e0b" />
        <StatCard title="Pending" value="12" color="#ef4444" />
      </div>


      {/* ================= QUICK ACTIONS ================= */}
      <div style={styles.actionsGrid}>

        <ActionCard
          title="Manage Shop"
          desc="Edit shop information"
          onClick={() => navigate("/owner/shop")}
        />

        <ActionCard
          title="Add Product"
          desc="Create new product listing"
          onClick={() => navigate("/owner/add-product")}
        />

        <ActionCard
          title="My Products"
          desc="Update or remove products"
          onClick={() => navigate("/owner/products")}
        />

        <ActionCard
          title="Orders"
          desc="Track customer purchases"
          onClick={() => navigate("/owner/orders")}
        />

      </div>


      {/* ================= ANALYTICS ================= */}
      <div style={styles.analyticsWrapper}>

        {/* SALES GRAPH */}
        <div style={styles.analyticsCard}>
          <h3>Sales Overview</h3>

          <div style={styles.fakeChart}>
            {[40,65,50,80,55,90].map((h,i)=>(
              <div key={i} style={{
                ...styles.bar,
                height:`${h}%`
              }} />
            ))}
          </div>
        </div>


        {/* PERFORMANCE */}
        <div style={styles.analyticsCard}>
          <h3>Store Performance</h3>

          <ul style={styles.performance}>
            <li>⭐ Rating: <b>4.7</b></li>
            <li>📦 Delivered Orders: <b>290</b></li>
            <li>🚚 Pending Orders: <b>12</b></li>
            <li>👥 Customers: <b>180</b></li>
          </ul>

        </div>

      </div>

    </DashboardLayout>
  );
}


/* ================= COMPONENTS ================= */

function StatCard({ title, value, color }) {
  return (
    <div style={styles.statCard}>
      <h4 style={{color:"#64748b"}}>{title}</h4>
      <h2 style={{color}}>{value}</h2>
    </div>
  );
}

function ActionCard({ title, desc, onClick }) {
  return (
    <div style={styles.actionCard} onClick={onClick}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}


/* ================= STYLES ================= */

const styles = {

  /* ===== STATS ===== */
  statsGrid:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
    gap:"20px",
    marginBottom:"30px"
  },

  statCard:{
    background:"#fff",
    padding:"24px",
    borderRadius:"14px",
    boxShadow:"0 10px 25px rgba(0,0,0,0.05)"
  },

  /* ===== ACTIONS ===== */
  actionsGrid:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",
    gap:"20px",
    marginBottom:"30px"
  },

  actionCard:{
    background:"#fff",
    padding:"24px",
    borderRadius:"14px",
    cursor:"pointer",
    transition:"0.3s",
    boxShadow:"0 10px 25px rgba(0,0,0,0.05)"
  },

  /* ===== ANALYTICS ===== */
  analyticsWrapper:{
    display:"grid",
    gridTemplateColumns:"2fr 1fr",
    gap:"20px"
  },

  analyticsCard:{
    background:"#fff",
    padding:"24px",
    borderRadius:"14px",
    boxShadow:"0 10px 25px rgba(0,0,0,0.05)"
  },

  /* ===== FAKE CHART ===== */
  fakeChart:{
    display:"flex",
    alignItems:"flex-end",
    gap:"10px",
    height:"180px",
    marginTop:"20px"
  },

  bar:{
    flex:1,
    background:"#2563eb",
    borderRadius:"6px"
  },

  /* ===== PERFORMANCE ===== */
  performance:{
    listStyle:"none",
    padding:0,
    marginTop:"20px",
    color:"#475569",
    lineHeight:"30px"
  }

};