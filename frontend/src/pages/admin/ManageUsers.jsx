import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleBlock = async (id, blocked) => {
    await api.put(`/admin/users/${id}/status`, {
      blocked: !blocked
    });
    loadUsers();
  };

  return (
    <DashboardLayout title="Manage Users">
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.blocked ? "Blocked" : "Active"}</td>
              <td>
                <button
                  style={{
                    background: u.blocked ? "#16a34a" : "#ef4444"
                  }}
                  onClick={() => toggleBlock(u.id, u.blocked)}
                >
                  {u.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
