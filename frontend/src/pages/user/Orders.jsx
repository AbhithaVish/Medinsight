import { useEffect, useState, useMemo } from "react";
import api, { BASE_URL } from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

const STATUSES = ["ALL", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

const STATUS_MAP = {
  PENDING: { color: "#f59e0b", bg: "#fef3c7", label: "Pending", step: 1 },
  PROCESSING: { color: "#0ea5e9", bg: "#e0f2fe", label: "Processing", step: 2 },
  SHIPPED: { color: "#8b5cf6", bg: "#ede9fe", label: "Shipped", step: 3 },
  DELIVERED: { color: "#22c55e", bg: "#dcfce7", label: "Delivered", step: 4 }
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("ALL");
  const [sortOption, setSortOption] = useState("NEWEST");
  const [searchQuery, setSearchQuery] = useState(""); // Added Search State

  useEffect(() => {
    setLoading(true);
    api.get("/orders/my")
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  const processedOrders = useMemo(() => {
    let filtered = [...orders];

    // 1. Filter by Status
    if (activeStatus !== "ALL") {
      filtered = filtered.filter(order =>
        order.OrderItems.some(item => item.status === activeStatus)
      );
    }

    // 2. Filter by Search Query (ID, Product Name, or Shop Name)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => {
        const matchesId = order.id.toString().includes(query);
        const matchesShop = order.shopName?.toLowerCase().includes(query);
        const matchesProduct = order.OrderItems.some(item =>
          item.Product?.name?.toLowerCase().includes(query)
        );
        return matchesId || matchesShop || matchesProduct;
      });
    }

    // 3. Sort
    filtered.sort((a, b) => sortOption === "NEWEST" ? b.id - a.id : a.id - b.id);
    
    return filtered;
  }, [orders, activeStatus, sortOption, searchQuery]);

  return (
    <DashboardLayout title="My Orders">
      <div className="orders-container">
        
        {/* HEADER & FILTERS */}
        <header className="page-header">
          <div className="search-bar-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search by ID, product, or shop..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="header-actions">
            <div className="filter-group">
              {STATUSES.map(status => (
                <button
                  key={status}
                  className={`tab-btn ${activeStatus === status ? "active" : ""}`}
                  onClick={() => setActiveStatus(status)}
                >
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            <div className="sort-wrapper">
              <select className="modern-select" value={sortOption} onChange={e => setSortOption(e.target.value)}>
                <option value="NEWEST">Latest Orders</option>
                <option value="OLDEST">Oldest Orders</option>
              </select>
            </div>
          </div>
        </header>

        {/* LOADING STATE */}
        {loading && (
          <div className="skeleton-list">
            {[1, 2, 3].map(i => <div key={i} className="skeleton-card" />)}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && processedOrders.length === 0 && (
          <div className="empty-state">
            <div className="icon">{searchQuery ? "🔍" : "📦"}</div>
            <h3>{searchQuery ? "No matches found" : "No orders found"}</h3>
            <p>
              {searchQuery 
                ? "Try adjusting your search terms or filters." 
                : "Looks like you haven't placed any orders in this category yet."}
            </p>
          </div>
        )}

        {/* ORDER LIST */}
        <div className="order-grid">
          {processedOrders.map(order => {
            const currentStatus = order.OrderItems[0]?.status || "PENDING";
            const config = STATUS_MAP[currentStatus];

            return (
              <div key={order.id} className="order-card-modern">
                <div className="card-top">
                  <div className="order-id-section">
                    <span className="order-label">Order Reference</span>
                    <span className="order-number">#ORD-{order.id}</span>
                  </div>
                  <div 
                    className="status-pill" 
                    style={{ backgroundColor: config.bg, color: config.color }}
                  >
                    <span className="dot" style={{ backgroundColor: config.color }}></span>
                    {config.label}
                  </div>
                </div>

                <div className="card-body">
                  {order.OrderItems.map(item => (
                    <div key={item.id} className="product-row-modern">
                      <img
                        className="prod-img"
                        src={item.Product?.image ? `${BASE_URL}/uploads/${item.Product.image}` : "https://via.placeholder.com/64"}
                        alt={item.Product?.name}
                      />
                      <div className="prod-details">
                        <h4>{item.Product?.name}</h4>
                        <p>Qty: {item.qty} • Rs. {item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card-footer-modern">
                  <div className="footer-info">
                    <span className="shop-tag">🏪 {order.shopName || "Marketplace"}</span>
                    <span className="order-date">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                  </div>
                  <div className="footer-total">
                    <span className="total-label">Total Amount</span>
                    <span className="total-amount">Rs. {order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .orders-container { max-width: 900px; margin: 0 auto; padding: 20px; font-family: 'Inter', sans-serif; }
        
        .page-header { 
          display: flex; flex-direction: column; gap: 16px; margin-bottom: 30px; 
        }

        .header-actions {
          display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap;
        }

        /* Search Bar UI */
        .search-bar-wrapper {
          position: relative; display: flex; align-items: center; background: #fff;
          border: 1px solid #e2e8f0; border-radius: 12px; padding: 0 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-bar-wrapper:focus-within {
          border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .search-icon { font-size: 14px; margin-right: 12px; color: #94a3b8; }
        .search-input {
          width: 100%; border: none; padding: 12px 0; outline: none; font-size: 14px; color: #1e293b;
        }

        /* Tabs UI */
        .filter-group { display: flex; gap: 8px; background: #f1f5f9; padding: 5px; border-radius: 12px; }
        .tab-btn { 
          padding: 8px 16px; border: none; border-radius: 8px; background: transparent;
          font-size: 14px; font-weight: 500; color: #64748b; cursor: pointer; transition: 0.2s;
        }
        .tab-btn.active { background: white; color: #2563eb; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

        .modern-select { 
          padding: 8px 12px; border-radius: 8px; border: 1px solid #e2e8f0; 
          background: white; outline: none; font-size: 14px; cursor: pointer;
        }

        /* Order Card */
        .order-card-modern {
          background: white; border-radius: 20px; border: 1px solid #f1f5f9;
          margin-bottom: 24px; transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); overflow: hidden;
        }
        .order-card-modern:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }

        .card-top { 
          padding: 20px; display: flex; justify-content: space-between; align-items: flex-start;
          border-bottom: 1px solid #f8fafc;
        }
        .order-id-section { display: flex; flex-direction: column; }
        .order-label { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
        .order-number { font-weight: 700; color: #1e293b; font-size: 16px; }

        .status-pill { 
          display: flex; align-items: center; gap: 6px; padding: 6px 12px; 
          border-radius: 99px; font-size: 12px; font-weight: 600; 
        }
        .dot { width: 6px; height: 6px; border-radius: 50%; }

        .card-body { padding: 20px; }
        .product-row-modern { display: flex; gap: 16px; align-items: center; margin-bottom: 12px; }
        .prod-img { width: 56px; height: 56px; border-radius: 12px; object-fit: cover; background: #f8fafc; }
        .prod-details h4 { margin: 0; font-size: 15px; color: #334155; }
        .prod-details p { margin: 2px 0 0; font-size: 13px; color: #64748b; }

        .card-footer-modern { 
          background: #f8fafc; padding: 16px 20px; display: flex; 
          justify-content: space-between; align-items: center; 
        }
        .footer-info { display: flex; flex-direction: column; gap: 4px; }
        .shop-tag { font-size: 13px; font-weight: 600; color: #475569; }
        .order-date { font-size: 12px; color: #94a3b8; }
        .footer-total { text-align: right; }
        .total-label { display: block; font-size: 11px; color: #94a3b8; text-transform: uppercase; }
        .total-amount { font-size: 18px; font-weight: 800; color: #1e293b; }

        .skeleton-card { height: 200px; background: #f1f5f9; border-radius: 20px; margin-bottom: 20px; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }

        .empty-state { text-align: center; padding: 60px 20px; color: #94a3b8; }
        .empty-state .icon { font-size: 48px; margin-bottom: 16px; }
      `}</style>
    </DashboardLayout>
  );
}