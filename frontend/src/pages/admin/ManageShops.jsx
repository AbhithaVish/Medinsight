import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

const STATUS_TABS = ["ALL", "PENDING", "APPROVED", "BLOCKED"];

export default function ManageShops() {
  const [shops, setShops] = useState([]);
  const [activeStatus, setActiveStatus] = useState("ALL");
  const [sortOption, setSortOption] = useState("NEWEST");
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const loadShops = async () => {
    try {
      const res = await api.get("/admin/shops");
      setShops(res.data);
    } catch (err) {
      setAlert({ type: "error", message: "Failed to load shops" });
    }
  };

  useEffect(() => {
    loadShops();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setLoadingId(id);
      await api.put(`/admin/shops/${id}/status`, { status });

      setAlert({
        type: "success",
        message: `Shop ${status} successfully`
      });

      loadShops();
    } catch (err) {
      setAlert({
        type: "error",
        message: "Action failed"
      });
    } finally {
      setLoadingId(null);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  /* FILTER + SORT */
  const processedShops = useMemo(() => {
    let data = [...shops];

    if (activeStatus !== "ALL") {
      data = data.filter(s => s.status === activeStatus);
    }

    if (search) {
      data = data.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortOption === "NEWEST") {
      data.sort((a, b) => b.id - a.id);
    }

    if (sortOption === "OLDEST") {
      data.sort((a, b) => a.id - b.id);
    }

    if (sortOption === "NAME_AZ") {
      data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return data;
  }, [shops, activeStatus, sortOption, search]);

  return (
    <DashboardLayout title="Manage Shop Requests">

      {/* ALERT */}
      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}

      {/* FILTER TABS */}
      <div className="tabs">
        {STATUS_TABS.map(tab => (
          <button
            key={tab}
            className={
              activeStatus === tab ? "tab active" : "tab"
            }
            onClick={() => setActiveStatus(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SEARCH + SORT */}
      <div className="toolbar">
        <input
          placeholder="Search by shop name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
        >
          <option value="NEWEST">Newest</option>
          <option value="OLDEST">Oldest</option>
          <option value="NAME_AZ">Name (A-Z)</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="tableCard">
        <table>
          <thead>
            <tr>
              <th>Shop Name</th>
              <th>Owner Email</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {processedShops.map(shop => (
              <tr key={shop.id}>
                <td>{shop.name}</td>
                <td>{shop.owner?.email}</td>
                <td>
                  <StatusBadge status={shop.status} />
                </td>
                <td style={{ textAlign: "right" }}>
                  {shop.status !== "APPROVED" && (
                    <button
                      disabled={loadingId === shop.id}
                      className="approveBtn"
                      onClick={() =>
                        updateStatus(shop.id, "APPROVED")
                      }
                    >
                      Approve
                    </button>
                  )}

                  {shop.status !== "BLOCKED" && (
                    <button
                      disabled={loadingId === shop.id}
                      className="blockBtn"
                      onClick={() =>
                        updateStatus(shop.id, "BLOCKED")
                      }
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {processedShops.length === 0 && (
          <div className="empty">No shops found</div>
        )}
      </div>

      {/* STYLES */}
      <style>{`
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .tab {
          padding: 8px 16px;
          border-radius: 20px;
          border: none;
          background: #f1f5f9;
          cursor: pointer;
        }

        .tab.active {
          background: #2563eb;
          color: white;
        }

        .toolbar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .toolbar input {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          width: 250px;
        }

        .toolbar select {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .tableCard {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 14px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }

        th {
          background: #f9fafb;
          text-align: left;
        }

        .approveBtn {
          background: #16a34a;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          margin-right: 8px;
        }

        .blockBtn {
          background: #dc2626;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
        }

        .empty {
          padding: 20px;
          text-align: center;
          color: #6b7280;
        }

        .alert {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .alert.success {
          background: #dcfce7;
          color: #166534;
        }

        .alert.error {
          background: #fee2e2;
          color: #991b1b;
        }
      `}</style>
    </DashboardLayout>
  );
}

function StatusBadge({ status }) {
  const colors = {
    APPROVED: "#16a34a",
    BLOCKED: "#dc2626",
    PENDING: "#ca8a04"
  };

  return (
    <span
      style={{
        padding: "4px 12px",
        borderRadius: 20,
        color: "white",
        fontSize: 12,
        background: colors[status]
      }}
    >
      {status}
    </span>
  );
}