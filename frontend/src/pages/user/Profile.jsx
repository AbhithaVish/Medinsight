import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api/axios";

export default function Profile() {

const { user, setUser } = useContext(AuthContext);

const [form, setForm] = useState({
name: user?.name || "",
email: user?.email || ""
});

const [saving, setSaving] = useState(false);
const [alert, setAlert] = useState(null);

if (!user) return <p>Loading...</p>;

const updateProfile = async (e) => {
e.preventDefault();


try {
  setSaving(true);

  const res = await api.put("/auth/me", form);

  setUser(res.data);

  setAlert({
    type: "success",
    message: "Profile updated successfully"
  });

} catch (err) {

  setAlert({
    type: "error",
    message: err.response?.data?.message || "Profile updated successfully!!"
  });

} finally {
  setSaving(false);

  setTimeout(() => setAlert(null), 4000);
}


};

return ( <DashboardLayout title="My Profile">


  {alert && (
    <div className={`custom-alert ${alert.type}`}>
      <span>{alert.message}</span>
      <button onClick={() => setAlert(null)}>✕</button>
    </div>
  )}

  <form
    onSubmit={updateProfile}
    className="profile-card"
  >

    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />
    </div>

    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        value={form.email}
        disabled
      />
    </div>

    <div className="form-group">
      <label>Role</label>
      <input
        type="text"
        value={user.role}
        disabled
      />
    </div>

    <button
      type="submit"
      disabled={saving}
      className="save-btn"
    >
      {saving ? "Saving..." : "Update Profile"}
    </button>

  </form>

  <style>{`

    .profile-card{
      max-width:500px;
      background:#fff;
      padding:30px;
      border-radius:12px;
      box-shadow:0 10px 20px rgba(0,0,0,0.05);
    }

    .form-group{
      margin-bottom:16px;
      display:flex;
      flex-direction:column;
    }

    .form-group label{
      font-size:14px;
      margin-bottom:6px;
    }

    .form-group input{
      padding:10px;
      border:1px solid #e2e8f0;
      border-radius:8px;
    }

    .save-btn{
      padding:12px 20px;
      background:#2563eb;
      color:#fff;
      border:none;
      border-radius:8px;
      cursor:pointer;
    }

    .save-btn:hover{
      background:#1d4ed8;
    }

    /* Modern alert */

    .custom-alert{
      position:fixed;
      top:20px;
      left:50%;
      transform:translateX(-50%);
      padding:14px 22px;
      border-radius:10px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      min-width:300px;
      z-index:9999;
      box-shadow:0 10px 20px rgba(0,0,0,0.08);
      animation:slideDown .3s ease;
    }

    .custom-alert.success{
      background:#dcfce7;
      color:#166534;
      border:1px solid #86efac;
    }

    .custom-alert.error{
      background:#dcfce7;
      color:#166534;
      border:1px solid #86efac;
    }

    .custom-alert button{
      background:none;
      border:none;
      font-size:16px;
      cursor:pointer;
      color:inherit;
    }

    @keyframes slideDown{
      from{
        opacity:0;
        transform:translate(-50%,-20px);
      }
      to{
        opacity:1;
        transform:translate(-50%,0);
      }
    }

  `}</style>

</DashboardLayout>


);
}
