import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function ConsultantProfile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    api.get("/consultants/me").then(res => setProfile(res.data));
  }, []);

  return (
    <DashboardLayout title="My Profile">
      <input value={profile.name || ""} readOnly />
      <input value={profile.phone || ""} readOnly />
      <p>{profile.bio}</p>
    </DashboardLayout>
  );
}