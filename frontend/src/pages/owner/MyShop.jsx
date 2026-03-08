import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function MyShop() {

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  /* ================= LOAD SHOP ================= */

  const loadShop = async () => {
    try {
      const res = await api.get("/shops/me");
      setShop(res.data);
      setForm({
        name: res.data.name,
        description: res.data.description || ""
      });
    } catch {
      setShop(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShop();
  }, []);

  /* ================= CREATE ================= */

  const createShop = async () => {
    if (!form.name.trim())
      return alert("Shop name required");

    await api.post("/shops", form);
    alert("Shop created successfully ✅");
    loadShop();
  };

  /* ================= UPDATE ================= */

  const updateShop = async () => {
    await api.put("/shops/me", form);

    alert("Shop updated ✅");
    setEditing(false);
    loadShop();
  };

  /* ================= STATUS STYLE ================= */

  const statusStyle = status => ({
    padding: "6px 14px",
    borderRadius: "999px",
    fontWeight: "600",
    background:
      status === "APPROVED"
        ? "#dcfce7"
        : status === "BLOCKED"
        ? "#fee2e2"
        : "#fef9c3",
    color:
      status === "APPROVED"
        ? "#166534"
        : status === "BLOCKED"
        ? "#991b1b"
        : "#92400e"
  });

  return (
    <DashboardLayout title="My Shop">

      {loading && <p>Loading...</p>}

      {/* ================= SHOP EXISTS ================= */}
      {shop && (

        <div style={styles.shopCard}>

          {/* HEADER */}
          <div style={styles.header}>
            <div>
              <h2>{shop.name}</h2>
              <span style={statusStyle(shop.status)}>
                {shop.status}
              </span>
            </div>

            {!editing && (
              <button
                style={styles.editBtn}
                onClick={() => setEditing(true)}
              >
                Edit Shop
              </button>
            )}
          </div>


          {/* ================= VIEW MODE ================= */}
          {!editing && (
            <p style={{marginTop:15}}>
              {shop.description || "No description added"}
            </p>
          )}


          {/* ================= EDIT MODE ================= */}
          {editing && (
            <div style={styles.form}>

              <input
                value={form.name}
                onChange={e =>
                  setForm({...form,name:e.target.value})
                }
                placeholder="Shop Name"
                style={styles.input}
              />

              <textarea
                rows={4}
                value={form.description}
                onChange={e =>
                  setForm({...form,description:e.target.value})
                }
                placeholder="Description"
                style={styles.input}
              />

              <div style={{display:"flex",gap:"10px"}}>
                <button
                  style={styles.saveBtn}
                  onClick={updateShop}
                >
                  Save Changes
                </button>

                <button
                  style={styles.cancelBtn}
                  onClick={()=>setEditing(false)}
                >
                  Cancel
                </button>
              </div>

            </div>
          )}

        </div>
      )}


      {/* ================= CREATE SHOP ================= */}
      {!shop && !loading && (

        <div style={styles.createCard}>

          <h2>Create Your Store</h2>

          <input
            placeholder="Shop Name"
            style={styles.input}
            value={form.name}
            onChange={e =>
              setForm({...form,name:e.target.value})
            }
          />

          <textarea
            rows={4}
            placeholder="Shop Description"
            style={styles.input}
            value={form.description}
            onChange={e =>
              setForm({...form,description:e.target.value})
            }
          />

          <button
            style={styles.createBtn}
            onClick={createShop}
          >
            Create Shop
          </button>

        </div>
      )}

    </DashboardLayout>
  );
}


/* ================= STYLES ================= */

const styles = {

  shopCard:{
    background:"#fff",
    padding:"30px",
    borderRadius:"16px",
    boxShadow:"0 15px 35px rgba(0,0,0,0.05)",
    maxWidth:"700px"
  },

  header:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  },

  form:{
    marginTop:"20px",
    display:"flex",
    flexDirection:"column",
    gap:"12px"
  },

  input:{
    width:"100%",
    padding:"12px",
    borderRadius:"8px",
    border:"1px solid #e2e8f0"
  },

  editBtn:{
    background:"#2563eb",
    color:"#fff",
    border:"none",
    padding:"8px 16px",
    borderRadius:"8px",
    cursor:"pointer"
  },

  saveBtn:{
    background:"#16a34a",
    color:"#fff",
    border:"none",
    padding:"10px 18px",
    borderRadius:"8px",
    cursor:"pointer"
  },

  cancelBtn:{
    background:"#e2e8f0",
    border:"none",
    padding:"10px 18px",
    borderRadius:"8px",
    cursor:"pointer"
  },

  createCard:{
    background:"#fff",
    padding:"30px",
    borderRadius:"16px",
    boxShadow:"0 15px 35px rgba(0,0,0,0.05)",
    maxWidth:"600px",
    display:"flex",
    flexDirection:"column",
    gap:"12px"
  },

  createBtn:{
    background:"#2563eb",
    color:"#fff",
    border:"none",
    padding:"12px",
    borderRadius:"10px",
    cursor:"pointer"
  }
};