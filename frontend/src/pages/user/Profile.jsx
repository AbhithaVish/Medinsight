import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/auth/me").then(res => setUser(res.data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
     <DashboardLayout title="My Profile">
    <div>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.role}</p>
    </div>
    </DashboardLayout>
  );
}
